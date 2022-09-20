import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './styles'

export default function ButtonLarge({ value }) {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={[styles.text, styles.textButton]}>{value}</Text>
        </TouchableOpacity>
    )
}