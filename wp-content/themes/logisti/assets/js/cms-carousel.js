(function($) {
    "use strict";

    $(document).ready(function () {

        $('.owl-carousel').each(function() {
            var _this = $(this);
            var nav_text_left = '<i class="zmdi zmdi-chevron-left"></i>';
            var nav_text_right = '<i class="zmdi zmdi-chevron-right"></i>';
            if (_this.hasClass('cms-case-studies-carousel')){
                nav_text_left = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
                    '\t width="22px" height="45px" viewBox="0 0 22 45" enable-background="new 0 0 22 45" xml:space="preserve">\n' +
                    '<g>\n' +
                    '\t<polyline fill="none" stroke="#333" stroke-width="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="21,1 1,22\n' +
                    '\t\t20,44 \t"/>\n' +
                    '</g>\n' +
                    '</svg>';
                nav_text_right = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
                    '\t width="22px" height="45px" viewBox="0 0 22 45" enable-background="new 0 0 22 45" xml:space="preserve">\n' +
                    '<g>\n' +
                    '\t<polyline fill="none" stroke="#333" stroke-width="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="1,1 21,22\n' +
                    '\t\t1,44 \t"/>\n' +
                    '</g>\n' +
                    '</svg>';
            }
            var data = {
                navText : [nav_text_left, nav_text_right],
                responsive:{
                    0:{
                        items:parseInt($(this).attr('data-item-xs')),
                    },
                    768:{
                        items:parseInt($(this).attr('data-item-sm')),
                    },
                    992:{
                        items:parseInt($(this).attr('data-item-md')),
                    },
                    1200:{
                        items:parseInt($(this).attr('data-item-lg')),
                        stagePadding  :parseInt($(this).attr('data-stagepadding')),
                    }
                }
            };
            if(typeof _this.attr('data-loop') !== 'undefined') {
                data.loop = _this.attr('data-loop') == 'true' ? true : false;
            }
            if(typeof _this.attr('data-drag') !== 'undefined') {
                data.mouseDrag = _this.attr('data-drag') == 'false' ? false : true;
            }
            if(typeof _this.attr('data-autoplay') !== 'undefined') {
                data.autoplay = _this.attr('data-autoplay') == 'true' ? true : false;
            }
            if(typeof _this.attr('data-bullets') !== 'undefined') {
                data.dots = _this.attr('data-bullets') == 'true' ? true : false;
            }
            if(typeof _this.attr('data-dotscontainer') !== 'undefined') {
                data.dotsContainer = _this.attr('data-dotscontainer') == 'true' ? _this.parent().find('.slider-nav .thumbs') : '';
            }
            if(typeof _this.attr('data-center') !== 'undefined') {
                data.center = _this.attr('data-center') == 'true' ? true : false;
            }
            if(typeof _this.attr('data-arrows') !== 'undefined') {
                data.nav = _this.attr('data-arrows') == 'true' ? true : false;
            }
            if(typeof _this.attr('data-rtl') !== 'undefined') {
                data.rtl = _this.attr('data-rtl') == 'true' ? true : false;
            }
            if(typeof _this.attr('data-margin') !== 'undefined') {
                data.margin = parseInt(_this.attr('data-margin'));
            }
            if(typeof _this.attr('data-autoplaytimeout') !== 'undefined') {
                data.autoplayTimeout = parseInt(_this.attr('data-autoplaytimeout'));
            }
            if(typeof _this.attr('data-smartspeed') !== 'undefined') {
                data.smartSpeed = parseInt(_this.attr('data-smartspeed'));
            }
            if ($.fn.owlCarousel){
                var owl = _this.owlCarousel(data);
                var owlAnimateFilter = function(even) {
                    $(this)
                        .addClass('item-loading')
                        .delay(70 * $(this).parent().index())
                        .queue(function() {
                            $(this).dequeue().removeClass('item-loading');
                        });
                };

                _this.parent().find('.cms-carousel-filter').on('click', '.cms-filter-item', function(e) {
                    var filter_data = $(this).attr('data-filter');
                    if($(this).hasClass('cms-filter-active')) return;
                    $(this).addClass('cms-filter-active').siblings().removeClass('cms-filter-active');
                    owl.owlFilter(filter_data, function(_owl) {
                        $(_owl).find('.cms-item').each(owlAnimateFilter);
                    });
                });
            }

        });

    });
}(jQuery));