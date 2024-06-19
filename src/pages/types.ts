import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

//stack screens
export type RootStackParamList = {
  Home: undefined;
  Details: { character: Character }; //parameter for details
};
//home
export type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};
//details
export type DetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'Details'>;
};
//interface for Character
export interface Character {
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
  created: string;
  edited: string;
  url: string;
};