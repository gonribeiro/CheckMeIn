import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
  type?: 'attention' | 'success'
  icon: 'save'
  | 'x-circle'
  | 'user-check'
  | 'check-circle'
  | 'search'
  | 'corner-down-left'
  | 'share-2'
}

export function Button({
  title,
  onPress,
  type,
  icon,
  ...rest
}: Props) {
  return (
    <Container type={type} onPress={onPress} {...rest}>
      <Icon name={icon} />
      <Title>
        {title}
      </Title>
    </Container>
  );
}