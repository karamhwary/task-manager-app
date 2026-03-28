import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hvnzzheyjqfkqkrmkabm.supabase.co";
const supabaseAnonKey = "sb_publishable_iED6JOgEJnKY8v58U9IH1A_O0-QTvFJ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
