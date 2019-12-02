let animatingFlag = false;

function FixMargin(left) {
  $(this).css("left", left);
  animatingFlag = false
}

$(document).ready(function () {
  
  $('#slide-right').click(function () {
    if(animatingFlag){return;}
    animatingFlag = true;
    let left = parseInt($("#slide-row-1").css('left'), 10);
    // let sliderRight = ($(window).width() - ($("#slide-row-1").offset().left + $("#slide-row-1").width()));
    const $sliderContainer = document.getElementById("carousel-row-container-1").getBoundingClientRect();
    const $slider = document.getElementById("slide-row-1").getBoundingClientRect();
    const sliderWidth = document.getElementById('slide-row-1').scrollWidth;
    if (($slider.left + sliderWidth) - 250 <= $sliderContainer.left + $sliderContainer.width) {
      const farRight = ($slider.left + sliderWidth) -  ($sliderContainer.left + $sliderContainer.width);
      $("#slide-row-1").animate({ left: $sliderContainer.width - sliderWidth}, 400, function(){
        FixMargin($sliderContainer.width - sliderWidth);
      });
      return;
    }
    $("#slide-row-1").animate({ left: left - 250 }, 400, function(){
      FixMargin(left - 250);
    });
  });

  $('#slide-left').click(function () {
    if(animatingFlag){return;}
    animatingFlag = true;
    let left = parseInt($("#slide-row-1").css('left'), 10);
    if (left + 250 >= 0) { 
      $("#slide-row-1").animate({ left: 0 }, 400, function(){
        FixMargin(0);
      });
      return; 
    };

    $("#slide-row-1").animate({ left: left + 250 }, 400, function(){
      FixMargin(left + 250);
    });
  });

});