# main.tf
# provider "aws" {
#   region = var.region
# }
# # stage 1 - Create repositories 
# module "ecr" {
#   source = "./ecr"
# }

# module "lambda" {
#   source = "./lambda"
#   depends_on = [module.ecr]
# }

# module "apigateway" {
#   source = "./apigateway"
#   depends_on = [module.lambda]
# }

# module "kubernetes" {
#   source = "./kubernetes"
#   depends_on = [module.apigateway]
# }