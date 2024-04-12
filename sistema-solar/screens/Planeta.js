import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const DetallePlaneta = ({ route }) => {
  const { planeta } = route.params;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: planeta.imagen }} 
        style={styles.planetaImage} 
        resizeMode="cover"
      />
      <Text style={styles.planetaName}>{planeta.nombre}</Text>
      <View style={styles.planetaInfoContainer}>
        <Text style={styles.sectionTitle}>Información básica:</Text>
        <Text style={styles.planetaDetalle}>Tipo: {planeta.tipo}</Text>
        <Text style={styles.planetaDetalle}>Masa: {planeta.masa}</Text>
        <Text style={styles.planetaDetalle}>Radio: {planeta.radio}</Text>
        <Text style={styles.planetaDetalle}>Distancia Media al Sol: {planeta.distancia_media_al_sol}</Text>
        <Text style={styles.planetaDetalle}>Periodo Orbital: {planeta.periodo_orbital}</Text>
        <Text style={styles.planetaDetalle}>Periodo de Rotación: {planeta.periodo_rotacion}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d6efd', 
  },
  planetaImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 5,
  },
  planetaName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 10,
  },
  planetaInfoContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    marginTop: 20,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0d6efd', 
  },
  planetaDetalle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#212529', 
  },
});

export default DetallePlaneta;
