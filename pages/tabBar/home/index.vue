<template>
	<view>
		
		<swiper-comp></swiper-comp>
		<chart-comp></chart-comp>
		<total-detail></total-detail>
		
	</view>
</template>

<script>
	import swiperComp from './components/swiper/swiper'
	import chartComp from './components/ucharts'
	import totalDetail from './components/total-detail'
	export default {
		components:{
			swiperComp,
			chartComp,
			totalDetail
		},
		data() {
			return {

			}
		}
	}
</script>

<style>

</style>