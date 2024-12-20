import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Button from '../components/AuthButton'
import Header from '../components/AuthenHeading'
import Background from '../components/Background'
import Logo from '../components/Logo'
import TextInput from '../components/TextInput'
import { colors } from '../constants/tokens'
import useSignIn from '../services/auth/useSignIn'
import { emailValidator, passwordValidator } from '../utils/helpers'

export default function LoginScreen() {
	const navigation = useNavigation()
	const { isLoadingSignIn, signIn } = useSignIn()
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })

	const onLoginPressed = () => {
		const emailError = emailValidator(email.value)
		const passwordError = passwordValidator(password.value)
		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError })
			setPassword({ ...password, error: passwordError })
			return
		}

		signIn(
			{ email: email.value, password: password.value },
			{
				onSettled: () => {
					setEmail({ value: '', error: '' })
					setPassword({ value: '', error: '' })
				},
			},
		)
	}

	return (
		<Background>
			<Logo />
			<Header title="Đăng nhập" />
			<TextInput
				label="Email"
				returnKeyType="next"
				value={email.value}
				onChangeText={(text) => setEmail({ value: text, error: '' })}
				error={!!email.error}
				errorText={email.error}
				autoCapitalize="none"
				autoCompleteType="email"
				textContentType="emailAddress"
				keyboardType="email-address"
				placeHolder="Email"
			/>
			<TextInput
				label="Password"
				returnKeyType="done"
				value={password.value}
				onChangeText={(text) => setPassword({ value: text, error: '' })}
				error={!!password.error}
				errorText={password.error}
				secureTextEntry
				placeHolder="Password"
			/>
			<Button title={`${isLoadingSignIn ? 'Đang tải...' : 'Đăng nhập'}`} onPress={onLoginPressed} />
			<View style={styles.row}>
				<Text style={{ color: colors.white }}>Bạn chưa có tài khoản? </Text>
				<TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Register')}>
					<Text style={styles.link}>Đăng ký ngay!</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.row}></View>
		</Background>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		marginTop: 4,
	},
	link: {
		fontWeight: 'bold',
		color: colors.primary,
	},
})
