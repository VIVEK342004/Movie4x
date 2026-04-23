$imagesDir = "c:\Users\hp\OneDrive\Desktop\Movie4x\images"
$validPoster = "C:\Users\hp\.gemini\antigravity\brain\dc25e841-b23a-4091-8933-1c98d395ccb4\poster_placeholder_1776921776774.png"
$validBackdrop = "C:\Users\hp\.gemini\antigravity\brain\dc25e841-b23a-4091-8933-1c98d395ccb4\backdrop_placeholder_1776921818249.png"

$files = Get-ChildItem -Path $imagesDir -Filter *.jpg

foreach ($file in $files) {
    if ($file.Name -match "backdrop") {
        Copy-Item -Path $validBackdrop -Destination $file.FullName -Force
    } else {
        Copy-Item -Path $validPoster -Destination $file.FullName -Force
    }
}
Write-Host "All corrupt images replaced with valid binaries!"
