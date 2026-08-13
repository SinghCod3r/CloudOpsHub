# DevOps Interview Notes

These notes explain the core concepts demonstrated in this project.

## Linux
- **Processes:** The application runs as processes inside Docker containers. We monitor process health via the Docker daemon.
- **Ports:** Nginx binds to port 80. Backend binds to 8000. PostgreSQL binds to 5432.
- **Permissions:** The backup script requires execute permissions (`chmod +x scripts/backup.sh`).

## Docker
- **Image vs Container:** Images are built in the GitHub Actions pipeline. Containers are the running instances of these images orchestrated by Docker Compose.
- **Volumes:** We use a named volume `postgres_data` to persist database state across container restarts.

## CI/CD
- **Pipeline Stages:** Our pipeline covers Testing (Pytest), Linting (Ruff), Security Scanning (Trivy), and Building Docker Images.
- **Secrets:** AWS credentials and database passwords are not committed but managed via GitHub Actions Secrets and injected as environment variables.

## AWS & Terraform
- **Infrastructure as Code:** Terraform provisions the VPC, Subnets, Security Groups, EC2 instance, and RDS database, ensuring the infrastructure is reproducible.
- **Least Privilege:** The EC2 instance is assigned an IAM role (`app_role`) using an Instance Profile, avoiding the need for hardcoded AWS credentials on the server.
- **Cost Safety:** We use small instance types (`t2.micro` / `t3.micro`) and can destroy the entire stack using `terraform destroy`.

## Security
- **Trivy:** Scans both the filesystem and the generated Docker images for vulnerabilities.
- **Environment Variables:** Used extensively to separate configuration from code.
