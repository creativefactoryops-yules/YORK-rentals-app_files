import subprocess, base64, json, sys
repo = sys.argv[1] if len(sys.argv) > 1 else 'YORK-rentals-app_files'
path = sys.argv[2] if len(sys.argv) > 2 else 'package.json'
raw = subprocess.check_output(['gh','api',f'repos/creativefactoryops-yules/{repo}/contents/{path}','--jq','.content'], text=True, stderr=subprocess.DEVNULL).strip()
content = base64.b64decode(raw).decode('utf-8', errors='replace')
print(f'--- {path} ---')
print(content)