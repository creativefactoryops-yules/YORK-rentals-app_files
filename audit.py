import subprocess, json, base64

repos = ["Agent0", "mood-voice", "jungle-budgie", "ai-review-responder"]

for repo in repos:
    print(f"Checking {repo}...")
    raw = subprocess.check_output(
        ["gh", "api", f"repos/creativefactoryops-yules/{repo}/deployments", "--jq", ".[0].id"],
        text=True, stderr=subprocess.DEVNULL
    ).strip()
    if raw:
        print(f"  Deployment ID: {raw}")
    else:
        print(f"  No deployment found")