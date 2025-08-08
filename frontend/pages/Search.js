import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Image, Switch, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../config/apiConfig';
import { AuthContext } from '../context/AuthContext';

const filters = [
  { label: 'Cars', icon: 'car-sport' },
  { label: 'Vans', icon: 'bus' },
  { label: 'Bikes', icon: 'bicycle' },
  { label: 'Trucks', icon: 'trail-sign' },
  { label: 'SUVs', icon: 'car' },
  { label: 'Electric', icon: 'flash' }
];

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
  const [electricOnly, setElectricOnly] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

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
        Alert.alert('Error', 'Failed to fetch vehicles. Please try again.');
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
        Alert.alert('Error', 'Failed to fetch vehicles for this district.');
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

  const clearAllFilters = () => {
    setSelectedFilter(null);
    setSelectedDistrict('');
    setSearchText('');
    setElectricOnly(false);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesCategory = selectedFilter ? vehicle.category === selectedFilter : true;
    const matchesDistrict = selectedDistrict ? vehicle.district === selectedDistrict : true;
    const matchesSearch = vehicle.name?.toLowerCase().includes(searchText.toLowerCase()) || 
                         vehicle.details?.toLowerCase().includes(searchText.toLowerCase());
    const matchesElectric = electricOnly ? vehicle.category === 'Electric' : true;
    const isNotUserVehicle = vehicle.owner !== username;
    return matchesCategory && matchesDistrict && matchesSearch && matchesElectric && isNotUserVehicle;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tw`bg-white rounded-xl mb-4 shadow-lg overflow-hidden`}
      onPress={() => navigation.navigate('VehicleDetails', { vehicle: item })}
    >
      <Image
        source={{ uri: item.imageUri || 'https://via.placeholder.com/300x200' }}
        style={tw`w-full h-48`}
        resizeMode="cover"
        onError={() => console.log('Image failed to load:', item.imageUri)}
      />
      <View style={tw`p-4`}>
        <Text style={tw`text-xl font-bold text-gray-900 mb-1`}>{item.name}</Text>
        <Text style={tw`text-gray-600 text-sm mb-2`}>{item.details}</Text>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-lg font-bold text-blue-600`}>Rs.{item.price}.00/day</Text>
          
        </View>
        <View style={tw`flex-row items-center mt-2`}>
          <Ionicons name="location" size={16} color="#6B7280" />
          <Text style={tw`ml-1 text-sm text-gray-600`}>{item.district}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-50`}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={tw`text-gray-600 mt-4`}>Loading vehicles...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header with Search */}
      <View style={tw`bg-white pt-12 pb-6 px-5 shadow-sm`}>
        <Text style={tw`text-3xl font-bold text-gray-900 mb-4`}>Find Vehicles</Text>
        <View style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-3`}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            style={tw`ml-3 flex-1 text-base text-gray-900`}
            placeholder="Search vehicles..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Toggle Button */}
      <TouchableOpacity
        onPress={() => setFilterPanelOpen(!filterPanelOpen)}
        style={tw`bg-blue-600 mx-5 my-3 rounded-full py-2 shadow-lg flex-row justify-center items-center`}
      >
        <Ionicons name={filterPanelOpen ? "chevron-up" : "chevron-down"} size={20} color="white" />
        <Text style={tw`text-white font-semibold ml-2`}>Filters</Text>
      </TouchableOpacity>

      {/* Filter Panel */}
      {filterPanelOpen && (
        <View style={tw`bg-white mx-5 rounded-2xl p-4 shadow-lg mb-4`}>
          {/* District Filter */}
          <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>District</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
            {['All', ...districts].map(district => (
              <TouchableOpacity
                key={district}
                style={tw.style(
                  'px-4 py-2 rounded-full mr-2',
                  (selectedDistrict === district || (district === 'All' && !selectedDistrict))
                    ? 'bg-blue-500 shadow-lg'
                    : 'bg-gray-100 border border-gray-200'
                )}
                onPress={() => setSelectedDistrict(district === 'All' ? '' : district)}
              >
                <Text style={tw.style(
                  (selectedDistrict === district || (district === 'All' && !selectedDistrict))
                    ? 'text-white font-semibold'
                    : 'text-gray-700'
                )}>
                  {district}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Category Filter */}
          <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
            {filters.map(filter => (
              <TouchableOpacity
                key={filter.label}
                style={tw.style(
                  'px-4 py-2 rounded-full mr-2 flex-row items-center',
                  selectedFilter === filter.label
                    ? 'bg-green-500 shadow-lg'
                    : 'bg-gray-100 border border-gray-200'
                )}
                onPress={() => setSelectedFilter(selectedFilter === filter.label ? null : filter.label)}
              >
                <Ionicons name={filter.icon} size={16} color={selectedFilter === filter.label ? 'white' : '#6B7280'} style={tw`mr-1`} />
                <Text style={tw.style(
                  selectedFilter === filter.label
                    ? 'text-white font-semibold'
                    : 'text-gray-700'
                )}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

         
          {/* Clear All Filters Button */}
          <TouchableOpacity
            onPress={clearAllFilters}
            style={tw`bg-red-500 rounded-full py-2 shadow-lg`}
          >
            <Text style={tw`text-white font-semibold text-center`}>Clear All Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Active Filters Display */}
      {(selectedDistrict || selectedFilter || searchText || electricOnly) && (
        <View style={tw`bg-white px-5 py-3 border-b border-gray-200`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row flex-wrap flex-1`}>
              {selectedDistrict && (
                <View style={tw`bg-blue-100 px-3 py-1 rounded-full mr-2 mb-1`}>
                  <Text style={tw`text-blue-600 text-sm`}>{selectedDistrict}</Text>
                </View>
              )}
              {selectedFilter && (
                <View style={tw`bg-green-100 px-3 py-1 rounded-full mr-2 mb-1`}>
                  <Text style={tw`text-green-600 text-sm`}>{selectedFilter}</Text>
                </View>
              )}
              {electricOnly && (
                <View style={tw`bg-teal-100 px-3 py-1 rounded-full mr-2 mb-1`}>
                  <Text style={tw`text-teal-600 text-sm`}>Electric Only</Text>
                </View>
              )}
              {searchText && (
                <View style={tw`bg-purple-100 px-3 py-1 rounded-full mr-2 mb-1`}>
                  <Text style={tw`text-purple-600 text-sm`}>{searchText}</Text>
                </View>
              )}
            </View>
            <TouchableOpacity onPress={clearAllFilters}>
              <Text style={tw`text-red-500 text-sm underline`}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Results */}
      <FlatList
        data={filteredVehicles}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`px-5 py-4`}
        ListEmptyComponent={
          <View style={tw`flex-1 justify-center items-center mt-20`}>
            <Ionicons name="car-sport-outline" size={64} color="#9CA3AF" />
            <Text style={tw`text-gray-500 text-lg mt-4`}>No vehicles found</Text>
            <Text style={tw`text-gray-400 text-sm mt-2`}>
              Try adjusting your filters or search terms
            </Text>
          </View>
        }
      />
    </View>
  );
}
