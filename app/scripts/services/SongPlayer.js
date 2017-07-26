(function() {
    function SongPlayer() {
        var SongPlayer = {};

        /**
        * @desc current buzz object audio file
        * @type {Object}
        */
        var currentSong = null;

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };


        /**
        * @function playSong
        * @desc plays the current Buzz object and sets it's property to true
        * @type {Object} song
        */
        var playSong = function(song){
        	currentBuzzObject.play();
        	song.playing = true;
        };

        /**
        * @function SongPLayer.play
        * @desc if the current song is not equal to the Buzz ojject song, 
        * then a new song will be loaded and start playing. If the current song
        * is the same and if it is paused, then the song will play.
        * @type {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
        *f @function SongPlayer.pause
        * @desc pauses current Buzz object song and sets its properties to false
        * @type {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();