
import BookForm from '../components/BookForm';
import { useBooks } from '../context/BookContext';

const AddBook = () => {
  const { addBook } = useBooks();
  
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add a New Book</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <BookForm onSubmit={addBook} />
        </div>
      </div>
    </div>
  );
};

export default AddBook;
