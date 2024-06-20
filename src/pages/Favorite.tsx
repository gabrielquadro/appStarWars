import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList , ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Character } from './types';
import { FontAwesome5 } from '@expo/vector-icons';

const Favorite = () => {
  const isFocused = useIsFocused(); //focus screen
  const [favorites, setFavorites] = useState<any[]>([]); //list of favorites characters

  // load by AsyncStorage
  const loadFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('favoriteCharacters');//get favorites by async storage
      if (favoritesData) { //if contains
        const parsedFavorites = JSON.parse(favoritesData); //convert to json
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  //load favorites
  useEffect(() => {
    loadFavorites();
  }, [isFocused]); //when open tab

  function showToastRemove() {
    ToastAndroid.show('Character removed from favorites!', ToastAndroid.SHORT);
  }

  // remove favorite
  const removeFavorite = async (character: any) => {
    try {
      const favoritesData = await AsyncStorage.getItem('favoriteCharacters');
      if (!favoritesData) return; //list empty
      const favoriteCharacters = JSON.parse(favoritesData);

      const updatedFavorites = favoriteCharacters.filter((char: any) => char.url !== character.url); //remove the character
      await AsyncStorage.setItem('favoriteCharacters', JSON.stringify(updatedFavorites));// update favorites characters
      showToastRemove();
      setFavorites(updatedFavorites);// update list
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  //render item informations
  const renderItem = ({ item }: { item: Character }) => (
    <TouchableOpacity
      style={styles.item}
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
