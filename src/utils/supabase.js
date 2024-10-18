import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://skbrgbnyslzlrwguuqkb.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYnJnYm55c2x6bHJ3Z3V1cWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTc1NDksImV4cCI6MjA0NDYzMzU0OX0.MJlWil5Im-urKtKCz7TvuDlIDdjTArt5vsN935zNo4g'
// const supabase = createClient(supabaseUrl, supabaseKey);
// export default supabase

// export const supabase = createClient(supabaseUrl, supabaseKey, {
// 	localStorage: AsyncStorage,
// 	autoRefreshToken: true,
// 	persistSession: true,
// 	detectSessionInUrl: false,
// })

export const supabase = createClient(supabaseUrl, supabaseKey)
