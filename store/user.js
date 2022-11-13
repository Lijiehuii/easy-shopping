export default {
	// 开启user的命名空间
	namespaced: true,

	state: () => ({
		// address: JSON.parse(uni.getStorageSync('address') || '')
		address: JSON.parse(uni.getStorageSync('address') || "{}")
	}),
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		}
	},
	getters: {
		addStr(state) {
			if (!state.address.provinceName) {
				return ""
			}
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}
}