$(function(){
		var a=true,b=true,c=true,d=true,e=true,f=true,g=true,h=true,i=true,j=true;
	//手机注册邮箱注册切换
	$('.nav_tabs').children().eq(0).find('a').css({'background':'#fff','border-top':'4px solid #74c248','padding-bottom':'1px'})
	$('.nav_tabs').children().find('a').click(function(){
		$(this).css({'background':'#fff','border-top':'4px solid #74c248','padding-bottom':'1px'}).parent().siblings().children().css({'background':'#f7f7f7','border-top':'4px solid #f7f7f7','padding-bottom':'0'});
		$('.con_l').eq($(this).parent().index()).css({'display':'none','position':'relative'}).siblings('div:not(".con_r")').css({'display':'block','position':'none'});
		
	});
	//验证码
	function ran(min,max){
		var a=Math.round(Math.random()*(max-min));
		return a+min; 
	}
	var num;
	num = ran(999,10000)
	$('.yzm').text(num);
	$('.hyz').click(function(){
		var num;
		num = ran(999,10000)
		$('.yzm').text(num);
	})
	$('.graph').blur(function(){
		if($(this).val()!=num){
			$('.yzm_error').css({'display':'inline-block','padding-left':'20px','color':'#f60000'}).html('<b></b>请输入正确验证码')
			$('.yzm_error').find('b').css({'background':'url(../img/bg_login.png) no-repeat -40px -200px'});
			a=false;
		}else{
			$('.yzm_error').css({'display':'inline-block','padding-left':'20px','color':'#f60000'}).html('<b></b>');
			$('.yzm_error').find('b').css({'background':'url(../img/bg_login.png) no-repeat 0 -200px'});
			a=true;
			
		}
	})
	$('.graph').focus(function(){
		$('.yzm_error').css('display','none')
	});

	//验证邮箱
	$('.email').blur(function(){
		var user=$('.email').val();
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			type:"GET",
			data:{
				status:"login",
				userID:user
			},
			success:function(res){
				switch(res){
				case '0':	var reg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
							if($('.email').val().length==0){
								$('.email_sp').css({'display':'inline-block','color':'#444'}).html('<b></b>密码不能为空');
								$('.email_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat -20px -200px'});
								b=false;
							}
							else if(reg.test($('.email').val())){
								$('.email_sp').css({'display':'inline-block','color':'#f60000'}).html('<b></b>')
								$('.email_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat 0 -200px'});
								b=true;
								
							}else{
								$('.email_sp').css({'display':'inline-block','color':'#f60000'}).html('<b></b>请输入正确格式的邮箱');
								$('.email_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat -40px -200px'});
								b=false;
							};break;
				default:$('.email_sp').css({'display':'inline-block','color':'#f60000'}).html('<b></b>您的邮箱已注册');
			$('.email_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat -40px -200px'});
			b=false;
			}//switch
	}//function
	})
	})
	//设置密码	
	var $pass;
	$('.mail_reg .password').blur(function(){
		$pass=$(this).val();
		var reg = /^[\w.]{6,20}$/;
		console.log()
		if($pass.length==0){
			$('.password_sp').css({'display':'inline-block','color':'#444'}).html('<b></b>密码不能为空');
			$('.password_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat -20px -200px'});
			c=false;
		}
		else if(reg.test($pass)){
			$('.password_sp').css({'display':'inline-block','color':'#f60000'}).html('<b></b>')
			$('.password_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat 0 -200px'});
			c=true;
		}else{			
			$('.password_sp').css({'display':'inline-block','color':'#f60000'}).html('<b></b>密码不符合规范');
			$('.password_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat -40px -200px'});
			c=false;
		}
	})
	//确认密码
	$('.mail_reg .password_sure').blur(function(){
		var $sure_pass=$(this).val();
		if($sure_pass.length==0){
			$('.password_sp2').css({'display':'inline-block','color':'#444'}).html('<b></b>密码不能为空');
			$('.password_sp2').find('b').css({'background':'url(../img/bg_login.png) no-repeat -20px -200px'});
			d=false;
		}
		else if($sure_pass==$pass){
			$('.password_sp2').css({'display':'inline-block','color':'#f60000'}).html('<b></b>')
			$('.password_sp2').find('b').css({'background':'url(../img/bg_login.png) no-repeat 0 -200px'});
			d=true;
			
		}else{
			$('.password_sp2').css({'display':'inline-block','color':'#f60000'}).html('<b></b>两次密码不一致');
			$('.password_sp2').find('b').css({'background':'url(../img/bg_login.png) no-repeat -40px -200px'});
			d=false;
		}
	})
	//手机号
	$('.phone_number').blur(function(){
		if($(this).val().length==0){
			$('.number_sp').css({'display':'inline-block','color':'#444'}).html('<b></b>手机号不能为空');
			$('.number_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat -20px -200px'});
			e=false;
		}
		else if($(this).val().length==11){
			$('.number_sp').css({'display':'inline-block','color':'#f60000'}).html('<b></b>')
			$('.number_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat 0 -200px'});
			e=true;
			
		}else{
			$('.number_sp').css({'display':'inline-block','color':'#f60000'}).html('<b></b>手机号格式不正确');
			$('.number_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat -40px -200px'});
			e=false;
		}
	})
	//验证码
	$('.phone_sure').blur(function(){
		if($(this).val().length==0){
			$('.acqu').css({'display':'inline-block','color':'#444'}).html('<b></b>验证码不能为空');
			$('.acqu').find('b').css({'background':'url(../img/bg_login.png) no-repeat -20px -200px'});
			f=false;
		}
		else if($(this).val().length==5){
			$('.acqu').css({'display':'inline-block','color':'#f60000'}).html('<b></b>')
			$('.acqu').find('b').css({'background':'url(../img/bg_login.png) no-repeat 0 -200px'});
			f=true;
			
		}else{
			$('.acqu').css({'display':'inline-block','color':'#f60000'}).html('<b></b>请正确输入验证密码');
			$('.acqu').find('b').css({'background':'url(../img/bg_login.png) no-repeat -40px -200px'});
			f=false;
		}
	})
	//手机注册
//手机号
	$('.Tel').blur(function(){
		var user=$('.Tel').val();
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			type:"GET",
			data:{
				status:"login",
				userID:user
			},
			success:function(res){
				switch(res){
				case '0':if($('.Tel').val().length==0){
								$('.phone_sp').css({'display':'inline-block','color':'#444'}).html('<b></b>手机号不能为空');
								$('.phone_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat -20px -200px'});
								g=false;
							}
							else if($('.Tel').val().length==11){
								$('.phone_sp').css({'display':'inline-block','color':'#f60000'}).html('<b></b>')
								$('.phone_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat 0 -200px'});
								g=true;
								
							}else{
								$('.phone_sp').css({'display':'inline-block','color':'#f60000'}).html('<b></b>手机号格式不正确');
								$('.phone_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat -40px -200px'});
								g=false;
							};break;
				default:$('.phone_sp').css({'display':'inline-block','color':'#f60000'}).html('<b></b>您的手机号已注册');
						$('.phone_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat -40px -200px'});
						g=false;
						break;	
				}
			}	})
		})
	//验证码
	$('.Tel_code').blur(function(){
		if($(this).val().length==0){
			$('.code_s').css({'display':'inline-block','color':'#444'}).html('<b></b>验证码不能为空');
			$('.code_s').find('b').css({'background':'url(../img/bg_login.png) no-repeat -20px -200px'});
			h=false;
		}
		else if($(this).val().length==5){
			$('.code_s').css({'display':'inline-block','color':'#f60000'}).html('<b></b>')
			$('.code_s').find('b').css({'background':'url(../img/bg_login.png) no-repeat 0 -200px'});
			h=true;
			
		}else{
			$('.code_s').css({'display':'inline-block','color':'#f60000'}).html('<b></b>请正确输入验证密码');
			$('.code_s').find('b').css({'background':'url(../img/bg_login.png) no-repeat -40px -200px'});
			h=false;
			
		}
	})
	//设置密码	
	var $pass;
	$('.phone_reg .password').blur(function(){
		$pass=$(this).val();
		var reg = /^[\w.]{6,20}$/;
		console.log()
		if($pass.length==0){
			$('.password_sp').css({'display':'inline-block','color':'#444'}).html('<b></b>密码不能为空');
			$('.password_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat -20px -200px'});
			i=false;
		}
		else if(reg.test($pass)){
			$('.password_sp').css({'display':'inline-block','color':'#f60000'}).html('<b></b>')
			$('.password_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat 0 -200px'});
			i=true;
		}else{			
			$('.password_sp').css({'display':'inline-block','color':'#f60000'}).html('<b></b>密码不符合规范');
			$('.password_sp').find('b').css({'background':'url(../img/bg_login.png) no-repeat -40px -200px'});
			i=false;
		}
	})
	//确认密码
	$('.phone_reg .password_sure').blur(function(){
		var $sure_pass=$(this).val();
		if($sure_pass.length==0){
			$('.password_sp2').css({'display':'inline-block','color':'#444'}).html('<b></b>密码不能为空');
			$('.password_sp2').find('b').css({'background':'url(../img/bg_login.png) no-repeat -20px -200px'});
			j=false;
		}
		else if($sure_pass==$pass){
			$('.password_sp2').css({'display':'inline-block','color':'#f60000'}).html('<b></b>')
			$('.password_sp2').find('b').css({'background':'url(../img/bg_login.png) no-repeat 0 -200px'});
			j=true;
			
		}else{
			$('.password_sp2').css({'display':'inline-block','color':'#f60000'}).html('<b></b>两次密码不一致');
			$('.password_sp2').find('b').css({'background':'url(../img/bg_login.png) no-repeat -40px -200px'});
			j=false;
			
		}
	})
	//手机号注册提交
	$('.btn_reg2').click(function(){
		if(a&&g&&h&&i&&j){
		var user=$('.Tel').val();
		var passw=$('.password1').val();
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			type:"POST",
			data:{
				status:"register",
				userID:user,
				password:passw
			},
			success:function(res){
				switch(res){
				case '0':alert('您的手机号已被注册');
				break;
				case '1':window.location.href="login.html";
				break;
				case '2':alert('注册失败，请重新注册');
				break;
				}
			}
		})
		}else{
			alert('注册失败请重新填写')
		}
})
	//邮箱注册提交
	$('.btn_reg1').click(function(){
		if(a&&b&&c&&d&&e&&f){
			var user=$('.email').val();
			var passw=$('.password2').val();
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				type:"POST",
				data:{
					status:"register",
					userID:user,
					password:passw
				},
				success:function(res){
					switch(res){
					case '0':alert('您的邮箱已被注册');
					break;
					case '1':window.location.href="login.html";
					break;
					case '2':alert('注册失败，请重新注册');
					break;
					}
				}
			})
		}else{
			alert("注册失败请重新填写")
		}
})
})