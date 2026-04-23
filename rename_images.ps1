cd c:\Users\hp\OneDrive\Desktop\Movie4x\images
Rename-Item -Path "john_wick_4_poster.jpg" -NewName "john_wick_chapter_4.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "john_wick_4_backdrop.jpg" -NewName "john_wick_chapter_4_backdrop.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "mad_max_poster.jpg" -NewName "mad_max_fury_road.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "mad_max_backdrop.jpg" -NewName "mad_max_fury_road_backdrop.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "dark_knight_poster.jpg" -NewName "the_dark_knight.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "dark_knight_backdrop.jpg" -NewName "the_dark_knight_backdrop.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "mi_fallout_poster.jpg" -NewName "mission_impossible_-_fallout.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "mi_fallout_backdrop.jpg" -NewName "mission_impossible_-_fallout_backdrop.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "hangover_poster.jpg" -NewName "the_hangover.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "hangover_backdrop.jpg" -NewName "the_hangover_backdrop.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "quiet_place_poster.jpg" -NewName "a_quiet_place.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "quiet_place_backdrop.jpg" -NewName "a_quiet_place_backdrop.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "conjuring_poster.jpg" -NewName "the_conjuring.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "conjuring_backdrop.jpg" -NewName "the_conjuring_backdrop.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "spiderverse_poster.jpg" -NewName "spider-man_across_the_spider-verse.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "spiderverse_backdrop.jpg" -NewName "spider-man_across_the_spider-verse_backdrop.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "lion_king_poster.jpg" -NewName "the_lion_king.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "lion_king_backdrop.jpg" -NewName "the_lion_king_backdrop.jpg" -ErrorAction SilentlyContinue

# These names match already, just removing "_poster" as per the new dynamic generation
Rename-Item -Path "gladiator_poster.jpg" -NewName "gladiator.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "die_hard_poster.jpg" -NewName "die_hard.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "superbad_poster.jpg" -NewName "superbad.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "step_brothers_poster.jpg" -NewName "step_brothers.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "21_jump_street_poster.jpg" -NewName "21_jump_street.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "deadpool_poster.jpg" -NewName "deadpool.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "dumb_and_dumber_poster.jpg" -NewName "dumb_and_dumber.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "get_out_poster.jpg" -NewName "get_out.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "the_shining_poster.jpg" -NewName "the_shining.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "hereditary_poster.jpg" -NewName "hereditary.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "it_poster.jpg" -NewName "it.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "toy_story_poster.jpg" -NewName "toy_story.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "spirited_away_poster.jpg" -NewName "spirited_away.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "up_poster.jpg" -NewName "up.jpg" -ErrorAction SilentlyContinue
Rename-Item -Path "ratatouille_poster.jpg" -NewName "ratatouille.jpg" -ErrorAction SilentlyContinue

Write-Host "Renaming done."
