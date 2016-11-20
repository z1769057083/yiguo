$(function(){
	//动态加载特惠换购商品列表
	
	$.ajax({
		
		'url':'../data/thhg.json',
		
		'type':'GET',
		
		'success':function(res){
			
			var k=0;
			
			$('.Preferential_buy h3 a').click(build);
			
			$('.Preferential_buy h3 a').trigger('click')
			
			function build(){
				
				var html='';
				
				var n = res.length/8;
				
				if(k>=(n-1)){
				
					k=0;
				
				}else{
					
					k++;
				
				}
			
			for(var i=k*8;i<8*(k+1);i++){
				
				//价格
				
				if(i<res.length){
				
				var p_r = res[i].p_price.substring(1,res[i].p_price.length-2)
				
				var p_unit=res[i].p_price.substring(res[i].p_price.length-2)
				
				html+='<li class="product">'+
					
						'<div class="p_img">'+
							
							'<a href="javascript:;"><img src="../img/'+res[i].img+'" width="90" height="90"/></a>'+
						
						'</div>'+
						
						'<div class="p_info">'+
							
							'<div class="p_name">'+
								
								'<a href="javascript:;">'+res[i].p_name+'</a>'+
							
							'</div>'+
							
							'<div class="p_price">'+
								
								'<span>￥<strong>'+p_r+'</strong>'+p_unit+'</span>'+
								
								'<del>'+res[i].original_p+'</del>'+
							
							'</div>'+
							
							'<a class="btn_hg" href="javascript:;">换购</a>'+
						
						'</div>'+
					
					'</li>'
				
				}
			
			}  //for end
				
			$('.Preferential_buy ul').html(html)
			
			}
			
		}
		
	})
	
	//点击换购按钮实现跳转
	
	$('body').on('click','.p_info .btn_hg',function(){
	
		window.location.href="detail.html"
			
	});

	//当鼠标选中复选框按钮时计算总的价格
	
	var all_price=0;
		
	//当鼠标点击购物车复选款按钮时改变总价格
	
	$('body').on('click','.car_table input[type=checkbox]',function(){
		
		if($(this).is(':checked')==true){
			
			var $this=$(this).parent().parent().parent().parent().index()+1;
			
			all_price = parseFloat($('.totle_price').html().substring(1))
			
			var t_p=parseFloat($('.car_table').eq($this).children().find('.cart_total').html().substring(1));
			
			all_price+=t_p;
			
			$('.totle_price').html('¥'+all_price)
		
		}
		
		if($(this).is(':checked')==false){
			
			all_price = parseFloat($('.totle_price').html().substring(1))
			
			var $this=$(this).parent().parent().parent().parent().index()+1;
			
			var t_p=parseFloat($('.car_table').eq($this).children().find('.cart_total').html().substring(1));
			
			all_price =all_price-t_p;//总价格
			
			//console.log(all_price)
			
			var a=$('.totle_price').html().substring(1)-t_p;//存入
			
			$('.totle_price').html('¥'+a);
			
			//console.log(1)
		}
	
	})
	
	//自定义时间trigger模拟点击-按钮
	
	$('body').on('click1','.car_table input[type=checkbox]',function(){
		
		all_price = parseFloat($('.totle_price').html().substring(1))
		
		var $this=$(this).parent().parent().parent().parent().index()+1;
		
		var t_p=parseFloat($('.car_table').eq($this).children().find('.cart_total').html().substring(1));
		
		all_price-=t_p;
		
		$('.totle_price').html('¥'+all_price)
	
	})
	
	//自定义时间trigger模拟点击+按钮
	
	$('body').on('click2','.car_table input[type=checkbox]',function(){
		
		all_price = parseFloat($('.totle_price').html().substring(1))
		
		var $this=$(this).parent().parent().parent().parent().index()+1;
		
		var t_p=parseFloat($('.car_table').eq($this).children().find('.cart_price').html().substring(1));
		
		all_price+=t_p;
				
		$('.totle_price').html('¥'+all_price)
	
	})
	
	//继续购物
	
	$('body').on('click','.continue',function(){
	
		window.location.href="index.html";
		
	})
	
	//获取购物车内容
	
	$.ajax({
		
		'url':'../data/detail.json',
		
		'type':'GET',
		
		'success':function(res){
			
			var str = $.cookie('goods');
			
			var arr = eval('('+str+')');
			
			var html='';
			
			var k=0;
			
			for(var i=0;i<res.length;i++){
				
				for(var j=0;j<arr.length;j++){
					
					if(arr[j].id==res[i].id){
						
						//console.log(res[i].id)
						
						k++;
					
					html += '<table class="car_table">'+
						
						'<tr>'+
							
							'<td class="cart_check"><input type="checkbox" class="ch_qx"  name="qx" checked/></td>'+
							
							'<td class="cart_img"><img src="../img/'+res[i].img0+'" alt="" /></td>'+
							
							'<td class="cart_info">'+res[i].p_name+'</td>'+
							
							'<td class="cart_ub"></td>'+
							
							'<td class="cart_price">'+res[i].p_s1+'</td>'+
							
							'<td class="cart_num"><a href="javascript:;" class="decrease" index='+k+'></a><input type="text" class="itxt" value="'+arr[j].num+'" /><a class="plus" href="javascript:;"></a></td>'+
							
							'<td class="cart_total">¥'+parseFloat(res[i].p_s1.substring(1))*arr[j].num+'</td>'+
							
							'<td class="cart_spec">'+res[i].p_s2+'</td>'+
							
							'<td class="cart_opera"><a href="javascript:;" class="removebox">移入收藏夹</a><a href="javascript:;" class="delete" id="'+res[i].id+'">删除</a></td>'+
						
						'</tr>'+
					
					'</table>'
					
					}
				
				}
			}
			
			$('.cart_list').prepend(html);
		}
	})
	
	//鼠标点击弹出框的X按钮时
	
	$('.x').click(function(){
		
		$('.global_wrapper').css('display','none');
	
	})
	
	$('.cancel_a').click(function(){
		
		$('.global_wrapper').css('display','none');
	
	})
	
	var va,totl_p;//input的值
	
	//加减按钮改变商品数量
	
	$('body').on('click','.decrease',function(){
		
		all_price = parseFloat($('.totle_price').html().substring(1))
		
		va = $(this).siblings('.itxt').val();
		 
		if(va>1){
			
			$(this).siblings('.itxt').val(va-1);
		
		}
		 
		//计算单个商品总价
		 
		 totl_p = $(this).parent().prev().html();
		 
		 $(this).parent().next().html('¥'+(va-1)*parseFloat(totl_p.substring(1)));
		 
		 var pri=0;
		
		for(var i=1;i<$('.car_table').length;i++){
		 	
		 	pri+=parseFloat($('.car_table').children().find('.cart_total').eq(i).html().substring(1))
		 }
		 
		$('.totle_price').html('¥'+pri)
		
		if(va<=1){
			
			$(this).siblings('.itxt').val(1);
			
			$(this).parent().next().html('¥'+(1)*parseFloat(totl_p.substring(1)))
			
		}//for end
		//console.log(totl_p)
	})
	
	//当鼠标点击+按钮时
	
	$('body').on('click','.plus',function(){
		 
		va = parseInt($(this).siblings('.itxt').val())
		
		$(this).siblings('.itxt').val(va+1)
		 
		totl_p = $(this).parent().prev().html();
		 
		$(this).parent().next().html('¥'+(va+1)*parseFloat(totl_p.substring(1)));
		 
		$(this).parent().parent().parent().parent().children().find('input[type=checkbox]').trigger('click2');
		

	})
	 
	 //弹出框拖拽
		
	$('.g_header').mousedown(function(event){
		
		var oEvent=event||window.event;
		
		var o_l = oEvent.offsetX;
		
		var o_t = oEvent.offsetY;
			
		$(document).mousemove(function(event){
			
			var oEvent=event||window.event;
			
			var l = oEvent.clientX-o_l;
			
			var t = oEvent.clientY-o_t
			
			$('.global_wrapper').css({'left':l+'px','top':t+'px'});
			
			$(document).mouseup(function(){
				
				$(this).unbind('mousemove');
			
			})
		})
		
	})
		
	//删除cookie
	
	var this_del;
	
	$('body').on('click','.delete',function(){
		
		var arr = eval('('+$.cookie('goods')+')');
		
		$('.global_wrapper').fadeIn();
		
		var this_ = this.id
		
		this_t = $(this)
		
		//当点击确定按钮时
		
		$('.del_a').click(function(){
			
			$('.global_wrapper').css('display','none');
			
			for(var i=0;i<arr.length;i++){
				
				if(arr[i].id==this_){
					
					arr.splice(i,1)
					
					var cookieStr=JSON.stringify(arr);
					
					$.cookie('goods',cookieStr);
		
					var a=$('.totle_price').html().substring(1)-this_t.parent().parent().parent().parent().find('.cart_total').html().substring(1)
				
					$('.totle_price').html('¥'+a)
				
					this_t.parentsUntil('.cart_list').remove();
					
					//当表格长度=1时弹出购物车为空同时隐藏当前页面
					
					if($('.car_table').length==1){
					
						$('.car_none').css('display','block');
						
						$('.car').css('display','none')
					
					}else{
						
						$('.car_none').css('display','none');
						
						$('.car').css('display','block')
					}
				}
			}//for end
		})

	})
	
	//删除选中的商品按钮
	
	$('body').on('click','.del_this',function(){
		
		for(var i=0;i<('.car_table').length;i++){
			
			if($('.car_table').eq(i).children().find('input[type=checkbox]').is(':checked')){
			
			$('.car_table').eq(i).children().find('.delete').trigger('click')
				
			}
		}
	})
	
	//全选按钮
	
	$('input[type=checkbox]:first,input[type=checkbox]:last').click(function(){
		
		var p=parseFloat($('.totle_price').html().substring(1));
		
		for(var i=1;i<$('.car_table input[type=checkbox]').length;i++){
			
			if($('.car_table input[type=checkbox]').eq(i).is(':checked')){
				
				$('.car_table input[type=checkbox]').eq(i).attr({'checked':false})
				
				var price=parseFloat($('.car_table input[type=checkbox]').eq(i).parent().parent().find('.cart_total').html().substring(1))
				
				p-=price;
				
				
			}else{
				
				$('.car_table input[type=checkbox]').eq(i).prop({'checked':true});
				
				var pri=parseFloat($('.car_table input[type=checkbox]').eq(i).parent().parent().find('.cart_total').html().substring(1))
				
				p+=pri;
				
			}
		}
		
		$('.totle_price').html('¥'+p)
	})
	
	
	
})
