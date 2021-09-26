import { useState } from "react";
import { Book } from "../book";
import { BookService } from "./BookService";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, authors: "Author #1", title: "Title #1" },
    { id: 2, authors: "Author #2", title: "Title #2" },
  ]);
  const findAll: BookService["findAll"] = () => delay(2000).then(() => books);
  const findOne: BookService["findOne"] = (id) => {
    const book = books.find((book) => book.id === id);
    if (!book) throw new Error(`book with id: ${id} not found`);
    return delay(1000).then(() => book);
  };
  const save: BookService["save"] = (bookToSave) => {
    const bookIndex = books.findIndex((book) => book.id === bookToSave.id);
    setBooks((prevBooks) => [
      ...prevBooks.slice(0, bookIndex),
      bookToSave,
      ...prevBooks.slice(bookIndex + 1),
    ]);
    return delay(1000).then(() => bookToSave);
  };
  const saveNew: BookService["saveNew"] = (bookToSave) => {
    const newBook = { ...bookToSave, id: books.length + 1 };
    setBooks((prevBooks) => [...prevBooks, newBook]);
    return delay(1000).then(() => newBook);
  };
  return {
    books,
    findAll,
    findOne,
    save,
    saveNew,
  };
};
