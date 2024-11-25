import React from 'react';
import { Plus, Minus, MapPin } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  unit: string;
  location: Location;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onGetDirections: () => void;
}

export default function ProductCard({ 
  name, 
  price, 
  image, 
  unit, 
  location, 
  quantity, 
  onAdd, 
  onRemove,
  onGetDirections 
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-green-600 font-medium mt-1">${price.toFixed(2)} / {unit}</p>
        
        <div className="mt-2 flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{location.address}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onRemove}
              className={`p-1 rounded-full ${quantity > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
              disabled={quantity === 0}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-medium text-gray-700">{quantity}</span>
            <button
              onClick={onAdd}
              className="p-1 rounded-full bg-green-100 text-green-600"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="font-semibold text-gray-700">
            ${(price * quantity).toFixed(2)}
          </span>
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