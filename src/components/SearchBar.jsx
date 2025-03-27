
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ query, category });
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="w-full max-w-4xl mx-auto glass rounded-full flex overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex-1 flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or author..."
          className="w-full px-6 py-4 bg-transparent border-none focus:outline-none text-gray-800 placeholder:text-gray-400"
        />
      </div>
      
      <div className="flex-shrink-0 border-l border-gray-200">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-full px-4 bg-transparent border-none focus:outline-none text-gray-600 cursor-pointer appearance-none"
          style={{ 
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            backgroundSize: '1em',
            paddingRight: '2.5rem'
          }}
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Design">Design</option>
          <option value="Psychology">Psychology</option>
          <option value="History">History</option>
          <option value="Self-help">Self-help</option>
          <option value="Memoir">Memoir</option>
        </select>
      </div>
      
      <button
        type="submit"
        className="flex-shrink-0 bg-bookhaven-600 text-white px-6 py-4 font-medium hover:bg-bookhaven-700 transition-colors focus:outline-none"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
