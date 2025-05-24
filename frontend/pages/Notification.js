import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRequests } from '../context/RequestsContext';

export default function Notification() {
  const { requests, removeRequest, updateRequestStatus } = useRequests();

  const handleAccept = (id) => {
    updateRequestStatus(id, 'Accepted');
  };

  const handleReject = (id) => {
    removeRequest(id);
  };

  const handleRemove = (id) => {
    removeRequest(id);
  };

  const handleSchedule = (id) => {
    Alert.alert('Schedule', 'Schedule your journey feature coming soon.');
  };

  if (requests.length === 0) {
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

      {requests.map((req) => (
        <View
          key={req.id}
          style={tw`border border-gray-300 rounded p-4 mb-4 relative bg-gray-50`}
        >
          <TouchableOpacity
            style={tw`absolute top-2 right-2 p-1`}
            onPress={() => removeRequest(req.id)}
          >
            <Ionicons name="close" size={20} color="gray" />
          </TouchableOpacity>

          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="information-circle-outline" size={20} color="gray" />
            <Text style={tw`ml-2 text-gray-700 font-semibold`}>
              {req.type === 'new' ? 'New Rental Request' : 'Your Request'}
            </Text>
          </View>

          <Text style={tw`mb-4 text-gray-700`}>{req.message}</Text>

          {req.type === 'new' && (
            <View style={tw`flex-row`}>
              <TouchableOpacity
                style={tw`bg-green-600 px-4 py-2 rounded mr-3`}
                onPress={() => handleAccept(req.id)}
              >
                <Text style={tw`text-white`}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-red-600 px-4 py-2 rounded`}
                onPress={() => handleReject(req.id)}
              >
                <Text style={tw`text-white`}>Reject</Text>
              </TouchableOpacity>
            </View>
          )}

          {req.type === 'pending' && (
            <View style={tw`flex-row`}>
              <View style={tw`bg-yellow-400 px-4 py-2 rounded mr-3`}>
                <Text style={tw`text-white`}>Pending</Text>
              </View>
              <TouchableOpacity
                style={tw`bg-red-600 px-4 py-2 rounded`}
                onPress={() => handleRemove(req.id)}
              >
                <Text style={tw`text-white`}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}

          {req.type === 'accepted' && (
            <View style={tw`flex-row`}>
              <View style={tw`bg-green-600 px-4 py-2 rounded mr-3`}>
                <Text style={tw`text-white`}>Accepted</Text>
              </View>
              <TouchableOpacity
                style={tw`bg-blue-600 px-4 py-2 rounded`}
                onPress={() => handleSchedule(req.id)}
              >
                <Text style={tw`text-white`}>Schedule your Journey</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
