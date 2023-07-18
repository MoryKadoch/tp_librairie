import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getLivres, getCategories } from '../models/data';

const BookDetails = ({ route }) => {
    const navigation = useNavigation();
    const bookId = route.params?.bookId;
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookCategories, setBookCategories] = useState([]);

    navigation.setOptions({
        title: selectedBook?.titre,
    });

    useEffect(() => {
        const fetchBooksAndCategories = async () => {
            const books = await getLivres();
            const categories = await getCategories();

            const selectedBookFromStorage = books.find(book => book.id === bookId);
            setSelectedBook(selectedBookFromStorage);

            if (selectedBookFromStorage) {
                const categoriesFromStorage = selectedBookFromStorage?.categorieId.map(catId => categories.find(cat => cat.id === catId));
                setBookCategories(categoriesFromStorage);
            }
        };

        fetchBooksAndCategories();
    }, [bookId]);

    return (
        <ScrollView contentContainerStyle={styles.screen}>
            {selectedBook ? (
                <>
                    <Image style={styles.image} source={{ uri: selectedBook.imageUrl }} />
                    <Text style={styles.title}>{selectedBook.titre}</Text>
                    <View style={styles.tagsContainer}>
                        {bookCategories.map((cat, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('Category', { categoryId: cat.id })}>
                                <View  style={{ ...styles.tag, backgroundColor: cat.couleur }}>
                                    <Text style={styles.tagText}>{cat.genre}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    { selectedBook.enCours ? <Text style={styles.readingTag}>En cours de lecture</Text> : null }
                    <Text style={styles.tomes}>Tomes : {selectedBook.tomes}</Text>
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
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
    },
    image: {
        width: 200,
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#333333',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },
    tag: {
        padding: 5,
        borderRadius: 5,
        margin: 2,
    },
    tagText: {
        color: '#ffffff',
        textTransform: 'capitalize',
    },
    readingTag: {
        color: '#b9121b',
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 10,
    },
    tomes: {
        fontSize: 16,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginTop: 20,
        textAlign: 'justify',
        color: '#333333',
    },
});

export default BookDetails;