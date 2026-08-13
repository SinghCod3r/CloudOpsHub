# Architecture

The CloudOpsHub platform is designed as a cloud-native, microservices-oriented application.

## High-Level Architecture
```
Internet
   │
   ▼
[ AWS EC2 / Docker Host ]
   │
   ├─► Nginx (Reverse Proxy)
   │     │
   │     ├─► Frontend (React / Vite)
   │     │
   │     └─► Backend API (FastAPI)
   │           │
   │           ▼
   └─► PostgreSQL Database
```

## Networking (AWS VPC)
- **VPC:** A dedicated virtual private cloud isolates the resources.
- **Public Subnet:** Hosts the EC2 instance running the application and the RDS instance for simplicity and cost control in this demonstration, though production workloads typically keep RDS in a private subnet.
- **Security Groups:** 
  - `app_sg`: Allows inbound HTTP (80) and SSH (22).
  - `db_sg`: Allows inbound PostgreSQL (5432) strictly from the `app_sg`.

## CI/CD Pipeline Flow
```
Developer pushes code
        ↓
GitHub Actions (CI)
        ├─► Linting (Ruff)
        ├─► Unit Tests (Pytest)
        └─► Security Scan (Trivy)
        ↓
Build Docker Images
        ↓
Manual Deployment / CD
```
