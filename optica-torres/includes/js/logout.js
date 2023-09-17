function idleLogout() {
  var t;
  window.onload = resetTimer;
  window.onmousemove = resetTimer;
  window.onmousedown = resetTimer;  // catches touchscreen presses as well
  window.ontouchstart = resetTimer; // catches touchscreen swipes as well
  window.onclick = resetTimer;      // catches touchpad clicks as well
  window.onkeypress = resetTimer;
  window.addEventListener('scroll', resetTimer, true); // improved; see comments

  function yourFunction() {
    // your function for too long inactivity goes here
    window.location.href = 'logout.php';
  }

  function resetTimer() {
    clearTimeout(t);
    t = setTimeout(yourFunction, 100000);  // time is in milliseconds
  }
}
$(function() {
  idleLogout();
});
