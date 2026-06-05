pipeline {
agent any

```
stages {

    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Verify Environment') {
        steps {
            sh '''
            echo "===== JAVA ====="
            java -version || true

            echo "===== MAVEN ====="
            mvn -version || true

            echo "===== DOCKER ====="
            docker --version || true

            echo "===== DOCKER COMPOSE ====="
            docker compose version || true

            echo "===== CURL ====="
            curl --version || true
            '''
        }
    }

    stage('Build Services') {
        steps {
            sh '''
            mvn clean install -DskipTests
            '''
        }
    }

    stage('Run Tests') {
        steps {
            sh '''
            mvn test
            '''
        }
    }

    stage('Build Docker Images') {
        steps {
            sh '''
            docker compose build
            '''
        }
    }

    stage('Deploy Containers') {
        steps {
            sh '''
            docker compose down || true
            docker compose up -d
            '''
        }
    }

    stage('Health Check') {
        steps {
            script {

                def services = [
                    [name: 'discovery-service', port: '8761'],
                    [name: 'api-gateway', port: '8080'],
                    [name: 'auth-service', port: '8081'],
                    [name: 'user-service', port: '8083'],
                    [name: 'event-service', port: '8084'],
                    [name: 'notification-service', port: '8085'],
                    [name: 'ticket-service', port: '8086']
                ]

                services.each { service ->

                    echo "Checking ${service.name}"

                    boolean healthy = false

                    for (int i = 0; i < 10; i++) {

                        try {

                            def status = sh(
                                script: """
                                curl -s -o /dev/null -w "%{http_code}" http://host.docker.internal:${service.port}/actuator/health
                                """,
                                returnStdout: true
                            ).trim()

                            if (status == "200") {
                                healthy = true
                                echo "${service.name} is healthy"
                                break
                            }

                        } catch(Exception e) {
                            echo "Waiting for ${service.name}"
                        }

                        sleep 10
                    }

                    if (!healthy) {
                        error("${service.name} failed health check")
                    }
                }
            }
        }
    }
}

post {

    success {
        echo 'EventFlow deployment successful!'
    }

    failure {
        echo 'EventFlow deployment failed!'
    }

    always {
        cleanWs()
    }
}
```

}
