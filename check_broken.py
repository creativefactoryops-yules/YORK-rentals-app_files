import subprocess, json, sys
repos = ['YORK-rentals-app_files','deployEXEC','sound-self-studio','ARTofUPHOLSTERY']
for r in repos:
    print(f'=== {r} ===')
    d = subprocess.check_output(['gh','api',f'repos/creativefactoryops-yules/{r}/deployments','--jq','.[0]'], text=True, stderr=subprocess.DEVNULL).strip()
    print('deployment:', d)
    try:
        obj = json.loads(d)
    except Exception as e:
        print('json error', e)
        continue
    s = subprocess.check_output(['gh','api',f'repos/creativefactoryops-yules/{r}/deployments/{obj["id"]}/statuses','--jq','.[0] // empty'], text=True, stderr=subprocess.DEVNULL).strip()
    print('status:', s)