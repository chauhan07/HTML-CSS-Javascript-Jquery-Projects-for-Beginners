$("#announceTab li").click(function(){
    $(this).get(0).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    $(".teamTabs li a").removeClass("active");
    $(this).find('a').addClass("active");
})