import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString !== null) {
        const tasksArray = JSON.parse(tasksString);
        setTasks(tasksArray);
      }
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    navigation.navigate('EditTaskScreen', { taskToEdit, index });
  };

  const handleDeleteTask = async (index) => {
    try {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const renderTaskItem = ({ item, index }) => {
    let color;
    const currentDate = new Date();
    const dueDate = new Date(item.dueDate);
    const differenceInDays = Math.floor((dueDate - currentDate) / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) {
      color = 'green'; // Entrega del día de hoy
    } else if (differenceInDays < 0) {
      color = 'red'; // Entrega que ya pasó la fecha
    } else {
      color = 'blue'; // Aún faltan días para su entrega
    }

    return (
      <View style={[styles.taskItem, { backgroundColor: color }]}>
        <Text>{item.title}</Text>
        <Text>Fecha de entrega: {item.dueDate}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleEditTask(index)}>
            <MaterialIcons name="edit" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteTask(index)}>
            <MaterialIcons name="delete" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleAddTask = async () => {
    navigation.navigate('RegisterTask');
    await new Promise(resolve => setTimeout(resolve, 100)); 
    loadTasks();
  };

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.noTasksContainer}>
          <Text>No hay actividades registradas</Text>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Recordatorios de Actividades</Text>
          <FlatList
            data={tasks}
            renderItem={renderTaskItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    padding: 15,
  },
});

export default HomeScreen;
