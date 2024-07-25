resource "aws_s3_bucket" "cloudfront_logs" {
  bucket = "cloudfront-logs-bucket"
#   acl    = "private"
  # region = "us-east-1"  // Correct region for your S3 bucket
}