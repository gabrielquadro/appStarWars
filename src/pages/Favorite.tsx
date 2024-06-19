import { StyleSheet, Text, View } from 'react-native';

export default function Favorite() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Favorite screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
  }
});
