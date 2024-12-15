// recommendations.js
const { spawn } = require('child_process');
const path = require('path');
const { getUserRatings, getBooks } = require('./pythoncontentdata');

// Kullanıcıya ait kitapları öneren fonksiyon
const recommendBooksBasedOnContent = async (userId) => {
  // Kullanıcı puanlarını ve kitapları al
  const userRatings = await getUserRatings(userId);
  const books = await getBooks();

  // Python betiğini çalıştır
  const pythonProcess = spawn('python3', [
    path.join(__dirname, 'content_based_recommendation.py'),
    JSON.stringify(userRatings),
    JSON.stringify(books)
  ]);

  return new Promise((resolve, reject) => {
    pythonProcess.stdout.on('data', (data) => {
      const recommendations = JSON.parse(data.toString());
      resolve(recommendations);  // Önerilen kitapları döndür
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Error:', data.toString());
      reject(data.toString());
    });
  });
};

module.exports = { recommendBooksBasedOnContent };
