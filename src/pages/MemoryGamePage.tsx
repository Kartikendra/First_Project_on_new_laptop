import { useEffect, useState } from "react";

interface MemoryCard {
  id: string;
  face: string;
}

const faces = ["<>", "{}", "[]", "&&", "λ", ";;"];

function createDeck(): MemoryCard[] {
  const deck = faces.flatMap((face, index) => [
    { id: `${index}-a`, face },
    { id: `${index}-b`, face },
  ]);

  for (let index = deck.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[randomIndex]] = [deck[randomIndex], deck[index]];
  }

  return deck;
}

export default function MemoryGamePage() {
  const [deck, setDeck] = useState(createDeck);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (flippedIds.length !== 2) return;

    const [firstId, secondId] = flippedIds;
    const firstCard = deck.find((card) => card.id === firstId);
    const secondCard = deck.find((card) => card.id === secondId);
    const isMatch = firstCard?.face === secondCard?.face;
    const timeout = window.setTimeout(() => {
      if (isMatch) {
        setMatchedIds((current) => [...current, firstId, secondId]);
      }
      setFlippedIds([]);
      setLocked(false);
    }, isMatch ? 450 : 850);

    return () => window.clearTimeout(timeout);
  }, [deck, flippedIds]);

  useEffect(() => {
    if (matchedIds.length === deck.length) return;
    const interval = window.setInterval(() => setSeconds((current) => current + 1), 1000);
    return () => window.clearInterval(interval);
  }, [deck.length, matchedIds.length]);

  function flipCard(card: MemoryCard) {
    if (locked || flippedIds.includes(card.id) || matchedIds.includes(card.id)) return;
    if (flippedIds.length === 1) {
      setLocked(true);
      setMoves((current) => current + 1);
      setFlippedIds([...flippedIds, card.id]);
      return;
    }
    setFlippedIds([card.id]);
  }

  function restartGame() {
    setDeck(createDeck());
    setFlippedIds([]);
    setMatchedIds([]);
    setMoves(0);
    setSeconds(0);
    setLocked(false);
  }

  const gameComplete = matchedIds.length === deck.length;
  const formattedTime = `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <main className="page-shell game-page">
      <section className="page-heading">
        <p className="eyebrow">PROJECT 02 · INTERACTION</p>
        <h1>Memory Match</h1>
        <p className="page-description">Find the matching pairs. Fewer moves is better.</p>
      </section>
      <section className="game-panel" aria-label="Memory matching game">
        <div className="game-toolbar">
          <div className="game-stats">
            <div><span className="stat-label">MOVES</span><strong>{moves}</strong></div>
            <div><span className="stat-label">TIME</span><strong>{formattedTime}</strong></div>
            <div><span className="stat-label">PAIRS</span><strong>{matchedIds.length / 2} / {faces.length}</strong></div>
          </div>
          <button className="button button-outline" type="button" onClick={restartGame}>Restart</button>
        </div>
        <div className="memory-grid">
          {deck.map((card) => {
            const isVisible = flippedIds.includes(card.id) || matchedIds.includes(card.id);
            const isMatched = matchedIds.includes(card.id);
            return (
              <button
                className={`memory-card${isVisible ? " is-visible" : ""}${isMatched ? " is-matched" : ""}`}
                type="button"
                key={card.id}
                onClick={() => flipCard(card)}
                disabled={isMatched || (locked && !isVisible)}
                aria-label={isVisible ? `Card ${card.face}` : "Reveal hidden card"}
              >
                <span>{isVisible ? card.face : "?"}</span>
              </button>
            );
          })}
        </div>
        <p className="game-message" aria-live="polite">
          {gameComplete ? `All pairs found in ${moves} moves.` : "Match all six pairs to finish."}
        </p>
      </section>
    </main>
  );
}