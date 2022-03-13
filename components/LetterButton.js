import { Button, View } from 'react-native'
import { useEffect, useState} from 'react'

export default function LetterButton ({letter, handleSubmit, reEnableButton}) {

  const [isDisabled, setIsDisabled] = useState(false)

  useEffect( () => {
    reEnableButton.current.push(handleNewGame)
    
  }, [])

  const handleNewGame = () => {
    setIsDisabled(false)
  }

  const handlePress = () => {
    handleSubmit(letter.toLowerCase())
    setIsDisabled(true)
  }

  return (
    <View style={{margin: 4}} key={letter + Math.random() * 10}>
      <Button
            onPress={handlePress}
            title={letter}
            color="#708090"
            accessibilityLabel={letter}
            key={letter + Math.random() * 10}
            disabled={isDisabled}
            />
    </View>
    
  )
}