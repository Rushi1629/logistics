;(function ($) {

    "use strict";

    /* ===================
     Page reload
     ===================== */
    var scroll_top;
    var window_height;
    var window_width;
    var scroll_status = '';
    var lastScrollTop = 0;
    $(window).on('load', function () {
        $(".cms-loader").fadeOut("slow");
        window_width = $(window).width();
        logisti_col_offset();
        logisti_item_sameheight();
        logisti_header_sticky();
        logisti_menu_mobile();
        logisti_rtl();
        logisti_scroll_to_top();
    });
    $(window).on('resize', function () {
        window_width = $(window).width();
        logisti_col_offset();
        logisti_item_sameheight();
        logisti_header_sticky();
        logisti_menu_mobile();
    });

    $(window).on('scroll', function () {
        scroll_top = $(window).scrollTop();
        window_height = $(window).height();
        window_width = $(window).width();
        if (scroll_top < lastScrollTop) {
            scroll_status = 'up';
        } else {
            scroll_status = 'down';
        }
        lastScrollTop = scroll_top;
        logisti_header_sticky();
        logisti_scroll_to_top();
    });

    $(document).ready(function () {

        /* =================
         Menu Dropdown
         =================== */
        var $menu = $('.main-navigation');
        $menu.find('ul.sub-menu > li').each(function () {
            var $submenu = $(this).find('>ul');
            if ($submenu.length == 1) {
                $(this).hover(function () {
                    if ($submenu.offset().left + $submenu.width() > $(window).width()) {
                        $submenu.addClass('back');
                    } else if ($submenu.offset().left < 0) {
                        $submenu.addClass('back');
                    }
                }, function () {
                    $submenu.removeClass('back');
                });
            }
        });
        $('.sub-menu .current-menu-item').parents('.menu-item-has-children').addClass('current-menu-ancestor');
        $('#pagetitle').parent().find('.header-layout1 #headroom').addClass('offset-down-on');
        /* =================
         Menu Mobile
         =================== */
        $("#main-menu-mobile .open-menu").on('click', function () {
            $(this).toggleClass('opened');
            $('#site-navigation').toggleClass('navigation-open');
        });

        /* ===================
         Form Toggle
         ===================== */
        $('.header-button span.btn--icon').on('click',function (e) {
            e.preventDefault();
            $('.cms-modal-contact-form').removeClass('remove').toggleClass('open');
        });
        $('.cms-close').on('click',function (e) {
            e.preventDefault();
            $(this).parent().addClass('remove').removeClass('open');
            $(this).parents('.cms-modal').addClass('remove').removeClass('open');
        });
        $(document).on('click', function (e) {
            if (e.target.className == 'cms-modal cms-modal-contact-form open')
                $('.cms-modal-contact-form').removeClass('open').addClass('remove');
        });


        /* ===================
         Search Toggle
         ===================== */
        $('.h-btn-search').on('click',function (e) {
            e.preventDefault();
            $('.cms-modal-search-form').removeClass('remove').toggleClass('open');
        });
        $('.cms-close-search').on('click',function (e) {
            e.preventDefault();
            $(this).parents('.cms-modal').addClass('remove').removeClass('open');
        });
        $(document).on('click','.cms-modal-search-form', function (e) {
            var _this = $(this);
            if($(e.target).attr('class') === "cms-modal cms-modal-search-form open"){
                _this.addClass('remove').removeClass('open');
            }
        });

        /* ===================
         Cart Toggle
         ===================== */
        $('.open-cart').on('click',function(e){
            e.preventDefault();
            $('.widget_shopping_cart_content').toggleClass('active');
        });
        /* Video 16:9 */
        $('.entry-video iframe').each(function () {
            var v_width = $(this).width();

            v_width = v_width / (16 / 9);
            $(this).attr('height', v_width + 35);
        });
        /* Images Light Box - Gallery:True */
        $('.images-light-box').each(function () {
            $(this).magnificPopup({
                delegate: 'a.light-box',
                type: 'image',
                gallery: {
                    enabled: true
                },
                mainClass: 'mfp-fade',
            });
        });

        $('.image-light-box').each(function () {
            $(this).magnificPopup({
                delegate: 'a.light-box',
                type: 'image',
                gallery: {
                    enabled: false
                },
                mainClass: 'mfp-fade',
            });
        });

        /* Video Light Box */
        $('.cms-video-button, .btn-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
        });

        $(".cms-gallery-slider-wrap .slider-button").on('click', function () {
            $(this).parents('.cms-gallery-slider-wrap').toggleClass('hide-thumb');
            $(this).parents('.cms-gallery-slider-wrap').find('.thumbs').slideToggle();
        });
        $(".button-share .btn").on('click', function () {
            $(this).parent().toggleClass('opened');
        });
        $(".button-share .social-close i").on('click', function () {
            $(this).parents('.button-share').removeClass('opened');
        });
        $(".post-type-button .button-gallery").on('click',function () {
            $(".single-portfolio .cms-gallery-slider-wrap .owl-item.active .light-box").trigger("click");
        });
        $(".single-portfolio-general-construction .cms-image-gallery.layout-grid").parents("#content").find('.view-gallery').addClass('opened');
        $(".single-portfolio-general-construction .view-gallery").on('click',function () {
            $(".single-portfolio-general-construction .cms-image-gallery.layout-grid .grid-item:nth-child(2) .light-box").trigger("click");
        });

        // Newsletter
        var email_text = $('.tnp-field-email label').text();
        $('.tnp-field-email label').remove();
        $('.tnp-field-email').find(".tnp-email").each(function (ev) {
            if (!$(this).val()) {
                $(this).attr("placeholder", email_text);
            }
        });
        var firstname_text = $('.tnp-field-firstname label').text();
        $('.tnp-field-firstname label').remove();
        $('.tnp-field-firstname').find(".tnp-firstname").each(function (ev) {
            if (!$(this).val()) {
                $(this).attr("placeholder", firstname_text);
            }
        });
        var lastname_text = $('.tnp-field-lastname label').text();
        $('.tnp-field-lastname label').remove();
        $('.tnp-field-lastname').find(".tnp-lastname").each(function (ev) {
            if (!$(this).val()) {
                $(this).attr("placeholder", lastname_text);
            }
        });
        /* =================
        WooCommerce
        =================== */
        $('#review_form').find("#comment").each(function (ev) {
            if (!$(this).val()) {
                $(this).attr("placeholder", "Your review *");
            }
        });

        $('.widget_product_categories .cat-parent').append('<span class="woo-menu-toggle"><i class="zmdi zmdi-chevron-down"></i></span>');
        $('.woo-menu-toggle').on('click', function () {
            $(this).parent().find('> .children').toggleClass('woo-submenu-open');
            $(this).parent().find('> .children').slideToggle();
        });
        $('.woocommerce-cart-meta').on('click', function () {
            $(this).parent().find('.widget_shopping_cart').toggleClass('cart-open');
        });
        $('.cms-select form').append('<i class="zmdi zmdi-unfold-more"></i>');
        $('.variations select').parent().addClass('cms-select');
        $('.variations .cms-select').append('<i class="zmdi zmdi-unfold-more"></i>');

        $('.vc_tta-panel-title .vc_tta-title-text').append('<i class="vc_tta-controls-icon"></i>');

        /* Post type */
        $(".single-portfolio .trigger-gallery").on('click',function () {
            $(".single-portfolio .post-type-gallery-item:first-child .light-box").trigger("click");
        });
        $(".open-gallery").on('click',function () {
            $(".cms-gallery-slider-wrap .owl-item.active .light-box").trigger("click");
        });

        $(document).find('.portfolio-gallery .owl-arrows-middle-big').on('click', '.owl-next', function (e) {
            var _this = $(this);
            _this.parents('.portfolio-gallery').find('.owl-arrows-hide .owl-next').trigger('click');
        });
        $(document).find('.portfolio-gallery .owl-arrows-middle-big').on('click', '.owl-prev', function (e) {
            var _this = $(this);
            _this.parents('.portfolio-gallery').find('.owl-arrows-hide .owl-prev').trigger('click');
        });

        $(document).find('.owl-carousel .cms-carousel-nav').on('click', '.cms-carousel-next', function (e) {
            var _this = $(this);
            _this.parents('.owl-carousel').find('.owl-nav .owl-next').trigger('click');
        });

        $(document).find('.owl-carousel .cms-carousel-nav').on('click', '.cms-carousel-prev', function (e) {
            var _this = $(this);
            _this.parents('.owl-carousel').find('.owl-nav .owl-prev').trigger('click');
        });

        $(".thumb .item-readmore a").on('click',function () {
            window.location.href = $(this).attr('href');
        });

        /* ====================
         Scroll To Top
         ====================== */
        $('.scroll-top').on('click',function () {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });

        /* =================
        Add Class
        =================== */
        $('.wpcf7-select').parent().addClass('wpcf7-menu');
        /* =================
         Row & VC Column Animation
         =================== */
        $('.vc_row.wpb_row.vc_row-fluid').each(function () {
            var vctime = 100;
            var vc_inner = $(this).children().length;
            var _vci = vc_inner - 1;
            $(this).find('> .wpb_animate_when_almost_visible').each(function (index, obj) {
                $(this).css('animation-delay', vctime + 'ms');
                if (_vci === index) {
                    vctime = 100;
                    _vci = _vci + vc_inner;
                } else {
                    vctime = vctime + 100;
                }
            })
        });
        $('.animation-time').each(function () {
            var vctime = 100;
            var vc_inner = $(this).children().length;
            var _vci = vc_inner - 1;
            $(this).find('> .grid-item > .wpb_animate_when_almost_visible').each(function (index, obj) {
                $(this).css('animation-delay', vctime + 'ms');
                if (_vci === index) {
                    vctime = 100;
                    _vci = _vci + vc_inner;
                } else {
                    vctime = vctime + 70;
                }
            });
        });
        $(document).on('click', '.card-header', function () {
            var _parent = $(this).parents('.grid-item');
            _parent.css('z-index', 9999);
            setTimeout(function () {
                _parent.css('z-index', 1);
            }, 800);
            setTimeout(function () {
                $('.filter-item.active').trigger('click');
            }, 400);
        });

        /* =================
         The clicked item should be in center in owl carousel
         =================== */
        var $owl_item = $('.owl-active-click');
        $owl_item.children().each(function (index) {
            $(this).attr('data-position', index);
        });
        $(document).on('click', '.owl-active-click .owl-item > div', function () {
            $owl_item.trigger('to.owl.carousel', $(this).data('position'));
        });

        /* =================
         Move Angled & Overlay for Row VC
         =================== */
        $('.entry-content > .vc_row, .post-type-content > .vc_row, .post-type-content-inner > .vc_row').each(function () {
            var _angled = $(this).find(".cms-angled-wrapper"),
                _row = _angled.parents(".wpb_column");
            _row.after(_angled.clone());
            _angled.remove();

            var _el_overlay = $(this).find(".cms-row-overlay"),
                _row_overlay = _el_overlay.parents(".wpb_column");
            _row_overlay.before(_el_overlay.clone());
            _el_overlay.remove();
            $(this).find(".cms-row-overlay").parent().addClass('vc-row-overlay');

            var _el_divider = $(this).find(".cms-divider-title"),
                _row_divider = _el_divider.parents(".wpb_column");
            _row_divider.before(_el_divider.clone());
            _el_divider.remove();
        });

        $('.cms-history-icon').on('click', function () {
            $(this).addClass('opened');
            $(this).parents('.cms-history-item').find('.cms-history-content').slideToggle();
        });

    });

    /* =================
     Column Absolute
     =================== */
    function logisti_col_offset() {
        var w_vc_row_lg = ($('#content').width() - 1170) / 2;
        if (window_width > 1200) {
            $('.col-offset-right > .vc_column-inner').css('padding-right', w_vc_row_lg + 'px');
            $('.col-offset-left > .vc_column-inner').css('padding-left', w_vc_row_lg + 'px');
            $('.col-offset-right > .col-offset-inner').css('padding-right', w_vc_row_lg + 'px');
            $('.col-offset-left > .col-offset-inner').css('padding-left', w_vc_row_lg + 'px');
        }
    }

    function logisti_header_sticky() {
        var offsetTop = $('#site-header-wrap').outerHeight();
        var h_header = $('.fixed-height').outerHeight();
        var offsetTopAnimation = offsetTop + 200;
        if (scroll_status == 'down' && scroll_top > offsetTopAnimation) {
            $('#headroom').addClass('headroom--down').removeClass('headroom--up');
        }
        if (scroll_status == 'up' && scroll_top > offsetTopAnimation) {
            $('#headroom').addClass('headroom--up').removeClass('headroom--down');
        } else if (scroll_status == 'up' && scroll_top < offsetTopAnimation) {
            $('#headroom').removeClass('headroom--up');
        }
        if (window_width > 992) {
            $('.fixed-height').css({
                'height': h_header
            });
        }
    }

    function logisti_item_sameheight() {
        $('.cms-timeline-carousel .owl-item').matchHeight();
        $('.cms-grid-sameheight .grid-item').matchHeight();
        $('.vc_row-o-equal-height .col-equal-height').matchHeight();
        $('.cms-timeline-carousel').each(function () {
            var h_item_timeline = $(this).find('.owl-item').height();
            var h_item_timeline_wrap = h_item_timeline * 2;
            $(this).find('.owl-stage').css('height', h_item_timeline_wrap + 'px');
            $(this).find('.owl-item:nth-child(even)').css('margin-top', h_item_timeline + 'px');
        });
    }

    function logisti_menu_mobile() {
        if ($(window).width() <= 991) {
            $('.main-navigation li.menu-item-has-children').append('<span class="main-menu-toggle"></span>');
            $('.main-menu-toggle').on('click', function () {
                $(this).parent().find('> .sub-menu').toggleClass('submenu-open');
                $(this).parent().find('> .sub-menu').slideToggle();
            });
        }
    }

    function logisti_rtl() {
        /* =================
        RTL
        =================== */
        if ($('html').attr('dir') == 'rtl') {
            $('[data-vc-full-width="true"]').each(function (i, v) {
                $(this).css('right', $(this).css('left')).css('left', 'auto');
            });
        }
    }

    /* ====================
     Scroll To Top
     ====================== */
    function logisti_scroll_to_top() {
        if (scroll_top < window_height) {
            $('.scroll-top').addClass('off').removeClass('on');
        } else {
            $('.scroll-top').removeClass('off').addClass('on');
        }
    }
    $(document).on('click','.zmdi-search',function(e){$(this).parents('form').trigger('submit')});
    $(document).on('click','.fa-search',function(e){$(this).parents('form').trigger('submit')});
    $(document).on('click','.fa-search',function(getFocus){
        document.getElementById("searchFocus").focus();
    });
    $(document).on('click','.zmdi-search',function(getFocus){
        document.getElementById("searchFocus").focus();
    });

    var theme = {
        init : function(){
            theme.quantity();
            theme.carouselStretch();
            theme.animateImages();
            theme.hideWidgetMenuEmpty();
            theme.svgImage();
            theme.customProductSearchBtn();
            theme.videoPlay();
            theme.slider_nav_carousel();
        },
        quantity : function(){
            $('form.cart .quantity').append('<div class="quantity-icon"><i class="zmdi zmdi-chevron-up"></i><i class="zmdi zmdi-chevron-down"></i></div>');
            $('form.woocommerce-cart-form .quantity').append('<div class="quantity-icon"><i class="zmdi zmdi-chevron-up"></i><i class="zmdi zmdi-chevron-down"></i></div>');
            $(document).on('click','.zmdi-chevron-up',function(){
                var number = parseInt($(this).parents('.quantity').find('.qty').val());
                $(this).parents('.quantity').find('.qty').val(number + 1);
            });
            $(document).on('click','.zmdi-chevron-down',function(){
                var number = parseInt($(this).parents('.quantity').find('.qty').val());
                if(number > 1){
                    $(this).parents('.quantity').find('.qty').val(number - 1);
                }
            });
        },
        carouselStretch: function () {
            function resizeCarousel() {
                var ww = window.innerWidth;
                setTimeout(function () {
                    if (ww >= 1260) {
                        $('.row-carousel-stretch-right').css({'padding-left': ((ww - 1170) / 2) + 'px', 'opacity': 1});
                        $('.row-carousel-stretch-right .cms-heading').css({'margin-right': ((ww - 1170) / 2) + 'px'});
                    }else if (ww > 575){
                        $('.row-carousel-stretch-right').css({'padding-left': '60px', 'opacity': 1});
                        $('.row-carousel-stretch-right .cms-heading').css({'margin-right': '60px'});
                    }else {
                        $('.row-carousel-stretch-right').css({'padding': '0px', 'opacity': 1});
                        $('.row-carousel-stretch-right .cms-heading').css({'margin-right': '0px'});
                    }
                }, 500);
            }
            resizeCarousel();
            $(window).on('resize', function () {
                resizeCarousel();
            });
            // $(".cms-case-studies-carousel-wrap .nav-item").on('click', function () {
            //     $('.row-carousel-stretch-right').css({'padding': '0px', 'opacity': 0});
            //     $('.row-carousel-stretch-right .cms-heading').css({'margin-right': '0px'});
            //     setTimeout(function () {
            //         resizeCarousel();
            //     }, 200);
            // });

        },
        animateImages: function () {
            $(".cms-single-image-load .vc_single_image-wrapper").each(function(){
                var $selector = jQuery(this);
                $(window).scroll(function() {
                    var hT = $selector.offset().top,
                        hH = $selector.outerHeight(),
                        wH = $(window).height(),
                        wS = $(this).scrollTop();
                    if (wS > (hT-wH)){
                        $selector.addClass('animate');
                    }
                });

            });
        },
        hideWidgetMenuEmpty : function(){
            /*----------widget_nav_menu-------------*/
            $(document).ready(function(){
                var $nav_menu = $('.widget_nav_menu');
                $nav_menu.find('li.menu-item > a').each(function () {
                    if ($(this).is(':empty')){
                        $(this).remove();
                    }
                });
            });
        },
        svgImage : function(){
            /*----------svg Image-------------*/
            $(document).ready(function(){
                $('img.html').each(function(){
                    var $img = jQuery(this);
                    var imgID = $img.attr('id');
                    var imgClass = $img.attr('class');
                    var imgURL = $img.attr('src');

                    $.get(imgURL, function(data) {
                        // Get the SVG tag, ignore the rest
                        var $svg = jQuery(data).find('svg');

                        // Add replaced image's ID to the new SVG
                        if(typeof imgID !== 'undefined') {
                            $svg = $svg.attr('id', imgID);
                        }
                        // Add replaced image's classes to the new SVG
                        if(typeof imgClass !== 'undefined') {
                            $svg = $svg.attr('class', imgClass+' replaced-svg');
                        }

                        // Remove any invalid XML tags as per http://validator.w3.org
                        $svg = $svg.removeAttr('xmlns:a');

                        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                        }

                        // Replace image with new SVG
                        $img.replaceWith($svg);

                    }, 'xml');

                });
            });
        },
        customProductSearchBtn : function(){
            var selector = $('form.woocommerce-product-search').find('button[type="submit"]');
            if (selector.length){
                selector.each(function (e) {
                    $(this).html('<i class="fa fa-search"></i>');
                });
            }
        },
        videoPlay : function(){
            //if(YouTubePopUp){
            $(document).ready(function(){
                $("a.video-autoplay").YouTubePopUp();
                $("a.video-no-autoplay").YouTubePopUp( { autoplay: 0 } ); // Disable autoplay
            })
            //}
        },
        slider_nav_carousel : function(){
            /*----------svg Image-------------*/
            $(document).ready(function(){
                $('.slider-nav .thumbs .thumb').each(function( index ){
                    var $this = $(this);
                    if (index == 1){
                        setTimeout(function () {
                            $this.trigger('click');
                        }, 300);
                    }
                });
            });
            $(document).on('click','.slider-nav .thumbs .thumb',function(){
                var $this = $(this);
                $('.slider-nav .thumbs .thumb').removeClass('visible');
                $this.prev().addClass('visible');
                $this.next().addClass('visible');
                if ($this.is(':first-child')) {
                    $this.next().next().addClass('visible');
                }
                if ($this.is(':last-child')) {
                    $this.prev().prev().addClass('visible');
                }
            });
        },
    };
    theme.init();

})(jQuery);

