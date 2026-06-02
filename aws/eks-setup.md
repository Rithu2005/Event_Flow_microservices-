# Amazon EKS Setup Guide

## 1. Prerequisites
- AWS CLI configured with Administrator access.
- `kubectl` installed.
- `eksctl` installed.

## 2. Create Cluster
```bash
eksctl create cluster \
  --name eventflow-cluster \
  --region us-east-1 \
  --nodegroup-name standard-nodes \
  --node-type t3.medium \
  --nodes 3 \
  --nodes-min 1 \
  --nodes-max 4 \
  --managed
```

## 3. Configure Kubectl
```bash
aws eks update-kubeconfig --name eventflow-cluster --region us-east-1
```

## 4. Install AWS Load Balancer Controller
Required for the `Ingress` to work on AWS (ALB).
1. Create IAM OIDC provider.
2. Create IAM Policy for the controller.
3. Install via Helm.

## 5. Deploy EventFlow
```bash
kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/
```
