# Troubleshooting Guide

## Local Development Issues

### Port Conflicts
**Symptom:** `docker-compose up` fails with "bind: address already in use".
**Solution:** Ensure ports 3000 (frontend), 8000 (backend), and 5432 (PostgreSQL) are not being used by other applications.

### Database Connection Fails
**Symptom:** Backend container crashes on startup complaining about the database.
**Solution:** The database container might take a few seconds to become ready. Docker Compose depends_on with `service_healthy` should handle this, but if it fails, try restarting the backend container:
```bash
docker-compose restart backend
```

## AWS Deployment Issues

### Terraform Apply Fails
**Symptom:** "Error creating Security Group" or similar permission errors.
**Solution:** Ensure your AWS CLI credentials have sufficient IAM permissions to create VPCs, Subnets, Security Groups, EC2 instances, and RDS databases.

### EC2 Instance Unreachable
**Symptom:** Cannot connect to the public IP of the EC2 instance.
**Solution:** Check the `app_sg` Security Group rules in the AWS Console to ensure port 80 is open to your IP address. Ensure the instance is launched in a public subnet with an Internet Gateway attached.

## Log Analysis
To view the logs of the running containers:
```bash
docker-compose logs -f
# Or for a specific service:
docker-compose logs -f backend
```
