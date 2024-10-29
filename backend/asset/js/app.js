var clockUpdateInterval;

var audioPlayer = new Audio("../../backend/asset/video/font_v2.mp3");

var isPlaying = false;

function playAudio(_instant) {
    if (_instant) {
        audioPlayer.play();
        audioPlayer.volume = 0.05;
        audioPlayer.loop = true;
    } else {
        audioPlayer.play();
        audioPlayer.volume = 0;
        audioPlayer.loop = true;

        $(audioPlayer).animate({ volume: 0.05 }, 5000);
    }

    isPlaying = true;
}

function pauseAudio(_instant) {
    if (_instant) {
        audioPlayer.pause();

        isPlaying = false;
    } else {
        $(audioPlayer).animate({ volume: 0 }, 5000, function () {
            audioPlayer.pause();

            isPlaying = false;
        });
    }
}

function clockUpdate() {
    var date = new Date();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    $("#clock").text(hours + ":" + minutes + ":" + seconds);
}

$(document).ready(function () {
    clockUpdate();

    clockUpdateInterval = setInterval(clockUpdate, 1000);

    $("button[href]").click(function () {
        var href = $(this).attr("href");

        window.open(href, "_blank");
    });


    $("#open").click(function () {
        unpauseSimulation();

        playAudio(false);

        $(this).animate({ opacity: 0, top: "-100vh" }, 1000, function () {

            clearInterval(clockUpdateInterval);


            $(this).remove();
        });
    });

    $("#volume").click(function () {
        if (isPlaying) {
            pauseAudio(true);

            $(this).children().removeClass("fa-volume-up").addClass("fa-volume-off");
        } else {
            playAudio(true);

            $(this).children().removeClass("fa-volume-off").addClass("fa-volume-up");
        }
    });
});
