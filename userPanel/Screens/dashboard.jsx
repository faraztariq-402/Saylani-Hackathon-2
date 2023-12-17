import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const Dashboard = () => {
  return (
    <View style={styles.container}>
    <Text>Hi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
//   input: {
//     height: 40,
//     width: '80%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     // You can add more styles as needed
//   },
});

export default Dashboard;