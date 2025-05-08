import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

export default function StartupScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainTabs', { screen: 'Home' });
    }, 2000);
  }, []);

  return (
    <View style={tw`flex-1 bg-black items-center justify-center px-6`}>
      <Text style={tw`text-white text-4xl font-bold mb-8`}>FlexiRide</Text>

      <Image
        source={require('../assets/1.png')}
        style={{
          width: 250,
          height: 150,
          resizeMode: 'contain',
          marginBottom: 30,
        }}
      />

      <Text style={tw` text-white  text-2xl font-bold pr-20`}>Drive Your Way.</Text>
      <Text style={tw`text-right text-gray-400 text-center mb-10`}>
        Experience flexible rentals from{'\n'}trusted car owners near you.
      </Text>

      
    </View>
  );
}
