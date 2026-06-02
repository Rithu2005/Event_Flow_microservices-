# Amazon ECR Setup Guide

## 1. Create Repositories
Create a repository for each microservice:
- `eventflow/discovery-service`
- `eventflow/api-gateway`
- `eventflow/auth-service`
- `eventflow/user-service`
- `eventflow/event-service`
- `eventflow/ticket-service`
- `eventflow/notification-service`
- `eventflow/frontend`

```bash
aws ecr create-repository --repository-name eventflow/auth-service
```

## 2. Authenticate Docker to ECR
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com
```

## 3. Push Images
```bash
docker tag auth-service:latest <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/eventflow/auth-service:latest
docker push <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/eventflow/auth-service:latest
```
