import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import useRandomSuggestions from '../hook/useRandomSuggestions';
import { Suggestion } from '../hook/suggestedquery';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SW } from '@constants/utilts';
import { Text } from '@components';

type Props = {
  onSuggestionPress: (s: string) => void;
};

type SuggestionProps = {
  suggestion: Suggestion;
  onSuggestionPress: (s: string) => void;
};
const SuggestedQuery = (props: Props) => {
  const suggestions = useRandomSuggestions();

  const Suggestion = ({ onSuggestionPress, suggestion }: SuggestionProps) => {
    return (
      <TouchableOpacity
        onPress={() => onSuggestionPress(suggestion.suggestion)}
        style={[styles.suggestion, { backgroundColor: suggestion.color }]}
        activeOpacity={0.7}>
        <Text fontWeight="600" fontSize={14}>
          {suggestion.suggestion}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={suggestions}
      keyExtractor={(_, i) => i.toString()}
      style={{ paddingVertical: 10 }}
      contentContainerStyle={{ paddingHorizontal: 10, columnGap: 10 }}
      renderItem={({ item }) => <Suggestion suggestion={item} onSuggestionPress={props.onSuggestionPress} />}
    />
  );
};

export default SuggestedQuery;
const styles = StyleSheet.create({
  suggestion: {
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    minHeight: 65,
    width: SW * 0.55,
    padding: 10,
    borderRadius: 7,
    justifyContent: 'space-between',
  },
});
