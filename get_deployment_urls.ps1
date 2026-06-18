$ErrorActionPreference='SilentlyContinue'
$repos = gh repo list creativefactoryops-yules --json name --jq ".[].name"
$out = @()
foreach ($r in $repos) {
  $depIds = gh api repos/creativefactoryops-yules/$r/deployments --jq '.[].id' 2>$null
  foreach ($id in $depIds) {
    $statuses = gh api repos/creativefactoryops-yules/$r/deployments/$id/statuses --jq '.[0] // empty' 2>$null
    if ($statuses) {
      $s = $statuses | ConvertFrom-Json
      $line = ("{0}`t{1}`t{2}`t{3}" -f $r, $s.environment, $s.state, $s.target_url)
      Write-Output $line
      $out += $line
    }
  }
}
$out | Out-File deployment_urls.tsv
Write-Output "Saved deployment_urls.tsv"