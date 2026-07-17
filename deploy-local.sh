#!/bin/bash

# deploy-local.sh - Pull latest image from Docker Hub and deploy to Minikube

echo "🚀 Starting deployment to Minikube..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Check if Minikube is running
echo "📋 Checking Minikube status..."
if ! minikube status > /dev/null 2>&1; then
    echo -e "${RED}❌ Minikube is not running.${NC}"
    echo "Starting Minikube..."
    minikube start
else
    echo -e "${GREEN}✅ Minikube is running${NC}"
fi
echo ""

# 2. Set Docker environment to use Minikube's Docker daemon
echo "🐳 Setting Docker environment to Minikube..."
eval $(minikube -p minikube docker-env)
echo -e "${GREEN}✅ Docker environment set${NC}"
echo ""

# 3. Pull the latest image from Docker Hub
echo "📦 Pulling latest image from Docker Hub..."
# Read the image from the deployment file
IMAGE=$(grep "image:" k8s/app-deployment.yaml | head -1 | awk '{print $2}')
echo "Image: $IMAGE"

if docker pull $IMAGE; then
    echo -e "${GREEN}✅ Image pulled successfully${NC}"
else
    echo -e "${RED}❌ Failed to pull image${NC}"
    exit 1
fi
echo ""

# 4. Apply Kubernetes manifests
echo "📋 Applying Kubernetes manifests..."
kubectl apply -f k8s/
echo -e "${GREEN}✅ Manifests applied${NC}"
echo ""

# 5. Force rollout restart to pick up new image
echo "🔄 Restarting deployment to pick up new image..."
kubectl rollout restart deployment/devops-dashboard
echo ""

# 6. Wait for rollout to complete
echo "⏳ Waiting for rollout to complete..."
if kubectl rollout status deployment/devops-dashboard --timeout=120s; then
    echo -e "${GREEN}✅ Rollout complete!${NC}"
else
    echo -e "${RED}❌ Rollout timed out${NC}"
    echo "Check pod status: kubectl get pods"
    echo "Check pod logs: kubectl logs -f deployment/devops-dashboard"
    exit 1
fi
echo ""

# 7. Show pod status
echo "📊 Pod status:"
kubectl get pods
echo ""

# 8. Get the service URL
echo "🌐 Getting service URL..."
SERVICE_URL=$(minikube service devops-dashboard --url 2>/dev/null || echo "Service not found")
if [ -n "$SERVICE_URL" ]; then
    echo -e "${GREEN}✅ Service URL: $SERVICE_URL${NC}"
else
    echo -e "${YELLOW}⚠️  Service not found. Check service status:${NC}"
    kubectl get svc
    echo ""
    echo "Try port-forwarding:"
    echo "kubectl port-forward service/devops-dashboard 3000:80"
fi
echo ""

# 9. Show helpful commands
echo "📚 Useful commands:"
echo "  - Check logs:        kubectl logs -f deployment/devops-dashboard"
echo "  - Get pods:          kubectl get pods"
echo "  - Describe pod:      kubectl describe pod <pod-name>"
echo "  - Port forward:      kubectl port-forward service/devops-dashboard 3000:80"
echo "  - Restart manually:  kubectl rollout restart deployment/devops-dashboard"
echo ""

echo -e "${GREEN}🎉 Deployment complete!${NC}"