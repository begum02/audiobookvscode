


const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Token bulunamadı, erişim reddedildi.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId; // Burada userId'nin doğru ayarlandığından emin olun
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Geçersiz token' });
  }
};

