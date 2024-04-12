import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [team, setTeam] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  const handleRegisterTask = async () => {
    if (!title || !subject || !team || !dueDate || !dueTime) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    try {
      const newTask = {
        title,
        subject,
        team,
        dueDate: `${dueDate} ${dueTime}`,
      };
      // Obtenemos las tareas actuales de AsyncStorage
      const tasksString = await AsyncStorage.getItem('tasks');
      let tasksArray = [];
      if (tasksString !== null) {
        tasksArray = JSON.parse(tasksString);
      }
      // Agregamos la nueva tarea al arreglo
      tasksArray.push(newTask);
      // Guardamos el arreglo actualizado en AsyncStorage
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));
      // Redirigimos al usuario a la pantalla de inicio
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al registrar la tarea:', error);
      Alert.alert('Error', 'Ha ocurrido un error al registrar la tarea');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre de la actividad"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Materia"
        value={subject}
        onChangeText={setSubject}
        style={styles.input}
      />
      <TextInput
        placeholder="Equipo de trabajo"
        value={team}
        onChangeText={setTeam}
        style={styles.input}
      />
      <TextInput
        placeholder="Fecha de entrega (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Hora de entrega (HH:MM)"
        value={dueTime}
        onChangeText={setDueTime}
        style={styles.input}
      />
      <Button title="Registrar actividad" onPress={handleRegisterTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default RegisterTaskScreen;
