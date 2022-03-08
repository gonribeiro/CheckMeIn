import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
  type: 'deletedAt' | 'ADMIN' | 'CUSTOMER';
  onPress?: () => void;
}

export const Container = styled.TouchableOpacity<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === 'deletedAt' ? theme.colors.disabled
      : type === 'ADMIN' ? theme.colors.primary
        : theme.colors.shape};
  border-radius: 5px;
  padding: 17px 24px;
  margin-bottom: 16px;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme, type }) => type === 'ADMIN' ? theme.colors.shape : theme.colors.text};
`;

export const Description = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) => type === 'ADMIN' ? theme.colors.shape : theme.colors.text};
  margin-top: 2px;
`;

export const Body = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) => type === 'ADMIN' ? theme.colors.shape : theme.colors.text};
  margin-top: 2px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather) <TypeProps>`
  font-size: ${RFValue(20)}px;
  color: ${({ theme, type }) => type === 'ADMIN' ? theme.colors.shape : theme.colors.text};
`;

export const InfoStatus = styled.Text<TypeProps>`
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) => type === 'ADMIN' ? theme.colors.shape : theme.colors.text};
  margin-left: 17px;
`;

export const Date = styled.Text<TypeProps>`
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) => type === 'ADMIN' ? theme.colors.shape : theme.colors.text};
`;