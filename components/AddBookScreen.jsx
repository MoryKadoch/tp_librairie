import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import BooksContext from './BooksContext';
import uuid from 'uuid';

const AddBookScreen= () => {
  const { addBook } = useContext(BooksContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const submitForm = () => {
    const newBook = {
      id: uuid.v4(),
      categories: selectedCategories,
      titre: title,
      description: description,
      quantity: quantity,
      imageUrl: imageUrl,
      isFavorite: isFavorite
    };
    addBook(newBook);
  };

  return (
    <View>
      <Text>Ajouter un livre</Text>
      <TextInput placeholder="Titre" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput placeholder="Quantité" value={quantity} onChangeText={setQuantity} />
      <TextInput placeholder="URL de l'image" value={imageUrl} onChangeText={setImageUrl} />
      <Button title="Ajouter le livre" onPress={submitForm} />
    </View>
  );
};

export default AddBookScreen;
