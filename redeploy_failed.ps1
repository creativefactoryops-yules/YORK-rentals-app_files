$ErrorActionPreference='SilentlyContinue'
$repos = gh repo list creativefactoryops-yules --json name --jq ".[].name"
$brokens = @()
foreach ($r in $repos) {
  $depIds = gh api repos/creativefactoryops-yules/$r/deployments --jq '.[].id' 2>$null
  $recent = @()
  $count = 0
  foreach ($id in $depIds) {
    $count++
    if ($count -gt 15) { break }
    $statuses = gh api repos/creativefactoryops-yules/$r/deployments/$id/statuses --jq '.[0] // empty' 2>$null
    if ($statuses) {
      $recent += ($statuses | ConvertFrom-Json)
    }
  }
  $recent = $recent | Sort-Object updated_at -Descending | Select-Object -First 5
  $failures = $recent | Where-Object { $_.state -eq 'failure' -or $_.state -eq 'error' }
  $successes = $recent | Where-Object { $_.state -eq 'success' }
  if ($failures.Count -gt 0 -and ($successes.Count -eq 0 -or $failures.Count -ge $successes.Count)) {
    $brokens += $r
    Write-Output "BROKEN: $r (failures=$($failures.Count) successes=$($successes.Count))"
  }
}
Write-Output "`nBROKEN_REPOS:"
$brokens | ForEach-Object { Write-Output $_ }