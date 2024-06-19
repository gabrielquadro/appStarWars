import { StyleSheet, Text, ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';

// Tipo para a rota da tela de detalhes
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

// Interface para props
interface Props {
  route: DetailsScreenRouteProp;
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
  const { character } = route.params; // Parâmetro
  const [loading, setLoading] = useState<boolean>(false);
  const [homeworld, setHomeWorld] = useState<Planet | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      //get homeworld
      const responseHomeworld = await fetch(character.homeworld);
      // Convert to json
      const json: Planet = await responseHomeworld.json();
      setHomeWorld(json);

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
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.info}>Height: {character.height}</Text>
          <Text style={styles.info}>Mass: {character.mass}</Text>
          <Text style={styles.info}>Hair color: {character.hair_color}</Text>
          <Text style={styles.info}>Skin color: {character.skin_color}</Text>
          <Text style={styles.info}>Eye color: {character.eye_color}</Text>
          <Text style={styles.info}>Birth year: {character.birth_year}</Text>
          <Text style={styles.info}>Gender: {character.gender}</Text>
          {homeworld ? (
            <Text style={styles.info}>Homeworld: {homeworld.name}</Text>
          ) : (
            <></>
          )}
          {films.length > 0 ? (
            <>
              <Text style={styles.subtitle}>Films:</Text>
              {films.map((item, index) => (
                <Text key={index} style={styles.item}>- {item.title}</Text>
              ))}
            </>
          ) : (
            <></>
          )}
          {species.length > 0 ? (
            <>
              <Text style={styles.subtitle}>Species:</Text>
              {species.map((item, index) => (
                <Text key={index} style={styles.item}>- {item.name}</Text>
              ))}
            </>
          ) : (
            <></>
          )}
          {vehicles.length > 0 ? (
            <>
              <Text style={styles.subtitle}>Vehicles:</Text>
              {vehicles.map((item, index) => (
                <Text key={index} style={styles.item}>- {item.name}</Text>
              ))}
            </>
          ) : (
            <></>
          )}
          {starships.length > 0 ? (
            <>
              <Text style={styles.subtitle}>Starships:</Text>
              {starships.map((item, index) => (
                <Text key={index} style={styles.item}>- {item.name}</Text>
              ))}
            </>
          ) : (
            <></>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  info: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Details;
