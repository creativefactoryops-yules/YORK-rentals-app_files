$ErrorActionPreference='SilentlyContinue'
$repos = gh repo list creativefactoryops-yules --json name --jq ".[].name"
$out = @()
foreach ($r in $repos) {
  $raw = gh api repos/creativefactoryops-yules/$r/deployments --jq '.[0] // empty' 2>$null
  if ($raw) {
    $d = $raw | ConvertFrom-Json
    $url = $d.payload.url
    $state = $d.state
    $out += ("{0}`t{1}`t{2}`t{3}" -f $r, $d.environment, $state, $url)
    Write-Output ("{0} | env={1} state={2} url={3}" -f $r, $d.environment, $state, $url)
  } else {
    $out += ("{0}`tNO_DEPLOYMENTS`t`t" -f $r)
    Write-Output "$r => NO DEPLOYMENTS"
  }
}
$out | Out-File deployment_audit_full.tsv
Write-Output "Saved deployment_audit_full.tsv"