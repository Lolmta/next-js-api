import React, { useRef } from "react";

import { buildFeedbackPath, extractFeedback } from "./../api/books/index";

const UserPage = (props) => {
  const bookRef = useRef();

  const { books } = props;

  const addBook = (e) => {
    e.preventDefault();

    const newBook = bookRef.current.value;
    console.log(newBook);

    fetch("/api/books", {
      method: "POST",
      body: JSON.stringify({
        book: newBook,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  console.log(books);
  return (
    <div>
      <h2>User Books:</h2>
      {books && (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      )}

      <input type="text" id="book" ref={bookRef} />
      <button onClick={addBook}>Add</button>
    </div>
  );
};

export function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      books: data,
    },
  };
}

export default UserPage;
