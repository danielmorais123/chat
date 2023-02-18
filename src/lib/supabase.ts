import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bwbvxakwaugpepawvwoj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3YnZ4YWt3YXVncGVwYXd2d29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYxNDI3NTAsImV4cCI6MTk5MTcxODc1MH0.DP6DrtG7LWhBPOf_O7wZxNo246YM6LrDVtwKqQs-KQI"


export const supabase = createClient(supabaseUrl, supabaseKey)