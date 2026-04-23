$movies = @(
  @{ title="John Wick: Chapter 4"; pFile="john_wick_4_poster.jpg"; bFile="john_wick_4_backdrop.jpg" },
  @{ title="Mad Max: Fury Road"; pFile="mad_max_poster.jpg"; bFile="mad_max_backdrop.jpg" },
  @{ title="The Dark Knight"; pFile="dark_knight_poster.jpg"; bFile="dark_knight_backdrop.jpg" },
  @{ title="Gladiator"; pFile="gladiator_poster.jpg"; bFile="gladiator_backdrop.jpg" },
  @{ title="Mission: Impossible"; pFile="mi_fallout_poster.jpg"; bFile="mi_fallout_backdrop.jpg" },
  @{ title="Die Hard"; pFile="die_hard_poster.jpg"; bFile="die_hard_backdrop.jpg" },
  @{ title="Superbad"; pFile="superbad_poster.jpg"; bFile="superbad_backdrop.jpg" },
  @{ title="The Hangover"; pFile="hangover_poster.jpg"; bFile="hangover_backdrop.jpg" },
  @{ title="Step Brothers"; pFile="step_brothers_poster.jpg"; bFile="step_brothers_backdrop.jpg" },
  @{ title="21 Jump Street"; pFile="21_jump_street_poster.jpg"; bFile="21_jump_street_backdrop.jpg" },
  @{ title="Deadpool"; pFile="deadpool_poster.jpg"; bFile="deadpool_backdrop.jpg" },
  @{ title="Dumb and Dumber"; pFile="dumb_and_dumber_poster.jpg"; bFile="dumb_and_dumber_backdrop.jpg" },
  @{ title="Get Out"; pFile="get_out_poster.jpg"; bFile="get_out_backdrop.jpg" },
  @{ title="A Quiet Place"; pFile="quiet_place_poster.jpg"; bFile="quiet_place_backdrop.jpg" },
  @{ title="The Shining"; pFile="the_shining_poster.jpg"; bFile="the_shining_backdrop.jpg" },
  @{ title="Hereditary"; pFile="hereditary_poster.jpg"; bFile="hereditary_backdrop.jpg" },
  @{ title="It"; pFile="it_poster.jpg"; bFile="it_backdrop.jpg" },
  @{ title="The Conjuring"; pFile="conjuring_poster.jpg"; bFile="conjuring_backdrop.jpg" },
  @{ title="Spider-Verse"; pFile="spiderverse_poster.jpg"; bFile="spiderverse_backdrop.jpg" },
  @{ title="Toy Story"; pFile="toy_story_poster.jpg"; bFile="toy_story_backdrop.jpg" },
  @{ title="Spirited Away"; pFile="spirited_away_poster.jpg"; bFile="spirited_away_backdrop.jpg" },
  @{ title="Up"; pFile="up_poster.jpg"; bFile="up_backdrop.jpg" },
  @{ title="The Lion King"; pFile="lion_king_poster.jpg"; bFile="lion_king_backdrop.jpg" },
  @{ title="Ratatouille"; pFile="ratatouille_poster.jpg"; bFile="ratatouille_backdrop.jpg" }
)

$imagesDir = "c:\Users\hp\OneDrive\Desktop\Movie4x\images"
if (!(Test-Path -Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir
}

foreach ($m in $movies) {
    $encodedTitle = [uri]::EscapeDataString($m.title)
    $pUrl = "https://via.placeholder.com/500x750/1A1C23/FFFFFF?text=$encodedTitle+Poster"
    $bUrl = "https://via.placeholder.com/1280x720/1A1C23/FFFFFF?text=$encodedTitle+Backdrop"
    
    $pPath = Join-Path $imagesDir $m.pFile
    $bPath = Join-Path $imagesDir $m.bFile
    
    Write-Host "Downloading $($m.pFile)..."
    Invoke-WebRequest -Uri $pUrl -OutFile $pPath -UseBasicParsing

    Write-Host "Downloading $($m.bFile)..."
    Invoke-WebRequest -Uri $bUrl -OutFile $bPath -UseBasicParsing
}

Write-Host "Done downloading placeholders."
