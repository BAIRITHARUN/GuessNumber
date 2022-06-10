import { FC } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButoon'
import Title from '../components/ui/Title'
import Colors from '../constants/colors'

type GameOverScreenProps = {
    roundsNumber: number,
    userNumber: number,
    onStartNewGame: () => void
}

const GameOverScreen: FC<GameOverScreenProps> = (props: GameOverScreenProps) => {
    
    return (
        <View style={styles.rootContainer}>
            <Title>Game is Over!</Title>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/success.png')}
                />
            </View>

            <Text style={styles.summaryText}>
                Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.
            </Text>

            <PrimaryButton onPress={props.onStartNewGame}>Start New game</PrimaryButton>
        </View>
    )
}

export default GameOverScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        marginVertical: 36
    },
    image: {
        height: '100%',
        width: '100%'

    }, summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center', 
        marginVertical: 24
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500,
    }
})