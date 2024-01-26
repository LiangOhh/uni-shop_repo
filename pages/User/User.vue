<template>
	<view>
		<MyUser v-if="!token"></MyUser>
		<MyInfo v-else></MyInfo>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		computed: {
			...mapState('m_user', ['token'])
		}
	}
</script>

<style>

</style>