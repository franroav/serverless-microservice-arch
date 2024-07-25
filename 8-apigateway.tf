/* -------------------------------------------------------------------------- */
/*                             API Gateway Integration                        */
/* -------------------------------------------------------------------------- */

resource "aws_apigatewayv2_api" "api" {
  name          = "webkonce-apigtw"
  protocol_type = "HTTP"
}
resource "aws_apigatewayv2_stage" "api_stage" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "prod"
  description = "Production stage"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id           = aws_apigatewayv2_api.api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.lambda_nestjs.invoke_arn
}

resource "aws_apigatewayv2_route" "default_route" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "ANY /{proxy+}"

  target = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_nestjs.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

/* -------------------------------------------------------------------------- */
/*                             API Gateway Deployment                         */
/* -------------------------------------------------------------------------- */

resource "aws_apigatewayv2_stage" "main_stage" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "main"
  auto_deploy = false
}

resource "aws_apigatewayv2_stage" "canary_stage" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "canary"
  auto_deploy = false
}

resource "aws_apigatewayv2_deployment" "deployment" {
  api_id      = aws_apigatewayv2_api.api.id
  description = "Main deployment"
  depends_on  = [aws_apigatewayv2_stage.main_stage, aws_apigatewayv2_stage.canary_stage]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_apigatewayv2_stage" "main_stage_association" {
  api_id        = aws_apigatewayv2_api.api.id
  name          = aws_apigatewayv2_stage.main_stage.name
  deployment_id = aws_apigatewayv2_deployment.deployment.id
  auto_deploy   = true
  depends_on    = [aws_apigatewayv2_deployment.deployment]
}

resource "aws_apigatewayv2_stage" "canary_stage_association" {
  api_id        = aws_apigatewayv2_api.api.id
  name          = aws_apigatewayv2_stage.canary_stage.name
  deployment_id = aws_apigatewayv2_deployment.deployment.id
  auto_deploy   = true
  depends_on    = [aws_apigatewayv2_deployment.deployment]
}

resource "aws_apigatewayv2_route" "main_route" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"

  depends_on = [aws_apigatewayv2_stage.main_stage_association]
}

resource "aws_apigatewayv2_route" "canary_route" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"

  depends_on = [aws_apigatewayv2_stage.canary_stage_association]
}


# # /* -------------------------------------------------------------------------- */
# # /*                       3. API Gateway REST API
# #                       Define your API Gateway REST API:                       */
# # /* -------------------------------------------------------------------------- */

# resource "aws_api_gateway_rest_api" "webkonce" {
#   name        = var.api_name
#   description = "API Gateway for Lambda"

#   endpoint_configuration {
#     types = ["REGIONAL"]
#   }
# }

# /* -------------------------------------------------------------------------- */
# /*                     4. API Gateway Resources and Methods
#                    Define your API Gateway resources and methods:             */
# /* -------------------------------------------------------------------------- */

# // resource ID
# resource "aws_api_gateway_resource" "proxy" {
#   rest_api_id = aws_api_gateway_rest_api.webkonce.id
#   parent_id   = aws_api_gateway_rest_api.webkonce.root_resource_id
#   path_part   = "{proxy+}"
# }

# // api gateway method
# resource "aws_api_gateway_method" "proxy" {
#   rest_api_id   = aws_api_gateway_rest_api.webkonce.id
#   resource_id   = aws_api_gateway_resource.proxy.id
#   http_method   = "ANY"
#   authorization = "NONE"
# }

# /* -------------------------------------------------------------------------- */
# /*                      5. API Gateway Deployment and Stages
#                        Deploy your API Gateway and create stages:             */
# /* -------------------------------------------------------------------------- */

# // Define a deployment
# resource "aws_api_gateway_deployment" "deployment" {
#   depends_on = [
#     aws_api_gateway_integration.proxy,
#   ]
#   rest_api_id = aws_api_gateway_rest_api.webkonce.id
#   stage_name  = var.env
# }

# // Define main stage
# resource "aws_api_gateway_stage" "main" {
#   stage_name    = "${var.env}-main"
#   rest_api_id   = aws_api_gateway_rest_api.webkonce.id
#   deployment_id = aws_api_gateway_deployment.deployment.id

#   canary_settings {
#     percent_traffic = 90  # 90% of traffic goes to the canary stage
#     use_stage_cache = true
#   }

#   variables = {
#     stageVar1 = "mainValue1"
#   }

#   cache_cluster_enabled = true
#   cache_cluster_size    = "0.5"

#   xray_tracing_enabled  = true
#   client_certificate_id = "client-certificate-id"
# }

# // Define canary stage
# resource "aws_api_gateway_stage" "canary_stage" {
#   stage_name    = "${var.env}-canary"
#   rest_api_id   = aws_api_gateway_rest_api.webkonce.id
#   deployment_id = aws_api_gateway_deployment.deployment.id

#   canary_settings {
#     percent_traffic = 10  # 10% of traffic goes to the canary stage
#     use_stage_cache = true
#   }

#   variables = {
#     stageVar1 = "canaryValue1"
#   }

#   cache_cluster_enabled = true
#   cache_cluster_size    = "0.5"

#   xray_tracing_enabled  = true
#   client_certificate_id = "client-certificate-id"
# }

# /* -------------------------------------------------------------------------- */
# /*                  6. Update API Gateway Integration with Lambda Aliases:
#         Use the aliases in your API Gateway integration to direct traffic accordingly.*/
# /* -------------------------------------------------------------------------- */

# resource "aws_api_gateway_integration" "proxy" {
#   rest_api_id             = aws_api_gateway_rest_api.webkonce.id
#   resource_id             = aws_api_gateway_resource.proxy.id
#   http_method             = aws_api_gateway_method.proxy.http_method
#   type                    = "AWS_PROXY"
#   integration_http_method = "POST"
#   uri                     = "${aws_lambda_function.lambda_nestjs.invoke_arn}:${aws_lambda_alias.alias_main.name}"
# }
# /* -------------------------------------------------------------------------- */
# /*                     7. CORS Configuration
#                 Add CORS configuration for the API Gateway:                   */
# /* -------------------------------------------------------------------------- */

# resource "aws_api_gateway_method_response" "proxy_cors" {
#   rest_api_id = aws_api_gateway_rest_api.webkonce.id
#   resource_id = aws_api_gateway_resource.proxy.id
#   http_method = aws_api_gateway_method.proxy.http_method
#   status_code = "200"

#   response_parameters = {
#     "method.response.header.Access-Control-Allow-Headers" = true
#     "method.response.header.Access-Control-Allow-Methods" = true
#     "method.response.header.Access-Control-Allow-Origin"  = true
#   }
# }

# resource "aws_api_gateway_integration_response" "proxy_cors" {
#   rest_api_id = aws_api_gateway_rest_api.webkonce.id
#   resource_id = aws_api_gateway_resource.proxy.id
#   http_method = aws_api_gateway_method.proxy.http_method
#   status_code = aws_api_gateway_method_response.proxy_cors.status_code

#   response_parameters = {
#     "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
#     "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,PUT,DELETE,OPTIONS'"
#     "method.response.header.Access-Control-Allow-Origin"  = "'*'"
#   }
# }

# /* -------------------------------------------------------------------------- */
# /*                     8. Usage Plans and API Keys
#                 Define usage plans and API keys:                              */
# /* -------------------------------------------------------------------------- */

# resource "aws_api_gateway_usage_plan" "webkonce" {
#   name        = "webkonce_usage_plan"
#   description = "Usage plan for webkonce API"
#   api_stages {
#     api_id = aws_api_gateway_rest_api.webkonce.id
#     stage  = aws_api_gateway_stage.main.stage_name
#   }

#   throttle_settings {
#     burst_limit = 100
#     rate_limit  = 50
#   }

#   quota_settings {
#     limit  = 10000
#     offset = 0
#     period = "MONTH"
#   }
# }

# resource "aws_api_gateway_api_key" "webkonce" {
#   name        = "webkonce_key"
#   description = "API key for webkonce"
#   enabled     = true
# }

# resource "aws_api_gateway_usage_plan_key" "webkonce" {
#   key_id        = aws_api_gateway_api_key.webkonce.id
#   key_type      = "API_KEY"
#   usage_plan_id = aws_api_gateway_usage_plan.webkonce.id
# }