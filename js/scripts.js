jQuery(function ($) {

	$(document).ready(function() {
		
		"use strict";
		
		PageLoad(); 
		ScrollEffects();
		FirstLoad(); 
		PageLoadActions(); 
		FitThumbScreenGSAP();
		ShowcaseStaggerSlider();				
		FitThumbScreenWEBGL();				
		Shortcodes();
		Sliders();	
		Core();
		JustifiedGrid();
		Lightbox();
		ContactForm();	
		PlayVideo();
		ContactMap();
		CustomFunction();
	});
	
	
/*--------------------------------------------------
Function CustomFunction
---------------------------------------------------*/
	function CustomFunction() {
		
		//Add here your custom js code
		
	}// End CustomFunction

/*--------------------------------------------------
Function CleanupBeforeAjax
---------------------------------------------------*/
	function CleanupBeforeAjax(){
		
		if(typeof window.BackgroundScrollTriggerArr !== 'undefined'){			
			window.BackgroundScrollTriggerArr.forEach( stBackground => stBackground.kill() );
			window.BackgroundScrollTriggerArr = [];
		}
	}	

/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {
		
		gsap.set($(".menu-timeline .before-span"), {y: 120, opacity:0});
		
		// Page Navigation Events
		$(".preloader-wrap").on('mouseenter', function() {	
			var $this = $(this);			
			gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
		});
							
		$(".preloader-wrap").on('mouseleave', function() {					
			gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			$('#ball p').remove();				
		});		
		
		$('body').removeClass('hidden').removeClass('hidden-ball');
		
		gsap.to($("#header-container"), {duration: 0.5, opacity:1, delay:0.2, ease:Power2.easeOut}); 
		
		
		function initOnFirstLoad() {
		
			$('body').waitForImages({
				finished: function() {
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$('#ball p').remove();
					gsap.to($(" .trackbar, .percentage-intro, .percentage"), {duration: 0.3, force3D:true, opacity:0, y:-10, delay:0, ease:Power2.easeIn});						
					gsap.to($(".preloader-wrap"), {duration: 1, yPercent: -101, delay:0.6, ease:Power2.easeInOut});
					gsap.set($(".preloader-wrap"), {visibility:'hidden', delay:1.7, opacity:0});					
					setTimeout(function(){
						$('body').waitForImages({
							finished: function() {
								gsap.to($(".header-middle, #footer-container, .showcase-counter, .swiper-pagination-bullet-active .counter"), {duration: 1, opacity:1, delay:0, ease:Power2.easeOut}); 										
							},
							waitForAll: true
						});
						
						if( $('.hero-video-wrapper').length > 0 ){
							$('#hero-image-wrapper').find('video').each(function() {
								$(this).get(0).play();
							}); 
						}
						
						gsap.to($("#main"), {duration: 0, opacity:1, delay:0, ease:Power2.easeOut});//modified time
						if( $('#hero').hasClass("has-image")) {	
							if ($('body').hasClass('hero-below-caption')) {
								var heroTranslate = $('.hero-translate').height();
								gsap.set($("#hero-image-wrapper"), {y:heroTranslate});
								gsap.to($("#hero-caption"), {duration: 1, height:heroTranslate*0.7, delay:1.5, ease:Power2.easeInOut});								
								gsap.to($("#hero-image-wrapper"), {duration: 1, y:heroTranslate*0.7, delay:1.5, ease:Power2.easeInOut});
								gsap.to($(".hero-below-caption #hero.has-image"), {duration: 1, height:heroTranslate*0.7+heroTranslate, delay:1.5, ease:Power2.easeInOut, onComplete:function(){
									window.PinnedSectionArr.forEach( scPinnedSection => scPinnedSection.refresh() );
									window.PinnedFooterArr.forEach( scFooterSection => scFooterSection.refresh() );	
								}});
							}
							gsap.to($("#hero-bg-image"), {duration: 1, force3D:true, scale:1 , opacity:1, delay:0.2, ease:Power2.easeOut});							
							gsap.to($(".hero-title span"), {duration: 1, force3D:true, y: 0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
							gsap.to($(".hero-subtitle span"), {duration: 1, force3D:true, y:0, opacity:1, rotation:0, delay:0.8, ease:Power2.easeOut});
							gsap.to($(".hero-footer-left"), {duration: 1, force3D:true, y: 0, opacity:1, rotation:0, delay:1.8, ease:Power2.easeOut});
							gsap.to($(".hero-footer-right"), {duration: 1, force3D:true, y:0, opacity:1, rotation:0, delay:1.8, ease:Power2.easeOut});																				
							gsap.to($("#main-page-content"), {duration: 0.4, opacity:1, delay:1.15, ease:Power2.easeOut});
						} else {
							// Fading In Small Carousel elements on Finised
							var tlHerospan = gsap.timeline();
							tlHerospan.set($("#hero .hero-title span"), {y: 120, opacity:0});
							$("#hero .hero-title span").each(function(index, element) {
								tlHerospan.to(element, {duration: 0.7, y:0, opacity:1, delay:0.5, ease:Power3.easeOut}, index * 0.03)
							});
							gsap.to($(".hero-subtitle span"), {duration: 0.4, force3D:true, y: 0, opacity:1, rotation:0, delay:0.7, ease:Power2.easeOut});
							gsap.to($(".hero-footer-left"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
							gsap.to($(".hero-footer-right"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});									
							gsap.to($("#main-page-content"), {duration: 0.7, opacity:1, delay:0.7, ease:Power2.easeOut});
							gsap.to($(".error-button"), {duration: 0.4, y: 0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});				
						}	
						
						
						// Fading In Showcase Slider elements on Finised
						gsap.set($("#showcase-slider-holder"), {opacity:0});															
						gsap.to($("#showcase-slider-holder"), {duration: 0.7, opacity:1, delay:0.6, ease:Power2.easeOut});
						
						gsap.to($("#showcase-slider-holder .swiper-slide .slide-title span"), {duration: 1, force3D:true, y: 0, opacity:1, delay:0.8, ease:Power2.easeOut});
						gsap.to($("#showcase-slider-holder .swiper-slide .subtitle span"), {duration: 0.7, force3D:true, y: 0, opacity:1, delay:1.2, ease:Power2.easeOut});
						
						// Fading In Showcase Carousel elements on Finised
						gsap.set($("#showcase-carousel-holder"), {opacity:0});															
						gsap.to($("#showcase-carousel-holder"), {duration: 0.7, opacity:1, delay:0.6, ease:Power2.easeOut});
						var slideWidth = $("#showcase-carousel-holder .swiper-slide").width();
						gsap.set($("#showcase-carousel-holder .swiper-slide-active").prev(), {x:slideWidth, scale:0.8, opacity:0});
						gsap.set($("#showcase-carousel-holder .swiper-slide-active").next(), {x:-slideWidth, scale:0.8, opacity:0});								
						gsap.to($("#showcase-carousel-holder .swiper-slide-active").prev(), {duration: 2, x:0, scale:1, delay:0.2, opacity:1, ease:Power3.easeInOut});
						gsap.to($("#showcase-carousel-holder .swiper-slide-active").next(), {duration: 2, x:0, scale:1, delay:0.2, opacity:1, ease:Power3.easeInOut});								
						gsap.to($("#showcase-carousel-holder .swiper-slide .slide-title span"), {duration: 0.3, force3D:true, y: 0, opacity:1, delay:0, ease:Power2.easeOut});
						gsap.to($("#showcase-carousel-holder .swiper-slide .subtitle span"), {duration: 0.3, force3D:true, y: 0, opacity:1, delay:0, ease:Power2.easeOut});
						
						
						gsap.set($(".swiper-prev, .swiper-next, .swiper-pagination-bullet"), {opacity:0});	
						gsap.to($(".swiper-prev"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
						gsap.to($(".swiper-pagination-bullet"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
						gsap.to($(".swiper-next"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
						setTimeout( function(){	
							$('#showcase-slider-holder, #showcase-carousel-holder, .showcase-list-holder').addClass("loaded");
						} , 1500 );
						var tlSmallTitles = gsap.timeline();					
						$(".slide-small-title span").each(function(index, element) {
							tlSmallTitles.to(element, {duration: 0.5, force3D:true, y:0, opacity:1, delay:1, ease:Power2.easeOut}, index * 0.05)
						});
						
						var SlideListTitle = gsap.timeline();					
						$(".sl-title span, .split-title span").each(function(index, element) {
							SlideListTitle.to(element, {duration: 0.7, force3D:true, y:0, opacity:1, delay:0.5, ease:Power2.easeOut}, index * 0.05)
						});
						
						var SlideListSubtitle = gsap.timeline();					
						$(".sl-subtitle span, .split-subtitle span").each(function(index, element) {
							SlideListSubtitle.to(element, {duration: 0.7, force3D:true, y:0, opacity:1, delay:0.6, ease:Power2.easeOut}, index * 0.05)
						});
						
						// Fading In Showcase Stagger Slider elements on Finised
						gsap.to($("#showcase-stagger-holder .stagger-slide .stagger-cat span"), {duration: 0.5, y: 0, opacity: 1, delay:0.6, ease:Power2.easeOut});
						gsap.to($("#showcase-stagger-holder .stagger-slide .stagger-date span"), {duration: 0.5, y: 0, opacity: 1, delay:0.6, ease:Power2.easeOut});
						gsap.to($("#showcase-stagger-holder .stagger-slide .stagger-title span"), {duration: 0.7, y: 0, opacity: 1, delay:0.6, ease:Power2.easeOut});
						gsap.to($("#showcase-stagger-holder .stagger-slide .stagger-info span"), {duration: 0.5, y: 0, opacity: 1, delay:0.7, ease:Power2.easeOut});
						gsap.to($(".stagger-footer"), {duration: 0.5, opacity: 1, delay:0.8, ease:Power2.easeOut});
							
						setTimeout( function(){
							$('.slide-list').addClass('show-borders')
						} ,300 );
							
						setTimeout( function(){	
							$('body').removeClass("load-project-page").removeClass("load-project-page-carousel");
						} , 600 );
						
						setTimeout( function(){	
							$('body').removeClass("load-next-project");
							$('body').addClass("header-visible");
							$('#showcase-holder').removeClass("disabled");
						} , 1600 );
						
						setTimeout( function(){	
							$('body').removeClass("show-loader")
						} , 800 );	
						
					} , 600 );
				},
			waitForAll: true
		});
				
		}
		
		
		if (!$('body').hasClass("disable-ajaxload")) {
			
			var width = 0,
				perfData = window.performance.timing, 
				EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
				time = ((EstimatedTime/100)%500) * 10
				
			// Loadbar Animation
			$(".loadbar").animate({
				width: width + "%"
			}, time  );	
			
			// Percentage Increment Animation
			var PercentageID = $("#precent"),
					start = 0,
					end = 100,
					durataion = time + 0;
					animateValue(PercentageID, start, end, durataion);
					
			function animateValue(id, start, end, duration) {
			  
				var range = end - start,
				  current = start,
				  increment = end > start? 1 : -1,
				  stepTime = Math.abs(Math.floor(duration / range)),
				  obj = $(id);
				
				var timer = setInterval(function() {
					current += increment;
					$(obj).text(current);
				  //obj.innerHTML = current;
					if (current == end) {
						clearInterval(timer);
					}
				}, stepTime);
			}
			
			// Fading Out Loadbar on Finised
			setTimeout(function(){
				$('.loadbar').append('<span class="hold-progress-bar"></span>');
				
				gsap.to($('.hold-progress-bar'), {duration: 0.3, force3D:true,width:'100%', delay:0, ease:Power2.easeOut, onComplete:function(){ 
					initOnFirstLoad();				
				}});
		  
			}, time);
		
		} else {
			
			initOnFirstLoad();
		}
		
		
	}// End Page Load

	
	
/*--------------------------------------------------
Page Load Actions
---------------------------------------------------*/	
	
	function PageLoadActions() {
		
		
		// Default Page Navigation Load Events
		
		if (!isMobile()) {			
			$("#page-nav .page-title").on('mouseenter', function() {	
				var $this = $(this);			
				gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );				
			});								
			$("#page-nav .page-title").on('mouseleave', function() {					
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$('#ball p').remove();				
			});		
		}		
		
		if (!$("body").hasClass("disable-ajaxload")) {
			$('#page-nav .page-title').on('click', function() {					
				$("body").addClass("load-next-page");
				$("body").addClass("show-loader");
				$('header').removeClass('white-header');
				$("#app").remove();
				$(".big-title-caption").remove();	
					
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();
				
				if ($("body").hasClass("smooth-scroll")) {
					var navmove = $("#content-scroll").height() - $("#page-nav").height() - $("footer").height() 			
				} else {
					var navmove = window.innerHeight - $("#page-nav").height() - $("footer").height()	   
				}
				
				gsap.to($("#main-page-content, #hero"), {duration: 0.3, opacity:0});		
				gsap.to($("#page-nav"), {duration: 0.7, y: - navmove, delay:0, ease:Power2.easeInOut});
				gsap.to($("footer"), {duration: 0.3, opacity:0, delay:0, ease:Power2.easeInOut});
			});
		} else if ($("body").hasClass("disable-ajaxload")) {
			$('#page-nav .page-title').on('click', function() {					
				$("body").addClass("load-next-page");
				$("body").addClass("show-loader");
				$('header').removeClass('white-header');
				$("#app").remove();
				$(".big-title-caption").remove();	
					
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();
				
				gsap.to($("#main-page-content, #hero, #page-nav"), {duration: 0.3, opacity:0});
				gsap.to($("footer"), {duration: 0.3, opacity:0, delay:0, ease:Power2.easeInOut});
			});
		}
		
		
		// Project Page Navigation Load Events
		if (!isMobile()) {
			
			$("#project-nav .next-ajax-link-project").mouseenter(function(e) {	
				var $this = $(this);		
				$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
				gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$this.data('color'), backgroundColor:$this.data('color')});			
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$("#project-nav .next-hero-title").addClass('hover-title');				
			});
							
			$("#project-nav .next-ajax-link-project").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$('#ball p').remove();
				$("#project-nav .next-hero-title").removeClass('hover-title');
			});
		}
		
		if (!$("body").hasClass("disable-ajaxload")) {
			$('.next-ajax-link-project').on('click', function() {					
				$("body").addClass("load-project-thumb-with-title").addClass("show-loader");
				$('header').removeClass('white-header');
				$("#app").remove();
				$('.next-project-image-wrapper').addClass("temporary").appendTo('body');
				if ($(this).parents('#project-nav').hasClass("change-header")) {
					$("body").append('<div class="temporary-hero"><div class="outer content-max-width"><div class="inner"></div></div></div>');
				} else {
					$("body").append('<div class="temporary-hero light-content"><div class="outer content-max-width"><div class="inner"></div></div></div>');
				}
				$('.next-caption').appendTo('.temporary-hero .inner');	
					
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();
				
				gsap.to($("#main-page-content, #hero, #hero-image-wrapper"), {duration: 0.3, opacity:0});			
				gsap.to($(".next-project-image"), {duration: 0.6, scale:1, opacity: 1, ease:Power2.easeOut,onComplete: function() {
				  $('.next-project-image').addClass("visible")
				}});
				gsap.to($("footer, .all-works"), {duration: 0.3, opacity:0, ease:Power2.easeInOut});
			});
		} else if ($("body").hasClass("disable-ajaxload")) {
			$('.next-ajax-link-project').on('click', function() {					
				$("body").addClass("load-project-thumb-with-title").addClass("show-loader");							
				$('header').removeClass('white-header');
				$("#app").remove();									
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();				
				gsap.to($("#main-page-content, #hero, #hero-image-wrapper, #project-nav"), {duration: 0.3, opacity:0});			
				gsap.to($(".next-project-image"), {duration: 0.6, scale:1, opacity: 0, ease:Power2.easeOut});
				gsap.to($("footer, .all-works"), {duration: 0.3, opacity:0, ease:Power2.easeInOut});							
			});
		}
		
	}// Page Load Actions
	
	

	
/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {	
		
		gsap.set($("#show-filters"), {opacity:0, delay:0});
		
		$('body').waitForImages({
			finished: function() {
				$('body').removeClass('loading')
				setTimeout( function(){	
					$('body').removeClass('hidden').removeClass('scale-up').removeClass('scale-none');
				} , 1500 );
			},
			waitForAll: true
		});	
		
		$('body').waitForImages({
			finished: function() {
				gsap.to($("#header-container, .header-middle"), {duration: 1, force3D:true, opacity:1, ease:Power2.easeOut});				
			},
			waitForAll: true
		});
		
		if( !$('#canvas-slider').hasClass("active")) {	
			gsap.set($('#canvas-slider'), {opacity:0, scale:1.1});
			gsap.to($('#canvas-slider'), {duration: 1, force3D:true, opacity:1, scale:1, delay:0.3, ease:Power2.easeOut});
		}
		
		gsap.to($("#main"), {duration: 0.3, opacity:1, delay:0.1, ease:Power2.easeOut});
		gsap.to($("#footer-container"), {duration: 1, force3D:true, opacity:1, delay:0.4, ease:Power2.easeOut});		
		
		if( $('#hero').hasClass("has-image")) {	
			if( $('body').hasClass("load-project-thumb-with-title")) {
				if ($('body').hasClass('hero-below-caption')) {
					var heroTranslate = $('.hero-translate').height();
					gsap.set($("#hero-image-wrapper"), {y:heroTranslate});
					$('#hero-image-wrapper').waitForImages({
						finished: function() {
							gsap.to($("#hero-caption"), {duration: 1, height:heroTranslate*0.7, delay:0.5, ease:Power2.easeInOut});
							gsap.to($("#hero-image-wrapper"), {duration: 1, y:heroTranslate*0.7, delay:0.5, ease:Power2.easeInOut});
							gsap.to($(".hero-below-caption #hero.has-image"), {duration: 1, height:heroTranslate*0.7+heroTranslate, delay:0.5, ease:Power2.easeInOut, onComplete:function(){
								window.PinnedSectionArr.forEach( scPinnedSection => scPinnedSection.refresh() );
								window.PinnedFooterArr.forEach( scFooterSection => scFooterSection.refresh() );		
							}});
						},
						waitForAll: true
					});						
				}
				gsap.to($("#hero-bg-image"), {duration: 0, force3D:true, scale:1 , opacity:1, delay:0, ease:Power2.easeOut});				
				gsap.to($(".hero-title span"), {duration: 0, force3D:true, y: 0, opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-subtitle span"), {duration: 0, force3D:true, y:0, opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-footer-left"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				gsap.to($(".hero-footer-right"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});		
			} else if( $('body').hasClass("load-project-thumb-with-title-and-scale")) {
				gsap.to($("#hero-bg-image"), {duration: 0, force3D:true, scale:1.02, opacity:1, delay:0, ease:Power2.easeOut});				
				gsap.to($(".hero-title span"), {duration: 0, force3D:true, y: 0, opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-subtitle span"), {duration: 0, force3D:true, y:0, opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-footer-left"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				gsap.to($(".hero-footer-right"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});		
			} else if( $('body').hasClass("load-project-thumb")) {
				if ($('body').hasClass('hero-below-caption')) {
					var heroTranslate = $('.hero-translate').height();
					gsap.set($("#hero-image-wrapper"), {y:heroTranslate});
					gsap.to($(".hero-title span"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
					gsap.to($(".hero-subtitle span"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				} else {
					gsap.to($(".hero-title span"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
					gsap.to($(".hero-subtitle span"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});	
				}
				gsap.to($("#hero-bg-image"), {duration: 0, force3D:true, scale:1.02 , opacity:1, delay:0, ease:Power2.easeOut});						
				
				gsap.to($(".hero-footer-left"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
				gsap.to($(".hero-footer-right"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});			
			} else {
				gsap.to($("#hero-bg-image"), {duration: 0, force3D:true, scale:1 , opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-title span"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
				gsap.to($(".hero-subtitle span"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				gsap.to($(".hero-footer-left"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
				gsap.to($(".hero-footer-right"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});	
			}
			gsap.to($("#main-page-content"), {duration: 0.4, opacity:1, delay:0.95, ease:Power2.easeOut});
		} else {
			var tlHerospan = gsap.timeline();
			tlHerospan.set($("#hero .hero-title span"), {y: 60, opacity:0});
			$("#hero .hero-title span").each(function(index, element) {
				tlHerospan.to(element, {duration: 0.7, y:0, opacity:1, delay:0.05, ease:Power3.easeOut}, index * 0.05)
			});
			gsap.to($(".hero-subtitle span"), {duration: 0.4, force3D:true, y: 0, opacity:1, rotation:0, delay:0.15, ease:Power2.easeOut});
			gsap.to($(".hero-footer-left"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:0.5, ease:Power2.easeOut});
			gsap.to($(".hero-footer-right"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
			gsap.to($("#main-page-content"), {duration: 0.5, opacity:1, delay:0.15, ease:Power2.easeOut});
			gsap.to($(".post-article-wrap"), {duration: 0.4, force3D:true, y: 0, opacity:1, ease:Power2.easeOut});
			gsap.to($(".error-button"), {duration: 0.4, force3D:true, y: 0, opacity:1, rotation:0, delay:0.2, ease:Power2.easeOut});
		}	
		
		// Fading In Showcase Slider on Finised
		gsap.set($("#showcase-slider-holder"), {opacity:0});
		gsap.to($("#showcase-slider-holder"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
		gsap.to($("#showcase-slider-holder .swiper-slide .slide-title span"), {duration: 1, force3D:true, y: 0, opacity:1, delay:0.6, ease:Power2.easeOut});
		gsap.to($("#showcase-slider-holder .swiper-slide .subtitle span"), {duration: 0.7, force3D:true, y: 0, opacity:1, delay:1, ease:Power2.easeOut});
		
		// Fading In Showcase Carousel on Finised
		gsap.set($("#showcase-carousel-holder"), {opacity:0});
		gsap.to($("#showcase-carousel-holder"), {duration: 0.3, opacity:1, delay:0.3, ease:Power2.easeOut});
		var slideWidth = $("#showcase-carousel-holder .swiper-slide").width();
		gsap.set($("#showcase-carousel-holder .swiper-slide-active").prev(), {x:slideWidth, scale:0.8, opacity:0});
		gsap.set($("#showcase-carousel-holder .swiper-slide-active").next(), {x:-slideWidth, scale:0.8, opacity:0});								
		gsap.to($("#showcase-carousel-holder .swiper-slide-active").prev(), {duration: 2, x:0, scale:1, delay:0.2, opacity:1, ease:Power3.easeInOut});
		gsap.to($("#showcase-carousel-holder .swiper-slide-active").next(), {duration: 2, x:0, scale:1, delay:0.2, opacity:1, ease:Power3.easeInOut});
		gsap.to($("#showcase-carousel-holder .swiper-slide .slide-title span"), {duration: 0.3, force3D:true, y: 0, opacity:1, delay:0, ease:Power2.easeOut});
		gsap.to($("#showcase-carousel-holder .swiper-slide .subtitle span"), {duration: 0.3, force3D:true, y: 0, opacity:1, delay:0, ease:Power2.easeOut});
		
		gsap.set($(".swiper-prev, .swiper-next, #showcase-border"), {opacity:0});		
		gsap.to($(".swiper-prev, .swiper-next, .swiper-pagination-bullet"), {duration: 0.7, y: 0, opacity:1, delay:1.2, ease:Power2.easeOut});
		
		var tlSmallTitles = gsap.timeline();					
		$(".slide-small-title span").each(function(index, element) {
			tlSmallTitles.to(element, {duration: 0.5, force3D:true, y:0, opacity:1, delay:1, ease:Power2.easeOut}, index * 0.05)
		});
		// Fading In Floating Lists 
		var SlideListTitle = gsap.timeline();					
		$(".sl-title span, .split-title span").each(function(index, element) {
			SlideListTitle.to(element, {duration: 0.7, force3D:true, y:0, opacity:1, delay:0.5, ease:Power2.easeOut}, index * 0.05)
		});		
		var SlideListSubtitle = gsap.timeline();					
		$(".sl-subtitle span, .split-subtitle span").each(function(index, element) {
			SlideListSubtitle.to(element, {duration: 0.7, force3D:true, y:0, opacity:1, delay:0.6, ease:Power2.easeOut}, index * 0.05)
		});
		
		setTimeout( function(){
			$('.slide-list').addClass('show-borders')
		} ,300 );
		
		// Fading In Showcase Stagger Slider elements on Finised
		gsap.to($("#showcase-stagger-holder .stagger-slide .stagger-cat span"), {duration: 0.5, y: 0, opacity: 1, delay:0.4, ease:Power2.easeOut});
		gsap.to($("#showcase-stagger-holder .stagger-slide .stagger-date span"), {duration: 0.5, y: 0, opacity: 1, delay:0.4, ease:Power2.easeOut});
		gsap.to($("#showcase-stagger-holder .stagger-slide .stagger-title span"), {duration: 0.7, y: 0, opacity: 1, delay:0.4, ease:Power2.easeOut});
		gsap.to($("#showcase-stagger-holder .stagger-slide .stagger-info span"), {duration: 0.5, y: 0, opacity: 1, delay:0.5, ease:Power2.easeOut});
		gsap.to($(".stagger-footer"), {duration: 0.5, opacity: 1, delay:0.6, ease:Power2.easeOut});
		
		if( $('.load-project-thumb').length > 0 ){
			$('#hero-image-wrapper').waitForImages({
				finished: function() {
					setTimeout( function(){
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});
						$("#app.active").remove();
						$(".big-title-caption").remove();
						$('.thumb-container').remove();				
					} ,250 );
				},
				waitForAll: true
			});
		} else if( $('.load-project-thumb-with-title').length > 0 ){
			$('#hero-image-wrapper').waitForImages({
				finished: function() {
					setTimeout( function(){
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});
						$("#app.active").remove();
						$('.thumb-container').remove();	
						$("#canvas-slider.active").remove();
						$(".temporary-hero").remove();
						$(".next-project-image-wrapper.temporary").remove();
						$('body').removeClass("load-project-thumb-with-title").removeClass("show-loader");	
					} , 500 );
				},
				waitForAll: true
			});			
		} else if( $('.load-project-thumb-with-title-and-scale').length > 0 ){
			$('#hero-image-wrapper').waitForImages({
				finished: function() {
					setTimeout( function(){
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});
						$("#app.active").remove();
						$('.thumb-container').remove();	
						$("#canvas-slider.active").remove();
						$(".temporary-hero").remove();
						$(".next-project-image-wrapper.temporary").remove();
						$('body').removeClass("load-project-thumb-and-title").removeClass("show-loader");	
					} , 500 );
				},
				waitForAll: true
			});	
		} else {
			$('#hero-image-wrapper').waitForImages({
				finished: function() {
					$('#hero-image-wrapper').find('video').each(function() {
						$(this).get(0).play();
					});
					$("#app.active").remove();
					$('.thumb-container').remove();	
					$("#canvas-slider.active").remove();
				},
				waitForAll: true
			});
		}
		
		setTimeout( function(){	
			$('header').removeClass('white-header');
			$('body').removeClass("load-project-page").removeClass("load-project-thumb").removeClass("load-next-project").removeClass("load-next-page");
			setTimeout( function(){	
				$('body').removeClass("load-project-thumb-with-title").removeClass("show-loader").removeClass("delay-bg");
			} , 300 );			
		} , 800 );
		
	
	}// End Lazy Load		

/*--------------------------------------------------
Function Showcase Slider
---------------------------------------------------*/
	
	function ShowcaseStaggerSlider() {

		if( $('#showcase-stagger-holder').length > 0 ){
			
			var winHeight = $(window).height();					
			$('.stagger-caption').css({'height': winHeight});				
			$("footer").addClass("showcase-footer");
			
			ScrollTrigger.config({
				// default is "resize,visibilitychange,DOMContentLoaded,load"
				autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
            });
		
			window.BackgroundScrollTriggerArr = new Array();
			
			$('body').waitForImages({
				finished: function() {
					
					
					if( $('.stagger-slide').length > 0 ){
					
						if ($("body").hasClass("smooth-scroll")) {
							var elem = document.querySelector("#content-scroll");
							var scrollbar = Scrollbar.init(elem,
							{renderByPixels: true,damping:0.1});
						}
						
						
						$('.stagger-button-prev').on('click', function() {				
							var $window = $(window),
								$element = $('.stagger-slide.in-view').prev(),
								elementTop = $element.offset().top,
								elementHeight = $element.height(),
								viewportHeight = $window.height(),
								scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);	
							if ($("body").hasClass("smooth-scroll")) {					
								var scrollOffset = scrollbar.offset.y + (elementTop - scrollbar.getSize().container.height/2);                    
								gsap.to(scrollbar, {duration: 1.5, scrollTo:scrollOffset + elementHeight/2, ease:Power2.easeInOut});                    
							}
							else{                    
								$("html, body").animate({ scrollTop: scrollIt }, 1500);                
							}				
						});
						
						$('.stagger-button-next').on('click', function() {				
							var $window = $(window),
								$element = $('.stagger-slide.in-view').next(),
								elementTop = $element.offset().top,
								elementHeight = $element.height(),
								viewportHeight = $window.height(),
								scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);	
							if ($("body").hasClass("smooth-scroll")) {					
								var scrollOffset = scrollbar.offset.y + (elementTop - scrollbar.getSize().container.height/2);                    
								gsap.to(scrollbar, {duration: 1.5, scrollTo:scrollOffset + elementHeight/2, ease:Power2.easeInOut});                    
							}
							else{                    
								$("html, body").animate({ scrollTop: scrollIt }, 1500);                
							}				
						});					
						
						
						$('.stagger-slide').each(function(){
							var $this = $(this);
							var $slide = $this.data('slide');
							gsap.to(".stagger-caption", {			  
							  scrollTrigger: {
								trigger: $this,
								start: "top 50%",
								onEnter: function() { 
									counter = $('#counter-wrap span[data-slide-count="' + $slide + '"]');	
									gsap.to($('#counter-wrap').find('span'), {duration: 0.3, opacity:0, delay:0, y: -10, ease:Power2.easeIn, onComplete:function(){
										gsap.set(counter, {opacity:0, y:10, delay:0});
										gsap.to(counter, {duration: 0.3, opacity:1, y:0, delay:0, ease:Power2.easeOut});
									}});						
								},
								onEnterBack: function() { 
									counter = $('#counter-wrap span[data-slide-count="' + $slide + '"]');	
									gsap.to($('#counter-wrap').find('span'), {duration: 0.3, opacity:0, delay:0, y: 10, ease:Power2.easeIn, onComplete:function(){
										gsap.set(counter, {opacity:0, y:-10, delay:0});
										gsap.to(counter, {duration: 0.3, opacity:1, y:0, delay:0, ease:Power2.easeOut});
									}});
								}, 
							  }
							});			
						});	
						
						
						if (!$("#page-content").hasClass("light-content")) {	
							$('.stagger-slide').each(function(){
								const pageHeader = $('header');
								const pageFooter = $('footer');
								var $this = $(this);
								
								gsap.to(".stagger-caption", {			  
								  scrollTrigger: {
									trigger: $this,
									start: "top 50%",
									end: ( st ) => "+=" + st.vars.trigger.outerHeight(true),
									onEnter: function(st) { 
										if (st.vars.trigger.hasClass("change-header")) {	
											pageHeader.addClass('white-header');
											pageFooter.addClass('white-header');
											$('#magic-cursor').addClass('light-content');
										} else {
											pageHeader.removeClass('white-header');
											pageFooter.removeClass('white-header');
											$('#magic-cursor').removeClass('light-content');
										}					
									},							
									onEnterBack: function(st) {
										if (st.vars.trigger.hasClass("change-header")) {	
											pageHeader.addClass('white-header');
											pageFooter.addClass('white-header');
											$('#magic-cursor').addClass('light-content');
										} else {
											pageHeader.removeClass('white-header');
											pageFooter.removeClass('white-header');
											$('#magic-cursor').removeClass('light-content');
										}
									},
									invalidateOnRefresh: true
								  }
								});			
							});
						}
						
						
						if (!$("#page-content").hasClass("dark-content")) {	
							$('.stagger-slide').each(function(){
								const pageHeader = $('header');
								const pageFooter = $('footer');
								var $this = $(this);
								
								gsap.to(".stagger-caption", {			  
								  scrollTrigger: {
									trigger: $this,
									start: "top 50%",
									end: ( st ) => "+=" + st.vars.trigger.outerHeight(true),
									onEnter: function(st) { 
										if (!st.vars.trigger.hasClass("change-header")) {	
											pageHeader.addClass('white-header');
											pageFooter.addClass('white-header');
											$('#magic-cursor').removeClass('light-content');
										} else {
											pageHeader.removeClass('white-header');
											pageFooter.removeClass('white-header');
											$('#magic-cursor').addClass('light-content');
										}					
									},							
									onEnterBack: function(st) {
										if (!st.vars.trigger.hasClass("change-header")) {	
											pageHeader.addClass('white-header');
											pageFooter.addClass('white-header');
											$('#magic-cursor').removeClass('light-content');
										} else {
											pageHeader.removeClass('white-header');
											pageFooter.removeClass('white-header');
											$('#magic-cursor').addClass('light-content');
										}
									},
									invalidateOnRefresh: true
								  }
								});			
							});
						}
						
						$('.stagger-slide').each(function(){
							var $this = $(this);	
							
							var  ST0 = ScrollTrigger.create({
								trigger: $this,
								start: "top 99%",
								end: ( st ) => "+=" + st.vars.trigger.outerHeight(true),						
								toggleClass: {className: 'in-view', targets: $this},
								invalidateOnRefresh: true,
							});
							  
							var colorAttr = $this[0].getAttribute('data-color');
							let tweenBackgroundMain = gsap.to("#page-content, main", {
								backgroundColor: colorAttr,
								immediateRender: false,
								scrollTrigger: {
									trigger: $this,
									scrub: true,
									start:'top bottom',
									end: '+=100%',
								}
							});
							window.BackgroundScrollTriggerArr.push( tweenBackgroundMain );
							  
						});	
						
						
						$('.stagger-caption').each(function(){
							var $this = $(this);
								  
							const ST1 = ScrollTrigger.create({
								trigger: $this,
								start: "top top",
								end: ( st ) => "+=" + (st.vars.trigger.closest('.stagger-slide').outerHeight(true) - st.vars.trigger.outerHeight(true)),
								pin: $this,
								scrub: true,
								invalidateOnRefresh: true							
							});
																			
						});
						
			
						var winHeight = $(window).height();					
						$('.stagger-caption').css({'height': winHeight});
						
						var resizeTime;
						
						$(window).resize(function() {
							clearTimeout(resizeTime);
							resizeTime = setTimeout(doneResizing, 100);
						});
						
						function doneResizing(){					
							var winHeight = $(window).height();						
							$('.stagger-caption').css({'height': winHeight});
							
							if( $('#showcase-stagger-holder').length > 0 ){
								
								ScrollTrigger.refresh();
							}
						}
						
						if (!isMobile()) {
							
							if (!$("body").hasClass("disable-ajaxload")) {
							
								$("#showcase-stagger-holder .stagger-title").on('mouseenter', function() {	
									var $this = $(this);			
									gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$this.data('color'), backgroundColor:$this.data('color')});
									gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
									$( "#ball" ).addClass("with-icon").append( '<i class="arrow-icon"></i>' );
									$("#showcase-stagger-holder .stagger-title").addClass('hover-title');
									$(this).closest( '.stagger-slide' ).find('video').each(function() {
										$(this).get(0).play();
									})			
								});
													
								$("#showcase-stagger-holder .stagger-title").on('mouseleave', function() {					
									gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
									gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
									$("#ball").removeClass("with-icon");
									$('#ball i').remove();	
									$("#showcase-stagger-holder .stagger-title").removeClass('hover-title');
									$(this).closest( '.stagger-slide' ).find('video').each(function() {
										$(this).get(0).pause();
									})		
								});
							
							} else {
								
								$("#showcase-stagger-holder .stagger-title-wrapper").on('mouseenter', function() {	
									var $this = $(this).find('.stagger-title');			
									gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$this.data('color'), backgroundColor:$this.data('color')});
									gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
									$( "#ball" ).addClass("with-icon").append( '<i class="arrow-icon"></i>' );
									$("#showcase-stagger-holder .stagger-title").addClass('hover-title');
									$(this).closest( '.stagger-slide' ).find('video').each(function() {
										$(this).get(0).play();
									})			
								});
													
								$("#showcase-stagger-holder .stagger-title-wrapper").on('mouseleave', function() {					
									gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
									gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
									$("#ball").removeClass("with-icon");
									$('#ball i').remove();	
									$("#showcase-stagger-holder .stagger-title").removeClass('hover-title');
									$(this).closest( '.stagger-slide' ).find('video').each(function() {
										$(this).get(0).pause();
									})		
								});

								
							}
						
						}
					
						
						// Showcase Stagger Project Load Events
						if (!$("body").hasClass("disable-ajaxload")) {
							
							$('a.ajax-link').on('click', function() {
								CleanupBeforeAjax();	
							});
							
							$('.footer-button').on('click', function() {
							
								var parent_slide = $('.stagger-slide.in-view');
									parent_slide.addClass('above');
								
								$("body").addClass("show-loader");
									
									if (parent_slide.hasClass("change-header")) {	
										$("body").append('<div class="temporary-hero light-content"><div class="outer"><div class="inner"></div></div></div>');
									} else {
										$("body").append('<div class="temporary-hero"><div class="outer"><div class="inner"></div></div></div>');
									}
										
									gsap.to('.stagger-img-left img, .stagger-img-right img, .stagger-slide .hero-video-wrapper', {duration: 0.5, opacity:0, scale:0.8, ease:Power4.easeInOut});
									gsap.to('.stagger-cat span, .stagger-date span, .stagger-info span', {duration: 0.3, opacity:0, delay:0.1, ease:Power2.easeInOut, onComplete:function(){
										parent_slide.find('.stagger-title-wrapper').appendTo('.temporary-hero .inner');								
										
																		
										$("body").addClass("load-project-thumb-with-title").addClass("delay-bg");
										$(this).delay(100).queue(function() {
											CleanupBeforeAjax();
											var link = $('.stagger-slide.in-view').find('a.stagger-link');
											link.trigger('click');
										});	
									}});
									gsap.to('footer', {duration: 0.5, opacity:0, ease:Power4.easeInOut});
									
									gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
									gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
									$("#ball").removeClass("with-icon");
									$('#ball p').remove();
									$('#ball i').remove();
							  
							});
							
							$('#showcase-stagger-holder .stagger-title').on('click', function() {
								var parent_slide = $(this).closest('.stagger-slide');
								parent_slide.addClass('above');
								
								$("body").addClass("show-loader");
								
								if (parent_slide.hasClass("change-header")) {	
									$("body").append('<div class="temporary-hero light-content"><div class="outer"><div class="inner"></div></div></div>');
								} else {
									$("body").append('<div class="temporary-hero"><div class="outer"><div class="inner"></div></div></div>');
								}
									
								gsap.to('.stagger-img-left img, .stagger-img-right img, .stagger-slide .hero-video-wrapper', {duration: 0.5, opacity:0, scale:0.8, ease:Power4.easeInOut});
								gsap.to('.stagger-cat span, .stagger-date span, .stagger-info span', {duration: 0.3, opacity:0, delay:0.1, ease:Power2.easeInOut, onComplete:function(){
									
									parent_slide.find('.stagger-title-wrapper').appendTo('.temporary-hero .inner');
									$("body").addClass("load-project-thumb-with-title").addClass("delay-bg");
									$(this).delay(100).queue(function() {
										CleanupBeforeAjax();
										var link = $(".above").find('a');
										link.trigger('click');
									});	
									
								}});
								gsap.to('footer', {duration: 0.5, opacity:0, ease:Power4.easeInOut});
								
								gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
								gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
								$("#ball").removeClass("with-icon");
								$('#ball p').remove();
								$('#ball i').remove();				
							});
							
						} else {
							
							$('.stagger-slide').each(function(){
								var parent_slide = $(this)								
								var parent_slide_link = parent_slide.find('a.stagger-link');	
								var parent_slide_link_position = parent_slide.find('.stagger-title-wrapper');									
								parent_slide_link.appendTo(parent_slide_link_position);
							});
							
							$('.footer-button').on('click', function(){				
								$('.stagger-slide.in-view').find('a.stagger-link').trigger('click');
							});
							
							$('a.stagger-link').on('click', function( event ){								
								event.preventDefault();
								window.location.href = $(this).attr('href');
							});
							
							$('#showcase-stagger-holder .stagger-title').on('click', function() {
								gsap.to('.stagger-img-left img, .stagger-img-right img, .stagger-slide .hero-video-wrapper', {duration: 0.5, opacity:0, scale:0.8, ease:Power4.easeInOut});
								gsap.to('.stagger-cat span, .stagger-date span, .stagger-info span', {duration: 0.3, opacity:0, delay:0.1, ease:Power2.easeInOut});
								gsap.to('footer', {duration: 0.5, opacity:0, ease:Power4.easeInOut});								
								gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
								gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
								$("#ball").removeClass("with-icon");
								$('#ball p').remove();
								$('#ball i').remove();				
							});	
							
						}
						
					}
				
				},
				
				waitForAll: true
			});	
			
		}
		
	}



	window.LoadViaAjax = function() {		
		
		FirstLoad();
		ScrollEffects();
		PageLoadActions();
		FitThumbScreenGSAP();
		ShowcaseStaggerSlider();
		FitThumbScreenWEBGL();		
		LazyLoad();				
		Shortcodes();
		Sliders();
		JustifiedGrid();
		Lightbox();
		PlayVideo();
		ContactForm();
		ContactMap();
		CustomFunction();
	
	}//End Load Via Ajax
	
});	


var LoadViaAjax = window.LoadViaAjax;