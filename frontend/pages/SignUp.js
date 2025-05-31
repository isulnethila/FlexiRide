import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const districts = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara",
  "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya", "Trincomalee",
  "Batticaloa", "Ampara", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Ratnapura", "Kegalle"
];

export default function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!city) {
      Alert.alert('Error', 'Please select a city');
      return;
    }
    if (!district) {
      Alert.alert('Error', 'Please select a district');
      return;
    }
    // Placeholder for sign up logic
    Alert.alert('Sign Up', `Email: ${email}\nPassword: ${password}\nCity: ${city}\nDistrict: ${district}`);
  };

  return (
    <View style={tw`flex-1 justify-center p-6 bg-white`}>
      <Text style={tw`text-3xl font-bold mb-6 text-center`}>Sign Up</Text>

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
        style={tw`border border-gray-300 rounded p-3 mb-4`}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={tw`mb-2 font-semibold`}>Confirm Password</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-3 mb-6`}
        placeholder="Confirm your password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Text style={tw`mb-2 font-semibold`}>City</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-3 mb-4`}
        placeholder="Enter your city"
        value={city}
        onChangeText={setCity}
      />

      <Text style={tw`mb-2 font-semibold`}>District</Text>
      <View style={tw`border border-gray-300 rounded mb-6`}>
        <Picker
          selectedValue={district}
          onValueChange={(itemValue) => setDistrict(itemValue)}
        >
          <Picker.Item label="Select a district" value="" />
          {districts.map((dist) => (
            <Picker.Item key={dist} label={dist} value={dist} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={tw`bg-blue-600 rounded p-4 mb-4`}
        onPress={handleSignUp}
      >
        <Text style={tw`text-white text-center font-semibold`}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={tw`text-center text-blue-600`}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
