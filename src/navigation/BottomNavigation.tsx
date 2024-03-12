import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Tabs/Profile';
import Dashboard from '../screens/Tabs/Dashboard';
import Tasks from '../screens/Tabs/Tasks';
import Chat from '../screens/Tabs/Chat';
import Checklist from '../screens/Tabs/Checklist';
import DashboardIcon from '../assets/graph.svg';
import TasksIcon from '../assets/external-drive.svg';
import ProfileIcon from '../assets/profile.svg';
import ChatIcon from '../assets/messages.svg';
import ChecklistIcon from '../assets/tick-circle.svg';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => <DashboardIcon />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => <TasksIcon />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => <ProfileIcon />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => <ChatIcon />,
        }}
      />
      <Tab.Screen
        name="Checklist"
        component={Checklist}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => <ChecklistIcon />,
        }}
      />
    </Tab.Navigator>
  );
}
