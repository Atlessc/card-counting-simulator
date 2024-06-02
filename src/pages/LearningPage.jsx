import React from 'react';

const LearningPage = () => {
  return (
    <div>
      <h2>Learn Card Counting</h2>
      <h3>Introduction</h3>
      <p>Card counting is a technique used to determine whether the next hand is likely to give an advantage to the player or the dealer. By keeping track of the high and low cards, players can make more informed decisions.</p>
      
      <h3>Basic Strategy</h3>
      <p>The most common card counting system is the Hi-Lo count. Each card is assigned a value:</p>
      <ul>
        <li>2-6: +1</li>
        <li>7-9: 0</li>
        <li>10-Ace: -1</li>
      </ul>
      
      <h3>Counting Process</h3>
      <p>As cards are dealt, you keep a running total based on the values above. The higher the count, the more high cards are left in the deck, which is advantageous for the player.</p>
      
      <h3>True Count</h3>
      <p>To improve accuracy, convert the running count to a true count by dividing the running count by the number of decks remaining. This helps adjust for different deck sizes.</p>
      
      <h3>Practice Tips</h3>
      <p>Start by practicing counting a single deck, then gradually add more decks. Use simulations to practice in real-time scenarios.</p>
    </div>
  );
};

export default LearningPage;
