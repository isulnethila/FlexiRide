import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function Notification() {
  return (
    <View style={tw`flex-1 bg-white justify-center items-center`}>
      <Text style={tw`text-xl font-bold`}>Notifications</Text>
      <Text style={tw`mt-4 text-center text-gray-600`}>
        You have no new notifications.
      </Text>
    </View>
  );
}
