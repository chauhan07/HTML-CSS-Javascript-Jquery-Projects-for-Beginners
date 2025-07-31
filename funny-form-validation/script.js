$(document).ready(function() {
  var uN = $("#username input");
  var pW = $("#password input");
  $("button").mouseenter(function() {
    if (uN.val() == '' || pW.val() == '') {
      $(".buttonParent").toggleClass("right_end")
    }
  })
})