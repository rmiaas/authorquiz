import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.png',
        imageSource: 'Wikimedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Daniel Ogren',
        books: ['Harry Potter and the Sorcerers Stone']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Pinguino',
        books: ['The Shining', 'IT']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    }
];

const getTurnData = (authors) => {
    const allBooks = authors.reduce((prev, curr, index) => prev.concat(curr.books), []);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((title) => title === answer)),
        answerStatus: 'none'
    }
}

const RepeatableApp = () => {
    const [gameId, setGameId] = useState(1);
    return (
        <App key={gameId} onContinue={() => setGameId(gameId + 1)} />
    );
}


const App = (props) => {
    const [state, setAppState] = useState(getTurnData(authors));

    const handleClick = (selected) => {
        let isCorrect = state.author.books.some((book) => book === selected);
        isCorrect ? setAppState({ ...state, answerStatus: 'correct' }) : setAppState({ ...state, answerStatus: 'wrong' });
    }

    return (
        <AuthorQuiz books={state.books}
            author={state.author}
            answerStatus={state.answerStatus}
            onClick={(val) => handleClick(val)}
            onContinue={props.onContinue}
        />
    );
}

const AddAuthorWrapper = withRouter((props) => {
    const newAuthorData = {
        name: '',
        imageUrl: '',
        books: [],
        bookTemp: ''
    };
    const [authorData, setAuthorData] = useState(newAuthorData);

    const handleAddAuthor = () => {
        authors.push({
            name: authorData.name,
            imageUrl: authorData.imageUrl,
            imageSource: 'Wikimedia Commons',
            books: authorData.books
        });
        props.history.push('/');
        console.log(authors);
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
        <AddAuthorForm
            authorName={authorData.name}
            imageUrl={authorData.imageUrl}
            books={authorData.books}
            bookTemp={authorData.bookTemp}
            onAddAuthor={(author) => handleAddAuthor(author)}
            onFieldChange={(event) => handleFieldChange(event)}
            onAddBook={handleAddBook}
        />
    );
})

const AppRoutes = (props) => {
    return (
        <BrowserRouter>
            <>
                <Route exact path='/' component={RepeatableApp} />
                <Route path='/add' component={AddAuthorWrapper} />
            </>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <AppRoutes />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
