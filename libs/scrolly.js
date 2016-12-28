(function($) {
  $.fn.stem = function(callback) {
    var $this = $(this),
      self = this;
    $this.scroll(function() {
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback, 100, self));
    });
  };
  $.fn.animation = function(options) {
    var settings = $.extend({
      hidden: ["1X1"],
      do_animation: true
    }, options);
    $.each(settings.hidden, function(i, k) {
      var w = k.toLowerCase().split("x")[0];
      var h = k.toLowerCase().split("x")[1];
      if ($(window).width() == w && $(window).height() == h) {
        settings.do_animation = false;
        return false;
      }
    });
    if (!settings.do_animation)
      return;
    lastScrollTop = $(window).scrollTop();
    $(window).stem(function() {
      var up = $("[data-in-animation]");
      var down = $("[data-out-animation]");
      var st = $(this).scrollTop();
      if (st >= lastScrollTop) {
        $.each(up, function() {
          $th = $(this);
          var ap = $th.attr('data-in-animation').split(",");
          var anim = {};
          var no_anim = {};
          $.each(ap, function(i, k) {
            k = $.trim(k);
            var cp = "animation-" + $.trim(k.split(":")[0]);
            var cv = $.trim(k.split(":")[1]);
            no_anim[cp] = "";
            anim[cp] = cv;
          });
          if ($.inArray('animation-duration', anim) == -1) {
            anim['animation-duration'] = "1s";
          }
          if (check_if_in_view($th, no_anim)) {
            $th.css(no_anim);
            $th.css(anim);
          }
        });
      } else {
        $.each(down, function() {
          $th = $(this);
          var ap = $th.attr('data-out-animation').split(",");
          var anim = {};
          var no_anim = {};
          $.each(ap, function(i, k) {
            k = $.trim(k);
            var cp = "animation-" + $.trim(k.split(":")[0]);
            var cv = $.trim(k.split(":")[1]);
            no_anim[cp] = "";
            anim[cp] = cv;
          });
          if ($.inArray('animation-duration', anim) == -1) {
            anim['animation-duration'] = "1s";
          }
          if (check_if_in_view($th, no_anim)) {
            $th.css(no_anim);
            $th.css(anim);
          }
        });
      }
      lastScrollTop = st;
    });
    $(window).trigger("scroll");
  }
}(jQuery));

function check_if_in_view($element, no_anim) {
  var $window = $(window);
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
  var element_height = $element.outerHeight();
  var element_top_position = $element.offset().top;
  var element_bottom_position = (element_top_position + element_height);
  if (element_bottom_position < window_top_position) {
    if ($th.attr('data-out-animation') == "name:no-animation") {
      $th.css("visibility", "visible");
    } else {
      $th.css("visibility", "hidden");
    }
  }
  if (element_top_position > window_bottom_position) {
    if ($th.attr('data-in-animation') == "name:no-animation") {
      $th.css("visibility", "visible");
    } else {
      $th.css("visibility", "hidden");
    }
  }
  if ((element_bottom_position >= window_top_position) && (element_top_position <=
      window_bottom_position)) {
    if ($element.hasClass("in-view")) {
      return false;
    }
    $element.css(no_anim);
    $element.addClass('in-view');
    $element.css("visibility", "visible");
    return true;
  } else {
    $element.css(no_anim);
    $element.removeClass('in-view');
    return false;
  }
}
$(function() {
  var up = $("[data-in-animation]");
  var down = $("[data-out-animation]");
  $.each(down, function() {
    $th = $(this);
    if (!$th.attr("data-in-animation")) {
      $th.attr("data-in-animation", "name:no-animation");
    }
  });
  $.each(up, function() {
    $th = $(this);
    if (!$th.attr("data-out-animation")) {
      $th.attr("data-out-animation", "name:no-animation");
    }
  });
  $(document).animation({
    "hidden": ["320X490"]
  });
});
