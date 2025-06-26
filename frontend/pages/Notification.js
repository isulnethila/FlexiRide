import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/apiConfig';

export default function Notification() {
  const { username } = useAuth(); // Use username from AuthContext
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    if (!username) {
      setMessages([]);
      setLoading(false);
      return;
    }
    try {
      // Fetch messages for this user (using username)
      const response = await fetch(`${API_BASE_URL}/requestar/user/${username}`);
      if (response.ok) {
        const userMessages = await response.json();
        setMessages(userMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, [username]);

  const handleRemove = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleSchedule = (id) => {
    Alert.alert('Schedule', 'Schedule your journey feature coming soon.');
  };

  if (loading) {
    return (
      <View style={tw`flex-1 bg-white justify-center items-center`}>
        <Text style={tw`text-xl font-bold`}>Loading Messages...</Text>
      </View>
    );
  }

  if (messages.length === 0) {
    return (
      <View style={tw`flex-1 bg-white justify-center items-center`}>
        <Text style={tw`text-xl font-bold`}>Messages</Text>
        <Text style={tw`mt-4 text-center text-gray-600`}>
          You have no new messages.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-white p-4 mt-6`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Messages</Text>

      {messages.map((msg, index) => (
        <View key={msg.id ?? index} style={tw`border border-gray-300 rounded p-4 mb-4 relative bg-gray-50`}>
          <TouchableOpacity
            style={tw`absolute top-2 right-2 p-1`}
            onPress={() => handleRemove(msg.id)}
          >
            <Ionicons name="close" size={20} color="gray" />
          </TouchableOpacity>

          <Text style={tw`text-lg font-semibold mb-2`}>
            Message from: {msg.requestUsername}
          </Text>

          <Text style={tw`mb-2`}>{msg.message}</Text>

          {msg.vehicleName && (
            <Text style={tw`mb-1 text-gray-600`}>Vehicle: {msg.vehicleName}</Text>
          )}

          {msg.pickupDate && (
            <Text style={tw`mb-1 text-gray-600`}>Pickup: {msg.pickupDate} at {msg.pickupTime}</Text>
          )}

          {msg.returnDate && (
            <Text style={tw`mb-1 text-gray-600`}>Return: {msg.returnDate}</Text>
          )}

          {msg.cost !== undefined && (
            <Text style={tw`mb-1 text-gray-600`}>Cost: Rs.{msg.cost}.00</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
