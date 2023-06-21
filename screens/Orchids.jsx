import { View, Text, StyleSheet, Image, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import flowers from '../data/data'
import { Ionicons } from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Orchids = () => {
    const navigation = useNavigation()

    const [flowersData, setFlowersData] = useState([]);

    const loadFlowersData = async () => {
        try {
            const jsonFlowers = await AsyncStorage.getItem('flowers');
            if (jsonFlowers !== null) {
                const parsedFlowers = JSON.parse(jsonFlowers);
                setFlowersData(parsedFlowers);
            } else {
                // Nếu không có dữ liệu từ AsyncStorage, sử dụng mảng flowers mặc định
                setFlowersData(flowers);
            }
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadFlowersData();
        });
    
        return unsubscribe;
      }, [navigation]);

    useEffect(() => {
        loadFlowersData();
    }, []);

    const handleFavourite = async (flower) => {
        try {
            const updatedFlowersData = flowersData.map((item) => {
                if (item.id === flower.id) {
                    return {
                        ...item,
                        favourite: !item.favourite,
                    };
                }
                return item;
            });
            setFlowersData(updatedFlowersData);
            await AsyncStorage.setItem('flowers', JSON.stringify(updatedFlowersData));
        } catch (error) {
            console.log(error);
        }
    };
    // AsyncStorage.removeItem('flowers')

    return (
        <ScrollView>
            <View style={styles.container}>
                {flowersData.map(flower => (
                    <TouchableOpacity style={styles.card} key={flower.id} onPress={() => { navigation.navigate('Detail', { flower: flower }) }} >
                        <Pressable style={styles.iconContainer} onPress={() => handleFavourite(flower)}>
                            {flower.favourite === true ? (
                                <Ionicons name="heart" size={24} color="red" />
                            ) : (
                                <Ionicons name="heart-outline" size={24} color="black" />
                            )}
                        </Pressable>
                        <Image
                            style={styles.image}
                            source={flower.image}
                        />
                        <Text style={styles.text}>{flower.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingBottom: 25
    },
    card: {
        width: '46%',
        height: 200,
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

export default Orchids