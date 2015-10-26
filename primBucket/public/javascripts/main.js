		$('a.flyout').click(function(e) {
		    e.preventDefault();
		    var currPatt = /((fly-menu)[\d]*)/gm,
		        currClass = this.className.match(currPatt);

		    

		    var divMenu = $('div.' + currClass);
		    //$(this).next('div.fly-menu');
		    var divMenuClass = $('div.' + currClass).attr('class');
		    var menuKind = divMenuClass.substr(divMenuClass.indexOf('menu-'));
		    var currentPos = $(this).position();

		    var menuLocation = [{
		            "menuKind": "menu-bottom",
		            "top": currentPos.top + 30,
		            "left": currentPos.left
		        }, {
		            "menuKind": "menu-right",
		            "top": currentPos.top - 10,
		            "left": currentPos.left + 50
		        }, {
		            "menuKind": "menu-top",
		            "top": currentPos.top - divMenu.height() - 15,
		            "left": currentPos.left
		        }, {
		            "menuKind": "menu-left",
		            "top": currentPos.top - 10,
		            "left": currentPos.left - divMenu.width() - 20
		        }

		    ];

		    var elementPos = menuLocation.map(function(x) {
		        return x.menuKind;
		    }).indexOf(menuKind);
		    //alert(menuLocation[elementPos].id);

		    //$(this).next('div.fly-menu').css({
		    $('div.' + currClass).css({
		        "top": menuLocation[elementPos].top,
		        "left": menuLocation[elementPos].left
		    });
		    $('div.'+currClass).toggle();
		});
		$(document).mouseup(function(e) {
		    var container = $("div.flyout");
		    if (!container.is(e.target) && container.has(e.target).length === 0) {
		        container.hide();
		    }
		});