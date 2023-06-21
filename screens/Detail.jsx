import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from 'react-native-vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Detail = ({ route, navigation }) => {
  const { flower } = route.params

  const handleFavorite = async () => {
    try {
      // Cập nhật trạng thái "favorite" của bông hoa
      const updatedFlower = {
        ...flower,
        favourite: !flower.favourite,
      };

      // Lấy danh sách wishlist từ AsyncStorage
      const jsonWishlist = await AsyncStorage.getItem('flowers');
      let wishlist = [];
      if (jsonWishlist !== null) {
        wishlist = JSON.parse(jsonWishlist);
      }

      // Cập nhật trạng thái "favorite" của bông hoa trong danh sách wishlist
      const updatedWishlist = wishlist.map((item) => {
        if (item.id === updatedFlower.id) {
          return updatedFlower;
        }
        return item;
      });

      // Lưu danh sách wishlist mới vào AsyncStorage
      await AsyncStorage.setItem('flowers', JSON.stringify(updatedWishlist));

      // Chuyển hướng trở lại màn hình WishList
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     handleFavorite();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

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
