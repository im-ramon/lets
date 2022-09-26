import React, { useRef } from 'react';
import { View, Text } from 'react-native';

import ViewShot, { captureRef } from 'react-native-view-shot';

import { styles } from './styles';
import * as Sharing from 'expo-sharing';


import { ButtonMedium } from '../../parts/ButtonMedium';

export function Utilidades() {
    const ref = useRef<any>(null)

    function handleScreenshot() {
        captureRef(ref)
            .then(uri => {
                console.log('Image saved to', uri);
                Sharing.shareAsync(uri);

            }, error => console.error('Oops, snapshot failed', error)
            )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Utilidades</Text>
            <ButtonMedium value='Screenshot' onPress={() => handleScreenshot()} />

            <ViewShot ref={ref} options={{ format: "jpg", quality: 0.9 }}>
                <Text>...Something to rasterize...</Text>
            </ViewShot>
        </View>
    );
}


function ViewTeste() {
    return
}