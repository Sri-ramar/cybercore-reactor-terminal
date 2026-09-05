# Sri-Ramar GitHub Manager MCP Tools Reference

The `sri-github-manager` Model Context Protocol (MCP) server provides automated GitHub and Git operations.

## Available Tools

### 1. `github_create_and_push`
- **Description**: Creates a new repository under `Sri-ramar` on GitHub if it doesn't already exist, initializes Git locally, commits pending changes, and pushes to branch `main`.
- **Arguments**:
  - `project_dir` (string, required): Absolute path to the local project folder.
  - `repo_name` (string, optional): Remote repo name on GitHub (defaults to folder basename).
  - `description` (string, optional): Short description for the GitHub repository.
  - `is_private` (boolean, optional): Whether the repository should be private (default: `false`).
  - `commit_message` (string, optional): Commit message for unstaged files.

### 2. `github_sync_and_push`
- **Description**: Stages any uncommitted/modified files in the project folder, commits them, and pushes to `origin main`.
- **Arguments**:
  - `project_dir` (string, required): Absolute path to the local project folder.
  - `commit_message` (string, optional): Commit message.

### 3. `github_check_repo`
- **Description**: Inspects whether `Sri-ramar/<repo_name>` exists on GitHub and returns its metadata (visibility, stars, URLs, branch).
- **Arguments**:
  - `repo_name` (string, required): Name of the repository.

### 4. `github_list_user_repos`
- **Description**: Lists all repositories owned by `Sri-ramar` sorted by recent updates.
- **Arguments**: None.
