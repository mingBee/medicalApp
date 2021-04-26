<template>
	<view class="wrap">
		
		<view class="title-part">
			<text class="sign">*</text>
			<text class="content">问题描述</text>
		</view>
		<textarea class="reason-part" auto-height placeholder="请填写您的问题或建议" v-model="form.reason"/>
		
		<view class="title-part">
			<text class="sign">*</text>
			<text class="content">联系方式</text>
		</view>
		<textarea class="contact-part" auto-height placeholder="请留下您的联系方式，手机号、微信、QQ，便于联系" v-model="form.contact"/>
		
		<view class="loginBtn">
			<text class="btnValue">提交</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				form :{
					reason:'',
					contact:''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		box-sizing: border-box;
		padding:40rpx 20rpx 0;
	}
	.title-part {
		padding:20rpx;
		.sign {
			color:rgba(252, 8, 8, 1);
			margin-right:5rpx;
			position: relative;
			top:3rpx;
		}
		.content {
			font-size: 28rpx;
		}
	}
	.reason-part {
		box-sizing: border-box;
		width:680rpx;
		min-height:200rpx;
		border:1px solid #ccc;
		padding:15rpx;
		border-radius: 10rpx;
		font-size: 29rpx;
	} 
	.contact-part {
		box-sizing: border-box;
		width:680rpx;
		min-height:100rpx;
		border:1px solid #ccc;
		padding:15rpx;
		border-radius: 10rpx;
		font-size: 29rpx;
	}
	
	.loginBtn{
		width: 95%;
		height: 75rpx;
		background: #377EB4;
		border-radius: 50rpx;
		margin: 50px auto 0;
		display: flex;
		justify-content: center;
		align-items: center;
		.btnValue{
			color: white;
		}
	}	
</style>
