const { supabase } = require('./supabaseClient'); // Supabase client'ı dışa aktarılıyor
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Kullanıcı kaydı fonksiyonu
const registerUser = async ({ username, email, password }) => {
  try {
    // E-posta ile mevcut kullanıcıyı sorguluyoruz
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    if (checkError) {
      console.error(checkError);
      throw new Error(checkError.message);
    }

    // Eğer kullanıcı zaten varsa hata dönüyoruz
    if (existingUser.length > 0) {
      return { success: false, error: 'Bu e-posta adresi zaten kayıtlı.' };
    }

    // Şifreyi hash'liyoruz
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcıyı ekliyoruz
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, email, password: hashedPassword }]);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    // JWT token oluşturma
    const token = jwt.sign(
      { id: data[0].id, email: data[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token 1 saat geçerli
    );

    return { success: true, user: data[0], token };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
};

// Kullanıcı girişi fonksiyonu
const loginUser = async ({ email, password }) => {
  try {
    // Kullanıcıyı e-posta ile arıyoruz
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single(); // .single() kullanarak yalnızca bir kullanıcı döndürüyoruz

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    if (!data) {
      return { success: false, error: 'E-posta adresiyle ilişkili bir kullanıcı bulunamadı.' };
    }

    // Şifreyi doğruluyoruz
    const isPasswordValid = await bcrypt.compare(password, data.password);
    if (!isPasswordValid) {
      return { success: false, error: 'Şifre yanlış.' };
    }

    // JWT token oluşturma
    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.JWT_SECRET, // Ortam değişkeninden alıyoruz
      { expiresIn: '1h' } // Token 1 saat geçerli
    );

    return { success: true, user: data, token };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
};

// Kullanıcıları getirme fonksiyonu
const getUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return { success: true, users: data };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
};

// Token doğrulama fonksiyonu
const verifyToken = (req, res, next) => {
  // Authorization başlığından token'ı alıyoruz
  const token = req.headers['authorization']?.split(' ')[1];

  // Eğer token yoksa hata döndürüyoruz
  if (!token) {
    console.log("Authorization başlığı yok veya token bulunamadı");
    return res.status(403).json({ error: 'Token gerekli' });
  }

  try {
    // Token'ı doğruluyoruz
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Kullanıcı ID'sini request'e ekliyoruz
    console.log("Token doğrulandı:", decoded);
    next(); // Token geçerliyse, bir sonraki middleware'e geçiyoruz
  } catch (err) {
    console.error("Token doğrulama hatası:", err.message);
    res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  verifyToken, // Token doğrulama fonksiyonu dışa aktarıldı
};
