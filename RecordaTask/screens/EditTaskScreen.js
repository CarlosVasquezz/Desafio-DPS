import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTaskScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.taskToEdit.title);
  const [subject, setSubject] = useState(route.params.taskToEdit.subject);
  const [team, setTeam] = useState(route.params.taskToEdit.team);
  const [dueDate, setDueDate] = useState(route.params.taskToEdit.dueDate);

  const handleEditTask = async () => {
    if (!title || !subject || !team || !dueDate) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    try {
      const editedTask = {
        ...route.params.taskToEdit,
        title,
        subject,
        team,
        dueDate,
      };

      // Obtener las tareas actuales de AsyncStorage
      const tasksString = await AsyncStorage.getItem('tasks');
      let tasksArray = [];
      if (tasksString !== null) {
        tasksArray = JSON.parse(tasksString);
        // Buscar y actualizar la tarea editada en el arreglo
        const index = tasksArray.findIndex(task => task.title === route.params.taskToEdit.title);
        tasksArray[index] = editedTask;
        // Guardar el arreglo actualizado en AsyncStorage
        await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));
        // Redirigir al usuario a la pantalla de inicio
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error al editar la tarea:', error);
      Alert.alert('Error', 'Ha ocurrido un error al editar la tarea');
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
      <Button title="Editar actividad" onPress={handleEditTask} />
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

export default EditTaskScreen;
