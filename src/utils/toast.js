import { BaseToast, ErrorToast } from 'react-native-toast-message'

export const toastConfig = {
	/*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
	success: (props) => (
		<BaseToast
			{...props}
			style={{ borderLeftColor: 'green' }}
			contentContainerStyle={{ paddingHorizontal: 15 }}
			text1Style={{
				fontSize: 15,
				fontWeight: '400',
			}}
		/>
	),
	/*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
	error: (props) => (
		<ErrorToast
			{...props}
			style={{ borderLeftColor: 'red' }}
			text1Style={{
				fontSize: 15,
			}}
			text2Style={{
				fontSize: 15,
			}}
		/>
	),
}
