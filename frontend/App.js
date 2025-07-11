import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StartupScreen from './pages/Startup';
import HomeScreen from './pages/Home';
import SearchScreen from './pages/Search';
import AddScreen from './pages/Add';
import FavouriteScreen from './pages/Favourite';
import ProfileScreen from './pages/Profile';
import VehicleDetailsScreen from './pages/VehicleDetails';
import NotificationScreen from './pages/Notification';
import EditScreen from './pages/Edit';
import AddNewVehicalScreen from './pages/AddNewVehical';
import Schedule from './pages/Schedule';
import { FavoritesProvider } from './context/FavoritesContext';
import { RequestsProvider } from './context/RequestsContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Favourite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppStack() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    // You can return a splash screen or loading indicator here
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="AddNewVehical" component={AddNewVehicalScreen} />
      <Stack.Screen name="Login" component={require('./pages/Login').default} />
      <Stack.Screen name="SignUp" component={require('./pages/SignUp').default} />
      <Stack.Screen name="Startup" component={StartupScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <RequestsProvider>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </RequestsProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
