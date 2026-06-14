const songs = [

{
title:"A New Beginning",
artist:"Bensound",
src:"songs/bensound-anewbeginning.mp3",
cover:"image/i3.jpg"
},

{
title:"Creative Minds",
artist:"Bensound",
src:"songs/bensound-creativeminds.mp3",
cover:"image/i2.jpg"
},

{
title:"Dreams",
artist:"Bensound",
src:"songs/bensound-dreams.mp3",
cover:"image/i1.jpg"
}

];

const audio = new Audio();

let currentSong = 0;
let isPlaying = false;

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const playlist = document.getElementById("playlist");
const search = document.getElementById("search");

function loadSong(index){

    currentSong = index;

    audio.src = songs[index].src;

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;

    document.title = "🎵 " + songs[index].title;

    renderPlaylist();
}

loadSong(0);

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fas fa-pause"></i>';

    cover.classList.add("rotate");
}

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fas fa-play"></i>';

    cover.classList.remove("rotate");
}

playBtn.addEventListener("click",()=>{

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }

});

nextBtn.addEventListener("click",()=>{

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

});

prevBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();

});

audio.addEventListener("timeupdate",()=>{

    progress.value =
    (audio.currentTime / audio.duration) * 100 || 0;

    document.getElementById("currentTime").textContent =
    formatTime(audio.currentTime);

    document.getElementById("duration").textContent =
    formatTime(audio.duration);

});

progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value / 100) * audio.duration;

});

volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});

audio.addEventListener("ended",()=>{

    nextBtn.click();

});

function formatTime(time){

    if(isNaN(time)) return "0:00";

    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);

    if(sec < 10){
        sec = "0" + sec;
    }

    return `${min}:${sec}`;
}

function renderPlaylist(){

    playlist.innerHTML = "";

    songs.forEach((song,index)=>{

        const li =
        document.createElement("li");

        li.innerHTML =
        `<strong>${song.title}</strong><br>${song.artist}`;

        if(index === currentSong){
            li.classList.add("active");
        }

        li.addEventListener("click",()=>{

            loadSong(index);
            playSong();

        });

        playlist.appendChild(li);

    });

}

renderPlaylist();

search.addEventListener("keyup",()=>{

    let value =
    search.value.toLowerCase();

    let items =
    document.querySelectorAll("#playlist li");

    songs.forEach((song,index)=>{

        if(
            song.title.toLowerCase().includes(value)
            ||
            song.artist.toLowerCase().includes(value)
        ){
            items[index].style.display = "block";
        }
        else{
            items[index].style.display = "none";
        }

    });

});

audio.addEventListener("loadeddata",()=>{

    console.log("Song Loaded Successfully");

});

audio.addEventListener("error",()=>{

    console.log("Song Loading Failed");

});