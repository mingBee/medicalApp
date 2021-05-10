
<template>
	<view class="content">
		
		<view class="header">重置密码</view>
		
		<view class="form">
			
			<view class="inputWrapper">
				<input class="input" type="text" v-model="form.psd" placeholder="请输入新密码"/>
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" v-model="form.confirmPsd" placeholder="请输入再次密码"/>
			</view>
			
			<view class="loginBtn" @click="updatePassword">
				<text class="btnValue">确认并登录</text>
			</view>
			
			<view class="flex-end flex-dir-row bottom-part">	
				
				<view class="forgot-btn" @click="goToDisablePhonePage">
					<text>手机号不可用？</text>
				</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	import { updatePassword, getUserInfo ,saveClient } from "@/fetch/api/admin/index.js"
	export default {
		data() {
			return {
        form:{
          psd:'',
					confirmPsd:''
        }
			}
		},
		onLoad(option) {
      this.phone = option.phone;
		},
		methods: {
			/**
			 * 修改密码
			 */
			updatePassword(){
				if(this.form.psd!==this.form.confirmPsd){
					uni.showToast({
					    title: '两次输入的密码不一致',
							icon:'none'
					});
					return
				}
				let params = {
					phonenumber:this.phone,
					newPassword:this.form.psd
				};
				updatePassword(params).then(res=>{
					if(res){
						uni.showLoading({
							title: '密码修改成功，登录中...'
						});	
						this.loginSet(res);
					}else{
						uni.showToast({
							title: '密码修改成功，未获取令牌，请手动登录',
							icon:'none',
							duration: 1500
						});
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/admin/login'
							});
						},1500)
					}
				})
			},
			loginSet(res){
				//缓存token
				this.$uniPromiseMethods.setStorageSync('token',res).then(StorageRes=>{
					console.log('成功缓存token');
					getUserInfo().then(userInfoRes=>{
						let userInfo = {
							userId:userInfoRes.userId,
							docTitle:userInfoRes.docTitle,
							deptNm:userInfoRes.deptNm,
							hosId:userInfoRes.hosId
						}
						setTimeout(()=>{
							let token = uni.getStorageSync('token');
							if(!token) return;
							let prinf = plus.push.getClientInfo();
							let cid = prinf.clientid;
							let clientParams = {
								userId:userInfoRes.userId,
								clientId:cid
							};
							saveClient(clientParams).then(clientRes=>{
								console.log('提交client成功 -- ' + cid );
							})
						},10000)
						this.$uniPromiseMethods.setStorageSync('userInfo',userInfo).then(userStorage=>{
							console.log('成功缓存用户信息');
							uni.showToast({
									title: '登录成功',
									icon:'none',
									duration: 1300
							});
							setTimeout(()=>{
								uni.hideLoading();
								this.goTo_home();
							},1300)
						})
					})
				})
			},
			/**
			 * 跳转到tab 首页 home
			 */
			goTo_home() {
				uni.switchTab({
					url: '../tabBar/home/index'
				})
			},
			/**
			 * 跳转到手机不可用页 打电话解决问题后重新登录
			 */
			goToDisablePhonePage(){
				uni.navigateTo({
					url: '/pages/admin/disablePhone'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.content {
		box-sizing: border-box;
		background: #377EB4;
		width: 100vw;
		height: 100vh;
		padding:210rpx 100rpx 0;
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
			&.code-part {
				padding-right: 180rpx;
			}
			.input{
				width: 100%;
				height: 100%;
				text-align: left;
				font-size: 15px;
			}
			.code-btn {
				position: absolute;
				right:20rpx;
				top:10rpx;
				height:55rpx;
				line-height: 55rpx;
				width:160rpx;
				text-align: center;
				background-color: #1CAFF9;
				color:#fff;
				font-size: 27rpx;
				border-radius: 10rpx;
			}
		}
	}
	
	.loginBtn{
		width: 100%;
		height: 75rpx;
		background: #77B307;
		border-radius: 50rpx;
		margin-top: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		.btnValue{
			color: white;
		}
	}
	
	.bottom-part {
		margin-top: 50rpx;
		.forgot-btn{
			text-align: center;
			color: #EAF6F9;
			font-size: 26rpx;
		}
	}
	
</style>