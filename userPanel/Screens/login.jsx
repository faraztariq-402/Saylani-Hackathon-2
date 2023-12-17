// LoginUser.js
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import DashboardScreen from '../dashboard/dashboard';
import Dashboard from './dashboard';
import Navigation from './navigation';
const LoginUser = () => {
    const navigation = useNavigation();
  
    const handleLogin = () => {
      // Check login credentials, for now, let's assume it's successful
      // In a real-world scenario, you would validate against your backend
      // If successful, navigate to the Dashboard
      navigation.navigate(Dashboard);
    };
  
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        input: {
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
          // You can add more styles as needed
        },
  });
  
  export default LoginUser;