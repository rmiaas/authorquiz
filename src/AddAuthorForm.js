import React from 'react';

import './AddAuthorForm.css';

const AuthorForm = (props) => {
    return (
        <form onSubmit={() => props.onAddAuthor()}>
            <div className="AddAuthorForm__input">
                <label htmlFor='name'>
                    Name
                    </label>
                <input type='text' name='name' value={props.authorName} onChange={(event) => props.onFieldChange(event)} />
            </div>
            <div className="AddAuthorForm__input">
                <label htmlFor='imageUrl'>
                    Image URL
                    </label>
                <input type='text' name='imageUrl' value={props.imageUrl} onChange={(event) => props.onFieldChange(event)} />
            </div>
            <div className="AddAuthorForm__input">
                <label htmlFor='bookTemp'>
                    Books
                </label>
                {props.books.map((book) => <p key={book}>{book}</p>)}
                <input type='text' name='bookTemp' value={props.bookTemp} onChange={(event) => props.onFieldChange(event)} />
                <input type='button' value='+' onClick={() => props.onAddBook()} />
            </div>
            <input type='submit' value='Add' />
        </form>
    )
}

const AddAuthorForm = (props) => {
    return (
        <div>
            <h1>
                Add an author
            </h1>
            <AuthorForm
                authorName={props.authorName}
                imageUrl={props.imageUrl}
                books={props.books}
                bookTemp={props.bookTemp}
                onAddAuthor={props.onAddAuthor}
                onFieldChange={props.onFieldChange}
                onAddBook={props.onAddBook} />
        </div>
    );
}

export default AddAuthorForm;