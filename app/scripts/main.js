  function heroHeight(){
    var lvl1Height = $('.lvl1').height();
    console.log(lvl1Height);
    $('#hero').height(lvl1Height);
  }


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


$(document).ready(function() {

  heroHeight();

  $.stellar({


    // Refreshes parallax content on window load and resize
    responsive: true,
    horizontalScrolling: false

  });



  $("#video").fitVids();

  $('#feed-list').owlCarousel({
    stagePadding: 50,
    loop:true,
    nav:true,
    margin: 10,
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

  // $( "#whitehomepage" ).click(function(e) {
  //   e.preventDefault();
  //   formData = {
  //       u: "90d7ecc6fadf95bf8c79a8070",
  //       id: "e2c1f57021"
  //   };
  //   $.ajax({
  //       url: "//nottenga.us12.list-manage.com/subscribe/post",
  //       //url: '//nottenga.us12.list-manage.com/subscribe/post&amp;id=e2c1f57021&c=?',
  //       type: "POST",
  //       crossDomain: true,
  //       contentType: 'json',
  //       data: formData,
  //       dataType: "jsonp",
  //       success: function(data) {
  //           //success handler
  //           alert('ok')
  //       },
  //       error: function() {
  //           //error handler
  //           alert('no')
  //       }
  //   });
  // });

  $('#mc-embedded-subscribe-form').ajaxChimp({
      url: 'http://nottenga.us12.list-manage.com/subscribe/post?u=90d7ecc6fadf95bf8c79a8070&amp;id=e2c1f57021'
      //callback: callbackFunction
  });


  $( ".menu__item" ).hover(
			  function() {
			    $( this ).addClass( "menu__item--current" );
			  }, function() {
			    $( this ).removeClass( "menu__item--current" );
			  }
			);


    // STARS //
    // every 2400 ms -> a new star is falling down
    setInterval(function(){
        makeAStarFall();
      },5000);




  // MENU
  // var triggerBttn = document.getElementById( 'style-rect' ),
	// 	overlay = document.querySelector( 'div.overlay' ),
	// 	closeBttn = overlay.querySelector( 'button.overlay-close' );
	// 	transEndEventNames = {
	// 		'WebkitTransition': 'webkitTransitionEnd',
	// 		'MozTransition': 'transitionend',
	// 		'OTransition': 'oTransitionEnd',
	// 		'msTransition': 'MSTransitionEnd',
	// 		'transition': 'transitionend'
	// 	},
	// 	transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
	// 	support = { transitions : Modernizr.csstransitions };
  //
	// function toggleOverlay() {
	// 	if( classie.has( overlay, 'open' ) ) {
	// 		classie.remove( overlay, 'open' );
	// 		classie.add( overlay, 'close' );
	// 		var onEndTransitionFn = function( ev ) {
	// 			if( support.transitions ) {
	// 				if( ev.propertyName !== 'visibility' ) return;
	// 				this.removeEventListener( transEndEventName, onEndTransitionFn );
	// 			}
	// 			classie.remove( overlay, 'close' );
	// 		};
	// 		if( support.transitions ) {
	// 			overlay.addEventListener( transEndEventName, onEndTransitionFn );
	// 		}
	// 		else {
	// 			onEndTransitionFn();
	// 		}
	// 	}
	// 	else if( !classie.has( overlay, 'close' ) ) {
	// 		classie.add( overlay, 'open' );
	// 	}
	// }
  //
	// triggerBttn.addEventListener( 'click', toggleOverlay );
	// closeBttn.addEventListener( 'click', toggleOverlay );






});






$( window ).resize(function() {
  heroHeight();
})
