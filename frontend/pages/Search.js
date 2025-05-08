import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

const filters = ['Cars', 'Vans', 'Bikes', 'Trucks', 'SUVs', 'Electric'];

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);

  return (
    <View style={tw`flex-1 bg-white p-5 pt-7`}>
      <View style={tw`mb-3 flex-row justify-between items-center`}>
        <Text style={tw`text-2xl font-bold`}>Search</Text>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2`}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={tw`mr-3 px-4 py-2 rounded-full border ${selectedFilter === filter ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={tw`${selectedFilter === filter ? 'text-white' : 'text-gray-700'}`}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={tw`flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-4`}>
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput
          style={tw`ml-2 flex-1 text-base`}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
        />
      </View>

      <Text style={tw`text-lg`}>Search results for: {searchText}</Text>
      {/* Add search results list here */}
    </View>
  );
}
