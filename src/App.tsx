import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ShopCard from './components/ShopCard';
import VegetableFilters from './components/VegetableFilters';
import { Search } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface VegetablePrice {
  name: string;
  price: number;
}

interface Shop {
  id: number;
  name: string;
  pricePerKg: number;
  image: string;
  location: Location;
  vegetables: VegetablePrice[];
}

function App() {
  const [shops] = useState<Shop[]>([
    {
      id: 1,
      name: "VENKAT VEGGES",
      pricePerKg: 60,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80",
      location: {
        lat: 12.8437,
        lng: 77.6594,
        address: "Electronics City Phase 1, Near Infosys Gate 1, Bangalore"
      },
      vegetables: [
        { name: "Tomatoes", price: 40 },
        { name: "Onions", price: 35 },
        { name: "Potatoes", price: 30 },
        { name: "Carrots", price: 45 },
        { name: "Beans", price: 60 },
        { name: "Cabbage", price: 35 }
      ]
    },
    {
      id: 2,
      name: "RAMU VEGGES",
      pricePerKg: 75,
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80",
      location: {
        lat: 12.8456,
        lng: 77.6612,
        address: "Electronics City Phase 2, Near Wipro Gate, Bangalore"
      },
      vegetables: [
        { name: "Tomatoes", price: 45 },
        { name: "Onions", price: 40 },
        { name: "Potatoes", price: 35 },
        { name: "Cauliflower", price: 50 },
        { name: "Spinach", price: 30 },
        { name: "Cucumber", price: 40 }
      ]
    },
    {
      id: 3,
      name: "SHILPA VEGGES",
      pricePerKg: 65,
      image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&q=80",
      location: {
        lat: 12.8484,
        lng: 77.6571,
        address: "Electronics City Phase 1, Near BHEL, Bangalore"
      },
      vegetables: [
        { name: "Tomatoes", price: 42 },
        { name: "Onions", price: 38 },
        { name: "Potatoes", price: 32 },
        { name: "Broccoli", price: 90 },
        { name: "Peas", price: 60 },
        { name: "Bell Peppers", price: 80 }
      ]
    },
    {
      id: 4,
      name: "ROSHAN VEGGES",
      pricePerKg: 55,
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80",
      location: {
        lat: 12.8401,
        lng: 77.6637,
        address: "Electronics City Phase 2, Near Siemens, Bangalore"
      },
      vegetables: [
        { name: "Tomatoes", price: 38 },
        { name: "Onions", price: 32 },
        { name: "Potatoes", price: 28 },
        { name: "Lady Finger", price: 45 },
        { name: "Eggplant", price: 40 },
        { name: "Green Chillies", price: 30 }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleGetDirections = (location: Location) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${location.lat},${location.lng}`;
        window.open(url, '_blank');
      }, (error) => {
        console.error("Error getting location:", error);
        const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
        window.open(url, '_blank');
      });
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const averagePrice = Math.round(shops.reduce((acc, shop) => acc + shop.pricePerKg, 0) / shops.length);

  // Get unique vegetables across all shops
  const uniqueVegetables = useMemo(() => {
    const vegetables = new Set<string>();
    shops.forEach(shop => {
      shop.vegetables.forEach(veg => vegetables.add(veg.name));
    });
    return Array.from(vegetables).sort();
  }, [shops]);

  const { filteredShops, searchedVegetable, averageVegetablePrice } = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    // First check if the search matches any vegetable
    const matchingVegetable = shops.some(shop => 
      shop.vegetables.some(veg => veg.name.toLowerCase() === normalizedSearch)
    ) ? normalizedSearch : null;

    // Filter shops based on search term
    const filtered = shops.filter(shop => {
      if (!normalizedSearch) return true;
      
      // If searching for a specific vegetable
      if (matchingVegetable) {
        return shop.vegetables.some(veg => 
          veg.name.toLowerCase() === matchingVegetable
        );
      }
      
      // Otherwise search in shop name and vegetables
      return (
        shop.name.toLowerCase().includes(normalizedSearch) ||
        shop.vegetables.some(veg => 
          veg.name.toLowerCase().includes(normalizedSearch)
        )
      );
    });

    // Calculate average price for the searched vegetable
    let avgVegPrice = 0;
    if (matchingVegetable) {
      const prices = filtered.map(shop => 
        shop.vegetables.find(v => v.name.toLowerCase() === matchingVegetable)?.price ?? 0
      );
      avgVegPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    }

    return {
      filteredShops: filtered,
      searchedVegetable: matchingVegetable,
      averageVegetablePrice: avgVegPrice
    };
  }, [shops, searchTerm]);

  const handleVegetableSelect = (vegetable: string) => {
    setSearchTerm(searchTerm === vegetable ? '' : vegetable);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        averagePrice={averagePrice} 
        searchedVegetable={searchedVegetable} 
        averageVegetablePrice={averageVegetablePrice}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="py-8">
          <div className="relative max-w-xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search shops or vegetables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <VegetableFilters
            vegetables={uniqueVegetables}
            onSelect={handleVegetableSelect}
            selectedVegetable={searchedVegetable}
          />

          {searchedVegetable && (
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Showing shops selling {searchedVegetable.charAt(0).toUpperCase() + searchedVegetable.slice(1)}
              </h2>
              <p className="text-gray-600 mt-1">
                Found {filteredShops.length} shop{filteredShops.length !== 1 ? 's' : ''} with this vegetable
              </p>
              <p className="text-green-600 font-medium mt-1">
                Average price: ₹{averageVegetablePrice}/KG
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredShops.map((shop) => (
              <ShopCard
                key={shop.id}
                name={shop.name}
                pricePerKg={shop.pricePerKg}
                image={shop.image}
                location={shop.location}
                vegetables={shop.vegetables}
                onGetDirections={() => handleGetDirections(shop.location)}
                averagePrice={averagePrice}
                highlightedVegetable={searchedVegetable}
                averageVegetablePrice={averageVegetablePrice}
              />
            ))}
          </div>

          {filteredShops.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No shops found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;