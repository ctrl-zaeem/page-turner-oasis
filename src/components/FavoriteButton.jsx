
import { useBooks } from '../context/BookContext';

const FavoriteButton = ({ bookId }) => {
  const { toggleFavorite, isFavorite } = useBooks();
  const favorite = isFavorite(bookId);
  
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(bookId);
      }}
      className={`flex items-center justify-center w-8 h-8 rounded-full ${
        favorite ? 'bg-white text-red-500' : 'bg-white/80 text-gray-400 hover:text-red-500'
      } transition-all duration-300 hover:scale-110 focus:outline-none shadow-sm`}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg 
        className="w-5 h-5" 
        fill={favorite ? "currentColor" : "none"} 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        strokeWidth={favorite ? "0" : "2"}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
