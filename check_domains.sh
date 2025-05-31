#!/bin/bash

domains=(
    "woord"
    "woordje"
    "woordjes"
    "woorden"
    "kaart"
    "kaartje"
    "kaartjes"
    "taal"
    "leren"
    "woordkaart"
    "taalmaatje"
    "leerhulp"
    "woordly"
    "dutchly"
    "dutchie"
    "nederlandje"
    "lerennl"
    "spreeknl"
)

echo "| Domain | .com | .nl |"
echo "|--------|------|-----|"

for domain in "${domains[@]}"; do
    # Check .com
    com_result=$(whois "${domain}.com" 2>/dev/null | grep -E "(No match|not found|No Data Found|No entries found)" | head -1)
    if [ -n "$com_result" ]; then
        com_status="✅ Available"
    else
        com_status="❌ Taken"
    fi
    
    # Check .nl
    nl_result=$(whois "${domain}.nl" 2>/dev/null | grep -E "(is free|available|not found)" | head -1)
    if [ -n "$nl_result" ]; then
        nl_status="✅ Available"
    else
        # Double check with Status field
        nl_status_check=$(whois "${domain}.nl" 2>/dev/null | grep "Status:" | head -1)
        if [ -n "$nl_status_check" ]; then
            nl_status="❌ Taken"
        else
            nl_status="✅ Available"
        fi
    fi
    
    echo "| ${domain} | ${com_status} | ${nl_status} |"
    sleep 1  # Be nice to whois servers
done