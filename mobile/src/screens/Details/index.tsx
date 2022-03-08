import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';

import { MainMenu } from '../../components/Menu';

import { MeetingFormatedDTO } from '../../dtos/MeetingFormatedDTO';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  Text
} from './styles';

export function Details() {
  const route = useRoute();
  const { meeting } = route.params as MeetingFormatedDTO;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>
            Detalhes da Reunião
          </Title>
        </Header>

        <Form>
          <Fields>
            <Text>
              {meeting.name}
            </Text>
            <Text>
              {meeting.description}
            </Text>
            <Text>
              Convites aceitos: {meeting.invitationsAccepted} de {meeting?.invitations}
            </Text>
            <Text>
              Dia e Hora: {meeting.dateFormatted}
            </Text>
            <Text>
              Convite: {'\n'}
              <QRCode
                value={meeting.passport}
              />
            </Text>
          </Fields>
        </Form>

        <MainMenu />
      </Container>
    </TouchableWithoutFeedback>
  );
}