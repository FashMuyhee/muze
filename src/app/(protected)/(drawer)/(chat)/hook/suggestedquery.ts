// categories.ts
enum Category {
  General = 'General',
  Technology = 'Technology',
  Entertainment = 'Entertainment',
  HealthAndWellness = 'HealthAndWellness',
  EducationAndLearning = 'EducationAndLearning',
  Travel = 'Travel',
  CookingAndRecipes = 'CookingAndRecipes',
  CareerAndBusiness = 'CareerAndBusiness',
  PersonalDevelopment = 'PersonalDevelopment',
  Miscellaneous = 'Miscellaneous',
}

type Suggestion = {
  suggestion: string;
  category: Category;
  color: string;
};

const categoryColors: { [key in Category]: string } = {
  [Category.General]: '#3498db1a',
  [Category.Technology]: '#2ecc711a',
  [Category.Entertainment]: '#e74c3c1a',
  [Category.HealthAndWellness]: '#9b59b61a',
  [Category.EducationAndLearning]: '#0E4D451a',
  [Category.Travel]: '#e67e221a',
  [Category.CookingAndRecipes]: '#0000FA1a',
  [Category.CareerAndBusiness]: '#2F2D321a',
  [Category.PersonalDevelopment]: '#FCBB801a',
  [Category.Miscellaneous]: '#F655FF1a',
};

const suggestions: Suggestion[] = [
  { suggestion: 'Can you tell me a fun fact?', category: Category.General, color: categoryColors[Category.General] },
  { suggestion: 'Can you recommend a good book to read?', category: Category.General, color: categoryColors[Category.General] },
  {
    suggestion: 'What are some interesting historical events that happened on this day?',
    category: Category.General,
    color: categoryColors[Category.General],
  },
  { suggestion: 'How do I improve my productivity?', category: Category.General, color: categoryColors[Category.General] },

  { suggestion: "What's the latest news in technology?", category: Category.Technology, color: categoryColors[Category.Technology] },
  { suggestion: 'Can you explain blockchain technology in simple terms?', category: Category.Technology, color: categoryColors[Category.Technology] },
  { suggestion: 'How does artificial intelligence work?', category: Category.Technology, color: categoryColors[Category.Technology] },
  { suggestion: 'What are some emerging trends in software development?', category: Category.Technology, color: categoryColors[Category.Technology] },
  {
    suggestion: 'What are the pros and cons of using React Native for mobile app development?',
    category: Category.Technology,
    color: categoryColors[Category.Technology],
  },

  { suggestion: 'What are some good movies to watch this weekend?', category: Category.Entertainment, color: categoryColors[Category.Entertainment] },
  {
    suggestion: 'Can you summarize the plot of [popular TV show/movie]?',
    category: Category.Entertainment,
    color: categoryColors[Category.Entertainment],
  },
  { suggestion: 'What are the top trending songs right now?', category: Category.Entertainment, color: categoryColors[Category.Entertainment] },
  { suggestion: 'Can you tell me a joke?', category: Category.Entertainment, color: categoryColors[Category.Entertainment] },
  {
    suggestion: 'Who won the last Academy Awards for Best Picture?',
    category: Category.Entertainment,
    color: categoryColors[Category.Entertainment],
  },

  {
    suggestion: 'What are some tips for maintaining a healthy diet?',
    category: Category.HealthAndWellness,
    color: categoryColors[Category.HealthAndWellness],
  },
  { suggestion: 'How can I improve my mental health?', category: Category.HealthAndWellness, color: categoryColors[Category.HealthAndWellness] },
  {
    suggestion: 'What are the benefits of regular exercise?',
    category: Category.HealthAndWellness,
    color: categoryColors[Category.HealthAndWellness],
  },
  {
    suggestion: 'Can you provide some home remedies for common colds?',
    category: Category.HealthAndWellness,
    color: categoryColors[Category.HealthAndWellness],
  },
  { suggestion: 'How can I improve my sleep quality?', category: Category.HealthAndWellness, color: categoryColors[Category.HealthAndWellness] },

  {
    suggestion: 'Can you help me understand basic calculus?',
    category: Category.EducationAndLearning,
    color: categoryColors[Category.EducationAndLearning],
  },
  {
    suggestion: 'What are some effective study techniques?',
    category: Category.EducationAndLearning,
    color: categoryColors[Category.EducationAndLearning],
  },
  {
    suggestion: 'Can you explain the theory of relativity?',
    category: Category.EducationAndLearning,
    color: categoryColors[Category.EducationAndLearning],
  },
  {
    suggestion: 'What are some resources to learn a new language?',
    category: Category.EducationAndLearning,
    color: categoryColors[Category.EducationAndLearning],
  },
  { suggestion: 'How do I write a strong resume?', category: Category.EducationAndLearning, color: categoryColors[Category.EducationAndLearning] },

  { suggestion: 'Can you suggest some travel tips for first-time travelers?', category: Category.Travel, color: categoryColors[Category.Travel] },
  { suggestion: 'What are some off-the-beaten-path destinations?', category: Category.Travel, color: categoryColors[Category.Travel] },
  { suggestion: 'How can I travel on a budget?', category: Category.Travel, color: categoryColors[Category.Travel] },
  { suggestion: 'What should I pack for a trip to [destination]?', category: Category.Travel, color: categoryColors[Category.Travel] },

  {
    suggestion: 'Can you share a simple recipe for dinner tonight?',
    category: Category.CookingAndRecipes,
    color: categoryColors[Category.CookingAndRecipes],
  },
  { suggestion: 'What are some vegetarian meal ideas?', category: Category.CookingAndRecipes, color: categoryColors[Category.CookingAndRecipes] },
  { suggestion: 'How do I make homemade pizza?', category: Category.CookingAndRecipes, color: categoryColors[Category.CookingAndRecipes] },
  {
    suggestion: 'What are the benefits of using organic ingredients?',
    category: Category.CookingAndRecipes,
    color: categoryColors[Category.CookingAndRecipes],
  },
  {
    suggestion: 'Can you suggest some quick and healthy breakfast options?',
    category: Category.CookingAndRecipes,
    color: categoryColors[Category.CookingAndRecipes],
  },

  {
    suggestion: 'What are some strategies for effective leadership?',
    category: Category.CareerAndBusiness,
    color: categoryColors[Category.CareerAndBusiness],
  },
  {
    suggestion: 'How can I improve my public speaking skills?',
    category: Category.CareerAndBusiness,
    color: categoryColors[Category.CareerAndBusiness],
  },
  {
    suggestion: 'What are the key elements of a successful business plan?',
    category: Category.CareerAndBusiness,
    color: categoryColors[Category.CareerAndBusiness],
  },
  { suggestion: 'How do I negotiate a higher salary?', category: Category.CareerAndBusiness, color: categoryColors[Category.CareerAndBusiness] },
  {
    suggestion: 'What are some tips for starting a small business?',
    category: Category.CareerAndBusiness,
    color: categoryColors[Category.CareerAndBusiness],
  },

  {
    suggestion: 'How can I set and achieve my personal goals?',
    category: Category.PersonalDevelopment,
    color: categoryColors[Category.PersonalDevelopment],
  },
  {
    suggestion: 'What are some techniques for managing stress?',
    category: Category.PersonalDevelopment,
    color: categoryColors[Category.PersonalDevelopment],
  },
  {
    suggestion: 'How do I develop better time management skills?',
    category: Category.PersonalDevelopment,
    color: categoryColors[Category.PersonalDevelopment],
  },
  {
    suggestion: 'What are the benefits of mindfulness meditation?',
    category: Category.PersonalDevelopment,
    color: categoryColors[Category.PersonalDevelopment],
  },
  {
    suggestion: 'Can you suggest some motivational quotes?',
    category: Category.PersonalDevelopment,
    color: categoryColors[Category.PersonalDevelopment],
  },

  { suggestion: 'Can you help me with a creative writing prompt?', category: Category.Miscellaneous, color: categoryColors[Category.Miscellaneous] },
  { suggestion: 'What are some interesting hobbies to try?', category: Category.Miscellaneous, color: categoryColors[Category.Miscellaneous] },
  { suggestion: 'How do I organize a community event?', category: Category.Miscellaneous, color: categoryColors[Category.Miscellaneous] },
  { suggestion: 'What are some unique gift ideas for a birthday?', category: Category.Miscellaneous, color: categoryColors[Category.Miscellaneous] },
];

export { suggestions, Category, Suggestion, categoryColors };
