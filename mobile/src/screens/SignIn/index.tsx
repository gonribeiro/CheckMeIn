import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components';
// import { WebView } from 'react-native-webview';

// import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';

import { useAuth } from '../../hooks/auth';

import { SignInSocialButton } from '../../components/SignInSocialButton'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle /*, signInWithApple*/ } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  }

  // async function handleSignInWithApple() {
  //   try {
  //     setIsLoading(true);
  //     return await signInWithApple();
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert('Não foi possível conectar a conta Apple');
  //     setIsLoading(false);
  //   }
  // }

  return (
    // <WebView
    //   source={{ uri: '' }}
    //   onMessage={(event) => {
    //     alert(event.nativeEvent.data);
    //     console.log(event.nativeEvent.data)
    //   }}
    // />

    <Container>
      <Header>
        <TitleWrapper>
          <Title>
            Organize reuniões {'\n'}
            e confirme os convidados {'\n'}
            com QR Code
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {/* <SignInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          /> */}
        </FooterWrapper>

        {isLoading &&
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        }
      </Footer>
    </Container>
  );
}