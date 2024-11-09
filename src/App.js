import React from 'react';
import './App.css';
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setdice] = React.useState(allnewdce())
  const [tenzies, settenzies] = React.useState(false)
  React.useEffect(() => {
    const allheld = dice.every(die => die.isHeld)
    const firstvalue = dice[0].value
    const allsamevalue = dice.every(die => die.value === firstvalue)
    if (allheld && allsamevalue) {
      settenzies(true)
      console.log("you won!")
    }
  }, [dice])

  function allnewdce() {
    const newdice = []
    for (let j = 0; j < 10; j++) {
      newdice.push(generatenew())
    }
    return newdice
  }

  function generatenew() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function rolldice() {
    if (!tenzies) {
      setdice(olddice => olddice.map(die => {
        return die.isHeld ?
          die :
          generatenew()
      }))
    }
    else {
      settenzies(false)
      setdice(allnewdce())
    }
  }

  function holddice(id) {
    setdice(olddice => olddice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceelements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holddice={() => holddice(die.id)} />)
  return (
    <main >
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-containner">
        {diceelements}
      </div>
      <button className="roll-dice" onClick={rolldice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
