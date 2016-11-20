$(function(){
	//网页加载时先执行伦比兔
	lby();
	
	//轮播图
	
	function lby(){
	
	//当轮播图大小改变时时刻定位图片的位置
	
	function position(){
		
		$('.ban_bg').css({'width':bg_width+'px','overflow':'hidden','height':'500px'});
		
		$('.ban_img').css({'left':parseInt((bg_width-1200)/2)+'px'})
		
		$('.ban_bg li').css({'left':-parseInt((2150-bg_width)/2)+'px'});
	
	}
	
	//当改变浏览器窗口大小时记录轮播图的位置
		
	body=document.body||document.documentElement;
	
	bg_width = body.clientWidth;
	
	position();
	
	$(window).resize(function(){
		
		bg_width = $(this).width()
		
		position();
	})	
	
	var index=0,bg_w;
		
	var timer=null;
	
	//切换下一张函数
	
	function reset1(){
		
		$('.ban_bg li').css('display','none');
		
		$('.ban_img li').css('display','none')
		
		$('.ban_bg li').css({'left':-parseInt((2150-bg_width)/2)+'px'});
		
		$('.ban_img li').eq(index).stop().fadeToggle(500).siblings().css('display','none');
		
		$('.ban_bg li').eq(index).stop().fadeToggle(200).siblings().css('display','none')
		
		$('.ban_bg li img').css({'width':'2150px','height':'560px','margin-top':'-30px','margin-bottom':'-30px','margin-left':'-115px'});
		
		$('.ban_bg li img').eq(index).stop().animate({'width':1920+'px','height':'500px','margin-top':'0','margin-bottom':'0','margin-left':'0'},4000).parent().parent().css({'left':-parseInt((1920-bg_width)/2)+'px'});
		
		$('.dot li').eq(index).addClass('active').siblings().removeClass('active');
		
	}
	
	reset1();index++;
		
	//clearInterval(timer)
	
	timer = setInterval(move,4000);
	
	function move(){
	
	if(index>=$('.ban_img li').length){
		
		index=0;
	
	}	
	
		reset1();
		
		index++;
	}
	
	$('.ban_img').hover(function(){
	
		clearInterval(timer);
	
	},function(){
	
		clearInterval(timer)
		
		timer = setInterval(move,4000);
	});
	
	//当鼠标经过轮播图上的点时
	
	$('.dot li').mouseenter(function(){
			
			clearInterval(timer);
			
			index = $(this).index();
			
			reset1();
	})
	
	$('.dot li').mouseout(function(){
		
		index = $(this).index()+1;
		
		clearInterval(timer)
		
		timer = setInterval(move,4000);
	
	})
	
	//左右按钮
	
	$('#banner_wrapper').hover(function(){
		
		$('.prev,.next').css('opacity','0.3');
	
	},function(){
	
		$('.prev,.next').css('opacity','0');
		
	})
	
	$('.prev,.next').hover(function(){
		
		$(this).css('opacity','1');
		
		clearInterval(timer);
	
	},function(){
		
		$(this).css('opacity','0.3');
		
		clearInterval(timer);
		
		index++;
		
		timer = setInterval(move,4000);
	
	});
	
	$('.prev').click(function(){
		
		clearInterval(timer)
		
		if(index<0){
			
			index = $('.ban_bg li').length-1;
		
		}
		
		index--;
		
		reset1();
					
		return false;
	})
	
	$('.next').click(function(){
		
		clearInterval(timer)
		
		if(index>$('.ban_bg li').length-1){
			
			index = 0;
		
		}
		
		index++;
		
		reset1();
		
		return false;
	})
		
	}		//轮播图结束
		
	//加载轮播图左边导航时记录图片位置
	
	function reset(){
	
		for(var i= 0;i<$('.mui_nav li a').length;i++){
			
			$('.mui_nav li a').eq(i).css({'background-position':-24*i+'px 0'})
		
		}
	}
	
	//动态加载楼层1-4
	
	$.ajax({
		
		url:"../data/floor.json",
		
		type:"GET",
		
		success:function(res){
			
			//获取成功
			
			var i=0;
			
			$.each(res,function(index,value){
				
				i++;
				
				var div = $('<div class="wrap_floor'+i+' floor"><div class="wrap"><div class="floor_title"><h2><a href="#" style="color:'+value.floor_title.color+'"><i style="background-position:'+value.floor_title.bg_po+'">'+value.floor_title.i+'</i>'+value.floor_title.a+'</a></h2><span><a href="javascript:;">'+value.floor_title.sp[0]+'</a><a href="javascript:;">'+value.floor_title.sp[1]+'</a><a href="javascript:;" class="f_r">'+value.floor_title.sp[2]+'</a></span></div><div class="floor_side"><a href="javascript:;"><img src="../img/'+value.floor_side+'" alt="" /></a></div><div class="floor_main"><ul><li><a href="javascript:;"><img src="../img/'+value.floor_main[0]+'"></a></li><li><a href="javascript:;"><img src="../img/'+value.floor_main[1]+'"></a></li><li><a href="javascript:;"><img src="../img/'+value.floor_main[2]+'"></a></li><li><a href="javascript:;"><img src="../img/'+value.floor_main[3]+'"></a></li><li><a href="javascript:;"><img src="../img/'+value.floor_main[4]+'"></a></li><li><a href="javascript:;"><img src="../img/'+value.floor_main[5]+'"></a></li></ul></div></div></div>')
				
				$('#wrap').append(div);
			
			})
				
		}
	})
	//5-10层
		
	$.ajax({
		
		url:"../data/floor1.json",
		
		type:"GET",
		
		success:function(res){
			
			var i=4;
			
			$.each(res,function(index,value){
				
				i++;
				
				var div1 = $('<div class="wrap_floor'+i+' floor"><div class="wrap"><div class="floor_title"><h2><a href="#" style="color:'+value.floor_title.color+'"><i style="background-position:'+value.floor_title.bg_po+'">'+value.floor_title.i+'</i>'+value.floor_title.a+'</a></h2><span><a href="javascript:;">'+value.floor_title.sp[0]+'</a><a href="javascript:;">'+value.floor_title.sp[1]+'</a><a href="javascript:;" class="f_r">'+value.floor_title.sp[2]+'</a></span></div><div class="floor_side"><a href="javascript:;"><img src="../img/'+value.floor_side+'" alt="" /></a></div><div class="floor_main"><div class="col1"><a href="#"><img src="../img/'+value.floor_main.col1+'"></a></div><div class="col2"></div><div class="col3"><a href="javascript:;"><img src="../img/'+value.floor_main.col3+'"></a></div><div class="logo_list"></div></div></div></div>')
				
				$('#wrap').append(div1);
				
				var ul=$('<ul></ul>');
				
				for(var k=0;k<value.floor_main.col2.length;k++){
					
					var a=$('<li><a href="javascript:;"><img src="../img/'+value.floor_main.col2[k]+'"></a></li>');
					
					ul.append(a);
				
				}
				
				$('.wrap_floor'+i+' .floor_main .col2').append(ul);
				
				for(var j=0;j<value.floor_main.logo_list.length;j++){
					
					var b=$('<a href="javascript:;"><img src="../img/'+value.floor_main.logo_list[j]+'"></a>');
					
					$('.wrap_floor'+i+' .floor_main .logo_list').append(b);
				
				}	
					
			})
			
		}
	})
	
	//主页连接商品列表页
		
	$('body').on('click','.floor a img',function(){
			
		window.location.href='Tab_list.html';
		
		return false;
			
	})
	
	//当鼠标滚动时记录楼层位置
	$(window).scroll(function(){
		
		var height = $('.floor').height();
		
		if($(this).scrollTop()>($('.wrap_floor1').offset().top-180)&&$(this).scrollTop()<$('.floor').eq($('.floor').length-1).offset().top){
			
			$('.mui_nav').css('display','block');
	
		}else{
			
			$('.mui_nav').css('display','none');
		}
	
		var k=Math.round(($(this).scrollTop()-$('.wrap_floor1').offset().top)/height);
		
		$('.mui_nav li').eq(k).css({'background':'#008842'}).children('a').css({'color':'#fff','text-indent':'0'});
		
		$('.mui_nav li').eq(k).siblings().css({'background':''}).children('a').css({'background': 'url(../img/nav-icon.png) no-repeat','text-indent':'-5000px'});;
		
		reset();
		
		//头部吸顶菜单
		
		if($(this).scrollTop()>$('.header_top').get(0).offsetHeight){
			
			$('.header_top').removeClass('header_wrap').addClass('header_fixed')
		
		}else{
			
			$('.header_top').removeClass('header_fixed').addClass('header_wrap')
		
		}
	})
	//当鼠标点击楼层时
	
	$('.mui_nav li').click(function(){
		
		$(document).scrollTop($('.floor').eq($(this).index()).offset().top);
		
	})
	
	//遮罩广告
	
	$('.close').click(function(){
		
		$('#zhezao_ad').css('display','none');
		
		return false;
	})
	
	//轮播图下面的四张图片
	
	$('#ad_item dl').hover(function(){
		
		$(this).css({'box-shadow':'2px 3px 10px #000'}).siblings().css({'box-shadow':'none'})
	
	},function(){
		
		$(this).css({'box-shadow':'none'})
	
	})
	
	//网页尾部 鼠标经过a
	$('.footer').find('a').hover(function(){
	
		$(this).css({'color':'#008842','text-decoration':'underline'})
	
	},function(){
		
		$(this).css({'color':'#575556','text-decoration':'none'})
	
	})
	
	//客服
	
	$('#siderbar .listen').hover(function(){
		
		$(this).css('background-position','-56px -46px');
	
	},function(){
		
		$(this).css('background-position','0 -46px')
	
	});
	
	//回到顶部
	
	$('#siderbar .go_top').hover(function(){
		
		$(this).css('background-position','-56px 0');
		
		$(this).click(function(){
			
			$(document).scrollTop(0);
			
			return false;
		})
	
	},function(){
		
		$(this).css('background-position','0 0');
		
		return false;
	
	})
	
	var height = $('.mui_nav').height()/2;
	
	$('.mui_nav').css({'position':'fixed','left':'50%','top':'50%','margin-top':-200+'px','margin-left':'-645px'})
	
	//鼠标经过显示隐藏X按钮
	
	function move_in(){
		
		$(this).css({'background':'#008842'});
	
		$(this).children('a').css({'color':'#fff','text-indent':'0'})	
	
	};
	function move_out(){
	
		$(this).css({'background':''});
		
		$(this).children('a').css({'background': 'url(../img/nav-icon.png) no-repeat','text-indent':'-5000px'});
		
		reset();
	
	}
	
	$('.mui_nav li').hover(move_in,move_out);
		
})