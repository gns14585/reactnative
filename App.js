import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text>하위</Text>
      <StatusBar style={'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8eaed',
  },
});

export default App;
