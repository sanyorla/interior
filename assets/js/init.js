(function($) {
    "use strict";
    var win = $(window);
    $('.section-sponsors__box--carousel').owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 6000,
        nav: false,
        dots: true,
        dotsEach: 1,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    });
    $('.section-testimonials__box-carousel').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 6000,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    /* SUBSCRIBE FORM */
    /* CONTACT FORM POPUP */
    /* declare contactForm */
    var $contactForm = $('#contactform1');
    $(".result-error").hide();
    $(".result-success").hide();
    /* adding rules for validation fields */
    $contactForm.validate({
        errorClass: 'section_popup__v3__form-error',
        rules: {
            form1_name: {
                required: true
            },
            form1_email: {
                required: true,
                email: true
            },
            form1_phone: {
                required: true
            },
            form1_message: {
                required: true
            }
        },
        /* adding error message text for validation fields */
        messages: {
            form1_name: {
                required: "This field is required"
            },
            form1_email: {
                required: "This field is required",
                email: "Please enter a valid email"
            },
            form1_phone: {
                required: "This field is required"
            },
            form1_message: {
                required: "This field is required"
            }
        },
        /* ajax request properties */
        submitHandler: function() {
            /* get values from form fields */
            var form_data = {
                'Name': $('#form1_name').val(),
                'Phone': $('#form1_phone').val(),
                'Email': $('#form1_email').val(),
                'Message': $('#form1_message').val()
            }
            for (var key in form_data) {
                var value = form_data[key];
                form_data[value.name] = value.value;
            }
            $.ajax({
                type: 'POST',
                url: '/sendmail.php',
                data: form_data,
                dataType: "json",
            }).done(function(data) {
                if (data.type == "error") {
                    $(".result-error").show();
                    $(".result-error").html(data.text);
                }
                if (data.type == "done") {
                    $(".result-success").show();
                    $(".result-success").html(data.text);
                    $(".result-error").hide();
                }
            });
            $('.result-error').hide();
        }
    });
    /* declare contactForm */
    /* popup form */
     $('.section-about__info--btn[data-button=popup_form1] , .section-counter__btn[data-button=popup_form2] , .section-featured__btn[data-button=popup_form3] , .section-featured__btn[data-button=popup_form4] , .section-video__info--btn[data-button=popup_form5]').click(function(e)  {
        e.preventDefault();
        $('.section_popup[data-name=popup_form1_show]').fadeIn();
        $('body').css('overflow', 'hidden');
    });
    $('.section_popup__v3__close').click(function() {
        $('body').css('overflow', 'visible');
        $('.section_popup[data-name=popup_form1_show]').fadeOut();
    });
    //masonry
    var $container = $("#grid");
    if (win.width() > 767) {
        if ($('#grid').length > 0) {
            $container.masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                percentPosition: true
            });
        }
    }

    /* SMOOTH SCROLL */
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('[class="anchor"]')
        .not('[href*="#v-tabs-item"]') // for bootstrap tabs
        .not('[href*="#collapse"]') // for bootstrap accordion
        .on('click' , function(event) {
            if ( location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname ) {
                var trigger = this;
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1200, function() {
                        window.location.href = trigger.href;
                    });
                }
            }
        });
    $('.to-top').on('click', function(e) {
        $('html,body').animate({
            scrollTop: 0
        }, 1100);
        e.preventDefault();
    });
    /* MENU DROPDOWN */
    $('.navbar-nav .dropdown  > a').on('click hover', function(e) {
        if ((win.width() <= 1039) && (win.width() >= 768)) {
            e.preventDefault();
            window.location = this.href;
        }
    });
    $('.navbar-nav .dropdown  > a').on('click hover', function(e) {
        if ((win.width() > 1039)) {
            e.preventDefault();
            window.location = this.href;
        }
    });
    $('.navbar-nav .dropdown  > .dropdown-toggle').on('click hover', function(e) {
        if ((win.width() <= 767)) {
            e.preventDefault();
            $(this).parent().children('ul').toggleClass('show');
            if (!$(this).parent().children('ul').hasClass('show')) {
                window.location = this.href;
            }
        }
    });
    /* popup on page load */
    // setTimeout(function() {
    //     $('.section__popup[data-name=popup_susbscribe]').fadeIn();
    //     $('body').css('overflow', 'hidden');
    // }, 5000);
    // $('.popup__close').click(function() {
    //     $('body').css('overflow', 'visible');
    //     $('.section__popup').fadeOut();
    // });
    /* popup video */
    $('.section-video__btn[data-button=popup_video]').click(function(e) {
        e.preventDefault();
        $('.section_popup[data-name=popup_show]').fadeIn();
        $('body').css('overflow', 'hidden');
    });
    $('.section_popup__close').click(function() {
        $('body').css('overflow', 'visible');
        $('.section_popup[data-name=popup_show]').fadeOut();
    });
    /* popup-btn */
    $('.btn_popup').click(function() {
        var name = $(this).data('name');
        $('.section__popup-2[data-name=popup_subscribe2]').fadeIn();
        $('body').css('overflow', 'hidden');
    });
    $('.popup__close').click(function() {
        $('body').css('overflow', 'visible');
        $('.section__popup-2').fadeOut();
    });
    win.on('resize scroll', function() {
       $('.animate_numbers').each(function() {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
            countNum: countTo
          },
          {
            duration: 2000,
            easing: 'linear',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
            }
          });
      })
    });
    /* PRELOADER */
    // setTimeout(function() {
    //     $('.loader').fadeOut();
    //     $('.page-load').fadeOut();
    // }, 1500);
    win.scroll(function() {
        if (win.scrollTop() > 200) {
            $('.to-top').addClass('to-top-visible');
        } else {
            $('.to-top').removeClass('to-top-visible');
        }
    });
    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    function initializeClock(id, endtime) {
      var clock = document.getElementById(id);
      var daysSpan = clock.querySelector('.days');
      var hoursSpan = clock.querySelector('.hours');
      var minutesSpan = clock.querySelector('.minutes');
      var secondsSpan = clock.querySelector('.seconds');

      function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }

      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
    initializeClock('clockdiv', deadline);
})(jQuery);