import { createClient } from "@supabase/supabase-js";

const URL = "https://zkaylrkvxrbcvncpoqpq.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprYXlscmt2eHJiY3ZuY3BvcXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwNjE4NjEsImV4cCI6MjAxNTYzNzg2MX0.-q85oMSBIPX0orOBwnFaNiXwopJLa518GYWEXwQxx_I";

export const supabase = createClient(URL, API_KEY);