 /******************************************************
  ___ ____
 / __|    |
/ /  |___ /
\ \__|    \
 \___|____|
*******************************************************
******** code by CB -> www.christianbroms.com  ********
********       https://github.com/CBR0MS       ********
******************************************************/

// global vars 
var isMobile = false; 
var isTablet = false;
var is4K = false;

var paddingVal = 0;

var OPACITY_FADEIN_SPEED = 500;
var MARGIN_MOVEMENT_SPEED = 1000;

/*******************************************************
*********          Device detection             ********
*******************************************************/

function setMovementOpacityToDevice() {
    // setting the movement speed constants to devices 

    if (isMobile) {
        OPACITY_FADEIN_SPEED = 500;
        MARGIN_MOVEMENT_SPEED = 1000;
    }
    else if (isTablet){
        OPACITY_FADEIN_SPEED = 1000;
        MARGIN_MOVEMENT_SPEED = 1300;
    }
    else {
        OPACITY_FADEIN_SPEED = 1000;
        MARGIN_MOVEMENT_SPEED = 2000;
    }
}

function setMenuHeight() {
    paddingVal = ($(window).height() - ($(".menu-contents").length * $(".menu-contents").height())) / 
    $(".menu-contents").length - 2;
    if (isTablet) {
        paddingVal += 15;
    }
    var realPaddingVal = ($(window).height() - ($(".menu-contents").length * $(".menu-contents").height())) / 
    $(".menu-contents").length;
    var imageHeight = realPaddingVal + $(".menu-contents").height();
    $(".menu-contents").css("padding-top", paddingVal / 2);
    $(".menu-contents").css("padding-bottom", paddingVal / 2);
    $(".menu-img-container").css("height", Math.ceil(imageHeight) + "px");
}

$(document).ready(function() {
    //device detection
    if ($(window).width() <= 750) {
        isMobile = true;
    }
    else if ($(window).width() > 750 && $(window).width() <= 1024) {
        isTablet = true;
    }
    else if ($(window).width() > 2300){
        is4K = true;
    }
    // set the opacity and movement speeds 
    setMovementOpacityToDevice();
    // set the menu bar font size
    if (isMobile) {
        $(".menu-contents").css('font-size', "7vw");
        $(".main-entry").css('font-size', "16px");
    } else if (is4K){
        $(".menu-contents").css('font-size', "1vw");
        $(".main-entry").css('font-size', "20px");
    }
    else if (isTablet){
        $(".menu-contents").css('font-size', "3vw");
        $(".main-entry").css('font-size', "20px");
    }
    else {
        //$(".menu-contents").css('font-size', $("#bar").width() - 100 + "%");
        $(".menu-contents").css('font-size', "1.5vw");
        $(".main-entry").css('font-size', "20px");
    }
    $("#bar").css("position", "fixed");
    $("#bar").css("z-index", "0");

    setMenuHeight();

});

// re-calculate font size on window resize
$(window).resize(function() {

    if ($(window).width() <= 750) {
        isMobile = true;
        isTablet = false;
        is4k = false;
    }
    else if ($(window).width() > 750 && 1024 >= $(window).width()) {
        isTablet = true;
        isMobile = false;
        is4k = false;
    }
    else if ($(window).width() > 2300){
        is4K = true;
        isMobile = false;
        isTablet = false;
    }
    else {
        is4K = false;
        isMobile = false;
        isTablet = false;
    }
    setMovementOpacityToDevice();
    if (isMobile) {
        $(".menu-contents").css('font-size', "7vw");
        $(".main-entry").css('font-size', "16px");
    } else if (is4K){
        $(".menu-contents").css('font-size', "1vw");
        $(".main-entry").css('font-size', "20px");
    }
    else if (isTablet){
        $(".menu-contents").css('font-size', "3vw");
        $(".main-entry").css('font-size', "20px");
    }
    else {
       $(".menu-contents").css('font-size', "1.5vw");
       $(".main-entry").css('font-size', "20px");
        //$(".menu-contents").css('font-size', $("#bar").width() - 100 + "%");
    }
    setMenuHeight();
});

/*******************************************************
*********   Site intro, fading out title text   ********
*******************************************************/

function siteIntro() {

    if( $("#title").css('display') != 'none') {
        $("#title").fadeOut(600, "linear", function() {
            showSideMenu();
        });
    }
}
$("#arrow").click(siteIntro);

/*******************************************************
*********   Disables scrolling across all pages ********
*******************************************************/
// https://stackoverflow.com/a/4770179

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
  // run the site intro on scroll down
  siteIntro();  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        // run the site intro on key down 
        siteIntro();
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
}
// disabling scrolling across the entire site 
disableScroll();

function enableScroll() {
    
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}

/*******************************************************
*********   functions to set up the page        ********
*******************************************************/

function showPageInfo(id) {

    if ( $(id)[0].scrollHeight + 100 > $('#content-wrapper').height()){
        $('#content-wrapper').css('height', $(id)[0].scrollHeight + 100);
        $("body").css('height', $(id)[0].scrollHeight + 150);
    }
    
    //fades the subpage in 
    enableScroll();
    $("#title").css("display", "none");
    $(id).css("display", "inline");
    $(id).css("visibility", "visible");
    $(id).css("z-index", "10");
    $(id).animate({'margin-top':
       '0vh'}, { queue: false, duration: MARGIN_MOVEMENT_SPEED, });
    $(id).animate({'opacity': '1'}, { queue: false, duration: OPACITY_FADEIN_SPEED });
}

function closePageInfo(id) {
    // facdes the subpage out
    disableScroll();
    //$('#content-wrapper').css('height', "initial");
    //$("body").css('height', "initial");
    $("#title").css("display", "none");
    $(id).animate({'opacity': '-1'},  500, function() {
        $(id).css("display", "none");
        $(id).css("margin-top", "100vh");
        $(id).css("z-index", "0");
        window.scrollTo(0, 0);  
    });
}

function showSideMenu() {
    // showing menu from the bottom 
    $("#title").css("display", "none");
    window.location.hash = "MENU";
    $("#bar").css("visibility", "visible");
    $("#bar").animate({'margin-top': '0vh'}, { queue: false, duration: MARGIN_MOVEMENT_SPEED });
    $("#bar").animate({'opacity': '1'}, { queue: false, duration: OPACITY_FADEIN_SPEED * 2});

    // show images 
    if (!isMobile){
        setTimeout(function(){ 
            $("#menu-images").css("display", "inline");
            $("#menu-images").animate({'opacity': '1'}, { queue: false, duration: OPACITY_FADEIN_SPEED * 2});
            var delay = 0;
            $(".menu-img-container").each(function(){
                $(this).delay(delay).animate({opacity:0.4}, OPACITY_FADEIN_SPEED / 1.5);
                delay += 150;
            });
        }, 0); // delay the images moving in -- to make the images move in after the bar, use MARGIN_MOVEMENT_SPEED
    }
}

function closeSideMenu() {
    //closing the side menu from a subpage, mobile
    // does not handle changing the hash
    $("#title").css("display", "none");
    $("#bar").animate({'margin-left': '-50vh'}, { queue: false, duration: MARGIN_MOVEMENT_SPEED });
    $("#bar").animate({'opacity': '0'}, { queue: false, duration: OPACITY_FADEIN_SPEED });
    $("#back-button").css("visibility", "visible");
    $("#back-button").css("z-index", "5");
    $("#back-button").animate({'opacity': '1'}, { queue: false, duration: OPACITY_FADEIN_SPEED });
    if (isTablet){
        $("#menu-images").animate({'opacity': '0'}, OPACITY_FADEIN_SPEED / 2, function() {
            $(".menu-img-container").css("opacity", "0");
            $("#menu-images").css("display", "none");
        });
    }
}

function openFromSide() {
    // opening the side menu, mobile
    
    $("#title").css("display", "none");
    window.location.hash = "MENU";
    $("#bar").animate({'margin-left': '0vh'}, { queue: false, duration: MARGIN_MOVEMENT_SPEED });
    $("#bar").animate({'opacity': '1'}, { queue: false, duration: OPACITY_FADEIN_SPEED });
    $("#back-button").css("z-index", "-1");
    $("#back-button").animate({'opacity': '0'}, { queue: false, duration: OPACITY_FADEIN_SPEED }, function() {
        $("#back-button").css("visibility", "hidden");
    });
    if (isTablet) {
        setTimeout(function(){  // this is correct!// do this for the other cases
            $("#menu-images").css("display", "inline");
            $("#menu-images").css("opacity", "1");
            var delay = 0;
            $(".menu-img-container").each(function(){
                $(this).delay(delay).animate({opacity:0.4}, OPACITY_FADEIN_SPEED / 1.5);
                delay += 150;
            });
        }, MARGIN_MOVEMENT_SPEED);
    }
}

/*******************************************************
****   Opacity change of menu images on hover       ****
*******************************************************/

// make menu image opacity change on mouseover of text
$(".menu-contents").mouseover(function() {
    var tempid = $(this).children().attr("id");
    $("div").find( "." + $.escapeSelector(tempid)).css("opacity", "0.6");;
});
// restore to OG opacity
$(".menu-contents").mouseout(function() {
    var tempid = $(this).children().attr("id");
    $("div").find( "." + $.escapeSelector(tempid)).css("opacity", "0.4");;
});

$(".menu-img-container").mouseover(function() {
    if($(this).css("opacity") >= 0.4){
        $(".menu-img-container").clearQueue();
        $(this).css("opacity", "0.6");
    } 
});

$(".menu-img-container").mouseout(function() {
    $(this).css("opacity", "0.4");
});

/*******************************************************
*********   transition on menu item click       ********
*******************************************************/

$(".page-direct").click(function() {
 
     // clicking on a menu item 
   // remove the images 
   $("#menu-images").animate({'opacity': '0'}, OPACITY_FADEIN_SPEED / 2, function() {
    $(".menu-img-container").css("opacity", "0");
    $("#menu-images").css("display", "none");
});
   
    var hash = $(this).attr("id"); // the destination
    var realhash = window.location.hash.toLowerCase(); // the current location

    if (isMobile || isTablet){
        // close the menu on mobile
        closeSideMenu();
        showPageInfo(hash); // show the new subpage
        window.location.hash = (hash.substring(1)).toUpperCase();
    }
    else if (realhash != hash) {
        // close the open subpage (cannot be mobile)
        if (realhash != "#menu") {
            closePageInfo(realhash);
        } 
        enableScroll();
        setTimeout(function(){ // setting timeout for fade
            showPageInfo(hash); // show the new subpage
            window.location.hash = (hash.substring(1)).toUpperCase();
        }, 500);
    }
    if (!isMobile && !isTablet) {
        // if we're on desktop, shrink down the other menu items so they're less obstructive
        $(".page-direct").not(this).each(function(){
            $(this).parent(".menu-contents").animate(
                {'padding-top': paddingVal / 4}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
            $(this).parent(".menu-contents").animate(
                {'padding-bottom': paddingVal / 4}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
            $(this).parent(".menu-contents").animate(
                {'opacity': 0.5}, { queue: false, duration: OPACITY_FADEIN_SPEED / 3 });
        });
        $(this).parent(".menu-contents").animate(
            {'padding-top': paddingVal / 2}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
        $(this).parent(".menu-contents").animate(
            {'padding-bottom': paddingVal / 2}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
        $(this).parent(".menu-contents").animate(
            {'opacity': 1}, { queue: false, duration: OPACITY_FADEIN_SPEED / 3 });
    }
});

$(".menu-img-container").click(function() {
    // clicking on an image 
    $("#menu-images").animate({'opacity': '0'}, OPACITY_FADEIN_SPEED / 2, function() {
        $(".menu-img-container").css("opacity", "0");
        $("#menu-images").css("display", "none");
    });
    
    var hash = $(this).attr("id"); // the destination
    var realhash = window.location.hash.toLowerCase(); // the current location

    if (isMobile || isTablet){
        // close the menu on mobile
        closeSideMenu();
        showPageInfo(hash); // show the new subpage
        window.location.hash = (hash.substring(1)).toUpperCase();
    }
    else if (realhash != hash) {
        // close the open subpage (cannot be mobile)
        if (realhash != "#menu") {
            closePageInfo(realhash);
        } 
        enableScroll();
        setTimeout(function(){ // setting timeout for fade
            showPageInfo(hash); // show the new subpage
            window.location.hash = (hash.substring(1)).toUpperCase();
        }, 500);
    }
    if (!isMobile && !isTablet){
        // Here's the issue with the menu items 
        var tempthis = $("#" + $.escapeSelector(hash) + ".page-direct");
        // if we're on desktop, shrink down the other menu items so they're less obstructive
        $(".page-direct").not(tempthis).each(function(){
            $(this).parent(".menu-contents").animate(
                {'padding-top': paddingVal / 4}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
            $(this).parent(".menu-contents").animate(
                {'padding-bottom': paddingVal / 4}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
            $(this).parent(".menu-contents").animate(
                {'opacity': 0.5}, { queue: false, duration: OPACITY_FADEIN_SPEED / 3 });
        });
        $(tempthis).parent(".menu-contents").animate(
            {'padding-top': paddingVal / 2}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
        $(tempthis).parent(".menu-contents").animate(
            {'padding-bottom': paddingVal / 2}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
        $(tempthis).parent(".menu-contents").animate(
            {'opacity': 1}, { queue: false, duration: OPACITY_FADEIN_SPEED / 3 });
    }
});

$("#back-button").click(function() {
    disableScroll();
    // close the subpage and open the menu, on mobile
    var hash = window.location.hash;
    var prevId = hash.toLowerCase();
    closePageInfo(prevId);
    openFromSide();
});

/*******************************************************
*********   set up page with a url and a hash   ********
*******************************************************/

function setUpPage(lastHash) {

    // last Location in #menu, #baroque...
    if (lastHash != null) {
        lastHash = "#" + lastHash.toLowerCase(); 
    }
    // list of anchors #renaissance #baroque...
    var anchors = $('#menu a').map(function () { 
       return this.id; 
   }).get();
    // current location in #menu, #renaissance...
    var targetHash = window.location.hash.toLowerCase();

    if (targetHash == "" || targetHash == "#") {
        // return to the title page from menu
        
        if (lastHash != null){
            // close the bar and fade in the title
            $("#menu-images").animate({'opacity': '0'}, OPACITY_FADEIN_SPEED / 2, function() {
                $(".menu-img-container").css("opacity", "0");
                $("#menu-images").css("display", "none");
            });
            $("#bar").animate({'opacity': '0'}, function() {
                $("#title").fadeIn(1000, "linear");
            });
        } else {
            // show the normal title (nothing)
        }
    }
    else if (targetHash == "#menu") {
        // returning from a subpage to the menu
        if (isMobile || isTablet) {
            if (lastHash != null) {
                closePageInfo(lastHash);
                openFromSide();
            } else {
                showSideMenu();
            }
        } else {
            if (lastHash != null) {
                closePageInfo(lastHash);
                $("#menu-images").css("display", "inline");
                $("#menu-images").css("opacity", "1");
                var delay = 0;
                $(".menu-img-container").each(function(){
                    $(this).delay(delay).animate({opacity:0.3}, OPACITY_FADEIN_SPEED / 1.5);
                    delay += 150;
                });
                // spread the menu back out 
                $(".page-direct").each(function(){
                    $(this).parent(".menu-contents").animate(
                        {'padding-top': paddingVal / 2}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
                    $(this).parent(".menu-contents").animate(
                        {'padding-bottom': paddingVal / 2}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
                    $(this).parent(".menu-contents").animate(
                        {'opacity': 1}, { queue: false, duration: OPACITY_FADEIN_SPEED / 3 });
                });
            } else {
                showSideMenu();
            }
            
        }
    }
    else if (anchors.includes(targetHash)) {

        // opening a subpage 
        if (isMobile || isTablet) {
            if (lastHash != null) {
                closeSideMenu();
            } else {
                $("#bar").css("margin-top", "0vh");
                $("#bar").css("margin-left", "-50vw");
                $("#bar").css("opacity", "0");
                $("#bar").css("visibility", "visible");
                $("#back-button").css("visibility", "visible");
                $("#back-button").css("z-index", "5");
                $("#back-button").animate({'opacity': '1'}, { queue: false, duration: OPACITY_FADEIN_SPEED });
            }
            showPageInfo(targetHash);
        } else {
            if (lastHash != null){
                closePageInfo(lastHash);
                setTimeout(function(){ 
                    showPageInfo(targetHash); 
                }, 1000);
            } else {
                // initialize bar 
                $("#title").css("display", "none");
                $("#bar").css("visibility", "visible");
                $("#bar").css("margin-top", "0vh");
                $("#bar").css("opacity", "1");

                showPageInfo(targetHash);
            }
            // set the menu items to correct spacing and opacity
            $(".page-direct").each(function(){
                $(this).parent(".menu-contents").animate(
                    {'padding-top': paddingVal / 4}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
                $(this).parent(".menu-contents").animate(
                    {'padding-bottom': paddingVal / 4}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
                $(this).parent(".menu-contents").animate(
                    {'opacity': 0.5}, { queue: false, duration: OPACITY_FADEIN_SPEED / 3 });
            });
            $('[id="' + targetHash + '"]').parent(".menu-contents").animate(
                {'padding-top': paddingVal / 2}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
            $('[id="' + targetHash + '"]').parent(".menu-contents").animate(
                {'padding-bottom': paddingVal / 2}, { queue: false, duration: MARGIN_MOVEMENT_SPEED / 3 });
            $('[id="' + targetHash + '"]').parent(".menu-contents").animate(
                {'opacity': 1}, { queue: false, duration: OPACITY_FADEIN_SPEED / 3 });
        }
    }
}

// set up the page put in the url 
$(document).ready(function() { 
    setUpPage(null);
});

/*******************************************************
*********  Smooth scroll when clicking a link   ********
*******************************************************/
// https://css-tricks.com/snippets/jquery/smooth-scrolling/

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
      ) {
      // Figure out element to scroll to
  var target = $(this.hash);
  var target2 = this.hash;
  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
      }, 1500, function() {

          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
        } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
        }; 
          // set the outline color and highlight text 
          target2 = target2 + ":focus"
          $(target2).css("outline-color", "#d14747");

          target.effect("highlight", { color: "#d14747" }, 3000);
      });
    }
}
});

/*******************************************************
*******  Restrict mobile rotation to landscape   *******
*******************************************************/
// https://stackoverflow.com/a/3501589

$(window).bind('orientationchange resize', function(event){
  if (event.orientation) {
    if (event.orientation == 'landscape') {
      if (window.rotation == 90) {
        rotate(this, -90);
    } else {
        rotate(this, 90);
    }
}
}
});

function rotate(el, degs) {
  iedegs = degs/90;
  if (iedegs < 0) iedegs += 4;
  transform = 'rotate('+degs+'deg)';
  iefilter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+iedegs+')';
  styles = {
    transform: transform,
    '-webkit-transform': transform,
    '-moz-transform': transform,
    '-o-transform': transform,
    filter: iefilter,
    '-ms-filter': iefilter
};
$(el).css(styles);
}

/*******************************************************
*******  Open Information Box on button click   *******
*******************************************************/

// prevent links with '#' from changing the url
addEventListener('click', function (ev) {
    if (ev.target.classList.contains('safe-link')) {
        ev.preventDefault();
    }   
});

$("#info").click(function() {

    $("#lightbox").css("display", "block");
    $("#fade").css("display", "block");
    $("#lightbox").animate({'opacity': '1'}, { queue: false, duration: OPACITY_FADEIN_SPEED / 2});
    $("#fade").animate({'opacity': '0.95'}, { queue: false, duration: OPACITY_FADEIN_SPEED / 2 });
    disableScroll();
});

$("#close").click(function() {
    
    $("#lightbox").animate({'opacity': '0'}, { queue: false, duration: OPACITY_FADEIN_SPEED / 2});
    $("#fade").animate({'opacity': '0'}, { queue: false, duration: OPACITY_FADEIN_SPEED / 2});

    setTimeout(function () {
        $("#lightbox").css("display", "none");
        $("#fade").css("display", "none");
    }, OPACITY_FADEIN_SPEED / 2);

    // enable scrolling again on all pages but the main and menu
    if (window.location.hash != "" && window.location.hash != "#MENU") {
        enableScroll();
    }
});


