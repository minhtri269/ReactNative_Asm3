import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from 'react-native-vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Detail = ({ route }) => {
  const { flowerDetail } = route.params;
  const [isFavourite, setIsFavourite] = useState(flowerDetail.favourite);

  useEffect(() => {
    const getFavouriteStatus = async () => {
      try {
        const storedFlowers = await AsyncStorage.getItem('flowers');
        if (storedFlowers) {
          const parsedFlowers = JSON.parse(storedFlowers);
          const flower = parsedFlowers.find(item => item.id === flowerDetail.id);
          if (flower) {
            setIsFavourite(flower.favourite);
          }
        }
      } catch (error) {
        console.log('Error retrieving flowers from AsyncStorage:', error);
      }
    };

    getFavouriteStatus();
  }, []);

  const updateFavouriteStatus = async () => {
    const updatedFlower = { ...flowerDetail, favourite: !isFavourite };
    try {
      const storedFlowers = await AsyncStorage.getItem('flowers');
      if (storedFlowers) {
        const parsedFlowers = JSON.parse(storedFlowers);
        const updatedFlowers = parsedFlowers.map(item => {
          if (item.id === updatedFlower.id) {
            return updatedFlower;
          }
          return item;
        });
        await AsyncStorage.setItem('flowers', JSON.stringify(updatedFlowers));
        setIsFavourite(!isFavourite);
      }
    } catch (error) {
      console.log('Error updating flowers in AsyncStorage:', error);
    }
  };

  useEffect(() => {
    const saveFavouriteStatus = async () => {
      const storedFlowers = await AsyncStorage.getItem('flowers');
      if (storedFlowers) {
        const parsedFlowers = JSON.parse(storedFlowers);
        const updatedFlowers = parsedFlowers.map(item => {
          if (item.id === flowerDetail.id) {
            return { ...item, favourite: isFavourite };
          }
          return item;
        });
        await AsyncStorage.setItem('flowers', JSON.stringify(updatedFlowers));
      }
    };

    saveFavouriteStatus();
  }, [isFavourite]);

  return (
    <View style={{ margin: 10 }}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Pressable style={styles.iconContainer} onPress={updateFavouriteStatus}>
            {isFavourite === true ? (
              <Ionicons name="heart" size={24} color="red" />
            ) : (
              <Ionicons name="heart-outline" size={24} color="black" />
            )}
          </Pressable>
        </View>
        <Image style={styles.image} source={flowerDetail.image} />
        <Text style={styles.name}>{flowerDetail.name}</Text>
        <Text style={styles.country}>{flowerDetail.country}</Text>
        <Text style={styles.description}>{flowerDetail.description}</Text>
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
