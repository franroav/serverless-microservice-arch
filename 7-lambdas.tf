/* -------------------------------------------------------------------------- */
/*                              Lambda Function 
                                    Strategies  
- lambda-nestjs                                                               
- lambda-nestjs                                                               
                                                                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                              Lambda Function 
                            Define your Lambda function:  
                            - lambda-nestjs                                   */
/* -------------------------------------------------------------------------- */

resource "aws_lambda_function" "lambda_nestjs" {
  function_name = var.lambda_function_name
  image_uri     = "${aws_ecr_repository.ecr_repos["lambda-nestjs"].repository_url}:${var.image_tag}"
  role          = aws_iam_role.lambda_exec.arn
  publish       = true // Ensures a new version is created
  package_type  = "Image"
  timeout       = 30
  memory_size   = 128

  // LOCAL ZIP S3 STRATEGIES 
  # handler       = "${path.module}/containers/lambda-nestjs/.build/src/lambda.js"
  # runtime       = "nodejs18.x"
  # filename      = "${path.module}/containers/lambda-nestjs/lambda-nestjs.zip"
  # source_code_hash = filebase64sha256("${path.module}/containers/lambda-nestjs/lambda-nestjs.zip")

  environment {
    variables = {
      IMAGE_TAG           = var.image_tag
      MONGODB_URI         = var.mongodb_uri
      JWT_SECRET          = var.jwt_secret
      JWT_EXPIRATION_TIME = var.jwt_expiration_time
      SECRET_KEY          = var.secret_key
    }
  }

  depends_on = [aws_ecr_repository.ecr_repos]
}
resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  inline_policy {
    name = "lambda_exec_policy"
    policy = jsonencode({
      Version = "2012-10-17",
      Statement = [
        {
          Effect = "Allow",
          Action = [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ],
          Resource = "arn:aws:logs:*:*:*"
        },
        {
          Effect = "Allow",
          Action = [
            "ecr:GetDownloadUrlForLayer",
            "ecr:BatchGetImage",
            "ecr:BatchCheckLayerAvailability"
          ],
          Resource = "*"
        },
        {
          Effect = "Allow",
          Action = [
            "s3:GetObject",
            "s3:PutObject"
          ],
          Resource = "arn:aws:s3:::${aws_s3_bucket.cloudfront_logs}" // "arn:aws:s3:::cloudfront-logs-bucket/*"
        }
      ]
    })
  }
}

// create lambda version 
data "aws_lambda_function" "lambda_nestjs" {
  function_name = aws_lambda_function.lambda_nestjs.function_name
  depends_on    = [aws_lambda_function.lambda_nestjs]
}

// 10% of traffic from lambda aliases
resource "aws_lambda_alias" "alias_canary" {
  name             = "canary"
  function_name    = aws_lambda_function.lambda_nestjs.function_name
  function_version = data.aws_lambda_function.lambda_nestjs.version
  routing_config {
    additional_version_weights = {
      "${data.aws_lambda_function.lambda_nestjs.version}" = 0.1 // 10% of traffic goes to version 1 (canary)
    }
  }
  depends_on = [data.aws_lambda_function.lambda_nestjs]
}

// 90% of the main application 
resource "aws_lambda_alias" "alias_main" {
  name             = "main"
  function_name    = aws_lambda_function.lambda_nestjs.function_name
  function_version = data.aws_lambda_function.lambda_nestjs.version
  routing_config {
    additional_version_weights = {
      "${data.aws_lambda_function.lambda_nestjs.version}" = 0.9 // 90% of traffic goes to version 2 (main)
    }
  }
  depends_on = [data.aws_lambda_function.lambda_nestjs]
}


# /* -------------------------------------------------------------------------- */
# /*                          2. Lambda Function
#                             Define your Lambda function:                      */
# /* -------------------------------------------------------------------------- */

# resource "aws_lambda_function" "lambda_nestjs" {
#   function_name = var.lambda_function_name
#   handler       = "dist/main.handler"
#   runtime       = "nodejs18.x"
#   filename      = "${path.module}/containers/lambda-nestjs/lambda-nestjs.zip"
#   source_code_hash = filebase64sha256("${path.module}/containers/lambda-nestjs/lambda-nestjs.zip")
#   role          = aws_iam_role.lambda_exec.arn

#   environment {
#     variables = {
#       MONGODB_URI         = var.mongodb_uri
#       JWT_SECRET          = var.jwt_secret
#       JWT_EXPIRATION_TIME = var.jwt_expiration_time
#       SECRET_KEY          = var.secret_key
#     }
#   }
# }

# resource "aws_iam_role" "lambda_exec" {
#   name = "lambda_exec_role"

#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Action = "sts:AssumeRole"
#         Effect = "Allow"
#         Sid    = ""
#         Principal = {
#           Service = "lambda.amazonaws.com"
#         }
#       },
#     ]
#   })

#   managed_policy_arns = [
#     "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
#   ]
# }

# // Create Lambda Versions
# resource "aws_lambda_version" "version" {
#   function_name = aws_lambda_function.lambda_nestjs.arn
# }

# // Aliases for main and canary
# resource "aws_lambda_alias" "alias_canary" {
#   name             = "canary"
#   function_name    = aws_lambda_function.lambda_nestjs.function_name
#   function_version = aws_lambda_version.version.version
# }

# resource "aws_lambda_alias" "alias_main" {
#   name             = "main"
#   function_name    = aws_lambda_function.lambda_nestjs.function_name
#   function_version = aws_lambda_version.version.version
# }
