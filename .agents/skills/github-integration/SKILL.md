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

The workspace includes a dedicated FastMCP server:
- Implementation: [`.agents/mcp/github_mcp_server.py`](../../mcp/github_mcp_server.py)
- Configuration: [`.agents/mcp_config.json`](../../mcp_config.json)

### Exposed MCP Tools:
1. `github_create_and_push`: Autonomously creates remote repository, initializes local Git, and pushes.
2. `github_sync_and_push`: Fast commit and push for ongoing work.
3. `github_check_repo`: Verifies remote repository status, visibility, and metadata.
4. `github_list_user_repos`: Lists all repositories for `Sri-ramar`.

See full schema in [references/mcp_tools.md](./references/mcp_tools.md).

---

## One-Time Credential Setup

To enable fully autonomous GitHub creation and pushing:
```bash
printf "Enter GITHUB_PERSONAL_ACCESS_TOKEN (typing hidden): " && read -s val && echo && echo "GITHUB_PERSONAL_ACCESS_TOKEN=$val" >> ~/.env && echo "Saved to ~/.env."
```
Token requirements:
- Create at [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens).
- Scopes: `repo` (Full control of private and public repositories).
