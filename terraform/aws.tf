provider "aws" {
  alias                   = "localstack"
  region                  = "us-east-1"  # You can set this to any AWS region
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  access_key = "foo"
  secret_key = "bar"
  endpoints {
    dynamodb = "http://localstack:4566/"
    sns = "http://localstack:4566/"
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

resource "aws_sns_topic" "plane-status-topic" {
  provider = aws.localstack
  name     = "plane-status-topic"
}

resource "aws_sqs_queue" "plane-actions-queue" {
  provider = aws.localstack
  name                       = "plane-actions-queue"
  visibility_timeout_seconds = 5
}
