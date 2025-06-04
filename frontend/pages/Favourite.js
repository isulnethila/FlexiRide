import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useFavorites } from '../context/FavoritesContext';

export default function Favourite({ navigation }) {
  const { favorites, removeFavorite } = useFavorites();

  const renderItem = ({ item }) => (
    <>
    
    <TouchableOpacity
      onPress={() => navigation.navigate('VehicleDetails', { vehicle: item })}
      style={tw`flex-row items-center p-4 border-b border-gray-200`}
    >
      <Image source={{ uri: item.imageUri }} style={tw`w-20 h-20 rounded mr-4`} />
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-semibold`}>{item.name}</Text>
        <Text style={tw`text-gray-600`}>{item.details}</Text>
        <Text style={tw`text-blue-600 font-bold`}>{item.price}</Text>
      </View>
      
    </TouchableOpacity>

    </>
    
  );

  if (favorites.length === 0) {
    return (
      <>
      <Text style={tw`text-xl font-bold  mb-4 m-4 mt-7`}>Saved</Text>
       <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-gray-500 text-lg`}>No favorite vehicles added yet.</Text>
      </View>

      </>
     
    );
  }

  return (
    <>
    <Text style={tw`text-xl font-bold  mb-4 m-4 mt-7`}>Saved</Text>
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={tw`p-4`}
    />


    
    </>
    
  );
}
