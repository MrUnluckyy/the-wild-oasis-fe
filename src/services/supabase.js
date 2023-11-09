import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jtuvliszicykclurccam.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0dXZsaXN6aWN5a2NsdXJjY2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4NTczNjUsImV4cCI6MjAwOTQzMzM2NX0.3ypd5P0sawW6RiswVh4YWB021V64_EzV6wz11s7gkNc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
