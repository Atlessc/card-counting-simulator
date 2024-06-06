import {create} from 'zustand';

const cardValues = {
  2: 1, 3: 1, 4: 1, 5: 1,
  6: 1, 7: 0, 8: 0, 9: 0,
  10: -1, J: -1, Q: -1, K: -1, A: -1,
};

const initializeDeck = (decks = 1) => {
  const suits = ['H', 'D', 'C', 'S'];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  let deck = [];
  for (let i = 0; i < decks; i++) {
    for (let suit of suits) {
      for (let value of values) {
        deck.push({ suit, value });
      }
    }
    console.log(deck);
  }
  return deck;
};

const shuffleDeck = (deck) => {
    // console.log(deck);
  for (let i = deck.length - 1; i > 0; i--) {
    console.log(deck);
    // console.log(i);
    const j = Math.floor(Math.random() * (i + 1));
    // console.log(j);
    [deck[i], deck[j]] = [deck[j], deck[i]];
    // console.log(deck);
  }
    console.log(deck);
  return deck;
};

const calculateHandValue = (hand) => {
  let value = 0;
  let aces = 0;
  hand.forEach(card => {
    if (typeof card.value === 'number') {
      value += card.value;
    } else if (card.value === 'A') {
      aces += 1;
      value += 11;
    } else {
      value += 10;
    }
  });

  while (value > 21 && aces > 0) {
    value -= 10;
    aces -= 1;
  }

  return value;
};

const useStore = create((set, get) => ({
  deck: [],
  playerHand: [],
  dealerHand: [],
  dealerHandValue: 0,
  playerHandValue: 0,
  playedCards: [],
  graveyard: [],
  runningCount: 0,
  trueCount: 0,
  cardsRemaining: 0,
  playerTurn: false,
  gameOver: false,
  playerBust: false,
  playerBlackjack: false,
  dealerSecondCardHidden: true,
  modalOpen: false,

  setModalOpen: (value) => set({ modalOpen: value }),

  initializeGame: () => {
    const newDeck = shuffleDeck(initializeDeck());
    set({
      deck: newDeck,
      cardsRemaining: newDeck.length,
      playerHand: [],
      dealerHand: [],
      dealerHandValue: 0,
      playerHandValue: 0,
      playedCards: [],
      graveyard: [],
      runningCount: 0,
      trueCount: 0,
      playerTurn: false,
      gameOver: false,
      playerBust: false,
      playerBlackjack: false,
      dealerSecondCardHidden: true,
    });
  },

  drawCard: (handType) => {
    const state = get();
    const newDeck = [...state.deck];
    const card = newDeck.pop();
    const newHand = [...state[handType], card];
    const newPlayedCards = [...state.playedCards, card];
    const newRunningCount = state.runningCount + (cardValues[card.value] || 0);
    const newTrueCount = newRunningCount / (newDeck.length / 52);
    const newDealerHandValue = handType === 'dealerHand' ? calculateHandValue(newHand) : state.dealerHandValue;
    const newPlayerHandValue = handType === 'playerHand' ? calculateHandValue(newHand) : state.playerHandValue;

    set({
      deck: newDeck,
      [handType]: newHand,
      playedCards: newPlayedCards,
      runningCount: newRunningCount,
      trueCount: newTrueCount,
      cardsRemaining: newDeck.length,
      dealerHandValue: newDealerHandValue,
      playerHandValue: newPlayerHandValue,
    });

    if (newDeck.length === 0) {
      // Reshuffle graveyard back into deck and reset count
      setTimeout(() => {
        const reshuffledDeck = shuffleDeck([...state.playedCards]);
        set({
          deck: reshuffledDeck,
          playedCards: [],
          runningCount: 0,
          trueCount: 0,
          cardsRemaining: reshuffledDeck.length,
        });
      }, 1000);
    }
  },

  setPlayerTurn: (value) => set({ playerTurn: value }),
  setGameOver: (value) => set({ gameOver: value }),
  setPlayerBust: (value) => set({ playerBust: value }),
  setPlayerBlackjack: (value) => set({ playerBlackjack: value }),
  setDealerSecondCardHidden: (value) => set({ dealerSecondCardHidden: value }),
  setDealerHandValue: (value) => set({ dealerHandValue: value }),
  setPlayerHandValue: (value) => set({ playerHandValue: value }),

  resetGame: () => {
    const state = get();
    set({
      playerHand: [],
      dealerHand: [],
      dealerHandValue: 0,
      playerHandValue: 0,
      playedCards: [],
      graveyard: [...state.graveyard, ...state.playerHand, ...state.dealerHand],
      playerTurn: false,
      gameOver: false,
      playerBust: false,
      playerBlackjack: false,
      dealerSecondCardHidden: true,
    });
  },

  nextRound: () => {
    const state = get();
    set({
      playerHand: [],
      dealerHand: [],
      dealerHandValue: 0,
      playerHandValue: 0,
      playedCards: [],
      graveyard: [...state.graveyard, ...state.playerHand, ...state.dealerHand],
      playerTurn: false,
      gameOver: false,
      playerBust: false,
      playerBlackjack: false,
      dealerSecondCardHidden: true,
    });
  },
}));

export default useStore;
