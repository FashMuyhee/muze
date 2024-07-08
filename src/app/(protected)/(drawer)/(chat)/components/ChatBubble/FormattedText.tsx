import { COLORS } from '@constants';
import React from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';

const parseContent = (text: string) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    if (line.startsWith('## ')) {
      elements.push(
        <Text key={index} style={[styles.text, styles.header]}>
          {line.replace('## ', '')}
        </Text>,
      );
    } else if (line.startsWith('* **')) {
      const parts = line.split('**');

      elements.push(
        <Text key={index} style={[styles.text, styles.listItem]}>
          {'\u2022 '}
          <Text style={[styles.text, styles.bold]}>{parts[1]}</Text>
          {parts.length > 2 ? parts[2] : ''}
        </Text>,
      );
    } else if (line.startsWith('* ')) {
      elements.push(
        <Text key={index} style={[styles.text, styles.listItem]}>
          {'\u2022 ' + line.replace('* ', '')}
        </Text>,
      );
    } else if (line.startsWith('**')) {
      const boldText = line.match(/\*\*(.*?)\*\*/g)?.map((t) => t.replace(/\*\*/g, ''));
      if (boldText) {
        elements.push(
          <Text key={index} style={[styles.text, styles.paragraph]}>
            {boldText.map((text, i) => (
              <Text key={i} style={[styles.text, styles.bold]}>
                {text}
              </Text>
            ))}
          </Text>,
        );
      }
    } else if (line.startsWith('http')) {
      elements.push(
        <Text key={index} style={[styles.text, styles.link]} onPress={() => Linking.openURL(line)}>
          {line}
        </Text>,
      );
    } else if (line.trim() === '') {
      elements.push(<View key={index} style={styles.spacer} />);
    } else {
      elements.push(
        <Text key={index} style={[styles.text, styles.paragraph]}>
          {line}
        </Text>,
      );
    }
  });

  return elements;
};

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const content = parseContent(text);
  return <React.Fragment>{content}</React.Fragment>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    flexWrap: 'wrap',
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  listItem: {
    marginVertical: 5,
    marginLeft: 20,
  },
  paragraph: {
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: COLORS.blue,
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
  spacer: {
    height: 5,
  },
});

export default FormattedText;
