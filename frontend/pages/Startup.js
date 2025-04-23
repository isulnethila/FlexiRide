import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function StartupScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <Text className="text-white text-4xl font-bold mb-8">FlexiRide</Text>

      <Image
        source={require('../assets/1.png')}
        style={{
          width: 250,
          height: 150,
          resizeMode: 'contain',
          marginBottom: 30,
        }}
      />

      <Text className="text-white text-2xl font-bold mb-2">Drive Your Way.</Text>
      <Text className="text-gray-400 text-center mb-10">
        Experience flexible rentals from{'\n'}trusted car owners near you.
      </Text>

      <TouchableOpacity
        className="bg-white px-10 py-3 rounded-full"
        onPress={() => navigation.navigate('Home')}
      >
        <Text className="text-black text-lg font-semibold">Let’s Go</Text>
      </TouchableOpacity>
    </View>
  );
}
