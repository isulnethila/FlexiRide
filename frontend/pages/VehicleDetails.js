import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useFavorites } from '../context/FavoritesContext';

export default function VehicleDetails({ route }) {
  const { vehicle } = route.params;
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);

  const onPickupChange = (event, selectedDate) => {
    setShowPickupPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setPickupDate(selectedDate);
    }
  };

  const onReturnChange = (event, selectedDate) => {
    setShowReturnPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setReturnDate(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const toggleFavorite = () => {
    if (isFavorite(vehicle.id)) {
      removeFavorite(vehicle.id);
    } else {
      addFavorite(vehicle);
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-3xl font-bold mb-4`}>{vehicle.name}</Text>
      <Image 
        source={{ uri: vehicle.image }} 
        style={tw`w-full h-48 mb-4 rounded-lg`}
        resizeMode="contain"
      />
      <Text style={tw`text-lg mb-2`}>{vehicle.details}</Text>
      <Text style={tw`text-lg font-semibold mb-2`}>Price: {vehicle.price}</Text>
      {vehicle.distance && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Distance: {vehicle.distance}</Text>
      )}
      {vehicle.brandName && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Brand Name: {vehicle.brandName}</Text>
      )}
      {vehicle.location && (
        <Text style={tw`text-sm text-gray-600 mb-2`}>Location: {vehicle.location}</Text>
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

      {/* Schedule Section */}
      <Text style={tw`text-xl font-bold mt-6 mb-4`}>Schedule</Text>
      <View style={tw`flex-row justify-between`}>
        <TouchableOpacity
          style={tw`border border-gray-400 rounded p-4 w-1/2 mr-2`}
          onPress={() => setShowPickupPicker(true)}
        >
          <Text style={tw`text-gray-500`}>Pickup Date</Text>
          <Text style={tw`mt-2 text-lg`}>{formatDate(pickupDate)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`border border-gray-400 rounded p-4 w-1/2 ml-2`}
          onPress={() => setShowReturnPicker(true)}
        >
          <Text style={tw`text-gray-500`}>Return Date</Text>
          <Text style={tw`mt-2 text-lg`}>{formatDate(returnDate)}</Text>
        </TouchableOpacity>
      </View>

      {showPickupPicker && (
        <DateTimePicker
          value={pickupDate}
          mode="date"
          display="default"
          onChange={onPickupChange}
          minimumDate={new Date()}
        />
      )}
      {showReturnPicker && (
        <DateTimePicker
          value={returnDate}
          mode="date"
          display="default"
          onChange={onReturnChange}
          minimumDate={pickupDate}
        />
      )}

      <TouchableOpacity
        style={tw`self-end mt-6 p-2 bg-white rounded-full shadow`}
        onPress={toggleFavorite}
      >
        <Ionicons
          name={isFavorite(vehicle.id) ? 'heart' : 'heart-outline'}
          size={28}
          color={isFavorite(vehicle.id) ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}
