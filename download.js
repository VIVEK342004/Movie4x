const https = require('https');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');

const downloads = [
  // Action
  { pUrl: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg", pFile: "john_wick_4_poster.jpg", bUrl: "/7I6VUdPj6tQECNHdviJkUHD2u89.jpg", bFile: "john_wick_4_backdrop.jpg" },
  { pUrl: "/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg", pFile: "mad_max_poster.jpg", bUrl: "/nlCHUWjY9XWbuEUQauCEgnYF11A.jpg", bFile: "mad_max_backdrop.jpg" },
  { pUrl: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", pFile: "dark_knight_poster.jpg", bUrl: "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg", bFile: "dark_knight_backdrop.jpg" },
  { pUrl: "/ty8TGRuvJLPUmAR1H1nRIsgwvq6.jpg", pFile: "gladiator_poster.jpg", bUrl: "/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg", bFile: "gladiator_backdrop.jpg" },
  { pUrl: "/AkJQpZp9WoNdj7pLYCVtjw8Q7nO.jpg", pFile: "mi_fallout_poster.jpg", bUrl: "/aw4FOsWr2AL8VRzwwWeA6kXFm80.jpg", bFile: "mi_fallout_backdrop.jpg" },
  { pUrl: "/yFihWxQcmOcaCRrjQCGcnoJQCEb.jpg", pFile: "die_hard_poster.jpg", bUrl: "/gB5L2Ske2yR8AOKT2vV0q9ZtA80.jpg", bFile: "die_hard_backdrop.jpg" },
  // Comedy
  { pUrl: "/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg", pFile: "superbad_poster.jpg", bUrl: "/sA80Z2x8r89wE4ePtyz8eWofT40.jpg", bFile: "superbad_backdrop.jpg" },
  { pUrl: "/fjCewguX5wH4e0mHlZ8Dk5IrtO1.jpg", pFile: "hangover_poster.jpg", bUrl: "/kT8bTEkOaf9GqfRInGz3492mEDV.jpg", bFile: "hangover_backdrop.jpg" },
  { pUrl: "/wvvQv5F0H4wioHItkY2HOfhZq44.jpg", pFile: "step_brothers_poster.jpg", bUrl: "/kZ2p602qQ5KibpP8R6m3pM3nZ2L.jpg", bFile: "step_brothers_backdrop.jpg" },
  { pUrl: "/8vviSGsAU5zF12qAtoTevk32y6b.jpg", pFile: "21_jump_street_poster.jpg", bUrl: "/zWh2P4FzMtkI8u1aM0nQnL5B32x.jpg", bFile: "21_jump_street_backdrop.jpg" },
  { pUrl: "/fSRb7vyIP8rQpL0I47P3qUsZ2o5.jpg", pFile: "deadpool_poster.jpg", bUrl: "/en971MEXui9diirXlogOrPKmsEn.jpg", bFile: "deadpool_backdrop.jpg" },
  { pUrl: "/4LdpBfiCjGk5r77z8483gqQ0Ue1.jpg", pFile: "dumb_and_dumber_poster.jpg", bUrl: "/g8aK30m0G2v1T0gJqLIf4gD28e5.jpg", bFile: "dumb_and_dumber_backdrop.jpg" },
  // Horror
  { pUrl: "/tFXcEccSQAmRoIdcgGOSNptUQX4.jpg", pFile: "get_out_poster.jpg", bUrl: "/lhlxG7sJmPqFj5L5tP2G2F28b0M.jpg", bFile: "get_out_backdrop.jpg" },
  { pUrl: "/nAU74GmpUk7t5iklEp3bufwDq4n.jpg", pFile: "quiet_place_poster.jpg", bUrl: "/y1n0566rI8l1nZ0H2a6w8F1zYmX.jpg", bFile: "quiet_place_backdrop.jpg" },
  { pUrl: "/bnuC6hu7AB5dYW26A3o6NNLlIlE.jpg", pFile: "the_shining_poster.jpg", bUrl: "/mEw2H1kE1bK80Z7fXhX8uA1uI0O.jpg", bFile: "the_shining_backdrop.jpg" },
  { pUrl: "/p9fmuz2Oj3HtBfcCRnfc0E4uD23.jpg", pFile: "hereditary_poster.jpg", bUrl: "/5Rz28rQofzM2A645P0YI1U1YgT.jpg", bFile: "hereditary_backdrop.jpg" },
  { pUrl: "/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg", pFile: "it_poster.jpg", bUrl: "/7eG1qg0H2gH0lQxW6v5J9P0N1qA.jpg", bFile: "it_backdrop.jpg" },
  { pUrl: "/wVYREutTvI2tmxr6ujrHT704wGF.jpg", pFile: "conjuring_poster.jpg", bUrl: "/kZ2p602qQ5KibpP8R6m3pM3nZ2L.jpg", bFile: "conjuring_backdrop.jpg" },
  // Animation
  { pUrl: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg", pFile: "spiderverse_poster.jpg", bUrl: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg", bFile: "spiderverse_backdrop.jpg" },
  { pUrl: "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg", pFile: "toy_story_poster.jpg", bUrl: "/aZofjIeO7Xj1TmbR3vH34A7dC8v.jpg", bFile: "toy_story_backdrop.jpg" },
  { pUrl: "/39wmItIWsg5sZMyRU84glEfQgT1.jpg", pFile: "spirited_away_poster.jpg", bUrl: "/bSXfU4dwZy6cgUNI0vLQycbC1Uv.jpg", bFile: "spirited_away_backdrop.jpg" },
  { pUrl: "/vpbaStTMt8qqXaEgnOR2EE4DNJk.jpg", pFile: "up_poster.jpg", bUrl: "/zM1cT5aWJj2f9oA82qG1PqZ02S6.jpg", bFile: "up_backdrop.jpg" },
  { pUrl: "/sKCr78AS8qwYliub1UfW31MdbZ5.jpg", pFile: "lion_king_poster.jpg", bUrl: "/w2nFc2Rsm93PDkvjY4LTn170tHj.jpg", bFile: "lion_king_backdrop.jpg" },
  { pUrl: "/t3vaWRPSf6WjDSam8WU4K4fD106.jpg", pFile: "ratatouille_poster.jpg", bUrl: "/6O5nFXx3zW7r8FfFhT7A6q6tB0C.jpg", bFile: "ratatouille_backdrop.jpg" }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else if (res.statusCode === 301 || res.statusCode === 302) {
          downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

async function downloadAll() {
  if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
  }
  for (const item of downloads) {
    const pFullUrl = `https://image.tmdb.org/t/p/w500${item.pUrl}`;
    const bFullUrl = `https://image.tmdb.org/t/p/w1280${item.bUrl}`;
    
    const pPath = path.join(imagesDir, item.pFile);
    const bPath = path.join(imagesDir, item.bFile);
    
    console.log(`Downloading ${item.pFile}...`);
    try { await downloadImage(pFullUrl, pPath); } catch(e) { console.error(e); }
    
    console.log(`Downloading ${item.bFile}...`);
    try { await downloadImage(bFullUrl, bPath); } catch(e) { console.error(e); }
  }
  console.log('Done downloading images.');
}

downloadAll();
