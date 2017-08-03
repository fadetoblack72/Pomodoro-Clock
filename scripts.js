var workTime = 25;
var breakTime = 5;
var work = true;
var counter;
var count;
function reset(){
  $("#start").show();
  $("#end").hide();
  clearInterval(counter);
  if(work){
    $("#time").text(workTime);
  } else {
    $("time").text(breakTime);
  }
  $('button').prop('disabled', false);
};
$(document).ready(function(){
  
  $("#minusBreak").click(function(){
    event.preventDefault();
    if (breakTime > 1){
      breakTime -= 1;
    $("#breaklength").text(String(breakTime));
      if (!work) {
        $("#time").text(String(breakTime));
      }
    }
  });
  $("#plusBreak").click(function(){
    event.preventDefault();
    breakTime += 1;
    $("#breaklength").text(String(breakTime));
    if (!work) {
        $("#time").text(String(breakTime));
      }
  });
  
  $("#minusWork").click(function(){
    event.preventDefault();
    if (workTime > 1){
      workTime -= 1;
      $("#session").text(String(workTime));
    }
    if (work){
      $("#time").text(String(workTime));
    }
  });
  $("#plusWork").click(function(){
    event.preventDefault();
    workTime += 1;
    $("#session").text(String(workTime));
    if (work){
      $("#time").text(String(workTime));
    }
  });
  $("#start").click(function(){
    $("#start").hide();
    $("#end").show();
    if(work){
      count = workTime;
      $("#minusWork").prop('disabled', true);
      $("#plusWork").prop('disabled', true);
      $("#plusBreak").prop('disabled', false);
      $("minusBreak").prop('disabled', false);
    } else {
      count = breakTime;
      $("#minusWork").prop('disabled', false);
      $("#plusWork").prop('disabled', false);
      $("#plusBreak").prop('disabled', true);
      $("minusBreak").prop('disabled', true);
    }
    count *= 60;
    function timer(){
      count -= 1;
      if (count <= 0) {
        clearInterval(counter);
        if(work){
          work = false;
          $(".clock").css('background-color', 'darkred');
          $("#status").text("Break!");
          count = breakTime * 60;
          $("#minusWork").prop('disabled', false);
      $("#plusWork").prop('disabled', false);
      $("#plusBreak").prop('disabled', true);
      $("minusBreak").prop('disabled', true);
          counter = setInterval(timer, 1000);
        } else {
          work = true;
          $(".clock").css('background-color', 'darkgreen');
          $("#status").text("Session");
          count = workTime * 60;
          $("#minusWork").prop('disabled', true);
      $("#plusWork").prop('disabled', true);
      $("#plusBreak").prop('disabled', false);
      $("minusBreak").prop('disabled', false);
          counter = setInterval(timer, 1000);
        }
      }
      var sec = count % 60;
      var min = (count - sec) / 60;
      if (sec < 10){
        sec = "0"+ String(sec);
      } else {
        sec = String(sec);
      }
      console.log(min+":"+sec);
      $("#time").text(min+":"+sec);
    };
    counter = setInterval(timer, 1000);
  });
  $("#end").click(function(){
    reset();
  });
});