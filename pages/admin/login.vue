
<template>
	<view class="content">
		
		<view class="header">登录</view>
		
		<view class="form">
      <view class="inputWrapper" v-if="isFirstLogin">
				<picker @change="bindPickerChange" :range="hospNameList" class="hosp-picker">
						<view class="hosp-picker-view">{{curHosp.hosArev || '请选择医院'}}</view>
				</picker>
				<!-- <input class="input" type="text" v-model="form.hospital" placeholder="请输入医院名称"/> -->
			</view>
			<view class="inputWrapper">
				<input class="input" type="text" v-model="form.jobNum" :placeholder="loginType === 'jobNum' ? '请输入工号':'请输入手机号'"/>
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" v-model="form.psd" placeholder="请输入密码"/>
			</view>
			
			<view class="loginBtn" @click="login">
				<text class="btnValue">登录</text>
			</view>
			
			<view class="flex-between flex-dir-row bottom-part">
				
				<view class="phone-login-btn">
					<text @click="changeLoginType">{{ loginType === 'jobNum' ? "手机登录":"工号登录" }}</text>
				</view>
				
				<view class="forgot-btn" @click="goTo_forgetPsd">
					<text>找回密码</text>
				</view>
				
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import { getAllHosp, login ,getUserInfo } from "@/fetch/api/admin/index.js"
	export default {
		data() {
			return {
        form:{
          hospital:'',
          jobNum:'',
          psd:''
        },
				loginType:'jobNum',
				isFirstLogin:true,
				hospList:[],
				hospNameList:[],
				curHosp:{},
				hosId:''
			}
		},
		onLoad() {
      this.hasChooseHosp();
		},
		methods: {
			/**
			 * 是否选择了医院
			 */
			hasChooseHosp(){
				try {
				    const hosId = uni.getStorageSync('hosId');
				    if (hosId) {
				        this.hosId = hosId;
								this.isFirstLogin = false;
				    }else{
							this.getHospList();
						}
				} catch (e) {
				    // error
						this.getHospList();
				}
			},
			/**
			 * 获取医院列表
			 */
			getHospList(){
				getAllHosp().then(res=>{
					if(res && res.length>0){
						res.forEach(i=>{
							let temp = {
								hosArev:i.hosArev,
								hosId:i.hosId
							};
							this.hospList.push(temp);
							this.hospNameList.push(i.hosArev);
						});
					}else{
						this.hospList = [];
					}
					
				})
			},
			/**
			 * 登录
			 */
			login(){
				// let params = {
				// 	username:this.form.jobNum,
				// 	newPassword:this.form.psd,
				// 	hosId:this.hosId
				// };
				// if( !this.hosId && this.hosId !== 0 ){
				// 	uni.showToast({
				// 	    title: '请选择医院',
				// 			icon:'none'
				// 	});
				// 	return
				// }
				// if( !this.form.jobNum && this.form.jobNum !== 0 ){
				// 	uni.showToast({
				// 	    title: '请输入工号',
				// 			icon:'none'
				// 	});
				// 	return
				// }
				// if( !this.form.psd && this.form.psd !== 0 ){
				// 	uni.showToast({
				// 	    title: '请输入密码',
				// 			icon:'none'
				// 	});
				// 	return
				// }
				let params = {
					username:'15523236998',
					password:'123456',
					hosId:'100'
				};
				
				login(params).then(res=>{
					//缓存hosId
					this.$uniPromiseMethods.setStorage('hosId','100').then(StorageRes=>{
						console.log('成功缓存hosId');
					})
					//缓存token
					if(res){
						this.$uniPromiseMethods.setStorageSync('token',res).then(StorageRes=>{
							console.log('成功缓存token');
							getUserInfo().then(userInfoRes=>{
								let userInfo = {
									userId:userInfoRes.userId,
									docTitle:userInfoRes.docTitle,
									deptNm:userInfoRes.deptNm
								}
								this.$uniPromiseMethods.setStorageSync('userInfo',userInfo).then(userStorage=>{
									console.log('成功缓存用户信息');
									this.goTo_home();
								})
							})
						})
					}
				})
			},
			bindPickerChange(e) {
				let item = this.hospList[e.target.value];
				this.curHosp = item;
				this.hosId = item.hosId;
			},
			changeLoginType(){
				if(this.loginType === "jobNum"){
					this.loginType = "phone";
				}else{
					this.loginType = "jobNum";
				}
				this.form.jobNum='';
				this.form.psd='';
			},
			/**
			 * 跳转到重置密码页
			 */
			goTo_forgetPsd() {
				uni.navigateTo({
					url: '/pages/admin/forgetPsd'
				})
			},
			/**
			 * 跳转到tab 首页 home
			 */
			goTo_home() {
				console.log(111)
				uni.switchTab({
					url: '../tabBar/home/index'
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
		padding:250rpx 100rpx 0;
	}
	.header {
		font-size: 60rpx;
		text-align: center;
		color:#fff;
	}
	.form{
		margin-top: 80rpx;
		.inputWrapper{
			width: 100%;
			height: 75rpx;
			background: white;
			border-radius: 20px;
			box-sizing: border-box;
			padding: 0 20px;
			margin-top: 25px;
			.input{
				width: 100%;
				height: 100%;
				text-align: left;
				font-size: 15px;
			}
		}
		.hosp-picker {
			width:100%;
			height:100%;
			.hosp-picker-view {
				height: 75rpx;
				line-height: 75rpx;
				font-size: 15px;
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
		margin-top: 40rpx;
		padding:0 20rpx;
		.phone-login-btn {
			text-align: center;
			color: #EAF6F9;
			font-size: 28rpx;
		}
		.forgot-btn{
			text-align: center;
			color: #EAF6F9;
			font-size: 28rpx;
		}
	}
	
</style>