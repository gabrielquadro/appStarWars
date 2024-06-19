import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface Props {
  route: DetailsScreenRouteProp;
}

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  url: string;
}

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

const Details: React.FC<Props> = ({ route }) => {
  const { character } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [homeworld, setHomeworld] = useState<Planet | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    loadData();
    checkFavorite();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      const responseHomeworld = await fetch(character.homeworld);
      const homeworldData: Planet = await responseHomeworld.json();
      setHomeworld(homeworldData);

      //get films
      const films: Film[] = await Promise.all(
        character.films.map(async (filmUrl) => {
          const responseFilm = await fetch(filmUrl);
          const jsonFilm: Film = await responseFilm.json();
          return jsonFilm;
        })
      );
      setFilms(films);

      //get species
      const speciesValues: Species[] = await Promise.all(
        character.species.map(async (item) => {
          const response = await fetch(item);
          const json: Species = await response.json();
          return json;
        })
      );
      setSpecies(speciesValues);

      //get vehicles 
      const vehiclesValues: Vehicle[] = await Promise.all(
        character.vehicles.map(async (item) => {
          const response = await fetch(item);
          const json: Vehicle = await response.json();
          return json;
        })
      );
      setVehicles(vehiclesValues);

      //get starships
      const starshipsValues: Starship[] = await Promise.all(
        character.starships.map(async (item) => {
          const response = await fetch(item);
          const json: Starship = await response.json();
          return json;
        })
      );
      setStarships(starshipsValues);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favoriteCharacters');
      if (favorites) {
        const favoriteCharacters: Character[] = JSON.parse(favorites);
        const isFavorite = favoriteCharacters.some((char) => char.url === character.url);
        setIsFavorite(isFavorite);
      }
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      let favorites = await AsyncStorage.getItem('favoriteCharacters');
      let favoriteCharacters: Character[] = favorites ? JSON.parse(favorites) : [];

      const isAlreadyFavorite = favoriteCharacters.some((char) => char.url === character.url);

      if (isAlreadyFavorite) {
        favoriteCharacters = favoriteCharacters.filter((char) => char.url !== character.url);
      } else {
        favoriteCharacters.push(character);
      }

      await AsyncStorage.setItem('favoriteCharacters', JSON.stringify(favoriteCharacters));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.name}>{character.name}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <FontAwesome
                name={isFavorite ? "star" : "star-o"}
                size={30}
                color="#FFD700"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>General Information</Text>
            <Text style={styles.detail}>Height: {character.height}</Text>
            <Text style={styles.detail}>Mass: {character.mass}</Text>
            <Text style={styles.detail}>Hair color: {character.hair_color}</Text>
            <Text style={styles.detail}>Skin color: {character.skin_color}</Text>
            <Text style={styles.detail}>Eye color: {character.eye_color}</Text>
            <Text style={styles.detail}>Birth year: {character.birth_year}</Text>
            <Text style={styles.detail}>Gender: {character.gender}</Text>
            {homeworld && <Text style={styles.detail}>Homeworld: {homeworld.name}</Text>}
          </View>
          {films.length > 0 && (
            <View style={styles.detailsContainer}>
              <Text style={styles.sectionTitle}>Films</Text>
              {films.map((film, index) => (
                <Text key={index} style={styles.detail}>{film.title}</Text>
              ))}
            </View>
          )}
          {species.length > 0 && (
            <View style={styles.detailsContainer}>
              <Text style={styles.sectionTitle}>Species</Text>
              {species.map((specie, index) => (
                <Text key={index} style={styles.detail}>{specie.name}</Text>
              ))}
            </View>
          )}
          {vehicles.length > 0 && (
            <View style={styles.detailsContainer}>
              <Text style={styles.sectionTitle}>Vehicles</Text>
              {vehicles.map((vehicle, index) => (
                <Text key={index} style={styles.detail}>{vehicle.name}</Text>
              ))}
            </View>
          )}
          {starships.length > 0 && (
            <View style={styles.detailsContainer}>
              <Text style={styles.sectionTitle}>Starships</Text>
              {starships.map((starship, index) => (
                <Text key={index} style={styles.detail}>{starship.name}</Text>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default Details;
