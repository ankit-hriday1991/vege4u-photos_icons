import React from 'react';
import { MapPin, Leaf } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface VegetablePrice {
  name: string;
  price: number;
}

interface ShopCardProps {
  name: string;
  pricePerKg: number;
  image: string;
  location: Location;
  vegetables: VegetablePrice[];
  onGetDirections: () => void;
  averagePrice: number;
  highlightedVegetable: string | null;
  averageVegetablePrice: number;
}

export default function ShopCard({ 
  name, 
  pricePerKg, 
  image, 
  location, 
  vegetables,
  onGetDirections,
  averagePrice,
  highlightedVegetable,
  averageVegetablePrice
}: ShopCardProps) {
  const isPriceLower = pricePerKg < averagePrice;
  
  const highlightedVegPrice = highlightedVegetable 
    ? vegetables.find(v => v.name.toLowerCase() === highlightedVegetable.toLowerCase())?.price 
    : null;

  const isVegPriceLower = highlightedVegPrice !== null && highlightedVegPrice < averageVegetablePrice;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {highlightedVegetable ? (
          isVegPriceLower && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Best Price for {highlightedVegetable}
            </div>
          )
        ) : (
          isPriceLower && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Best Average Price
            </div>
          )
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        
        {highlightedVegPrice ? (
          <div className="mt-1">
            <p className="text-green-600 font-medium text-lg">
              ₹{highlightedVegPrice}/KG
              <span className="text-sm text-gray-500 ml-2">
                for {highlightedVegetable}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Average shop price: ₹{pricePerKg}/KG
            </p>
          </div>
        ) : (
          <p className="text-green-600 font-medium mt-1 text-lg">₹{pricePerKg}/KG</p>
        )}
        
        <div className="mt-2 flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{location.address}</span>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Available Vegetables:</h4>
          <div className="flex flex-wrap gap-2">
            {vegetables.map((veg, index) => {
              const isHighlighted = highlightedVegetable && 
                veg.name.toLowerCase() === highlightedVegetable.toLowerCase();
              
              return (
                <span 
                  key={index}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${isHighlighted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-green-100 text-green-800'}`}
                >
                  <Leaf className="h-3 w-3 mr-1" />
                  {veg.name} - ₹{veg.price}/KG
                </span>
              );
            })}
          </div>
        </div>

        <button
          onClick={onGetDirections}
          className="mt-4 w-full py-2 bg-green-50 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Get Directions
        </button>
      </div>
    </div>
  );
}