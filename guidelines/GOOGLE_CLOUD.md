# Google Cloud Deployment Guide

This project is designed to run on **Google Cloud Platform** and locally for development.

## Target Architecture

- **Compute**: Google Cloud Run (containerized, serverless)
- **AI/ML**: Google Gemini API (via `google-genai` SDK)
- **Region**: us-central1 (default)

## Project Structure Requirements

```
project/
├── app.py              # Main application (Flask/FastAPI)
├── requirements.txt    # Python dependencies
├── Dockerfile          # Container definition
├── .dockerignore       # Exclude files from container
├── .env                # Local environment variables (gitignored)
└── static/             # Static assets (if any)
```

## Required Files

### Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

COPY . .

EXPOSE 8080

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "1", "--threads", "8", "--timeout", "120", "app:app"]
```

### .dockerignore
```
__pycache__
*.pyc
*.pyo
.env
.git
.gitignore
*.md
.DS_Store
```

### .gitignore (include these)
```
.env
__pycache__/
*.pyc
.DS_Store
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `PORT` | Server port (Cloud Run sets this) | Auto |

### Local Development
Create `.env` file:
```
GEMINI_API_KEY=your-api-key-here
```

### Production (Cloud Run)
Set via deployment command or GCP Console.

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
python app.py
# App runs at http://localhost:8080
```

## Deployment Commands

### First-time Setup
```bash
# Create project
gcloud projects create PROJECT_ID --name="Project Name"

# Link billing
gcloud billing projects link PROJECT_ID --billing-account=BILLING_ACCOUNT_ID

# Set project
gcloud config set project PROJECT_ID

# Enable APIs
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
```

### Deploy to Cloud Run
```bash
gcloud run deploy SERVICE_NAME \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "GEMINI_API_KEY=your-key" \
  --memory 1Gi \
  --timeout 120
```

### Update Environment Variables
```bash
gcloud run services update SERVICE_NAME \
  --region us-central1 \
  --set-env-vars "GEMINI_API_KEY=new-key"
```

### View Logs
```bash
gcloud run logs read SERVICE_NAME --region us-central1
```

## App Configuration

### Flask App Pattern
```python
import os
from flask import Flask
from dotenv import load_dotenv

load_dotenv()  # Load .env for local dev

app = Flask(__name__)

# Get API key (works locally and on Cloud Run)
API_KEY = os.getenv("GEMINI_API_KEY")

# Cloud Run sets PORT, default to 8080 for local
if __name__ == '__main__':
    port = int(os.getenv("PORT", 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
```

## Cost Optimization

- Cloud Run scales to zero (no cost when idle)
- Use `--memory 512Mi` for simple apps, `1Gi` for AI workloads
- Set `--max-instances` to limit scaling

## Common Issues

| Issue | Solution |
|-------|----------|
| Billing not enabled | `gcloud billing projects link PROJECT_ID --billing-account=ACCOUNT_ID` |
| API not enabled | `gcloud services enable SERVICE_NAME.googleapis.com` |
| Permission denied | Check IAM roles in GCP Console |
| Container timeout | Increase `--timeout` (max 3600s) |

## Useful Commands

```bash
# List projects
gcloud projects list

# List billing accounts
gcloud billing accounts list

# Check current project
gcloud config get-value project

# View deployed services
gcloud run services list

# Delete a service
gcloud run services delete SERVICE_NAME --region us-central1
```
