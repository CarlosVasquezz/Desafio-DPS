import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Aquí deberías realizar la lógica de autenticación con tu servidor o localmente
    // Por simplicidad, aquí se utiliza AsyncStorage para simular la autenticación
    try {
      // Obtener las credenciales guardadas
      const savedUsername = await AsyncStorage.getItem('username');
      const savedPassword = await AsyncStorage.getItem('password');

      // Verificar si las credenciales coinciden
      if (username === savedUsername && password === savedPassword) {
        navigation.navigate('Home');
      } else {
        // Mostrar un mensaje de error si las credenciales son incorrectas
        Alert.alert('Error', 'Credenciales incorrectas. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="person" size={80} color="black" style={styles.icon} />
      <TextInput
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Iniciar sesión" onPress={handleLogin} />
        <Button title="Registrarse" onPress={handleRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  icon: {
    marginBottom: 20,
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
});

export default LoginScreen;
