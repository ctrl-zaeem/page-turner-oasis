
import { useEffect, useState } from 'react';
import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';

const Favorites = () => {
  const { getFavoriteBooks } = useBooks();
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate network delay
    const timer = setTimeout(() => {
      const books = getFavoriteBooks();
      setFavoriteBooks(books);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [getFavoriteBooks]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Favorites</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-50">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                <div className="aspect-[2/3] bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : favoriteBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteBooks.map((book, index) => (
              <div key={book.id} style={{ animationDelay: `${index * 50}ms` }}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-xl shadow-md">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">
              Browse our collection and add books to your favorites for easy access.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bookhaven-600 hover:bg-bookhaven-700 focus:outline-none transition-colors"
            >
              Discover Books
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
