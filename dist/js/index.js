var root = window.player;
var render = root.render;
var index = 0;
var control;
var audio = new root.audioManager();
var w = $('.pro-bottom').width();
var $scope = $(document.body);
var $slider = $('.slider-point');

function getData(url) {
	$.ajax({
		type : 'GET',
		url : url,
		success : function (data) {
			console.log(data);
			control = new root.controlManager(data.length);
			bindEvent(data);//数据回来之后，绑定事件
			bindTouch(data)//绑定移动端的touch事件
			// render(data[0]);
			$scope.trigger('play:change',0);
			//默认触发第一首歌曲的play:change事件去渲染此歌曲页面（时长）、加载歌曲、播放歌曲、更新进度条
		},
		error : function () {
			console.log('error')
		}
	})
}
getData('../mock/data.json');
function bindEvent(data) {
	//为document绑定play:change事件，当点击切换歌曲的话，就触发这个事件去获取资源、渲染页面、
	$scope.on('play:change',function (e,index) {
		render(data[index]);
		audio.getAudio(data[index]);
		root.pro.renderAllTime(data[index].duration);
		if (audio.status == 'play') {
			audio.play();
			root.pro.start(0);
		}
		root.pro.update(0);
	})
	$('.prev-btn').on('click',function () {
		index = control.prev();
		$scope.trigger('play:change',index);
	})
	$('.next-btn').on('click',function () {
		index = control.next();
		$scope.trigger('play:change',index);
	})
	$('.play-btn').on('click',function () {
		if (audio.status == 'pause') {
			audio.play();
			root.pro.start();
		}else {
			audio.pause();
			root.pro.stop();
		}
		$(this).toggleClass('playing');
	})
	$('.like-btn').on('click',function () {
		$(this).toggleClass('liking');
	})
	$('.list-btn').on('click',function () {
		$('.show-list').css('display','flex')
		root.renderList(data);
	})
	$('.close').on('click',function () {
		$('.show-list').css('display','none')
	})
}

function bindTouch(data) {
	var width = $('.pro-wrapper').offset().width;
	var left = $('.pro-wrapper').offset().left;
	console.log(width,left)
	$slider.on('touchstart',function () {
		//时间、进度条暂停
		root.pro.stop();
	}).on('touchmove',function (e) {
		// 根据当前拖动的位置 渲染时间和进度条位置
		var x = e.changedTouches[0].clientX;
		var per = (x - left) / width;
		if (per < 0 || per > 1) {
			per = 0
		}
		$('.play-btn').removeClass('playing');
		root.pro.update(per);
	}).on('touchend',function (e) {
		// 播放当前结束时间点对应的音乐
		var x = e.changedTouches[0].clientX;
		var per = (x - left) / width;
		if (per < 0 || per > 1) {
			per = 0
		}
		//跳到当前这首歌对应的位置
		var time = data[control.index].duration * per;
		audio.playTo(time);
		$('.play-btn').addClass('playing');//拖到指定位置，播放对应音乐
		root.pro.start(per);
	})
}
