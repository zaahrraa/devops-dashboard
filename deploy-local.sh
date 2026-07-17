#!/bin/bash

# deploy-local.sh - Deploy latest image from Docker Hub to Minikube

echo "🚀 Starting deployment to Minikube..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
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

# 3. Get the image from deployment file
IMAGE=$(grep "image:" k8s/app-deployment.yaml | head -1 | awk '{print $2}')
echo "📦 Target image: $IMAGE"
echo ""

# 4. Pull the latest image from Docker Hub
echo "📥 Pulling image from Docker Hub..."
if docker pull $IMAGE; then
    echo -e "${GREEN}✅ Image pulled successfully${NC}"
else
    echo -e "${RED}❌ Failed to pull image${NC}"
    echo "Make sure you've pushed the image to Docker Hub first!"
    echo "Run: docker push $IMAGE"
    exit 1
fi
echo ""

# 5. Apply Kubernetes manifests
echo "📋 Applying Kubernetes manifests..."
kubectl apply -f k8s/
echo -e "${GREEN}✅ Manifests applied${NC}"
echo ""

# 6. Force rollout restart to pick up new image
echo "🔄 Restarting deployment to pick up new image..."
kubectl rollout restart deployment/devops-dashboard
echo ""

# 7. Wait for rollout to complete
echo "⏳ Waiting for rollout to complete..."
if kubectl rollout status deployment/devops-dashboard --timeout=120s; then
    echo -e "${GREEN}✅ Rollout complete!${NC}"
else
    echo -e "${RED}❌ Rollout timed out${NC}"
    echo ""
    echo "📊 Debug commands:"
    echo "  - Check pod status: kubectl get pods"
    echo "  - Check logs: kubectl logs -f deployment/devops-dashboard"
    echo "  - Describe pod: kubectl describe pod <pod-name>"
    exit 1
fi
echo ""

# 8. Show pod status
echo "📊 Pod status:"
kubectl get pods
echo ""

# 9. Access information
echo "🌐 Access your app:"
echo ""

# Show NodePort info (for reference)
MINIKUBE_IP=$(minikube ip 2>/dev/null || echo "")
NODEPORT=$(kubectl get svc dashboard-service -o jsonpath='{.spec.ports[0].nodePort}' 2>/dev/null || echo "")

if [ -n "$MINIKUBE_IP" ] && [ -n "$NODEPORT" ]; then
    echo -e "${YELLOW}ℹ️  NodePort URL (may not work on Windows):${NC}"
    echo "   http://$MINIKUBE_IP:$NODEPORT"
    echo ""
fi

# Port-forward option (ALWAYS WORKS)
echo -e "${GREEN}✅ RECOMMENDED: Port-Forward (Always Works)${NC}"
echo "   In a NEW terminal, run:"
echo -e "${BLUE}   kubectl port-forward service/dashboard-service 3000:80${NC}"
echo -e "${GREEN}   Then open: http://localhost:3000${NC}"
echo ""

# Alternative: Auto port-forward in background
echo -e "${YELLOW}💡 BONUS: Auto port-forward in background${NC}"
echo "   To run port-forward in background and keep it running:"
echo -e "${BLUE}   nohup kubectl port-forward service/dashboard-service 3000:80 &${NC}"
echo "   Then open: http://localhost:3000"
echo ""

# 10. Helpful commands
echo "📚 Quick Commands:"
echo "  - Check logs:        kubectl logs -f deployment/devops-dashboard"
echo "  - Get pods:          kubectl get pods"
echo "  - Restart manually:  kubectl rollout restart deployment/devops-dashboard"
echo "  - Check service:     kubectl get svc dashboard-service"
echo "  - Port-forward:      kubectl port-forward service/dashboard-service 3000:80"
echo "  - Stop port-forward: Press Ctrl+C in the terminal running it"
echo ""

echo -e "${GREEN}🎉 Deployment complete!${NC}"