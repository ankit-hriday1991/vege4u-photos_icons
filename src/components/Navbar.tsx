import React from 'react';
import { ShoppingCart, Leaf } from 'lucide-react';

interface NavbarProps {
  averagePrice: number;
  searchedVegetable: string | null;
  averageVegetablePrice: number;
}

export default function Navbar({ averagePrice, searchedVegetable, averageVegetablePrice }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-green-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">FreshCart</span>
          </div>
          <div className="flex items-center space-x-6">
            {searchedVegetable ? (
              <div className="text-sm text-gray-600">
                Average {searchedVegetable} Price: <span className="font-semibold">₹{averageVegetablePrice}/KG</span>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                Average Price: <span className="font-semibold">₹{averagePrice}/KG</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}