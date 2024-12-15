const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const {
  registerUser,
  loginUser,
  getUsers,
  verifyToken
} = require("./src/auth"); // Örnek auth işlemleri
const { fetchCategories, getBooksByCategoryId } = require("./src/categories");
const { getPopularBooks, getLatestBooks } = require("./src/books");
const { addBookToPlayerList, removeBookFromPlayerList, getPlayerBooks } = require('./src/playerList')

const app = express();

// CORS ayarları
const corsOptions = {
  origin: "*", // Güvenli CORS yapılandırması için gerektiğinde URL belirleyebilirsiniz
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());

// Router
const router = express.Router();

// Kullanıcı işlemleri
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const result = await registerUser({ username, email, password });
  return res.status(result.success ? 200 : 400).json(result);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser({ email, password });
  return res.status(result.success ? 200 : 400).json(result);
});

router.get("/users", verifyToken, async (req, res) => {
  const result = await getUsers();
  return res.status(result.success ? 200 : 400).json(result);
});

// Kategoriler
router.get("/categories", async (req, res) => {
  const result = await fetchCategories();
  return res.status(result.success ? 200 : 400).json(result);
});

router.get("/categories/:categoryId/books", async (req, res) => {
  const categoryId = req.params.categoryId;
  const result = await getBooksByCategoryId(categoryId);
  if (result.success) {
    res.json(result.books);
  } else {
    res.status(400).json({ error: result.message || result.error });
  }
});

// Popüler ve yeni çıkan kitaplar
router.get("/popular-books", async (req, res) => {
  const books = await getPopularBooks();
  res.status(200).json(books);
});

router.get("/latest-books", async (req, res) => {
  const books = await getLatestBooks();
  res.status(200).json(books);
});

// Token test route'u
router.get("/test-token", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token is valid", userId: req.userId });
});

// Playlist işlemleri
router.post("/player-list/add", verifyToken, async (req, res) => {
  const { bookId } = req.body; // Kitap ID'si
  const userId = req.userId; // Giriş yapan kullanıcı
  const result = await addBookToPlayerList(userId, bookId);
  return res.status(result.success ? 200 : 400).json(result);
});

router.post("/player-list/remove", verifyToken, async (req, res) => {
  const { bookId } = req.body; // Kitap ID'si
  const userId = req.userId; // Giriş yapan kullanıcı
  const result = await removeBookFromPlayerList(userId, bookId);
  return res.status(result.success ? 200 : 400).json(result);
});

router.get("/player-list", verifyToken, getPlayerBooks);


// API rotalarını bağla
app.use("/api", router);

// Lokal sunucu başlatma
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
