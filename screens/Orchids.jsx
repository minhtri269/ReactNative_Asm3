import { View, Text, StyleSheet, Image, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import flowers from '../data/data'
import { Ionicons } from 'react-native-vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterCategory from './FilterCategory'


const Orchids = () => {
    const navigation = useNavigation()

    const [flowersData, setFlowersData] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');


    const loadFlowersData = async () => {
        try {
            const jsonFlowers = await AsyncStorage.getItem('flowers');
            if (jsonFlowers !== null) {
                const parsedFlowers = JSON.parse(jsonFlowers);
                setFlowersData(parsedFlowers);
                applyFilter(parsedFlowers, selectedCategory);
            } else {
                // Nếu không có dữ liệu từ AsyncStorage, sử dụng mảng flowers mặc định
                setFlowersData(flowers);
                applyFilter(flowers, selectedCategory);
            }
        } catch (error) {
            console.log(error);
        }

    };

    useFocusEffect(
        React.useCallback(() => {
            loadFlowersData()
        }, [])
    )

    useFocusEffect(
        React.useCallback(() => {
            applyFilter(flowersData, selectedCategory)
        }, [flowersData, selectedCategory])
    )

    useEffect(() => {
        const saveFlowers = async () => {
            try {
                await AsyncStorage.setItem('flowers', JSON.stringify(flowersData));
            } catch (error) {
                console.log('Error saving flowers to AsyncStorage:', error);
            }
        };

        saveFlowers();
    }, [flowersData]);

    const applyFilter = (flowers, category) => {
        let filteredFlowers = flowers;
        if (category !== 'All') {
            filteredFlowers = flowers.filter((flower) => flower.category === category);
        }
        setFilteredCategory(filteredFlowers);
    };

    const handleFilterCategory = (category) => {
        setSelectedCategory(category);
        applyFilter(flowersData, category);
    };

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         loadFlowersData();
    //     });

    //     return unsubscribe;
    //   }, [navigation]);

    // useEffect(() => {
    //     loadFlowersData();
    // }, []);

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
            applyFilter(updatedFlowersData, selectedCategory)
        } catch (error) {
            console.log(error);
        }
    };
    // AsyncStorage.removeItem('flowers')

    return (
        <ScrollView>
            <FilterCategory onCheckFilter={handleFilterCategory} />
            <View style={styles.container}>
                {filteredCategory.length > 0 ? (
                    filteredCategory.map(flower => (
                        <TouchableOpacity style={styles.card} key={flower.id} onPress={() => { navigation.navigate('Detail', { flowerDetail: flower }) }} >
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
                    ))
                ) : (
                    <View style={styles.noFlowersContainer}>
                        <Text style={styles.noFlowersText}>No flowers found.</Text>
                    </View>
                )}
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
    noFlowersContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noFlowersText: {
        textAlign: 'center',
        fontSize: 16,
    },
})

export default Orchids