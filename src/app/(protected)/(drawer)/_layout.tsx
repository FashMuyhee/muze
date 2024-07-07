import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Pressable } from 'react-native';
import React from 'react';
import { COLORS } from '@constants';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { Link, useNavigation, useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { SW } from '@constants/utilts';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ContextMenu from 'zeego/context-menu';

type Props = {};

export const CustomDrawerContent = (props: any) => {
  const { bottom, top } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>
        <View style={styles.searchSection}>
          <Ionicons style={styles.searchIcon} name="search" size={20} color={COLORS.greyLight} />
          <TextInput style={styles.input} placeholder="Search" underlineColorAndroid="transparent" />
        </View>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#fff', paddingTop: 0 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View
        style={{
          padding: 16,
          paddingBottom: 10 + bottom,
          backgroundColor: COLORS.light,
        }}>
        <Pressable style={styles.footer}>
          <Image source={{ uri: 'https://galaxies.dev/img/meerkat_2.jpg' }} style={styles.avatar} />
          <Text style={styles.userName}>Mika Meerkat</Text>
          <Ionicons name="ellipsis-horizontal" size={24} color={COLORS.greyLight} />
        </Pressable>
      </View>
    </View>
  );
};

const DrawerLayout = (props: Props) => {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)} style={{ marginLeft: 16 }}>
            <FontAwesome6 name="grip-lines" size={20} color={COLORS.grey} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: COLORS.light,
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: COLORS.selected,
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#000',
        overlayColor: 'rgba(0, 0, 0, 0.2)',
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { marginLeft: -20 },
        drawerStyle: { width: SW * 0.86 },
      }}>
      <Drawer.Screen
        name="chat"
        getId={() => Math.random().toString()}
        options={{
          title: 'ChatGPT',
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: COLORS.light }]}>
              <Image source={require('@assets/images/logo.png')} style={styles.btnImage} />
            </View>
          ),
          headerRight: () => (
            <Link href={'/(protected)/(drawer)/chat'} push asChild>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={24} color={COLORS.grey} style={{ marginRight: 16 }} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="[id]"
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          headerRight: () => (
            <Link href={'/(protected)/(drawer)/chat'} push asChild>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={24} color={COLORS.grey} style={{ marginRight: 16 }} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      {/* <Drawer.Screen
        name="dalle"
        options={{
          title: 'Dall·E',
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: '#000' }]}>
              <Image source={require('@assets/images/dalle.png')} style={styles.dallEImage} />
            </View>
          ),
        }}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
            if (!user.dalle) {
              router.navigate('/(auth)/(modal)/purchase');
            } else {
              router.navigate('/(auth)/dalle');
            }
          },
        }}
      /> */}

      <Drawer.Screen
        name="explore"
        options={{
          title: 'Explore GPTs',
          drawerIcon: () => (
            <View
              style={[
                styles.item,
                {
                  backgroundColor: '#fff',
                  width: 28,
                  height: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Ionicons name="apps-outline" size={18} color="#000" />
            </View>
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;

const styles = StyleSheet.create({
  searchSection: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.input,
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: 'center',
    color: '#424242',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roundImage: {
    width: 30,
    height: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  item: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  dallEImage: {
    width: 28,
    height: 28,
    resizeMode: 'cover',
  },
});
