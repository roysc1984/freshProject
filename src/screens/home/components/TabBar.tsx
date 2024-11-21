import React, { FC, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import PressableOpacity from 'components/PressableOpacity';
import { BLACK_COLOR, BLUE_COLOR, WHITE_COLOR } from 'theme/themeStyles';
import { Route } from 'screens/route';
import { PlusIcon } from 'components/icons/PlusIcon';
import { MenuButtons } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ICON_SIZE = 56;
const PLUS_BUTTON_LEFT_POSITION = (SCREEN_WIDTH - ICON_SIZE) / 2;

const TAB_HONE_TEXT = 'Home';
const TAB_PROFILE_TEXT = 'Profile';

const TabBar: FC<BottomTabBarProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<MenuButtons>('Home');

  const onHomeTabPressed = () => {
    if (activeTab === 'Profile') {
      setActiveTab('Home');
      navigation.navigate('Home');
    }
  };

  const onProfileTabPressed = () => {
    if (activeTab === 'Home') {
      setActiveTab('Profile');
      navigation.navigate('Profile');
    }
  };

  const renderHomeMenuButton = () => (
    <PressableOpacity onPress={onHomeTabPressed} style={styles.menuButton}>
      <Text
        style={[styles.text, activeTab === 'Home' && { color: BLUE_COLOR }]}
      >
        {TAB_HONE_TEXT}
      </Text>
    </PressableOpacity>
  );

  const renderProfileMenuButton = () => (
    <PressableOpacity onPress={onProfileTabPressed} style={styles.menuButton}>
      <Text
        style={[styles.text, activeTab === 'Profile' && { color: BLUE_COLOR }]}
      >
        {TAB_PROFILE_TEXT}
      </Text>
    </PressableOpacity>
  );

  const showModal = () => {
    navigation.navigate(Route.ModalExpense);
  };

  const renderPlusMenuButton = () => (
    <PressableOpacity onPress={showModal} style={styles.plusButton}>
      <PlusIcon />
    </PressableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonsBox}>
        {renderHomeMenuButton()}
        {renderProfileMenuButton()}
      </View>
      {renderPlusMenuButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: `${BLACK_COLOR}80`,
    borderTopWidth: 0.5,
    height: 90,
    backgroundColor: WHITE_COLOR,
  },
  buttonsBox: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  menuButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  plusButton: {
    position: 'absolute',
    left: PLUS_BUTTON_LEFT_POSITION,
    top: -ICON_SIZE / 2,
    width: ICON_SIZE,
    height: ICON_SIZE,
    backgroundColor: BLUE_COLOR,
    borderRadius: 56 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 13,
  },
});

export default TabBar;
