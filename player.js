const audio = document.getElementById("audio");
const controlPanel = document.getElementById("controlPanel");
const btnPlay = controlPanel.children[0].children[0];
const btnMuted = controlPanel.children[0].children[6];
const txtVol = controlPanel.children[1].children[2];
const volRangeBar = controlPanel.children[1].children[3];
const musicList = controlPanel.children[3].children[0];
const infoPannel = controlPanel.children[7];
const progressBar = controlPanel.children[5].children[0];

txtVol.value = volRangeBar.value;

progressBar.max = audio.duration;

function playMusic() {
    audio.play();
    btnPlay.innerText = ";";
    btnPlay.onclick = pauseMusic;
    infoPannel.children[0].innerText = "目前播放的是 " + audio.title + " ... ...";
    setVolumeByRangeBar();
    setInterval(() => getMusicTime(), 100);
}

function pauseMusic() {
    audio.pause();
    btnPlay.innerText = "4";
    btnPlay.onclick = playMusic;
    infoPannel.children[0].innerText = audio.title + " 歌曲暫停中...";
}
function stopMusic() {
    audio.currentTime = 0;
    pauseMusic();
    infoPannel.children[0].innerText = "音樂停止";
}

function changeTime(s) {
    audio.currentTime += s;
    getMusicTime();
    if (s < 0) {
        infoPannel.children[3].innerText = "倒轉" + -s + "秒... ..."
    } else {
        infoPannel.children[3].innerText = "快轉" + s + "秒... ..."
    }
    setTimeout(function () {
        infoPannel.children[3].innerText = "";
    }, 500);
}

function setMute() {
    audio.muted = true;
    btnMuted.onclick = clearMute;
    infoPannel.children[2].innerText = "已靜音";
    btnMuted.innerText = "U";
    var classVal = document.getElementById("btnMuted").classList.add("span2");
    setVolumeByRangeBar();
    btnMuted.class = "setMute";
}

function clearMute() {
    audio.muted = false;
    btnMuted.onclick = setMute;
    infoPannel.children[2].innerText = "";
    setVolumeByRangeBar();
    btnMuted.innerText = "V";
    var classVal = document.getElementById("btnMuted").classList.remove("span2");
}

function setVolume(s) {
    volRangeBar.value = parseInt(volRangeBar.value) + s;
    clearMute();
    setVolumeByRangeBar();
}

function setVolumeByRangeBar() {
    audio.volume = volRangeBar.value / 100;
    txtVol.value = volRangeBar.value;

}

function changeMusic(n) {
    let i = musicList.selectedIndex
    if (infoPannel.children[1].innerText == "單曲循環啟動中... ...") {
        n = 0;
    } else if (infoPannel.children[1].innerText == "隨機播放啟動中... ...") {
        if (musicList.children.length > 1) {
            do {
                n = Math.floor(Math.random() * musicList.children.length) - i;
            } while (
                i + n < 0 ||
                i + n >= musicList.children.length ||
                n == 0
            );
        } else {
            n = 0;
        }
    } else if (infoPannel.children[1].innerText == "全曲循環啟動中... ...") {
        if (musicList.length == i + 1 && n == 1) {
            n = -i;
        } else if (i == 0 && n == -1) {
            i = musicList.length;
        } else if (musicList.length == 1) {
            n = 0;
        } else {
        }
    } else {
    }
    audio.src = musicList.children[i + n].value;
    musicList.children[i + n].selected = true;
    audio.title = musicList.children[i + n].innerText;
    if (btnPlay.innerText == ";") {
        playMusic();
        getMusicTime();
    }
}
function getMusicTime() {
    controlPanel.children[5].children[1].innerText = getTimeFormat(audio.currentTime) + " / " + getTimeFormat(audio.duration);
    progressBar.value = audio.currentTime;
    progressBar.max = audio.duration;
}

function getTimeFormat(t) {
    let m = parseInt(t / 60);
    let s = parseInt(t % 60);

    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    return m + ":" + s;
}

function setMusicTime() {
    audio.currentTime = progressBar.value;
    getMusicTime();
}

function musicStatus() {
    if (infoPannel.children[1].innerText == "單曲循環啟動中... ...") {
        changeMusic(0);
    } else if (infoPannel.children[1].innerText == "隨機播放啟動中... ...") {
        let n = Math.floor(Math.random() * musicList.children.length);
        n -= musicList.selectedIndex;
        changeMusic(n);

    } else if (infoPannel.children[1].innerText == "全曲循環啟動中... ..." && musicList.length == musicList.selectedIndex + 1) {
        changeMusic(-musicList.selectedIndex);
    } else if (musicList.length == musicList.selectedIndex + 1) {
        stopMusic();
    } else {
        changeMusic(1);
    }
}

function setCircle() {
    if (infoPannel.children[1].innerText === "單曲循環啟動中... ...") {
        infoPannel.children[1].innerText = "一般播放";
        var classVal = document.getElementById("btnCircle").classList.remove("span2");
    } else {
        infoPannel.children[1].innerText = "單曲循環啟動中... ...";
        var classVal = document.getElementById("btnCircle").classList.add("span2");
        var classVal = document.getElementById("btnRandom").classList.remove("span2");
        var classVal = document.getElementById("btnLoop").classList.remove("span2");
    }
}

function setRandom() {
    /* infoPannel.children[1].innerText = infoPannel.children[1].innerText == "隨機播放啟動中... ..." ? "一般播放" : "隨機播放啟動中... ..."; */
    if (infoPannel.children[1].innerText === "隨機播放啟動中... ...") {
        infoPannel.children[1].innerText = "一般播放";
        var classVal = document.getElementById("btnRandom").classList.remove("span2");
    } else {
        infoPannel.children[1].innerText = "隨機播放啟動中... ...";
        var classVal = document.getElementById("btnCircle").classList.remove("span2");
        var classVal = document.getElementById("btnRandom").classList.add("span2");
        var classVal = document.getElementById("btnLoop").classList.remove("span2");
    }
}

function setAllLoop() {
    if (infoPannel.children[1].innerText === "全曲循環啟動中... ...") {
        infoPannel.children[1].innerText = "一般播放";
        var classVal = document.getElementById("btnLoop").classList.remove("span2");
    } else {
        infoPannel.children[1].innerText = "全曲循環啟動中... ...";
        var classVal = document.getElementById("btnCircle").classList.remove("span2");
        var classVal = document.getElementById("btnRandom").classList.remove("span2");
        var classVal = document.getElementById("btnLoop").classList.add("span2");
    }
}
