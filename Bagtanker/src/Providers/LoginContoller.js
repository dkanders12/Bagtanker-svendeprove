import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ywngicbnevnlnjsihxcj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3bmdpY2JuZXZubG5qc2loeGNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwOTgyMjUsImV4cCI6MjAzODY3NDIyNX0.mTcPzUrl6m42JTzKsh5ZWpBG1Qmius1KZOl8qb5nxe0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
