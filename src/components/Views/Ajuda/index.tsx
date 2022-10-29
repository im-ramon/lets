import React, { useRef } from 'react';
import { View, Text, Linking, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

import { Ionicons, FontAwesome5 } from '@expo/vector-icons'

import { Titulo } from '../../parts/Titulo';
import { PageScrollViewContainer } from '../../parts/_SytyledComponents';
import { THEME } from '../../../theme';

import { CardInfo } from '../../parts/CardInfo';

export function Ajuda() {
    const ref = useRef<any>(null)

    return (
        <PageScrollViewContainer>
            <Titulo title='Ajuda' subtitle='Precisando de ajuda para se manter no foco?! Então os itens abaixo são para você.'>
                <Ionicons name="help-buoy-outline" size={24} color={THEME.COLORS.PRIMARY} />
            </Titulo>

            <View style={{ paddingTop: 16 }}>
                <CardInfo title='Instagram' description='Conheça meu trabalho no Instagram' onPress={() => Linking.openURL('https://www.instagram.com/especialistax')}>
                    <Ionicons name="logo-instagram" size={24} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <CardInfo title='Site oficial' description='Acesse meu site para mais conteúdos' onPress={() => Linking.openURL('https://www.especialistax.com/')}>
                    <Ionicons name="globe-outline" size={24} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <CardInfo title='Meu livro' description='“Manual para uma vida DESPORNIFICADA”' onPress={() => Linking.openURL('https://www.especialistax.com/product-page/manual-para-uma-vida-despornificada')}>
                    <Ionicons name="book-outline" size={24} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <CardInfo title='Mentoria' description='Elimine a pornografia de forma definitiva' onPress={() => Linking.openURL('https://especialista-x.com.br/cursodes')}>
                    <Ionicons name="people-outline" size={24} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <CardInfo title='Blog' description='Mais conteúdo para você' onPress={() => Linking.openURL('https://www.especialistax.com/blog')}>
                    <Ionicons name="reader-outline" size={24} color={THEME.COLORS.TEXT} />
                </CardInfo>

                <View style={styles.socialIconsArea}>
                    <IconSocial onPress={() => Linking.openURL('https://www.youtube.com/c/EspecialistaX')}>
                        <FontAwesome5 name="youtube" size={THEME.FONT_SIZE.XL} />
                    </IconSocial>

                    <IconSocial onPress={() => Linking.openURL('https://tiktok.com/@especialistax_')}>
                        <FontAwesome5 name="tiktok" size={THEME.FONT_SIZE.XL} />
                    </IconSocial>

                    <IconSocial onPress={() => Linking.openURL('https://instagram.com/especialistax')}>
                        <FontAwesome5 name="instagram" size={THEME.FONT_SIZE.XL} />
                    </IconSocial>

                    <IconSocial onPress={() => Linking.openURL('https://www.facebook.com/pageespecialistax')}>
                        <FontAwesome5 name="facebook-f" size={THEME.FONT_SIZE.XL} />
                    </IconSocial>

                    <IconSocial onPress={() => Linking.openURL('https://t.me/joinchat/9W0QHWMwmaBlMjgx')}>
                        <FontAwesome5 name="telegram-plane" size={THEME.FONT_SIZE.XL} />
                    </IconSocial>
                </View>
            </View>
        </PageScrollViewContainer>
    );
}


interface IconSocialProps extends TouchableOpacityProps {
    children: React.ReactNode
}

function IconSocial({ children, ...rest }: IconSocialProps) {
    return (
        <TouchableOpacity {...rest}>
            <Text style={styles.socialIconsIcon}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}