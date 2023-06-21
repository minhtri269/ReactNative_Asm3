import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

import { FontAwesome } from 'react-native-vector-icons'
import Orchids from './Orchids'

const Home = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Collection</Text>
      <Orchids />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    padding: 12,
    // backgroundColor: 'white'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6fc4f2'
    // textAlign: 'center'
  }
});

export default Home