var divs = document.getElementsByTagName('div');
for(var i=0; i<divs.length; i++) {
  divs[i].addEventListener("click", highlightThis);
  /*
  divs[i].addEventListener("click", highlightThis, true);
  divs[i].addEventListener("click", highlightThis, false);*/
}

function highlightThis(event) {
    //event.stopPropagation();
    var backgroundColor = this.style.backgroundColor;
    this.style.backgroundColor='yellow';
    alert(this.className);
    this.style.backgroundColor=backgroundColor;
}


$(document).ready(function() {
  //TODO DELETE IT
  alert = function(){};
	$('.tag-content > div').hide();
	cursor();
	$(".typewriter").typewriter({"speed" : 50});
  window.onscroll = menubareffect;
  editorSetting();
  slider("slider", 1000, 5);
});

function slider(id, speed, total){
  current = 0;
  function switchTo(number){
      console.log(current, number);
      if(current != number){
        // $("#"+id+current).hide('slide', {direction: "right"}, speed);
        $("#"+id+current).animate({width: 'hide'});
        $("#a"+id+current).removeClass('active_slider');
        $("#a"+id+current).addClass('inactive_slider');
        current = number;
        $("#a"+id+number).addClass('active_slider');
        $("#a"+id+number).removeClass('inactive_slider');
        // $("#"+id+number).show('slide', {direction : "left"}, speed);
        $("#"+id+number).animate({width: 'show'});
      }
  }
  $("#next"+id).click(function(e){
    switchTo((current+1)%total);
  });
  $("#before"+id).click(function(e){
    switchTo((current-1+total)%total);
  });
  $("#a"+id+0).addClass("active_slider");
  for (var i=1; i<total; i++){
    $("#a"+id+i).addClass('inactive_slider');
    $("#a"+id+i).click(function(e){
        var re = /[0-9]+$/; 
        m = re.exec(e.target.id);
        switchTo(parseInt(m[0]));
    });
    $("#"+id+i).hide();
  }

}

function editorSetting(){
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/tomorrow");
  editor.getSession().setMode("ace/mode/markdown");
  renderEditor();
  editor.getSession().setUseWrapMode(true);

  function renderEditor(){
    $("#markdown-html").html(marked(editor.getValue()));
  }
  function closeModal(){
    $("#Tryitout").fadeOut('slow');
  }
  function openModal(){
    $("#Tryitout").fadeIn();
    renderEditor();
  }
  $("#close-modal").click(closeModal);
  $("#open-modal").click(openModal);
  closeModal();

}


function menubareffect(ev){
  if ($(window).scrollTop()<=35){
    $('.header').removeClass('shadow resized');
  }else{
    $('.header').addClass('shadow resized');
  }
  var targets = ["#Introduction", "#Video", "#Examples", "#RegistrationLogin"];
  for (var i=0; i<targets.length; i++){
    if(isScrolledIntoView($(targets[i]))){
      var selected = $("a[href="+targets[i]+"]");
      selected.addClass("selected");
      selected.parent().siblings().children().removeClass("selected");
      break;
    }
  }
}

function isScrolledIntoView(elem){
//alert("method invoked");
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var docViewMiddle = docViewTop + $(window).height()/2;
  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();
  return (elemTop<docViewMiddle) && (elemBottom>docViewMiddle);
}

//smoth scrolling
$(function() {
  var menuoffset = 53;
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-menuoffset
        }, 1000);
        return false;
      }
    }
  });
});

function cursor(){
	function hideIt(){
	  $(".cursor").hide();
	  setTimeout(showIt,300);
	}
	function showIt(){
	  $('.cursor').show();
	  setTimeout(hideIt,300);
	}
	hideIt();	
}


//=================Sign up and register effects============
//for input
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

//=========== For the scrolling ============
$('#tab-rl a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');
  $('.tag-content > div').not(target).hide();
  $(target).fadeIn(600);
  
});

//=========== For typewriting ============
// From http://www.jqueryscript.net/demo/Minimal-jQuery-Animated-Text-Typing-Effect-Best-Typewriter/
// With a little aternation to add effect of mouse 
(function($, w, d, undefined) {

  function typewriter() {

    // Globals 
    var self = this, speed;

    function init(element, options) {
            // Set Globals
      var str;
      var indice = 0;

      self.options = $.extend( {}, $.fn.typewriter.options, options );
      $currentElement = $(element);
      elementStr = $currentElement.text().replace(/\s+/g, ' ');
      dataSpeed  = $currentElement.data("speed") || self.options.speed;
      $currentElement.empty();
      var showText = setInterval(
				function(){
					if (indice++ < elementStr.length) {
						$currentElement.find('.cursor').remove();
			      		$currentElement.append(elementStr[indice]);
			      		$currentElement.append('<span class="cursor">x</span>');
			    		}else{
			    			clearInterval(showText);
			    		}
				}, dataSpeed);
      // self.animation = setInterval(function(){animate_calification()}, 20);
    }
    // Metodos publicos
    return {
      init: init
    }
  }
  // Plugin jQuery
  $.fn.typewriter = function(options) {
    return this.each(function () {
    	var writer =  new typewriter();
      writer.init(this, options);
      $.data( this, 'typewriter', writer);
    });
  };

  $.fn.typewriter.options = {
    'speed' : 300
  };

})(jQuery, window, document);