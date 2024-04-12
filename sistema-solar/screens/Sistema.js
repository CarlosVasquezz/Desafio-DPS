import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const SistemaSolar = ({ navigation }) => {
  const [planetas, setPlanetas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPlanetas();
  }, []);

  const fetchPlanetas = async () => {
    try {
      const response = await fetch('https://66195c96125e9bb9f299cc48.mockapi.io/ApiSolar/Planetas');
      const data = await response.json();
      setPlanetas(data);
    } catch (error) {
      console.error('Error fetching planetas:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detalle Planeta', { planeta: item })}
    >
      <Text style={styles.planetaName}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  const handleSearch = () => {
    const filteredPlanetas = planetas.filter(planeta =>
      planeta.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredPlanetas;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar Planeta"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={handleSearch()}
        renderItem={renderItem} 
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', 
    paddingVertical: 20,
  },
  input: {
    height: 40,
    borderColor: '#ced4da', 
    borderWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff', 
    borderRadius: 5, 
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#0d6efd',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8, 
  },
  planetaName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', 
    textAlign: 'center',
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
});

export default SistemaSolar;
