import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { getCategories } from '../models/data';
import { useFocusEffect } from '@react-navigation/native';

const CategoriesScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const loadCategories = async () => {
                const loadedCategories = await getCategories();
                setCategories(loadedCategories);
            };
            
            loadCategories();
        }, [])
    );

    const renderGridItem = (itemData) => {
        return (
            <TouchableOpacity 
                style={{ ...styles.gridItem, backgroundColor: itemData.item.couleur }} 
                onPress={() => {
                    navigation.navigate('Category', { categoryId: itemData.item.id });
                }}
            >
                <ImageBackground 
                    source={{uri: 'https://source.unsplash.com/random/? ' + itemData.item.genre}}
                    style={styles.backgroundImg}
                >
                    <Text style={styles.title}>{itemData.item.genre}</Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={categories}
            renderItem={renderGridItem}
            numColumns={2}
        />
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
    },
    backgroundImg: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
    },
});

export default CategoriesScreen;
