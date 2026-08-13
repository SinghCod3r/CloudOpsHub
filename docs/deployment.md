# Deployment Guide

This guide describes how to deploy CloudOpsHub.

## Local Deployment

To run the application locally for development or testing:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd cloudopshub
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env to set your secrets
   ```

3. Start the application stack:
   ```bash
   docker-compose up --build
   ```

4. The application is now accessible at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## AWS Deployment

This project uses Terraform to provision AWS infrastructure.

### Prerequisites
- AWS CLI configured with appropriate credentials.
- Terraform installed (>= 1.0.0).

### Steps
1. Navigate to the Terraform directory:
   ```bash
   cd infrastructure/terraform
   ```

2. Initialize Terraform:
   ```bash
   terraform init
   ```

3. Validate the configuration:
   ```bash
   terraform validate
   ```

4. Plan the deployment to review changes:
   ```bash
   terraform plan -out=tfplan
   ```

5. Apply the deployment (Warning: this may incur AWS charges):
   ```bash
   terraform apply tfplan
   ```

6. After applying, Terraform will output the `ec2_public_ip` and `db_endpoint`. You can then SSH into the EC2 instance and run `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d` to start the application.

### Cleanup

To destroy all AWS resources created by Terraform and stop incurring charges:
```bash
terraform destroy
```
