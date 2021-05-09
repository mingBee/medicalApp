<template>
	<view>
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @click="goToPolicyDetail(item.adLink)">
				<view class="swiper-item">
					<image :src="item.adImg" mode="" class="swiper-img"></image>
				</view>
			</swiper-item>
			
<!-- 			<swiper-item>
				<view class="swiper-item uni-bg-blue">
					<image src="../../../../../static/img/home/swiper_img.png" mode="" class="swiper-img"></image>
				</view>
			</swiper-item> -->
		</swiper>

	</view>
</template>
<script>
	import { getAllAdInfos } from "@/fetch/api/home/index.js"
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
				swiperList:[]
			}
		},
		mounted(){
		this.getAllAdInfos();
		},
		methods: {
			/**
			 * 获取轮播图列表
			 */
			getAllAdInfos(){
				getAllAdInfos().then(res=>{
					this.swiperList = res.map(i=>{
						return {
							adImg:i.adImg,
							adLink:i.adLink
						};
					});
				})
			},
			goToPolicyDetail(id){
				uni.setStorage({
				    key: 'policyId',
				    data: id,
				    success: function () {
							uni.navigateTo({
								url: '/pages/policy/detail'
							});
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		height: 350rpx;
	}
	.swiper-item {
		display: block;
		height: 350rpx;
		line-height: 350rpx;
		text-align: center;
		.swiper-img {
			width:750rpx;
			height:350rpx;
		}
	}
/* 	.uni-bg-red {
		background-color: #ff5a5f;
	}
	
	.uni-bg-green {
		background-color: #09bb07;
	}
	
	.uni-bg-blue {
		background-color: #007aff;
	} */

</style>
