import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './styles'

interface ButtonProps extends TouchableOpacityProps {
    value: string
}

export function ButtonLarge({ value, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Text style={[styles.text, styles.textButton]}>{value}</Text>
        </TouchableOpacity>
    )
}