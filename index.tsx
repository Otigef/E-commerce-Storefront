import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- MOCK DATA ---
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrls: string[];
  rating: number;
  description: string;
}

interface Review {
    id: number;
    productId: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Fusion Backpack',
    category: 'Gear',
    price: 59.99,
    imageUrls: [
        'https://images.unsplash.com/photo-1553062407-98eeb68c6a62?q=80&w=600',
        'https://images.unsplash.com/photo-1553062407-2e1a4f722f5d?q=80&w=600',
        'https://images.unsplash.com/photo-1553062407-871b2d39b85a?q=80&w=600',
    ],
    rating: 4,
    description: 'A stylish and durable backpack for all your adventures. Features multiple compartments, a padded laptop sleeve, and water-resistant fabric to keep your gear safe and organized.'
  },
  {
    id: 2,
    name: 'Voyage T-Shirt',
    category: 'Apparel',
    price: 24.99,
    imageUrls: [
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600',
        'https://images.unsplash.com/photo-1622470953722-205151508210?q=80&w=600',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600',
    ],
    rating: 5,
    description: 'Made from 100% premium cotton, this t-shirt offers both comfort and style. Perfect for casual wear, it features a classic fit and a minimalist design that pairs with anything.'
  },
  {
    id: 3,
    name: 'Quantum Shorts',
    category: 'Apparel',
    price: 39.99,
    imageUrls: [
        'https://images.unsplash.com/photo-1588610214346-2a4f66a7b3b9?q=80&w=600',
        'https://images.unsplash.com/photo-1604176354217-1836065582e9?q=80&w=600',
        'https://images.unsplash.com/photo-1624312899147-3071358a1a36?q=80&w=600',
    ],
    rating: 4,
    description: 'Lightweight and breathable, these shorts are designed for performance. The quick-dry fabric and ergonomic design provide maximum comfort during workouts or everyday activities.'
  },
  {
    id: 4,
    name: 'Nebula Running Shoes',
    category: 'Footwear',
    price: 119.99,
    imageUrls: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ab?q=80&w=600',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600',
        'https://images.unsplash.com/photo-1595950653106-6090ee36954b?q=80&w=600',
    ],
    rating: 5,
    description: 'Experience cloud-like comfort with the Nebula Running Shoes. Featuring advanced cushioning technology and a breathable mesh upper, they provide excellent support for runners of all levels.'
  },
  {
    id: 5,
    name: 'Aero Street Cap',
    category: 'Accessories',
    price: 19.99,
    imageUrls: [
        'https://images.unsplash.com/photo-1521369909049-79f9410c4128?q=80&w=600',
        'https://images.unsplash.com/photo-1587045057784-7e562135b71c?q=80&w=600',
        'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?q=80&w=600',
    ],
    rating: 4,
    description: 'A classic six-panel cap with an adjustable strap for a custom fit. Made from durable cotton twill, it\'s the perfect accessory to complete your casual look.'
  },
  {
    id: 6,
    name: 'Chrono-Diver Watch',
    category: 'Accessories',
    price: 249.99,
    imageUrls: [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600',
        'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=600',
        'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600',
    ],
    rating: 5,
    description: 'A sophisticated timepiece that combines style and functionality. Water-resistant up to 200 meters, it features a stainless steel case, sapphire crystal glass, and a precision quartz movement.'
  },
  {
    id: 7,
    name: 'Zenith Sunglasses',
    category: 'Accessories',
    price: 89.99,
    imageUrls: [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600',
        'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=600',
        'https://images.unsplash.com/photo-1555989638-c52c7e1c6523?q=80&w=600',
    ],
    rating: 5,
    description: 'Protect your eyes with these stylish Zenith Sunglasses. The polarized lenses reduce glare and provide 100% UV protection, while the lightweight frame ensures all-day comfort.'
  },
  {
    id: 8,
    name: 'Endurance Water Bottle',
    category: 'Gear',
    price: 15.99,
    imageUrls: [
        'https://images.unsplash.com/photo-1602143407151-247e961d21a6?q=80&w=600',
        'https://images.unsplash.com/photo-1563209885-4223a54c5a88?q=80&w=600',
        'https://images.unsplash.com/photo-1610399122045-e6331a986169?q=80&w=600',
    ],
    rating: 4,
    description: 'Stay hydrated on the go with the Endurance Water Bottle. This BPA-free bottle is leak-proof and features a wide mouth for easy cleaning and adding ice cubes. Holds up to 750ml.'
  },
   // Adding more products for pagination
  { id: 9, name: 'Trailblazer Hiking Boots', category: 'Footwear', price: 149.99, imageUrls: ['https://images.unsplash.com/photo-1520639888713-7851c33f5242?q=80&w=600'], rating: 5, description: 'Durable and waterproof boots for the toughest trails.' },
  { id: 10, name: 'Flex Performance Leggings', category: 'Apparel', price: 69.99, imageUrls: ['https://images.unsplash.com/photo-1612871689353-4858b761c39c?q=80&w=600'], rating: 5, description: 'High-waisted leggings that offer support and flexibility.' },
  { id: 11, name: 'Urban Explorer Jacket', category: 'Apparel', price: 99.99, imageUrls: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600'], rating: 4, description: 'A stylish, weather-resistant jacket for city life.' },
  { id: 12, name: 'Nomad Leather Duffle', category: 'Gear', price: 199.99, imageUrls: ['https://images.unsplash.com/photo-1587467455846-f1c54b2d977a?q=80&w=600'], rating: 5, description: 'A timeless leather bag for weekend getaways.' },
  { id: 13, name: 'Classic Canvas Sneakers', category: 'Footwear', price: 79.99, imageUrls: ['https://images.unsplash.com/photo-1608231387042-66d1673070a5?q=80&w=600'], rating: 4, description: 'Versatile and comfortable sneakers for everyday wear.' },
  { id: 14, name: 'Minimalist Digital Watch', category: 'Accessories', price: 129.99, imageUrls: ['https://images.unsplash.com/photo-1547996160-81dfa387245d?q=80&w=600'], rating: 4, description: 'Sleek and modern watch with a minimalist design.' },
  { id: 15, name: 'Cozy Knit Beanie', category: 'Accessories', price: 29.99, imageUrls: ['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=600'], rating: 5, description: 'A warm and soft beanie for chilly days.' }
];

const initialReviews: Review[] = [
    { id: 1, productId: 1, author: 'Jane D.', rating: 4, comment: 'Great backpack! Lots of space and very comfortable to wear. The material feels very high quality.', date: '2024-07-15' },
    { id: 2, productId: 1, author: 'John S.', rating: 5, comment: 'I use this for my daily commute and it\'s perfect. Fits my laptop, gym clothes, and more. Highly recommend!', date: '2024-07-10' },
    { id: 3, productId: 4, author: 'Emily R.', rating: 5, comment: 'These are the most comfortable running shoes I have ever owned. It feels like I\'m running on clouds.', date: '2024-07-20' },
    { id: 4, productId: 4, author: 'Mike T.', rating: 4, comment: 'Good support and very lightweight. They look great too!', date: '2024-07-18' },
    { id: 5, productId: 2, author: 'Sarah L.', rating: 5, comment: 'The fabric is so soft and it fits perfectly. I\'ve already bought another one in a different color.', date: '2024-07-22' },
];


// --- ICON COMPONENTS ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const CartIcon = ({ count }: { count: number }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 300); // Duration of animation

        return () => clearTimeout(timer);
    }, [count]);

    return (
        <div className={`relative ${isAnimating ? 'cart-pop' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{count}</span>
            )}
        </div>
    );
};

const StarIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${filled ? 'text-yellow-400' : 'text-gray-300'} ${className}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


// --- UI COMPONENTS ---
const categoryImages: { [key: string]: string } = {
    'Gear': 'https://images.unsplash.com/photo-1579802872292-c496c95c33e8?q=80&w=600&auto=format&fit=crop',
    'Apparel': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop',
    'Footwear': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop',
    'Accessories': 'https://images.unsplash.com/photo-1577992945219-2d122511d75f?q=80&w=600&auto=format&fit=crop',
};

const uniqueCategories = [...new Set(products.map(p => p.category))];

const CategoryShowcase = () => (
    <section className="bg-gray-50">
        <div className="container mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {uniqueCategories.map(category => (
                    <a 
                        key={category} 
                        href={`#/shop?category=${category}`} 
                        className="group relative block rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                    >
                        <img 
                            src={categoryImages[category]} 
                            alt={category} 
                            className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-colors duration-300 flex items-center justify-center p-4">
                            <h3 className="text-white text-2xl font-bold tracking-wider text-center">{category}</h3>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </section>
);


const HomePage = () => (
    <>
        <section className="relative h-[calc(100vh-68px)] md:h-[60vh] flex items-center justify-center text-white text-center bg-gray-800">
            <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
                alt="Stylish clothing on display in a boutique" 
                className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="relative z-10 p-8 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight">Discover Your Signature Style</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md">Explore our curated collection of modern apparel and accessories designed for the discerning individual.</p>
                <a 
                    href="#/shop" 
                    className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                >
                    Shop The Collection
                </a>
            </div>
        </section>
        <CategoryShowcase />
    </>
);

const Header = ({ cartCount, searchQuery, onSearchChange, location }: { cartCount: number, searchQuery: string, onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void, location: string }) => (
    <header className="bg-white shadow-md sticky top-0 z-10" aria-label="Main Navigation">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#/home" className="text-2xl font-bold text-gray-800">LuxeLane</a>
            <div className="hidden md:flex items-center space-x-8">
                <a href="#/home" className={`nav-link text-gray-600 ${location === '#/home' ? 'active font-semibold' : ''}`}>Home</a>
                <a href="#/shop" className={`nav-link text-gray-600 ${(location === '#/shop' || location.startsWith('#/product/')) ? 'active font-semibold' : ''}`}>Shop</a>
                <a href="#/about" className={`nav-link text-gray-600 ${location === '#/about' ? 'active font-semibold' : ''}`}>About</a>
                <a href="#/contact" className={`nav-link text-gray-600 ${location === '#/contact' ? 'active font-semibold' : ''}`}>Contact</a>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon />
                    </span>
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={onSearchChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 w-40 focus:w-64"
                        placeholder="Search products..."
                        aria-label="Search products"
                    />
                </div>
                <button className="text-gray-600 hover:text-gray-800" aria-label="My Account"><UserIcon /></button>
                <button className="text-gray-600 hover:text-gray-800" aria-label={`Shopping cart with ${cartCount} items`}><CartIcon count={cartCount} /></button>
            </div>
        </nav>
    </header>
);

const ProductCard: React.FC<{ product: Product, onAddToCart: (productId: number) => void, lastAddedId: number | null, onOpenQuickView: (product: Product) => void }> = ({ product, onAddToCart, lastAddedId, onOpenQuickView }) => {
    const isJustAdded = product.id === lastAddedId;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="block relative">
                <a href={`#/product/${product.id}`}>
                    <img className="w-full h-64 object-cover" src={product.imageUrls[0]} alt={product.name} />
                </a>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => onOpenQuickView(product)}
                        className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-full flex items-center space-x-2 shadow-md hover:scale-105 transform transition-transform"
                        aria-label={`Quick view ${product.name}`}
                    >
                        <EyeIcon />
                        <span>Quick View</span>
                    </button>
                </div>
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                     <h3 className="text-lg font-semibold text-gray-800">
                        <a href={`#/product/${product.id}`} className="hover:underline">{product.name}</a>
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                    <div className="flex items-center mt-2" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < product.rating} />)}
                        <span className="text-gray-500 text-sm ml-2">({product.rating}.0)</span>
                    </div>
                    <p className="text-gray-800 font-bold mt-2">${product.price.toFixed(2)}</p>
                </div>
                <button 
                    onClick={() => onAddToCart(product.id)}
                    disabled={isJustAdded}
                    className={`w-full mt-4 font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform ${
                        isJustAdded 
                        ? 'bg-green-500 text-white cursor-not-allowed' 
                        : 'bg-gray-800 text-white group-hover:bg-gray-700 group-hover:scale-105 active:scale-100'
                    }`}
                >
                    {isJustAdded ? 'Added!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

const ProductGrid = ({ products, onAddToCart, lastAddedId, selectedCategory, onOpenQuickView }: { products: Product[], onAddToCart: (productId: number) => void, lastAddedId: number | null, selectedCategory: string | null, onOpenQuickView: (product: Product) => void }) => (
    <section className="container mx-auto px-6 py-8" aria-labelledby="collection-heading">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
             <h2 id="collection-heading" className="text-3xl font-bold text-gray-800">
                {selectedCategory ? `Browsing: ${selectedCategory}` : 'Our Collection'}
            </h2>
            {selectedCategory && (
                <a href="#/shop" className="bg-gray-200 text-gray-700 text-sm font-semibold py-1 px-3 rounded-full hover:bg-gray-300 transition-colors">
                    &times; Clear Filter
                </a>
            )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 ? (
                products.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} lastAddedId={lastAddedId} onOpenQuickView={onOpenQuickView} />
                ))
            ) : (
                <div className="col-span-full bg-gray-50 rounded-lg p-12 text-center border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
                    <p className="text-gray-500">No products found matching your criteria.</p>
                </div>
            )}
        </div>
    </section>
);

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void; }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav aria-label="Product pagination" className="flex justify-center items-center space-x-2 mt-8 mb-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Go to previous page"
            >
                Previous
            </button>
            
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-4 py-2 border rounded-md transition-colors text-sm font-medium ${
                        currentPage === number 
                        ? 'bg-gray-800 text-white border-gray-800' 
                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                    aria-current={currentPage === number ? 'page' : undefined}
                >
                    {number}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Go to next page"
            >
                Next
            </button>
        </nav>
    );
};

const StarRatingInput = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex items-center space-x-1" onMouseLeave={() => setHoverRating(0)}>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <button
                        type="button"
                        key={starValue}
                        className="focus:outline-none"
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        aria-label={`Set rating to ${starValue}`}
                    >
                        <StarIcon
                            filled={starValue <= (hoverRating || rating)}
                            className="h-7 w-7 cursor-pointer transition-transform duration-150 hover:scale-110"
                        />
                    </button>
                );
            })}
        </div>
    );
};

const ReviewForm = ({ productId, onAddReview }: { productId: number; onAddReview: (review: Omit<Review, 'id' | 'date'>) => void }) => {
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!author || !comment || rating === 0) {
            setError('Please fill out all fields and select a rating.');
            return;
        }
        onAddReview({ productId, author, rating, comment });
        setAuthor('');
        setComment('');
        setRating(0);
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Write a Review</h3>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Your Name</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="e.g. John Doe"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Rating</label>
                <StarRatingInput rating={rating} setRating={setRating} />
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">Comment</label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Share your thoughts about the product..."
                />
            </div>
            <button type="submit" className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                Submit Review
            </button>
        </form>
    );
};

const ReviewList = ({ reviews }: { reviews: Review[] }) => (
    <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
        {reviews.length > 0 ? (
            <div className="space-y-6">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-2">
                            <div className="flex items-center" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                                {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} />)}
                            </div>
                            <p className="text-gray-800 font-semibold ml-4">{review.author}</p>
                        </div>
                        <p className="text-gray-500 text-sm mb-3">Reviewed on {new Date(review.date).toLocaleDateString()}</p>
                        <p className="text-gray-600">{review.comment}</p>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500">Be the first to review this product!</p>
        )}
    </div>
);

const ProductDetailPage = ({ product, onAddToCart, lastAddedId, reviews, onAddReview }: { product: Product, onAddToCart: (productId: number) => void, lastAddedId: number | null, reviews: Review[], onAddReview: (review: Omit<Review, 'id' | 'date'>) => void }) => {
    const [selectedImage, setSelectedImage] = useState(product.imageUrls[0]);
    const isJustAdded = product.id === lastAddedId;
    
    useEffect(() => {
        setSelectedImage(product.imageUrls[0]);
    }, [product]);

    return (
        <section className="container mx-auto px-6 py-8">
            <a href="#/shop" className="mb-8 inline-block text-gray-600 hover:text-gray-800 font-semibold">&larr; Back to Shop</a>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <div className="mb-4">
                      <img src={selectedImage.replace('w=600', 'w=1200')} alt={product.name} className="w-full rounded-lg shadow-lg" />
                    </div>
                    <div className="flex space-x-2">
                        {product.imageUrls.map((img, index) => (
                           <button
                             key={index}
                             onClick={() => setSelectedImage(img)}
                             className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === img ? 'border-gray-800' : 'border-transparent'}`}
                             aria-label={`View image ${index + 1}`}
                           >
                                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                           </button>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">{product.category}</p>
                    <h1 className="text-4xl font-bold text-gray-800 mt-2 mb-4">{product.name}</h1>
                    <div className="relative group flex items-center mb-4 cursor-pointer">
                        <div className="flex items-center" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < product.rating} />)}
                        </div>
                        <span className="text-gray-600 text-sm ml-2">({product.rating}.0 rating)</span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
                            {product.rating.toFixed(1)} out of 5 stars
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Description</h2>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    <button 
                        onClick={() => onAddToCart(product.id)}
                        disabled={isJustAdded}
                        className={`w-full mt-8 font-bold py-3 px-6 rounded-lg transition-colors text-lg ${
                            isJustAdded
                            ? 'bg-green-500 text-white cursor-not-allowed'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                    >
                        {isJustAdded ? 'Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
            <div className="mt-16 border-t pt-12">
                <ReviewList reviews={reviews} />
                <ReviewForm productId={product.id} onAddReview={onAddReview} />
            </div>
        </section>
    );
}

const QuickViewModal = ({ product, onClose, onAddToCart, lastAddedId }: { product: Product; onClose: () => void; onAddToCart: (productId: number) => void; lastAddedId: number | null }) => {
    const isJustAdded = product.id === lastAddedId;
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 modal-overlay"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${product.id}`}
        >
            <div ref={modalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden modal-panel">
                <div className="w-full md:w-1/2 p-4">
                    <img src={product.imageUrls[0].replace('w=600', 'w=800')} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">{product.category}</p>
                        <h2 id={`modal-title-${product.id}`} className="text-3xl font-bold text-gray-800 mt-2 mb-3">{product.name}</h2>
                        <div className="flex items-center mb-4" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < product.rating} />)}
                            <span className="text-gray-600 text-sm ml-2">({product.rating}.0 rating)</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
                        <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                    </div>
                    <div className="mt-auto pt-4 border-t">
                         <button 
                            onClick={() => onAddToCart(product.id)}
                            disabled={isJustAdded}
                            className={`w-full mb-3 font-bold py-3 px-6 rounded-lg transition-colors text-lg ${
                                isJustAdded
                                ? 'bg-green-500 text-white cursor-not-allowed'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                            }`}
                        >
                            {isJustAdded ? 'Added!' : 'Add to Cart'}
                        </button>
                        <a 
                            href={`#/product/${product.id}`} 
                            onClick={onClose}
                            className="w-full block text-center bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            View Full Details
                        </a>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close quick view"
                >
                    <XIcon />
                </button>
            </div>
        </div>
    );
};


const AboutPage = () => (
    <section className="container mx-auto px-6 py-12 text-center md:text-left">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">About LuxeLane</h1>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200" alt="LuxeLane Team" className="rounded-lg shadow-xl mb-8 w-full h-auto object-cover max-h-96" />
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Welcome to LuxeLane, where style meets sophistication. Founded in 2024, our mission is to provide high-quality, modern apparel and accessories that empower you to express your unique identity. We believe that fashion is more than just clothing; it's a form of self-expression, an art, and a way to tell your story without saying a word.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Our collections are carefully curated, blending timeless designs with contemporary trends. We are committed to sustainability and ethical sourcing, ensuring that every piece you purchase not only looks good but also does good. We partner with artisans and manufacturers who share our values of craftsmanship and responsibility.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
                At LuxeLane, the customer is at the heart of everything we do. We strive to create an exceptional shopping experience, from our user-friendly website to our dedicated customer support team. Thank you for joining us on this journey.
            </p>
        </div>
    </section>
);

const ContactPage = () => (
     <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Get in Touch</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="contact-name" className="block text-gray-700 font-medium mb-2">Name</label>
                            <input type="text" id="contact-name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Your Name" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contact-email" className="block text-gray-700 font-medium mb-2">Email</label>
                            <input type="email" id="contact-email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="your.email@example.com" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contact-message" className="block text-gray-700 font-medium mb-2">Message</label>
                            <textarea id="contact-message" rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="How can we help?"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
                <div className="text-gray-700">
                     <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Information</h2>
                     <div className="space-y-4">
                         <p><strong>Address:</strong><br/>123 Luxe Lane, Fashion City, 54321</p>
                         <p><strong>Email:</strong><br/><a href="mailto:support@luxelane.com" className="text-gray-800 hover:underline">support@luxelane.com</a></p>
                         <p><strong>Phone:</strong><br/><a href="tel:+1234567890" className="text-gray-800 hover:underline">(123) 456-7890</a></p>
                     </div>
                      <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Hours</h3>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const Footer = () => (
    <footer className="bg-white mt-12 border-t">
        <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <p className="text-gray-500 mb-4 md:mb-0">&copy; 2024 LuxeLane. All rights reserved.</p>
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-500 hover:text-gray-800">Facebook</a>
                    <a href="#" className="text-gray-500 hover:text-gray-800">Twitter</a>
                    <a href="#" className="text-gray-500 hover:text-gray-800">Instagram</a>
                </div>
            </div>
        </div>
    </footer>
);


// --- MAIN APP COMPONENT ---
const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('#/home');
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/home';
      const [path, queryString] = hash.split('?');
      setLocation(path);
      
      const params = new URLSearchParams(queryString);
      const category = params.get('category');
      const page = parseInt(params.get('page') || '1', 10);

      setSelectedCategory(category);
      setCurrentPage(page);
      
      if (location !== '#/shop') {
          setSearchQuery('');
      }
      
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleAddToCart = (productId: number) => {
    setCartCount(prevCount => prevCount + 1);
    setLastAddedId(productId);
    setTimeout(() => {
      setLastAddedId(null);
    }, 2000); // Reset after 2 seconds
  };
  
  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
        id: reviews.length + 1,
        ...newReviewData,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };
    setReviews(prevReviews => [newReview, ...prevReviews]);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
    const [path] = window.location.hash.split('?');
    if(path !== '#/shop') {
        window.location.hash = '#/shop';
    }
  };

  const handlePageChange = (page: number) => {
      const params = new URLSearchParams(window.location.hash.split('?')[1]);
      params.set('page', page.toString());
      // Reconstruct the hash, preserving other params like category
      const newHash = `#/shop?${params.toString()}`;
      window.location.hash = newHash;
  };

  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
      (currentPage - 1) * PRODUCTS_PER_PAGE,
      currentPage * PRODUCTS_PER_PAGE
  );

  let pageContent;
  if (location.startsWith('#/product/')) {
    const productId = parseInt(location.replace('#/product/', ''), 10);
    const product = products.find(p => p.id === productId);
    const productReviews = reviews.filter(r => r.productId === productId);

    if (product) {
      pageContent = <ProductDetailPage 
                        product={product} 
                        onAddToCart={handleAddToCart} 
                        lastAddedId={lastAddedId}
                        reviews={productReviews}
                        onAddReview={handleAddReview} 
                    />;
    } else {
      pageContent = (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <a href="#/shop" className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
            Back to Shop
          </a>
        </div>
      );
    }
  } else if (location === '#/shop') {
    pageContent = (
        <>
            <ProductGrid 
                products={paginatedProducts} 
                onAddToCart={handleAddToCart} 
                lastAddedId={lastAddedId}
                selectedCategory={selectedCategory}
                onOpenQuickView={handleOpenQuickView}
            />
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
  } else if (location === '#/about') {
    pageContent = <AboutPage />;
  } else if (location === '#/contact') {
    pageContent = <ContactPage />;
  } else {
    pageContent = <HomePage />;
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartCount={cartCount} 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        location={location}
      />
      <main className="flex-grow page-enter-active" key={location}>
        {pageContent}
      </main>
      <Footer />
      {quickViewProduct && (
        <QuickViewModal 
            product={quickViewProduct}
            onClose={handleCloseQuickView}
            onAddToCart={handleAddToCart}
            lastAddedId={lastAddedId}
        />
      )}
    </div>
  );
};

// --- RENDER THE APP ---
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}