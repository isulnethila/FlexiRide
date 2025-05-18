import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

const mockVehicles = [
  { 
    id: '1', 
    name: 'Toyota Camry', 
    details: 'Sedan - 4-seater',
    price: '$45/day',
    image: 'https://cdn-icons-png.flaticon.com/512/2251/2251826.png'
  },
  { 
    id: '2', 
    name: 'Honda Civic', 
    details: 'Compact - 4-seater',
    price: '$40/day',
    image: 'https://cdn-icons-png.flaticon.com/512/3079/3079017.png'
  },
  { 
    id: '3', 
    name: 'Ford Mustang', 
    details: 'Convertible - 2-seater',
    price: '$75/day',
    image: 'https://cdn-icons-png.flaticon.com/512/744/744465.png'
  }
];

const VehicleCard = ({ vehicle }) => (
  <TouchableOpacity 
    style={tw`bg-white rounded-lg p-4 mb-3 w-full shadow-sm border border-gray-100 mt-2`}
  >
    <View style={tw`flex-row`}>
      <Image 
        source={{ uri: vehicle.image }} 
        style={tw`w-20 h-30 mr-3`}
        resizeMode="contain"
      />
      <View style={tw`justify-center`}>
        <Text style={tw`font-bold text-gray-900`}>{vehicle.name}</Text>
        <Text style={tw`font-bold text-blue-600`}>{vehicle.price}</Text>
        <Text style={tw`text-xs text-gray-500`}>{vehicle.details}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function Add() {
  return (
    <View style={tw`flex-1 bg-white p-5 pt-7`}>
      <Text style={tw`text-2xl font-semibold pt-2 text-gray-900`}>My vehicles</Text>
      <FlatList
        data={mockVehicles}
        renderItem={({ item }) => <VehicleCard vehicle={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
