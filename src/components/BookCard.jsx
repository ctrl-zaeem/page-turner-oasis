
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { useAuth } from '../context/AuthContext';

const BookCard = ({ book }) => {
  const { id, title, author, cover, price, category } = book;
  const { user } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Reset image loading state when book changes
    setImageLoaded(false);
  }, [book]);

  return (
    <div 
      className="relative group book-card-shadow bg-white rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col animate-fade-up"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-4 border-bookhaven-300 border-t-bookhaven-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={cover} 
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Price tag */}
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-gray-800 shadow-md">
          ${price.toFixed(2)}
        </div>
        
        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-bookhaven-500/90 text-white text-xs font-semibold px-2 py-1 rounded-md">
          {category}
        </div>
        
        {user && (
          <div className="absolute top-3 right-14 z-10">
            <FavoriteButton bookId={id} />
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-lg mb-1 text-gray-900 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">by {author}</p>
        
        <div className="mt-auto">
          <Link
            to={`/books/${id}`}
            className="inline-flex items-center text-sm font-medium text-bookhaven-600 hover:text-bookhaven-800 transition-colors"
          >
            View Details
            <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
