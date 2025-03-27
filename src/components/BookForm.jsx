
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    cover: '',
    price: '',
    category: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const categories = [
    'Fiction', 'Non-fiction', 'Science Fiction', 'Fantasy', 'Mystery', 
    'Thriller', 'Romance', 'Biography', 'History', 'Self-help',
    'Business', 'Psychology', 'Design', 'Memoir', 'Science'
  ];
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.cover.trim()) newErrors.cover = 'Cover image URL is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Format the data
    const bookData = {
      ...formData,
      price: parseFloat(formData.price)
    };
    
    // Simulate network delay
    setTimeout(() => {
      const newBook = onSubmit(bookData);
      setIsSubmitting(false);
      navigate(`/books/${newBook.id}`);
    }, 800);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Book Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-bookhaven-500 focus:border-bookhaven-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>
        
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-bookhaven-500 focus:border-bookhaven-500 ${
              errors.author ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
        </div>
        
        <div>
          <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image URL
          </label>
          <input
            type="url"
            id="cover"
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-bookhaven-500 focus:border-bookhaven-500 ${
              errors.cover ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.cover && <p className="mt-1 text-sm text-red-600">{errors.cover}</p>}
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="19.99"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-bookhaven-500 focus:border-bookhaven-500 ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-bookhaven-500 focus:border-bookhaven-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-bookhaven-500 focus:border-bookhaven-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bookhaven-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bookhaven-600 hover:bg-bookhaven-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bookhaven-500 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : 'Add Book'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
