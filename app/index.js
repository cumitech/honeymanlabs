import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { registerRootComponent } from 'expo'

enableScreens(true)
import App from './App'
import './global.css'

registerRootComponent(App)
