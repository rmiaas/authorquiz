import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './bootstrap.min.css';
import './App.css';

const highlightColor = {
  'none': 'white',
  'wrong': 'red',
  'correct': 'green'
};

const Header = () => {
  return (
    <div className='row'>
      <div className='jumbotron col-10 offset-1'>
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

const Footer = () => {
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

const Book = ({ title, onClick }) => {
  return (
    <div className='answer' onClick={() => onClick(title)}>
      <h4>{title}</h4>
    </div>
  )
}

const Turn = ({ books, author, answerStatus, onAnswerSelected }) => {
  return (
    <div className='row turn' style={{ backgroundColor: highlightColor[answerStatus] }}>
      <div className='col-4 offset-1'>
        <img src={author.imageUrl} className='authorimage' alt='Author' />
      </div>
      <div className='col-6'>
        {books.map((book) => <Book title={book} key={book} onClick={onAnswerSelected} />)}
      </div>
    </div>
  );
}

const ContinueButton = ({ onContinue }) => {
  return (
    <div className='col-11'>
      <button className='btn btn-primary btn-lg float-right' onClick={onContinue}>
        Continue
      </button>
    </div>
  );
}

const Continue = ({ show, onContinue }) => {
  return (
    <div className='row continue'>
      {show ? <ContinueButton onContinue={onContinue} /> : null}
    </div>
  );
}

const AddAuthorLink = () => {
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

const mapStateToProps = (state) => {
  return {
    turnData: state.turnData,
    answerStatus: state.turnData.answerStatus,
    gameId: state.gameId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAnswerSelected: (answer) => {
      dispatch({ type: 'ANSWER_SELECTED', answer });
    },
    onContinue: () => {
      dispatch({ type: 'CONTINUE' });
    }
  };
};

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(
  ({ turnData, answerStatus, gameId, onAnswerSelected, onContinue }) => {
    return (
      <div className='container-fluid'>
        <Header />
        <Turn {...turnData} answerStatus={answerStatus} key={gameId} onAnswerSelected={onAnswerSelected} />
        <Continue show={answerStatus === 'correct'} onContinue={onContinue} />
        <AddAuthorLink />
        <Footer />
      </div>
    );
  }
);

export default AuthorQuiz;
