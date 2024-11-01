import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Button from '../components/AuthButton'
import Header from '../components/AuthenHeading'
import Background from '../components/Background'
import Logo from '../components/Logo'
import TextInput from '../components/TextInput'
import { colors } from '../constants/tokens'
import useSignUp from '../services/auth/useSignUp'
import {
	confirmPasswordValidator,
	emailValidator,
	nameValidator,
	passwordValidator,
} from '../utils/helpers'

export default function RegisterScreen() {
	const navigation = useNavigation()
	const { signUp, isLoading: isLoadingSignUp } = useSignUp()
	// const { createUser, isLoading: isLoadingCreateUser } = useCreateUser()
	const [name, setName] = useState({ value: '', error: '' })
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })
	const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })

	const onSignUpPressed = () => {
		const nameError = nameValidator(name.value)
		const emailError = emailValidator(email.value)
		const passwordError = passwordValidator(password.value)
		const confirmPasswordError = confirmPasswordValidator(password.value, confirmPassword.value)
		if (emailError || passwordError || nameError || confirmPasswordError) {
			setName({ ...name, error: nameError })
			setEmail({ ...email, error: emailError })
			setPassword({ ...password, error: passwordError })
			setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
			return
		}
		signUp(
			{ email: email.value, password: password.value, fullName: name.value },
			{
				onSettled: () => {
					setEmail({ value: '', error: '' })
					setPassword({ value: '', error: '' })
					setConfirmPassword({ value: '', error: '' })
					setName({ value: '', error: '' })
				},
			},
		)
	}

	return (
		<Background>
			<Logo />
			<Header title="Đăng ký" />
			<TextInput
				label="Name"
				returnKeyType="next"
				value={name.value}
				onChangeText={(text) => setName({ value: text, error: '' })}
				error={!!name.error}
				errorText={name.error}
				placeHolder="Name"
			/>
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
			<TextInput
				label="Confirm Password"
				returnKeyType="done"
				value={confirmPassword.value}
				onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
				error={!!confirmPassword.error}
				errorText={confirmPassword.error}
				secureTextEntry
				placeHolder="Confirm Password"
			/>
			<Button title={`${isLoadingSignUp ? 'Đang tải...' : 'Đăng ký'}`} onPress={onSignUpPressed} />
			<View style={styles.row}>
				<Text style={{ color: colors.white }}>Bạn đã có tài khoản? </Text>
				<TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Login')}>
					<Text style={styles.link}>Đăng nhập ngay!</Text>
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
