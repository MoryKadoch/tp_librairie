import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIVRES } from "../models/data";

const initialState = {
  books: [],
};

const booksReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKS":
      return { ...state, books: action.books };
    case "ADD_BOOK":
      return { ...state, books: [...state.books, action.book] };
    default:
      throw new Error("Error");
  }
};

export const BooksContext = createContext();

export const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, initialState);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const storedData = await AsyncStorage.getItem("books");
        if (storedData) {
          dispatch({ type: "SET_BOOKS", books: JSON.parse(storedData) });
        } else {
          dispatch({ type: "SET_BOOKS", books: LIVRES });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const saveBooks = async () => {
      try {
        await AsyncStorage.setItem("books", JSON.stringify(state.books));
      } catch (err) {
        console.log(err);
      }
    };

    saveBooks();
  }, [state.books]);

  const addBook = (book) => {
    dispatch({ type: "ADD_BOOK", book });
  };

  return (
    <BooksContext.Provider value={{ books: state.books, addBook }}>
      {children}
    </BooksContext.Provider>
  );
};
