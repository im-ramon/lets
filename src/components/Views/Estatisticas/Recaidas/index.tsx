import React, { useContext, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';

import { CardInfo } from '../../../parts/CardInfo';

import { AppContext } from '../../../../contexts/app';

import { styles } from './styles';
import moment from 'moment';

export function Recaidas() {
    const { userRelapseReasons } = useContext(AppContext)

    const DATA = JSON.parse(userRelapseReasons);

    const renderItem = ({ item }: any) => <CardInfo title={`Motivo: ${item.reason}`} description={`- Data do registro: ${moment(item.created_at).format('DD/MM/YYYY [ás] HH:mm')}`} />;

    return (
        <View style={styles.container}>
            {userRelapseReasons == '[]' ?
                (<Text style={styles.text}>Ainda não há nada por aqui!</Text>)
                :
                (<FlatList
                    style={styles.flatList}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => JSON.stringify(item.id)}
                    showsVerticalScrollIndicator={false}
                />)}

        </View>
    );
}