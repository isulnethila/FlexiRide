import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/apiConfig';

export default function Notification() {
  const { username } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!username) {
      setNotifications([]);
      setLoading(false);
      return;
    }
    try {
      // Fetch notifications where user is the user
      const userRes = await fetch(`${API_BASE_URL}/api/notifications/allWithUserName`);
      let allNotifications = [];
      if (userRes.ok) {
        const allWithUserName = await userRes.json();
        // Filter for notifications where userName matches logged-in user
        allNotifications = allWithUserName.filter(
          (n) => n.userName === username
        );
      }

      // Fetch notifications where user is the vehicle owner
      const ownerRes = await fetch(`${API_BASE_URL}/api/notifications/vehicleOwner/${username}`);
      if (ownerRes.ok) {
        const ownerNotifications = await ownerRes.json();
        // If these notifications are not in allNotifications, add them
        ownerNotifications.forEach((n) => {
          if (!allNotifications.find((x) => x.id === n.id)) {
            allNotifications.push(n);
          }
        });
      }

      setNotifications(allNotifications);
    } catch (error) {
      setNotifications([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, [username]);

  const handleRemove = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleSchedule = (id) => {
    Alert.alert('Schedule', 'Schedule your journey feature coming soon.');
  };

  if (loading) {
    return (
      <View style={tw`flex-1 bg-white justify-center items-center`}>
        <Text style={tw`text-xl font-bold`}>Loading Notifications...</Text>
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={tw`flex-1 bg-white justify-center items-center`}>
        <Text style={tw`text-xl font-bold`}>Notifications</Text>
        <Text style={tw`mt-4 text-center text-gray-600`}>
          You have no new notifications.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-white p-4 mt-6`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Notifications</Text>

      {notifications.map((notif) => (
        <View
          key={notif.id}
          style={tw`border border-gray-300 rounded p-4 mb-4 relative bg-gray-50`}
        >
          <TouchableOpacity
            style={tw`absolute top-2 right-2 p-1`}
            onPress={() => handleRemove(notif.id)}
          >
            <Ionicons name="close" size={20} color="gray" />
          </TouchableOpacity>

          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="information-circle-outline" size={20} color="gray" />
            <Text style={tw`ml-2 text-gray-700 font-semibold`}>
              Notification
            </Text>
          </View>

          <Text style={tw`mb-4 text-gray-700`}>
            {notif.userName ? `User: ${notif.userName} - ` : ''}
            {notif.type === 'schedule' 
              ? 'Your Schedule has been created successfully' 
              : notif.type === 'vehicleRequest' 
                ? 'your vehicle is requested' 
                : notif.message}
          </Text>
          {notif.vehicleName && (
            <Text style={tw`mb-1 text-gray-600`}>Vehicle: {notif.vehicleName}</Text>
          )}
          {notif.phoneNumber && (
            <Text style={tw`mb-1 text-gray-600`}>Phone: {notif.phoneNumber}</Text>
          )}
          {notif.pickupDate && (
            <Text style={tw`mb-1 text-gray-600`}>Pickup Date: {notif.pickupDate}</Text>
          )}
          {notif.returnDate && (
            <Text style={tw`mb-1 text-gray-600`}>Return Date: {notif.returnDate}</Text>
          )}
          {notif.cost !== undefined && (
            <Text style={tw`mb-1 text-gray-600`}>Cost: Rs.{notif.cost}.00</Text>
          )}
          {notif.pickupTime && (
            <Text style={tw`mb-1 text-gray-600`}>Pickup Time: {notif.pickupTime}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
