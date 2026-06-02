# AWS CloudWatch & Monitoring

## 1. Container Insights
Enable CloudWatch Container Insights on EKS for CPU, Memory, and Network metrics.
```bash
eksctl utils write-kubeconfig --cluster eventflow-cluster
# Apply CloudWatch agent manifests
```

## 2. Logs
Configure `Fluent Bit` to send logs to CloudWatch Logs.

## 3. Alarms
Set up alarms for:
- High CPU utilization (>80%)
- RDS Storage low
- API Gateway latency
- Kafka UnderReplicatedPartitions
