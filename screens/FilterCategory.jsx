import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import categories from '../data/category';
import { ScrollView } from 'react-native-gesture-handler';

const FilterCategory = ({ onCheckFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategorySelection = (categoryId) => {
        setSelectedCategory(categoryId);
        onCheckFilter(categoryId);
    };

    return (
        <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        selectedCategory === 'All' && styles.selectedCategoryButton,
                    ]}
                    onPress={() => handleCategorySelection('All')}
                >
                    <Text
                        style={[
                            styles.categoryButtonText,
                            selectedCategory === 'All' && styles.selectedCategoryButtonText,
                        ]}
                    >
                        All
                    </Text>
                </TouchableOpacity>

                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category.id && styles.selectedCategoryButton,
                        ]}
                        onPress={() => handleCategorySelection(category.id)}
                    >
                        <Text
                            style={[
                                styles.categoryButtonText,
                                selectedCategory === category.id && styles.selectedCategoryButtonText,
                            ]}
                        >
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        padding: 20,
    },
    categoryButton: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#b7ede6',
        margin: 3
    },
    categoryButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    selectedCategoryButton: {
        backgroundColor: '#0aad99',
    },
    selectedCategoryButtonText: {
        color: 'white',
    },
});

export default FilterCategory;
