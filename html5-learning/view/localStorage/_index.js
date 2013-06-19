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
        slimJs.$("#songList").appendChild(li);
    }

    slimJs.$("#addSongButton").onclick = addSong;

    slimJs.$("#saveButton").onclick = save;

    slimJs.$("#clearButton").onclick = clear;
}

function addSong() {
    var songName = slimJs.$("#songNameTextInput").value;
    if (!GLOBAL.isEmptyString(songName.trim())) {
        var li = document.createElement("li");
        li.innerHTML = songName;
        slimJs.$("#songList").appendChild(li);
    }
}

function save() {
    var playlistArray = [];
    var songs = slimJs.$("li");
    for (var i = 0; i < songs.length; i++) {
        playlistArray.push(songs[i].innerHTML);
    }
    localStorage.setItem("playlist", JSON.stringify(playlistArray));
}

function clear() {
    localStorage.setItem("playlist", JSON.stringify(null));
    slimJs.$("#songList").innerHTML = "";
}