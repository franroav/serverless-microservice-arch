
/* -------------------------------------------------------------------------- */
/*                                   LOCALS                                   */
/* -------------------------------------------------------------------------- */

locals {
  # MAIN CONFIGURATION - ... (existing locals remain unchanged)
  aws_account = data.aws_caller_identity.current.account_id # var.TF_VAR_AWS_ACCOUNT_ID
  aws_region  = "us-east-1"  #var.TF_VAR_AWS_REGION  # AWS region
  aws_profile = "system-admin" #var.TF_VAR_AWS_PROFILE # AWS profile
  alias       = "us-east-1"  #var.TF_VAR_AWS_REGION
  access_key  = var.TF_VAR_AWS_ACCESS_KEY_ID
  secret_key  = var.TF_VAR_AWS_SECRET_ACCESS_KEY
  token       = var.TF_VAR_AWS_SESSION_TOKEN


  # OpenId configuration
  github_client_id = "${var.repository_provider}/${var.username}" # Replace with your desired client IDs
  github_thumbprint = "${data.tls_certificate.github_actions_oidc_endpoint.certificates.0.sha1_fingerprint}" #var.github_thumbprint
  url_workflow_provider = var.workflow_provider

  # ECR configuration
  ecr_reg   = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${local.aws_region}.amazonaws.com" #"${locals.aws_account}.dkr.ecr.${local.aws_region}.amazonaws.com"
  # ecr_repo  = "demo"   # Default ECR repo name
  image_tag = var.image_tag # Default image tag version

  dkr_img_src_path   = "${path.module}/containers" # Docker image path
  dkr_img_src_sha256 = sha256(join("", [for f in fileset(".", "${local.dkr_img_src_path}/**") : filebase64(f)]))

  # Define a map for ECR repositories, ECR repo names
  ecr_repos = {
    lambda-nestjs = "lambda-nestjs-repo",
    # api      = "api-repo",
    # fluentd = "fluentd-repo",
    # Add more services as needed
  }

  # ECR ROLE configuration
  securityscan_role_name = format("securityscan-%s", var.role_name_suffix) # not in use - optionally
  ecrpush_role_name     = format("ecrpush-%s", var.role_name_suffix)
  custom_role_name      = format("custom-%s", var.role_name_suffix)
  
  # OPEN ID configuration
  oidc_provider_arn = aws_iam_openid_connect_provider.github_actions.arn
  plain_oidc_url    = trimprefix(var.github_actions_oidc_url, "https://")

  # Step 3: Use Locals for Complex Tagging Logic
  # For more complex scenarios where you need to add or modify tags dynamically, you can use 

  tags = merge(
    {
      Terraform   = true
      Environment = "development" # You may set a default value or remove this line if not needed
    },
    var.tags
  )

  # additional_tags = {
  #   App = "web"
  # }

  # all_tags = merge(var.common_tags, local.additional_tags)
}
# SINGLE IMAGES 
# locals {

# //////////////////////////////////////////////////////////////////////////////////////////////
# /////////////  Substitute below values to match your AWS account, region & profile //////////////////////////////////////////////////////////////////////////////////////////////
# #   aws_account = "111111111111"   # AWS account
#   aws_region  = "us-east-1"      # AWS region
#   aws_profile = "system-admin"   #"demo_terraform" # AWS profile
#   alias = "us-east-1"
#   access_key = var.TF_VAR_AWS_ACCESS_KEY_ID
#   secret_key = var.TF_VAR_AWS_SECRET_ACCESS_KEY
#   token      = var.TF_VAR_AWS_SESSION_TOKEN
#  ///////////////////////////////////////////////////////////////////////////////////////////// 
#   ecr_reg   = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${local.aws_region}.amazonaws.com"#"${local.aws_account}.dkr.ecr.${local.aws_region}.amazonaws.com" # ECR docker registry URI
#   ecr_repo  = "demo"                                                           # ECR repo name
#   image_tag = "latest"                                                         # image tag -> versión of the image 


#   dkr_img_src_path = "${path.module}/containers"                               # docker image path 
#   dkr_img_src_sha256 = sha256(join("", [for f in fileset(".", "${local.dkr_img_src_path}/**") : file(f)]))    

# # Docker Build Command:
#   dkr_build_cmd = <<-EOT
#         docker build -t ${local.ecr_reg}/${local.ecr_repo}:${local.image_tag} \
#             -f ${local.dkr_img_src_path}/Dockerfile .

#         aws --profile ${local.aws_profile} ecr get-login-password --region ${local.aws_region} | \
#             docker login --username AWS --password-stdin ${local.ecr_reg}

#         docker push ${local.ecr_reg}/${local.ecr_repo}:${local.image_tag}
#     EOT
# }
