const { spawn } = require('child_process');
const path = require('path');
const { getUserRatings, getBooks } = require("./pythoncollabrativedata");

// Kullanıcı tabanlı öneri alma ve matris oluşturmayı kapsayan fonksiyon
const getUserRecommendationsWithMatrix = async (req, res) => {
  try {
    const userId = req.userId; // Token'den alınan userId

    // Kullanıcı puanları ve kitapları al
    const userRatings = await getUserRatings();
    const books = await getBooks();

    // Kullanıcı puanlarını matrise dönüştür
    const ratingsMatrix = userRatings.reduce((matrix, rating) => {
      if (!matrix[rating.user_id]) {
        matrix[rating.user_id] = {};
      }
      matrix[rating.user_id][rating.book_id] = rating.rating;
      return matrix;
    }, {});

    // Python betiğini çalıştır
    const pythonProcess = spawn('python3', [
      path.join(__dirname, 'pearson_collaborative_filtering.py'),
      JSON.stringify(userRatings),
      JSON.stringify(books),
      JSON.stringify(ratingsMatrix),
      userId
    ]);

    pythonProcess.stdout.on('data', (data) => {
      const recommendations = JSON.parse(data.toString());
      console.log('Recommended books:', recommendations);
      res.status(200).json(recommendations);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Error:', data.toString());
      res.status(500).json({ success: false, message: 'Error generating recommendations', error: data.toString() });
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: 'Error processing recommendations', error: error.message });
  }
};

module.exports = { getUserRecommendationsWithMatrix };
