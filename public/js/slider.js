let animatingFlag = false;

function FixMargin(left) {
  $(this).css("left", left);
  animatingFlag = false
}

$(document).ready(function () {

  $('.slide-right').click(function (evt) {
    const rowIndex = $(this).siblings()[1].id;
    if (evt.target.matches(".right-arrow")) {
      if (animatingFlag) { return; }
      animatingFlag = true;

      let left = parseInt($("#slide-row-" + rowIndex).css('left'), 10);
      const $sliderContainer = document.getElementById(rowIndex).getBoundingClientRect();
      const $slider = document.getElementById("slide-row-" + rowIndex).getBoundingClientRect();
      const sliderWidth = document.getElementById("slide-row-" + rowIndex).scrollWidth;
      if (($slider.left + sliderWidth) - 600 <= ($sliderContainer.left + $sliderContainer.width)) {
        $("#slide-row-" + rowIndex).animate({ left: $sliderContainer.width - sliderWidth }, 400, function () {
          FixMargin($sliderContainer.width - sliderWidth);
        });
        return;
      }

      $("#slide-row-" + rowIndex).animate({ left: left - 600 }, 400, function () {
        FixMargin(left - 600);
      });
    }
  });

  $('.slide-left').click(function (evt) {
    const rowIndex = $(this).siblings()[0].id;

    if (evt.target.matches(".left-arrow")) {
      if (animatingFlag) { return; }
      animatingFlag = true;
      let left = parseInt($("#slide-row-" + rowIndex).css('left'), 10);
      if (left + 600 >= 0) {
        $("#slide-row-" + rowIndex).animate({ left: 0 }, 400, function () {
          FixMargin(0);
        });
        return;
      };

      $("#slide-row-" + rowIndex).animate({ left: left + 600 }, 400, function () {
        FixMargin(left + 600);
      });
    }
  });

});


(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    factory((root.dragscroll = {}));
  }
}(this, function (exports) {
  var _window = window;
  var _document = document;
  var mousemove = 'mousemove';
  var mouseup = 'mouseup';
  var mousedown = 'mousedown';
  var EventListener = 'EventListener';
  var addEventListener = 'add' + EventListener;
  var removeEventListener = 'remove' + EventListener;
  var newScrollX, newScrollY;

  var dragged = [];
  var reset = function (i, el) {
    for (i = 0; i < dragged.length;) {
      el = dragged[i++];
      el = el.container || el;
      el[removeEventListener](mousedown, el.md, 0);
      _window[removeEventListener](mouseup, el.mu, 0);
      _window[removeEventListener](mousemove, el.mm, 0);
    }

    // cloning into array since HTMLCollection is updated dynamically
    dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
    for (i = 0; i < dragged.length;) {
      (function (el, lastClientX, lastClientY, pushed, scroller, cont) {
        (cont = el.container || el)[addEventListener](
          mousedown,
          cont.md = function (e) {
            if (!el.hasAttribute('nochilddrag') ||
              _document.elementFromPoint(
                e.pageX, e.pageY
              ) == cont
            ) {
              pushed = 1;
              lastClientX = e.clientX;
              lastClientY = e.clientY;

              e.preventDefault();
            }
          }, 0
        );

        _window[addEventListener](
          mouseup, cont.mu = function () { pushed = 0; }, 0
        );

        _window[addEventListener](
          mousemove,
          cont.mm = function (e) {
            if (pushed) {
              (scroller = el.scroller || el).scrollLeft -=
                newScrollX = (- lastClientX + (lastClientX = e.clientX));
              scroller.scrollTop -=
                newScrollY = (- lastClientY + (lastClientY = e.clientY));
              if (el == _document.body) {
                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                scroller.scrollTop -= newScrollY;
              }
            }
          }, 0
        );
      })(dragged[i++]);
    }
  }


  if (_document.readyState == 'complete') {
    reset();
  } else {
    _window[addEventListener]('load', reset, 0);
  }

  exports.reset = reset;
}));