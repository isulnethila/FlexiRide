import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../config/apiConfig';


const filters = ['Cars', 'Vans', 'Bikes', 'Trucks', 'SUVs', 'Electric'];

export default function Search() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/vehicles`)
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesCategory = selectedFilter ? vehicle.category === selectedFilter : true;
    const matchesSearch = vehicle.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('VehicleDetails', { vehicle: item })}
      style={tw`bg-white rounded-lg p-4 mb-3 w-full shadow-sm border border-gray-100`}
    >
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-row flex-1`}>
          <Image 
            source={{ uri: item.imageUri }} 
            style={tw`w-20 h-30 mr-3`}
            resizeMode="contain"
          />
          <View style={tw`justify-center flex-1`}>
            <Text style={tw`font-bold text-gray-900`}>{item.name}</Text>
            <Text style={tw`font-bold text-blue-600`}>{item.price}</Text>
            <Text style={tw`text-xs text-gray-500`}>{item.details}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-white p-5 pt-7`}>
      <View style={tw`mb-3 flex-row justify-between items-center`}>
        <Text style={tw`text-2xl font-bold`}>Search</Text>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2`}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={tw`mr-3 px-4 py-2 rounded-full border ${selectedFilter === filter ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={tw`${selectedFilter === filter ? 'text-white' : 'text-gray-700'}`}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={tw`flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-4`}>
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput
          style={tw`ml-2 flex-1 text-base`}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
        />
      </View>

      <Text style={tw`text-lg mb-2`}>Search results for: {searchText}</Text>

      <FlatList
        data={filteredVehicles}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
