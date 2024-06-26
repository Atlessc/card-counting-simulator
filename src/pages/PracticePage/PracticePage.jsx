import React, { useEffect, useState } from "react";
import useStore from "../../ZustandStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

import LearningPage from "../LearningPage";
import Modal from "../../components/Modal/Modal";
import Card from "../../components/Card/Card"; // Import the Card component
import "./Practice.css";

const calculateHandValue = (hand) => {
  let value = 0;
  let aces = 0;
  hand.forEach((card) => {
    if (typeof card.value === "number") {
      value += card.value;
    } else if (card.value === "A") {
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

const determineWinner = (playerHand, dealerHand) => {
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  if (dealerValue > 21) {
    return "Dealer busts, Player wins!";
  } else if (playerValue > 21) {
    return "Player busts, Dealer wins!";
  } else if (playerValue > dealerValue) {
    return "Player wins!";
  } else if (dealerValue > playerValue) {
    return "Dealer wins!";
  } else if (playerValue === dealerValue && (playerValue || dealerValue) < 21) {
    return "It's a tie!";
  } else if (playerValue === 21) {
    return "Player has blackjack! Player Wins!";
  }
};

const Practice = () => {
  const [adviceMessage, setAdviceMessage] = useState("");
  const {
    playerHand,
    dealerHand,
    dealerHandValue,
    playerHandValue,
    playedCards,
    runningCount,
    trueCount,
    cardsRemaining,
    playerTurn,
    gameOver,
    playerBust,
    playerBlackjack,
    dealerSecondCardHidden,
    initializeGame,
    drawCard,
    setPlayerTurn,
    setGameOver,
    setPlayerBust,
    setPlayerBlackjack,
    setDealerSecondCardHidden,
    resetGame,
    nextRound,
    setDealerHandValue,
    setPlayerHandValue,
    modalOpen,
    setModalOpen,
  } = useStore();

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handlePlayerDraw = () => {
    drawCard("playerHand");
    const playerValue = calculateHandValue(useStore.getState().playerHand);
    setPlayerHandValue(playerValue);
    // console.log(`Player hand value after drawing: ${playerValue}`);
    if (playerValue > 21) {
      setPlayerBust(true);
      setPlayerTurn(false);
      setTimeout(() => handleDealerTurn(), 1000);
    }
  };

  const handleDealerTurn = () => {
    // Step 1: Reveal dealer's second card
    setDealerSecondCardHidden(false);
    const updatedDealerHandValue = calculateHandValue(
      useStore.getState().dealerHand
    );
    setDealerHandValue(updatedDealerHandValue);
    // console.log(`Dealer hand value before draw: ${updatedDealerHandValue}`);
    // console.log(`Dealer's Hand: `, useStore.getState().dealerHand);

    // Step 2: Check dealer's hand value and make decision
    switch (true) {
      case updatedDealerHandValue < 17:
        // console.log("Dealer decides to draw a card.");
        drawCard("dealerHand");

        // Delay the next step to ensure state updates
        setTimeout(() => {
          // Step 3: Draw a card and recalculate hand value
          const newDealerHandValue = calculateHandValue(
            useStore.getState().dealerHand
          );
          setDealerHandValue(newDealerHandValue);
          // console.log(`Dealer hand value after drawing: ${newDealerHandValue}`);
          // console.log(`Dealer's Hand after drawing: `, useStore.getState().dealerHand);

          // Recursively handle the dealer's turn until they stand
          handleDealerTurn();
        }, 1000); // Set a timeout for the next draw
        break;

      case updatedDealerHandValue >= 17 && updatedDealerHandValue < 18:
        // console.log("Dealer has 17 and decides to hit.");
        drawCard("dealerHand");

        // Delay the next step to ensure state updates
        setTimeout(() => {
          // Step 3: Draw a card and recalculate hand value
          const newDealerHandValue = calculateHandValue(
            useStore.getState().dealerHand
          );
          setDealerHandValue(newDealerHandValue);
          // console.log(`Dealer hand value after drawing: ${newDealerHandValue}`);
          // console.log(`Dealer's Hand after drawing: `, useStore.getState().dealerHand);

          // Recursively handle the dealer's turn until they stand
          handleDealerTurn();
        }, 500); // Set a timeout for the next draw
        break;

      case updatedDealerHandValue >= 18:
        // console.log("Dealer decides to stand.");
        setGameOver(true);
        break;

      default:
        // console.log("Unexpected case in dealer decision-making.");
        setGameOver(true);
        break;
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const startGame = () => {
    resetGame();
    drawCard("playerHand");
    drawCard("dealerHand");
    drawCard("playerHand");
    drawCard("dealerHand");

    const playerValue = calculateHandValue(useStore.getState().playerHand);
    setPlayerHandValue(playerValue);
    if (playerValue === 21) {
      setPlayerBlackjack(true);
      setPlayerTurn(false);
      setTimeout(() => handleDealerTurn(), 1000);
    } else {
      setPlayerTurn(true);
    }
  };

  const handleStand = () => {
    setPlayerTurn(false);
    setTimeout(() => handleDealerTurn(), 1000);
  };

  const reset = () => {
    initializeGame();
  };

  const handleNextRound = () => {
    nextRound();
    drawCard("playerHand");
    drawCard("dealerHand");
    drawCard("playerHand");
    drawCard("dealerHand");

    const playerValue = calculateHandValue(useStore.getState().playerHand);
    setPlayerHandValue(playerValue);
    if (playerValue === 21) {
      setPlayerBlackjack(true);
      setPlayerTurn(false);
      setTimeout(() => handleDealerTurn(), 1000);
    } else {
      setPlayerTurn(true);
    }
  };

  useEffect(() => {
    if (runningCount > 0) {
      setAdviceMessage("Higher cards more common");
    } else if (runningCount < 0) {
      setAdviceMessage("Lower cards more common");
    } else {
      setAdviceMessage("Could go either way");
    }
  }, [runningCount]);

  const canHit = playerTurn && !playerBust && !playerBlackjack;
  const canStand = playerTurn && !playerBust && !playerBlackjack;
  const canNextRound = gameOver && !playerTurn;
  const canStartGame = !playerTurn && !gameOver && playerHand.length === 0;
  const canResetGame = true;

  useEffect(() => {
    if (!canStartGame) {
      if (playerHandValue === 21) {
        setPlayerTurn(false);
        setTimeout(() => handleDealerTurn(), 2000);
      }
    }
  }, [playerHandValue]);

  return (
    <div className="practice-page">
      <div className="practice-container">
        <div className="sidebar-left">
          <div className="info-container">
            <h3>Game Stats</h3>
            <p>Running Count: {runningCount}</p>
            <p>True Count: {trueCount.toFixed(2)}</p>
            <p>Cards Remaining: {cardsRemaining}</p>
            <br />
            <br />
            <p
              className="AdviceMessage"
              style={{
                backgroundColor:
                  runningCount > 0
                    ? "green"
                    : runningCount < 0
                    ? "red"
                    : "gray",
              }}
            >
              {adviceMessage}
            </p>
            <br />
            <br />
            <div className={playerBust || gameOver ? "game-status" : ""}>
              {playerBust && <p>Player busts!</p>}
              {gameOver && !playerBust && (
                <p>{determineWinner(playerHand, dealerHand)}</p>
              )}
            </div>
          </div>
        </div>
        <div className="game-board">
          <div className="question-icon" onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faQuestion} />
          </div>
          <h2>Practice Card Counting</h2>

          <div className="dealer-container">
            <h3>Dealer's Hand</h3>
            <div className="hand">
              {dealerHand.map((card, index) => (
                <Card
                  key={index}
                  value={card.value}
                  suit={card.suit}
                  hidden={index === 1 && dealerSecondCardHidden}
                />
              ))}
            </div>
            <p>
              Hand Value:{" "}
              {dealerSecondCardHidden
                ? calculateHandValue(dealerHand.slice(0, 1))
                : dealerHandValue}
            </p>
          </div>
          <br />
          <br />
          <div className="player-container">
            <h3>Player's Hand</h3>
            <div className="hand">
              {playerHand.map((card, index) => (
                <Card key={index} value={card.value} suit={card.suit} />
              ))}
            </div>
            <p>Hand Value: {playerHandValue}</p>
            <div className="player-actions">
              {canNextRound ? (
                cardsRemaining <= 6 ? (            
                  <button onClick={reset} disabled={!canResetGame}>
                    Reset Game
                  </button>
                ) : (
                  <button onClick={handleNextRound} disabled={!canNextRound || cardsRemaining <= 6}>
                    Next Hand
                  </button>
                  )
                
              ) : (
                <>
                  <button onClick={handlePlayerDraw} disabled={!canHit}>
                    Hit
                  </button>
                  <button onClick={handleStand} disabled={!canStand}>
                    Stand
                  </button>
                </>
              )}
              {/* <button onClick={handleSplit} disabled={!canSplit}>
                Split
              </button> */}
            </div>
          </div>
          <br />
          <br />
          <br />
          <div className="control-buttons">
            <button onClick={startGame} disabled={!canStartGame}>
              Start Game
            </button>
            <button onClick={reset} disabled={!canResetGame}>
              Reset Game
            </button>
            {/* <button onClick={handleNextRound} disabled={!canNextRound}>
          Next Hand
        </button> */}
          </div>
        </div>
        {/* <div className="sidebar-right">
            <h3>Played Cards</h3>
          <div className="played-cards-container">
            <div className="cards">
              {playedCards.map((card, index) => (
                <Card key={index} value={card.value} suit={card.suit} />
              ))}
            </div>
          </div>
        </div> */}
      </div>

      {modalOpen && (
        <Modal>
          <LearningPage />
        </Modal>
      )}
    </div>
  );
};

export default Practice;
