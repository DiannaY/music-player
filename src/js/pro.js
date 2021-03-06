(function ($,root) {
	//渲染时间,将时间插到html结构中
	var duration;
	var startTime;
	var lastPer = 0;
	var frameId;
	function renderAllTime(time) {
		duration = time;
		lastPer = 0;
		var fTime = formatTime(time);
		$('.all-time').html(fTime)
	}
	//处理时间格式 253 ---》 04:57
	function formatTime(time) {
		time = Math.round(time);
		var min = Math.floor(time / 60);
		var sec = time % 60;
		if (min < 10) {
			min = '0' + min;
		}
		if (sec < 10) {
			sec = '0' + sec;
		}
		return min + ':' + sec;
	}
	// 更新进度条的位置和当前时间
	function update(per) {
		// cancelAnimationFrame(frameId);
		var perTage = (per - 1)*100 + '%';
		// if (duration+parseInt(perTage)*duration/100 == duration) {
		// 	audio.pause();
		// 	per = 0;
		// 	audio.audio.currentTime = 0;
		// 	// $('.play-btn').on('click',function () {
		// 	// 	audio.status = 'play';
		// 	// 	audio.audio.currentTime = 0 ;
		// 	// 	start(0);
		// 	// })
		// }
		$('.pro-top').css('transform','translateX('+perTage+')');
		var time = formatTime(duration * per);
		$('.cur-time').html(time)
	}
	//时间暂停，进度条暂停移动
	function stop () {
		var stopTime = new Date().getTime();//点击暂停的时间。
		//                        ms                  s
		lastPer = lastPer + (stopTime - startTime) /(duration * 1000);//暂停之前的百分比
		cancelAnimationFrame(frameId);
	}
	//开始播放，默认移动
	function start(time) {
		cancelAnimationFrame(frameId);
		lastPer = time == undefined ? lastPer : time;
		startTime = new Date().getTime();
		function frame () {
			var endTime = new Date().getTime();
			var per = lastPer + (endTime - startTime) / (duration*1000);
			if (Math.floor(per)*duration == duration) {
				audio.pause();
				per = 0;
				audio.audio.currentTime = 0;
			}
			if (per <= 1) {
				update(per);
				frameId = requestAnimationFrame(frame);
			}
		}
		frame();
	}
	root.pro={
		renderAllTime : renderAllTime,
		update : update,
		stop : stop,
		start: start
	}
})(window.Zepto,window.player || (window.player = {}))



