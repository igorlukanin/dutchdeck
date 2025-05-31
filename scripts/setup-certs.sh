#!/bin/bash

# Script to generate SSL certificates for local development
# Requires: mkcert (brew install mkcert)

echo "Setting up SSL certificates for local development..."

# Check if mkcert is installed
if ! command -v mkcert &> /dev/null; then
    echo "mkcert not found. Install with: brew install mkcert"
    echo "Then run: mkcert -install"
    exit 1
fi

# Create certificates directory
CERT_DIR="nginx/certs"
mkdir -p "$CERT_DIR"

# Generate certificates with mkcert
echo "Generating SSL certificates..."
cd "$CERT_DIR"
mkcert "woorden.local" "*.woorden.local"

# Rename for clarity
mv woorden.local+1.pem woorden.local.pem
mv woorden.local+1-key.pem woorden.local-key.pem

cd ../..

echo ""
echo "✓ Certificates created in $CERT_DIR"
echo ""
echo "Next steps:"
echo "1. Run: pnpm setup:hosts (if not already done)"
echo "2. Start nginx proxy: docker-compose up -d"
echo "3. Run your apps: pnpm dev"
echo ""
echo "You can then access:"
echo "  - https://woorden.local"
echo "  - https://app.woorden.local"
echo "  - https://admin.woorden.local"