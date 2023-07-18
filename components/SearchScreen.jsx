import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation }) => {
    const [books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [noResult, setNoResult] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            const storedData = await AsyncStorage.getItem('books');
            if (storedData !== null) {
                setBooks(JSON.parse(storedData));
            }
        };

        fetchBooks();
    }, []);

    const searchHandler = () => {
        if (searchText.length > 0) {
            const result = books.filter(book => book.titre.toLowerCase().includes(searchText.toLowerCase()));
            setSearchResult(result);
            if (result.length === 0) {
                setNoResult(true);
            } else {
                setNoResult(false);
            }
        } else {
            setSearchResult([]);
            alert('Veuillez saisir une recherche');
        }
    };

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
            <TextInput 
                style={styles.input} 
                onChangeText={text => setSearchText(text)} 
                value={searchText} 
                placeholder="Rechercher un livre..." 
            />
            <Button title="Rechercher" onPress={searchHandler} />
            {searchResult.length > 0 ? (
                <FlatList
                    data={searchResult}
                    renderItem={renderBookItem}
                    style={{ width: '100%' }}
                />
            ) : (   
                noResult ? (
                    <Text>Aucun résultat</Text>
                ) : (
                    <Text></Text>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    input: {
        width: '80%',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
    },
    bookItem: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
        marginRight: 20,
    },
    title: {
        fontSize: 18,
    },
});

export default SearchScreen;
