import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Associate } from '../screens/Associate';
import { Details } from '../screens/Details';
import { Checkin } from '../screens/Checkin';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator headerMode="none">
      <Screen
        name="Meetings"
        component={Dashboard}
      />

      <Screen
        name="Register"
        component={Register}
      />

      <Screen
        name="Associate"
        component={Associate}
      />

      <Screen
        name="Update"
        component={Register}
      />

      <Screen
        name="Details"
        component={Details}
      />

      <Screen
        name="Checkin"
        component={Checkin}
      />
    </Navigator>
  );
}