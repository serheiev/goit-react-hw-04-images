import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.scss';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };

  const inputSearchName = e => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          onChange={inputSearchName}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          name="inputValue"
          value={inputValue}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
