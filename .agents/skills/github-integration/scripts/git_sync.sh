#!/usr/bin/env bash
set -e

PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/../../.." >/dev/null 2>&1 && pwd )"
cd "$PROJECT_DIR"

COMMIT_MSG="${1:-Update project files}"

# Ensure correct remote is set
EXPECTED_REMOTE="https://github.com/Sri-ramar/cybercore-reactor-terminal.git"
CURRENT_REMOTE="$(git remote get-url origin 2>/dev/null || true)"

if [ "$CURRENT_REMOTE" != "$EXPECTED_REMOTE" ]; then
    echo "[git-sync] Setting origin remote to $EXPECTED_REMOTE"
    git remote remove origin 2>/dev/null || true
    git remote add origin "$EXPECTED_REMOTE"
fi

# Ensure user identity
git config user.name "sriramar"
git config user.email "sriramark2005@gmail.com"

# Stage and commit if there are changes
if [ -n "$(git status --porcelain)" ]; then
    echo "[git-sync] Staging and committing changes..."
    git add .
    git commit -m "$COMMIT_MSG"
else
    echo "[git-sync] No uncommitted changes."
fi

echo "[git-sync] Ready to push to origin main:"
git push -u origin main
