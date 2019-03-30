import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './AddAuthorForm.css';

const AuthorForm = ({ onAddAuthor }) => {
    const newAuthorData = {
        name: '',
        imageUrl: '',
        books: [],
        bookTemp: ''
    };
    const [authorData, setAuthorData] = useState(newAuthorData);

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddAuthor(authorData);
    };

    const handleFieldChange = (event) => {
        setAuthorData({
            ...authorData,
            [event.target.name]: event.target.value
        });
    }

    const handleAddBook = () => {
        setAuthorData({
            ...authorData,
            books: authorData.books.concat(authorData.bookTemp),
            bookTemp: ''
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="AddAuthorForm__input">
                <label htmlFor='name'>
                    Name
                    </label>
                <input type='text' name='name' value={authorData.name} onChange={handleFieldChange} />
            </div>
            <div className="AddAuthorForm__input">
                <label htmlFor='imageUrl'>
                    Image URL
                    </label>
                <input type='text' name='imageUrl' value={authorData.imageUrl} onChange={handleFieldChange} />
            </div>
            <div className="AddAuthorForm__input">
                <label htmlFor='bookTemp'>
                    Books
                </label>
                {authorData.books.map((book) => <p key={book}>{book}</p>)}
                <input type='text' name='bookTemp' value={authorData.bookTemp} onChange={handleFieldChange} />
                <input type='button' value='+' onClick={handleAddBook} />
            </div>
            <input type='submit' value='Add' />
        </form>
    )
}

const AddAuthorForm = ({ match, onAddAuthor }) => {
    return (
        <div className="AddAuthorForm">
            <h1>
                Add an author
            </h1>
            <AuthorForm onAddAuthor={onAddAuthor} />
        </div>
    );
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddAuthor: (author) => {
            dispatch({ type: 'ADD_AUTHOR', author });
            props.history.push('/');
        }
    };
};

export default withRouter(connect(() => { }, mapDispatchToProps)(AddAuthorForm));