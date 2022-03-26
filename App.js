import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Button, FlatList, Modal} from 'react-native';
import {selectWord, check, checkWin, letters} from './lib'
import { useState, useRef, useEffect } from 'react'
import { words } from './words'
import AsyncStorage from '@react-native-async-storage/async-storage';

import LetterButton from './components/LetterButton';
import { renderImage } from './components/RenderImage';


export default function App() {
  
  const defaultStats = {
    wins : 0,
    losses : 0,
    currentStreak: 0,
    bestStreak: 0,
  }

  const [answer, setAnswer] = useState('')
  const [board , setBoard] = useState('')
  const [counter, setCounter] = useState(7)
  const [stats, setStats] = useState(defaultStats)
  const [isLost, setIsLost] = useState(false)
  
  const reEnableButton = useRef([])
  const disableAllButtons = useRef([])

  const disableCall = () => {
    disableAllButtons.current.forEach(func => func())
  }

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
      disableCall()
    }

    if (newCount === 0) {
      disableCall()
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
    setIsLost(false)
  }

  useEffect(() => {
    newGame()
    getData()
  }, [])

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('stats', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('stats')
      return jsonValue != null ? setStats(JSON.parse(jsonValue)) : null;
    } catch(e) {
      // error reading value
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.imageBackGround}>
        {renderImage(counter)}
      </View>
      <Text style={styles.title}>PIZZA FUN</Text>
      {board? <Text>Guess the word</Text> : <Text> Press New Game to Start </Text>}
      
      {counter === 0 ? <Text style={styles.board}>{answer.join('')}</Text> : <Text style={styles.board}>{board}</Text>}
      <FlatList data={letters}
        renderItem={({item, index}) => (
        <LetterButton 
        letter={item.letter} 
        handleSubmit={handleSubmit} 
        key={item.letter} 
        reEnableButton={reEnableButton}
        disableAllButtons={disableAllButtons}/>)} 
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
  imageBackGround: {
    backgroundColor: '#FCED61', 
    margin: 15, 
    marginTop: 45, 
    borderRadius:25
  },
  title: {
    color:'black', 
    letterSpacing: 3, 
    fontSize: 16
  },
  board: {
    letterSpacing:5, 
    fontSize:32, 
    margin:5
  },
});
