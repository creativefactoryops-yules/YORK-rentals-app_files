import requests, json, base64

repos = [
    'deployEXEC',
    'nextjs-with-supabase',
    'adhdivergent-apps',
    'nova-backend',
    'SIMPLE-BODY-double-v1_files',
    'ARToFUPHOLSTERY',
    'GRAPHO-verse-ology',
    'Xena',
    'nexus-ai-deploy-1',
    'nextjs-openai-doc-search-starter',
    'safeharbour-toronto',
    'stitch-upholstery',
    'execyul-premium-',
]

base = 'https://api.github.com/repos/creativefactoryops-yules'
headers = {'Accept': 'application/vnd.github+json'}

for repo in repos:
    print(f'--- {repo} ---', flush=True)
    
    # Check vercel.json
    try:
        r = requests.get(f'{base}/{repo}/contents/vercel.json', headers=headers, timeout=20)
        if r.status_code == 200:
            data = r.json()
            content = base64.b64decode(data['content']).decode('utf-8', errors='ignore')
            print('vercel_config_exists: true', flush=True)
            print(f'vercel_content: {content[:200].replace(chr(10), ' ')}', flush=True)
        else:
            print('vercel_config_exists: false', flush=True)
    except Exception as e:
        print(f'vercel_config_exists: false ({e})', flush=True)
    
    # Check package.json homepage
    try:
        r = requests.get(f'{base}/{repo}/contents/package.json', headers=headers, timeout=20)
        if r.status_code == 200:
            data = r.json()
            content = base64.b64decode(data['content']).decode('utf-8', errors='ignore')
            try:
                pkg = json.loads(content)
                homepage = pkg.get('homepage', '')
                print(f'homepage_in_pkg: {homepage}', flush=True)
            except Exception:
                print('homepage_in_pkg: BADJSON', flush=True)
        else:
            print('homepage_in_pkg:', flush=True)
    except Exception as e:
        print(f'homepage_in_pkg: {e}', flush=True)
    
    # Check netlify.toml
    try:
        r = requests.get(f'{base}/{repo}/contents/netlify.toml', headers=headers, timeout=20)
        if r.status_code == 200:
            data = r.json()
            print('netlify_exists: true', flush=True)
            print(f'netlify_url: {data.get('download_url', '')}', flush=True)
        else:
            print('netlify_exists: false', flush=True)
    except Exception as e:
        print(f'netlify_exists: false ({e})', flush=True)
    
    # Check GitHub Pages
    try:
        r = requests.get(f'{base}/{repo}/pages', headers=headers, timeout=20)
        if r.status_code == 200:
            data = r.json()
            url = data.get('url', '')
            print(f'gh_pages_url: {url}', flush=True)
        else:
            print('gh_pages_url:', flush=True)
    except Exception as e:
        print(f'gh_pages_url: {e}', flush=True)
    
    print(flush=True)
