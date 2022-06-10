import { FC, ReactChildren, ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../../constants/colors'

type ButtonsCardProps = {
    children : ReactNode
}

const ButtonsCard : FC<ButtonsCardProps> = (props: ButtonsCardProps) => {
    return (
        <View style={styles.buttonsContainer}>{props.children}</View>
    )
}

export default ButtonsCard

const styles = StyleSheet.create({
    
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    }
})