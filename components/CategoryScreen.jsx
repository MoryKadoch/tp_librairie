import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { getCategories, getLivres } from '../models/data';
import { useFocusEffect } from '@react-navigation/native';

const CategoryScreen = ({ route, navigation }) => {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);

    const catId = route.params?.categoryId;

    let selectedCategory;
    let displayedBooks;

    useFocusEffect(
        React.useCallback(() => {
            const loadCategoriesAndBooks = async () => {
                try {
                    const loadedCategories = await getCategories();
                    const loadedBooks = await getLivres();
                    setCategories(loadedCategories);
                    setBooks(loadedBooks);
                } catch (error) {
                    console.error(error);
                }
            };
            loadCategoriesAndBooks();
        }, []));

    if (categories.length > 0 && books.length > 0) {
        selectedCategory = categories.find(cat => cat.id === catId);
        displayedBooks = books.filter(book => book.categorieId.indexOf(catId) >= 0);
    }

    navigation.setOptions({
        title: selectedCategory ? selectedCategory.genre.toUpperCase() : 'Tous les livres',
    });

    const renderBookItem = (itemData) => {
        return (
            <View style={styles.bookItem}>
                <Image style={styles.image} source={{ uri: itemData.item.imageUrl }} />
                <Text
                    style={styles.title}
                    onPress={() => {
                        navigation.navigate('BookDetails', { bookId: itemData.item.id });
                    }}
                >
                    {itemData.item.titre}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <FlatList
                data={displayedBooks}
                renderItem={renderBookItem}
                style={{ width: '100%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
    },
    bookItem: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
    },
    image: {
        width: 70,
        height: 70,
        marginRight: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        textTransform: 'capitalize',
        color: '#000',
    },
});

export default CategoryScreen;