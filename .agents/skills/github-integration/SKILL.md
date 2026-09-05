---
name: github-integration
description: >-
  Manage GitHub repository linking, commits, branches, and remote pushing for
  user Sri-ramar (sriramark2005@gmail.com). Use whenever the user asks to push
  to git, link or sync repositories to GitHub, or configure remotes for
  cybercore-reactor-terminal.
---

# GitHub Integration & Push Workflow for Sri-ramar

This skill documents and automates GitHub repository operations, remote linking, and push procedures for user **Sri-ramar**.

## User & Repository Identity
- **GitHub Profile**: [https://github.com/Sri-ramar](https://github.com/Sri-ramar)
- **Author Name**: `sriramar`
- **Author Email**: `sriramark2005@gmail.com`
- **Default Branch**: `main`
- **Target Repository (HTTPS)**: `https://github.com/Sri-ramar/cybercore-reactor-terminal.git`
- **Target Repository (SSH)**: `git@github.com:Sri-ramar/cybercore-reactor-terminal.git`

---

## Standard Workflow

### 1. Verification & Remote Link
Always ensure the local repository has the correct remote configured:
```bash
git remote set-url origin https://github.com/Sri-ramar/cybercore-reactor-terminal.git
```

### 2. Staging & Committing
Stage modified and untracked files (adhering to `.gitignore`):
```bash
git add .
git commit -m "<descriptive message>"
```

### 3. Pushing Changes
Push to the `main` branch on `origin`:
```bash
git push -u origin main
```

If authentication is needed:
- Git credential storage is configured via `git config --global credential.helper store`.
- Use GitHub Personal Access Token (classic or fine-grained) with `repo` scope when prompted for the password.

---

## Automated Sync Script
A helper script is available at:
`./scripts/git_sync.sh`

Run it to check git status, commit pending changes, and attempt push:
```bash
./.agents/skills/github-integration/scripts/git_sync.sh "Commit message"
```
