import { Book, BookProperties } from "../book";
import { BookService } from "./BookService";
import { headers } from "../../common/utils";

const URI = `http://localhost:5000/`;

export const useBooks = () => {
  const findAll: BookService["findAll"] = () =>
    fetch(URI, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: "{ allBooks { id authors title } }" }),
    })
      .then((response) => response.json())
      .then(({ data: { allBooks } }) => allBooks);

  const findOne: BookService["findOne"] = (id) =>
    fetch(URI, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: `query Book($id: ID!) {
              Book(id: $id) {
                id
                title
                authors
            }
          }`,
        variables: JSON.stringify({ id }),
      }),
    })
      .then((response) => response.json())
      .then(({ data: { Book } }) => Book);

  const saveNew: BookService["saveNew"] = ({
    authors,
    title,
  }: BookProperties) =>
    fetch(URI, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: `mutation ($authors: String! $title: String!) {
          createBook(authors: $authors title: $title) {
            id
            authors
            title
          }
        }`,
        variables: JSON.stringify({
          id: Math.floor(Math.random() * 100),
          authors: authors,
          title: title,
        }),
      }),
    })
      .then((response) => response.json())
      .then(({ data: { createBook } }) => createBook);

  const save: BookService["save"] = ({ id, authors, title }: Book) =>
    fetch(URI, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: `mutation ($id: ID! $authors: String! $title: String!) {
              updateBook(id: $id authors: $authors title: $title) {
                id
                authors
                title
              }
            }`,
        variables: JSON.stringify({
          id: id,
          authors: authors,
          title: title,
        }),
      }),
    })
      .then((response) => response.json())
      .then(({ data: { updateBook } }) => updateBook);

  return {
    findAll,
    findOne,
    saveNew,
    save,
  };
};
