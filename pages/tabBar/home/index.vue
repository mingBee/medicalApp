<template>
	<view>
		<fun-bar></fun-bar>
		<swiper-comp></swiper-comp>
		<view class="flex-between flex-dir-row tip-part" v-if="tipSign">
			<text class="content">{{tip}}</text>
			<text class="close-sign" @click="closeTip">x</text>
	 </view>
		
<!-- 		<view class="notify-part">
			<p class="item"></p>
		</view> -->
		
		<chart-comp :cdata="info" v-if="hasAppeal"></chart-comp>
		<view v-else class="no-appeal-part">
			<text class="txt">医保中心暂未下发申诉内容!!</text>
		</view>
		<total-detail></total-detail>
		
	</view>
</template>

<script>
	import funBar from '@/pages/common-comp/fun-bar.vue'
	import swiperComp from './components/swiper/swiper'
	import chartComp from './components/ucharts'
	import totalDetail from './components/total-detail'
	import { getDetail } from "@/fetch/api/home/index.js"

	export default {
		components:{
			funBar,
			swiperComp,
			chartComp,
			totalDetail
		},
		data() {
			return {
				info:{},
				tip:'本次您的违规记录在本科室相对良好，请继续保持！',
				tipSign:true,
				isDoc:true,
				hasAppeal:false
			}
		},
		onShow(){
			this.userInfo = uni.getStorageSync('userInfo');
			this.hosId = uni.getStorageSync('hosId');
			this.isDoc = this.userInfo.docTitle === "主治医生"?true:false;
			
			this.getDetail();
		},
		methods:{
			getDetail(){
				let params = {
					userId:this.userInfo.userId,
					hosId:this.hosId,
					batchId:100
				}
				getDetail(params).then(res=>{
					this.info = res;
					let totalAppeal = Number(this.info.noAppealNum) + Number(this.info.hasAppealNum);
					this.hasAppeal =  totalAppeal === 0? false:true;
					if(this.info && (this.info.noAppealNum || this.info.hasAppealNum)){
						let total = this.info.noAppealNum + this.info.hasAppealNum;
						if(total> 15){
							this.tip = "本次您的违规记录在本科室内相对较多，还请规范行为！";
						}
					}
				})
			},
			/**
			 * 关闭tip
			 */
			closeTip(){
				this.tipSign = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tip-part {
		position: fixed;
		top:30rpx;
		left:0;
		right:0;
		padding:10rpx 25rpx;
		background-color: rgba(255,255,0,0.3);
		z-index: 1;
		
		.content {
			font-size: 26rpx;
			color: #333;
		}
		.close-sign {
			display: inline-block;
			width:27rpx;
			height:27rpx;
			line-height: 23rpx;
			border-radius: 50%;
			border:1px solid #333;
			text-align: center;
			font-size: 26rpx;
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
	
	.no-appeal-part {
		padding:30rpx;
		text-align: center;
		.txt {
			font-size: 30rpx;
			color: #333;
		}
	}
</style>