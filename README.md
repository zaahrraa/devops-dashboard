# DevOps Dashboard

A Next.js dashboard for monitoring DevOps-style metrics, Kubernetes pods, deployment health, and recent activity. The application exposes a small API layer backed by PostgreSQL and includes Docker and Kubernetes manifests for local cluster testing.

## Features

- Summary metrics for pods, deployments, uptime, CPU, memory, and services
- Kubernetes pod status and restart counts
- Current deployment version, environment, and health
- Recent activity feed
- Health endpoint for container probes
- Docker image and Minikube deployment configuration
- Kubernetes RBAC and `DashboardAlert` custom resource examples
- Prometheus and Grafana monitoring stack support

## Requirements

- Node.js 22 or newer
- pnpm 10.30.3
- PostgreSQL for dashboard data
- AWS SDK-compatible Secrets Manager endpoint for the database password
- Docker and Kubernetes/Minikube for container deployment

For Kubernetes deployment, also install `kubectl`. The shell scripts require Bash; Git Bash or WSL can be used on Windows.

## Run Locally

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Available package scripts:

```bash
pnpm dev       # Start Next.js in development mode
pnpm build     # Create a production build
pnpm start     # Start the production server
pnpm lint      # Run ESLint
```

## Configuration

The database helper reads these environment variables:

| Variable | Default | Description |
| --- | --- | --- |
| `DB_USER` | `devops` | PostgreSQL user |
| `DB_HOST` | `172.17.0.2` | PostgreSQL host |
| `DB_NAME` | `devops_dashboard` | PostgreSQL database |
| `DB_PORT` | `5432` | PostgreSQL port |

The database password is loaded from the secret `devops-dashboard-db-password` through the AWS SDK. The current implementation uses the local Secrets Manager-compatible endpoint at `http://host.docker.internal:4566` in `us-east-1`, with local credentials `test`/`test`.

The dashboard API expects these PostgreSQL tables:

- `dashboard_metrics`
- `dashboard_pods`
- `dashboard_deployments`
- `dashboard_activities`

If the database or password service cannot be reached, `/api/dashboard` returns HTTP 500 with `{ "error": "Database error" }`. The health endpoint does not query the database.

## API Endpoints

### `GET /api/dashboard`

Returns metrics, pods, deployments, and recent activities from PostgreSQL.

### `GET /api/health`

Returns a JSON health response with `status` and `timestamp`. Kubernetes uses this endpoint for liveness and readiness probes.

## Docker

Build and run the production image:

```bash
docker build -t devops-dashboard:local .
docker run --rm -p 3000:3000 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_NAME=devops_dashboard \
  -e DB_USER=devops \
  devops-dashboard:local
```

The image exposes port `3000` and runs `pnpm start`.

## Kubernetes / Minikube

The `k8s/` directory defines the application Deployment, NodePort Service, Ingress, ConfigMap, RBAC permissions, and `DashboardAlert` custom resource.

1. Start Minikube and make sure PostgreSQL and the `db-secret` secret are available in the `default` namespace.
2. Build and push the image referenced by `k8s/app-deployment.yaml`, or update that manifest to use your image.
3. Apply the manifests:

```bash
kubectl apply -f k8s/
kubectl rollout status deployment/devops-dashboard --timeout=120s
```

For the existing Docker Hub image workflow, run:

```bash
bash deploy-local.sh
```

On Windows, port-forwarding is usually the most reliable way to access the NodePort service:

```bash
kubectl port-forward service/dashboard-service 3000:80
```

Then open [http://localhost:3000](http://localhost:3000). The Ingress is configured for the host `localhost` and requires an NGINX Ingress controller.

## Prometheus and Grafana Monitoring

The Kubernetes cluster can run a Prometheus and Grafana monitoring stack in the `monitoring` namespace. Verify that the monitoring components are healthy with:

```bash
kubectl get pods -n monitoring
```

All monitoring pods should show `Running` and have all containers ready. The stack includes Alertmanager, Grafana, Prometheus Operator, kube-state-metrics, Prometheus, and node-exporter.

Useful monitoring commands:

```bash
kubectl get pods -n monitoring
kubectl get services -n monitoring
kubectl get prometheus -n monitoring
kubectl get grafana -n monitoring
```

## Troubleshooting

```bash
kubectl get pods
kubectl logs -f deployment/devops-dashboard
kubectl describe deployment devops-dashboard
kubectl rollout restart deployment/devops-dashboard
```

`start-app.sh` automates port-forwarding and opens the browser. `autodeploy.sh` polls the configured image every 60 seconds and restarts the deployment when a newer image is detected.

## Project Structure

```text
app/                    Next.js routes, layout, styles, and dashboard page
app/api/dashboard/      Dashboard data API
app/api/health/         Kubernetes health endpoint
components/             Dashboard and reusable UI components
lib/                    PostgreSQL, secrets, logging, and shared types
k8s/                    Kubernetes deployment and cluster resources
public/                 Static assets
Dockerfile              Multi-stage production image
deploy-local.sh         Minikube deployment helper
autodeploy.sh           Image polling and rollout helper
```

## Technology

- Next.js 16 with the App Router
- React 19 and TypeScript
- PostgreSQL via `pg`
- Tailwind CSS 4
- Kubernetes and Minikube
- Prometheus and Grafana for cluster monitoring
