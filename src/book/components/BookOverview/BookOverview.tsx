import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Book } from "../../book";

export const BookOverview = () => {
  const { push } = useHistory();
  const [books] = useState<Book[]>([
    { id: 1, authors: "Author #1", title: "Title #1" },
    { id: 2, authors: "Author #2", title: "Title #2" },
  ]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 col-12'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Authors</th>
                <th scope='col'>Title</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book.id} onClick={() => push(`/book/${book.id}`)}>
                  <th scope='row'>{index + 1}</th>
                  <td>{book.authors}</td>
                  <td>{book.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
