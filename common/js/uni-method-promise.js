function setStorage(key,data){
	return new Promise((resolve,reject)=>{
		uni.setStorage({
			key: key,
			data: data,
			success: resolve,
			fail:reject
		});
	})
}

function setStorageSync(key,data){
	return new Promise((resolve,reject)=>{
		try {
			uni.setStorageSync(key, data);
			resolve();
		} catch (e) {
			reject(e);
		}
	})
}

function getStorageSync(key){
	return new Promise((resolve,reject)=>{
		try {
			const value = uni.getStorageSync(key);
			if (value) {
				resolve(value);
			}
		} catch (e) {
			reject(e);
		}
	})
}

export default {
	setStorage,
	setStorageSync,
	getStorageSync
}