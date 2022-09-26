import React, { useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';

import { Titulo } from '../../parts/Titulo';
import { ButtonMedium } from '../../parts/ButtonMedium';
import { ButtonTrasnparent } from '../../parts/ButtonTrasnparent';

import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../../theme';

import niveis from '../../../utils/ranking';

export function Pontuacao() {

    const [nivelNow, setNivelNow] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30>(1)

    return (
        <View style={styles.container}>
            <Titulo
                title='Pontuação'
                subtitle='Vamos tornar sua evolução mais divertida. Confira abaixo sua patente dentro no nosso ranking ;)'
            >
                <Ionicons name="medal-outline" size={24} color={THEME.COLORS.PRIMARY} />
            </Titulo>

            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View
                        style={styles.patenteArea}
                    >
                        <Image
                            source={niveis[`nivel_${nivelNow}`].img}
                            style={styles.patenteImage}
                        />
                        <Text style={styles.patentSlug}>
                            {niveis[`nivel_${nivelNow}`].slug}
                        </Text>

                        <Text style={styles.patenteDescription}>
                            {niveis[`nivel_${nivelNow}`].descrition}
                        </Text>
                    </View>
                    <View style={styles.pointsArea}>
                        <Text style={[styles.text, { fontSize: THEME.FONT_SIZE.LG }]}><Text style={styles.bold}>00</Text> ponto(s)</Text>
                    </View>

                    <ButtonTrasnparent value='Compartilhar'>
                        <Ionicons name="ios-share-social-outline" size={24} color={THEME.COLORS.TEXT} />
                    </ButtonTrasnparent>
                </View>

            </ScrollView>
        </View>
    );
}