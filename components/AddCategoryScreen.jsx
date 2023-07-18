import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'uuid';

const AddCategoryScreen = () => {
    const [genre, setGenre] = useState('');
    const [color, setColor] = useState('#0f37a8');

    const saveCategory = async (newCategory) => {
        if (genre.length === 0) {
            alert("Veuillez saisir un genre");
            return;
        }
        const storedData = await AsyncStorage.getItem("categories");
        let categories = [];
        if (storedData !== null) {
            categories = JSON.parse(storedData);
        }
        categories.push(newCategory);
        await AsyncStorage.setItem("categories", JSON.stringify(categories));
        alert("Catégorie ajoutée !");
    };

    const submitForm = () => {
        const newCategory = {
            id: uuid.v4(),
            genre: genre,
            couleur: color
        };
        saveCategory(newCategory);
    };

    const clearAllCategories = async () => {
        await AsyncStorage.removeItem("categories");
        alert("Toutes les catégories ont été supprimées !");
    };

    return (
        <View style={styles.container}>
            <Button title="Supprimer toutes les catégories ajoutées" onPress={clearAllCategories} color="red" />
            <Text style={styles.title}>Ajouter une catégorie</Text>
            <TextInput style={styles.input} placeholder="Genre" value={genre} onChangeText={setGenre} />
            <TextInput style={styles.input} placeholder="Couleur (format hexadécimal)" value={color} onChangeText={setColor} />
            <Button title="Ajouter la catégorie" onPress={submitForm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
});

export default AddCategoryScreen;
