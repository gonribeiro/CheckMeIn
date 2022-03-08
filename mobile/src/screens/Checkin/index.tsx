import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';

import { api } from '../../services/api';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useRoute } from '@react-navigation/native';

import { MeetingFormatedDTO } from '../../dtos/MeetingFormatedDTO';

import { Button } from '../../components/Form/Button';

export function Checkin() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  const originalText = 'Digitalize um convite QR Code \n para confirmar o participante';
  const [text, setText] = useState(originalText)

  const route = useRoute();
  const { meeting } = route.params as MeetingFormatedDTO;

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    setText(data)
  };

  async function handleCheckInvite(data: any) {
    const token = process.env.user_token;

    try {
      const response = await api.post('user/check/', {
        "meetingId": meeting.id,
        "passport": data
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data)
      Alert.alert('Verificado com sucesso! Acesso concedido!');
    } catch (error: any) {
      console.log(error.response.data.message);
      Alert.alert('Acesso negado! ' + error.response.data.message);
      setScanned(false)
      setText(originalText)
    }
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title="Allow Camera"
          icon="check-circle"
          onPress={() => askForCameraPermission()}
        />
      </View>)
  }

  return (
    <View style={styles.container}>
      {!scanned &&
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
      }
      <Text style={styles.maintext}>{text}</Text>

      {scanned
        ?
        <Button
          title="Confirmar"
          icon="user-check"
          onPress={() => handleCheckInvite(text)}
        />
        :
        <Button
          title="Voltar"
          icon="corner-down-left"
          onPress={() => navigation.goBack()}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});