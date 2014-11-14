;(function(){
	var setting = {
		author:"njugray",
		className:{
			pane: "dg-pane",
			wrap: "dg-notify",
			text: "text",
			title: "title"
			
		}
	};
	var Widget = function(tx, msg, delay){
		var text = $("<div/>").addClass(setting.className.text).html(msg);
		var title = $("<div/>").addClass(setting.className.title).html(tx);
		var pane  = $("<div/>").addClass(setting.className.pane).append($("<div/>").addClass("icon")).append(title).append(text);
		pane.css({"margin-left": "400px", "height": "0"});
		this.delay = delay || 5000;
		this.pane = pane;
	};
	Widget.prototype.show = function(){
		var that = this;
		var pane = that.pane;

		var animShow = function(){
			pane.animate({height:"62px"},function(){
				pane.animate({"margin-left": "0"});
			});
		};
		animShow();
		var animHide = function(){
			pane.animate({"margin-left": "400px"}, function(){
				pane.animate({height:"0"}, function(){
					pane.remove();
				});
			});
		};
		that.timer = setTimeout(animHide,that.delay);
		
		pane.mouseenter(function(e){
			if(that.timer) clearTimeout(that.timer);
		});
		pane.mouseleave(function(e){
			clearTimeout(that.timer);
			that.timer = setTimeout(animHide, that.delay);
		});
		wrap.prepend(pane);

	};

	var wrap = $("<div/>").addClass(setting.className.wrap);
	$("body").append(wrap);
	
	if(!$.notify){
		$.notify = function(tx, msg){
			var pane = new Widget(tx, msg);
			pane.show();
			
		};
	}
})();