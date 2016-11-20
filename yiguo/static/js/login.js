$(function(){
//验证码
	function ran(min,max){
		var a=Math.round(Math.random()*(max-min));
		return a+min; 
	}
	var num;
	num = ran(999,10000)
	$('.yzm_s').text(num);
	$('.hyz').click(function(){
//		var num;
		num = ran(999,10000)
		$('.yzm_s').text(num);
	})
	$('.yzm_in').focus(function(){
		$('.yzm_error').css('display','none')
	});
//验证用户名
	$('.dl').click(function(){
		
		var $user = $('.yxzh').val();
		var $password=$('.password').val();
		var $yzm=parseInt($('.yzm_in').val());
		if($yzm != num){
			$('.msg-error').text('请输入正确的验证码').css('display','block');
			num = ran(999,10000)
		    $('.yzm_s').text(num);
		}
		else if($user==''){
			$('.msg-error').text('登录名不能为空').css('display','block');
		}
		else if($password==''){
			$('.msg-error').text('密码不能为空').css('display','block');
		}else{
		$.ajax({
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			type:'GET',
			data:{
				status:"login",	
				userID:$user,
				password:$password
			},
			success:function(res){
				console.log(res)
				switch(res){
				case '0':	$('.msg-error').text('用户名不存在').css('display','block');break;
				case '2':	$('.msg-error').text('用户名密码不符').css('display','block');break;
				default: 	$.cookie('yhm',$user);
				window.location.href="index.html"//+$user;
				//$('._login a').text($user);
				break;
				}
			}
		})
		}
			
		
	})



})