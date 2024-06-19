import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HomeScreenProps } from './types';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Home screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: '#ffeb1f',
  },
});