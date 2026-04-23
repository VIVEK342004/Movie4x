$movies = @(
  @{ pFile="john_wick_4_poster.jpg"; bFile="john_wick_4_backdrop.jpg" },
  @{ pFile="mad_max_poster.jpg"; bFile="mad_max_backdrop.jpg" },
  @{ pFile="dark_knight_poster.jpg"; bFile="dark_knight_backdrop.jpg" },
  @{ pFile="gladiator_poster.jpg"; bFile="gladiator_backdrop.jpg" },
  @{ pFile="mi_fallout_poster.jpg"; bFile="mi_fallout_backdrop.jpg" },
  @{ pFile="die_hard_poster.jpg"; bFile="die_hard_backdrop.jpg" },
  @{ pFile="superbad_poster.jpg"; bFile="superbad_backdrop.jpg" },
  @{ pFile="hangover_poster.jpg"; bFile="hangover_backdrop.jpg" },
  @{ pFile="step_brothers_poster.jpg"; bFile="step_brothers_backdrop.jpg" },
  @{ pFile="21_jump_street_poster.jpg"; bFile="21_jump_street_backdrop.jpg" },
  @{ pFile="deadpool_poster.jpg"; bFile="deadpool_backdrop.jpg" },
  @{ pFile="dumb_and_dumber_poster.jpg"; bFile="dumb_and_dumber_backdrop.jpg" },
  @{ pFile="get_out_poster.jpg"; bFile="get_out_backdrop.jpg" },
  @{ pFile="quiet_place_poster.jpg"; bFile="quiet_place_backdrop.jpg" },
  @{ pFile="the_shining_poster.jpg"; bFile="the_shining_backdrop.jpg" },
  @{ pFile="hereditary_poster.jpg"; bFile="hereditary_backdrop.jpg" },
  @{ pFile="it_poster.jpg"; bFile="it_backdrop.jpg" },
  @{ pFile="conjuring_poster.jpg"; bFile="conjuring_backdrop.jpg" },
  @{ pFile="spiderverse_poster.jpg"; bFile="spiderverse_backdrop.jpg" },
  @{ pFile="toy_story_poster.jpg"; bFile="toy_story_backdrop.jpg" },
  @{ pFile="spirited_away_poster.jpg"; bFile="spirited_away_backdrop.jpg" },
  @{ pFile="up_poster.jpg"; bFile="up_backdrop.jpg" },
  @{ pFile="lion_king_poster.jpg"; bFile="lion_king_backdrop.jpg" },
  @{ pFile="ratatouille_poster.jpg"; bFile="ratatouille_backdrop.jpg" }
)

$imagesDir = "c:\Users\hp\OneDrive\Desktop\Movie4x\images"
$srcPoster = Join-Path $imagesDir "interstellar.jpg"
$srcBackdrop = Join-Path $imagesDir "interstellar_backdrop.jpg"

foreach ($m in $movies) {
    $pPath = Join-Path $imagesDir $m.pFile
    $bPath = Join-Path $imagesDir $m.bFile
    
    Copy-Item -Path $srcPoster -Destination $pPath -Force
    Copy-Item -Path $srcBackdrop -Destination $bPath -Force
}
Write-Host "Done copying local placeholder images."
