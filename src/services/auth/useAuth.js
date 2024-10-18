// src/hooks/useAuth.js
import { useEffect, useState } from 'react'
import { getObjData, storeObjData } from '../../hooks/useAsyncStorage'
import { supabase } from '../../utils/supabase'

export const useAuth = () => {
	const [session, setSession] = useState(null)

	useEffect(() => {
		const fetchSession = async () => {
			const existingSession = await getObjData('supabaseSession')
			if (existingSession) {
				setSession(existingSession)
			}
		}

		fetchSession()

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_, session) => {
			setSession(session)
			storeObjData(session, 'supabaseSession')
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [])

	return { session }
}
