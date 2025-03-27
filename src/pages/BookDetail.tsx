
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import ReviewForm from '../components/ReviewForm';
import FavoriteButton from '../components/FavoriteButton';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBook, addReview } = useBooks();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Reset loading state when book id changes
    setIsLoading(true);
    setImageLoaded(false);
    
    // Simulate network delay
    const timer = setTimeout(() => {
      const foundBook = getBook(id);
      if (foundBook) {
        setBook(foundBook);
      }
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id, getBook]);

  const handleReviewSubmit = (bookId, review) => {
    addReview(bookId, review);
    // Update local state
    setBook(prev => ({
      ...prev,
      reviews: [...prev.reviews, { ...review, id: Date.now() }]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-bookhaven-300 border-t-bookhaven-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h1>
          <p className="text-gray-600 mb-8">The book you are looking for does not exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bookhaven-600 hover:bg-bookhaven-700 focus:outline-none"
          >
            Go Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const { title, author, cover, description, price, category, reviews } = book;
  
  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'No ratings yet';

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-bookhaven-600 mb-6 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Book cover and details */}
            <div className="md:w-1/3 flex flex-col">
              <div className="relative aspect-[2/3] bg-gray-100">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-bookhaven-300 border-t-bookhaven-600 rounded-full animate-spin"></div>
                  </div>
                )}
                <img 
                  src={cover} 
                  alt={title}
                  className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                />
                {user && (
                  <div className="absolute top-4 right-4">
                    <FavoriteButton bookId={book.id} />
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col space-y-4 bg-gray-50 flex-grow">
                <div>
                  <span className="text-sm font-medium text-gray-500">Price</span>
                  <p className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Category</span>
                  <p className="text-gray-900">{category}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Rating</span>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {typeof averageRating === 'string' ? (
                        <p className="text-gray-600">{averageRating}</p>
                      ) : (
                        <>
                          <span className="text-lg font-medium text-gray-900 mr-1">{averageRating}</span>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map(star => (
                              <svg 
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= Math.round(parseFloat(averageRating)) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Book details and reviews */}
            <div className="md:w-2/3 p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-xl text-gray-600 mb-6">by {author}</p>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About this book</h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
                
                {reviews.length > 0 ? (
                  <div className="space-y-6 mb-8">
                    {reviews.map(review => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{review.user}</h3>
                            <div className="flex items-center mt-1 mb-2">
                              {[1, 2, 3, 4, 5].map(star => (
                                <svg 
                                  key={star}
                                  className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                              {review.date && (
                                <span className="text-sm text-gray-500 ml-2">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-700">{review.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 mb-8">No reviews yet. Be the first to leave a review!</p>
                )}
                
                {user ? (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Add Your Review</h3>
                    <ReviewForm onSubmit={handleReviewSubmit} bookId={id} />
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      Please{' '}
                      <a href="/login" className="text-bookhaven-600 hover:text-bookhaven-800 font-medium">
                        sign in
                      </a>{' '}
                      to leave a review.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
