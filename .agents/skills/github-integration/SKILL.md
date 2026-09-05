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

## Automated Repository Creation & Push Workflow

For any project, you don't need to manually create repositories in the browser. Use the automated script:
`./scripts/create_and_push_repo.sh`

### Usage:
```bash
./.agents/skills/github-integration/scripts/create_and_push_repo.sh [repo-name] [description] [is-private]
```
- Automatically checks if the repo exists under `https://github.com/Sri-ramar/<repo-name>`.
- If not found, calls the GitHub REST API to automatically create the repository under your account.
- Initializes git and sets branch `main` if needed.
- Commits all staged/pending files.
- Pushes to GitHub and restores a clean remote URL.

---

## Model Context Protocol (MCP) Server

The workspace is configured with `@modelcontextprotocol/server-github` in [`.agents/mcp_config.json`](../mcp_config.json).
When `GITHUB_PERSONAL_ACCESS_TOKEN` is defined in `~/.env` or environment:
- The agent directly acquires GitHub tools to create repositories, push commits, create branches, and manage issues.
- All operations are performed autonomously on behalf of `Sri-ramar`.

---

## One-Time Credential Setup

To enable fully autonomous GitHub creation and pushing:
```bash
printf "Enter GITHUB_PERSONAL_ACCESS_TOKEN (typing hidden): " && read -s val && echo && echo "GITHUB_PERSONAL_ACCESS_TOKEN=$val" >> ~/.env && echo "Saved to ~/.env."
```
Token requirements:
- Create at [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens).
- Scopes: `repo` (Full control of private and public repositories).
