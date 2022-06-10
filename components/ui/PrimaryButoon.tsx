import { FC, ReactNode } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import Colors from '../../constants/colors'

type PrimaryButtonProps = {
    children: string | ReactNode
    onPress : ()=> void
}

const PrimaryButton: FC<PrimaryButtonProps> = (props: PrimaryButtonProps) => {
    function pressHandler() {
        props.onPress()
    }
    return (
        <View style={styles.buttonOutterContainer}>
            <Pressable
                style={({pressed})=> pressed ? [styles.buttonInnercontainer, styles.pressed] : styles.buttonInnercontainer}
                onPress={props.onPress}
                android_ripple={{ color: Colors.primary600 }}>

                <Text style={styles.buttonText}>{props.children}</Text>

            </Pressable>
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonOutterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    buttonInnercontainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',

    },
    pressed: {
        opacity: 0.75,
    }
})

