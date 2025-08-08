import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { AuthContext } from '../context/AuthContext';
import API_BASE_URL from '../config/apiConfig';

export default function Home() {
  const navigation = useNavigation();
  const { loggedIn, username, userToken } = useContext(AuthContext);
  const [nearbyVehicles, setNearbyVehicles] = useState([]);
  const [userDistrict, setUserDistrict] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/profile?username=${username}`);
        if (response.ok) {
          const userData = await response.json();
          console.log('User profile fetched:', userData);
          if (userData.district) {
            setUserDistrict(userData.district);
          } else {
            console.log('User district not found in profile data');
            setUserDistrict(null);
          }
        } else {
          console.log('Failed to fetch user profile, status:', response.status);
          setUserDistrict(null);
        }
      } catch (error) {
        console.log('Error fetching user profile:', error);
        setUserDistrict(null);
      }
    };

    if (username) {
      console.log('Fetching user profile for username:', username);
      fetchUserProfile();
    }
  }, [username]);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);
      try {
        let url;
        if (loggedIn) {
          if (userDistrict) {
            url = `${API_BASE_URL}/api/vehicles/district/${userDistrict}`;
            console.log('Fetching vehicles for district:', userDistrict);
          } else {
            console.log('User district not set, cannot fetch district vehicles');
            setNearbyVehicles([]);
            setLoading(false);
            return;
          }
        } else {
          url = `${API_BASE_URL}/api/vehicles`;
          console.log('User not logged in, fetching all vehicles');
        }
        const response = await fetch(url, {
          headers: {
            Authorization: userToken ? `Bearer ${userToken}` : '',
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Vehicles fetched:', data);
          const filteredVehicles = loggedIn ? data.filter(vehicle => vehicle.username !== username) : data;
          console.log('Filtered vehicles:', filteredVehicles);
          setNearbyVehicles(filteredVehicles);
        } else {
          console.log('Failed to fetch vehicles, status:', response.status);
          setError('Failed to fetch vehicles');
          setNearbyVehicles([]);
        }
      } catch (error) {
        console.log('Error fetching vehicles:', error);
        setError('Error fetching vehicles');
        setNearbyVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [loggedIn, userDistrict, userToken, username]);

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

  const VehicleCard = ({ vehicle }) => (
    <TouchableOpacity 
      style={tw`bg-white rounded-xl mb-4 shadow-lg overflow-hidden mx-5`}
      onPress={() => handleVehiclePress(vehicle)}
    >
      <Image 
        source={{ uri: vehicle.imageUri || 'https://via.placeholder.com/300x200' }} 
        style={tw`w-full h-48`}
        resizeMode="cover"
      />
      <View style={tw`p-4`}>
        <Text style={tw`text-xl font-bold text-gray-900 mb-1`}>{vehicle.name}</Text>
        <Text style={tw`text-gray-600 text-sm mb-2`}>{vehicle.details}</Text>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-lg font-bold text-blue-600`}>Rs.{vehicle.price}.00/day</Text>
        </View>
        <View style={tw`flex-row items-center mt-2`}>
          <Ionicons name="location" size={16} color="#6B7280" />
          <Text style={tw`ml-1 text-sm text-gray-600`}>{vehicle.district}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header Section */}
      <View style={tw`bg-white pt-12 pb-6 px-5 shadow-sm`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-3xl font-bold text-gray-900`}>FlexiRide</Text>
          <TouchableOpacity style={tw`p-2`} onPress={() => navigation.navigate('Notification')}>
            <Ionicons name="notifications-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={tw`text-sm text-gray-500`}>{formattedDate}</Text>
      </View>

      {/* Near You Section */}
      <View style={tw`flex-1 px-5`}>
        <Text style={tw`text-2xl font-bold mb-4 text-gray-900`}>Near By You</Text>
        {loading && (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-gray-500 text-lg`}>Loading vehicles...</Text>
          </View>
        )}
        {error && (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-red-500 text-lg`}>{error}</Text>
          </View>
        )}
        {!loading && !error && nearbyVehicles.length === 0 && (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-gray-500 text-lg`}>No vehicles available in your area.</Text>
          </View>
        )}
        <FlatList
          data={nearbyVehicles}
          renderItem={({item}) => <VehicleCard vehicle={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-5`}
        />
      </View>
    </View>
  );
}
