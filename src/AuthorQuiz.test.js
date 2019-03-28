import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AuthorQuiz from './AuthorQuiz';

Enzyme.configure({ adapter: new Adapter() });

const Hello = (props) => {
  return (
    <h1>
      Hello at {props.now}
    </h1>
  );
}

const moment = new Date();


describe("When testing directly", () => {
  let result;

  beforeAll(() => {
    result = Hello(moment);
  });

  it("returns a value", () => {
    expect(result).not.toBeNull();
  });

  it("is a h1", () => {
    expect(result.type).toBe("h1");
  });

  it("has children", () => {
    expect(result.props.children).toBeTruthy();
  });
});


describe("Author Quiz test section", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("When testing with enzyme", () => {
  it("renders an h1", () => {
    const helloWrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(helloWrapper.find("h1").length).toBe(1);
  });
});
