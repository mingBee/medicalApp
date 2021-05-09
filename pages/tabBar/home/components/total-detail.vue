<template>
	<view class="container">
		
		<view class="flex-center tab-part">
			<text class="flex-1 item" @click="choiceType('person')" :class="{active:sign ==='person'}">个人全年累计情况</text>
			<text class="flex-1 item" @click="choiceType('department')"  :class="{active:sign ==='department'}" v-if="!isDoc">科室累计情况</text>
		</view>
		
		<view class="flex-between main">
			
			<view class="detail-part">
				
				<view class="item" @click="goToHistory">
					<text class="title">{{sign ==='person'?'申请次数':'违规医生'}}：</text>
					<view class="flex-center flex-dir-row num-area">
						<text class="num" :class="{'times':sign ==='person'}">{{sign ==='person'?info.person.batchs:info.dept.doctorSize || 0}}</text>
						<text class="sign">次</text>
					</view>
					
				</view>
				
				<view class="item">
					<text class="title">拟扣款：</text>
					<view class="flex-center flex-dir-row num-area">
						<text class="num">{{sign ==='person'?info.person.batchTotal:info.dept.deptTotal || 0}}</text>
						<text class="sign">元</text>
					</view>
				</view>
				
				<view class="item">
					<text class="title">违规记录：</text>
					<view class="flex-center flex-dir-row num-area">
						<text class="num">{{sign ==='person'?info.person.batchVioSize:info.dept.deptVioSize || 0}}</text>
						<text class="sign">条</text>
					</view>
					
				</view>
				
			</view>
			
			<text class="detail-btn" v-if="sign ==='department'" @click="goToDetail">查看明细</text>

			
		</view>
		
	</view>
</template>

<script>
	import { personCollect, depatCollect } from "@/fetch/api/home/index.js"
	export default {
		data(){
			return {
				sign:'person',
				info:{
					person:{},
					dept:{},
				},
				isDoc:true
			}
		},
		mounted(){
			this.userInfo = uni.getStorageSync('userInfo');
			this.hosId = uni.getStorageSync('hosId');
			this.isDoc = this.userInfo.docTitle === "主治医生"? true : false;
			this.personCollect();
		},
		methods:{
			//个人累计情况
			personCollect(){
				let params = {
					hosId:this.hosId,
					userId:this.userInfo.userId
				};
				personCollect(params).then(res=>{
					this.info.person = res;
				})
			},
			//科室累计情况
			depatCollect(){
				let params = {
					hosId:this.hosId,
					userId:this.userInfo.userId,
					deptNm:this.userInfo.deptNm
				}
				depatCollect(params).then(res=>{
					this.info.dept = res;
				})
			},
			choiceType(sign){
				this.sign = sign;
				if(sign ==="person"){
					this.personCollect();
				}else{
					this.depatCollect();
				}
			},
			goToDetail(){
				uni.navigateTo({
					url: '/pages/home/depart-detail'
				});
			},
			goToHistory(){
				if(this.sign ==='person'){
					uni.navigateTo({
						url: '/pages/home/history'
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		box-sizing: border-box;
	}
	.tab-part {
		background-color: #5677FC;
		box-shadow: 0 2px 5px rgba(0,0,0,.5);
		color:#fff;
	}
	.tab-part .item {
		display: inline-block;
		box-sizing: border-box;
		padding:20rpx 0;
		text-align: center;
		color:rgba(255,255,255,0.7);
		border-bottom: 2px solid #5677FC;
			font-size: 30rpx;
	}
	.tab-part .item.active {
		border-color: #fff;
		color: #fff;
	}
	
	.main {
		align-items: flex-start;
		padding:15rpx 35rpx;
	}
	
	.main .detail-part .item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding:15rpx 0;
	}
	
	.main .detail-part .item .title{
		font-size: 30rpx;
		font-weight: 600;
		min-width: 160rpx;
	}
	
	.main .detail-part .item .num{
		color:#18ACED;
		margin:0 15rpx;
		font-size: 33rpx;
	}
	
	.main .detail-part .item .sign{
		font-size: 30rpx;
	}
	
	.main .detail-part .item .times{
		text-decoration: underline;
	}
	
	.main .detail-btn {
		align-self: center;
		background-color: #007AFF;
		color:#fff;
		border-radius: 15rpx;
		padding:13rpx 25rpx;
		font-size: 28rpx;
	}
	
</style>
