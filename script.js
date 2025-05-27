// script.js
const moods = {
  happy: {
    title: "Happy Vibes",
    color: "bg-yellow-500",
    bgImage: "https://images.unsplash.com/photo-1516450137517-162bfbeb4dba",
    songs: [
      { title: "Sunshine Beats", artist: "DJ Joy", duration: "3:15" },
      { title: "Smile Forever", artist: "Happy Tunes", duration: "2:50" },
      { title: "Bright Days", artist: "Sunny Vibes", duration: "4:10" },
    ],
  },
  chill: {
    title: "Chill Mode",
    color: "bg-blue-500",
    bgImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    songs: [
      { title: "Ocean Waves", artist: "Calm Collective", duration: "5:20" },
      { title: "Breeze Lounge", artist: "Relax Beats", duration: "3:45" },
      { title: "Twilight Drift", artist: "Chill Masters", duration: "4:00" },
    ],
  },
  sad: {
    title: "Sad Tunes",
    color: "bg-purple-600",
    bgImage: "https://images.unsplash.com/photo-1478760329101-9f4c6a8b0674",
    songs: [
      { title: "Rainy Days", artist: "Melancholy", duration: "4:30" },
      { title: "Echoes of Sorrow", artist: "Tearful Notes", duration: "3:55" },
      { title: "Fading Light", artist: "Gloomy Vibes", duration: "5:10" },
    ],
  },
  hype: {
    title: "Hype Energy",
    color: "bg-red-500",
    bgImage: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f",
    songs: [
      { title: "Pump It Up", artist: "Energy Crew", duration: "3:20" },
      { title: "Adrenaline Rush", artist: "Hype Kings", duration: "2:45" },
      { title: "Fire Starter", artist: "Rave Masters", duration: "3:50" },
    ],
  },
};

let currentMood = localStorage.getItem('mood') || 'happy';
changeMood(currentMood);

const modeToggle = document.getElementById('modeToggle');
const body = document.body;
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  body.classList.remove('dark');
  modeToggle.checked = false;
}

modeToggle.addEventListener('change', () => {
  if (modeToggle.checked) {
    body.classList.add('dark');
    body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.add('light');
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
});

function changeMood(mood) {
  const moodData = moods[mood];
  if (!moodData) return;

  localStorage.setItem('mood', mood);
  document.getElementById('moodTitle').textContent = moodData.title;
  document.getElementById('bgImage').style.backgroundImage = `url(${moodData.bgImage})`;

  const songList = document.getElementById('songList');
  songList.innerHTML = '';
  moodData.songs.forEach((song, index) => {
    const card = document.createElement('div');
    card.className = 'song-card glass p-4 rounded-lg shadow-lg flex items-center';
    card.style.animationDelay = `${index * 0.2}s`;
    card.innerHTML = `
      <div class="w-12 h-12 bg-gray-500 rounded-lg mr-4"></div>
      <div class="flex-1">
        <p class="font-semibold">${song.title}</p>
        <p class="text-sm opacity-70">${song.artist}</p>
      </div>
      <p class="text-sm opacity-70">${song.duration}</p>
    `;
    songList.appendChild(card);
  });

  document.querySelectorAll('.mood-selector button').forEach(btn => {
    btn.classList.remove('bg-yellow-500', 'bg-blue-500', 'bg-purple-600', 'bg-red-500');
    btn.classList.add('bg-gray-600');
    if (btn.textContent.toLowerCase() === mood) {
      btn.classList.remove('bg-gray-600');
      btn.classList.add(moodData.color);
    }
  });
}

window.addEventListener('scroll', () => {
  const bgImage = document.querySelector('.parallax');
  const scrollPosition = window.scrollY;
  bgImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});