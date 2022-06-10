import { FC, ReactChildren, ReactNode } from 'react'
import { StyleSheet, Text } from 'react-native'
import Colors from '../../constants/colors'

type InstructionProps = {
    children : ReactNode
}

const Instruction : FC<InstructionProps> = (props: InstructionProps) => {
    return (
        <Text style={styles.instructionText}>{props.children}</Text>
    )
}

export default Instruction

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24
    },
})