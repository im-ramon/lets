import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, ToastAndroid } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';

import { styles } from '../styles';
import { ButtonMedium } from '../../../parts/ButtonMedium';
import { THEME } from '../../../../theme'

import { AuthContext } from '../../../../../src/contexts/auth';

import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';

export function Scanner() {

    const refInputPalavraPasse: any = useRef()
    const navigation = useNavigation()

    async function copyToClipboard(codigo: string) {
        await Clipboard.setStringAsync(codigo);
        ToastAndroid.show('ID copiado!', ToastAndroid.SHORT);
    };

    const { setUserIdOnClipboard } = useContext(AuthContext)

    // Configurações do Scanner
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    async function openQRCodeScanCamera() {
        await getBarCodeScannerPermissions();
    }

    useEffect(() => {
        openQRCodeScanCamera();
    }, []);

    const handleBarCodeScanned = ({ type, data }: any) => {
        setScanned(true);
        setUserIdOnClipboard(data)
        copyToClipboard(data)
        navigation.goBack()
    };

    if (hasPermission === null) {
        return <Text>Solicitando permissão da câmera</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso à câmera</Text>;
    }
    // --- Fim


    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <View style={styles.titleArea}>
                    <Text style={styles.cameraTitle}>Aponte a câmera para seu QR Code.</Text>
                    <Text style={styles.cameraSubtitle}>O aplicativo fará a leitura automaticamente</Text>
                </View>

                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                {scanned && <Button title={'Escanear novamente'} onPress={() => setScanned(false)} />}
                <View style={styles.cameraButtonArea}>
                    <ButtonMedium color={THEME.COLORS.PRIMARY} value='Voltar' onPress={() => navigation.navigate('SingIn')} />
                </View>
            </View>
        </View>
    );
}