import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Favorite: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
export type FavoriteScreenProps = NativeStackScreenProps<RootStackParamList, 'Favorite'>;