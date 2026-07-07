# ProjectXCode

ProjectXCode is a premium, full-stack application comprising a React + Vite frontend and a Django backend, fully containerized with Docker and configured for production-grade deployments.

## Repository Layout

```
ProjectXCode/
├── frontend/                      # React Frontend (Vite)
├── backend/                       # Django Backend REST API
├── docs/                          # Architecture & API Specifications
├── deployment/                    # Docker, Nginx & Deployment configuration
├── .env                           # Environment configurations
├── .gitignore                     # Git exclusion rules
├── README.md                      # Setup & documentation (This file)
└── LICENSE                        # MIT License
```

## Quick Start (Local Development)

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.10+) & pip

### Backend Setup
1. Change directory to `backend/` and create a virtual environment:
   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\activate
   ```
2. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
3. Run migrations and start development server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup
1. Change directory to `frontend/`:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### Docker Setup
To spin up the entire application stack including backend, frontend, and Nginx proxy:
```bash
docker-compose -f deployment/docker-compose.yml up --build
```
The application will be accessible at `http://localhost`.

## License
MIT License
