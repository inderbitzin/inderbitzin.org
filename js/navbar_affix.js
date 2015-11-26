$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $('#top-nav').addClass('affix');
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $('#top-nav').removeClass('affix');
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});
