/* HERO HEIGHT HELPER - NOT USED */
function heroHeight(){
  var windowHeight = $(window).height();
  $('#hero').height(windowHeight);
}


/* FALLING STAR */
function makeAStarFall(){
  // left: random start- und stop-position position
  var min = -200;
  var max = 1800;

  var startPosLeft = Math.floor((Math.random() * max) + min);
  var stopPosLeft = Math.floor((Math.random() * max) + min);

  $('<div>').addClass("star falling-star").insertAfter('.stars');

  $('.falling-star').css("left", startPosLeft);

  setTimeout(function(){
    $(".falling-star").addClass("go-falling");
    $('.go-falling').css("left", stopPosLeft);
  },400);

  setTimeout(function(){
     $(".falling-star").remove();
  },1800);
}

function callStars(){
  // every 2400 ms -> a new star is falling down
  setInterval(function(){
    makeAStarFall();
  },5000);
}




/* PARALLAX */
function castParallax() {

  $(".js-hero-nonparallax").css('display','none');
	$(".js-hero-parallax").css('display','block');

	var opThresh = 350;
	var opFactor = 750;
  console.log('casted')

	window.addEventListener("scroll", function(event){

		var top = this.pageYOffset;

		var layers = document.getElementsByClassName("hero-img");
		var layer, speed, yPos;
		for (var i = 0; i < layers.length; i++) {
			layer = layers[i];
			speed = layer.getAttribute('data-speed');
			var yPos = -(top * speed / 100);
			layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');

		}
	});


}

// Responsive enquire
function responsiveEnquire(){
  enquire.register("screen and (min-width:1024px)", {

    // OPTIONAL
    // If supplied, triggered when a media query matches.
    match : function() {

      castParallax();
      callStars();
      buttonManagerWeb();

    },

    // OPTIONAL
    // If supplied, triggered when the media query transitions
    // *from a matched state to an unmatched state*.
    unmatch : function() {

      dispelParallax();
      buttonManagerMobile()

    },

  });

  enquire.register("screen and (max-width:1023px)", {

    // OPTIONAL
    // If supplied, triggered when a media query matches.
    match : function() {

      dispelParallax();
      buttonManagerMobile()

    },

    // OPTIONAL
    // If supplied, triggered when the media query transitions
    // *from a matched state to an unmatched state*.
    unmatch : function() {

      castParallax();
      callStars();
      buttonManagerWeb()

    },

  });
}


/* DISPEL PARALLAX IF MOBILE */
function dispelParallax() {
	$(".js-hero-nonparallax").css('display','block');
	$(".js-hero-parallax").css('display','none');
}

/* Scroll helper*/
function castSmoothScroll() {
	$.srSmoothscroll({
		step: 4,
    speed: 1,
    ease: 'linear',
    target: $('body'),
    container: $(window)
	});
}


/* initial detection of device and browser*/
function startSite() {

var platform = navigator.platform.toLowerCase();
	var userAgent = navigator.userAgent.toLowerCase();

  // alert('platform: ' + platform)
  // alert('userAgent: ' + userAgent)

  if ( platform.indexOf('ipad') != -1  ||  platform.indexOf('iphone') != -1 )
	{
		dispelParallax();
    buttonManagerMobile();
	}

  else if (platform.indexOf('win32') != -1 || platform.indexOf('linux') != -1)
	{
		responsiveEnquire();
		// if ($.browser.webkit)
		// {
		// 	castSmoothScroll();
		// }
	}

	else
	{


    responsiveEnquire();
    //castSmoothScroll();
	}

}


/* OWL Carousel */
function castCarousel(){
  $('#feed-list').owlCarousel({
    stagePadding: 50,
    loop:true,
    nav:true,
    //margin: 10,
    responsive:{
        0:{
            items:1
        },
        570:{
            items:2
        },
        1070:{
            items:3
        }
    }
  });
}


/* FitVid */
function fitVideos(){
  //$("#video").fitVids();
}



/* MAilchimp ajax */
function newsletter(){
    $('#mc-embedded-subscribe-form').ajaxChimp({
        url: 'http://losthumanitygame.us14.list-manage.com/subscribe/post?u=aacbbf04b29249a1c707a5cfe&amp;id=38790a2d10',
        callback: callbackFunction
    });

  	function callbackFunction (resp) {
  		// $('#newsletter-inner').addClass('animated fadeOutLeft');
      $('form, h3').addClass('animated fadeOutLeft');
  		if (resp.result === 'success') {
  			console.log('si');
  			$('#successo').removeClass('hide').addClass('animated fadeInRight');
  		}else{
  			console.log(resp.result + ' - ' + resp.msg);
        $('#fallimento').removeClass('hide').addClass('animated fadeInRight');
        $('#fallimento>p>span').html(resp.msg)
  		}
  	}
}



/* Button class manager */
function buttonManagerWeb(){

  $( ".menu__item" ).hover(
	  function() {
	    $( this ).addClass( "menu__item--current" );
	  }, function() {
	    $( this ).removeClass( "menu__item--current" );
	  }
	);
}

function buttonManagerMobile(){

  $( ".menu__item" ).addClass( "menu__item--current" );

}



/* HUGEING similar menu */
function hugeMenu(){
    //MENU
    var triggerBttn = document.getElementById( 'style-rect' ),
  		overlay = document.querySelector( 'div.overlay' ),
  		closeBttn = overlay.querySelector( 'button.overlay-close' );
  		transEndEventNames = {
  			'WebkitTransition': 'webkitTransitionEnd',
  			'MozTransition': 'transitionend',
  			'OTransition': 'oTransitionEnd',
  			'msTransition': 'MSTransitionEnd',
  			'transition': 'transitionend'
  		},
  		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
  		support = { transitions : Modernizr.csstransitions };

  	function toggleOverlay() {
  		if( classie.has( overlay, 'open' ) ) {

  			classie.remove( overlay, 'open' );
  			classie.add( overlay, 'close' );
        $('.icon-plus-min').removeClass('icon-min').addClass('icon-plus');
  			var onEndTransitionFn = function( ev ) {
  				if( support.transitions ) {
  					if( ev.propertyName !== 'visibility' ) return;
  					this.removeEventListener( transEndEventName, onEndTransitionFn );
  				}
  				classie.remove( overlay, 'close' );
  			};
  			if( support.transitions ) {
  				overlay.addEventListener( transEndEventName, onEndTransitionFn );
  			}
  			else {
  				onEndTransitionFn();
  			}
  		}
  		else if( !classie.has( overlay, 'close' ) ) {
  			classie.add( overlay, 'open' );
        $('.icon-plus-min').removeClass('icon-plus').addClass('icon-min');
  		}
  	}

  	triggerBttn.addEventListener( 'click', toggleOverlay );
  	closeBttn.addEventListener( 'click', toggleOverlay );
}


/* HIRING scrollTO*/

function scrollTO(){
  $("#scrollTo").click(function() {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#hiring").offset().top
    }, 2000);
  });


  $(".scrollToMail").click(function() {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#newsletter").offset().top
    }, 500, function() {
    // Animation complete.
    $('#mc-embedded-subscribe-form input').focus();
  });

  });
}



// Cast particles

function particles(){
   /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('cta', 'particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

}

///////////////

$(window).load(function() {
		// Animate loader off screen
		$("#loader").fadeOut("slow");

      var elevator = new Elevator({
        element: document.querySelector('.elevator-button'),
        mainAudio: 'audio/elevator.mp3',
        endAudio: 'audio/ding.mp3'
      });
	});

////////////////////

$(document).ready(function() {


   startSite();
   heroHeight();
   //castCarousel();
   fitVideos();
   newsletter();

   scrollTO();

  if ($('#body-cta').length > 0) {
  		particles();
	}








});
