import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.253.7:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const text = await response.text();
        if (text === 'Login successful') {
          login();
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
          });
        } else {
          Alert.alert('Login Failed', text);
        }
      } else {
        const errorText = await response.text();
        Alert.alert('Login Failed', errorText || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Login Error', error.message || 'An error occurred during login');
    }
  };

  return (
    <View style={tw`flex-1 justify-center p-6 bg-white`}>
      <Text style={tw`text-3xl font-bold mb-6 text-center`}>Login</Text>

      <Text style={tw`mb-2 font-semibold`}>Username</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-3 mb-4`}
        placeholder="Enter your username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
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
