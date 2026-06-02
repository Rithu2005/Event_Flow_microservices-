# Amazon S3 Setup Guide

## 1. Create Bucket
- Bucket name: `eventflow-event-banners`
- Block all public access: Yes (use CloudFront for serving).

## 2. IAM Policy
Create a policy allowing S3 access:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::eventflow-event-banners/*"
    }
  ]
}
```

## 3. Application Config
Update application properties to use AWS SDK for S3:
```properties
aws.s3.bucket=eventflow-event-banners
aws.region=us-east-1
```
