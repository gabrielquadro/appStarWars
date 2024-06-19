import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { HomeScreenProps, Character } from './types';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [data, setData] = useState<Character[]>([]); //type Character 
  const [page, setPage] = useState<number>(1); //current page
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  //load data from api
  const loadData = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      //get all Character by page
      const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
      //convert to json
      const json = await response.json();
      //update data for flatlist values
      setData([...data, ...json.results]);
      //update next page
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      //finish loading if everything is ok
      setLoading(false);
    }
  };

  //render item informations
  const renderItem = ({ item }: { item: Character }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Details', { character: item })}
    >
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  //loading below the list
  const renderFooter = () => {
    return loading ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    ) : null;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={loadData}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'gray',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
});

export default HomeScreen;
