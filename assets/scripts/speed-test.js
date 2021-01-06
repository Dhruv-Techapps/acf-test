let speedTestCount = 0
let speedTestTarget = $("#speed-test span");
$("#speed-test").on('click',() => {
  speedTestCount++;
  speedTestTarget.text(speedTestCount)
})