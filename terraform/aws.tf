provider "aws" {
  alias                   = "localstack"
  region                  = "us-east-1"  # You can set this to any AWS region
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  endpoints {
    dynamodb = "https://localhost.localstack.cloud:4566/"
  }
}

resource "aws_dynamodb_table" "plane" {
  provider = aws.localstack
  name           = "plane"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}