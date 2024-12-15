# content_based_recommendation.py
import sys
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_books_based_on_content(books, user_ratings):
    """
    Kullanıcının yüksek puan verdiği kitapların içeriklerine dayanarak öneri yapar.
    """
    # Kullanıcının yüksek puan verdiği kitapları al
    rated_books = [book for book in books if any(rating['book_id'] == book['id'] and rating['rating'] > 4 for rating in user_ratings)]
    
    # Kitap açıklamalarını al
    descriptions = [book['description'] for book in rated_books]
    
    # TF-IDF vektörizasyonu
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(descriptions)
    
    # Cosine Similarity hesaplama
    cosine_similarities = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    # Kitapları ve benzerliklerini eşleştir
    book_similarity_scores = []
    for idx, book in enumerate(rated_books):
        similarity_score = np.mean(cosine_similarities[idx])  # Ortalamayı alıyoruz
        book_similarity_scores.append({'book': book, 'similarity': similarity_score})
    
    # Kitapları benzerlik skorlarına göre sırala
    book_similarity_scores.sort(key=lambda x: x['similarity'], reverse=True)
    
    # En yüksek benzerliğe sahip 5 kitap
    top_books = [item['book'] for item in book_similarity_scores[:5]]
    
    return top_books

if __name__ == "__main__":
    user_ratings = json.loads(sys.argv[1])  # Kullanıcı puanları
    books = json.loads(sys.argv[2])  # Kitaplar
    
    recommended_books = recommend_books_based_on_content(books, user_ratings)
    
    # Önerilen kitapları JSON olarak döndür
    print(json.dumps([book['title'] for book in recommended_books]))
