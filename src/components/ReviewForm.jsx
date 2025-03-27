
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ReviewForm = ({ onSubmit, bookId }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (text.trim().length < 3) {
      setError('Please enter a valid review (minimum 3 characters)');
      return;
    }
    
    setIsSubmitting(true);
    
    const review = {
      user: user.name,
      rating,
      text: text.trim(),
      date: new Date().toISOString()
    };
    
    // Simulate network delay
    setTimeout(() => {
      onSubmit(bookId, review);
      setText('');
      setRating(5);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <svg 
                className={`w-8 h-8 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
          Your Review
        </label>
        <textarea
          id="review"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-bookhaven-500 focus:border-bookhaven-500"
          placeholder="Share your thoughts about this book..."
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bookhaven-600 hover:bg-bookhaven-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bookhaven-500 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : 'Submit Review'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
