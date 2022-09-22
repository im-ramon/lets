import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './styles'

interface ButtonProps {
    value: string
}

export function ButtonLarge(props: ButtonProps) {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={[styles.text, styles.textButton]}>{props.value}</Text>
        </TouchableOpacity>
    )
}