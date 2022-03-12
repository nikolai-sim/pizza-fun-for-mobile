import { Button, View } from 'react-native'

export default function LetterButton ({letter, handleSubmit}) {
  return (
    <View style={{margin: 4}}>
      <Button
            onPress={() => {handleSubmit(letter.toLowerCase())}}
            title={letter}
            color="#841584"
            accessibilityLabel={letter}
            />
    </View>
    
  )
}