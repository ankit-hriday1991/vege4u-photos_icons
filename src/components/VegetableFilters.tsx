import React from 'react';

interface VegetableFiltersProps {
  vegetables: string[];
  onSelect: (vegetable: string) => void;
  selectedVegetable: string | null;
}

const vegetableImages: Record<string, string> = {
  'Tomatoes': 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&q=80&w=100&h=100',
  'Potatoes': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=100&h=100',
  'Carrots': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=100&h=100',
  'Onions': 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=100&h=100',
  'Bell Peppers': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=80&w=100&h=100',
  'Cabbage': 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&q=80&w=100&h=100',
  'Cauliflower': 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&q=80&w=100&h=100',
  'Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=100&h=100',
  'Cucumber': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&q=80&w=100&h=100',
  'Broccoli': 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&q=80&w=100&h=100',
  'Peas': 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&q=80&w=100&h=100',
  'Lady Finger': 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&q=80&w=100&h=100',
  'Eggplant': 'https://images.unsplash.com/photo-1528826007177-f38517ce0a30?auto=format&fit=crop&q=80&w=100&h=100',
  'Green Chillies': 'https://images.unsplash.com/photo-1628699265231-97b2a3e7b9ae?auto=format&fit=crop&q=80&w=100&h=100',
  'Beans': 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&q=80&w=100&h=100'
};

export default function VegetableFilters({ vegetables, onSelect, selectedVegetable }: VegetableFiltersProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 mb-6">
      <div className="flex space-x-3 min-w-max px-1">
        {vegetables.map((vegetable) => (
          <button
            key={vegetable}
            onClick={() => onSelect(vegetable)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all
              ${selectedVegetable === vegetable 
                ? 'bg-green-500 shadow-lg scale-105' 
                : 'bg-white hover:bg-green-50 shadow'}`}
          >
            <div className={`w-12 h-12 rounded-full overflow-hidden ${selectedVegetable === vegetable ? 'ring-2 ring-white' : ''}`}>
              <img
                src={vegetableImages[vegetable] || vegetableImages['Tomatoes']}
                alt={vegetable}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className={`text-xs font-medium mt-1 whitespace-nowrap
              ${selectedVegetable === vegetable ? 'text-white' : 'text-gray-600'}`}>
              {vegetable}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}