import { StyleSheet, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, DetailsScreenProps } from './types';
import React, { useState, useEffect } from 'react';
//type details screen
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
//interface for props
interface Props {
  route: DetailsScreenRouteProp;
}

const Details: React.FC<Props> = ({ route }) => {
  const { character } = route.params; //Parameter

  useEffect(() => {
    console.log(character)
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{character.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Details;