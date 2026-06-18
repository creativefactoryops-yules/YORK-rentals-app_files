$ErrorActionPreference='SilentlyContinue'
$repos = gh repo list creativefactoryops-yules --json name --jq ".[].name"
$results = @()
foreach ($r in $repos) {
  $deployments = gh api repos/creativefactoryops-yules/$r/deployments 2>$null | ConvertFrom-Json
  if ($deployments) {
    $latest = $deployments | Sort-Object created_at -Descending | Select-Object -First 1
    $state = $latest.state
    $env_name = $latest.environment
    $url = $latest.payload.url
    $results += "$r | $env_name | $state | $url"
    Write-Output "$r => $env_name | $state | $url"
  } else {
    $results += "$r | (none)"
    Write-Output "$r => NO DEPLOYMENTS"
  }
}
$results | Out-File deployment_audit.txt