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

  const VehicleCard = ({ vehicle, horizontal = true }) => (
    <TouchableOpacity 
      style={tw`bg-white rounded-lg p-4 ${horizontal ? 'mr-3 w-40 h-50' : 'mb-3 w-full'} shadow-sm border border-gray-100`}
      onPress={() => handleVehiclePress(vehicle)}
    >
      <View style={tw``}>
        <Image 
          source={{ uri: vehicle.imageUri }} 
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

      {/* Near You Section */}
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-semibold mb-2 text-gray-900`}>Near By You</Text>
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
          renderItem={({item}) => <VehicleCard vehicle={item} horizontal={false} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
