//  This file is part of the jQuery formatCurrency Plugin.
//
//    The jQuery formatCurrency Plugin is free software: you can redistribute it
//    and/or modify it under the terms of the GNU General Public License as published 
//    by the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.

//    The jQuery formatCurrency Plugin is distributed in the hope that it will
//    be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
//    of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License along with 
//    the jQuery formatCurrency Plugin.  If not, see <http://www.gnu.org/licenses/>.

(function($) {
	if (typeof console === 'undefined'){
		console={};
		console.log = function(){
			return;
		}
	}
	
	$.fn.triggerCurrency = function(settings) {
		var defaults = {
			name: "formatCurrency",
			colorize: false,
			region: '',
			global: true,
			roundToDecimalPlace: 2, // roundToDecimalPlace: -1; for no rounding; 0 to round to the dollar; 1 for one digit cents; 2 for two digit cents; 3 for three digit cents; ...
			eventOnDecimalsEntered: false,
			floor:false
		};
		
		settings = $.extend(defaults, settings);

		$(this).formatCurrency({colorize: settings.colorize, positiveFormat: settings.positiveFormat, negativeFormat: settings.negativeFormat, roundToDecimalPlace: settings.roundToDecimalPlace, floor:settings.floor });
		
        this.blur(function() {
        	$(this).formatCurrency({colorize: settings.colorize, positiveFormat: settings.positiveFormat, negativeFormat: settings.negativeFormat, roundToDecimalPlace: settings.roundToDecimalPlace, floor:settings.floor });
        })
        .keyup(function(e) {
            var e = window.event || e;
            var keyUnicode = e.charCode || e.keyCode;
            if (e !== undefined) {
                switch (keyUnicode) {
                	case 9: break; // Tab (conflict with highlightElements)
                	case 16: break; // Shift
                    case 17: break; // Ctrl
                    case 18: break; // Alt
                    case 27: this.value = ''; break; // Esc: clear entry
                    case 35: break; // End
                    case 36: break; // Home
                    case 37: break; // cursor left
                    case 38: break; // cursor up
                    case 39: break; // cursor right
                    case 40: break; // cursor down
                    case 78: break; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
                    case 110: break; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
                    case 190: break; // .
                    default: $(this).formatCurrency({ colorize: settings.colorize, positiveFormat: settings.positiveFormat, negativeFormat: settings.negativeFormat, roundToDecimalPlace: -1, eventOnDecimalsEntered: true });
                }
            }
        })
		.bind('decimalsEntered', function(e, cents) {
			if (String(cents).length > settings.roundToDecimalPlace) {
				$(this).formatCurrency({ colorize: settings.colorize, positiveFormat: settings.positiveFormat, negativeFormat: settings.negativeFormat, roundToDecimalPlace: settings.roundToDecimalPlace, floor:settings.floor });
			}
		});

	};
	
	$.fn.numberOnly = function(includeDot) {
		this.each(function(){
			$(this).keydown(function (e) { 
		        var key = e.which || e.charCode || e.keyCode || 0;
		        // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
		        return (
		            key == 8 || 
		            key == 9 ||
		            key == 86 ||
		            key == 109 ||
		            key == 189 ||
		            key == 46 ||
		            (includeDot && key == 110) || (includeDot && key == 190) ||
		            (key >= 37 && key <= 40) ||
		            (key >= 48 && key <= 57) ||
		            (key >= 96 && key <= 105));
		    });
		});
	};
	
	$.fn.highlightElements = function() {
		this.each(function(){
			var inputTag = $(this);
			var inputType = inputTag.attr('type');
	        if (inputType != "hidden" && inputType != "button" && inputType != "submit" &&
	        		inputType != "reset" && inputType != "checkbox" && inputType != "radio") {
	        	if (!inputTag.attr('readonly') && !inputTag.attr('disabled')) {
	        		inputTag.focus(function () {
	        			$(this).css('backgroundColor', '#ffe').select();
	        		});
	        		inputTag.mouseover(function () {
	        			$(this).css('backgroundColor', '#ffe');
	        		});
	        		inputTag.blur(function () {
	        			$(this).css('backgroundColor', '');
	        		});
	        		inputTag.mouseout(function () {
	        			$(this).css('backgroundColor', '');
	        		});
	        	}
	        }
		});
	};
	
	$.fn.highlightTableRows = function() {
		this.each(function(){
		    var previousClass = null;
			var table = this;
		    var startRow = 0;
		    // workaround for Tapestry not using thead
		    if (!table.getElementsByTagName("thead")[0]) {
			    startRow = 1;
		    }
		    var tbody = table.getElementsByTagName("tbody")[0];
		    var rows = tbody.getElementsByTagName("tr");
		    // add event handlers so rows light up and are clickable
		    for (i=startRow; i < rows.length; i++) {
		        rows[i].onmouseover = function() { previousClass=this.className;this.className+=' over' };
		        rows[i].onmouseout = function() { this.className=previousClass };
		        


		        var cols = rows[i].getElementsByTagName("td");
		        var link = cols[0].getElementsByTagName("a")[0];
		 
		        for (j=1; j < cols.length; j++) {
		        	var linkOnTd = cols[j].getElementsByTagName("a")[0];
		        	if(!linkOnTd) {
		                cols[j].onclick = function() {
		                	var cols = $(this).parent().find("td");
		                    var link = $(cols[0]).find("a")[0];

		                    var tdLink = $(this).find("a");
		                    if(tdLink.length == 1) {
		                    	link = tdLink[0];
		                    }
		                    if (link.onclick) {
		                        call = link.getAttribute("onclick");
		                        if (call.indexOf("return ") == 0) {
		                            call = call.substring(7);
		                        } 
		                        // this will not work for links with onclick handlers that return false
		                        eval(call);
		                    } else if(link.getAttribute("href").indexOf("mailto") >= 0){
		                    	eval($(link).attr("href"));
		                    } else {
		                        location.href = link.getAttribute("href");
		                    }
		                    return false;
		                }
		        	}

		        }
		    }
		});
	};


	$.fn.highlightTable = function() {
		this.each(function(){
		    var previousClass = null;
			var table = this;

	    	table.onmouseover = function() { previousClass=this.className;this.className+=' highlightOnOver' };
	    	table.onmouseout = function() { this.className=previousClass };
		});
	};
	
    $.fn.focusNextInputField = function() {
        return this.each(function() {
            var fields = $(this).parents('form:eq(0),body').find('button,input,textarea,select');
            var index = fields.index( this );
            if ( index > -1 && ( index + 1 ) < fields.length ) {
                fields.eq( index + 1 ).focus();
            }
            return false;
        });
    };
    
	$.fn.exists = function () {
	    return $(this).length !== 0;
	};
	
	$.fn.formState = function(styleClass, msg) {
        this.each(function() {
            var field = $(this);
            field.parents('.control-group:first').attr('class', 'control-group');
            
            field.parents('.control-group:first').addClass(styleClass);
            if(field.parent().find('span.help-inline').exists()) {
            	field.parent().find('span.help-inline').html(msg);
            }else {
            	field.parent().append('<span class="help-inline">' + msg + '</span>');                            
            }
        });
	}
	
})(jQuery);


function isArray(o) {
	  return Object.prototype.toString.call(o) === '[object Array]'
		  || Object.prototype.toString.call(o) === '[object NodeList]'
		  || Object.prototype.toString.call(o) === '[object HTMLCollection]';
	}

function scaleImage(obj, newWidth) {
	obj.each(function(i) {
        var imgTag = $(this);
        var width = imgTag.css('width').replace(/[A-Za-z$-]/g, "");
        if(width > newWidth) {
	        var height = imgTag.css('height').replace(/[A-Za-z$-]/g, "");
	        var reHeight = (height * newWidth) / width;
	        imgTag.css('width', newWidth);
	        imgTag.css('height', reHeight);
		}
    });
}

function makeJSONObjectFromURL(url) {
    if (url == null || typeof url == 'undefined') {
        return null;
    }

    console.log('url : ' + url);

    var splitURL = decodeURIComponent(url).replace('?', '').split('&');
    var result = {};

    for (var i in splitURL) {
        var t = splitURL[i].split('=');

        result[t[0]] = t[1];
    }

    return result;
}
