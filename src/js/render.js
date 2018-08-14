
(function ($,root) {
	var $scope = $(document.body);
	//根据请求回来的数据渲染页面
	function renderInfo(info) {
		var html = '<div class="song-name">'+ info.song+'</div>\
					<div class="singer-name">'+ info.singer+'</div>\
					<div class="album-name">'+ info.album+'</div>';
		$scope.find('.song-info').html(html);
	}

	function renderImg(info) {
		$scope.find('.song-img img').attr('src',info.image);
		// 创建一个图片，加载图片完成后调用blurImg模块对图片进行模糊，插入到body当中
		var img = new Image();
		img.src = info.image;
		img.onload = function () {
			root.blurImg(img,$scope);
		}
	}
	function renderList(info) {
		var str='';
		info.forEach(function (ele,index) {
			str += '<li>\
						<div class="song-name">'+ele.song+'</div>\
						<div class="song-singer">- '+ele.singer+'</div>\
					</li>'
		})
		$('.song-list').html(str);
	}
	// 将render模块导出。
	root.render = function (info) {
		renderInfo(info);
		renderImg(info);
	}
	root.renderList = renderList
})(window.Zepto,window.player || (window.player = {}));


