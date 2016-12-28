(function($) {
  $.fn.make = function(options) {
    var settings = $.extend({
      name: "no",
      duration: "1s"
    }, options);
    var $me = $(this);
    var todo = {};
    var no_anim = {};
    $.each(settings, function(i, k) {
      no_anim["animation-" + i] = "";
      todo["animation-" + i] = k;
    });
    $me.css(no_anim);
    setTimeout(function() {
      $me.css(todo);
    }, 10);

  }
  $.fn.destroy = function() {
    $(this).css({
      "animation-name": "x"
    });
  }
  var elem1 = $("[data-click-animation]");
  elem1.click(function() {
    var ap = $(this).attr("data-click-animation").split(",");
    var anim = {};
    $.each(ap, function(i, k) {
      k = $.trim(k);
      var cp = $.trim(k.split(":")[0]);
      var cv = $.trim(k.split(":")[1]);
      anim[cp] = cv;
    });
    //$(this).destroy();
    $(this).make(anim);
  });
  var elem2 = $("[data-mouseup-animation]");
  elem2.mouseover(function() {
    var ap = $(this).attr("data-mouseup-animation").split(",");
    var anim = {};
    $.each(ap, function(i, k) {
      k = $.trim(k);
      var cp = $.trim(k.split(":")[0]);
      var cv = $.trim(k.split(":")[1]);
      anim[cp] = cv;
    });
    $(this).make(anim);
  });
  var elem3 = $("[data-mouseout-animation]");
  elem3.mouseout(function() {
    var ap = $(this).attr("data-mouseout-animation").split(",");
    var anim = {};
    $.each(ap, function(i, k) {
      k = $.trim(k);
      var cp = $.trim(k.split(":")[0]);
      var cv = $.trim(k.split(":")[1]);
      anim[cp] = cv;
    });
    $(this).make(anim);
  });
}(jQuery));
$(function() {
  // $("#siteTitle").make({
  //   name: "bounceZoomIn",
  //   duration: "5s"
  // });
  // $("#bs-example-navbar-collapse-1").make({
  //   name: "bounceZoomIn",
  //   duration: "1s"
  // });
});
