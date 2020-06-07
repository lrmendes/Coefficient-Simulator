import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/screens/main/Main';
import Steps from './src/screens/firstSteps/Steps';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Steps" component={Steps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <Text style={styles.instructions}>{instructions}</Text>
    </View>
  );
}


*/