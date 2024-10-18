import { supabase } from '../utils/supabase'

export async function signIn({ email, password }) {
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		console.error(error)
		throw new Error('Email or password is not correct')
	}

	return data
}

export async function signUp({ email, password, fullName }) {
	let { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: '',
			},
		},
	})

	if (error) {
		console.error(error)
		throw new Error(error.message)
	}

	return data
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession()
	if (!session.session) return null

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser()

	if (error) {
		console.error(error)
		throw new Error(error.message)
	}

	return user
}

export async function logout() {
	let { error } = await supabase.auth.signOut()
	if (error) {
		console.error(error)
		throw new Error(error.message)
	}
}
