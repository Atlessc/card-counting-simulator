import React from 'react';
import './Card.css'; // Create and import a CSS file for card styling

const suitIcons = {
  H: '♥', // Hearts
  D: '♦', // Diamonds
  C: '♣', // Clubs
  S: '♠', // Spades
};

const suitColors = {
  H: 'red',
  D: 'red',
  C: 'black',
  S: 'black',
};

const Card = ({ value, suit }) => {
  const suitIcon = suitIcons[suit];
  const color = suitColors[suit];

  return (
    <span className={`card ${color}`}>
      {value} {suitIcon}
    </span>
  );
};

export default Card;
