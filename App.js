import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Button, FlatList, Modal} from 'react-native';
import {selectWord, check, checkWin, letters} from './lib'
import { useState, useRef, useEffect } from 'react'
import { words } from './words'
import { renderImage } from './components/RenderImage';

import LetterButton from './components/LetterButton';


export default function App() {

  const [answer, setAnswer] = useState('')
  const [board , setBoard] = useState('')
  const [counter, setCounter] = useState(7)
  
  const reEnableButton = useRef([])

  const handleSubmit = (letter) => {
    
    let newCount
    const update = check(letter.toLowerCase() , answer , board)
    const isWin = checkWin(update, answer.join(''))
    
    if (update === board) {
      newCount = (counter - 1)
    } 
    else
    {newCount = counter}
    
    setCounter(newCount)
    
    setBoard(update)

    if (isWin === true) {
      setCounter(100)
    }

  }

  const newGame = () => {
    setCounter(7)
    const answer2 = selectWord(words).split('')
    setAnswer(answer2)
    const temp = []
    for (let i=0; i < answer2.length ; i++) {
    temp.push('_')
    }
    setBoard(temp.join(''))
    reEnableButton.current.forEach(func => func())
  }

  useEffect(() => {
    newGame()
  }, [])


  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#FCED61', margin: 15, marginTop: 45, borderRadius:25}}>
        {renderImage(counter)}
      </View>
      <Text style={{color:'black', letterSpacing: 3, fontSize: 16}}>PIZZA FUN</Text>
      {board? <Text>Guess the word</Text> : <Text> Press New Game to Start </Text>}
      

      {counter === 0 ? <Text style={{letterSpacing:5, fontSize:32, margin:5}}>{answer.join('')}</Text> : <Text style={{letterSpacing:5, fontSize:32, margin:5}}>{board}</Text>}
     
      <FlatList data={letters}
        renderItem={({item, index}) => (<LetterButton letter={item.letter} handleSubmit={handleSubmit} key={item.letter} reEnableButton={reEnableButton}/>)} 
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
