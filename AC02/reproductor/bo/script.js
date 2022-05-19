let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration-slider');
let show_duration = document.querySelector('#show-duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');


let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

//create a audio Element
let track = document.createElement('audio');

//All songs list
let All_song = [
    {
        name: "Castle",
        path:"mp3/01.mp3",
        img: "imatges/01.jpg",
        singer: "Halsey"
    },
    {
        name: "Hold Me Down",
        path:"mp3/02.mp3",
        img: "imatges/02.jpg",
        singer: "Halsey"
    },
    {
        name: "New Americana",
        path:"mp3/03.mp3",
        img: "imatges/03.jpg",
        singer: "Halsey"
    },
    {
        name: "Drive",
        path:"mp3/04.mp3",
        img: "imatges/04.jpg",
        singer: "Halsey"
    },
    {
        name: "Roman Holiday",
        path:"mp3/05.mp3",
        img: "imatges/05.jpg",
        singer: "Halsey"
    },
    {
        name: "Colors",
        path:"mp3/06.mp3",
        img: "imatges/06.jpg",
        singer: "Halsey"
    },
    {
        name: "Coming Down",
        path:"mp3/07.mp3",
        img: "imatges/07.jpg",
        singer: "Halsey"
    },
    {
        name: "Haunting",
        path:"mp3/08.mp3",
        img: "imatges/08.jpg",
        singer: "Halsey"
    },
    {
        name: "Control",
        path:"mp3/09.mp3",
        img: "imatges/09.jpg",
        singer: "Halsey"
    },
    {
        name: "Young God",
        path:"mp3/10.mp3",
        img: "imatges/10.jpg",
        singer: "Halsey"
    },
    {
        name: "Ghost",
        path:"mp3/11.mp3",
        img: "imatges/11.jpg",
        singer: "Halsey"
    }
];

//All function

//function load the track
function load_track(index_no){
    clearInterval(timer);
    reset_slider()
    track.src = All_song[index_no].path;
    title.innerHTML= All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    timer = setInterval(range_slider, 1000);
}
load_track(index_no);

//mute sound
function mute_sound(){
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

//reset song slider
function reset_slider(){
    slider.value = 0;
}


//checking the song is playing or not
function justplay(){
    if(playing_song==false){
        playsong()
    }else{
        pausesong();
    }
}

//play song

function playsong(){
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause"></i>';
}

//pause song
function pausesong(){
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play"></i>';

}

//next song
function next_song(){
    if(index_no < All_song.length -1){
        index_no +=1;
        load_track(index_no);
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

//previous song
function previous_song(){
    if(index_no>0){
        index_no -= 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = All_song.length;
        load_track(index_no);
        playsong();
    }
}

//change volume min 28
function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

//change slider position
function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

//autoplay function
function autoplay_switch(){
    if(autoplay==1){
        autoplay=0;
        auto_play.style.background = "rgba(255,255,255,0.1)";
    }else{
        autoplay=1;
        auto_play.style.background ="#ff8a65";
    }
}

function range_slider(){
    let position = 0;

    //update slider position
    if(!isNaN(track.duration)){
        position = track.currentTime * (100/ track.duration);
        slider.value = position;
    }

    //function will run when the song is over
    if(track.ended){
        play.innerHTML = '<i class="fa fa-play></i>';
        if(autoplay==1){
            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
}

