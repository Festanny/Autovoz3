(function($) {
    "use strict";

    $('.tabs-formOrder input.btnFormOrder').on('click', function(){
        var id = $(this).attr('data-next-order'),
            content
        if (id == 4) {
            // Получение данных
            var car = $('.tabs-formOrder .block input[name="car"]:checked').val(),
                brand = $('.tabs-formOrder .block input[name="brand"]').val(),
                model = $('.tabs-formOrder .block input[name="model"]').val(),
                fromCity = $('.tabs-formOrder .block input[name="from"]').val(),
                toCity = $('.tabs-formOrder .block input[name="to"]').val(),
                date = $('.tabs-formOrder .block input[name="date"]').val();
            if (car!== undefined&&fromCity!=''&&toCity&&date!='') {
                $('.tabs-formOrder .block.formBlockMainOrder .info-block.d-none').removeClass('d-none')
                $('.tabs-formOrder .block.formBlockMainOrder .info-block-main .info span').html(`${car} ${brand} ${model} из г.${fromCity} в г.${toCity}. Желаемая дата отправки: ${date}`);
            } else {
                $('.tabs-formOrder .block.formBlockMainOrder .info-block').addClass('d-none')
            }
        }
        if (id == 5) {
            var nameForm = $('.tabs-formOrder .block .tt-form-default input[name="name"]'),
                phoneForm = $('.tabs-formOrder .block .tt-form-default input[name="phone"]'),
                checkPeople = $('.tabs-formOrder .block .tt-form-default .checkbox-data input[type="checkbox"]').is(':checked');
            nameForm.val() == '' ? addError(nameForm) : removeError(nameForm)
            phoneForm.val() == '' || phoneForm.val().length != 17 ? addError(phoneForm) : removeError(phoneForm)
            if (checkPeople === false) alert('Нет согласия на обработку персональных данных')
            if (nameForm.val()!='' && phoneForm.val()!='' && phoneForm.val().length==17 && checkPeople===true) alert('Отправлено')
        } else {
            content = $('.tabs-formOrder .block[data-next-order="' + id + '"]')
            $('.tabs-formOrder .block.active').removeClass('active');
            content.addClass('active');
        }
        function addError(el) {
            el.addClass('error')
        }
        function removeError(el) {
            el.removeClass('error')
        }
    });

    // маска для телефона
    window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('#phone'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, true);
    input.addEventListener("keydown", mask, false)
    });
    });


    var $document = $(document),
        $window = $(window),
        $body = $('body'),
        $html = $('html'),
        windowWidth = window.innerWidth || $window.width(),
        $ttDesctopMenu = $('#tt-desctop-menu'),
        $ttMobilepMenu = $('#mobile-menu'),

        $ttPageContent = $('#tt-pageContent'),
        $ttFooter = $('tt-footer'),
        $ttHeader = $('#tt-header'),
        $ttStucknav = $('#tt-stuck'),
        $ttMobileQuickLinks = $ttHeader.find('.tt-mobile-quickLinks'),
        $ttMobileQuickLinksPopup = $ttHeader.find('.tt-quickLinks-popup'),

        ttAsideLocation = $('#tt-filters-aside'),
        ttFullwidthLocation = $('#tt-filters-fullwidth'),

        // Google map options

        googleMapOption = {
            latitude: google_map_object.lattitude,
            longitude: google_map_object.longitude,
            zoom: parseInt(google_map_object.zoom),
            marker: [
                [google_map_object.marker_name, google_map_object.lattitude, google_map_object.longitude, 1, google_map_object.marker_image],
            ]
        },

        // Template Blocks
        blocks = {
            ttHeaderDropdown: $ttHeader.find('.tt-dropdown-obj'),
            mainSlider: $('.mainSlider'),
            googleMapHeader: 'googleMapHeader',
            googleMapFooter: 'googleMapFooter',
            jsReviewsCarousel: $ttPageContent.find('.js-reviews-carousel'),
            ttPortfolioMasonry: $ttPageContent.find('.tt-portfolio-masonry'),
            mobileMenuToggle: $('.tt-menu-toggle'),
            sliderLayout: $ttPageContent.find('.slider-layout'),
            counterBlock: $ttPageContent.find('.counter-js'),
            ttVideoBlock: $('.tt-video-block'),
            ttFaq: $ttPageContent.find('.tt-faq'),
            ttAsideJs: $('#aside-js'),
            ttBtnToggleCol: $('#tt-btn-toggle-js'),
            ttListingFilters: $('.tt-filters-options'),
            ttCalendarDatepicker: $ttPageContent.find('.calendarDatepicker'),
            ttBlogMasonry: $ttPageContent.find('.tt-blog-masonry'),
            modalVideoProduct: $('#modalVideoProduct'),
            ttMobileProductSlider: $('.tt-mobile-product-slider'),
            ttTabs: $ttPageContent.find('.js-tabs'),
            ttAsideGallery: $ttPageContent.find('.tt-aside-gallery'),
            ttProduct02: $ttPageContent.find('.tt-product-02'),
            jsTransition01: $ttPageContent.find('.js-transition'),
            jsSearchfilterFixed: $('#js-searchfilter'),
            jsDetachSearchMadal: $('#tt-detach-search-madal'),

        };
    if (blocks.jsSearchfilterFixed.length) {
        //detach searchfilter
        var objSearchfilter = $('#js-searchfilter').find('.tt-search-filter-wrapper').clone().get(0);
        $('#tt-detach-search-madal').append(objSearchfilter);
        //filter disclosure
        $("body").on("click", ".tt-search-filter .tt-col-title", function(event) {
            event.preventDefault();
            if ($window.width() <= 1025) {
                $(this).closest('.tt-search-filter').toggleClass('tt-open');
            };
        });
        $(window).on("load resize", function(e) {
            if ($window.width() > 1025) {
                blocks.jsSearchfilterFixed.removeClass('tt-fixed');
            } else {
                checkSearch();
            };
        });

        function checkSearch() {
            var pointOfChange = blocks.jsSearchfilterFixed.innerHeight() + blocks.jsSearchfilterFixed.offset().top;
            $window.scroll(function() {
                if ($window.width() > 1025) return;
                if ($window.scrollTop() >= pointOfChange) {
                    blocks.jsDetachSearchMadal.addClass('tt-fixed');
                    $('#ttBackToTop').addClass('tt-search-fixed');
                } else if ($window.scrollTop() < pointOfChange) {
                    blocks.jsDetachSearchMadal.removeClass('tt-fixed');
                    $('#ttBackToTop').removeClass('tt-search-fixed');
                };
            });
        };
    };
    if (blocks.ttAsideGallery.length) {
        blocks.ttAsideGallery.on('click', '.tt-img-thumbnails a', function(e) {
            var $ttImgLarge = $(this).closest('.tt-aside-gallery').find('.tt-img-large img');
            if ($(this).hasClass('tt-more')) {
                $(this).hide().closest('li').siblings().removeClass('tt-more-hide');
                return false;
            };
            $ttImgLarge.hide().attr('src', $(this).attr('href'));
            $ttImgLarge.load(function() {
                $(this).fadeIn(300);
            });
            return false;
        });
    };

    (function() {
        $ttPageContent.find(".ws-short-btn").each(function() {
            $(this).on('click', function(e) {
                $(this).prev('.ws-short-structure').addClass('is-open');
                $(this).remove();
                return false;
            });
        });
    }());
    if (blocks.jsTransition01.length) {
        $("body").on("click", ".js-transition", function(event) {
            event.preventDefault();
            var id = $(this).attr('href'),
                top = $(id).offset().top - 110;
            $('body,html').animate({ scrollTop: top }, 1500);
            console.log(`rid`);
        });
    };
    // header - tt-dropdown-obj
    if (blocks.ttHeaderDropdown.length) {
        $ttHeader.on('click', '.tt-dropdown-toggle', function(e) {
            $(this).closest('.tt-dropdown-obj').removeClass('active').siblings().removeClass('active');
            if ($(e.target).hasClass('tt-dropdown-toggle')) {
                $(this).closest('.tt-dropdown-obj').toggleClass('active');
                return false;
            };
            if ($(e.target).hasClass('tt-close-item')) {
                $(event.target).closest('li').remove();
            };
        });
        $ttHeader.on('click', '.tt-dropdown-menu .tt-btn-close', function(e) {
            $(this).closest('.tt-dropdown-obj').removeClass('active');
            return false;
        });

        $ttHeader.on('click', '.tt-dropdown-menu .tt-btn-close', function(e) {
            $(this).closest('.tt-cart').removeClass('active');
            return false;
        });

        $ttHeader.on('click', '.tt-dropdown-menu .tt-btn-close', function(e) {
            $(this).closest('.btn-toggle').removeClass('active');
            return false;
        });

    };

    //tabs
    $.fn.ttTabs = function(options) {
        function ttTabs(tabs) {
            var $tabs = $(tabs),
                $head = $tabs.find('.tt-tabs__head'),
                $head_ul = $head.find('> ul'),
                $head_li = $head_ul.find('> li'),
                $head_span = $head_li.find('> span'),
                $border = $head.find('.tt-tabs__border'),
                $body = $tabs.find('.tt-tabs__body'),
                $body_li = $body.find('> div'),
                anim_tab_duration = options.anim_tab_duration || 500,
                anim_scroll_duration = options.anim_scroll_duration || 500,
                breakpoint = 797,
                scrollToOpenMobile = (options.scrollToOpenMobile !== undefined) ? options.scrollToOpenMobile : true,
                singleOpen = (options.singleOpen !== undefined) ? options.singleOpen : true,
                toggleOnDesktop = (options.toggleOnDesktop !== undefined) ? options.toggleOnDesktop : true,
                effect = (options.effect !== undefined) ? options.effect : 'slide',
                offsetTop = (options.offsetTop !== undefined) ? options.offsetTop : '',
                goToTab = options.goToTab,
                $btn_prev = $('<div>').addClass('tt-tabs__btn-prev disabled'),
                $btn_next = $('<div>').addClass('tt-tabs__btn-next'),
                btn_act = false;

            function _closeTab($li, desktop) {
                var anim_obj = {
                    duration: anim_tab_duration,
                    complete: function() {
                        $(this).removeAttr('style');
                    }
                };

                function _anim_func($animElem) {
                    if (effect === 'toggle') {
                        $animElem.hide().removeAttr('style');
                    } else if (effect === 'slide') {
                        $animElem.slideUp(anim_obj);
                    } else {
                        $animElem.slideUp(anim_obj);
                    }
                };

                var $animElem;

                if (desktop || singleOpen) {
                    $head_li.removeClass('active');
                    $animElem = $body_li.filter('.active').removeClass('active').find('> div').stop();

                    _anim_func($animElem);
                } else {
                    var index = $head_li.index($li);

                    $li.removeClass('active');
                    $animElem = $body_li.eq(index).removeClass('active').find('> div').stop();

                    _anim_func($animElem);
                }
            };

            function _openTab($li, desktop, beforeOpen, afterOpen, trigger) {
                var index = $head_li.index($li),
                    $body_li_act = $body_li.eq(index),
                    $animElem,
                    anim_obj = {
                        duration: anim_tab_duration,
                        complete: function() {
                            if (afterOpen) afterOpen($body_li_act);
                        }
                    };

                function _anim_func($animElem) {
                    if (beforeOpen) beforeOpen($li.find('> span'));

                    if (effect === 'toggle') {
                        $animElem.show();
                        if (afterOpen) afterOpen($body_li_act);
                    } else if (effect === 'slide') {
                        $animElem.slideDown(anim_obj);
                    } else {
                        $animElem.slideDown(anim_obj);
                    }
                };

                $li.addClass('active');
                $animElem = $body_li_act.addClass('active').find('> div').stop();

                _anim_func($animElem);
            };

            function _replaceBorder($this, animate) {
                if ($this.length) {
                    var span_l = $this.get(0).getBoundingClientRect().left,
                        head_l = $head.get(0).getBoundingClientRect().left,
                        position = {
                            left: span_l - head_l,
                            width: $this.width()
                        };
                } else {
                    var position = {
                        left: 0,
                        width: 0
                    };
                }

                if (animate) $border.stop().animate(position, anim_tab_duration);
                else $border.stop().css(position);
            };

            function _correctBtns($li, func) {
                var span_act_l = $li.find('> span').get(0).getBoundingClientRect().left,
                    span_act_r = $li.find('> span').get(0).getBoundingClientRect().right,
                    head_pos = {
                        l: $head.get(0).getBoundingClientRect().left,
                        r: $head.get(0).getBoundingClientRect().right
                    };

                if (span_act_l < head_pos.l) {
                    _replace_slider(Math.ceil(head_pos.l - span_act_l), head_pos, false, function() {
                        func();
                    });
                } else if (span_act_r > head_pos.r) {
                    _replace_slider(Math.ceil(span_act_r - head_pos.r) * -1, head_pos, false, function() {
                        func();
                    });
                } else {
                    func();
                }
            };

            $head.on('click', '> ul > li > span', function(e, trigger) {
                var $this = $(this),
                    $li = $this.parent(),
                    wind_w = window.innerWidth,
                    desktop = wind_w > breakpoint,
                    trigger = (trigger === 'trigger') ? true : false;

                if ($li.hasClass('active')) {
                    if (desktop && !toggleOnDesktop) return;

                    _closeTab($li, desktop);

                    _replaceBorder('', true);
                } else {
                    _correctBtns($li, function() {
                        _closeTab($li, desktop);

                        _openTab($li, desktop,
                            function($li_act) {
                                if (desktop) {
                                    var animate = !trigger;

                                    _replaceBorder($li_act, animate);
                                }
                            },
                            function($body_li_act) {
                                if (!desktop && !trigger && scrollToOpenMobile) {
                                    var tob_t = $body_li_act.offset().top;
                                    $('html, body').stop().animate({ scrollTop: tob_t }, {
                                        duration: anim_scroll_duration
                                    });
                                }
                            }
                        );
                    });
                }
            });

            $body.on('click', '> div > span', function(e) {
                var $this = $(this),
                    $li = $this.parent(),
                    index = $body_li.index($li);

                $head_li.eq(index).find('> span').trigger('click');
            });

            function _toTab(tab, scrollTo, focus) {
                var wind_w = window.innerWidth,
                    desktop = wind_w > breakpoint,
                    header_h = 0,
                    $sticky = $(offsetTop),
                    $openTab = $head_li.filter('[data-tab="' + tab + '"]'),
                    $scrollTo = $(scrollTo),
                    toTab = {};

                if (desktop && $sticky.length) {
                    header_h = $sticky.height();
                }

                if (!$openTab.hasClass('active')) {
                    toTab = { scrollTop: $tabs.offset().top - header_h };
                }

                $('html, body').stop().animate(toTab, {
                    duration: anim_scroll_duration,
                    complete: function() {
                        _correctBtns($openTab, function() {
                            _closeTab($openTab, desktop);

                            _openTab($openTab, desktop,
                                function($li_act) {
                                    _replaceBorder($li_act, true);
                                },
                                function() {
                                    if ($scrollTo.length) {
                                        $('html, body').animate({ scrollTop: $scrollTo.offset().top - header_h }, {
                                            duration: anim_scroll_duration,
                                            complete: function() {
                                                var $focus = $(focus);

                                                if ($focus.length) $focus.focus();
                                            }
                                        });
                                    }
                                }
                            );
                        })
                    }
                });
            };

            if ($.isArray(goToTab) && goToTab.length) {
                $(goToTab).each(function() {
                    var elem = this.elem,
                        tab = this.tab,
                        scrollTo = this.scrollTo,
                        focus = this.focus;

                    $(elem).on('click', function(e) {
                        _toTab(tab, scrollTo, focus);

                        e.preventDefault();
                        return false;
                    });
                });
            }

            function _btn_disabled(head_pos) {
                var span_pos = {
                    l: $head_li.first().find('> span').get(0).getBoundingClientRect().left,
                    r: $head_li.last().find('> span').get(0).getBoundingClientRect().right
                };

                if (span_pos.l < head_pos.l) $btn_prev.removeClass('disabled');
                else $btn_prev.addClass('disabled');

                if (span_pos.r > head_pos.r) $btn_next.removeClass('disabled');
                else $btn_next.addClass('disabled');
            };

            function _replace_slider(difference, head_pos, resize, afterReplace) {
                var ul_pos = parseInt($head_ul.css('left'), 10),
                    border_pos = parseInt($border.css('left'), 10),
                    duration = (!resize) ? anim_tab_duration : 0,
                    anim_pos = {
                        'left': ul_pos + difference
                    };

                if (resize) {
                    $head_ul.css(anim_pos);
                    _btn_disabled(head_pos);
                } else {
                    $border.animate({ 'left': border_pos + difference }, anim_tab_duration);

                    $head_ul.animate(anim_pos, {
                        duration: duration,
                        complete: function() {
                            _btn_disabled(head_pos);
                            if (afterReplace) afterReplace();
                            btn_act = false;
                        }
                    });
                }
            };

            $tabs.on('click', '.tt-tabs__btn-prev, .tt-tabs__btn-next', function() {
                var $btn = $(this);
                if ($btn.hasClass('disabled') || btn_act) return;
                btn_act = true;
                var head_pos = {
                    l: $head.get(0).getBoundingClientRect().left,
                    r: $head.get(0).getBoundingClientRect().right
                };
                if ($btn.hasClass('tt-tabs__btn-next')) {
                    $head_span.each(function(i) {
                        var $this = $(this),
                            this_r = $this.get(0).getBoundingClientRect().right;
                        if (this_r > head_pos.r) {
                            _replace_slider(Math.ceil(this_r - head_pos.r) * -1, head_pos);
                            return false;
                        }
                    });
                } else if ($btn.hasClass('tt-tabs__btn-prev')) {
                    $($head_span.get().reverse()).each(function(i) {
                        var $this = $(this),
                            this_l = $this.get(0).getBoundingClientRect().left;
                        if (this_l < head_pos.l) {
                            _replace_slider(Math.ceil(head_pos.l - this_l), head_pos);
                            return false;
                        }
                    });
                }
            });

            $(window).on('resize load', function() {
                var wind_w = window.innerWidth,
                    desktop = wind_w > breakpoint,
                    head_w = $head.innerWidth(),
                    li_w = 0;
                $head_li.each(function() {
                    li_w += $(this).innerWidth();
                });
                if (desktop) {
                    var $li_act = $head_li.filter('.active'),
                        $span_act = $li_act.find('> span');
                    if (!singleOpen && $span_act.length > 1) {
                        var $save_active = $li_act.first();
                        _closeTab('', desktop);
                        _openTab($save_active, desktop);
                    }
                    if (li_w > head_w) {
                        $head.addClass('slider').append($btn_prev).append($btn_next);
                        $head_ul.css({ 'margin-right': (li_w - $head.innerWidth()) * -1 });
                        if ($span_act.length) {
                            var span_act_r = $span_act.get(0).getBoundingClientRect().right,
                                span_last_r = $head_span.last().get(0).getBoundingClientRect().right,
                                head_pos = {
                                    l: $head.get(0).getBoundingClientRect().left,
                                    r: $head.get(0).getBoundingClientRect().right
                                };
                            if (span_act_r > head_pos.r) {
                                _replace_slider(Math.ceil(span_act_r - head_pos.r) * -1, head_pos, true);
                            } else if (span_last_r < head_pos.r) {
                                _replace_slider(head_pos.r - span_last_r, head_pos, true);
                            }
                            _replaceBorder($span_act, false);
                        }
                    } else {
                        $head_ul.removeAttr('style');
                        $btn_prev.remove();
                        $btn_next.remove();
                        $head.removeClass('slider');
                        _replaceBorder($span_act, false);
                    }
                    $head.css({ 'visibility': 'visible' });
                } else {
                    $border.removeAttr('style');
                }
            });
            $head_li.filter('[data-active="true"]').find('> span').trigger('click', ['trigger']);
            return $tabs;
        };
        var tabs = new ttTabs($(this).eq(0));
        return tabs;
    };
    if (blocks.ttTabs.length) {
        blocks.ttTabs.ttTabs({
            singleOpen: false,
            anim_tab_duration: 270,
            anim_scroll_duration: 500,
            toggleOnDesktop: false,
            scrollToOpenMobile: true,
            effect: 'slide',
            offsetTop: '.tt-header[data-sticky="true"]',
            goToTab: [{
                    elem: '.tt-product-head__review-count',
                    tab: 'review',
                    scrollTo: '.tt-review__comments'
                },
                {
                    elem: '.tt-product-head__review-add, .tt-review__head > a',
                    tab: 'review',
                    scrollTo: '.tt-review__form',
                    focus: '#reviewName'
                }
            ]
        });
    };

    if (blocks.ttMobileProductSlider.length) {
        blocks.ttMobileProductSlider.slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            lazyLoad: 'progressive',
        });
        if ($html.hasClass('ie')) {
            blocks.ttModalQuickView.each(function() {
                blocks.ttMobileProductSlider.slick("slickSetOption", "infinite", false);
            });
        };
    };


    if (blocks.ttAsideJs.length && blocks.ttBtnToggleCol.length) {
        var $btnClose = blocks.ttAsideJs.find('.tt-btn-col-close');
        (function ttToggleCol() {
            blocks.ttBtnToggleCol.on('click', 'a', function(e) {
                var ttScrollValue = $body.scrollTop() || $html.scrollTop();
                blocks.ttAsideJs.toggleClass('column-open').perfectScrollbar();
                $body.css("top", -ttScrollValue).addClass("no-scroll").append('<div class="modal-filter"></div>');
                var modalFilter = $('.modal-filter').fadeTo('fast', 1);
                if (modalFilter.length) {
                    modalFilter.on('click', function() {
                        $btnClose.trigger('click');
                    })
                }
                return false;
            });
            $btnClose.on('click', function(e) {
                e.preventDefault();
                blocks.ttAsideJs.removeClass('column-open').perfectScrollbar('destroy');
                var top = parseInt($body.css("top").replace("px", ""), 10) * -1;
                $body.removeAttr("style").removeClass("no-scroll").scrollTop(top);
                $html.removeAttr("style").scrollTop(top);
                $(".modal-filter").off().remove();
            });
            $window.on('resize', function() {
                if ($body.hasClass('no-scroll')) {
                    blocks.ttAsideJs.find(".tt-btn-col-close").trigger('click');
                };
            });
        })();
    };

    //popup on pages product single

    if (blocks.modalVideoProduct.length) {
        blocks.modalVideoProduct.on('show.bs.modal', function(e) {
            var relatedTarget = $(e.relatedTarget),
                attr = relatedTarget.attr('data-value'),
                attrPoster = relatedTarget.attr('data-poster'),
                attrType = relatedTarget.attr('data-type');

            if (attrType === "youtube" || attrType === "vimeo" || attrType === undefined) {
                $('<iframe src="' + attr + '" allowfullscreen></iframe>').appendTo($(this).find('.modal-video-content'));
            };

            if (attrType === "video") {
                $('<div class="tt-video-block"><a href="#" class="link-video"></a><video class="movie" src="' + attr + '" poster="' + attrPoster + '" allowfullscreen></video></div>').appendTo($(this).find('.modal-video-content'));

            };
            ttVideoBlock();
        }).on('hidden.bs.modal', function() {
            $(this).find('.modal-video-content').empty();
        });
    };

    //video
    function ttVideoBlock() {
        $('.tt-video-block').on('click', function(e) {
            e.preventDefault();
            var myVideo = $(this).find('.movie')[0];
            if (myVideo.paused) {
                myVideo.play();
                $(this).addClass('play');
            } else {
                myVideo.pause();
                $(this).removeClass('play');
            }
        });
    };

    // Blog Masonr
    function gridGalleryMasonr() {
        // init Isotope
        var $grid = blocks.ttBlogMasonry.find('.tt-blog-init').isotope({
            itemSelector: '.element-item',
            layoutMode: 'masonry',
        });
        // layout Isotope after each image loads
        $grid.imagesLoaded().progress(function() {
            $grid.isotope('layout');
        });
        // filter functions
        var ttFilterNav = blocks.ttBlogMasonry.find('.tt-filter-nav');
        if (ttFilterNav.length) {
            var filterFns = {
                ium: function() {
                    var name = $(this).find('.name').text();
                    return name.match(/ium$/);
                }
            };
            // bind filter button click
            ttFilterNav.on('click', '.button', function() {
                var filterValue = $(this).attr('data-filter');
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({
                    filter: filterValue
                });
                $(this).addClass('active').siblings().removeClass('active');
            });
        };
        var isotopShowmoreJs = $('.isotop_showmore_js .btn'),
            ttAddItem = $('.tt-add-item');
        if (isotopShowmoreJs.length && ttAddItem.length) {
            isotopShowmoreJs.on('click', function(e) {
                e.preventDefault();
                $.ajax({
                    url: 'ajax_post.php',
                    success: function(data) {
                        var $item = $(data);
                        ttAddItem.append($item);
                        $grid.isotope('appended', $item);
                        adjustOffset();
                    }
                });

                function adjustOffset() {
                    var offsetLastItem = ttAddItem.children().last().children().offset().top - 180;
                    $($body, $html).animate({
                        scrollTop: offsetLastItem
                    }, 500);
                };
                return false;
            });
        };
    };

    if (blocks.ttCalendarDatepicker.length) {
        blocks.ttCalendarDatepicker.datepicker();
    };

    function moveFilterListing(windowWidth) {
        windowWidth <= 1024 ? insertAsideLocation() : insertFullwidthLocation();

        function insertFullwidthLocation() {
            var objFullwidth = ttAsideLocation.children().detach();
            ttFullwidthLocation.append(objFullwidth);
        };

        function insertAsideLocation() {
            var objAside = ttFullwidthLocation.children().detach();
            ttAsideLocation.append(objAside);
        };
        if (!$('#slider-snap').hasClass('noUi-target')) {
            initPriceSlider();
        };
    };

    //snapSlider
    function initPriceSlider() {
        if (typeof slider_val == 'undefined')
            return false
        var diff = parseInt(slider_val.max - slider_val.min)
        var diff = parseInt(slider_val.max - slider_val.min) / 10
        var snapSlider = document.getElementById('slider-snap');
        if(diff>0){
            if (snapSlider) {
                noUiSlider.create(snapSlider, {
                    start: [parseInt(slider_val.curr_min), parseInt(slider_val.curr_max)],
                    snap: true,
                    connect: true,
                    range: {
                        'min': parseInt(slider_val.min),
                        '10%': parseInt(parseInt(diff) + parseInt(slider_val.min)),
                        '20%': parseInt(parseInt(diff * 2) + parseInt(slider_val.min)),
                        '30%': parseInt(parseInt(diff * 3) + parseInt(slider_val.min)),
                        '40%': parseInt(parseInt(diff * 4) + parseInt(slider_val.min)),
                        '50%': parseInt(parseInt(diff * 5) + parseInt(slider_val.min)),
                        '60%': parseInt(parseInt(diff * 6) + parseInt(slider_val.min)),
                        '70%': parseInt(parseInt(diff * 7) + parseInt(slider_val.min)),
                        '80%': parseInt(parseInt(diff * 8) + parseInt(slider_val.min)),
                        '90%': parseInt(parseInt(diff * 9) + parseInt(slider_val.min)),
                        '100%': parseInt(slider_val.max),
                        'max': parseInt(slider_val.max)
                    }
                });
                var snapValues = [
                    document.getElementById('slider-snap-value-lower'),
                    document.getElementById('slider-snap-value-upper')
                ];
                snapSlider.noUiSlider.on('change', function(values, handle) {
                    snapValues[handle].innerHTML = values[handle];
                    var pr_max = $("#slider-snap-value-upper").text()
                    var pr_min = $("#slider-snap-value-lower").text()
                    $.ajax({
                        type: "POST",
                        dataType: "html",
                        url: google_map_object.ajax_url,
                        data: {
                            action: 'car_data_by_price',
                            price_min: pr_min,
                            price_max: pr_max
                        },
                        success: function(data) {
                            var json = JSON.parse(data);
                            $('#minp').val(json['min']);
                            $('#maxp').val(json['max']);
                        },
                    });
                });
            };
        };
    };

    if (blocks.ttListingFilters.length) {
        blocks.ttListingFilters.on('click', '.tt-quantity a', function(e) {
            $(this).toggleClass('active').siblings().removeClass('active');
            if ($(e.target).hasClass('tt-grid-switch')) {
                $("#tt-product-listing").addClass('tt-row-view').find('.tt-product, .tt-product-02').addClass('tt-view');
            } else {
                $("#tt-product-listing").removeClass('tt-row-view').find('.tt-product, .tt-product-02').removeClass('tt-view');
            };
            return false;
        });
    };

    if (blocks.ttFaq.length) {
        blocks.ttFaq.on('click', function(e) {
            $(this).toggleClass('active');
            return false;
        });
    };
    //video(blog listing)
    if (blocks.ttVideoBlock.length) {
        $('.tt-video-block').on('click', function(e) {
            e.preventDefault();
            var myVideo = $(this).find('.movie')[0];
            if (myVideo.paused) {
                myVideo.play();
                $(this).addClass('play');
            } else {
                myVideo.pause();
                $(this).removeClass('play');
            }
        });
    };

    //product pages
    var elevateZoomWidget = {
        scroll_zoom: true,
        class_name: '.zoom-product',
        thumb_parent: $('#smallGallery'),
        scrollslider_parent: $('.slider-scroll-product'),
        checkNoZoom: function() {
            return $(this.class_name).parent().parent().hasClass('no-zoom');
        },
        init: function(type) {
            var _ = this;
            var currentW = window.innerWidth || $(window).width();
            var zoom_image = $(_.class_name);
            var _thumbs = _.thumb_parent;
            _.initBigGalleryButtons();
            _.scrollSlider();

            if (zoom_image.length == 0) return false;
            if (!_.checkNoZoom()) {
                var attr_scroll = zoom_image.parent().parent().attr('data-scrollzoom');
                attr_scroll = attr_scroll ? attr_scroll : _.scroll_zoom;
                _.scroll_zoom = attr_scroll == 'false' ? false : true;
                currentW > 575 && _.configureZoomImage();
                _.resize();
            }
            if (_thumbs.length == 0) return false;
            var thumb_type = _thumbs.parent().attr('class').indexOf('-vertical') > -1 ? 'vertical' : 'horizontal';
            _[thumb_type](_thumbs);
            _.setBigImage(_thumbs);
        },
        configureZoomImage: function() {
            var _ = this;
            $('.zoomContainer').remove();
            var zoom_image = $(this.class_name);
            zoom_image.each(function() {
                var _this = $(this);
                var clone = _this.removeData('elevateZoom').clone();
                _this.after(clone).remove();
            });
            setTimeout(function() {
                $(_.class_name).elevateZoom({
                    gallery: _.thumb_parent.attr('id'),
                    zoomType: "inner",
                    scrollZoom: Boolean(_.scroll_zoom),
                    cursor: "crosshair",
                    zoomWindowFadeIn: 300,
                    zoomWindowFadeOut: 300
                });
            }, 100);
        },
        resize: function() {
            var _ = this;
            $(window).resize(function() {
                var currentW = window.innerWidth || $(window).width();
                if (currentW <= 575) return false;
                _.configureZoomImage();
            });
        },
        horizontal: function(_parent) {
            _parent.slick({
                infinite: true,
                dots: true,
                arrows: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                responsive: [{
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        },
        vertical: function(_parent) {
            _parent.slick({
                vertical: true,
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                verticalSwiping: true,
                arrows: true,
                dots: false,
                centerPadding: "0px",
                customPaging: "0px",
                responsive: [{
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        },
        initBigGalleryButtons: function() {
            var bigGallery = $('.bigGallery');
            if (bigGallery.length == 0) return false;
            $('body').on('mouseenter', '.zoomContainer',
                function() { bigGallery.find('button').addClass('show'); }
            ).on('mouseleave', '.zoomContainer',
                function() { bigGallery.find('button').removeClass('show'); }
            );
        },
        scrollSlider: function() {
            var _scrollslider_parent = this.scrollslider_parent;
            if (_scrollslider_parent.length == 0) return false;
            _scrollslider_parent.on('init', function(event, slick) {
                _scrollslider_parent.css({ 'opacity': 1 });
            });
            _scrollslider_parent.css({ 'opacity': 0 }).slick({
                infinite: false,
                vertical: true,
                verticalScrolling: true,
                dots: true,
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [{
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            }).mousewheel(function(e) {
                e.preventDefault();
                e.deltaY < 0 ? $(this).slick('slickNext') : $(this).slick('slickPrev');
            });
        },
        setBigImage: function(_parent) {
            var _ = this;
            var gal_change = $("#gal_change").val();
            console.log(gal_change)
            if(gal_change == "click"){
                _parent.find('a').on('click', function(e) {
                    _.checkNoZoom() && e.preventDefault();
                    var zoom_image = $(_.class_name);
                    var getParam = _.checkNoZoom() ? 'data-image' : 'data-zoom-image';
                    var setParam = _.checkNoZoom() ? 'src' : 'data-zoom-image';
                    var big_image = $(this).attr(getParam);
                    
                    zoom_image.attr(setParam, big_image);
                    if (!_.checkNoZoom()) return false;
                    _parent.find('.zoomGalleryActive').removeClass('zoomGalleryActive');
                    $(this).addClass('zoomGalleryActive');
                });
            }else{
                _parent.find('a').on('mouseover', function(e) {
                    _.checkNoZoom() && e.preventDefault();
                    var zoom_image = $(_.class_name);
                    var getParam = _.checkNoZoom() ? 'data-image' : 'data-zoom-image';
                    var setParam = _.checkNoZoom() ? 'src' : 'data-zoom-image';
                    var big_image = $(this).attr(getParam);
                    
                    zoom_image.attr(setParam, big_image);
                    $(this).click();
                    if (!_.checkNoZoom()) return false;
                    _parent.find('.zoomGalleryActive').removeClass('zoomGalleryActive');
                    $(this).addClass('zoomGalleryActive');
                });
            }
            
        }
    };
    elevateZoomWidget.init();

    //input type file
    $document.on('change', ':file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });
    $(':file').on('fileselect', function(event, numFiles, label) {
        $(this).closest('.tt-input-file').addClass('tt-upload');
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }
    });

    // // number counter
    // if (blocks.counterBlock.length) {
    //     $window.scroll(function() {
    //         var ttCounterObj = $('.tt-counter');
    //         ttCounterObj.each(function() {
    //             var cPos = $(this).offset().top,
    //                 topWindow = $window.scrollTop();
    //             if (cPos < topWindow + 800) {
    //                 $('.tt-counter').countTo().removeClass('tt-counter');
    //             }
    //         });
    //     })
    // };

    //mobile-quickLinks
    if ($ttMobileQuickLinks.length && $ttMobileQuickLinksPopup.length) {
        $('.tt-dropdown-menu').on('click', function(e) {
            if ($(e.target).hasClass('tt-btn-close')) {
                $(event.target).closest('.col').removeClass('active').find(".btn-toggle").trigger('click');
            };
            if ($(e.target).hasClass('tt-close-item')) {
                $(event.target).closest('li').remove();
            };
        });
        $ttMobileQuickLinks.on('click', '.btn-toggle:not(.no-popup)', function(e) {
            if ($ttMobileQuickLinksPopup.children().length) {
                $ttMobileQuickLinks.find('.btn-toggle.active').next('.quickLinks-layout').append($ttHeader.find('.tt-quickLinks-popup').children().detach());
            };
            if ($(this).hasClass('active')) {
                $ttMobileQuickLinks.find('.btn-toggle').removeClass('active').closest('.col').removeClass('active');
                return false;
            };
            $ttMobileQuickLinks.find('.btn-toggle').removeClass('active').closest('.col').removeClass('active');
            $(this).addClass('active').closest('.col').addClass('active');
            $ttMobileQuickLinksPopup.append($(this).next('.quickLinks-layout').children().detach());
            return false;
        });

        $(document).mouseup(function(e) {
            var div = $(".tt-cart.active");
            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('active').find('.btn-toggle').removeClass('active');
            };
        });
    };

    //initStuck
    if ($ttStucknav.length && !$ttStucknav.hasClass('disabled')) {
        var $headerHolder = $ttHeader.find('.header-holder');
        $window.scroll(function() {
            var ttHeaderHeight = $ttHeader.innerHeight();
            if ($window.scrollTop() > ttHeaderHeight) {
                if ($ttStucknav.hasClass('stuck')) return false;
                $ttStucknav.addClass('stuck');
                $ttStucknav.find('.tt-stuck-row').append($headerHolder.find('.row').children().detach());
            } else {
                if (!$ttStucknav.hasClass('stuck')) return false;
                $ttStucknav.removeClass('stuck');
                $headerHolder.find('.row').append($ttStucknav.find('.tt-stuck-row').children().detach());
            };
        });
    };

    //desctope menu
    var ttDesctopMenu = $('#tt-desctop-menu');
    if (ttDesctopMenu.length) {
        //is subMenu, is hover
        var ttMenuObjLevel_0 = ttDesctopMenu.find('ul > li');
        ttDesctopMenu.find('ul').parent('li').addClass('is-subMenu');
        ttMenuObjLevel_0.on("mouseenter mouseleave", function(event) {
            $(this).toggleClass("is-hover");
        });
        // //is active
        // var location = window.location.href,
        //     cur_url = location.split('/').pop();
        // ttDesctopMenu.find('li').each(function() {
        //     var link = $(this).find('a').attr('href');
        //     if (cur_url == link) {
        //         $(this).addClass('is-active').closest('.is-subMenu').addClass('is-active');
        //     }
        // });
    };

    function touchClickDesctope() {
        ttDesctopMenu.find('ul > li').each(function() {
            if ($(this).hasClass('is-subMenu')) {
                $(this).one("click", false);
            }
        });
    };

    // select custom
    var ttSelect = $('.tt-select');
    if (ttSelect.length) {
        ttSelect.each(function() {
            $(this).SumoSelect();
        });
    };


    if (blocks.mainSlider.length) {
        mainSlider();
    };
    if (!ttFullwidthLocation.length) {

        initPriceSlider();
    };
    $window.on('resize load', function() {
        var windowWidth = window.innerWidth || $window.width();
        alignmentArrows();
        if (ttAsideLocation.length && ttFullwidthLocation.length) {
            moveFilterListing(windowWidth);
        }
        initPortfolioPopup();
    });
    $window.on('load', function() {
        var windowWidth = window.innerWidth || $window.width();
        if ($body.length) {
            $body.addClass('loaded');
        };
        if (blocks.ttBlogMasonry.length) {
            // gridGalleryMasonr();
        };
        if (blocks.ttPortfolioMasonry.length) {
            // gridPortfolioMasonr();
        };
    });

    function initPortfolioPopup() {
        $($ttPageContent.find('.tt-product-02')).each(function(index) {
            window.innerWidth <= 1024 ? objMobile($(this)) : objDesctop($(this));
        });

        function objMobile($obj) {
            var item_selector = $obj.find('.tt-image-box .tt-btn-zomm');
            var items = item_selector.data('gallary');
            $obj.find('.tt-wrapper-description .tt-btn-zomm').magnificPopup({
                items: items,
                gallery: {
                    enabled: true
                },
                type: 'image'
            });
        };

        function objDesctop($obj) {
            var item_selector = $obj.find('.tt-image-box .tt-btn-zomm');
            var items = item_selector.data('gallary');
            $obj.find('.tt-image-box .tt-btn-zomm').magnificPopup({
                items: items,
                gallery: {
                    enabled: true
                },
                type: 'image'
            });
        };
    };

    function alignmentArrows() {
        setTimeout(function() {
            $ttPageContent.find('.slick-alignment-arrows').each(function() {
                var objArrow = $(this).find(".slick-prev, .slick-next");
                if (objArrow != undefined) {
                    var workspaceHeight = parseInt($(this).find('.slick-track').innerHeight(), 10),
                        objArrowHeight = parseInt(objArrow.innerHeight(), 10),
                        correctData = parseInt((workspaceHeight - objArrowHeight) / 2, 10);
                    objArrow.css('marginTop', correctData);
                };
            });
        }, 300);
    };
    // main slider
    function mainSlider() {
        var $el = blocks.mainSlider;
        $el.find('.slide').first().imagesLoaded({
            background: true
        }, function() {
            setTimeout(function() {
                $el.parent().find('.loading-content').addClass('disable');
            }, 1200);
        });
        $el.on('init', function(e, slick) {
            var $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        $el.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $currentSlide = $('div.slide[data-slick-index="' + nextSlide + '"]');
            var $animatingElements = $currentSlide.find('[data-animation]');
            doAnimations($animatingElements);
        });
        if ($el.hasClass('slick-initialized')) {

            $el.slick({
                arrows: false,
                dots: false,
                autoplay: true,
                autoplaySpeed: 5500,
                fade: true,
                speed: 1000,
                pauseOnHover: false,
                pauseOnDotsHover: true,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        arrows: false
                    }
                }, {
                    breakpoint: 1025,
                    settings: {
                        dots: false,
                        arrows: false
                    }
                }]
            });

        }
    };

    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('animation-delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
            if ($this.hasClass('animate')) {
                $this.removeClass('animation');
            }
        });
    };
    $('.tt-slick-slider').each(function() {
        $(this).slick({
            arrows: true,
            dots: true,
            responsive: [{
                breakpoint: 1370,
                settings: {
                    arrows: false,
                    dots: true,
                }
            }]
        });
    });
    // carusel Review
    if (blocks.jsReviewsCarousel.length) {
        blocks.jsReviewsCarousel.each(function() {
            var slick = $(this),
                itemQuantity = $(this).data('item');

            slick.slick({
                mobileFirst: false,
                slidesToShow: itemQuantity || 2,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: true,
                autoplay: false,
                autoplaySpeed: 5000,
                speed: 500,
                pauseOnHover: false,
                responsive: [{
                        breakpoint: 1370,
                        settings: {
                            arrows: false,
                            dots: true,
                        }
                    },
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                        }
                    }
                ]
            });
        });
    };
    var boxReviewsImg = $('.box-reviews-img');
    if (boxReviewsImg.length && blocks.jsReviewsCarousel.length) {
        $('.js-reviews-carousel').on('beforeChange', function(event, slick, currentSlide) {
            boxReviewsImg.find('div').each(function() {
                if ($(this).hasClass('tt-show')) {
                    $(this).removeClass('tt-show');
                };
            });
        });
        $('.js-reviews-carousel').on('afterChange', function(event, slick, currentSlide) {
            boxReviewsImg.find('div').removeClass('tt-show');
            boxReviewsImg.find('div').each(function() {
                if ($(this).hasClass('tt-show')) {
                    $(this).removeClass('tt-show');
                };
            });

            boxReviewsImg.addClass('tt-show').find(".slide-img" + currentSlide).addClass('tt-show');
        });
        //button
        var ttSlickButton = $('.tt-slick-button');
        if (ttSlickButton.length) {
            ttSlickButton.find('.slick-next').on('click', function(e) {
                $('.js-reviews-carousel').slick('slickNext');
            });
            ttSlickButton.find('.slick-prev').on('click', function(e) {
                $('.js-reviews-carousel').slick('slickPrev');
            });
        };
    };
    // carusel
    var jsCarousel = $('.js-carousel');
    if (jsCarousel.length) {
        jsCarousel.each(function() {
            var slick = $(this),
                itemQuantity = $(this).data('item'),
                itemDots = $(this).data('dots');
            slick.slick({
                dots: itemDots || false,
                arrows: true,
                infinite: true,
                speed: 600,
                slidesToShow: itemQuantity || 4,
                slidesToScroll: itemQuantity || 4,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 5000,
                responsive: [{
                        breakpoint: 1370,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            arrows: false,
                            dots: true,
                        }
                    },
                    {
                        breakpoint: 1270,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            arrows: false,
                        }
                    }, {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            arrows: false,
                        }
                    },
                    {
                        breakpoint: 791,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            arrows: false,
                        }
                    }
                ]
            });
        });
    };
    var jsCarouselBrand = $ttPageContent.find('.js-carousel-brand');
    if (jsCarouselBrand.length) {
        jsCarouselBrand.slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 7,
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 6000,
            responsive: [{
                    breakpoint: 1370,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                    }
                },
                {
                    breakpoint: 1270,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                    }
                }, {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                    }
                },
                {
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                    }
                }
            ]
        });
    };
    var jsCarouselNews = $ttPageContent.find('.js-carousel-news');
    if (jsCarouselNews.length) {
        jsCarouselNews.slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 1230,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                    }
                }
            ]
        });
    };
    var jsCarouselCol4 = $ttPageContent.find('.js-carousel-col-4');
    var count_post = $('#interested_slider_result').val();
    if (count_post >= 4) {
        count_post = 4;
    } else if (count_post > 1 && count_post < 4) {
        count_post = 3;
    } else {
        count_post = 2;

    }
    if (jsCarouselCol4.length) {
        jsCarouselCol4.slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: count_post,
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 6000,
            responsive: [{
                    breakpoint: 1370,
                    settings: {
                        arrows: false,
                    }
                },
                {
                    breakpoint: 1229,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }
            ]
        });
    };
    var jsCarouselCol3 = $ttPageContent.find('.js-carousel-col-3');
    if (jsCarouselCol3.length) {
        jsCarouselCol3.slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 6000,
            responsive: [{
                    breakpoint: 1370,
                    settings: {
                        arrows: false,
                    }
                },
                {
                    breakpoint: 1229,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                    }
                }
            ]
        });
    };


    var jsCarouselCustom01 = $ttPageContent.find('.js-carousel-custom01');
    if (jsCarouselCustom01.length) {
        jsCarouselCustom01.slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 6000,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        arrows: false,
                        dots: true,
                    }
                },
                {
                    breakpoint: 520,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: true,
                    }
                }
            ]
        });
    };

    if (blocks.sliderLayout.length) {
        var settings = {
            dots: true,
            arrows: false,
            infinite: true,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 4500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        if ($window.width() < 797) {
            blocks.sliderLayout.slick(settings);
        };
        $window.on('resize ready', function() {
            if ($window.width() > 797) {
                if (blocks.sliderLayout.hasClass('slick-initialized'))
                    blocks.sliderLayout.slick('unslick');
                return
            }
            if (!blocks.sliderLayout.hasClass('slick-initialized'))
                return blocks.sliderLayout.slick(settings);
        });
    };

    // button back to top
    var ttBackToTop = $('#ttBackToTop');
    if (ttBackToTop.length) {
        ttBackToTop.each(function() {
            $(this).on('click', function(e) {
                $('html, body').animate({
                    scrollTop: 0
                }, 500);
                return false;
            });
            $window.scroll(function() {
                $window.scrollTop() > 500 ? ttBackToTop.stop(true.false).addClass('tt-show') : ttBackToTop.stop(true.false).removeClass('tt-show');
            });
        });
    };

    // mobile menu
    // if ($ttDesctopMenu && blocks.mobileMenuToggle) {
    //     var ttDesktopMenu = $ttDesctopMenu.find('ul').first().children().clone();

    //     $ttMobilepMenu.find('ul').append(ttDesktopMenu);
    //     blocks.mobileMenuToggle.initMM({
    //         enable_breakpoint: true,
    //         mobile_button: true,
    //         breakpoint: 1025
    //     });
    // };

    // background image inline
    dataBg('[data-bg]');

    function dataBg(el) {
        $(el).each(function() {
            var $this = $(this),
                bg = $this.attr('data-bg');
            $this.css({
                'background-image': 'url(' + bg + ')'
            });
        });
    };

    // Detect Touch Devices
    window.mobileCheck = function() {
        var i = !1;
        return function(a) {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) && (i = !0)
        }(navigator.userAgent || navigator.vendor || window.opera), i
    };
    var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
    if (isTouch) {
        $('body').addClass('touch');
        touchClickDesctope();
    };

    //map
    $('.tt-map').each(function() {
        var btnToggle = $(this).find('.tt-btn-toggle');

        btnToggle.on('click', function(e) {
            $(this).toggleClass('is-open').next('.tt-box-map').slideToggle(200);
            return false;
        });
    });

    //map
    if ($("#" + blocks.googleMapHeader).length) {
        createMapHeader(blocks.googleMapHeader, googleMapOption.zoom, googleMapOption.latitude, googleMapOption.longitude, googleMapOption.marker);
    };
    if ($("#" + blocks.googleMapFooter).length) {
        createMapFooter(blocks.googleMapFooter, googleMapOption.zoom, googleMapOption.latitude, googleMapOption.longitude, googleMapOption.marker);
    };
    // Google Map Start
    var mapStyle = [{
        featureType: "water",
        elementType: "geometry",
        stylers: [{
            color: "#ededed"
        }, {
            lightness: 17
        }]
    }, {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{
            color: "#f5f5f5"
        }, {
            lightness: 20
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
            color: "#ffffff"
        }, {
            lightness: 17
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#ffffff"
        }, {
            lightness: 29
        }, {
            weight: 0.2
        }]
    }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{
            color: "#ffffff"
        }, {
            lightness: 18
        }]
    }, {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{
            color: "#ffffff"
        }, {
            lightness: 16
        }]
    }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
            color: "#f5f5f5"
        }, {
            lightness: 21
        }]
    }, {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{
            color: "#f7f7f7"
        }, {
            lightness: 21
        }]
    }, {
        elementType: "labels.text.stroke",
        stylers: [{
            visibility: "on"
        }, {
            color: "#ffffff"
        }, {
            lightness: 16
        }]
    }, {
        elementType: "labels.text.fill",
        stylers: [{
            saturation: 36
        }, {
            color: "#858585"
        }, {
            lightness: 40
        }]
    }, {
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{
            color: "#f7f7f7"
        }, {
            lightness: 19
        }]
    }, {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{
            color: "#f7f7f7"
        }, {
            lightness: 20
        }]
    }, {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#f7f7f7"
        }, {
            lightness: 17
        }, {
            weight: 1.2
        }]
    }];

    function createMapHeader(id, mapZoom, lat, lng, markers) {
        var mapOptions = {
            zoom: mapZoom,
            scrollwheel: false,
            center: new google.maps.LatLng(lat, lng),
            styles: mapStyle
        };
        var mapHeader = new google.maps.Map(document.getElementById(id), mapOptions);
        var count,
            locations = markers;
        for (count = 0; count < locations.length; count++) {
            new google.maps.Marker({
                position: new google.maps.LatLng(locations[count][1], locations[count][2]),
                map: mapHeader,
                title: locations[count][0],
                icon: locations[count][4]
            });
        }
    };

    function createMapFooter(id, mapZoom, lat, lng, markers) {
        var mapOptions = {
            zoom: mapZoom,
            scrollwheel: false,
            center: new google.maps.LatLng(lat, lng),
            styles: mapStyle
        };
        var mapHeader = new google.maps.Map(document.getElementById(id), mapOptions);
        var count,
            locations = markers;
        for (count = 0; count < locations.length; count++) {
            new google.maps.Marker({
                position: new google.maps.LatLng(locations[count][1], locations[count][2]),
                map: mapHeader,
                title: locations[count][0],
                icon: locations[count][4]
            });
        }
    };

    function gridPortfolioMasonr() {
        // init Isotope
        var $grid = blocks.ttPortfolioMasonry.find('.tt-portfolio-content').isotope({
            itemSelector: '.element-item',
            layoutMode: 'masonry',
        });
        // layout Isotope after each image loads
        $grid.imagesLoaded().progress(function() {
            $grid.isotope('layout').addClass('tt-show');
        });
        // filter functions
        var ttFilterNav = blocks.ttPortfolioMasonry.find('.tt-filter-nav');
        if (ttFilterNav.length) {
            var filterFns = {
                ium: function() {
                    var name = $(this).find('.name').text();
                    return name.match(/ium$/);
                }
            };
            var filterValue = $(this).attr('data-filter');
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({
                    filter: filterValue
                });
                $(this).addClass('active').siblings().removeClass('active');
            // bind filter button click
            ttFilterNav.on('click', '.button', function() {
                var filterValue = $(this).attr('data-filter');
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({
                    filter: filterValue
                });
                $(this).addClass('active').siblings().removeClass('active');
            });
        };
    };


    $('.head-cart').on('click', '.remove', function(e) {
        e.preventDefault();
        $(this).closest('.item_in_cart').append('<div class="loader-cart-delete"><img src="' + google_map_object.loader_img + '"></div>');
        var id = $(this).data('pro_id')
        var cart_item_key = $(this).data('cart_item_key')
        $.ajax({
            type: "POST",
            url: google_map_object.ajax_url,
            data: {
                action: 'product_remove_from_mini_cart',
                product_id: id,
                cart_item_key: cart_item_key
            },
            success: function(res) {
                if (res.fragments) {
                    $('.cart-count-wrap').replaceWith(res.fragments['.cart-count-wrap'])
                    $('.mini-cart-head').replaceWith(res.fragments['div.mini-cart-head'])
                }
                $('.loader-cart-delete').replaceWith('');
            }
        });
    })

    $('body').on('click', '.add-to-cart-custom', function() {
        var id = $(this).data('product_id');
        var selectorid = $(this).attr('id');
        var quantity = 1;
        var price = $(this).attr('data-price');
        var service = $(this).attr('data-service-title');
        var $this = $(this);
        var open = $(".open-cart-inp").val();
        $.ajax({
            type: "POST",
            url: google_map_object.ajax_url,
            data: {
                action: 'product_add_to_cart',
                product_id: id,
                price: price,
                quantity: quantity,
                service: service
            },
            success: function(res) {
                if (res = 'success') {
                    if (open == 1) {
                        $(".tt-cart").addClass('active');
                    }
                    $(".added-class").addClass('icon-cart ');
                    $("body").trigger("wc_fragment_refresh")
                }
                $this.show();
            }
        });
    })


    function stickySidebar(sticky) {
        if (!$(sticky).length) return false;
        var $sticky = $(sticky),
            additionalMarginTop = $('#tt-stuck').outerHeight() + 25;
        $sticky.attr('style', '');
        $sticky.find('.theiaStickySidebar').attr('style', '');
        $sticky.theiaStickySidebar({
            additionalMarginTop: additionalMarginTop,
            additionalMarginBottom: 0,
            minWidth: 1025,
            disableOnResponsiveLayouts: true
        });
    }

    function stickyPanel(panel) {
        if (!$(panel).length) return false;
        var $stickyBlk = $(panel),
            $main = $('#tt-pageContent'),
            $stickyWrapper = $('.js-sticky-panel-wrap'),
            stickyH = $('#tt-stuck').outerHeight();
        $stickyWrapper.height('');
        $stickyBlk.width('');
        var startPos = $stickyWrapper.offset().top - stickyH - 10;
        var finishPos = $main.height() - $stickyBlk.innerHeight() - 100;
        $stickyWrapper.height($stickyWrapper.height());
        $stickyBlk.width($stickyWrapper.width());
        $(window).on('scroll', function() {
            var currentScrollPos = $(document).scrollTop();
            if ((currentScrollPos > startPos) && (currentScrollPos <= finishPos)) {
                $stickyWrapper.height($stickyWrapper.height());
                $stickyBlk.removeClass('stuck-bottom').addClass('stuck');
            } else if (currentScrollPos > finishPos) {
                $stickyBlk.removeClass('stuck').addClass('stuck-bottom');
            } else {
                $stickyBlk.removeClass('stuck').removeClass('stuck-bottom');
                $stickyWrapper.height('');
            }
        });
    }
    $(window).on('load', function() {
        stickySidebar('.js-sticky-sidebar');
        stickyPanel('.js-sticky-panel');
        $(window).scroll();
    })

    $(window).on('resize', function() {
        setTimeout(function() {
            stickySidebar('.js-sticky-sidebar');
            stickyPanel('.js-sticky-panel');
        }, 100);
    })



    /**
     * simple-parallax-jquery - simpleParallax is a simple and lightweight jQuery plugin that gives your website parallax animations on the images
     * @version v4.0.0
     * @date: 07-01-2019 13:30:12
     * @link https://anakao-theme.com/simpleparallax/
     */
    "use strict";
    var _createClass = function() {
            function n(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(e, t, i) { return t && n(e.prototype, t), i && n(e, i), e }
        }(),
        _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e };

    function _classCallCheck(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }! function(e, t) { "function" == typeof define && define.amd ? define([], function() { return t(e) }) : "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? module.exports = t(e) : e.simpleParallax = t(e) }("undefined" != typeof global ? global : "undefined" != typeof window ? window : void 0, function(o) {
        var n = function() { for (var e, t = "transform webkitTransform mozTransform oTransform msTransform".split(" "), i = 0; void 0 === e;) e = null != document.createElement("div").style[t[i]] ? t[i] : void 0, i++; return e }();
        ! function() {
            for (var a = 0, e = ["ms", "moz", "webkit", "o"], t = 0; t < e.length && !o.requestAnimationFrame; ++t) o.requestAnimationFrame = o[e[t] + "RequestAnimationFrame"], o.cancelAnimationFrame = o[e[t] + "CancelAnimationFrame"] || o[e[t] + "CancelRequestAnimationFrame"];
            o.requestAnimationFrame || (o.requestAnimationFrame = function(e, t) {
                var i = (new Date).getTime(),
                    n = Math.max(0, 16 - (i - a)),
                    s = o.setTimeout(function() { e(i + n) }, n);
                return a = i + n, s
            }), o.cancelAnimationFrame || (o.cancelAnimationFrame = function(e) { clearTimeout(e) })
        }(), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(e) {
            var t = this;
            if (!document.documentElement.contains(t)) return null;
            do {
                if (t.matches(e)) return t;
                t = t.parentElement || t.parentNode
            } while (null !== t && 1 === t.nodeType);
            return null
        });
        var s = function() {
            function i(e, t) { _classCallCheck(this, i), this.element = e, this.elementContainer = e, this.lastPosition = -1, this.gap = 200, this.defaults = { delay: .6, orientation: "up", scale: 1.3, overflow: !1, transition: "cubic-bezier(0,0,0,1)", breakpoint: !1 }, this.settings = Object.assign(this.defaults, t), this.settings.breakpoint && document.documentElement.clientWidth <= this.settings.breakpoint || (this.init = this.init.bind(this), this.animationFrame = this.animationFrame.bind(this), this.handleResize = this.handleResize.bind(this), this.isImageLoaded(this.element) ? this.init() : this.element.addEventListener("load", this.init)) }
            return _createClass(i, [{ key: "init", value: function() {!1 === this.settings.overflow && this.wrapElement(), this.setStyle(), this.getElementOffset(), this.getViewportOffsetHeight(), this.animationFrame(), o.addEventListener("resize", this.handleResize) } }, { key: "isImageLoaded", value: function() { return !!this.element.complete && (void 0 === this.element.naturalWidth || 0 !== this.element.naturalWidth) } }, { key: "isVisible", value: function() { return this.elementBottomX > this.viewportTop - this.gap && this.elementTopX < this.viewportBottom + this.gap } }, {
                key: "wrapElement",
                value: function() {
                    var e = this.element.closest("picture") || this.element,
                        t = document.createElement("div");
                    t.classList.add("simpleParallax"), t.style.overflow = "hidden", e.parentNode.insertBefore(t, e), t.appendChild(e), this.elementContainer = t
                }
            }, {
                key: "unWrapElement",
                value: function() {
                    for (var e = this.elementContainer.parentNode; this.elementContainer.firstChild;) e.insertBefore(this.elementContainer.firstChild, this.elementContainer);
                    e.removeChild(this.elementContainer)
                }
            }, { key: "setStyle", value: function() {!1 === this.settings.overflow && (this.element.style[n] = "scale(" + this.settings.scale + ")"), 0 < this.settings.delay && (this.element.style.transition = "transform " + this.settings.delay + "s " + this.settings.transition), this.element.style.willChange = "transform" } }, { key: "unSetStyle", value: function() { this.element.style.willChange = "", this.element.style[n] = "", this.element.style.transition = "" } }, {
                key: "getElementOffset",
                value: function() {
                    var e = this.elementContainer.getBoundingClientRect();
                    this.elementHeight = e.height, this.elementTopX = e.top + o.pageYOffset, this.elementBottomX = this.elementHeight + this.elementTopX
                }
            }, { key: "getViewportOffsetTop", value: function() { this.viewportTop = o.pageYOffset } }, { key: "getViewportOffsetHeight", value: function() { this.viewportHeight = document.documentElement.clientHeight } }, { key: "getViewportOffsetBottom", value: function() { this.viewportBottom = this.viewportTop + this.viewportHeight } }, { key: "handleResize", value: function() { this.getViewportOffsetHeight(), this.getElementOffset(), this.getRangeMax() } }, {
                key: "getRangeMax",
                value: function() {
                    var e = this.element.clientHeight;
                    this.rangeMax = e * this.settings.scale - e, "down" !== this.settings.orientation && "right" !== this.settings.orientation || (this.rangeMax *= -1)
                }
            }, { key: "getTranslateValue", value: function() { var e = ((this.viewportBottom - this.elementTopX) / ((this.viewportHeight + this.elementHeight) / 100)).toFixed(1); return e = Math.min(100, Math.max(0, e)), this.oldPercentage !== e && (this.rangeMax || this.getRangeMax(), this.translateValue = (e / 100 * this.rangeMax - this.rangeMax / 2).toFixed(0), this.oldTranslateValue !== this.translateValue && (this.oldPercentage = e, this.oldTranslateValue = this.translateValue, !0)) } }, {
                key: "animate",
                value: function() {
                    var e = 0,
                        t = 0,
                        i = void 0;
                    "left" === this.settings.orientation || "right" === this.settings.orientation ? t = this.translateValue + "px" : e = this.translateValue + "px", i = !1 === this.settings.overflow ? "scale(" + this.settings.scale + ") translate3d(" + t + ", " + e + ", 0)" : "translate3d(" + t + ", " + e + ", 0)", this.element.style[n] = i
                }
            }, { key: "proceedElement", value: function() { this.isVisible() && this.getTranslateValue() && this.animate() } }, { key: "animationFrame", value: function() { this.getViewportOffsetTop(), this.lastPosition !== this.viewportTop ? (this.getViewportOffsetBottom(), this.proceedElement(), this.frameID = o.requestAnimationFrame(this.animationFrame), this.lastPosition = this.viewportTop) : this.frameID = o.requestAnimationFrame(this.animationFrame) } }, { key: "destroy", value: function() { this.unSetStyle(), !1 === this.settings.overflow && this.unWrapElement(), o.cancelAnimationFrame(this.frameID), o.removeEventListener("resize", this.handleResize) } }]), i
        }();
        return function(e, t) {
            if (e.length)
                for (var i = 0; i < e.length; i++) new s(e[i], t);
            else new s(e, t)
        }
    });
    /*
    	Parallax
    */

    var jsInitParallax = $('#tt-pageContent .js-init-parallax');
    if (jsInitParallax.length) {
        initParallax();
    };
    $(window).resize(function(e) {
        var ttwindowWidth = window.innerWidth || $window.width();
        if (ttwindowWidth > 1024) {
            initParallax();
        };
    });

    function initParallax() {
        jsInitParallax.each(function() {
            var obj = $(this),
                orientation = $(this).data('orientation'),
                overflow = $(this).data('overflow'),
                scale = $(this).data('scale');

            new simpleParallax(obj, {
                overflow: overflow || false,
                scale: scale || 1.2,
                breakpoint: 1024,
                orientation: orientation,
            });
        });
    };
})(jQuery);

(function($) {
    var $ptPageContent = $('#tt-pageContent'),
        ptPortfolioMasonry = $ptPageContent.find('.pt-wrapper-masonry'),
        $window = $(window);

    $window.on('load', function() {
        var ptwindowWidth = window.innerWidth || $window.width();
        if (ptPortfolioMasonry.length) {
            // gridPortfolioMasonr();

        };
    });
    var ptCachedWidth = $window.width();
    $window.on('resize', function() {
        var newWidth = $window.width();
        if (newWidth !== ptCachedWidth) {
            ptCachedWidth = newWidth;
            var ptwindowWidth = window.innerWidth || $window.width();
        }
    });

    function gridPortfolioMasonr() {
        // init Isotope
        var $grid = ptPortfolioMasonry.find('.pt-portfolio-content').isotope({
            itemSelector: '.element-item',
            layoutMode: 'masonry',
        });
        // layout Isotope after each image loads
        $grid.imagesLoaded().progress(function() {
            $grid.isotope('layout').addClass('pt-show');
        });
        // filter functions
        var ptFilterNav = ptPortfolioMasonry.find('.pt-filter-nav');
        if (ptFilterNav.length) {
            var filterFns = {
                ium: function() {
                    var name = $(this).find('.name').text();
                    return name.match(/ium$/);
                }
            };

            var filterValue = $ttPageContent.find('.tt-portfolio-masonry').find('.tt-filter-nav .button').attr('data-filter');
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({
                    filter: filterValue
                });
                $(this).addClass('active').siblings().removeClass('active');
            // bind filter button click
            ptFilterNav.on('click', '.button', function() {
                var filterValue = $(this).attr('data-filter');
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({
                    filter: filterValue
                });
                $(this).addClass('active').siblings().removeClass('active');
            });
        };
        //add item
        var isotopShowmoreJs = $('.isotop_showmore_js .btn'),
            ptAddItem = $('.pt-add-item');
        if (isotopShowmoreJs.length && ptAddItem.length) {
            isotopShowmoreJs.on('click', function(e) {
                e.preventDefault();
                $.ajax({
                    url: 'ajax_portfolio.php',
                    success: function(data) {
                        var $item = $(data);
                        ptAddItem.append($item);
                        $grid.isotope('appended', $item);
                        initPortfolioPopup();
                        adjustOffset();
                    }
                });

                function adjustOffset() {
                    var offsetLastItem = ptAddItem.children().last().children().offset().top - 180;
                    $($body, $html).animate({
                        scrollTop: offsetLastItem
                    }, 500);
                };
                return false;
            });
        };
    };
})(jQuery);