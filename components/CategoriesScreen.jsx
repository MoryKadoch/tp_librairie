import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CATEGORIES } from '../models/data';

const CategoriesScreen = ({ navigation }) => {

    const renderGridItem = (itemData) => {
        return (
            <View style={{ ...styles.gridItem, backgroundColor: itemData.item.couleur }}>
                <Text
                    style={styles.title}
                    onPress={() => {
                        navigation.navigate('Category', { categoryId: itemData.item.id });
                    }}
                >
                    {itemData.item.genre}
                </Text>
            </View>
        );
    };

    return (
        <FlatList
            data={CATEGORIES}
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
        padding: 15,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        textTransform: 'capitalize',
        color: 'white',
    },
});

export default CategoriesScreen;
