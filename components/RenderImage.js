import { Image } from 'react-native'

export const renderImage = (count) => {
  switch(count) {
    case 7 :
      return <Image source={require(`../images/7.png`)} style={{height: 200, width: 200, margin:25}}/>
    case 6 :
      return <Image source={require('../images/6.png')} style={{height: 200, width: 200, margin:25}}/>
    case 5 :
      return <Image source={require('../images/5.png')} style={{height: 200, width: 200, margin:25}}/>
    case 4 :
      return <Image source={require('../images/4.png')} style={{height: 200, width: 200, margin:25}}/>
    case 3 :
      return <Image source={require('../images/3.png')} style={{height: 200, width: 200, margin:25}}/>
    case 2 :
      return <Image source={require('../images/2.png')} style={{height: 200, width: 200, margin:25}}/>
    case 1 :
      return <Image source={require('../images/1.png')} style={{height: 200, width: 200, margin:25}}/>
    case 0 :
      return <Image source={require('../images/0.png')} style={{height: 200, width: 200, margin:25}}/>
    case 100 :
      return <Image source={require('../images/win.png')} style={{height: 200, width: 200, margin:25}}/>
    default:
      return <Image source={require('../images/7.png')} style={{height: 200, width: 200, margin:25}}/>
  }
}