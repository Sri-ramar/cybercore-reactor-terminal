#!/usr/bin/env python3
"""
Dedicated Model Context Protocol (MCP) Server for Sri-ramar's GitHub Projects.
Provides agentic tools to automatically create repositories, check status, and push code.
"""

import os
import sys
import json
import urllib.request
import urllib.error
import subprocess
from typing import Optional
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("sri-github-manager")

USERNAME = "Sri-ramar"
USER_EMAIL = "sriramark2005@gmail.com"

def get_token() -> str:
    token = os.environ.get("GITHUB_PERSONAL_ACCESS_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if not token:
        env_file = os.path.expanduser("~/.env")
        if os.path.exists(env_file):
            with open(env_file, "r") as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("GITHUB_PERSONAL_ACCESS_TOKEN=") or line.startswith("GITHUB_TOKEN="):
                        token = line.split("=", 1)[1].strip().strip("\"'")
                        break
    if not token:
        raise ValueError("GitHub Personal Access Token not found in environment or ~/.env")
    return token

def github_request(endpoint: str, data: Optional[dict] = None, method: Optional[str] = None) -> dict:
    token = get_token()
    url = f"https://api.github.com/{endpoint.lstrip('/')}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Antigravity-Sri-GitHub-Manager",
    }
    encoded_data = json.dumps(data).encode("utf-8") if data is not None else None
    req = urllib.request.Request(url, data=encoded_data, headers=headers, method=method)
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode("utf-8")
        return json.loads(content) if content else {}

@mcp.tool()
def github_create_and_push(
    project_dir: str,
    repo_name: str = "",
    description: str = "",
    is_private: bool = False,
    commit_message: str = "Initial commit"
) -> str:
    """
    Automatically creates a new repository on GitHub under Sri-ramar (if not exists),
    initializes Git, stages all files, commits, and pushes to origin main.

    Args:
        project_dir: Absolute path to the local project folder.
        repo_name: Name of the repository on GitHub. Defaults to folder name.
        description: Short description for the GitHub repository.
        is_private: Whether the repository should be private (default: False).
        commit_message: Git commit message for pending changes.
    """
    project_dir = os.path.abspath(os.path.expanduser(project_dir))
    if not os.path.isdir(project_dir):
        return f"Error: Directory does not exist: {project_dir}"

    repo = repo_name.strip() or os.path.basename(project_dir)
    desc = description.strip() or f"{repo} project"

    token = get_token()
    
    # 1. Check if repository exists
    check_url = f"https://api.github.com/repos/{USERNAME}/{repo}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Antigravity-Sri-GitHub-Manager",
    }
    req = urllib.request.Request(check_url, headers=headers)
    exists = False
    try:
        with urllib.request.urlopen(req) as resp:
            if resp.status == 200:
                exists = True
    except urllib.error.HTTPError as e:
        if e.code == 404:
            exists = False
        else:
            return f"Error checking GitHub repository: HTTP {e.code} ({e.reason})"

    # 2. Create if not exists
    if not exists:
        try:
            github_request("user/repos", data={
                "name": repo,
                "description": desc,
                "private": is_private
            }, method="POST")
            created_msg = f"Created new GitHub repository: https://github.com/{USERNAME}/{repo}"
        except urllib.error.HTTPError as e:
            err = e.read().decode("utf-8", errors="replace")
            return f"Error creating repository on GitHub: HTTP {e.code}: {err}"
    else:
        created_msg = f"Repository already exists: https://github.com/{USERNAME}/{repo}"

    # 3. Git Operations
    cwd = project_dir
    subprocess.run(["git", "init"], cwd=cwd, check=True, stdout=subprocess.DEVNULL)
    subprocess.run(["git", "config", "user.name", "sriramar"], cwd=cwd, check=True)
    subprocess.run(["git", "config", "user.email", USER_EMAIL], cwd=cwd, check=True)
    subprocess.run(["git", "branch", "-M", "main"], cwd=cwd, check=True)

    status = subprocess.run(["git", "status", "--porcelain"], cwd=cwd, capture_output=True, text=True).stdout.strip()
    if status:
        subprocess.run(["git", "add", "."], cwd=cwd, check=True)
        subprocess.run(["git", "commit", "-m", commit_message], cwd=cwd, check=True)

    auth_remote = f"https://x-access-token:{token}@github.com/{USERNAME}/{repo}.git"
    clean_remote = f"https://github.com/{USERNAME}/{repo}.git"

    subprocess.run(["git", "remote", "remove", "origin"], cwd=cwd, stderr=subprocess.DEVNULL)
    subprocess.run(["git", "remote", "add", "origin", auth_remote], cwd=cwd, check=True)

    push_res = subprocess.run(["git", "push", "-u", "origin", "main"], cwd=cwd, capture_output=True, text=True)

    # Always restore clean remote so token is not retained in .git/config
    subprocess.run(["git", "remote", "set-url", "origin", clean_remote], cwd=cwd, check=True)

    if push_res.returncode != 0:
        return f"{created_msg}\nError during git push:\n{push_res.stderr}"

    return f"Success!\n- {created_msg}\n- Pushed branch 'main' to: {clean_remote}"

@mcp.tool()
def github_sync_and_push(project_dir: str, commit_message: str = "chore: sync updates") -> str:
    """
    Stages all modified/untracked files in the project directory, commits them,
    and pushes to the configured remote repository on GitHub.
    """
    project_dir = os.path.abspath(os.path.expanduser(project_dir))
    if not os.path.isdir(project_dir):
        return f"Error: Directory does not exist: {project_dir}"

    cwd = project_dir
    token = get_token()

    remote_url = subprocess.run(["git", "remote", "get-url", "origin"], cwd=cwd, capture_output=True, text=True).stdout.strip()
    if not remote_url:
        return "Error: No git remote 'origin' configured. Use github_create_and_push first."

    subprocess.run(["git", "config", "user.name", "sriramar"], cwd=cwd, check=True)
    subprocess.run(["git", "config", "user.email", USER_EMAIL], cwd=cwd, check=True)

    status = subprocess.run(["git", "status", "--porcelain"], cwd=cwd, capture_output=True, text=True).stdout.strip()
    if status:
        subprocess.run(["git", "add", "."], cwd=cwd, check=True)
        subprocess.run(["git", "commit", "-m", commit_message], cwd=cwd, check=True)
        commit_info = f"Committed changes with message: '{commit_message}'"
    else:
        commit_info = "Working tree clean, no new changes to commit."

    # Push with token
    if "github.com/" in remote_url:
        repo_path = remote_url.split("github.com/")[-1].replace(".git", "")
        auth_url = f"https://x-access-token:{token}@github.com/{repo_path}.git"
        subprocess.run(["git", "remote", "set-url", "origin", auth_url], cwd=cwd, check=True)
        push_res = subprocess.run(["git", "push", "-u", "origin", "main"], cwd=cwd, capture_output=True, text=True)
        subprocess.run(["git", "remote", "set-url", "origin", f"https://github.com/{repo_path}.git"], cwd=cwd, check=True)

        if push_res.returncode != 0:
            return f"{commit_info}\nError pushing to GitHub:\n{push_res.stderr}"

    return f"Success!\n- {commit_info}\n- Synchronized and pushed to: {remote_url}"

@mcp.tool()
def github_check_repo(repo_name: str) -> str:
    """
    Checks if a repository exists under Sri-ramar on GitHub and returns its metadata.
    """
    repo = repo_name.strip()
    token = get_token()
    url = f"https://api.github.com/repos/{USERNAME}/{repo}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Antigravity-Sri-GitHub-Manager",
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return json.dumps({
                "name": data.get("name"),
                "full_name": data.get("full_name"),
                "html_url": data.get("html_url"),
                "private": data.get("private"),
                "description": data.get("description"),
                "default_branch": data.get("default_branch"),
                "created_at": data.get("created_at"),
                "updated_at": data.get("updated_at"),
            }, indent=2)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return f"Repository '{USERNAME}/{repo}' does NOT exist on GitHub."
        return f"Error checking repository: HTTP {e.code}: {e.reason}"

@mcp.tool()
def github_list_user_repos() -> str:
    """
    Lists all repositories owned by user Sri-ramar.
    """
    try:
        data = github_request(f"users/{USERNAME}/repos?per_page=100&sort=updated")
        repos = [{
            "name": r.get("name"),
            "html_url": r.get("html_url"),
            "private": r.get("private"),
            "description": r.get("description"),
            "updated_at": r.get("updated_at")
        } for r in data]
        return json.dumps(repos, indent=2)
    except Exception as e:
        return f"Error listing repositories: {str(e)}"

if __name__ == "__main__":
    mcp.run()
