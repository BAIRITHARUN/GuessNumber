import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, StatusBar, Platform } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient'
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading';

export default function App() {

  const [userNumber, setUserNumber] = useState<number | null>()
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if(!fontsLoaded) {
    return <AppLoading />
  }

  function pickedNumberHandler(pickedNumber: number): void {
    // console.log(pickedNumber)
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }


  function gameOverHandelr(numberOfRounds: number) {
    setGameIsOver(true)
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandelr (): void {
    setUserNumber(null)
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        onGameOver={gameOverHandelr} />)
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandelr}/>
  }

  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}>
      <ImageBackground source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}>

        <SafeAreaView style={styles.safeAreaView}>
          {screen}
        </SafeAreaView>

        {/* <StartGameScreen onPickedNumber={pickedNumberHandler}/> */}
      </ImageBackground>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  backgroundImage: {
    opacity: 0.15
  }
})
