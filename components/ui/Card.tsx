import { FC, ReactChildren, ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../../constants/colors'

type CardProps = {
    children : ReactNode
}

const Card : FC<CardProps> = (props: CardProps) => {
    return (
        <View style={styles.cardContainer}>{props.children}</View>
    )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
})