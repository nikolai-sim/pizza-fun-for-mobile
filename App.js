import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ActivityIndicator, Button, FlatList} from 'react-native';
import {selectWord, check, checkWin} from './lib'
import {useState, useEffect} from 'react'
import { getWords } from './apis/index'
import { words } from './words'

import LetterButton from './components/LetterButton';

export default function App() {

  const renderImage = (count) => {
    switch(count) {
      case 7 :
        return <Image source={require('./images/7.png')} style={{height: 200, width: 200, margin:25}}/>
      case 6 :
        return <Image source={require('./images/6.png')} style={{height: 200, width: 200, margin:25}}/>
      case 5 :
        return <Image source={require('./images/5.png')} style={{height: 200, width: 200, margin:25}}/>
      case 4 :
        return <Image source={require('./images/4.png')} style={{height: 200, width: 200, margin:25}}/>
      case 3 :
        return <Image source={require('./images/3.png')} style={{height: 200, width: 200, margin:25}}/>
      case 2 :
        return <Image source={require('./images/2.png')} style={{height: 200, width: 200, margin:25}}/>
      case 1 :
        return <Image source={require('./images/1.png')} style={{height: 200, width: 200, margin:25}}/>
      case 0 :
        return <Image source={require('./images/0.png')} style={{height: 200, width: 200, margin:25}}/>
      case 100 :
        return <Image source={require('./images/win.png')} style={{height: 200, width: 200, margin:25}}/>
      default:
        return <Image source={require('./images/7.png')} style={{height: 200, width: 200, margin:25}}/>
    }
  }
  
  const letters = [ {letter: 'a'}, {letter: 'b'}, {letter: 'c'}, {letter: 'd'}, {letter: 'e'}, {letter: 'f'}, {letter: 'g'}, {letter: 'h'}, 
  {letter: 'i'}, {letter: 'j'}, {letter: 'k'}, {letter: 'l'}, {letter: 'm'}, {letter: 'n'}, {letter: 'o'}, {letter: 'p'}, {letter: 'q'}, {letter: 'r'},  
  {letter: 's'}, {letter: 't'}, {letter: 'u'}, {letter: 'v'}, {letter: 'w'}, {letter: 'x'}, {letter: 'y'}, {letter: 'z'}]
  
    const randWord = selectWord(words)
    let answer1 = (randWord.split(''))

  let temp = []
  for (let i=0; i < answer1.length ; i++) {
    temp.push('_')
  }
  
  const start = temp.join('')
  
  const [answer, setAnswer] = useState(answer1)
  const [board , setBoard] = useState(start)
  const [pastGuess, setPastGuess] = useState('')
  const [box, setBox] = useState('')
  const [pizza, eatPizza] = useState(<Image source={require('./images/7.png')} style={{height: 200, width: 200, margin:25}}/>)
  const [counter, setCounter] = useState(7)
  const [text, setText] = useState('')

  const handleSubmit = (letter) => {
    
    let newCount
    const guess = letter
    const update = check(guess.toLowerCase() , answer , board)
    const isWin = checkWin(update, answer.join(''))
    
    if (update === board) {
      newCount = (counter - 1)
    } 
    else
    {newCount = counter}
    
    setCounter(newCount)
    
    setBoard(update)
    setPastGuess(pastGuess + " " + guess)
    setText('')
    if (isWin === true) {
      setCounter(100)
    }
    else {
      eatPizza('./images/' + newCount.toString(10) + ".png")
    }
    
    
  }

  const newGame = () => {
    setText('')
    setCounter(7)
    setBoard(start)
    const newRandWord = selectWord(words)
    let answer2 = newRandWord.split('')
    setAnswer(answer2)
    setPastGuess('')
  }

  return (
    <View style={styles.container}>
      
      <View style={{backgroundColor: '#FCED61', margin: 15, marginTop: 45}}>
      {renderImage(counter)}
      </View>
      <Text style={{color:'black', letterSpacing: 3, fontSize: 16}}>PIZZA FUN</Text>
      {board? <Text>Guess the word</Text> : <Text> Press New Game to Start </Text>}
      

      <Text style={{letterSpacing:5, fontSize:32, margin:5}}>{board}</Text>
     {answer1? <Text style={{letterSpacing:3, fontSize:18, margin:5}}>{pastGuess}</Text> : <ActivityIndicator/>}
     
      <FlatList data={letters}
        renderItem={({item, index}) => (<LetterButton letter={item.letter} handleSubmit={handleSubmit} key={item.letter + index}/>)} 
        numColumns={9}/>
      <View style={{marginBottom: 30}}>
        <Button
          onPress={newGame}
          title="New Game"
          color="#708090"
          accessibilityLabel="New Game"
          />
      </View>  
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
