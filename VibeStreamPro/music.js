const audio = new Audio();
let currentIndex = 0;

const songs = [
    { name: "Amber", artist: "311", img: "311_ Amber.jpeg", src: "Amber.mp3" },
    { name: "Paradise", artist: "Chase Atlantic", img: "Albumparadise.jpg", src: "Paradise.mp3" },
    { name: "Akap", artist: "Imago", img: "Imago.jpg", src: "Akap.mp3" },
    { name: "Show Me How", artist: "Men I Trust", img: "MenITrust.jpg", src: "ShowMeHow.mp3" },
    { name: "Beetlebum", artist: "Blur", img: "Blur - Self Titled ( album cover ).jpg", src: "Beetlebum.mp3" },
    { name: "Out of Time", artist: "The Weeknd", img: "Dawn FM.jpg", src: "OutOfTime.mp3" },
    { name: "Lost Stars", artist: "JK", img: "jjk.jpg", src: "LostStars.mp3" }
];

const playBtn = document.getElementById('masterPlay');
const prevBtn = document.querySelector('.bi-skip-start-fill')?.parentElement;
const nextBtn = document.querySelector('.bi-skip-end-fill')?.parentElement;
const footerTitle = document.getElementById('footer-title');
const footerArtist = document.getElementById('footer-artist');
const footerImg = document.getElementById('footer-img');
const progressFill = document.querySelector('.progress-fill');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');
const volumeSlider = document.getElementById('volume-slider');

function loadSong(index) {
    currentIndex = parseInt(index);
    const song = songs[currentIndex];
    if (!song) return;

    footerTitle.innerText = song.name;
    footerArtist.innerText = song.artist;
    footerImg.src = `album cover/${song.img}`;
    audio.src = `music/${song.src}`;
    
    progressFill.style.width = '0%';
    currentTimeEl.innerText = "0:00";
}

function playSong() {
    if (!audio.src) return;
    audio.play();
    playBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
}

function pauseSong() {
    audio.pause();
    playBtn.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
}

function togglePlay() {
    if (!audio.src) {
        loadSong(0); 
        playSong();
    } else {
        audio.paused ? playSong() : pauseSong();
    }
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playSong();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playSong();
}


if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });
}


document.querySelectorAll('.track-item').forEach(item => {
    item.addEventListener('click', () => {
        loadSong(item.getAttribute('data-index'));
        playSong();
    });
});


if (playBtn) playBtn.addEventListener('click', togglePlay);
if (nextBtn) nextBtn.addEventListener('click', nextSong);
if (prevBtn) prevBtn.addEventListener('click', prevSong);

audio.addEventListener('ended', nextSong);


audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${progress}%`;
        
        const curMins = Math.floor(audio.currentTime / 60);
        const curSecs = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        const durMins = Math.floor(audio.duration / 60);
        const durSecs = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        
        currentTimeEl.innerText = `${curMins}:${curSecs}`;
        durationTimeEl.innerText = `${durMins}:${durSecs}`;
    }
});

const progressContainer = document.querySelector('.progress-container');
if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        if (duration) {
            audio.currentTime = (clickX / width) * duration;
        }
    });
}