(function() {
    function SongPlayer($rootScope, Fixtures) {
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
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function(){
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
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
        * @function pauseSong
        * @desc pauses song
        * @type {Object} song
        */
        var pauseSong = function(song){
            currentBuzzObject.pause();
            song.playing = false;
        }

        /**
        * @function stopSong
        * @desc stops song
        * @type {Object} song
        */
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }

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
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        /**
        * @desc Default volume
        * @type {Number}
        */
        SongPlayer.volume = 70;

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
            pauseSong(song);
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
	            stopSong();
	   	    } else {
    	        var song = currentAlbum.songs[currentSongIndex];
    	        setSong(song);
    	        playSong(song);
	    	}
		};

        /**
        *f @function SongPlayer.next
        * @desc gets next song index and stops playing if click next on last song in album
        * @type {Object}
        */
        SongPlayer.next = function(){
            
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex ===  currentAlbum.songs.length) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time){
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
        * @function setVolume
        * @desc Set current volume
        * @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();