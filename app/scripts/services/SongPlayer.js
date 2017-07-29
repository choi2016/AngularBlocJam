(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        var currentAlbum = Fixtures.getAlbum();


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
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
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
        * @function getSongIndex
        * @desc returns song index
        * @type {Object} song
        */
		var getSongIndex = function(song) {
		    return currentAlbum.songs.indexOf(song);
		};

        /**
        * @desc current buzz object audio file
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @function SongPLayer.play
        * @desc if the current song is not equal to the Buzz ojject song, 
        * then a new song will be loaded and start playing. If the current song
        * is the same and if it is paused, then the song will play.
        * @type {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
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
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        *f @function SongPlayer.previous
        * @desc gets previous song index
        * @type {Object}
        */
		SongPlayer.previous = function() {
		    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
		    currentSongIndex--;

		    if (currentSongIndex < 0) {
	        currentBuzzObject.stop();
	        SongPlayer.currentSong.playing = null;
	   	    } else {
	        var song = currentAlbum.songs[currentSongIndex];
	        setSong(song);
	        playSong(song);
	    	}
		};

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();