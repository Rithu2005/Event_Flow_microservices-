# EventFlow Platform

A production-ready, cloud-native event-driven microservices platform.

## Architecture
- **Microservices:** Spring Boot 3, Java 21, Eureka, Gateway.
- **Messaging:** Kafka.
- **Frontend:** React, Tailwind.
- **DevOps:** Kubernetes, Jenkins, Prometheus, Grafana, AWS (EKS, RDS, MSK, S3).

## Setup
1. **Local:** Navigate to `infrastructure/` and run `docker-compose up -d`.
   - **MySQL Auth:** localhost:3310
   - **MySQL Event:** localhost:3311
   - **MySQL Ticket:** localhost:3312
2. **K8s:** `kubectl apply -f kubernetes/`.
3. **CI/CD:** Jenkins pipeline configured.

For detailed guides, check the `aws/` and `docs/` directories.

## Jenkins CI/CD Pipeline

This project includes a complete Jenkins CI/CD pipeline for automated building, testing, and deployment.

### Prerequisites
- Jenkins installed (preferably using Docker)
- Docker and Docker Compose installed on the Jenkins host
- Maven and JDK 17 installed or available as Jenkins tools
- GitHub account and repository access

### Jenkins Installation using Docker
To run Jenkins inside Docker with access to the Docker daemon:
```bash
docker run -d -u root \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name jenkins jenkins/jenkins:lts
```

### Jenkins Setup Steps
1. **GitHub Integration:**
   - Go to `Manage Jenkins` -> `Credentials` -> `System` -> `Global credentials`.
   - Add your GitHub username and Personal Access Token (PAT).
2. **Create Pipeline Job:**
   - Create a new `Pipeline` job named `EventFlow-CI-CD`.
   - In the `Pipeline` section, select `Pipeline script from SCM`.
   - Set SCM to `Git`, provide the repository URL, and select your credentials.
   - Set the Branch Specifier to `*/main`.
   - Ensure the Script Path is set to `Jenkinsfile`.
3. **Running the Pipeline:**
   - Click `Build Now` to trigger the pipeline.
   - The pipeline will check out the code, build the Maven projects, run tests, build Docker images, and deploy the stack using Docker Compose.

### Expected Pipeline Output
- **Build & Install:** Compiles all microservices and installs `common-dto`.
- **Docker Build:** Creates optimized images for all 7 microservices.
- **Deploy:** Restarts the full stack (Infrastructure + Apps) in detached mode.
- **Verify Health:** Polls the `/actuator/health` endpoint for each service until they return HTTP 200.

### Verification Checklist
- **Eureka:** http://localhost:8761
- **API Gateway:** http://localhost:8080
- **Prometheus:** http://localhost:9090
- **Grafana:** http://localhost:3000
