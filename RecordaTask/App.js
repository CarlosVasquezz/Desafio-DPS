import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

// Pantallas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterTaskScreen from './screens/RegisterTaskScreen';
import EditTaskScreen from './screens/EditTaskScreen';

// Navegadores
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// CustomHeader
const CustomHeader = ({ title, navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <MaterialIcons name="menu" size={24} color="black" style={{ marginRight: 10 }} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

// Función principal de la aplicación
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={MainStack} />
        <Stack.Screen name="EditTaskScreen" component={EditTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Navegador principal (Stack Navigator)
const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: () => <CustomHeader title="RecordaTask" navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="RegisterTask"
        component={RegisterTaskScreen}
        options={({ navigation }) => ({
          headerTitle: () => <CustomHeader title="Registrar Actividad" navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};



// Estilos
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ced4da',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  drawerItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ced4da',
  },
});

export default App;
