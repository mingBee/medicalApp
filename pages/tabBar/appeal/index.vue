<template>
	<view class="flex flex-dir-column container">
		<fun-bar color="#5677FC"></fun-bar>
		
		<view class="flex tab-part">
			<view class="flex-1 item" @click="choiceType('nofeed')" :class="{active:sign ==='nofeed'}">未申诉</view>
			<view class="flex-1 item" @click="choiceType('havfeed')"  :class="{active:sign ==='havfeed'}">已申诉</view>
		</view>
		
		<view class="notify-part">
			<p class="item">2021年4月批次申诉中，截止日期：2021年4月30日</p>
		</view>
		
		<scroll-view scroll-y="true" class="list" 
		@scrolltoupper="refresh" @scrolltolower="loadmore">
				<view class="item" v-for="(item,index) in appealList" :key="item.id">
					
					<view class="flex flex-dir-row reason-area">
						<view class="sign"></view>
						<view class="title">拒付理由:</view>
						<view class="value">禁忌症：半乳糖血症，肠梗阻，急腹痛。</view>
					</view>
					
					<view class="detail-area">
						<view class="detail-cell">
							<view class="title">参保人：</view>
							<view class="value">{{item.patientNm}}</view>
						</view>
						<view class="detail-cell">
							<view class="title">住院号：</view>
							<view class="value">{{item.hosNum}}</view>
						</view>
						<view class="detail-cell">
							<view class="title">出院诊断：</view>
							<view class="value">{{item.outDiag}}</view>
						</view>
						<view class="detail-cell">
							<view class="title">三目名称：</view>
							<view class="value">{{item.medProName}}</view>
						</view>
						<view class="detail-cell">
							<view class="title">扣款金额：</view>
							<view class="value">{{item.carpayAmount}}元</view>
						</view>
						
						<view class="detail-cell btn-cell">
							<view class="btn" @click="goToAppealForm">申诉</view>
							</view>
					</view>
					
				</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import { getAppealList } from '@/fetch/api/appeal/appeal.js';
	import funBar from '@/pages/common-comp/fun-bar.vue'
	export default {
		components:{
			funBar
		},
		data(){
			return{
				sign:'nofeed',
				appealList:[
					{}
				]
			}
		},
		onShow(){
			this.getAppealList();
		},
		methods:{
			choiceType(sign){
				this.sign = sign;
				this.getAppealList()
			},
			goToAppealForm(item){
				let feedbackId = item.feedbackId;
				uni.navigateTo({
					url: `/pages/appeal/form/index?feedbackId=${feedbackId}`
				});
			},
			/**
			 * 获取申诉列表
			 */
			getAppealList(){
				let params =  {
					userId:101,
					offset:0,
					limit:10,
					feedbackState:this.sign,
					hosId:100,
					batchId:100
				}
				getAppealList(params).then(res=>{
					if(res){
						this.appealList = res.vioInfoNoFeedbacks;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height:calc( 100vh - 100px);
		align-items: stretch;
	}
	.tab-part {
		background-color: #5677FC;
		box-shadow: 0 4px 4px rgba(0,0,0,.5);
		.item {
			box-sizing: border-box;
			padding:20rpx 0;
			text-align: center;
			color:rgba(255,255,255,0.6);
			border-bottom: 2px solid #5677FC;
			&.active {
				border-color: #fff;
				color: #fff;
				font-weight: 600;
			}
		}
	}
	
	.notify-part {
		margin:15rpx 0;
		.item {
			padding:10rpx 15px;
			background-color: #FEFBE8;
			color:#E5A046;
			font-size: 25rpx;
		}
	}
	
	.list {
		flex:1 1 auto;
		height:1px; //添加一个默认高度flex才能生效
		
		.item {
			padding:15rpx 15rpx;
			.reason-area {
				position: relative;
				border:1px solid #ccc;
				padding:15rpx 15rpx;
				.sign {
					position: absolute;
					top:-8rpx;
					left:-8rpx;
					width:16rpx;
					height:16rpx;
					border-radius: 50%;
					background-color: #DD5044;
				}
				.title {
					display: inline-block;
					min-width:200rpx;
				}
			}
			.detail-area {
				border:1px solid #ccc;
				padding:15rpx 15rpx;
				.detail-cell {
					display: flex;
					flex-direction: row;
					padding:10rpx 0;
				}
				.btn-cell {
					justify-content: flex-end;
					padding-right:50rpx;
					.btn {
						background-color: #007AFF;
						color:#fff;
						border-radius: 15rpx;
						padding:6rpx 30rpx;
						font-size: 24rpx;
					}
				}
				
			}
		}
	}
	
</style>
