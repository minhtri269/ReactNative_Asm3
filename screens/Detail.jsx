import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from 'react-native-vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Detail = ({ route }) => {
  const { flower } = route.params

  const [isFavourite, setIsFavourite] = useState(flower.favourite)


  const handleFavorite = async () => {
    try {
      setIsFavourite(!isFavourite)
      const flowersStorage = await AsyncStorage.getItem('flowers')
      let flowers = []
      if (flowersStorage) {
        flowers = JSON.parse(flowersStorage)
      }
      const updatedFlowers = flowers.map((item) => {
        if (item.id === flower.id) {
          return {
            ...item,
            favourite: !isFavourite
          }
        }
        return item
      })
      // setIsFavourite(flower)
      await AsyncStorage.setItem('flowers', JSON.stringify(updatedFlowers));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ margin: 10 }}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Pressable style={styles.iconContainer} onPress={handleFavorite}>
            {/* <Ionicons name="heart-outline" size={24} /> */}
            {flower.favourite === true ? (
              <Ionicons name="heart" size={24} color="red" />
            ) : (
              <Ionicons name="heart-outline" size={24} color="black" />
            )}
          </Pressable>
        </View>
        <Image style={styles.image} source={flower.image} />
        <Text style={styles.name}>{flower.name}</Text>
        <Text style={styles.country}>{flower.country}</Text>
        <Text style={styles.description}>{flower.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '67%',
    height: 150,
    resizeMode: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  country: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
})

export default Detail
