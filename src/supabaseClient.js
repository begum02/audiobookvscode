import { createClient } from '@supabase/supabase-js';

// .env dosyasındaki ortam değişkenlerini alıyoruz
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// Eğer URL veya anahtar eksikse hata mesajı verelim
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Key is missing");
}

// Supabase istemcisini oluşturuyoruz
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
