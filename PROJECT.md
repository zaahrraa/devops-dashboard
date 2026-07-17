# DevOps Dashboard Project

## Overview
This project is a Next.js dashboard for visualizing DevOps-style information such as metrics, pod health, deployment status, and recent activity. The UI is backed by a Next.js API route that reads data from PostgreSQL when available and falls back to demo/sample data when the database is unavailable.

## Architecture
- Frontend: Next.js + React + Tailwind UI
- Backend/API: Next.js route in app/api/dashboard/route.ts
- Data source: PostgreSQL via lib/postgres.ts
- Fallback behavior: sample/demo data is returned if the database is unavailable
- Deployment model: Kubernetes manifests are provided under k8s/ for deployment, service, ingress, config, RBAC, and custom alerting resources

## Data Flow
1. The browser loads the main dashboard page.
2. UI components fetch data from /api/dashboard.
3. The API route queries PostgreSQL through lib/postgres.ts.
4. If the database is unavailable, the app returns fallback sample records.

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

- k8s/
  - app-deployment.yaml: Kubernetes deployment manifest for the dashboard app
  - app-service.yaml: ClusterIP service exposing the app internally on port 80
  - ingress.yaml: Ingress resource for routing requests to the service
  - configmap.yaml: ConfigMap with database and app environment values
  - rbac.yaml: ServiceAccount, Role, and RoleBinding for read-only access to pods and deployments
  - crd.yaml: CustomResourceDefinition for DashboardAlert resources
  - alert.yaml: Example DashboardAlert instance used for testing alerting behavior

- public/: static assets

## Environment
- .env contains local runtime configuration, including the PostgreSQL connection string
- .env.example shows the expected variable format
- Kubernetes manifests also rely on environment variables for database and local service access
- The deployment uses a service account named my-app-sa with limited RBAC permissions

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
- Open the app at http://localhost:3000

## Kubernetes / Minikube Notes
- Apply the manifests from the k8s/ folder to a running cluster.
- The deployment targets port 3000 and the service exposes it internally on port 80.
- For local Minikube testing, port-forwarding or minikube tunnel may be required depending on the environment.
- On Windows with the Minikube Docker driver, NodePort access can be inconsistent, so port-forwarding is often the most reliable option.
- RBAC is configured to allow the app service account to read pods, deployments, and pod logs in the default namespace.
- The project also includes a custom resource definition for DashboardAlert, enabling lightweight alert objects to be created and managed inside the cluster.

## Notes
- This project currently uses Next.js API routes as the backend layer rather than a separate Express service.
- The deployment setup is intended for local cluster testing and development workflows.
- The Kubernetes configuration is being used to explore service access, ingress routing, RBAC behavior, and custom alert resources in a local cluster environment.
