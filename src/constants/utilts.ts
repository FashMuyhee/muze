import { Dimensions, Platform } from 'react-native';

export const { width: SW, height: SH } = Dimensions.get('window');

export const IS_ANDROID = Platform.OS == 'android';


export const parseContentToString = (text: string) => {
  const lines = text.split('\n');
  const elements: string[] = [];

  lines.forEach((line, index) => {
    // HEADING
    if (line.startsWith('## ')) {
      elements.push(line.replace('## ', ''));
    } else if (line.startsWith('* **')) {
      //UN-ORDERED LIST WITH BOLD STYLE
      const parts = line.split('**');
      // console.log(`undered order ${parts.length > 2 ? parts[2] : ''}`)
      elements.push(` ${parts[1]} ${parts.length > 2 ? parts[2] : ''}`);
    } else if (line.startsWith('* ')) {
      //UN-ORDERED LIST ONLY
      // console.log(`un list only ${line.replace('* ', '')}`)
      elements.push(`${line.replace('* ', '')}`);
    } else if (line.match(/^\d+\.\s\*\*/)) {
      //ORDERED LIST WITH BOLD STYLE
      const parts = line.split('**') || [];
      const orderNumber = parts[0].match(/^\d+\.\s/)![0];
      // console.log(`ordered plaus bold ${orderNumber} ${parts.length > 2 ? parts[2] : ''}`);
      elements.push(`${orderNumber} ${parts.length > 2 ? parts[2] : ''}`);
    } else if (line.match(/^\d+\.\s/)) {
      //ORDERED LIST ONLY
      elements.push(line);
    } else if (line.startsWith('**')) {
      //BOLD STYLE
      const boldText = line.match(/\*\*(.*?)\*\*/g)?.map((t) => t.replace(/\*\*/g, ''));
      if (boldText) {
        elements.push(boldText.map((text, i) => text).toString());
      }
    } else if (line.startsWith('http')) {
      //LINK TEXT
      elements.push(line);
    } else if (line.trim() === '') {
      // NEW LINE
      elements.push('\n\n');
    } else {
      // NORMAL TEXT
      elements.push(line);
    }
  });

  return elements;
};