import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    getCategories();
  }, []);

  return (
    <div className="bg-gray-700 min-h-screen py-12 px-8">
      <h1 className="text-4xl font-bold text-center text-white my-10">
        Shop by Category
      </h1>

      {categories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {categories.map((cat, index) => {
            const categoryName = typeof cat === "string" ? cat : cat.slug || cat.name;
            return (
              <Link
                key={index}
                to={`/category/${categoryName}`}
                className="bg-gray-500 text-gray-100 rounded-xl shadow-md 
                p-6 text-center font-semibold capitalize transition duration-300 
                hover:bg-blue-700 hover:text-white hover:shadow-xl transform hover:scale-105"
              >
                {categoryName.replace('-', ' ')}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-300">Loading categories...</p>
      )}
    </div>
  );
}
