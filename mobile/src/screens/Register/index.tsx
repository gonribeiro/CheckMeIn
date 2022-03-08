import React, { useCallback, useState } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  Share
} from 'react-native';

import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { MainMenu } from '../../components/Menu';

import { MeetingFormatedDTO } from '../../dtos/MeetingFormatedDTO';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  Text,
  DateTimeTypes,
  DateContainer,
  DateTitle,
  DateButton,
  Menu
} from './styles';

interface FormData {
  name: string;
  description: string;
  invitations: string;
  date: string;
  deletedAt: Date;
}

export function Register() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { meeting } = route.params as MeetingFormatedDTO ?? '';

  const [updateDate, setUpdateDate] = useState(meeting?.date ?? new Date);
  const [userChangeDate, setUserChangeDate] = useState(false);
  const [userChangeTime, setUserChangeTime] = useState(false);
  const [dateTimePickerMode, setDateTimePickerMode] = useState('date');
  const [dateTimePickerShow, setDateTimePickerShow] = useState(false);

  const schema = Yup.object().shape({
    name: Yup
      .string()
      .required('Título é obrigatório')
      .default(meeting?.name),
    description: Yup
      .string()
      .required('Descrição é obrigatório')
      .default(meeting?.description),
    invitations: Yup
      .number()
      .typeError('Informe um valor númerico')
      .positive('O valor não pode ser negativo')
      .required('Convidados é obrigatório')
      .min(1, 'Reunião deve ter no mínimo 1 convidado')
      .default(meeting?.invitations)
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useFocusEffect(useCallback(() => {
    reset();

    if (route.name === 'Update') {
      setUserChangeDate(true)
      setUserChangeTime(true)
    } else {
      setUserChangeDate(false)
      setUserChangeTime(false)
    }
  }, []));

  const onChange = (event: any, selectedDate: any) => {
    setDateTimePickerShow(false)

    setUpdateDate(selectedDate);
  };

  function showDatePicker(type: String) {
    if (type === 'date') {
      setDateTimePickerMode('date')
      setUserChangeDate(true)
    } else {
      setDateTimePickerMode('time')
      setUserChangeTime(true)
    }

    setDateTimePickerShow(true);
  };

  async function handleRegister(form: FormData) {
    if (!userChangeDate || !userChangeTime)
      return Alert.alert('Selecione uma data e hora para a reunião');

    setIsLoading(true);

    const token = user.token;

    try {
      if (route.name === 'Update') {
        await api.put('meeting/update/' + meeting.id, {
          description: form.description,
          invitations: form.invitations,
          date: updateDate
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Alert.alert('Reunião atualizada com sucesso!');
      } else {
        await api.post('meeting/create/', {
          name: form.name,
          description: form.description,
          invitations: form.invitations,
          date: updateDate
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Alert.alert('Reunião criada com sucesso!');
      }

      navigation.navigate('Meetings');

      reset();
    } catch (error: any) {
      console.log(error.response.data.message);
      Alert.alert(error.response.data.message);
    }

    setIsLoading(false);
  }

  async function handleShareMeeting() {
    await Share.share({
      message: `Convite para reunião: ${meeting.name} | Use este ID para buscar e aceitar o convite: ${meeting.id}`,
    });
  }

  async function handleCancelMeeting() {
    setIsLoading(true);

    const token = user.token;

    const cancel = meeting.deletedAt ? false : true;

    try {
      await api.put('meeting/deleteRestore/' + meeting.id, {
        cancel
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (meeting.deletedAt) {
        Alert.alert('Reunião reativada com sucesso!');
      } else {
        Alert.alert('Reunião cancelada com sucesso!');
      }

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
          <Title>
            {route.name === 'Register' ? 'Cadastrar' : 'Atualizar'} Reunião
          </Title>
        </Header>

        <Form>
          <Fields>
            {route.name === 'Update'
              ? <>
                <Text>
                  {meeting.name}
                  {'\n'}
                  Convites aceitos: {meeting.invitationsAccepted}
                </Text>
              </>
              : <>
                <Text>
                  *Título não poderá ser alterado depois de cadastrado
                </Text>
                <InputForm
                  name="name"
                  control={control}
                  placeholder="Título"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  error={errors.name && errors.name.message}
                />
              </>
            }

            <InputForm
              name="description"
              control={control}
              placeholder="Descrição"
              autoCapitalize="sentences"
              autoCorrect={false}
              defaultValue={meeting?.description}
              error={errors.description && errors.description.message}
            />

            <InputForm
              name="invitations"
              control={control}
              placeholder="Número de Convidados"
              keyboardType="numeric"
              defaultValue={meeting && String(meeting.invitations)}
              error={errors.invitations && errors.invitations.message}
            />

            {dateTimePickerShow && (
              <DateTimePicker
                value={new Date(updateDate)}
                mode={dateTimePickerMode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

            <DateTimeTypes>
              <DateContainer>
                <DateButton onPress={() => showDatePicker('date')} >
                  <DateTitle>
                    {userChangeDate
                      ? Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      }).format(new Date(updateDate))
                      : 'Dia'
                    }
                  </DateTitle>
                </DateButton>
              </DateContainer>
              <DateContainer>
                <DateButton onPress={() => showDatePicker('time')} >
                  <DateTitle>
                    {userChangeTime
                      ? Intl.DateTimeFormat('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(new Date(updateDate))
                      : 'Hora'
                    }
                  </DateTitle>
                </DateButton>
              </DateContainer>
            </DateTimeTypes>
          </Fields>
          {isLoading &&
            <ActivityIndicator
              color={theme.colors.text_dark}
              style={{ marginTop: 18 }}
            />
          }
          <Menu
            justifyContent={route.name === 'Update' ? 'space-between' : 'center'}
          >
            {!isLoading &&
              <>
                <Button
                  title="Salvar"
                  icon="save"
                  onPress={handleSubmit(handleRegister)}
                />
                {route.name === 'Update' &&
                  <>
                    <Button
                      title="Compart."
                      icon="share-2"
                      onPress={handleSubmit(handleShareMeeting)}
                    />
                    <Button
                      title="Convites"
                      icon="user-check"
                      onPress={() => navigation.navigate('Checkin', { meeting })}
                    />
                    <Button
                      icon={meeting.deletedAt
                        ? 'check-circle'
                        : 'x-circle'
                      }
                      title={meeting.deletedAt
                        ? 'Reativar'
                        : 'Cancelar'
                      }
                      type={!meeting.deletedAt ? 'attention' : 'success'}
                      onPress={handleSubmit(handleCancelMeeting)}
                    />
                  </>
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
