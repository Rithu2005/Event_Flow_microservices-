# Amazon RDS MySQL Setup

## 1. Create DB Instance
- Engine: MySQL 8.0.x
- Templates: Production / Dev (t3.micro for dev)
- DB Instance Identifier: `eventflow-db`
- Master username: `admin`
- Password: `<your_password>`

## 2. Network Configuration
- Connect to EKS VPC.
- Public Access: No.
- Security Group: Allow inbound traffic on 3306 from EKS Node Security Group.

## 3. Databases
Create separate databases within the instance:
- `eventflow_auth`
- `eventflow_event`
- `eventflow_ticket`

## 4. Update K8s ConfigMap
Update `kubernetes/configmap.yaml` with the RDS Endpoint:
```yaml
AUTH_DB_URL: "jdbc:mysql://eventflow-db.xyz.us-east-1.rds.amazonaws.com:3306/eventflow_auth"
```
