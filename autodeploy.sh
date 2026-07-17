#!/bin/bash

# autodeploy.sh - Watch for new images and auto-deploy

echo "🔄 Auto-deploy mode started..."
echo "Will check for new images every 60 seconds"
echo "Press Ctrl+C to stop"
echo ""

while true; do
    echo "🔄 Checking for new image..."
    
    # Read the image from deployment
    IMAGE=$(grep "image:" k8s/app-deployment.yaml | head -1 | awk '{print $2}')
    
    # Pull the latest image
    if docker pull $IMAGE 2>&1 | grep -q "Image is up to date"; then
        echo "⏭️  No new image available"
    else
        echo "📦 New image detected! Deploying..."
        kubectl rollout restart deployment/devops-dashboard
        kubectl rollout status deployment/devops-dashboard --timeout=120s
        echo "✅ Deployment updated!"
    fi
    
    echo "⏳ Waiting 60 seconds..."
    sleep 60
done