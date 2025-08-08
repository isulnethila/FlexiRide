import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../config/apiConfig';
import { AuthContext } from '../context/AuthContext';

const filters = ['Cars', 'Vans', 'Bikes', 'Trucks', 'SUVs', 'Electric'];
const districts = [
  'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Batticaloa', 
  'Matara', 'Anuradhapura', 'Badulla', 'Ratnapura', 'Kurunegala', 
  'Nuwara Eliya', 'Trincomalee', 'Hambantota', 'Polonnaruwa', 
  'Ampara', 'Puttalam', 'Monaragala', 'Kegalle', 'Matale'
];

export default function Search() {
  const navigation = useNavigation();
  const { username } = useContext(AuthContext);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all vehicles
  const fetchAllVehicles = () => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/api/vehicles`)
      .then(response => response.json())
      .then(data => {
        setVehicles(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vehicles:', error);
        setIsLoading(false);
      });
  };

  // Fetch vehicles by district
  const fetchVehiclesByDistrict = (district) => {
    if (!district) {
      fetchAllVehicles();
      return;
    }
    
    setIsLoading(true);
    fetch(`${API_BASE_URL}/api/vehicles/district/${district}`)
      .then(response => response.json())
      .then(data => {
        setVehicles(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vehicles by district:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllVehicles();
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      fetchVehiclesByDistrict(selectedDistrict);
    } else {
      fetchAllVehicles();
    }
  }, [selectedDistrict]);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesCategory = selectedFilter ? vehicle.category === selectedFilter : true;
    const matchesDistrict = selectedDistrict ? vehicle.district === selectedDistrict : true;
    const matchesSearch = vehicle.name.toLowerCase().includes(searchText.toLowerCase()) || 
                         vehicle.details.toLowerCase().includes(searchText.toLowerCase());
    const isNotUserVehicle = vehicle.owner !== username;
    return matchesCategory && matchesDistrict && matchesSearch && isNotUserVehicle;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('VehicleDetails', { vehicle: item })}
      style={tw`bg-white rounded-lg p-4 mb-3 w-full shadow-sm border border-gray-100`}
    >
      <View style={tw`flex-row`}>
        <Image 
          source={{ uri: item.imageUri }} 
          style={tw`w-20 h-20 rounded-lg mr-3`}
          resizeMode="cover"
        />
        <View style={tw`flex-1`}>
          <Text style={tw`font-bold text-lg text-gray-900`}>{item.name}</Text>
          <Text style={tw`text-blue-600 font-semibold`}>{item.price}</Text>
          <Text style={tw`text-sm text-gray-600`}>{item.district}, {item.city}</Text>
          <Text style={tw`text-xs text-gray-500`}>{item.details}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-white p-5 pt-7`}>
      <View style={tw`mb-4 flex-row justify-between items-center`}>
        <Text style={tw`text-2xl font-bold`}>Search</Text>
      </View>

      {/* District Filter */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2`}>District</Text>
        <View style={tw`border border-gray-300 rounded-lg`}>
          <Picker
            selectedValue={selectedDistrict}
            onValueChange={(value) => setSelectedDistrict(value)}
            style={tw`h-12`}
          >
            <Picker.Item label="All Districts" value="" />
            {districts.map(district => (
              <Picker.Item key={district} label={district} value={district} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Category Filter */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2`}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={tw`mr-3 px-4 py-2 rounded-full border ${selectedFilter === filter ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}
              onPress={() => setSelectedFilter(selectedFilter === filter ? null : filter)}
            >
              <Text style={tw`${selectedFilter === filter ? 'text-white' : 'text-gray-700'}`}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Search Input */}
      <View style={tw`flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-4`}>
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput
          style={tw`ml-2 flex-1 text-base`}
          placeholder="Search vehicles..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Results */}
      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredVehicles}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={tw`flex-1 justify-center items-center mt-10`}>
              <Text>No vehicles found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
