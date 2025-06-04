import { View, Text, TouchableOpacity, TextInput, Platform, Button } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';


export default function Schedule({ route }) {
  const { vehicle } = route.params;
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [pickupTime, setPickupTime] = useState(new Date());
  const [showPickupTime, setShowPickupTime] = useState(false);

  const [name, setName] = useState('');

  const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  const dayCount = Math.round((returnDate - pickupDate) / oneDay > 0 ? Math.round((returnDate - pickupDate) / oneDay) : 1);
  const totalCost = dayCount * parseFloat(vehicle.price);
  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const onPickupChange = (event, selectedDate) => {
    setShowPickupPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setPickupDate(selectedDate);
    }
  };

  const onReturnChange = (event, selectedDate) => {
    setShowReturnPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setReturnDate(selectedDate);
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-4 mt-5`}>
      <Text style={tw`text-3xl font-bold  mb-10`}>Schedule</Text>
      {/* Schedule Section */}

      <Text style={tw`text-lg mt-4 mb-2 ml-1`}>set Days:</Text>
      <View style={tw`flex-row justify-between`}>
        <TouchableOpacity
          style={tw`border border-gray-400 rounded p-4 w-1/2 mr-2`}
          onPress={() => setShowPickupPicker(true)}
        >
          <Text style={tw`text-gray-500`}>Pickup Date</Text>
          <Text style={tw`mt-2 text-lg`}>{formatDate(pickupDate)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`border border-gray-400 rounded p-4 w-1/2 ml-2`}
          onPress={() => setShowReturnPicker(true)}
        >
          <Text style={tw`text-gray-500`}>Return Date</Text>
          <Text style={tw`mt-2 text-lg`}>{formatDate(returnDate)}</Text>
        </TouchableOpacity>

      </View>
      <View >
        <Text style={tw`text-lg mt-4 mb-2 ml-1`}>Phone number:</Text>
        <TextInput
          style={tw`border border-gray-300 rounded p-2 mb-4`}
          value={name}
          onChangeText={setName}
          placeholder="Enter your phone number"
        />
        <Text style={tw`text-lg mt-1 font-bold mb-2`}> Cost: Rs.{totalCost.toFixed(2)}</Text>

        <Text style={tw`text-lg mt-2 mb-2 pl-1 f`}>
          Pickup Time: {pickupTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          <TouchableOpacity
            onPress={() => setShowPickupTime(true)}
            style={tw`bg-blue-500 w-35 h-10 rounded mt-4 mb-10 `}
          >
            <Text style={tw`text-white text-center text-lg`}>Select Pickup Time</Text>
          </TouchableOpacity>
        </Text>

      </View>

      <TouchableOpacity
        style={tw`bg-black  px-4 py-2 rounded w-40 mt-90 self-center `}
       // onPress={() => navigation.navigate('Schedule', { vehicle })}
      >
        <Text style={tw`text-white text-center text-lg`}>Book now</Text>
      </TouchableOpacity>
      {showPickupTime && (
        <DateTimePicker
          value={pickupTime}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedTime) => {
            setShowPickupTime(false);
            if (selectedTime) setPickupTime(selectedTime);
          }}
        />


      )}


      {showPickupPicker && (
        <DateTimePicker
          value={pickupDate}
          mode="date"
          display="default"
          onChange={onPickupChange}
          minimumDate={new Date()}
        />
      )}
      {showReturnPicker && (
        <DateTimePicker
          value={returnDate}
          mode="date"
          display="default"
          onChange={onReturnChange}
          minimumDate={pickupDate}
        />
      )}


    </View>
  )
}
