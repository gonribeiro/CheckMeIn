import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Menu, Text } from './styles';

/**
 * @todo Não deveria ser necessário inserir o menu em cada tela
 */
export function MainMenu() {
    const navigation = useNavigation();

    return (
        <Menu>
            <Text onPress={() => navigation.navigate('Meetings')}>Reuniões</ Text>
            <Text onPress={() => navigation.navigate('Register')}>Cadastrar</ Text>
            <Text onPress={() => navigation.navigate('Associate')}>Participar</ Text>
        </Menu>
    );
}