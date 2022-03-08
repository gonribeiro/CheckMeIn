import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

import { useTheme } from 'styled-components';
import { MeetingCard } from '../../components/MeetingCard';
import { MainMenu } from '../../components/Menu';

import { MeetingFormatedDTO } from '../../dtos/MeetingFormatedDTO';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  Meetings,
  MeetingList,
  LogoutButton,
  LoadContainer,
  Text
} from './styles';

export interface MeetingProps {
  id: string;
  name: string;
  description: string;
  invitations: number;
  date: Date;
  dateFormatted: string;
  deletedAt: Date;
  users: Array<{
    role: string;
    passport: string;
  }>
  _count: {
    users: number;
  }
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [meetings, setMeetings] = useState<MeetingFormatedDTO[]>([]);
  const theme = useTheme();
  const { signOut, user } = useAuth();

  function loadMeetings() {
    async function fetchMeetings() {
      const token = user.token;

      try {
        const response = await api.get('meeting/allUserMeetings', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const meetingsFormatted = response.data.map((data: MeetingProps) => {
          const dateFormatted = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }).format(new Date(data.date));

          return {
            meeting: {
              id: data.id,
              name: data.name,
              description: data.description,
              invitations: data.invitations,
              invitationsAccepted: data._count.users,
              date: data.date,
              dateFormatted,
              deletedAt: data.deletedAt,
              role: data.users[0].role,
              passport: data.users[0].passport
            }
          }
        })

        setMeetings(meetingsFormatted)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        Alert.alert("Não foi possível carregar as reuniões");
      }
    }

    fetchMeetings();
  }

  useEffect(() => {
    loadMeetings();
  }, []);

  useFocusEffect(useCallback(() => {
    loadMeetings();
  }, []));

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{ uri: user.photo }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={signOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      {isLoading ?
        <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadContainer> :
        <>
          {meetings.length > 0
            ? <Meetings>
              <MeetingList
                data={meetings}
                keyExtractor={item => item.meeting.id}
                renderItem={({ item }) =>
                  <MeetingCard meeting={item.meeting} />
                }
              />
            </Meetings>
            : <Text>Crie uma reunião ou aceite um convite para começar</Text>
          }
        </>
      }
      <MainMenu />
    </Container>
  )
}
