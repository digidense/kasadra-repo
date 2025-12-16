# Kasadra Learning Platform

## Overview
A full-stack learning management platform with React frontend and FastAPI backend.

## Project Structure
- `kasadra-frontend-repo/kasadra_frontend/` - React + Vite frontend application
- `kasadra-backend-repo/learning_app/` - FastAPI Python backend
- `kasadra-infra/` - Infrastructure configuration files

## Technology Stack
- **Frontend**: React 19, Vite, Redux Toolkit, React Router, Bootstrap
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL (async with asyncpg)
- **Database**: PostgreSQL (Replit built-in)

## Running the Application
- **Frontend**: Runs on port 5000 (configured for Replit webview)
- **Backend**: Runs on port 8000 (internal, proxied through Vite)

## API Proxy Configuration
The Vite dev server proxies `/api` requests to the backend on port 8000.

## Environment Variables
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `DB_HOST`, `DB_PORT`, `POSTGRES_DB` - Database connection
- `DATABASE_URL`, `PGHOST`, `PGPORT`, etc. - Standard PostgreSQL env vars

## Recent Changes
- 2025-12-16: Initial Replit setup
  - Configured Vite to allow all hosts for Replit proxy
  - Set up API proxy from frontend to backend
  - Connected to Replit PostgreSQL database
  - Updated CORS settings for development
