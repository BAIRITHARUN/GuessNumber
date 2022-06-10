import { useState } from "react";
import {
    TextInput, View,
    StyleSheet, TextInputChangeEventData,
    NativeSyntheticEvent, Alert, Text
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButoon";
import Title from "../components/ui/Title";
import Colors from '../constants/colors'
import Card from '../components/ui/Card'
import Instruction from '../components/ui/Instruction'

type StartGameScreenProps = {
    onPickedNumber: (pickedNumber: number) => void
}

export default function StartGameScreen(props: StartGameScreenProps) {

    const [enteredNumber, setEnteredNumber] = useState('')

    function numbetInputHandler(enteredNumber: NativeSyntheticEvent<TextInputChangeEventData>): void {
        setEnteredNumber(enteredNumber.nativeEvent.text);
    }

    function resetInputHandler(): void {
        setEnteredNumber('')
    }

    function confirmInputhandler(): void {
        console.log("presed")
        const choseNumber = parseInt(enteredNumber)
        if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
            Alert.alert('Invalid number!',
                'Number has to be a number between 1 and 99',
                [{
                    text: 'Okay', style: 'destructive',
                    onPress: resetInputHandler
                }])
            return;
        }

        props.onPickedNumber(choseNumber)

    }

    return (
        <View style={styles.rootContainer}>
            <Title>Guess My Number</Title>
            <Card>
                {/* <View> */}
                <Instruction>Enter A Number</Instruction>
                <TextInput style={styles.numberInput}
                    maxLength={2}
                    keyboardType='number-pad'
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={enteredNumber}
                    onChange={numbetInputHandler} />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>
                            Reset
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputhandler}>
                            Confirm
                        </PrimaryButton>
                    </View>
                </View>

            {/* </View> */}
            </Card>

        </View>

    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },
    
    
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    }
})