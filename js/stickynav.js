$(document).ready(function() {
  var stickyNav = function() {
    var pos = $(window).scrollTop(), breakpoint = 125, newNavPos;
    if (pos >= breakpoint) { newNavPos = 25; }
    else { newNavPos = breakpoint -1; }
    $('.docs-nav').css('top', newNavPos);
  };
  $(window).on('scroll', stickyNav);
  $(window).on('resize', stickyNav);
});
