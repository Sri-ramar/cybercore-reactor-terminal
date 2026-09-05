#!/usr/bin/env python3
import os
import sys
import json
import urllib.request
import urllib.error
import subprocess

def main():
    repo_name = sys.argv[1] if len(sys.argv) > 1 else os.path.basename(os.getcwd())
    description = sys.argv[2] if len(sys.argv) > 2 else repo_name
    is_private = sys.argv[3].lower() == "true" if len(sys.argv) > 3 else False

    username = "Sri-ramar"
    email = "sriramark2005@gmail.com"

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
        print("[error] GITHUB_PERSONAL_ACCESS_TOKEN not found in environment or ~/.env", file=sys.stderr)
        sys.exit(1)

    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Antigravity-Agent",
    }

    # 1. Check if repo exists
    check_url = f"https://api.github.com/repos/{username}/{repo_name}"
    req = urllib.request.Request(check_url, headers=headers)
    exists = False
    try:
        with urllib.request.urlopen(req) as resp:
            if resp.status == 200:
                exists = True
                print(f"[github] Repository '{username}/{repo_name}' already exists.")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            exists = False
        else:
            print(f"[warning] Checking repository returned HTTP {e.code}: {e.reason}")

    # 2. Create repo if not exists
    if not exists:
        print(f"[github] Creating repository '{username}/{repo_name}' on GitHub...")
        create_url = "https://api.github.com/user/repos"
        payload = json.dumps({
            "name": repo_name,
            "description": description,
            "private": is_private,
        }).encode("utf-8")
        create_req = urllib.request.Request(create_url, data=payload, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(create_req) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                print(f"[github] Successfully created repository: {data.get('html_url')}")
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="replace")
            print(f"[error] Failed to create repository (HTTP {e.code}): {err_body}", file=sys.stderr)
            sys.exit(1)

    # 3. Setup git
    subprocess.run(["git", "init"], check=True)
    subprocess.run(["git", "config", "user.name", "sriramar"], check=True)
    subprocess.run(["git", "config", "user.email", email], check=True)
    subprocess.run(["git", "branch", "-M", "main"], check=True)

    # Check for uncommitted files
    status = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True).stdout.strip()
    if status:
        print("[github] Staging and committing changes...")
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", f"feat: sync project {repo_name}"], check=True)

    # 4. Push to remote
    auth_remote = f"https://x-access-token:{token}@github.com/{username}/{repo_name}.git"
    clean_remote = f"https://github.com/{username}/{repo_name}.git"

    subprocess.run(["git", "remote", "remove", "origin"], stderr=subprocess.DEVNULL)
    subprocess.run(["git", "remote", "add", "origin", auth_remote], check=True)

    print(f"[github] Pushing to branch 'main'...")
    push_res = subprocess.run(["git", "push", "-u", "origin", "main"])
    
    # Restore clean remote so token is never stored in .git/config
    subprocess.run(["git", "remote", "set-url", "origin", clean_remote], check=True)

    if push_res.returncode == 0:
        print(f"\n🚀 [github] Successfully pushed to: {clean_remote}")
    else:
        print(f"\n[error] Git push exited with code {push_res.returncode}", file=sys.stderr)
        sys.exit(push_res.returncode)

if __name__ == "__main__":
    main()
