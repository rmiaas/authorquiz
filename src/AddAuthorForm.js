import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const AddAuthorForm = (props) => {
    return (
        <div>
            <h1>
                Add an author
            </h1>
            <form>
                <div>
                    <label htmlFor='name'>
                        Name
                    </label>
                    <input type='text' name='name' />
                </div>
            </form>
        </div>
    );
}

export default AddAuthorForm;