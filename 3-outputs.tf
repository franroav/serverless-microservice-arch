/* -------------------------------------------------------------------------- */
/*                                  OUTPUTS                                */
/* -------------------------------------------------------------------------- */

output "account_id" {
  value = data.aws_caller_identity.current.account_id
}

output "caller_arn" {
  value = data.aws_caller_identity.current.arn
}

output "caller_user" {
  value = data.aws_caller_identity.current.user_id
}

# Output triggered by null_resource.build_push_dkr_img
output "trigged_by" {
  value = { for key, resource_instance in null_resource.build_push_dkr_img : key => resource_instance.triggers }
}

output "docker_build_context" {
  value = local.dkr_img_src_path
}

output "ecr_repository_urls" {
  description = "ECR URL's"
  value = { for key, repo in aws_ecr_repository.ecr_repos : key => repo.repository_url }
}


output "ecrpush_role_arn" {
  description = "The ARN of the ECR Push IAM Role"
  value       = var.is_create_github_oidc && var.is_create_ecrpush_oicd_role ? aws_iam_role.ecrpush[0].arn : null
}

output "ecrpush_role_name" {
  description = "The name of the ECR Push IAM Role"
  value       = var.is_create_github_oidc && var.is_create_ecrpush_oicd_role ? aws_iam_role.ecrpush[0].name : null
}

output "ecrpush_role_policy_attachment_arn" {
  value = var.is_create_github_oidc && var.is_create_ecrpush_oicd_role ? aws_iam_role_policy_attachment.ecr_poweruser[0].policy_arn : null
}

output "github_actions_oidc_provider_arn" {
  value = aws_iam_openid_connect_provider.github_actions.arn
}

/* -------------------------------------------------------------------------- */
/*                             API Gateway Integration                        */
/* -------------------------------------------------------------------------- */


# API Gateway Outputs:

# api_gateway_id: The ID of the API Gateway.
# api_gateway_endpoint: The endpoint URL of the API Gateway.
# api_gateway_stage_name: The name of the default stage for the API Gateway.
# api_gateway_integration_id: The ID of the integration between API Gateway and the Lambda function.
# api_gateway_route_id: The ID of the route in API Gateway.
# api_gateway_deployment_id: The ID of the API Gateway deployment.
# api_gateway_main_stage_name: The name of the main stage in API Gateway.
# api_gateway_canary_stage_name: The name of the canary stage in API Gateway.
# api_gateway_main_route_id: The ID of the main route in API Gateway.
# api_gateway_canary_route_id: The ID of the canary route in API Gateway.

output "api_gateway_id" {
  description = "ID of the API Gateway"
  value       = aws_apigatewayv2_api.api.id
}

output "api_gateway_endpoint" {
  description = "Endpoint of the API Gateway"
  value       = aws_apigatewayv2_api.api.api_endpoint
}

output "api_gateway_stage_name" {
  description = "Name of the API Gateway stage"
  value       = aws_apigatewayv2_stage.api_stage.name
}

output "api_gateway_integration_id" {
  description = "ID of the API Gateway integration"
  value       = aws_apigatewayv2_integration.lambda_integration.id
}

output "api_gateway_route_id" {
  description = "ID of the API Gateway route"
  value       = aws_apigatewayv2_route.default_route.id
}

output "api_gateway_deployment_id" {
  description = "ID of the API Gateway deployment"
  value       = aws_apigatewayv2_deployment.deployment.id
}

output "api_gateway_main_stage_name" {
  description = "Name of the main API Gateway stage"
  value       = aws_apigatewayv2_stage.main_stage.name
}

output "api_gateway_canary_stage_name" {
  description = "Name of the canary API Gateway stage"
  value       = aws_apigatewayv2_stage.canary_stage.name
}

output "api_gateway_main_route_id" {
  description = "ID of the main API Gateway route"
  value       = aws_apigatewayv2_route.main_route.id
}

output "api_gateway_canary_route_id" {
  description = "ID of the canary API Gateway route"
  value       = aws_apigatewayv2_route.canary_route.id
}

/* -------------------------------------------------------------------------- */
/*                              Lambda Function                               */
/* -------------------------------------------------------------------------- */

# Lambda Function Outputs:

# lambda_function_name: The name of the Lambda function.
# lambda_function_arn: The ARN of the Lambda function.
# lambda_function_version: The version of the Lambda function.
# lambda_alias_canary_name: The name of the Lambda alias for the canary deployment.
# lambda_alias_main_name: The name of the Lambda alias for the main deployment.

output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.lambda_nestjs.function_name
}

output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.lambda_nestjs.arn
}

output "lambda_function_version" {
  description = "Version of the Lambda function"
  value       = data.aws_lambda_function.lambda_nestjs.version
}

output "lambda_alias_canary_name" {
  description = "Name of the Lambda alias for canary deployment"
  value       = aws_lambda_alias.alias_canary.name
}

output "lambda_alias_main_name" {
  description = "Name of the Lambda alias for main deployment"
  value       = aws_lambda_alias.alias_main.name
}



/* -------------------------------------------------------------------------- --------------------------------------------------------------------*/

/*                                                          Redis ElastiCache Setup                        

/* -------------------------------------------------------------------------- ---------------------------------------------------------------------*/


# output "redis_endpoint" {
#   value = aws_elasticache_cluster.webkonce.cache_nodes[0].address
# }













# output "trigged_by" {
#   value = null_resource.build_push_dkr_img.triggers
# }


# output "docker_build_commands" {
#   value = local.dkr_build_cmds
# }

# output "docker_build_script" {
#   value = join("\n", [for repo_name, script in local.dkr_build_cmds : <<-SCRIPT
#     # ${repo_name}
#     ${script}

#     echo "Finished building and pushing Docker image for ${repo_name}"
#   SCRIPT
#   ])
# }

# # OICD Output variables
# output "oidc_provider_url" {
#   value = aws_identity_provider.github_oidc.url
# }

# output "iam_role_name" {
#   value = aws_iam_role.github_oidc_role.name
# }

# output "iam_role_arn" {
#   value = aws_iam_role.github_oidc_role.arn
# }

# output "iam_policy_arn" {
#   value = aws_iam_policy.github_oidc_policy.arn
# }

# to single repository 

# output "ecr_url" {
#   description = "The ECR URL"
#   value = try({ for key, repo in aws_ecr_repository.ecr_repos : key => repo.repository_url }, "")
# }