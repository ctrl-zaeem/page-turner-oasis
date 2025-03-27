
import { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';

const Index = () => {
  const { books } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchParams, setSearchParams] = useState({ query: '', category: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Filter books based on search params
  useEffect(() => {
    setIsLoading(true);

    // Simulate network delay for a smooth experience
    const timer = setTimeout(() => {
      const { query, category } = searchParams;
      const filtered = books.filter(book => {
        const matchesQuery = query 
          ? book.title.toLowerCase().includes(query.toLowerCase()) || 
            book.author.toLowerCase().includes(query.toLowerCase())
          : true;
        
        const matchesCategory = category 
          ? book.category === category
          : true;
        
        return matchesQuery && matchesCategory;
      });
      
      setFilteredBooks(filtered);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [books, searchParams]);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero section */}
      <div className="relative bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight mb-4 animate-fade-in">
              Discover Your Next Favorite Book
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
              Explore a curated collection of books across various genres, share your thoughts, and connect with fellow readers.
            </p>
            
            <div className="mt-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Books grid */}
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            {searchParams.query || searchParams.category ? 'Search Results' : 'Browse Books'}
          </h2>
          <p className="text-gray-600">
            {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-50">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                <div className="aspect-[2/3] bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book, index) => (
              <div key={book.id} style={{ animationDelay: `${index * 50}ms` }}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <h3 className="text-xl text-gray-600 mb-4">No books found matching your criteria</h3>
            <button 
              onClick={() => setSearchParams({ query: '', category: '' })}
              className="text-bookhaven-600 hover:text-bookhaven-800 font-medium"
            >
              Clear search and show all books
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
