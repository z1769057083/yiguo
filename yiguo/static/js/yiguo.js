function yiguo(){
	//城市
	//当鼠标移入配送至：北京
	$("#city_a").mouseenter(function(){
		
		$('.city_con').stop().show();
		
		$(this).css({'background':'#008842','color':'#fff'});
		
		$('#city_a s').css({'background':'url(../img/top.png) no-repeat -25px top','transition': 'transform .2s ease-in 0s',
	  
	  ' -webkit-transition': '-webkit-transform .2s ease-in 0s',
	    
	    'transform':'rotate(180deg)'});
	})
	
	//当鼠标移出时

	$("#city_a").mouseleave(function(){
		
		$('.city_con').stop().hide();
	
		$(this).css({'background':'#f7f9f8','color':'#008842'});
		
		$('#city_a s').css({'background':'url(../img/top.png) no-repeat -13px top','transition': 'transform 2.2s ease-in 0s',
	   
	   ' -webkit-transition': '-webkit-transform .2s ease-in 0s',
	  
	  	'transform':'rotate(-180deg)'});
	
	})
	
	//头部热门城市
	$('.city_list dl dd a').hover(function(){
		
		$(this).css('color','#008842');
	},function(){
		
		$(this).css('color','#727272');
	})
	//ABCDE
	
	$('.city_tab span').hover(function(){
		
		$(this).css({'border':'1px solid #e0e0e0','border-bottom':'1px solid #fff'})
	
	},function(){
		
		$(this).css({'border':'1px solid #fff','border-bottom':'1px solid #e0e0e0'})
	
	})
	

 //我的易果
	$('.myyiguo').hover(function(){
	
		$('.my_yg').show();
			
		$(this).css({'background':'#fff','border-left':'1px solid #b4c1a3','border-right':'1px solid #b4c1a3'})
		
		$(this).children('a').css({'padding-bottom':'2px','background':'#fff','z-index':'999999'})
		
		$(this).children('a').find('s').css({'transition': 'transform .2s ease-in 0s',
	   
	   ' -webkit-transition': '-webkit-transform .2s ease-in 0s','transform':'rotate(180deg)'})
		
	},function(){
	
		$(this).css({'background':'#F7F9F8','border-left':'1px solid #F7F9F8','border-right':'1px solid #F7F9F8'})
		
		$('.my_yg').hide();
		
		$(this).children('a').css({'padding-bottom':'0','background':'','z-index':'999999'})
		
		$(this).children('a').find('s').css({'transition': 'transform .2s ease-in 0s',
	   
	   ' -webkit-transition': '-webkit-transform .2s ease-in 0s','transform':'rotate(0deg)'})
	})
	//手机易果
	$('.mobile').hover(function(){
		
		$(this).css({'background':'#fff','border-left':'1px solid #b4c1a3','border-right':'1px solid #b4c1a3'})
		
		$('.mobile_ul').show();
		
		$(this).children('a').css({'padding-bottom':'3px','background':'#fff','z-index':'999999'})
		
		$(this).children('a').find('s').css({'transition': 'transform .2s ease-in 0s',
   		
   		' -webkit-transition': '-webkit-transform .2s ease-in 0s','transform':'rotate(180deg)'})
	},function(){
		
		$(this).css({'background':'#F7F9F8','border-left':'1px solid #F7F9F8','border-right':'1px solid #F7F9F8'})
		
		$('.mobile_ul').hide();
		
		$(this).children('a').css({'padding-bottom':'0','background':'','z-index':'999999'})
		
		$(this).children('a').find('s').css({'transition': 'transform .2s ease-in 0s',
  		
  		' -webkit-transition': '-webkit-transform .2s ease-in 0s','transform':'rotate(0deg)'})
	})
	//获取登陆用户名
	$('#_login a').click(function(){
		
		window.location.href="login.html"
		
		return false;
	
	})
	
	if($.cookie('yhm')==null){
		
		$('#_login a').text('登陆');
		
		$('#_register a').text('注册');
	}else{
		
		$('#_login a').text($.cookie('yhm'));
		
		$('#_register a').text('退出');
	}
	$('#_register a').click(function(){
		
		$('#_login a').text('登陆');
		
		$.cookie('yhm',null)
		
		$(this).text('注册');
		//return false;
		
		//window.location.href="register.html"
		
		return false;
	})
	//获取购物车商品
	var num_a;
	
	function car(){
	
	var c_str = $.cookie('goods');
		//console.log(c_str)
		if(c_str){
			
			var c_obj = eval(c_str);
			
			var c_num = 0;
			
			for(var i in c_obj){
			
			c_num += Number(c_obj[i].num);
			
			}
			
			$('.num').html(c_num);
			
			$('.totleNum b').html(c_num);
			
			num_a = c_num;
		
		}
	}
	
	car();
	
	car_msg();
	
	function car_msg(){
		
		$.ajax({
			
			url:'../data/detail.json',
			
			type:'GET',
			
			success:function(res){
				
				var c_str = $.cookie('goods');
				//console.log(c_str)
				if(c_str){
					
					var c_obj = eval(c_str);
					
					var c_num = 0;
				
					var html='';
					
					var totleprice = 0,price_dot=0;
					
					for(var i in c_obj){
					
						var pri=res[c_obj[i].id-1].price;
							
						var price = pri.substring(1)
						
						totleprice += parseFloat(price)*(c_obj[i].num);
						
						html+='<li><div class="l"><img src="../img/'+res[c_obj[i].id-1].img0+'" width="42" height="42"/></div><div class="c"><a href="#">'+res[c_obj[i].id-1].p_name+'</a></div><div class="r"><b>'+res[c_obj[i].id-1].price+'</b>*'+c_obj[i].num+'<a href="javascript:;" class="delet" id='+(c_obj[i].id)+'>删除</a></div></li>'
					
					}
					
					$('.totle_price').html('¥'+totleprice);
					
					$('.goods ul').html(html);
					
					$('.num_dt').html('¥'+totleprice);
					
				} //if end；
			}
		})
	}
	
	//点击删除按钮删除购物车内容
	
	$('body').on('click','.delet',function(){
		
		$(this).parentsUntil('ul').remove();
		
		//删除按钮操作开始
		
		var b = $(this).parent().text().indexOf('删除');
		
		var a = $(this).parent().text().indexOf('*')+1;
		
		var num_g = parseFloat($(this).parent().text().substring(a,b));
		
		var price_g = parseFloat($(this).siblings().html().substring(1));
		
		//要删除商品的价格
		
		price_this = num_g*price_g;
		
		//console.log(price_this);
		
		var price_new = parseFloat($('.totle_price').text().substring(1))-price_this;
		
		$('.totle_price').text('¥'+price_new)
		
		//删除后商品剩余数量
		
		num_new = $('.totleNum b').html()-num_g
		
		$('.totleNum b').html(num_new);
		
		$('.shopping-btn .num').text(num_new);
		
		$('.num_dt').html('¥'+price_new)
	
		//end
		var arr = eval('('+$.cookie('goods')+')');
		
		for(var i=0;i<arr.length;i++){
		
			if(arr[i].id==this.id){
				
				arr.splice(arr[i],1)
				
				var cookieStr=JSON.stringify(arr);
				
				$.cookie('goods',cookieStr);
				
				$(this).parentsUntil('.cart_list').parent().html('')
			} //if end
		}//for end
		
		return false;
	})
		
	//跳转到购物车
	$('.setup').click(function(){
	
		window.location.href='shopcar.html'
	
	});
	
	//鼠标经过显示隐藏购物车；
	$('.shopping-cart').hover(function(){
	
		$('.shop_dd').stop().fadeIn(400);
			
		if($.cookie('goods')=='[]'){
			
			$('.nogoods').css('display','block');
			
			$('.goods').css('display','none')
		}else{
			
			$('.nogoods').css('display','none');
			
			$('.goods').css('display','block')
		}
	},function(){
	
		$('.shop_dd').stop().fadeOut(400)
	
	})
	
	
}	
//轮播图左边导航
	function lbtzbdh(){
		
		$('.item').children('h2').append($('<span class="iconfont">&#xe600;</span>'))
	
	//添加图片
	
	for(var i=0;i<$('.item h2 a i').length;i++){
		
		$('.item h2 a i').eq(i).css({'background-position':-24*i+'px'});
		
		$('.tp').eq(i).html("<img src=../img/sg"+(i+1)+".png/>");
	
	}
	
	$('.item').children('h2').find('span').css({'display':'none','color':'#008842'});
	
	$('.item').hover(function(){
		
		$(this).children('h2').css({'border':'1px solid #bbb','border-right':'none','background':'#fff'})
		
		$('.sub_item').eq($(this).index()).css({'display':'block'});
		
		$(this).children('h2').children('a').css('color','#008842');
		
		$(this).children('h2').find('span').css('display','block');
	
	},function(){
		
		$(this).children('h2').css({'border':'1px','background': 'rgba(255, 255, 255, 0.9)',
    	
    	'background-image': 'initial','background-position-x': 'initial','background-position-y': 'initial','background-size': 'initial','background-repeat-x': 'initial',
   	 	
   	 	'background-repeat-y': 'initial','background-attachment': 'initial','background-origin': 'initial','background-clip': 'initial','background-color': 'rgba(255, 255, 255, 0.901961)'});
		
		$('.sub_item').eq($(this).index()).css({'display':'none'});
		
		$(this).children('h2').children('a').css('color','#444');
		
		$(this).children('h2').find('span').css('display','none');
	});
	//鼠标经过全部商品分类
	
	$('.catalogs_title').click(function(){
		
		$('.catalogs_list').slideToggle(200)
	})
	
	$('.catalogs_title').mouseover(function(){
		
		$('.catalogs_list').slideToggle();
		
	})
}//函数结束
	
		
		
	
		
		
		

	
