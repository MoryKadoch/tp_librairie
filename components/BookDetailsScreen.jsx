import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LIVRES, CATEGORIES } from '../models/data';

const BookDetails = ({ route }) => {
    const navigation = useNavigation();
    const bookId = route.params?.bookId;
    const selectedBook = LIVRES.find(book => book.id === bookId);

    const bookCategories = selectedBook?.categorieId.map(catId => CATEGORIES.find(cat => cat.id === catId));

    return (
        <ScrollView contentContainerStyle={styles.screen}>
            {selectedBook ? (
                <>
                    <Image style={styles.image} source={{ uri: selectedBook.imageUrl }} />
                    <Text style={styles.title}>{selectedBook.titre}</Text>
                    <View style={styles.tagsContainer}>
                        {bookCategories.map((cat, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('Category', { categoryId: cat.id })}>
                                <View style={styles.tag}>
                                    <Text style={styles.tagText}>{cat.genre}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.author}>{selectedBook.auteur}</Text>
                    <Text style={styles.description}>{selectedBook.description}</Text>
                </>
            ) : (
                <Text>Le livre n'a pas été trouvé.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    image: {
        width: 200,
        height: 300,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },
    tag: {
        backgroundColor: '#DDDDDD',
        padding: 5,
        borderRadius: 5,
        margin: 2,
    },
    tagText: {
        color: '#333333',
    },
    author: {
        fontSize: 20,
        color: 'gray',
    },
    description: {
        fontSize: 16,
        marginTop: 20,
    },
});

export default BookDetails;
