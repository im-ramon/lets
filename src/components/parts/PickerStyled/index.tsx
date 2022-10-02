import React from 'react';
import { View, StyleSheet } from 'react-native';

import { THEME } from '../../../theme';

import { Picker, PickerProps } from '@react-native-picker/picker';

interface PickerStyledProps extends PickerProps {

    children: React.ReactNode;
}

export function PickerStyled({ children, ...rest }: PickerStyledProps) {
    return (
        <View style={styles.pickerContainer}>
            <Picker {...rest} style={styles.picker} dropdownIconColor={THEME.COLORS.PRIMARY}>
                {children}
            </Picker>
        </View >
    );
}


const styles = StyleSheet.create({
    pickerContainer: {
        backgroundColor: THEME.COLORS.BACKGROUND_2,
        borderBottomColor: THEME.COLORS.PRIMARY,
        borderBottomWidth: 1,
        height: 40,
        justifyContent: 'center',
        paddingLeft: 8,
        color: THEME.COLORS.TEXT,
    },
    picker: {
        color: THEME.COLORS.TEXT
    }

})