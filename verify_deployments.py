import subprocess, json, urllib.request, base64

repos_with_deployments = {
    'YORK-rentals-app_files': 'york-rentals-app-files.vercel.app',
    'deployEXEC': 'deploy-exec.vercel.app',
    'Agent0': 'agent0-saas.vercel.app',
    'ai-review-responder': 'ai-review-responder.vercel.app',
    'sound-self-studio': 'sound-self-studio.vercel.app',
    'Logocraft-ai': 'logocraft-ai.vercel.app',
    'nextjs-with-supabase': 'nextjs-with-supabase.vercel.app',
    'ARTofUPHOLSTERY': 'art-of-upholstery.vercel.app',
    'Parking-money-': 'parking-money.vercel.app',
    'focus-fairy-buddy': 'bodydoubley.vercel.app',  # deployed as this name
    'safespace-pro': 'safespace-pro.vercel.app',
    'mochi.adhd': 'mochi-adhd.vercel.app',
    'nexus-ai-toronto123': 'nexus-ai-toronto123.vercel.app',
    'Bodydouble': 'bodydoublekid-me.vercel.app',
    'GRAPHO-verse-ology': 'nexus-iv1h03rtz-creativefactoryops-yules-projects.vercel.app',
    'Nexus.botforge': 'nexus-botforge.vercel.app',
}

# Try to find correct URLs from deployment statuses
for r in repos_with_deployments:
    try:
        raw = subprocess.check_output(
            ['gh', 'api', f'repos/creativefactoryops-yules/{r}/deployments', '--jq', '.[0].id'],
            text=True, stderr=subprocess.DEVNULL
        ).strip()
        if not raw:
            print(f'{r}: NO DEPLOYMENT ID')
            continue
        dep_id = json.loads(raw)
        status_raw = subprocess.check_output(
            ['gh', 'api', f'repos/creativefactoryops-yules/{r}/deployments/{dep_id}/statuses', '--jq', '.[0]{state,target_url,environment_url} // empty'],
            text=True, stderr=subprocess.DEVNULL
        ).strip()
        if status_raw:
            status = json.loads(status_raw)
            url = status.get('target_url') or status.get('environment_url') or 'N/A'
            state = status.get('state', 'N/A')
            # Check if it's actually live
            try:
                code = urllib.request.urlopen(url, timeout=5).getcode()
                print(f'✓ {r}: {url} [{state}] HTTP {code}')
            except Exception as e:
                print(f'✗ {r}: {url} [{state}] HTTP ERR: {e}')
        else:
            print(f'{r}: NO STATUS')
    except Exception as e:
        print(f'{r}: ERROR - {e}')