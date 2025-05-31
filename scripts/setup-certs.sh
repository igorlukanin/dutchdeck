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
sudo mkcert "dutchdeck.local" "*.dutchdeck.local"

# Rename for clarity
mv dutchdeck.local+1.pem dutchdeck.local.pem
mv dutchdeck.local+1-key.pem dutchdeck.local-key.pem

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
echo "  - https://dutchdeck.local"
echo "  - https://app.dutchdeck.local"
echo "  - https://admin.dutchdeck.local"