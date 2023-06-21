import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, Pressable, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import flowers from '../data/data'
import { Ionicons } from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'

const WishList = () => {
  const navigation = useNavigation()

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadWishlist();
    });

    return unsubscribe;
  }, [navigation]);

  const loadWishlist = async () => {
    try {
      const jsonWishlist = await AsyncStorage.getItem('flowers');
      if (jsonWishlist !== null) {
        const parsedWishlist = JSON.parse(jsonWishlist);
        setWishlist(parsedWishlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearWishlist = async () => {
    try {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to clear all this wishlist',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Clear all',
            style: 'destructive',
            onPress: () => {
              AsyncStorage.removeItem('flowers');
              setWishlist([]);
            }
          }
        ]
      )
    } catch (error) {
      console.log(error);
    }
  };


  const handleFavourite = async (flower) => {
    try {
      const updatedFlowersData = wishlist.map((item) => {
        if (item.id === flower.id) {
          return {
            ...item,
            favourite: !item.favourite,
          };
        }
        return item;
      });
      setWishlist(updatedFlowersData);
      await AsyncStorage.setItem('flowers', JSON.stringify(updatedFlowersData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.containerBtn}>
      <Pressable style={styles.btn} onPress={clearWishlist}>
        <Text style={styles.btnText}>Clear All</Text>
      </Pressable>
      <View style={styles.container}>
        {wishlist.map(flower => (
          ((flower && flower.favourite === true) && <React.Fragment key={flower.id}>
            <TouchableOpacity style={styles.card} key={flower.id} onPress={() => { navigation.navigate('Detail', { flower: flower }) }} >
              <Pressable style={styles.iconContainer}
                onPress={() => handleFavourite(flower)}
              >
                <Ionicons name="heart" size={24} color='red' />
              </Pressable>
              <Image
                style={styles.image}
                source={flower.image} />
              <Text style={styles.text}>{flower.name}</Text>
            </TouchableOpacity>
          </React.Fragment>
          )
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerBtn: {
    margin: 12,
  },
  btn: {
    padding: 10,
  },
  btnText: {
    color: 'red',
    fontWeight: '500',
    fontSize: 17
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingBottom: 25
  },
  card: {
    width: '46%',
    height: 220,
    marginBottom: 15,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#b7ede6',
    marginLeft: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    left: 4,
    zIndex: 1,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500'
  },
})

export default WishList