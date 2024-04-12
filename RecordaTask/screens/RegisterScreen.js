import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Aquí deberías realizar la lógica de registro con tu servidor o localmente
    // Por simplicidad, aquí se utiliza AsyncStorage para simular el registro
    try {
      // Verificar si los campos de usuario y contraseña están llenos
      if (username.trim() === '' || password.trim() === '') {
        Alert.alert('Error', 'Por favor completa todos los campos.');
        return;
      }

      // Guardar las credenciales en AsyncStorage
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
      
      // Navegar a la pantalla de inicio
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="person-add" size={80} color="black" style={styles.icon} />
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
        <Button title="Registrarse" onPress={handleRegister} />
        <Button title="Iniciar sesión" onPress={handleLogin} />
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

export default RegisterScreen;
