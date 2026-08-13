# CloudOpsHub

CloudOpsHub is a cloud-native incident management platform designed to demonstrate best practices in modern DevOps, Software Engineering, and Cloud Architecture.

## Architecture

![Architecture](docs/architecture.png)

## Tech Stack
- **Backend:** Python 3, FastAPI, SQLAlchemy
- **Frontend:** React, Vite, CSS
- **Database:** PostgreSQL
- **Infrastructure:** AWS, Terraform, Docker, Docker Compose
- **CI/CD:** GitHub Actions
- **Security:** Trivy, Dependabot

## Features
- Create, view, search, filter, and update incidents
- Dashboard with real-time statistics
- Responsive modern UI
- REST API with health endpoints

## DevOps Features
- **Docker:** Multi-stage builds and docker-compose for local development
- **CI/CD:** Automated testing, linting, security scanning, and simulated deployment pipelines
- **Terraform:** Infrastructure as Code for AWS (VPC, EC2, RDS, IAM)
- **Security Scanning:** Image and filesystem scanning via Trivy

## Local Setup

```bash
git clone <repository>
cd cloudopshub
cp .env.example .env
docker compose up --build
```
Then access the services:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API docs: http://localhost:8000/docs
