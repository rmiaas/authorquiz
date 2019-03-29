import React from 'react';
import { Link } from 'react-router-dom';
import './bootstrap.min.css';
import './App.css';

const highlightColor = {
  'none': 'white',
  'wrong': 'red',
  'correct': 'green'
};

const Header = (props) => {
  return (
    <div className='row'>
      <div className='jumbotron col-10 offset-1'>
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

const Footer = (props) => {
  return (
    <div id='footer' className='row'>
      <div className='col-8 offset-4'>
        <p className='text-muted credit'>
          All images are from <a href="http://commons.wikimedia.org/wiki/Main_Page">Wikemedia Commons</a> and are in the public domain
      </p>
      </div>
    </div>
  )
}

const Book = (props) => {
  return (
    <div className='answer' onClick={() => props.onClick(props.title)}>
      <h4>{props.title}</h4>
    </div>
  )
}

const Turn = (props) => {
  return (
    <div className='row turn' style={{ backgroundColor: highlightColor[props.answerStatus] }}>
      <div className='col-4 offset-1'>
        <img src={props.author.imageUrl} className='authorimage' alt='Author' />
      </div>
      <div className='col-6'>
        {props.books.map((book) => <Book title={book} key={book} onClick={props.onClick} />)}
      </div>
    </div>
  );
}

const ContinueButton = (props) => {
  return (
    <div className='col-11'>
      <button className='btn btn-primary btn-lg float-right' onClick={props.onContinue}>
        Continue
      </button>
    </div>
  );
}

const Continue = (props) => {
  return (
    <div className='row continue'>
      {props.show ? <ContinueButton onContinue={props.onContinue} /> : null}
    </div>
  );
}

const AddAuthorLink = (props) => {
  return (
    <div className='row'>
      <div className='col-4 offset-1'>
        <Link to='/add'>
          Add an author
        </Link>
      </div>
    </div>
  );
}

const AuthorQuiz = (props) => {
  const handleClick = (title) => props.onClick(title);
  return (
    <div className='container-fluid'>
      <Header />
      <Turn {...props} onClick={handleClick} />
      <Continue show={props.answerStatus === 'correct'} onContinue={props.onContinue} />
      <AddAuthorLink />
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
