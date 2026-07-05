# DevOps Dashboard Project

## Overview
This project is a Next.js dashboard for displaying DevOps-style information such as metrics, Kubernetes pods, deployment status, and recent activity. The UI is connected to a backend API route that reads data from PostgreSQL.

## Architecture
- Frontend: Next.js + React
- Backend/API: Next.js API route in app/api/dashboard/route.ts
- Database: PostgreSQL
- Data access: PostgreSQL client via the pg package

## Data Flow
1. The browser loads the main dashboard page.
2. UI components fetch data from /api/dashboard.
3. The API route calls PostgreSQL through lib/postgres.ts.
4. If the database is unavailable, the app falls back to sample/demo data.

## Project Structure
- app/
  - page.tsx: main dashboard page
  - api/dashboard/route.ts: API endpoint that returns dashboard data
  - globals.css: global styling
  - layout.tsx: app layout

- components/
  - header.tsx: top header
  - sidebar.tsx: left navigation
  - metrics-grid.tsx: summary metrics cards
  - kubernetes-section.tsx: pods table
  - deployments-section.tsx: deployment card and actions
  - activity-feed.tsx: recent activity list
  - ui/: reusable UI primitives

- lib/
  - postgres.ts: PostgreSQL connection and query logic
  - dashboard-types.ts: TypeScript interfaces for dashboard data
  - utils.ts: helper utilities

- public/: static assets

## Environment
- .env contains the PostgreSQL connection string
- .env.example shows the expected variable format

## Expected Database Tables
The app expects these tables in PostgreSQL:
- dashboard_metrics
- dashboard_pods
- dashboard_deployments
- dashboard_activities

## Run Locally
- Install dependencies: pnpm install
- Start the app: pnpm dev
- Build for production: pnpm build

## Notes
- This project currently uses Next.js API routes as the backend layer.
- It does not use a separate Express server.
- A Docker-based setup can be added later if you want to containerize the frontend, backend, and database separately.
