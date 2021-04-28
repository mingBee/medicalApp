
<template>
	<view class="content">
		
		<view class="form">
			
			<view class="inputWrapper">
				<input class="input" type="text" v-model="form.oldPsd" placeholder="请输入原密码"/>
			</view>	
			
			<view class="inputWrapper">
				<input class="input" type="text" v-model="form.newPsd" placeholder="请输入新密码"/>
			</view>	
			
			<view class="inputWrapper">
				<input class="input" type="text" v-model="form.confirmPsd" placeholder="请再次输入密码"/>
			</view>	
			
			<view class="loginBtn" @click="resetPwd">
				<text class="btnValue">提交</text>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import { resetPwd } from "@/fetch/api/me/index.js"
	export default {
		data() {
			return {
        form:{
          oldPsd:'',
          newPsd:'',
					confirmPsd:''
        }
			}
		},
		onLoad() {
      
		},
		methods: {
			/**
			 * 重置密码
			 */
			resetPwd(){
				let params = {
					oldPassword:this.form.oldPsd,
					newPassword:this.form.newPsd,
					confirmPassword:this.form.confirmPsd
				}
				resetPwd(params).then(res=>{
					uni.showToast({
					    title: '密码重置成功',
							icon:'none'
					});
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.content {
		box-sizing: border-box;
		width: 100vw;
		padding:100rpx 100rpx 0;
	}
	.header {
		font-size: 60rpx;
		text-align: center;
		color:#fff;
	}
	.form{
		margin-top: 80rpx;
		.inputWrapper{
			position: relative;
			width: 100%;
			height: 75rpx;
			background: white;
			border-radius: 20px;
			box-sizing: border-box;
			padding: 0 20px;
			margin-top: 25px;
			border:1px solid #377EB4;
			.input{
				width: 100%;
				height: 100%;
				text-align: left;
				font-size: 15px;
			}
		}
	}
	
	.loginBtn{
		width: 100%;
		height: 75rpx;
		background: #377EB4;
		border-radius: 50rpx;
		margin-top: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		.btnValue{
			color: white;
		}
	}	
	
</style>