import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';
import { launchImageLibrary } from 'react-native-image-picker';

const categories = ['Cars', 'Vans', 'Bikes', 'Trucks', 'SUVs', 'Electric'];

export default function AddNewVehical() {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [brandName, setBrandName] = useState('');
  const [location, setLocation] = useState('');
  const [seatCount, setSeatCount] = useState('');
  const [model, setModel] = useState('');
  const [yearOfManufacture, setYearOfManufacture] = useState('');
  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const handleSave = () => {
    Alert.alert('Saved', 'New vehicle has been added.');
    // Placeholder: Add backend integration here later
  };

  const handleCancel = () => {
    // Clear all fields
    setName('');
    setDetails('');
    setPrice('');
    setImageUri('');
    setBrandName('');
    setLocation('');
    setSeatCount('');
    setModel('');
    setYearOfManufacture('');
    setTransmission('');
    setFuelType('');
    setEngineCapacity('');
    setCategory(categories[0]);
  };

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      (response) => {
        if (response.didCancel) {
          // User cancelled image picker
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'ImagePicker Error');
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-5 pt-7`} contentContainerStyle={tw`pb-20`}>
      <Text style={tw`text-xl font-bold mb-4`}>Add New Vehicle</Text>

      <Text style={tw`text-sm font-semibold mb-1`}>Name</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />

      <Text style={tw`text-sm font-semibold mb-1`}>Details</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        value={details}
        onChangeText={setDetails}
        placeholder="Details"
      />

      <Text style={tw`text-sm font-semibold mb-1`}>Price</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
      />

      <Text style={tw`text-sm font-semibold mb-1`}>Category</Text>
      <View style={tw`border border-gray-300 rounded mb-4`}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <Text style={tw`text-sm font-semibold mb-1`}>Photo</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={tw`w-40 h-40 mb-2 rounded`} />
      ) : (
        <View style={tw`w-40 h-40 mb-2 rounded bg-gray-200 justify-center items-center`}>
          <Text style={tw`text-gray-500`}>No photo selected</Text>
        </View>
      )}
      <TouchableOpacity
        style={tw`bg-blue-600 px-4 py-2 rounded mb-4`}
        onPress={pickImage}
      >
        <Text style={tw`text-white`}>Choose Photo</Text>
      </TouchableOpacity>

      <Text style={tw`text-sm font-semibold mb-1`}>Brand Name</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        value={brandName}
        onChangeText={setBrandName}
        placeholder="Brand Name"
      />

      <Text style={tw`text-sm font-semibold mb-1`}>Location</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
      />

      <Text style={tw`text-sm font-semibold mb-1`}>Seat Count</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        value={seatCount}
        onChangeText={setSeatCount}
        placeholder="Seat Count"
        keyboardType="numeric"
      />

      <Text style={tw`text-sm font-semibold mb-1`}>Model</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        value={model}
        onChangeText={setModel}
        placeholder="Model"
      />

      <Text style={tw`text-sm font-semibold mb-1`}>Year of Manufacture</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        value={yearOfManufacture}
        onChangeText={setYearOfManufacture}
        placeholder="Year of Manufacture"
        keyboardType="numeric"
      />

      <Text style={tw`text-sm font-semibold mb-1`}>Transmission</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        value={transmission}
        onChangeText={setTransmission}
        placeholder="Transmission"
      />

      <Text style={tw`text-sm font-semibold mb-1`}>Fuel Type</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        value={fuelType}
        onChangeText={setFuelType}
        placeholder="Fuel Type"
      />

      <Text style={tw`text-sm font-semibold mb-1`}>Engine Capacity</Text>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        value={engineCapacity}
        onChangeText={setEngineCapacity}
        placeholder="Engine Capacity"
      />

      <View style={tw`flex-row justify-between mb-4`}>
        <TouchableOpacity
          style={tw`bg-gray-400 px-4 py-2 rounded`}
          onPress={handleCancel}
        >
          <Text style={tw`text-white`}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-blue-600 px-4 py-2 rounded`}
          onPress={handleSave}
        >
          <Text style={tw`text-white`}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
