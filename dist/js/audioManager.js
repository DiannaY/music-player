(function ($,root) {
	function audioManager() {
		this.audio = new Audio();
		this.status = 'pause';
	}
	audioManager.prototype = {
		getAudio : function (info) {
			this.audio.src = info.audio;
			this.audio.load();
		},
		play : function () {
			this.audio.play();
			this.status = 'play';
			$('.img-wrapper')[0].style.animationPlayState = 'running';
		},
		pause : function () {
			this.audio.pause();
			this.status = 'pause';
			$('.img-wrapper')[0].style.animationPlayState = 'paused';
		},
		playTo : function (time) {
			this.audio.currentTime = time;
			this.play();
		}
	}
	root.audioManager = audioManager;
})(window.Zepto,window.player || (window.player = {}))