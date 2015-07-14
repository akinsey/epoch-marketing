// script from: https://jsfiddle.net/mekwall/up4nu/

$(document).ready(function() {
  // Cache selectors
  var lastId,
      lastParentMenuItem,
      topMenu = $('#side-menu'),
      topMenuHeight = 30,
      // All list items
      menuItems = topMenu.find('a'),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr('href'));
        if (item.length) { return item; }
      });

  if ($(window).scrollTop() < 200) {
    topMenu.children().first().addClass('active-parent');
  }

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e){
    var href = $(this).attr('href'),
        offsetTop = href === '#' ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({ scrollTop: offsetTop }, 150);
    e.preventDefault();
  });

  $('.back-to-top').click(function(e){
    $('html, body').stop().animate({ scrollTop: 0 }, 150);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
     // Get container scroll position
     var fromTop = $(this).scrollTop() + topMenuHeight;

     // Get id of current scroll item
     var cur = scrollItems.map(function(){
       if ($(this).offset().top < fromTop) { return this; }
     });

     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : '';
     var parentMenuItem = menuItems.parent().end().filter('[href=#' + id +']').parent().parent().parent();
     lastParentMenuItem = !lastParentMenuItem ? parentMenuItem : lastParentMenuItem;
     if (lastId !== id) {
         lastId = id;
         // Set/remove active class

         if (lastParentMenuItem !== parentMenuItem) {
          if (lastParentMenuItem && $(window).scrollTop() >= 200) {
            lastParentMenuItem.removeClass('active-parent');
          }
          lastParentMenuItem = parentMenuItem;
          lastParentMenuItem.addClass('active-parent');
         }
         menuItems
           .parent().removeClass('active')
           .end().filter('[href=#' + id +']').parent().addClass('active');
     }
  });

});
