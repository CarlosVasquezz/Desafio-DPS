import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SistemaSolar from './screens/Sistema';
import DetallePlaneta from './screens/Planeta';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Planetas') {
              iconName = focused ? 'planet' : 'planet-outline'; 
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue', 
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: 'lightblue', 
            borderTopWidth: 1,
            borderTopColor: 'lightgray',
          },
          labelStyle: {
            fontSize: 16, 
          },
        }}
      >
        <Tab.Screen name="Planetas" component={SistemaSolarStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const SistemaSolarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Planetas" component={SistemaSolar} options={{ headerShown: false }} />
      <Stack.Screen name="Detalle Planeta" component={DetallePlaneta} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default App;
