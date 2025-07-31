$("input[type='file']").change(function(){
  var filename = $('input[type=file]').val().split('\\').pop();
  //console.log(filename)

  if(filename == ''){
    $(".fileName").html("Drag & Drop Files Here")
  } else{
    $(".fileName").html(filename)
  }
});
