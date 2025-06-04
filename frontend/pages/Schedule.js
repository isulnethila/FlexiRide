import { View, Text,TouchableOpacity,TextInput} from 'react-native'
import React,{ useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';


export default function Schedule() {
      const [pickupDate, setPickupDate] = useState(new Date());
      const [returnDate, setReturnDate] = useState(new Date());
      const [showPickupPicker, setShowPickupPicker] = useState(false);
      const [showReturnPicker, setShowReturnPicker] = useState(false);
        const [name, setName] = useState('');
      

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
       <Text style={tw`text-3xl font-bold mb-4 `}>Schedule</Text>
        {/* Schedule Section */}
      <Text style={tw`text-xl font-bold mt-6 mb-4`}>Schedule</Text>
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
        <Text style={tw`text-lg mt-4`}>Phone number:</Text>
         <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
        <Text  style={tw`text-lg mt-4`}> Cost:</Text>

        <Text  style={tw`text-lg mt-4`}> Set pick up time:</Text>
       </View>
    

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