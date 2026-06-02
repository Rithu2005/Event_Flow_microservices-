pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = 'docker-compose'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Install') {
            steps {
                sh 'mvn clean install -DskipTests'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Docker Build') {
            steps {
                sh "${DOCKER_COMPOSE} build"
            }
        }

        stage('Deploy') {
            steps {
                sh "${DOCKER_COMPOSE} down"
                sh "${DOCKER_COMPOSE} up -d"
            }
        }

        stage('Verify Health') {
            steps {
                script {
                    def services = [
                        'discovery-service': 8761,
                        'api-gateway': 8080,
                        'auth-service': 8081,
                        'user-service': 8083,
                        'event-service': 8084,
                        'notification-service': 8085,
                        'ticket-service': 8086
                    ]

                    services.each { name, port ->
                        echo "Verifying health for ${name} on port ${port}..."
                        def healthy = false
                        for (int i = 0; i < 10; i++) {
                            try {
                                def response = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://localhost:${port}/actuator/health", returnStdout: true).trim()
                                if (response == '200') {
                                    echo "${name} is UP!"
                                    healthy = true
                                    break
                                }
                            } catch (Exception e) {
                                // Ignore and retry
                            }
                            echo "Waiting for ${name}... (Attempt ${i+1}/10)"
                            sleep 10
                        }
                        if (!healthy) {
                            error "${name} failed health check!"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
