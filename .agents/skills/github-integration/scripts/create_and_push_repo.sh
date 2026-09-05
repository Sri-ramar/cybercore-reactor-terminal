#!/usr/bin/env bash
set -e

REPO_NAME="${1:-$(basename "$PWD")}"
DESCRIPTION="${2:-$REPO_NAME}"
IS_PRIVATE="${3:-false}"
USER_NAME="Sri-ramar"
USER_EMAIL="sriramark2005@gmail.com"

# 1. Load Token safely
TOKEN="${GITHUB_PERSONAL_ACCESS_TOKEN:-$GITHUB_TOKEN}"

if [ -z "$TOKEN" ] && [ -f "$HOME/.env" ]; then
    TOKEN=$(grep -m1 -E '^(GITHUB_PERSONAL_ACCESS_TOKEN|GITHUB_TOKEN)=' "$HOME/.env" | cut -d '=' -f2- | tr -d '"'"' ')
fi

if [ -z "$TOKEN" ] && [ -f ".env" ]; then
    TOKEN=$(grep -m1 -E '^(GITHUB_PERSONAL_ACCESS_TOKEN|GITHUB_TOKEN)=' ".env" | cut -d '=' -f2- | tr -d '"'"' ')
fi

if [ -z "$TOKEN" ]; then
    echo "[error] GitHub token not found."
    echo "[error] Please add GITHUB_PERSONAL_ACCESS_TOKEN to ~/.env"
    exit 1
fi

# 2. Check if repository exists on GitHub
echo "[github] Checking repository $USER_NAME/$REPO_NAME..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $TOKEN" "https://api.github.com/repos/$USER_NAME/$REPO_NAME")

if [ "$HTTP_CODE" -eq 404 ]; then
    echo "[github] Creating repository '$REPO_NAME' on GitHub..."
    CREATE_RESP=$(curl -s -w "\n%{http_code}" -X POST "https://api.github.com/user/repos" \
        -H "Authorization: Bearer $TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -d "{\"name\":\"$REPO_NAME\",\"description\":\"$DESCRIPTION\",\"private\":$IS_PRIVATE}")
    
    RESP_STATUS=$(echo "$CREATE_RESP" | tail -n1)
    if [ "$RESP_STATUS" -ne 201 ]; then
        echo "[error] Failed to create repository (HTTP $RESP_STATUS):"
        echo "$CREATE_RESP" | sed '$d'
        exit 1
    fi
    echo "[github] Repository created successfully: https://github.com/$USER_NAME/$REPO_NAME"
elif [ "$HTTP_CODE" -eq 200 ]; then
    echo "[github] Repository already exists: https://github.com/$USER_NAME/$REPO_NAME"
else
    echo "[warning] GitHub API returned status $HTTP_CODE"
fi

# 3. Initialize Git if not already done
if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

git config user.name "sriramar"
git config user.email "$USER_EMAIL"

# 4. Commit any pending files
if [ -n "$(git status --porcelain)" ]; then
    echo "[github] Staging and committing changes..."
    git add .
    git commit -m "feat: initial commit for $REPO_NAME"
fi

# 5. Push to GitHub using token-authenticated remote, then restore clean remote
echo "[github] Pushing to origin main..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://x-access-token:${TOKEN}@github.com/$USER_NAME/${REPO_NAME}.git"

git push -u origin main

# Restore clean remote URL so token is never saved in .git/config
git remote set-url origin "https://github.com/$USER_NAME/${REPO_NAME}.git"

echo "[github] All set! Project pushed to: https://github.com/$USER_NAME/$REPO_NAME"
