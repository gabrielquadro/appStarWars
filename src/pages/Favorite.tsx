import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useIsFocused } from '@react-navigation/native'; // Importe useIsFocused
import { Character } from './types';
import { FontAwesome5 } from '@expo/vector-icons';

const Favorite = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); //focus screen
  const [favorites, setFavorites] = useState<any[]>([]);

  // load by AsyncStorage
  const loadFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('favoriteCharacters');
      if (favoritesData) {
        const parsedFavorites = JSON.parse(favoritesData);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  //load favorites
  useEffect(() => {
    loadFavorites();
  }, [isFocused]);

  // remove
  const removeFavorite = async (character: any) => {
    try {
      const favoritesData = await AsyncStorage.getItem('favoriteCharacters');
      if (!favoritesData) return;
      const favoriteCharacters = JSON.parse(favoritesData);

      const updatedFavorites = favoriteCharacters.filter((char: any) => char.url !== character.url);
      await AsyncStorage.setItem('favoriteCharacters', JSON.stringify(updatedFavorites));

      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  //render item informations
  const renderItem = ({ item }: { item: Character }) => (
    <TouchableOpacity
      style={styles.item}
    //onPress={() => navigation.navigate('Details', { character: item })}
    >
      <Text style={styles.title}>{item.name}</Text>
      <TouchableOpacity onPress={() => removeFavorite(item)}>
        <FontAwesome5 name="times" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length <= 0 ? (
        <View style={styles.empty}>
          <Text style={styles.title}>No characters adding to favorites.</Text>
        </View>
      ) : (

        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 10
  },
  item: {
    backgroundColor: '#212121',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  removeText: {
    fontSize: 16,
    color: 'red',
    marginLeft: 10,
  },
  empty: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Favorite;
