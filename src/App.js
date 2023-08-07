import { generate, count } from "random-words";
import basepic from "./BasePicture.png";
import move1 from "./Move1.png";
import move2 from "./Move2.png";
import move3 from "./Move3.png";
import move4 from "./Move4.png";
import move5 from "./Move5.png";
import move6 from "./Move6.png";
let trials = [];
let imgs = [basepic,move1,move2,move3,move4,move5,move6]
function Alphabet({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick} id = "color">
      {value}
    </button>
  );
}
function playAgain (randWord){
  randWord = generate();
  console.log(randWord);
  let input = [];
  for (let i = 0; i < randWord.length; i++) {
    input.push("_")
  }
  return(randWord,input)
}
function handleClick(i,alphabet,word,input,trials) {
  console.log(i)
  console.log(alphabet[i])
  if (word.includes(alphabet[i])) {
    document.getElementById(alphabet[i]).className = "exists"
    let letter = 0;
    for (letter = 0; letter < word.length; letter++)
      if (word[letter] == alphabet[i]){
        input.splice(letter,1)
        input.splice(letter,0,alphabet[i])
        console.log(i + "exists")
        document.getElementById("myspan").textContent=input.join('')
        if (input.join('') === word.join('')) {
          document.getElementById("myspan").className= "victorystatement"
          document.getElementById("myspan").textContent="Congrats! You Won! The word is "+word.join("")
        }
      }
      else {
        continue
      }
    }
  else {
    document.getElementById(alphabet[i]).className = "notExisting"
    console.log("move!!!");
    trials.push('x')
    document.getElementById("imageid").src = imgs[trials.length];
    document.getElementById("movecount").textContent = "You have " + (6-trials.length) + " moves left"
    if (trials.length === 6){
      document.getElementById("myspan").className= "victorystatement"
      document.getElementById("myspan").textContent= "Nice try! Your word is: " + word.join("")
    }
  }
}
function getButtons(startindx,endingindx,alphabet,word,input,trials){
  let buttons = [];
  for (let i = startindx; i<endingindx ; i++) {
    buttons.push(<button className = "square" onClick={() => handleClick(i,alphabet,word,input,trials )} id = {alphabet[i]}>{alphabet[i]}</button>)
  }
  return buttons
}
export default function Game(){
  const refresh = () => window.location.reload(true)
  let classname = "square";
  var randWord = generate()
  let alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  console.log(randWord);
  let word = randWord.split('');
  let input = [];
  for (let i = 0; i < randWord.length; i++) {
    input.push("_")
  }
  console.log(input)
  return(
    <div>
      <div className = "parent">
        <div>
          <img src = {basepic} id="imageid" className="image" alt="Missed"/>
        </div>
        <span id = "movecount" className = "movestatement">You have 6 moves left</span>
        <div>
          <span id="myspan" className="word">{input.join('')}</span>
        </div>
        <div className = "alpha">
          <div>
            {getButtons(0,13,alphabet,word,input,trials)}
          </div>
          <div>
            {getButtons(13,26,alphabet,word,input,trials)}
          </div>
        </div>
      </div>
      <button className = "retry" onClick={refresh}>Click to Play Again</button>
    </div>
  )
}
