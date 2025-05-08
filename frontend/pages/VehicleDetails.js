import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

export default function VehicleDetails({ route }) {
  const { vehicle } = route.params;

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-3xl font-bold mb-4`}>{vehicle.name}</Text>
      <Text style={tw`text-lg`}>{vehicle.details}</Text>
      {/* Add more vehicle details here as needed */}
    </ScrollView>
  );
}
