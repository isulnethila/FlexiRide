import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [nearbyVehicles, setNearbyVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://192.168.253.7:8080/api/vehicles', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Assuming data has popular and nearby vehicles arrays
          setVehicles(data.popular || []);
          setNearbyVehicles(data.nearby || []);
        } else {
          console.log('Failed to fetch vehicles');
        }
      } catch (error) {
        console.log('Error fetching vehicles:', error);
      }
    };

    if (userToken) {
      fetchVehicles();
    }
  }, [userToken]);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleVehiclePress = (vehicle) => {
    navigation.navigate('VehicleDetails', { vehicle });
  };

  const VehicleCard = ({ vehicle, horizontal = true }) => (
    <TouchableOpacity 
      style={tw`bg-white rounded-lg p-4 ${horizontal ? 'mr-3 w-40 h-50' : 'mb-3 w-full'} shadow-sm border border-gray-100`}
      onPress={() => handleVehiclePress(vehicle)}
    >
      <View style={tw``}>
        <Image 
          source={{ uri: vehicle.image }} 
          style={tw`${horizontal ? 'w-15 h-20 mb-2' : 'w-20 h-30 mb-2 justify-center'} mr-3`}
          resizeMode="contain"
        />
        <View style={tw``}>
          <View style={tw``}>
            <Text style={tw`font-bold text-gray-900`}>{vehicle.name}</Text>
            <Text style={tw`font-bold text-blue-600`}>{vehicle.price}</Text>
          </View>
          <Text style={tw`text-xs text-gray-500`}>{vehicle.details}</Text>
          {vehicle.distance && (
            <Text style={tw`text-xs text-gray-400 mt-1`}>{vehicle.distance} away</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-white p-5 pt-7`}>
      {/* Header Section */}
      <View style={tw`mb-3 flex-row justify-between items-center`}>
        <Text style={tw`text-2xl font-bold text-gray-900`}>FlexiRide</Text>
      <TouchableOpacity style={tw`p-2`} onPress={() => navigation.navigate('Notification')}>
        <Ionicons name="notifications-outline" size={28} color="black" />
      </TouchableOpacity>
      </View>
      <Text style={tw`text-xs text-gray-500 mb-3`}>{formattedDate}</Text>

      {/* Popular Rentals */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2 text-gray-900`}>Popular Rentals</Text>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`pb-1`}
        >
          {vehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} horizontal />
          ))}
        </ScrollView>
      </View>

      {/* Near You Section */}
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-semibold mb-2 text-gray-900`}>Near By You</Text>
        <FlatList
          data={nearbyVehicles}
          renderItem={({item}) => <VehicleCard vehicle={item} horizontal={false} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
