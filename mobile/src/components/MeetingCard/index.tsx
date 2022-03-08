import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { MeetingFormatedDTO } from '../../dtos/MeetingFormatedDTO';

import {
  Container,
  Title,
  Description,
  Footer,
  Category,
  Icon,
  InfoStatus,
  Date,
} from './styles';

export function MeetingCard({ meeting }: MeetingFormatedDTO) {
  const type = meeting.deletedAt ? 'deletedAt' : meeting.role === 'ADMIN' ? 'ADMIN' : 'CUSTOMER';
  const navigation = useNavigation();

  function handleMeetingEdit(data: MeetingFormatedDTO) {
    if (meeting.role === 'ADMIN') {
      navigation.navigate('Update', data)
    } else {
      navigation.navigate('Details', data)
    }
  }

  return (
    <Container type={type} onPress={() => handleMeetingEdit({ meeting })}>
      <Title type={type}>
        {meeting.name}
      </Title>
      <Description type={type}>
        {meeting.description}
      </Description>
      <Footer>
        <Category>
          {meeting.role === 'ADMIN'
            ? <>
              <Icon name='edit' type={type} />
              <InfoStatus type={type}>
                Editar
              </InfoStatus>
            </>
            : <>
              <Icon name='eye' />
              <InfoStatus type={type} >
                Visualizar
              </InfoStatus>
            </>
          }
        </Category>
        <Date type={type}>
          {meeting.deletedAt ? 'Cancelado' : `Dia ${meeting.dateFormatted}h`}
        </Date>
      </Footer>
    </Container>
  )
}
