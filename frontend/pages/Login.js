import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Placeholder for login logic
    Alert.alert('Login', `Email: ${email}\nPassword: ${password}`);
  };

  return (
    <View style={tw`flex-1 justify-center p-6 bg-white`}>
      <Text style={tw`text-3xl font-bold mb-6 text-center`}>Login</Text>

      <Text style={tw`mb-2 font-semibold`}>Email</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-3 mb-4`}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={tw`mb-2 font-semibold`}>Password</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-3 mb-6`}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={tw`bg-blue-600 rounded p-4 mb-4`}
        onPress={handleLogin}
      >
        <Text style={tw`text-white text-center font-semibold`}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={tw`text-center text-blue-600`}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
