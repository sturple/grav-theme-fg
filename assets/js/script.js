/* Script options
 
.script-parallax -adds parallax to div, need data-offset, and data-ratio
.script-height-match - matches heights of all containers to parent.




*/

$(function(){
    var sizePostfix = 'lg';
    if (window.innerWidth <= 1200){sizePostfix = 'md';}
    if (window.innerWidth <= 768){sizePostfix = 'sm';}
    
    /*** Updates all background images according to screen size; */
    $('*[data-background-'+sizePostfix+']').each(function(){ $(this).css({'background-image': 'url('+$(this).data('background-'+sizePostfix) +')'});  })
    
    /*** Updates all  images according to screen size;  */
    $('img[data-image-'+sizePostfix+']').each(function(){ $(this).attr('src',$(this).data('image-'+sizePostfix)); })
    
    
    /* script-parallax
    *  Adds parallaxing background 
    *  data-offset="0" data-ratio="2.5"
    */
	$('.script-parallax').each(function(){
        var offset = parseInt($(this).data('offset')); 
		$(this).css({            
			'background-transparent' : 'transparent',
			'background-repeat': 'no-repeat',			
			'background-position' : '50% '+ offset	+'px'										
		});		
	})
    
    /* script-match-height
     * Matches heights of all containers in parent.
     */    
    $('.script-match-height').each(function(){
        var $p = $(this).parent();       
        $p.children().each(function(){  $(this).css({'min-height': $p.outerHeight()+'px'});        })
    })
    
    
    /*
     * sets up hero slide full height taking into account navbar and module next button
     */
    $('.script-hero, .script-hero .feature-image, .script-hero .player ').css({height: (window.innerHeight- $('.navbar').outerHeight() - $('.modular-next-nav').outerHeight())+ 'px' });
    
    smoothScroll.init({
        selector: '[data-scroll]', 
        selectorHeader: '[data-scroll-header]', 
        speed: 1500, 
        easing: 'easeInOutCubic', 
        updateURL: true, 
        offset: 0, 
        callback: function ( toggle, anchor ) {} 
    });    
    $(window).scroll(function(){
        didScroll = true;
        var pageBottom = (parseInt($(window).scrollTop()) + parseInt($(window).height()))
        $('.script-parallax').each(function(){
            if (pageBottom > $(this).offset().top) {
                var offset = $(this).data('offset');
                offset = (offset != undefined) ? offset : 0;
                var ratio = $(this).data('ratio') ;
                ratio = (ratio != undefined) ? ratio : 3;			
                var parallaxDiff = pageBottom - parseInt($(this).offset().top);
                var parallaxAdj = -(parallaxDiff / ratio)  + offset;
                $(this).css('background-position','50%' + parallaxAdj +'px' );
                
            }		
        });
    });
    
    
})