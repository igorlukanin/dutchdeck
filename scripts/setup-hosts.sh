#!/bin/bash

# Script to add local domains to /etc/hosts
# Run with: sudo ./scripts/setup-hosts.sh

echo "Setting up local domains for dutchdeck..."

# Check if running with sudo
if [ "$EUID" -ne 0 ]; then 
    echo "Please run with sudo: sudo ./scripts/setup-hosts.sh"
    exit 1
fi

# Backup hosts file
cp /etc/hosts /etc/hosts.backup.$(date +%Y%m%d_%H%M%S)

# Function to add host entry if it doesn't exist
add_host() {
    local ip=$1
    local hostname=$2
    
    if ! grep -q "$hostname" /etc/hosts; then
        echo "$ip    $hostname" >> /etc/hosts
        echo "✓ Added $hostname"
    else
        echo "- $hostname already exists"
    fi
}

# Add local domains
add_host "127.0.0.1" "dutchdeck.local"
add_host "127.0.0.1" "app.dutchdeck.local"
add_host "127.0.0.1" "admin.dutchdeck.local"

echo ""
echo "Local domains configured!"
echo "You can now access:"
echo "  - http://dutchdeck.local:3002 (marketing site)"
echo "  - http://app.dutchdeck.local:3000 (main app)"
echo "  - http://admin.dutchdeck.local:3001 (admin dashboard)"
echo ""
echo "Run all apps with: pnpm dev"