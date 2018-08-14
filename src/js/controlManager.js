
(function ($,root) {
	function controlManager(len) {
		this.len = len;
		this.index = index;
		this.status = status;
	}
	controlManager.prototype = {
		prev : function () {
			return this.getIndex(-1);
		},
		next : function () {
			return this.getIndex(1);
		},
		getIndex : function (val) {
			var index = this.index;
			var len = this.len;
			//                0 + 3 + -1       % 3 --> 2
			//                1 + 3  - 1       % 3 ---> 0
			var curIndex = (index + len + val) % len;
			this.index = curIndex;
			return curIndex;
		}
	}
	root.controlManager = controlManager;
})(window.Zepto,window.player || (window.player = {}))



