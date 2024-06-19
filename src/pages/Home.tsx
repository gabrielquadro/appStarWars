import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { HomeScreenProps, Character } from './types';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [data, setData] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [allDataLoaded, setAllDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (loading || allDataLoaded) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
      const json = await response.json();

      if (!json.results) {
        //no more results
        return;
      }

      const newData = [...data, ...json.results];

      setData(newData);
      setPage(page + 1);

      if (json.results.length === 0) {
        //no more results
        setAllDataLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Character }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Details', { character: item })}
    >
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color='#FFD700' />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  item: {
    backgroundColor: '#212121',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#333',
  },
});

export default HomeScreen;