import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';


export default function VehicleDetails({ route }) {
    const navigation = useNavigation();
   const { vehicle } = route.params;
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { loggedIn } = useContext(AuthContext);



  const toggleFavorite = () => {
    if (isFavorite(vehicle.id)) {
      removeFavorite(vehicle.id);
    } else {
      addFavorite(vehicle);
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4 mt-5`}>
      <Text style={tw`text-3xl font-bold mb-4 `}>{vehicle.name}</Text>
      <Image 
        source={{ uri: vehicle.imageUri }} 
        style={tw`w-full h-48 mb-4 rounded-lg`}
        resizeMode="contain"
      />
      <Text style={tw`text-lg mb-2`}>{vehicle.details}</Text>
      <Text style={tw`text-lg font-semibold mb-2`}>Price per day: {vehicle.price}</Text>
      {vehicle.category && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Category: {vehicle.category}</Text>
      )}
      {vehicle.distance && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Distance: {vehicle.distance}</Text>
      )}
      {vehicle.brandName && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Brand Name: {vehicle.brandName}</Text>
      )}
      {vehicle.location && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Location: {vehicle.location}</Text>
      )}
      {vehicle.city && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>City: {vehicle.city}</Text>
      )}
      {vehicle.district && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>District: {vehicle.district}</Text>
      )}
      {vehicle.seatCount && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Seat Count: {vehicle.seatCount}</Text>
      )}
      {vehicle.model && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Model: {vehicle.model}</Text>
      )}
      {vehicle.yearOfManufacture && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Year of Manufacture: {vehicle.yearOfManufacture}</Text>
      )}
      {vehicle.transmission && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Transmission: {vehicle.transmission}</Text>
      )}
      {vehicle.fuelType && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Fuel Type: {vehicle.fuelType}</Text>
      )}
      {vehicle.engineCapacity && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Engine Capacity: {vehicle.engineCapacity}</Text>
      )}

     

      <View style={tw`flex-row justify-between items-center pt-10`}>
  <TouchableOpacity
    style={tw`bg-gray-800 px-4 py-2 rounded w-40`}
    onPress={() => {
      // Check if user is logged in before navigating
      if (loggedIn) {
        navigation.navigate('Schedule', { vehicle });
      } else {
        navigation.navigate('Login');
      }
    }}
  >
    <Text style={tw`text-white text-center`}>Schedule</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={tw`bg-white p-2 rounded-full shadow`}
    onPress={toggleFavorite}
  >
    <Ionicons
      name={isFavorite(vehicle.id) ? 'heart' : 'heart-outline'}
      size={28}
      color={isFavorite(vehicle.id) ? 'red' : 'gray'}
    />
  </TouchableOpacity>
</View>
     
    </ScrollView>
  );
}
