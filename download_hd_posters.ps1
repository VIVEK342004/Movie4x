$imagesDir = "c:\Users\hp\OneDrive\Desktop\Movie4x\images"

if (Test-Path -Path $imagesDir) {
    Write-Host "Deleting old images folder..."
    Remove-Item -Path $imagesDir -Recurse -Force
}

Write-Host "Creating new images folder..."
New-Item -ItemType Directory -Path $imagesDir

$posters = @{
    "John Wick: Chapter 4" = "https://image.tmdb.org/t/p/original/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
    "Mad Max: Fury Road" = "https://image.tmdb.org/t/p/original/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg"
    "The Dark Knight" = "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    "Mission: Impossible - Fallout" = "https://image.tmdb.org/t/p/original/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg"
    "The Hangover" = "https://image.tmdb.org/t/p/original/uluhlXubGu1VxU63X9VHCLWDAYP.jpg"
    "A Quiet Place" = "https://image.tmdb.org/t/p/original/nAU74GmpUk7t5iklEp3bufwDq4n.jpg"
    "The Conjuring" = "https://image.tmdb.org/t/p/original/wVYREutTvI2tmxr6ujrHT704wGF.jpg"
    "Spider-Man: Across the Spider-Verse" = "https://image.tmdb.org/t/p/original/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
    "The Lion King" = "https://image.tmdb.org/t/p/original/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg"
    "Gladiator" = "https://image.tmdb.org/t/p/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"
    "Die Hard" = "https://image.tmdb.org/t/p/original/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg"
    "Superbad" = "https://image.tmdb.org/t/p/original/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg"
    "Step Brothers" = "https://image.tmdb.org/t/p/original/1GvBhRxY6MELDfxFrete6BNhBB5.jpg"
    "21 Jump Street" = "https://image.tmdb.org/t/p/original/8v3Sqv9UcIUC4ebmpKWROqPBINZ.jpg"
    "Deadpool" = "https://image.tmdb.org/t/p/original/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg"
    "Dumb and Dumber" = "https://image.tmdb.org/t/p/original/4LdpBXiCyGKkR8FGHgjKlphrfUc.jpg"
    "Get Out" = "https://image.tmdb.org/t/p/original/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg"
    "The Shining" = "https://image.tmdb.org/t/p/original/9fgh3Ns1iRzlQNYuJyK0ARQZU7w.jpg"
    "Hereditary" = "https://image.tmdb.org/t/p/original/lHV8HHlhwNup2VbpiACtlKzaGIQ.jpg"
    "It" = "https://image.tmdb.org/t/p/original/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg"
    "Toy Story" = "https://image.tmdb.org/t/p/original/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"
    "Spirited Away" = "https://image.tmdb.org/t/p/original/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg"
    "Up" = "https://image.tmdb.org/t/p/original/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"
    "Ratatouille" = "https://image.tmdb.org/t/p/original/t3vaWRPSf6WjDSamIkKDs1iQWna.jpg"
    "Interstellar" = "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MvrId294.jpg"
}

function Format-ImageName {
    param([string]$Name)
    $Name = $Name.ToLower()
    $Name = $Name -replace "[:']", ""
    $Name = $Name -replace "[^a-z0-9\s-]", ""
    $Name = $Name.Trim()
    $Name = $Name -replace "\s+", "_"
    return $Name
}

foreach ($title in $posters.Keys) {
    $url = $posters[$title]
    $formattedName = Format-ImageName -Name $title
    $filePath = Join-Path $imagesDir "$formattedName.jpg"
    
    Write-Host "Downloading $title..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $filePath -UseBasicParsing
    } catch {
        Write-Host "Failed to download $title" -ForegroundColor Red
    }
}
Write-Host "All HD posters downloaded successfully."
