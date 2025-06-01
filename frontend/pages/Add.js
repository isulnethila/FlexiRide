import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import API_BASE_URL from '../config/apiConfig';

const VehicleCard = ({ vehicle, onEditPress }) => (
  <View 
    style={tw`bg-white rounded-lg p-4 mb-3 w-full shadow-sm border border-gray-100`}
  >
    <View style={tw`flex-row justify-between items-center`}>
      <View style={tw`flex-row flex-1`}>
        <Image 
          source={{ uri: vehicle.imageUri }} 
          style={tw`w-20 h-30 mr-3`}
          resizeMode="contain"
        />
        <View style={tw`justify-center flex-1`}>
          <Text style={tw`font-bold text-gray-900`}>{vehicle.name}</Text>
          <Text style={tw`font-bold text-blue-600`}>{vehicle.price}</Text>
          <Text style={tw`text-xs text-gray-500`}>{vehicle.details}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={tw`bg-blue-600 px-3 py-1 rounded`}
        onPress={onEditPress}
      >
        <Text style={tw`text-white text-sm`}>Edit</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function Add() {
  const navigation = useNavigation();
  const { loggedIn, username } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (loggedIn && username) {
      fetch(`${API_BASE_URL}/api/vehicles/user/${username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user vehicles');
          }
          return response.json();
        })
        .then(data => setVehicles(data))
        .catch(error => Alert.alert('Error', error.message));
    }
  }, [loggedIn, username]);

  const handleEditPress = (vehicle) => {
    navigation.navigate('Edit', { vehicle });
  };

  return (
    <View style={tw`flex-1 bg-white p-5 pt-7`}>
      <Text style={tw`text-lg font-semibold mb-2 text-gray-900`}>My vehicles</Text>
      <FlatList
        data={vehicles}
        renderItem={({ item }) => (
          <VehicleCard 
            vehicle={item} 
            onEditPress={() => handleEditPress(item)} 
          />
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={tw`absolute bottom-10 right-5 bg-green-600 px-5 py-3 rounded-full shadow-lg`}
        onPress={() => navigation.navigate('AddNewVehical')}
      >
        <Text style={tw`text-white text-lg font-semibold`}>Add New Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
}
