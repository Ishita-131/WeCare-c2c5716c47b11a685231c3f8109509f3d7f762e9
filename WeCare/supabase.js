import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jfougwzmuhrmwybyhepi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmb3Vnd3ptdWhybXd5YnloZXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMjMzNzQsImV4cCI6MjAyNjU5OTM3NH0.eB-l3dCXqe14uqcniDj8ByMOj9djZN5quE4H3RMHq-o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
console.log(supabase.auth.onAuthStateChanged);
