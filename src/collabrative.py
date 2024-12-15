# pearson_collaborative_filtering.py
import pandas as pd
import numpy as np
from scipy.stats import pearsonr
import sys
import json

# Pearson korelasyonu ile benzer kullanıcıları bulma ve öneri yapma
def get_pearson_recommendations(user_ratings, books, ratings_matrix, target_user_id, top_n=10):
    # Kullanıcılar arası Pearson korelasyonunu hesapla
    similarity_matrix = {}

    # Tüm kullanıcılar için benzerlik hesapla
    for user_id in ratings_matrix:
        if user_id != target_user_id:
            similarity_matrix[user_id] = pearson_similarity(ratings_matrix[target_user_id], ratings_matrix[user_id])

    # En benzer kullanıcıları sırala
    similar_users = sorted(similarity_matrix.items(), key=lambda x: x[1], reverse=True)[:top_n]
    
    # Benzer kullanıcıların yüksek puan verdiği kitapları öner
    recommended_books = {}
    for user_id, similarity in similar_users:
        user_ratings_for_books = user_ratings[user_ratings['user_id'] == user_id]
        for _, book_id, rating in user_ratings_for_books.values:
            if book_id not in recommended_books:
                recommended_books[book_id] = 0
            recommended_books[book_id] += rating * similarity

    # Önerilen kitapları sıralayarak döndür
    top_books = sorted(recommended_books.items(), key=lambda x: x[1], reverse=True)[:top_n]
    
    recommended_books_info = []
    for book_id, score in top_books:
        book_info = books[books['book_id'] == book_id]
        recommended_books_info.append({
            'title': book_info['title'].values[0],
            'category': book_info['category'].values[0],
            'predicted_score': score
        })

    return recommended_books_info

# Pearson korelasyonunu hesaplamak için fonksiyon
def pearson_similarity(user_ratings_1, user_ratings_2):
    common_books = set(user_ratings_1.keys()).intersection(set(user_ratings_2.keys()))
    if len(common_books) == 0:
        return 0  # Hiçbir ortak kitap yoksa benzerlik sıfır
    ratings_1 = np.array([user_ratings_1[book_id] for book_id in common_books])
    ratings_2 = np.array([user_ratings_2[book_id] for book_id in common_books])
    return pearsonr(ratings_1, ratings_2)[0]  # Pearson korelasyonu döndür

# Eğer veriler JSON formatında gönderildiyse
if __name__ == "__main__":
    user_ratings = json.loads(sys.argv[1])  # Kullanıcı puanları
    books = json.loads(sys.argv[2])  # Kitap bilgileri
    ratings_matrix = pd.DataFrame(json.loads(sys.argv[3]))  # Puanlar matrisi
    target_user_id = int(sys.argv[4])  # Hedef kullanıcı ID'si

    # Önerilen kitapları al
    recommendations = get_pearson_recommendations(user_ratings, books, ratings_matrix, target_user_id)
    print(json.dumps(recommendations))  # Sonuçları JSON formatında yazdır
