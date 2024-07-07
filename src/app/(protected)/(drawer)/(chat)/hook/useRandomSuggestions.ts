import { useState, useEffect } from 'react';
import { Category, Suggestion, suggestions } from './suggestedquery';

const useRandomSuggestions = (): Suggestion[] => {
  const [randomSuggestions, setRandomSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const categories = Object.values(Category);
    const suggestionsByCategory: { [key in Category]?: Suggestion[] } = {};

    // Group suggestions by category
    for (const suggestion of suggestions) {
      if (!suggestionsByCategory[suggestion.category]) {
        suggestionsByCategory[suggestion.category] = [];
      }
      suggestionsByCategory[suggestion.category]?.push(suggestion);
    }

    // Select two random suggestions from each category
    let selectedSuggestions: Suggestion[] = [];
    for (const category of categories) {
      const categorySuggestions = suggestionsByCategory[category] || [];
      const shuffledCategorySuggestions = categorySuggestions.sort(() => 0.5 - Math.random()).slice(0, 2);
      selectedSuggestions = selectedSuggestions.concat(shuffledCategorySuggestions);
    }

    // Shuffle the selected suggestions and set the state
    const shuffledSelectedSuggestions = selectedSuggestions.sort(() => 0.5 - Math.random()).slice(0, 5);
    setRandomSuggestions(shuffledSelectedSuggestions);
  }, []);

  return randomSuggestions;
};

export default useRandomSuggestions;
