import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeStringData = async (value, key) => {
	try {
		await AsyncStorage.setItem(key, value)
	} catch (e) {
		console.log(e)
	}
}

export const storeObjData = async (value, key) => {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue)
	} catch (e) {
		console.log(e)
	}
}

export const getStringData = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key)
		if (value !== null) {
			return value
		} else throw new Error('Could not find data for key ' + key)
	} catch (e) {
		console.log(e)
	}
}
export const getObjData = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key)
		return jsonValue != null ? JSON.parse(jsonValue) : null
	} catch (e) {
		console.log(e)
	}
}
