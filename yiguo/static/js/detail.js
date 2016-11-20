$(function(){	
//获取商品列表页商品
$.ajax({
	url:'../data/detail.json',
	type:'get',
	success:function(res){
			for(var i=0;i<res.length;i++){
				
			if(res[i].id==$.cookie('id')){
				var value=res[i];
				//console.log($('.pic_big'))
				$('.pic_big').html('<img src="../img/'+value.img0+'" width="500" height="500" alt="" style="display:block"/>'+'<img src="../img/'+value.img1+'" width="500" height="500" alt="" style="display:none"/>'+'<img src="../img/'+value.img2+'" width="500" height="500" alt="" style="display:none"/>')
				$('.pic_thumb ul').html('<li><img src="../img/'+value.img0+'" width="85" height="85" alt="" /></li>'+'<li><img src="../img/'+value.img1+'" width="85" height="85" alt="" /></li>'+'<li><img src="../img/'+value.img2+'" width="85" height="85" alt="" /></li>')
				$('#fdj_content').html('<img src="../img/'+value.img0+'" width="1500" height="1500" alt="" />'+'<img src="../img/'+value.img1+'" width="1500" height="1500" alt="" />'+'<img src="../img/'+value.img2+'" width="1500" height="1500" alt="" />')
				$('.summary_name h1').html(value.p_name);
				$('.pro_price div strong').html(value.price);	
				$('.p_s1').html(value.p_s1);
				$('.p_s2').html(value.p_s2);
			}
	}
		//切换图片
	$('.pic_thumb').children().children().mouseover(function(){
		$('.pic_big').children().eq($(this).index()).fadeIn().siblings().fadeOut();	
		$('#fdj_content').children().eq($(this).index()).fadeIn().siblings().fadeOut();	
		$(this).css('border','1px solid #ccc').siblings().css('border','1px solid #f1f1f1');
		
	})
	//放大镜
	$('.zhezao').mousemove(function(event){
		var oEvent=event||window.event;
		var l=oEvent.offsetX-$('#fdj').width()/2;
		var t=oEvent.offsetY-$('#fdj').height()/2;	
		l<0?l=0:l;
		t<0?t=0:t;
		t>($('.pic_big').height()-$('#fdj').height())?t=$('.pic_big').height()-$('#fdj').height():t;
		l>($('.pic_big').width()-$('#fdj').width())?l=$('.pic_big').width()-$('#fdj').width():l;
		$('#fdj').css('left',l+'px');
		$('#fdj').css('top',t+'px');
		//移动比例
		var prop_w=l/($('.pic_big').width()-$('#fdj').width());
		var prop_t=t/($('.pic_big').height()-$('#fdj').height());
		$('#fdj_content').children().css('left',-prop_w*($('#fdj_content').children().width()-$('#fdj_content').width())+'px');
		$('#fdj_content').children().css('top',-prop_t*($('#fdj_content').children().height()-$('#fdj_content').height())+'px');
	});
	$('.zhezao').mouseover(function(event){
		var oEvent=event||window.event;
		$('#fdj').css("display","block");
		$('#fdj_content').css("display","block");		
	})
	$('.zhezao').mouseout(function(event){
		var oEvent=event||window.event;
		$('#fdj').css("display","none");
		$('#fdj_content').css("display","none");
	})
	//放大镜结束
				
		}
		
	})
	//点击加减按钮
	var sum;
	
		$('.decrease').click(reduce)
		function reduce(){
			sum = parseInt($('#p_number').val());
			$('#p_number').val(sum-1);
			//console.log(num-1);
			return function(){
				return(sum-1);
			}
		}
		$('.increase').click(plus)//点击加减按钮结束
		function plus(){
			 sum = parseInt($('#p_number').val());
			$('#p_number').val(sum+1);
			return function(){
				return(sum+1);
			}	
		}
		var b=reduce();
		
		var a=plus();
		
		
	//点击购物车
	//console.log($.cookie('btn_id'))
	$('.addcart').click(function(){
		var sum=parseInt($('#p_number').val())
		var id = $.cookie('btn_id');
		//console.log(id)
		var first = $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
		var same = false;
		if(first){
			$.cookie('goods','[{id:'+id+',num:sum}]');
			$.cookie('first','false');
		}else{
			var str = $.cookie('goods');
			var arr=eval(str);
			for(var attr in arr){
				if(arr[attr].id == id){
					arr[attr].num += sum;
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
						
							var pri=res[c_obj[i].id].price
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
		for(var i=0;i<3;i++){
			console.log($('.pic_big img').eq(i).css('display'))
			if($('.pic_big img').eq(i).css('display')=='block'){
			var img1 = $('.pic_big img').eq(i).clone();
		}
		}
		
		var $div = $('<div class="mov"></div>');
		$div.append(img1);
		$('.pic_big').append($div)
		var l_b = $('.pic_big').offset().left;
		var t_b = $('.pic_big').offset().top - scro_top;
		var t_e = $('.shopping-cart').offset().top - scro_top;
		var l_e = $('.shopping-cart').offset().left;
		$('.mov').children().css({'position':'fixed','z-index':'99999999999999','left':l_b,'top':t_b,'overflow':'hidden','border':'3px solid #fff'}).animate({'width':'100px','height':'100px'},1000).animate({'left':l_e,'top':t_e,'width':'40px','height':'40px'},function(){$(this).parent().remove();})
		

		
		
	})
	var scro_top;
	$(window).scroll(function(){
			 scro_top = $(document).scrollTop();
		})
	
	//商品详情--用户评价
	$('.detail_ul li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		
		$('.deta').eq($(this).index()).css({'display':'block'}).siblings('div:not(".detail_tab")').css({'display':'none'})
	
	})
	//获取评价信息
	getMsg(5)
	  function getMsg(num){
	$.ajax({
		"url":"../data/comment.json",
		"type":"GET",
		"success":function(res){
			 //1.计算分页数量
                    var showNum=num;
                    var dataL=res.length;
                    var pageNum=Math.ceil(dataL/showNum);       
                    $('#Pagination').pagination(pageNum,{
                        num_edge_entries: 1, //边缘页数
                        num_display_entries: 4, //主体页数
                        items_per_page: 1, //每页显示1项
                        prev_text: "上一页",
                        next_text: "下一页",
                        callback:function(index){
                        	var html='';
                        	 for(var i = showNum*index; i < showNum*index+showNum;i++){
                                //console.log(res)
                                if(i<dataL){	
                                   	html+='<div class="comment_item clear"><div class="user"><img src="../img/'+res[i].user_img+'" alt="" width="60" height="60"/><span class="name">'+res[i].name+'</span><span class="level">'+res[i].level+'</span></div><div class="cont_com clear"><div class="heading clear"><div class="stars"><div class="stars_bg"><span></span></div><div><span class="branch"><b>'+res[i].branch+'</b>分</span></div></div><div class="txt"><span>'+res[i].txt.sp1+'</span><span>'+res[i].txt.sp2+'</span><span>'+res[i].txt.sp3+'</span></div><div class="data">'+res[i].data+'<span>'+res[i].data_sp+'</span></div><div class="comefrom">来自<b>易果</b><div class="dropdown"><img src="../img/qrcode_app (1).jpg" alt="" /><span>扫一扫下载app</span></div></div></div><div class="reply">'+res[i].reply+'</div></div></div>'
  									//console.log(html)
                                }            
                            }
                        	 $('.comment_item_wrapper').html(html);
                        	$('#Pagination a').attr('href','javascript:;');
                        	$('.prev').css({'width':'18px','height':'18px','border':'1px solid #000','z-index':'9999'})
                        	//$('.prev').css({'position':'absolute','right':'0','bottom':'0','width':'18px','height':'18px','border':'1px solid #000','z-index':'9999'	
                        }//callback函数结束	
					})
				}
			})
		}
		//评论晒单按钮切换
		$('.common_list_tab span').click(function(){
			$(this).css({'color':'#008842'}).addClass('on').siblings().removeClass('on')
		})
		//商品评价吸顶菜单
		$(window).scroll(function(){
			if($(this).scrollTop()>$('.detail_item').offset().top){
			$('.gwc').css({'display':'block'});
			$('.detail_tab').css({'position':'fixed','top':'0','z-index':'9999','height':'40px','line-height':'40px','border':'1px solid #d4d4d4','width':'928px','background':'#fff'})
			}else{
			$('.detail_tab').css({'position':'relative','z-index':'9999','height':'40px','line-height':'40px','border':'1px solid #d4d4d4'})
			$('.gwc').css({'display':'none'});	
			}
		})
})