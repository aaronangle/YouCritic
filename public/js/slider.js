function FixMargin(left) {
  $(this).css("left", left);
}

$(document).ready(function () {

$('#slide-right').click(function () {
  let left = parseInt($("#slide-row-1").css('left'), 10);
  let right = ($(window).width() - ($("#carousel-row-container").offset().left + $("#carousel-row-container").outerWidth()));
  let sliderRight = ($(window).width() - ($("#slide-row-1").offset().left + $("#slide-row-1").width()));
  if(sliderRight > right){left -= left + (sliderRight - right)}
  console.log(right, sliderRight)

  $("#slide-row-1").animate({ left: left - 250 }, 400, FixMargin(left - 250));
});

$('#slide-left').click(function () {
  let left = parseInt($("#slide-row-1").css('left'), 10);
  if(left + 250 >= 0){$("#slide-row-1").animate({ left: 0 }, 400, FixMargin(0)); return;};
  $("#slide-row-1").animate({ left: left + 250 }, 400, FixMargin(left + 250));
});

});