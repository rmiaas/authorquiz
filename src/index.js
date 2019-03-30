import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
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
};

const newAuthorData = {
    name: '',
    imageUrl: '',
    books: [],
    bookTemp: ''
};

const initalState = () => {
    let randomTurnData = getTurnData(authors);
    return {
        authors: authors,
        turnData: randomTurnData,
        newAuthorData: newAuthorData,
        gameId: 1
    }
};

const reducer = (state = initalState(), action) => {
    switch (action.type) {
        case 'ANSWER_SELECTED':
            let isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            state.turnData.answerStatus = isCorrect ? 'correct' : 'wrong';
            return { ...state };
        case 'CONTINUE':
            return Object.assign({}, state, {
                turnData: getTurnData(state.authors),
                gameId: state.gameId + 1
            });
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
                authors: state.authors.concat([{
                    name: action.author.name,
                    imageUrl: action.author.imageUrl,
                    books: action.author.books,
                    imageSource: 'Wikimedia Commons'
                }])
            });
        default:
            return { ...state };

    }
};

const authorStore = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={authorStore}>
            <React.Fragment>
                <Route exact path='/' component={AuthorQuiz} />
                <Route path='/add' component={AddAuthorForm} />
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
