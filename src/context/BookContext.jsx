
import { createContext, useContext, useState, useEffect } from 'react';

const BookContext = createContext(null);

// Sample book data
const initialBooks = [
  {
    id: 1,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    description: "A fascinating exploration of how design serves as the communication between object and user, and how to optimize that conduit of communication in order to make the experience of using the object pleasurable.",
    price: 15.99,
    category: "Design",
    reviews: [
      { id: 1, user: "Alice", rating: 5, text: "Changed how I look at everyday objects." },
      { id: 2, user: "Bob", rating: 4, text: "Insightful and practical." }
    ]
  },
  {
    id: 2,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    description: "In this international bestseller, Daniel Kahneman explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
    price: 19.99,
    category: "Psychology",
    reviews: [
      { id: 1, user: "Charlie", rating: 5, text: "Mind-blowing insights into human decision making." }
    ]
  },
  {
    id: 3,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
    description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution that explores the ways in which biology and history have defined us.",
    price: 22.99,
    category: "History",
    reviews: []
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=800&auto=format&fit=crop",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master tiny behaviors that lead to remarkable results.",
    price: 17.99,
    category: "Self-help",
    reviews: [
      { id: 1, user: "Diana", rating: 5, text: "Life-changing approach to building habits." },
      { id: 2, user: "Ethan", rating: 5, text: "Simple yet profound concepts." }
    ]
  },
  {
    id: 5,
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    description: "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined.",
    price: 14.99,
    category: "Fiction",
    reviews: [
      { id: 1, user: "Fiona", rating: 4, text: "Beautiful and inspiring story." }
    ]
  },
  {
    id: 6,
    title: "Educated",
    author: "Tara Westover",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
    description: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    price: 16.99,
    category: "Memoir",
    reviews: []
  }
];

export function BookProvider({ children }) {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('bookhavenBooks');
    return savedBooks ? JSON.parse(savedBooks) : initialBooks;
  });
  
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('bookhavenFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookhavenBooks', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('bookhavenFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addBook = (newBook) => {
    const bookWithId = { ...newBook, id: Date.now(), reviews: [] };
    setBooks([...books, bookWithId]);
    return bookWithId;
  };

  const getBook = (id) => {
    return books.find(book => book.id === parseInt(id));
  };

  const addReview = (bookId, review) => {
    const updatedBooks = books.map(book => {
      if (book.id === parseInt(bookId)) {
        return {
          ...book,
          reviews: [...book.reviews, { ...review, id: Date.now() }]
        };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const toggleFavorite = (bookId) => {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter(id => id !== bookId));
    } else {
      setFavorites([...favorites, bookId]);
    }
  };

  const isFavorite = (bookId) => {
    return favorites.includes(bookId);
  };

  const getFavoriteBooks = () => {
    return books.filter(book => favorites.includes(book.id));
  };

  return (
    <BookContext.Provider 
      value={{ 
        books, 
        addBook, 
        getBook, 
        addReview, 
        toggleFavorite, 
        isFavorite, 
        getFavoriteBooks 
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (context === null) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}
