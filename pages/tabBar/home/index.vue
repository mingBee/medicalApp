<template>
	<view>
		<fun-bar></fun-bar>
		<swiper-comp></swiper-comp>
		<chart-comp></chart-comp>
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

			}
		},
		onLoad(){
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
					
				})
			}
		}
	}
</script>

<style>

</style>