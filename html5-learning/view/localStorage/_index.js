/**
 * User: guoyao
 * Time: 11/26/11 2:00 PM
 */

init();

function init() {
    var playlistArray = GLOBAL.getStoredArray("playlist");
    for (var i = 0; i < playlistArray.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = playlistArray[i];
        GLOBAL.$("#songList").appendChild(li);
    }

    GLOBAL.$("#addSongButton").onclick = addSong;

    GLOBAL.$("#saveButton").onclick = save;

    GLOBAL.$("#clearButton").onclick = clear;
}

function addSong() {
    var songName = GLOBAL.$("#songNameTextInput").value;
    if (!GLOBAL.isEmptyString(songName.trim())) {
        var li = document.createElement("li");
        li.innerHTML = songName;
        GLOBAL.$("#songList").appendChild(li);
    }
}

function save() {
    var playlistArray = [];
    var songs = GLOBAL.$("li");
    for (var i = 0; i < songs.length; i++) {
        playlistArray.push(songs[i].innerHTML);
    }
    localStorage.setItem("playlist", JSON.stringify(playlistArray));
}

function clear() {
    localStorage.setItem("playlist", JSON.stringify(null));
    GLOBAL.$("#songList").innerHTML = "";
}