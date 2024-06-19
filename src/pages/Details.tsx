import { StyleSheet, Text, View } from 'react-native';
import { DetailsScreenProps } from './types';

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Details screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: '#ffeb1f'
  }
});
export default DetailsScreen;