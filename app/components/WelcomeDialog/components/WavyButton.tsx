import React, {useState} from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #3f51b5;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: .025em;
  padding: 6px 8px;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    background-color: rgba(63, 81, 181, 0.04);
  }
  div {
    display: inline-block;
    transition: transform .25s ease-in-out;
  }
`;

interface Props {
  onClick: () => void;
  text: string;
}

const WavyButton = ({ onClick, text }: Props) => {
  const [translate, setTranslate] = useState('0');
  const onMouseEnter = () => {
    setTranslate('-25%');
    setTimeout(() => {
      setTranslate('0');
    }, text.length * 50 + 50);
  };
  return (
    <Button onClick={onClick} aria-label={text} onMouseEnter={onMouseEnter} type="button">
      {[...text].map((letter, index) => (
        <div key={`${letter}`} style={{transitionDelay: `${index*0.05}s`, transform: `translateY(${translate})`}}>{letter}</div>
      ))}
    </Button>
  );
};

export default WavyButton;
