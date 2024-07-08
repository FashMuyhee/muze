import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { IS_ANDROID } from '@constants/utilts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@constants';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';

type MessageField = {
  onSend: (m: string) => void;
};

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const MessageField = (props: MessageField) => {
  const [query, setQuery] = React.useState('');
  const isExpanded = useSharedValue(0);
  const { bottom } = useSafeAreaInsets();
  const inputRef = React.useRef<TextInput>(null);

  const onChangeText = (text: string) => {
    onCollapseItems();

    setQuery(text);
  };

  const onSend = () => {
    props.onSend(query);
    setQuery('');
  };

  const onCollapseItems = () => {
    isExpanded.value = withTiming(0, { duration: 300 });
  };

  const onExpandItems = () => {
    isExpanded.value = withTiming(1, { duration: 300 });
    inputRef.current?.focus();
  };

  const expandButtonStyle = useAnimatedStyle(() => {
    const opacityInterpolation = interpolate(isExpanded.value, [0, 1], [1, 0], Extrapolation.CLAMP);
    const widthInterpolation = interpolate(isExpanded.value, [0, 1], [35, 0], Extrapolation.CLAMP);

    return {
      opacity: opacityInterpolation,
      width: widthInterpolation,
    };
  });

  const buttonRowStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(isExpanded.value, [0, 1], [0, 100], Extrapolation.CLAMP);
    return {
      width: widthInterpolation,
      opacity: isExpanded.value,
    };
  });

  return (
    <BlurView intensity={100} tint="extraLight" style={[styles.blurContainer, { paddingBottom: IS_ANDROID ? 30 : bottom }]}>
      <View style={[styles.fieldRow]}>
        <ATouchableOpacity onPress={onExpandItems} style={[styles.roundBtn, expandButtonStyle]}>
          <Ionicons name="add" size={24} color={COLORS.grey} />
        </ATouchableOpacity>
        <Animated.View style={[styles.buttonRow, buttonRowStyle]}>
          <TouchableOpacity>
            <Ionicons name="camera-outline" size={24} color={COLORS.grey} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="image-outline" size={24} color={COLORS.grey} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="folder-outline" size={24} color={COLORS.grey} />
          </TouchableOpacity>
        </Animated.View>
        <TextInput
          autoFocus
          ref={inputRef}
          placeholder="Message"
          style={styles.field}
          onFocus={onCollapseItems}
          onBlur={onCollapseItems}
          onChangeText={onChangeText}
          value={query}
          cursorColor={COLORS.black}
          selectionColor={COLORS.primary}
          multiline
        />
        {query.length > 0 ? (
          <TouchableOpacity onPress={onSend}>
            <FontAwesome name="send" size={20} color={COLORS.grey} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <FontAwesome5 name="headphones" size={24} color={COLORS.grey} />
          </TouchableOpacity>
        )}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  field: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    padding: 10,
    borderColor: COLORS.greyLight,
    backgroundColor: COLORS.light,
    fontSize: 13,
  },
  roundBtn: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: COLORS.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
