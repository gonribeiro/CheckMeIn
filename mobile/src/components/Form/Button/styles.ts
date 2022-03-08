import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface TypeProps {
  type?: 'attention' | 'success';
}

export const Container = styled(RectButton) <TypeProps>`
  background-color: ${({ theme, type }) => type === 'attention'
    ? theme.colors.attention
    : type === 'success'
      ? theme.colors.success
      : theme.colors.primary
  };

  padding: 3px;
  border-radius: 5px;
  align-items: center;
  width: 75px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(10)}px;

  color: ${({ theme }) => theme.colors.shape};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(24)}px;
`;
