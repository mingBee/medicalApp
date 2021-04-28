<template>
	<view>
		<fun-bar></fun-bar>
		<swiper-comp></swiper-comp>
		
		<view class="notify-part">
			<p class="item" v-if="info.batchDes">{{info.batchDes}}，截止日期：{{info.endTime}}</p>
		</view>
		
		<chart-comp :cdata="info"></chart-comp>
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
				info:{}
			}
		},
		onShow(){
			this.getDetail();
		},
		methods:{
			getDetail(){
				let params = {
					userId:101,
					hosId:100,
					batchId:100
				}
				getDetail(params).then(res=>{
					this.info = res;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notify-part {
		margin:15rpx 0;
		.item {
			padding:10rpx 15px;
			background-color: #FEFBE8;
			color:#E5A046;
			font-size: 25rpx;
		}
	}
</style>