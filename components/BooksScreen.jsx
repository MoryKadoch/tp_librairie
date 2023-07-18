import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { CATEGORIES, getLivres } from '../models/data';
import { useFocusEffect } from '@react-navigation/native';

const BooksScreen = ({ route, navigation }) => {

    const catId = route.params?.categoryId;

    const [displayedBooks, setDisplayedBooks] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            getLivres().then(books => {
                setDisplayedBooks(catId ? books.filter(book => book.categorieId.indexOf(catId) >= 0) : books);
            });
        }, [catId]));

    const selectedCategory = catId ? CATEGORIES.find(cat => cat.id === catId) : { genre: "Tous les livres" };

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
            <Text style={styles.categoryTitle}>{selectedCategory.genre}</Text>
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
    categoryTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
});

export default BooksScreen;