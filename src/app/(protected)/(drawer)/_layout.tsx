import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '@utils';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { Link, useNavigation, useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { SW } from '@utils/helpers';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, useDrawerStatus } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CenterView, DropdownMenu, StackView } from '@components';
import { Chat, deleteChat, getChats } from '@utils/Database';
import { useSQLiteContext } from 'expo-sqlite';
import { chatHistoryMenus } from '@components/chat/ChatBubble/dropmenus';

type Props = {};

export const CustomDrawerContent = (props: any) => {
  const { bottom, top } = useSafeAreaInsets();
  const router = useRouter();
  const isOpened = useDrawerStatus() == 'open';
  const db = useSQLiteContext();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoadingChats, setIsLoadingChats] = useState(true);

  const fetchChats = async () => {
    try {
      const chats = await getChats(db);
      setChats(chats);
      setIsLoadingChats(false);
    } catch (error) {
      setIsLoadingChats(false);
    }
  };

  const onDeleteChat = async (id: number) => {
    await deleteChat(db, id);
  };

  const renderChatHistory = () => {
    if (isLoadingChats) {
      return (
        <StackView style={{ columnGap: 10, paddingHorizontal: 20, marginTop: 30 }}>
          <ActivityIndicator size="small" color={COLORS.black} />
          <Text>Loading History</Text>
        </StackView>
      );
    }

    return (
      chats &&
      chats.map((chat) => (
        // <DropdownMenu
        //   triggerBy="longPress"
        //   key={chat.id}
        //   menuItems={chatHistoryMenus(
        //     () => console.log('editign'),
        //     () => onDeleteChat(parseInt(chat.id)),
        //   )}
        //   trigger={<DrawerItem label={chat.title} onPress={() => router.push(`/(chat)/${chat.id}`)} inactiveTintColor="#000" />}
        // />

        <DrawerItem key={chat.id} label={chat.title} onPress={() => router.push(`/(chat)/${chat.id}`)} inactiveTintColor="#000" />
      ))
    );
  };

  React.useEffect(() => {
    if (isOpened) {
      fetchChats();
    }
  }, [isOpened]);

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
        {renderChatHistory()}
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
        drawerType: 'slide',
      }}>
      <Drawer.Screen
        name="(chat)/[id]"
        getId={() => Math.random().toString()}
        options={{
          title: 'Ask Muze',
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: COLORS.light }]}>
              <Image source={require('@assets/images/logo.png')} style={styles.btnImage} />
            </View>
          ),
          headerRight: () => (
            <Link href={'/(chat)/'} push asChild>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={24} color={COLORS.grey} style={{ marginRight: 16 }} />
              </TouchableOpacity>
            </Link>
          ),
          headerShadowVisible: true,
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
          title: 'Explore More',
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
    marginHorizontal: 10,
    borderRadius: 12,
    height: 45,
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
    fontSize: 14,
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
