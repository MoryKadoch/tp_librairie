import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';
import uuid from 'uuid';
import { getCategories } from '../models/data';
import { useFocusEffect } from '@react-navigation/native';


const AddBookScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tomes, setTomes] = useState('');
    const [imageUrl, setImageUrl] = useState('https://atlas-content-cdn.pixelsquid.com/stock-images/classic-library-book-hardcover-Va7RxV6-600.jpg');
    const [enCours, setEnCours] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const loadCategories = async () => {
                const loadedCategories = await getCategories();
                setCategories(loadedCategories);
            }
            loadCategories();
        }, [])
    );

    const toggleCategory = (id) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter(c => c !== id));
        } else {
            setSelectedCategories([...selectedCategories, id]);
        }
    };

    const saveBook = async (newBook) => {
        if (title === '' || description === '' || tomes === '' || imageUrl === '') {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        const storedData = await AsyncStorage.getItem("books");
        let books = [];
        if (storedData !== null) {
            books = JSON.parse(storedData);
        }
        books.push(newBook);
        await AsyncStorage.setItem("books", JSON.stringify(books));
        alert("Livre ajouté !");
    };

    const submitForm = () => {
        const newBook = {
            id: uuid.v4(),
            categorieId: selectedCategories,
            titre: title,
            description: description,
            tomes: tomes,
            imageUrl: imageUrl,
            enCours: enCours
        };
        saveBook(newBook);
    };

    const clearAllBooks = async () => {
        await AsyncStorage.clear();
        alert("Tous les livres ont été supprimés !");
    };

    return (
        <View style={styles.container}>
            <Button title="Supprimer tous les livres ajoutés" onPress={clearAllBooks} color="red" />
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Ajouter un livre</Text>
                <TextInput style={styles.input} placeholder="Titre" value={title} onChangeText={setTitle} />
                <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
                <TextInput style={styles.input} placeholder="Tomes" value={tomes} onChangeText={setTomes} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="URL de l'image" value={imageUrl} onChangeText={setImageUrl} />
                {categories.map(category => (
                    <View key={category.id} style={styles.checkboxContainer}>
                        <Checkbox
                            status={selectedCategories.includes(category.id) ? 'checked' : 'unchecked'}
                            onPress={() => {
                                toggleCategory(category.id);
                            }}
                        />
                        <Text style={styles.label}>{category.genre}</Text>
                    </View>
                ))}
                <Text style={styles.label}>En cours de lecture :</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={enCours ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setEnCours}
                    value={enCours}
                />
            </ScrollView>
            <Button title="Ajouter le livre" onPress={submitForm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollContainer: {
        marginBottom: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10,
        padding: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    label: {
        margin: 8,
    },
});

export default AddBookScreen;
