<template>
	<div class="register">
		<section class="form_container">
			<div class="manage_tip">
				<span class="">后台管理系统</span>
        
			</div>
		</section>
	</div>
</template>

<script>
import Register from './Register'
export default {
	name: "register",
	components:{
    Register
  }
};
</script>

<style scoped>
	.register {
		position: relative;
		width: 100%;
		height: 100%;
		background: url(../assets/bg.jpg) no-repeat center center;
		background-size: 100% 100%;
	}
	.form_container {
		width: 370px;
		height: 210px;
		position: absolute;
		top: 10%;
		left: 34%;
		padding: 25px;
		border-radius: 5px;
		text-align: center;
	}
	.form_container .manage_tip .title {
		font-family: "Microsoft YaHei";
		font-weight: bold;
		font-size: 26px;
		color: #fff;
	}
	.registerForm {
		margin-top: 20px;
		background-color: #fff;
		padding: 20px 40px 20px 20px;
		border-radius: 5px;
		box-shadow: 0px 5px 10px #cccc;
	}

	.submit_btn {
		width: 100%;
	}
</style>
