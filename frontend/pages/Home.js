import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

export default function Home() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Simulate fetching data from backend
    const fetchVehicles = async () => {
      // Replace this with actual API call
      const data = [
        { id: '1', name: 'Sedan', details: 'Comfortable 4-seater' },
        { id: '2', name: 'SUV', details: 'Spacious and powerful' },
        { id: '3', name: 'Convertible', details: 'Stylish and fun' },
        { id: '4', name: 'Pickup Truck', details: 'Great for hauling' },
      ];
      setVehicles(data);
    };

    fetchVehicles();
  }, []);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={tw`flex-1 bg-white p-2`}>
      <Text style={tw`text-4xl text-left font-bold mt-10`}>FlexiRide</Text>
      <Text style={tw`text-lg text-left mt-1`}>{formattedDate}</Text>

      <Text style={tw`text-2xl text-left mt-1 mt-10`}>Popular Rentals</Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={tw`mt-4`}>
        {vehicles.map(vehicle => (
          <View
            key={vehicle.id}
            style={tw`bg-gray-200 rounded-lg p-4 mr-4 w-48 h-50`}
          >
            <Text style={tw`text-lg font-bold`}>{vehicle.name}</Text>
            <Text style={tw`text-sm mt-1`}>{vehicle.details}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
