# Amazon MSK (Kafka) Setup

## 1. Create Cluster
- Type: Provisioned or Serverless.
- Kafka Version: 3.x
- Brokers: 3 (spread across AZs).

## 2. Security
- Use IAM Role-based authentication or SASL/SCRAM.
- Security Group: Allow inbound traffic from EKS Node Security Group on 9092/9094.

## 3. Configuration
- Get the Bootstrap Brokers string from AWS Console.
- Update `kubernetes/configmap.yaml`:
```yaml
KAFKA_BOOTSTRAP_SERVERS: "b-1.eventflow...amazonaws.com:9092,b-2..."
```
