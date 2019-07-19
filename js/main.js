jQuery(document).ready(function ($) {

  initClickEvents();

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: '50'
  });

  // Intro background carousel
  $("#intro-carousel").owlCarousel({
    autoplay: true,
    dots: false,
    loop: true,
    animateOut: 'fadeOut',
    items: 1
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });


  // Porfolio - uses the magnific popup jQuery plugin
  $('.portfolio-popup').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
      opener: function (openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    }
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Clients carousel (uses the Owl Carousel library)
    /*$(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 4
      },
      900: {
        items: 6
      }
    }
  });*/



  function initClickEvents(){
    $( ".btn-continuar" ).click(function() {
      var hideDiv = '#'+$(this).data('hide');
      var showDiv = '#'+$(this).data('show');
      if($(this).data('show') == 'paso-2') {
        var selected = $("input[name='modelo']:checked");
        var radioValue = selected.val();
        var hideItems = selected.data('hide');
        var espalda = selected.data('espalda');
        $.each(hideItems, function( index, value ) {
          $('.opcion-'+value).hide();
        });

        // Elements to inject
        $('.svg-frente').attr('src','img/svg/'+radioValue);
        $('.svg-espalda').attr('src','img/svg/'+espalda);
        var mySVGsToInject = $('#svg-paso-2 .svg');
        console.log(mySVGsToInject);
        var injectorOptions = {
          evalScripts: 'once',
          pngFallback: 'img/buzos',
          each: function (svg) {
            // Callback after each SVG is injected
            console.log('SVG injected ');
          }
        };

        SVGInjector(mySVGsToInject, injectorOptions, function (totalSVGsInjected) {
          console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
        });
      } else if ($(this).data('show') == 'paso-3') {
        var svg = $('#svg-paso-2 .svg');
        $('#svg-paso-3').append(svg);
      }
      $(hideDiv).fadeOut();
      $(showDiv).fadeIn();
    });

    $('.card-header .btn-link').click(function(event) {
      event.preventDefault();
    });

    $('.card .label').each(function() {
      var color = $(this).data("color");
      var img = $(this).data("img");
      if(color) {
        $(this).css('background',color);
      } else {
        $(this).css({'background': 'url(' + img + ')', 'background-size': 'cover'});
      }
    });

    $('.card .label').click(function() {
      var path = $(this).data("path");
      var color = $(this).data("color");
      var textura = $(this).data("textura");
      if(color) {
        $(path).css('fill',color);
        $(this).find('input').val(color)
      } else if (textura) {
        if($('.svg-frente').is(":visible") ) {
            var ending = getEnding('.svg-frente');
        } else {
            var ending = getEnding('.svg-espalda');
        }
        $(path).css('fill','url(' + textura + '' + ending + ')');
        $(this).find('input').val(textura);
      }
    });

    $('.card').click(function() {
      if($(this).hasClass('opcion-espalda')) {
        $('.svg-frente').hide();
        $('.svg-espalda').show();
      }else{
        $('.svg-frente').show();
        $('.svg-espalda').hide();
      }
    });

    $('#paso-3 .form-group').click(function() {
      $('.frente,.frente-izquierdo,.frente-derecho,.punos,.capucha,.espalda,.manga-derecha,.manga-izquierda').css({'stroke':'#000','stroke-width':'1px'});
      var path = $(this).closest('.card').find('.detalles').data('path');
      $(path).css({'stroke':'#50d8af','stroke-width':'5px'});

    });
  }

  function getEnding( svgClass ) {
      return $(svgClass).find('pattern:first-child').attr('id').slice(-2);
  }



});
