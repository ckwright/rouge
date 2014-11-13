// _gaq.push(['_trackPageview', '/some-page']);
var currentPage = 1;
var dateMap = [];

function trackUrl(url) {
    if (_gaq) {
        _gaq.push(['_trackPageview', url]);
    }
}

function cleanUrl(url) {
    if (url.indexOf('?') !== -1) {
        return url;
    }
    if (url.lastIndexOf('/') !== (url.length - 1)) {
        url += '/';
    }
    return url;
}

function compare(a,b) {
  if (a.date < b.date) { return -1; }
  if (a.date > b.date) { return 1; }
  return 0;
}
 
function clockTick() {
    var currentTime = new Date ();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var timeOfDay = (currentHours < 12) ? "AM" : "PM";
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
    currentHours = ( currentHours == 0 ) ? 12 : currentHours;
    var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;
    $(".dn-time").html(currentTimeString);
    checkTimeSwitch();
}

function isValidDate(d) {
    if ( Object.prototype.toString.call(d) !== "[object Date]" ) {
        return false;
    }
    return !isNaN(d.getTime());
}

function addToMap(id) {
    var idx = $(id).attr('data-index');
    dateMap.unshift({id:id,idx:idx});
}
 
function addToEven(id) {
    $(id).appendTo(".dn-even-parent");
    $(id).removeClass('hidden');
}
 
 
function addToOdd(id) {
    $(id).appendTo(".dn-odd-parent");
    $(id).removeClass('hidden');
}

function displayPosts() {
    dateMap = [];
    // the formating of date is incorrect from the core is what it seems, so need to use defined
    // index to correctly sort the posts for single column screens. 
    var idx = 0;
    $('.dn-post-entry').each(function() {
        $(this).attr('data-index', idx);
        addToMap('#'+$(this).attr('id'));
        idx++;
    });
    $('.dn-even').each(function() {
        addToEven('#'+$(this).attr('id'));
    });
    $('.dn-odd').each(function() {
        addToOdd('#'+$(this).attr('id'));
    });
    adjustElementsToWidth();
}

function adjustElements() {
    displayPosts();
    
    var blogName = $('.dn-blog-name > h5').text();
    if (blogName.length > 40) {
        $('.dn-blog-name > h5').text(blogName.substring(0, 40) + '...');
    }
    $('.dn-blog-name').removeClass('hidden');
}

function adjustElementsForBlog() {
    $('.dn-post-excerpt').each(function() {
        var lastPar = $(this).children(':last-child');
        if (lastPar) {
            lastPar.html(lastPar.html() + '...');
        }
    });
}

function adjustForSmall() {
    if ($('.dn-single-column').children('article').length === 0) {
        for(var i = 0; i < dateMap.length; i++) {
            $(dateMap[i].id).prependTo('.dn-single-column');
        }       
    }
}

function adjustForMediumAndLarge() {
    if ($('.dn-single-column').children('article').length > 0) {
        for(var i = 0; i < dateMap.length; i++) {
            var appendEl = '.dn-even-parent';
            if ($(dateMap[i].id).hasClass('dn-odd')) {
                appendEl = '.dn-odd-parent';
            }
            $(dateMap[i].id).prependTo(appendEl);
        } 
    }
}

function adjustElementsToWidth() {
    var ww = $(window).width();
    var isSmall = (ww <= 640);
    var isMedium = (ww > 640 && ww <= 900);
    $('.adjust').each(function() {
        if (isSmall) {
            $(this).addClass('sm-aj');
            $(this).removeClass('md-aj');
            adjustForSmall();
        } else if (isMedium) {
            $(this).addClass('md-aj');
            $(this).removeClass('sm-aj');
            adjustForMediumAndLarge();
        } else {
            $(this).removeClass('md-aj');
            $(this).removeClass('sm-aj');
            adjustForMediumAndLarge();
        }
    });
}
 
function switchTime() {
    $('body').toggleClass('night');
    $('body').addClass('dn-noswitch');
}

function scrollToTop(p) {
    var d = (p || "normal");
    $("html, body").animate({ scrollTop: 0 }, d);
}

function initActions() {
    $('.dn-back-to-posts').click(function(event) {
        lnkPushState($(this).attr("href"));
        displayPageInContentSmooth('/page/' + currentPage);
        return false;
    });
    $('.dn-load-post-page, .dn-post-link').click(function(event) {
        lnkPushState($(this).attr("href"));
        if ($(this).attr('href').indexOf('/page/') !== -1) {
            var page = $(this).attr('href').match(/\d+/gi);
            if (page) {
                currentPage = parseInt(page[0]);
            } else {
                 currentPage = 1;
            }
        } else if ($(this).hasClass('dn-load-post-page')) {
            currentPage = 1;
        }
        displayPageInContentSmooth($(this).attr('href'));
        return false;
    });
    $('.dn-ajx-link').unbind('click').click(function(event) {
        currentPage = 1;
        lnkPushState($(this).attr("href"));
        displayPageInContentSmooth($(this).attr('href'));
        return false;
    });
    $('.uimg, uimg-d').unbind('click').click(function() {
        window.location.href = '/';
    });
}

function prepareForLoad() {
    var load = null;
    if ($('body').hasClass('night')) {
        load = $('.night-load').clone();
    } else {
        load = $('.day-load').clone();
    }
    load.appendTo("#dn-content");
    load.removeClass('hidden');
    $("#dn-content").show();
}

function loadPageElements(data) {
    $("#dn-content").empty(); 
    $("#dn-content").hide();
    var $response = $(data);
    var content = $response.find('#dn-content').html();
    var navMenu = $response.find('.dn-nav-menu').html();
    $("#dn-content").append(content);
    $('.dn-nav-menu').empty().append(navMenu);
    initActions();
    displayPosts();
    adjustElementsForBlog();
    $("#dn-content").fadeIn(function() {
        $('.site-footer').fadeIn();
    });
}

function displayPageInContentSmooth(url, callback) {
    $('.site-footer').hide();
    scrollToTop();
    $("#dn-content").fadeOut(400, function() {
       $("#dn-content").empty(); 
       prepareForLoad();
       loadPageToContent(url, callback);
    }); 
}

function checkTimeSwitch() {
    var dh = new Date().getHours();
    var isNight = $('body').hasClass('night');
    var noSwitch = $('body').hasClass('dn-noswitch');
    if (dh >= 18 || dh <= 6) {
        if (!isNight && !noSwitch) {
            $('body').toggleClass('night');
        }
    } else {
        if (isNight && !noSwitch) {
            $('body').removeClass('night');
        }
    }
}

function displayHome() {
    setTimeout(function() {
        $('.dn-initial').hide();
        $('.dn-initial').removeClass('hidden');
        checkTimeSwitch();
        $('.dn-initial').show();
        adjustElementsForBlog();
        $('body').css('opacity', '1');
    }, 100);
}

function loadPageToContent(url, callback) {
    trackUrl(url);
    url = cleanUrl(url);
    $.ajax({
        type: "GET",
        url: url + '?_pc_remove_args=true',
        cache: false,
        dataType: 'html',
        success: function(data) {
            setTimeout(function() {
                loadPageElements(data);
            }, 400);
        },
        error: function(){      
            
        },
        complete: function(){ 
            
        },
        statusCode: {
            404: function(xhr) {
                $("#dn-content").empty().append('<h1>404 Page not found</h1><br/><p>The page you are trying to access was not found. If you are an admin of this blog, please make sure this page is available or remove the link pointing to it.</p>');
            }
        }
    });
}
 
jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
        '-moz-transform' : 'rotate('+ degrees +'deg)',
        '-ms-transform' : 'rotate('+ degrees +'deg)',
        'transform' : 'rotate('+ degrees +'deg)',
    });
};

function lnkPushState(url) {
    var pushurl = url || '/';
    history.pushState({path: pushurl}, '', pushurl);
}

$(window).bind('popstate', function(event) {
    var state = event.originalEvent.state;
    if (state && state.path) {
        displayPageInContentSmooth(state.path);
    }
});

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){
        
        setInterval('clockTick()', 1000);
        initActions();
        
        $('.night-day-action').click(function(event) {
            event.preventDefault();
            switchTime();
        });
        
        $('.dn-show-menu-action').click(function(event) {
            //event.preventDefault();
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                $('.side-nav').slideDown(500, function() {
                    $('.dn-show-menu-action > span').rotate(180);
                });
            } else {
                $(this).addClass('open');
                $('.side-nav').slideUp(500, function() {
                    $('.dn-show-menu-action > span').rotate(0);
                });
            }
        });

    

        $(".post-content").fitVids();
        adjustElements();
        displayHome();
        
        $(window).load(function() {
            adjustElementsToWidth();
        }).resize(function(){
            adjustElementsToWidth();
        });
    });

}(jQuery));