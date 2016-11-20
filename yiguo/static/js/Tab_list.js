$(function(){
	$.ajax({
		url:'../data/detail.json',
		type:'get',
		success:function(res){
			//console.log(res)
			//$.each(res,function(index,value){	
			for(var i=0;i<res.length;i++){
				//console.log(res[0].p_name)
				value=res[i];
				
				$li=$('<li class="product_item"><div class="p_img" img_id="'+value.id+'"><a href="javascript:;"><img src="../img/'+value.img0+'"alt="" /></a></div><div class="p_info"><div class="p_name"><a href="javascript:;">'+value.p_name+'</div><div class="p_price"><a href="javascript:;"><span class="price"><strong>'+value.price+'</strong></span><span class="saletip">'+value.saletip+'</span></a></div><div class="p_buy"><span>'+value.p_buy+'</span><a href="javascript:;"class="btn_by" id='+value.id+'>'+value.btn_by+'</a></div></li>')			
			$('.p_ul').append($li);
			}
			$('.product_item').mouseover(function(evt){
				$('.p_buy').eq($(this).index()).css('display','block')			
			})
			$('.product_item').mouseout(function(){
				$('.p_buy').css('display','none')
			})	
			
	$('.p_ul').on('click','.p_img',function(){
		//向详情页传递id
		$.cookie('btn_id',$(this).attr('img_id'))
		$.cookie('id',$(this).attr('img_id'))
		//console.log($.cookie('btn_id'))
		//console.log($(this).index())
		//地址栏传参实现登陆记录					
		var str1=location.href;
		var num=str1.indexOf("?");
		if(num!=-1){
			$('#_login a').text(str1.substring(num+2));
			window.location.href='detail.html?='+str1.substring(num+2)		
		}else{
			window.location.href='detail.html';
		}
		
		
	})			
					
}
	})
	$(window).scroll(function(){
		if($(this).scrollTop()>$('.header_top').get(0).offsetHeight){
				$('.header_top').removeClass('header_wrap').addClass('header_fixed')
			}else{
				$('.header_top').removeClass('header_fixed').addClass('header_wrap')
			}	     
	})
	
	//向详情页传递id
	/*$('.p_ul').on('click','.p_img',function(){
		$(this).attr('img_id')
	})*/
	
	
	//加入购物车
	$('.p_ul').on('click','.btn_by',addId);
	function addId(){
		var id = this.id;
		var first = $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
		var same = false;
		if(first){
			$.cookie('goods','[{id:'+id+',num:1}]');
			$.cookie('first','false');
		}else{
			var str = $.cookie('goods');
			var arr=eval(str);
			for(var attr in arr){
				if(arr[attr].id == id){
					arr[attr].num += 1;
					var cookieStr=JSON.stringify(arr);
					$.cookie('goods',cookieStr);
					same = true;					
				}
			}
			//如果id不同从新建立商品对象
			if(!same){
				var obj = {id:id,num:1};
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				$.cookie('goods',cookieStr);
			}
		}
		//获取购物车商品
		var num_a;
		function car(){
			var c_str = $.cookie('goods');
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
		car_msg()
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
							var pri=res[c_obj[i].id-1].price
							var price = pri.substring(1)
							totleprice += parseFloat(price)*(c_obj[i].num);
							html+='<li><div class="l"><img src="../img/'+res[c_obj[i].id-1].img0+'" width="42" height="42"/></div><div class="c"><a href="#">'+res[c_obj[i].id-1].p_name+'</a></div><div class="r"><b>'+res[c_obj[i].id-1].price+'</b>*'+c_obj[i].num+'<a href="javascript:;" class="delet" id='+(c_obj[i].id)+'>删除</a></div></li>'
						}
						$('.totle_price').html('¥'+totleprice);
						$('.goods ul').html(html);
						$('.num_dt').html('¥'+totleprice);
						
					}
				}
			})
		}
		
		var img1 = $(this).parent().parent().prev().children().find('img').clone();
		var $div=$('<div class="mov"></div>');
		$div.append(img1);
		$(this).parent().parent().siblings().append($div);
		var l_b = $(this).parent().parent().siblings().offset().left;
		if(scro_top){
			var t_b = $(this).parent().parent().siblings().offset().top - scro_top;
			var t_e = $('.shopping-cart').offset().top - scro_top;
		}else{
			var t_b = $(this).parent().parent().siblings().offset().top;
			var t_e = $('.shopping-cart').offset().top
		}		
		var l_e = $('.shopping-cart').offset().left;
		if(scro_top>50){
			$('.mov').children().css({'position':'fixed','z-index':'99999999999999','left':l_b,'top':t_b,'overflow':'hidden','border':'1px solid lightgreen'}).animate({'width':'100px','height':'100px'},1000).animate({'left':l_e,'top':t_e,'width':'32px','height':'32px'},function(){$(this).parent().remove()})
		}else{
			$('.mov').children().css({'position':'fixed','z-index':'99999999999999','left':l_b,'top':t_b,'overflow':'hidden','border':'1px solid lightgreen'}).animate({'width':'100px','height':'100px'},1000).animate({'left':l_e,'top':t_e,'width':'40px','height':'40px'},function(){$(this).parent().remove()})
		}	
}
	var scro_top;
	$(window).scroll(function(){
			 scro_top = $(document).scrollTop();
		})
})	