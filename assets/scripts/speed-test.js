let speedTestCount = 0
let speedTestTarget = document.querySelector("#speed-test span");
document.getElementById("speed-test").addEventListener('click',() => {
  speedTestCount++;
  speedTestTarget.innerHTML = speedTestCount
})