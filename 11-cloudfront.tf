resource "aws_cloudfront_distribution" "cdn_distribution" {
  origin {
    domain_name = aws_apigatewayv2_api.api.api_endpoint
    origin_id   = "APIGateway"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "APIGateway"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  logging_config {
    bucket         = aws_s3_bucket.cloudfront_logs.bucket_regional_domain_name
    include_cookies = false
    prefix         = "cdn-logs/"
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["CL", "PE", "BR"] // Example countries to whitelist
    }
  }

  tags = {
    Name = "APIGateway CloudFront CDN"
  }
}