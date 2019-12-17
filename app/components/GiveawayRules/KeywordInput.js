import React, { useState, useEffect } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import './style.css';

const KeywordInput = () => {
  const [keyword, setKeyword] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let storedKeyword = localStorage.getItem('keyword');
    if (storedKeyword === null) {
      storedKeyword = '';
    }
    setKeyword(storedKeyword);
  }, []);

  const handleInputChange = event => {
    setKeyword(event.target.value);
    localStorage.setItem('keyword', event.target.value);
  };
  const handleToggleButton = () => setVisible(prevState => !prevState);

  return (
    <TextField
      autoFocus
      margin="dense"
      name="keyword"
      onChange={handleInputChange}
      id="keyword"
      label="Słowo kluczowe"
      type={visible ? 'text' : 'password'}
      value={keyword}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Ukryj lub odsłoń słowo kluczowe" aria-label="add">
              <button
                aria-label="toggle keyword visibility"
                className="toggle-visibility-btn"
                name="showKeyword"
                onClick={handleToggleButton}
                type="button"
              >
                {visible ? (
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z"
                      fill="none"
                    />
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                  </svg>
                )}
              </button>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default KeywordInput;