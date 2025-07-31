function yHandler() {
  var wrap = document.getElementById('wrap');
  var contentHeight = wrap.offsetHeight;
  var yOffset = window.pageYOffset;

  console.log(yOffset);
  var y = yOffset + window.innerHeight;
  if (y >= contentHeight) {
    // Ajax call to get more dynamic data goes here
    wrap.innerHTML += '<div><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1><h1>CloudxTech</h1></div>';
  }
}
window.onscroll = yHandler;