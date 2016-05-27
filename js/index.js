$(document).ready(function() {
  
  // Cache the most common selectors
  var $clockTimer = $("#clockTimer");
  var $sessionLength = $("#sessionLength");
  var $breakLength = $("#breakLength");
  var $button = $("button");
  
  // Define variables
  var sessionTime = 1500;
  var breakTime = 300;
  var remainTime = sessionTime;
  var ticking = false;
  var onBreak = false;
  var storeInterval; // stores the setInterval
  
  // Clock display in MM:SS format
  var updateTimer = function() {
    $clockTimer.text(("0" + Math.floor(remainTime / 60)).slice(-2) + ":" + ("0" + remainTime % 60).slice(-2));
  };

  // Put stuff in the textboxes and display the timer when the page loads
  $sessionLength.text(sessionTime / 60);
  $breakLength.text(breakTime / 60);
  updateTimer();

  // Counts down. Function is activated every 1000ms by setInterval further down.
  function countDown() {
    if (remainTime > 0) {
      remainTime = remainTime - 1;
    } else if (remainTime === 0 && onBreak == false) {
      remainTime = breakTime;
      onBreak = true;
      $("#breakIndicator").text("Break");
    } else if (remainTime === 0 && onBreak == true) {
      remainTime = sessionTime;
      onBreak = false;
      $("#breakIndicator").text("Work");
    }
    updateTimer();
  }

  // Session length timer control - add
  $("#plusSession").on("click", function() {
    if ((sessionTime / 60) < 60)
      sessionTime = sessionTime + 60;
    $sessionLength.text(sessionTime / 60);
    if (onBreak == false) {
      remainTime = sessionTime;
      updateTimer();
    }
  });

  // Session length timer control - subtract
  $("#minusSession").on("click", function() {
    if ((sessionTime / 60) > 1)
      sessionTime = sessionTime - 60;
    $("#sessionLength").text(sessionTime / 60);
    if (onBreak == false) {
      remainTime = sessionTime;
      updateTimer();
    }
  });

  // Break length timer control - add
  $("#plusBreak").on("click", function() {
    if ((breakTime / 60) < 60)
      breakTime = breakTime + 60;
    $("#breakLength").text(breakTime / 60);
    if (onBreak) {
      remainTime = breakTime;
      updateTimer();
    }
  });

  // Break length timer control - subtract
  $("#minusBreak").on("click", function() {
    if ((breakTime / 60) > 1)
      breakTime = breakTime - 60;
    $("#breakLength").text(breakTime / 60);
    if (onBreak) {
      remainTime = breakTime;
      updateTimer();
    }
  });

  // Do stuff when you click the clock area - enable / disable
  $(".frame").on("click", function() {
    if (ticking == false) {
      storeInterval = setInterval(countDown, 1000); // start counting down when clicked
      ticking = true;
      $button.prop('disabled', true).css("background-color", "rgb(110,105,120)"); // disable buttons when running
    } else if (ticking == true) {
      clearInterval(storeInterval); // stop counting down when clicked again
      ticking = false;
      $button.prop('disabled', false).css("background-color", "rgb(225,215,255)"); // enable buttons when not running
    }
  });

  // Reset everything when you click Reset
  $("#reset").on("click",function(){
    sessionTime = 1500;
    breakTime = 300;
    remainTime = sessionTime;
    ticking = false;
    onBreak = false;
    $sessionLength.text(sessionTime / 60);
    $breakLength.text(breakTime / 60);
    updateTimer();
  });
});