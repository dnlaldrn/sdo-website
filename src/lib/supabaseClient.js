import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  "https://otwgzarfujqjoimlbcgi.supabase.co";

const supabaseAnonKey =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90d2d6YXJmdWpxam9pbWxiY2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MjIyNDcsImV4cCI6MjEwMzM5ODI0N30.pRXr8hPnUkj7ilEXOh4T_Iivcq7NYhquftofQuS8X-w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
