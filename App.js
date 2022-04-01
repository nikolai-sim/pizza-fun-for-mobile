import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, FlatList, Modal} from 'react-native';
import {selectWord, check, checkWin, letters, updateStats, endStatements} from './lib'
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
  const [modalVisible, setModalVisible] = useState(true)
  const [result, setResult] = useState('win')
  const [finalCount, setFinalCount] = useState(null)
  
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
      setResult('win')
      setFinalCount(counter)
      setCounter(100)
      disableCall()
      setStats(updateStats(stats, 'win'))
      storeData(stats)
      setModalVisible(true)
    }

    if (newCount === 0) {
      setFinalCount(0)
      setResult('lose')
      disableCall()
      setStats(updateStats(stats, 'lose'))
      storeData(stats)
      setModalVisible(true)
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
    setModalVisible(false)
    console.log(stats)
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
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('stats')
      return jsonValue != null ? setStats(JSON.parse(jsonValue)) : null;
    } catch(e) {
      console.log(e)
    }
  }


  return (
    <View style={styles.container}>
       <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.imageBackGround}>
                {result === 'win' ? 
                <Image source={require('./images/win.png')} style={{height: 200, width: 200, margin:25}}/> :
                <Image source={require('./images/0.png')} style={{height: 200, width: 200, margin:25}}/>}
              </View>
              <Text style={styles.title}>{endStatements(finalCount)}</Text>
              <Text style={styles.board}>{answer}</Text>
              <Text style={styles.modalText}>Wins: {stats.wins}</Text>
              <Text style={styles.modalText}>Loses: {stats.losses}</Text>
              <Text style={styles.modalText}>Current Streak: {stats.currentStreak}</Text>
              <Text style={styles.modalText}>Best Streak: {stats.bestStreak}</Text>
              <Button
              onPress={() => {newGame()}}
              title="New Game"
              color="#708090"
              accessibilityLabel="New Game"
              />
            </View>
          </View>
        </Modal>
        </View>
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
    fontSize: 16,
  },
  board: {
    letterSpacing:5, 
    fontSize:32, 
    margin:5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: '#708090'
  },
  modalView: {
    minWidth: 370,
    minHeight: 730,
    margin: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
