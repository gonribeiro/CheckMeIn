import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Menu = styled.View`
  width: 100%;
  height: ${RFPercentage(8)}px;
  background-color: white;
  border: 1px;
  border-color: lightgray;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
  padding: 0 24px;
`;

export const Text = styled.Text`
  text-align: center;
  padding-bottom: 12px
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
`;