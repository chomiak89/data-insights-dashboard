import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sppcpgjgcrjzzdzyzxmt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcGNwZ2pnY3Jqenpkenl6eG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NTQ2ODksImV4cCI6MjA2MTIzMDY4OX0.3wy4biSWSlsPmeEq9pl_F-KKO641COCfN69LA6eRNHg";

export const supabase = createClient(supabaseUrl, supabaseKey);
