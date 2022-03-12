import { Button, View } from 'react-native'

export default function LetterButton ({letter, handleSubmit}) {
  return (
    <View style={{margin: 4}} key={letter + Math.random() * 10}>
      <Button
            onPress={() => {handleSubmit(letter.toLowerCase())}}
            title={letter}
            color="#708090"
            accessibilityLabel={letter}
            key={letter + Math.random() * 10}
            />
    </View>
    
  )
}