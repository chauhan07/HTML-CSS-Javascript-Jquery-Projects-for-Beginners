jQuery(function($) {
  // write your code here using dollor symbol ($)

  $(".ap_header .headerBarIcon").click(function() {
    $(".mainHeaderArea").addClass("show");
    $(".mainHeaderArea .row .left").removeClass("scaleX");

    $("body").css("overflow", "hidden");
  });

  $(".closeHeader .closeIcon").click(function() {
    $(".mainHeaderArea").removeClass("show");
    $(".mainHeaderArea .row .left").addClass("scaleX");

    $("body").css("overflow", "auto");
  });

});