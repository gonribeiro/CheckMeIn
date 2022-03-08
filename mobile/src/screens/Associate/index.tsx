import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { api } from '../../services/api';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { MainMenu } from '../../components/Menu';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  Text,
  Menu,
} from './styles';

interface FormData {
  id: string;
}

const schema = Yup.object().shape({
  id: Yup
    .string()
    .required('ID é obrigatório')
    .length(24)
});

export interface MeetingProps {
  id: string;
  name: string;
  description: string;
  date: Date;
  _count: {
    users: number;
  }
}

export function Associate() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const [meeting, setMeeting] = useState<MeetingProps>();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  async function handleFindMeeting(form: FormData) {
    setIsLoading(true);

    const token = process.env.user_token;

    try {
      const response = await api.get('meeting/get/' + form.id, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMeeting(response.data)
    } catch (error: any) {
      console.log(error.response.data.message);
      Alert.alert(error.response.data.message);
    }

    setIsLoading(false);
  }

  async function handleAssociateMeeting() {
    setIsLoading(true);

    const token = process.env.user_token;

    try {
      await api.post('meeting/associate/' + meeting!.id, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Obrigado por confirmar a sua presença!');
      navigation.navigate('Meetings');
    } catch (error: any) {
      console.log(error.response.data.message);
      Alert.alert(error.response.data.message);
    }

    setIsLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Participar de Reunião</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="id"
              control={control}
              placeholder="Reunião ID"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.id && errors.id.message}
            />
          </Fields>

          {meeting &&
            <>
              <Form>
                <Fields>
                  <Text>
                    {meeting.name}
                  </Text>
                  <Text>
                    {meeting.description}
                  </Text>
                  <Text>
                    Dia e Hora: {'\n' + Intl.DateTimeFormat('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    }).format(new Date(meeting.date))}
                  </Text>
                </Fields>
              </Form>
            </>
          }

          <Menu>
            {isLoading
              ? <ActivityIndicator
                color={theme.colors.text_dark}
                style={{ marginTop: 18 }}
              />
              : <>
                {!meeting
                  ? <Button
                    title="Buscar"
                    icon='search'
                    onPress={handleSubmit(handleFindMeeting)}
                  />
                  : <Button
                    title="Participar"
                    icon='check-circle'
                    type='success'
                    onPress={handleSubmit(handleAssociateMeeting)}
                  />
                }
              </>
            }
          </Menu>
        </Form>
        <MainMenu />
      </Container>
    </TouchableWithoutFeedback>
  );
}