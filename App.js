import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';
import {selectWord, check, checkWin} from './lib'
import {useState} from 'react'

const words = [["t", "o", "m", "o", "r", "r", "o", "w"],
["y", "e", "s", "t", "e", "r", "d", "a", "y"],
["o", "r", "a", "n", "g", "e"],
["h", "i", "j", "i", "n", "k", "s"],
["s", "w", "e", "a", "t", "e", "r"],
["s", "t", "r", "a", "w", "b", "e", "r", "r", "y"],
["a", "n", "g", "e", "l"],
["s", "u", "c", "c", "e", "s", "s"],
["l", "i", "v", "i", "d"],
["m", "o", "n", "s", "t", "e", "r"],
["z" , "o" , "o", "l", "o", "g","y"],
["b", "o", "i", "s", "t", "e", "r", "o", "u", "s"]]

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
      default:
        return <Image source={require('./images/7.png')} style={{height: 200, width: 200, margin:25}}/>
    }
  }

  const answer = selectWord(words)

  let temp = []
  for (let i=0; i < answer.length ; i++) {
    temp.push('_')
  }
  
  const start = temp.join('')
  

  const [board , setBoard] = useState(start)
  const [pastGuess, setPastGuess] = useState('')
  const [box, setBox] = useState('')
  const [pizza, eatPizza] = useState('./images/7.png')
  const [counter, setCounter] = useState(7)
  const [text, setText] = useState('')

  const handleSubmit = () => {
    
    let newCount
    const guess = text
    const update = check(guess , answer , board)
    const isWin = checkWin(update, answer.join(''))
    
    if (update === board) {
      newCount = (counter - 1)
    } 
    else
    {newCount = counter}
    
    setCounter(newCount)
    
    setBoard(update)
    setPastGuess(pastGuess + " " + guess)
    setBox('')
    if (isWin === true) {
      eatPizza('./images/win.png')
    }
    else {
      eatPizza('./images/' + newCount.toString(10) + ".png")
    }
    
    
  }

  const handleTyping = (evt) => {
    setBox(evt.target.value)
  }

  return (
    <View style={styles.container}>
      <Text>Pizza Fun for Mobile</Text>
      <TextInput
        style={{height: 40}}
        placeholder="Type your guess here!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        maxLength={1}
      />
      {renderImage(counter)}
      <Button
        onPress={handleSubmit}
        title="Submit"
        color="#841584"
        accessibilityLabel="submit guess"
        />

      <Text style={{letterSpacing:5, fontSize:32, margin:10}}>{board}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
