# # Example of defining IAM roles and policies using modules
# module "iam_roles" {
#   source = "./modules/iam_roles"
  
#   role_name_suffix           = var.role_name_suffix
#   iam_role_permissions_boundary = var.iam_role_permissions_boundary
#   oidc_provider_arn          = local.oidc_provider_arn
#   plain_oidc_url             = local.plain_oidc_url
# }