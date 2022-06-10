import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, FlatList } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButoon";
import Title from '../components/ui/Title'
import Card from '../components/ui/Card'
import Instruction from '../components/ui/Instruction'
import { Ionicons } from '@expo/vector-icons'
import GuessItemlog from '../components/game/GuessLogItem'

type GameScreenProps = {
    userNumber: number,
    onGameOver: (numberOfRounds: number) => void
}

function generateRandomBetween(min: number, max: number, exclude: number): number {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen: FC<GameScreenProps> = (props: GameScreenProps) => {

    const initialGuess = generateRandomBetween(1, 100, props.userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess])

    useEffect(() => {
        if (currentGuess === props.userNumber) {
            props.onGameOver(guessRounds.length)
        }
    }, [currentGuess, props.userNumber, props.onGameOver])

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    }, [])

    function nextGuessHandler(direction: string): void {
        if ((direction === 'lower' && currentGuess < props.userNumber)
            || (direction === 'higher' && currentGuess > props.userNumber)) {
            Alert.alert("Don't lie!", 'You know that this is wrong...',
                [{ text: 'Sorry!', style: 'cancel' }])
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess - 1
        } else if (direction === 'higher') {
            minBoundary = currentGuess + 1
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber)
        setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds])
    }

    const guessRoundsListLength = guessRounds.length

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <Instruction>
                    Higher or lower?
                </Instruction>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove"
                                size={24} color='white' />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                            <Ionicons name="md-add"
                                size={24}
                                color='white' />
                        </PrimaryButton>
                    </View>
                </View>

            </Card>

            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    // keyExtractor = {item=> item}
                    renderItem={(itemData) =>
                        <GuessItemlog
                            roundNumber={guessRoundsListLength -itemData.index}
                            guess={itemData.item} />
                    }
                    keyExtractor={(item) => item.toString()}
                    showsVerticalScrollIndicator={false}
                />
                {/* {guessRounds.map((guessRound) => {
                    return <Text key={guessRound}>{guessRound}</Text>
                })} */}
            </View>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})