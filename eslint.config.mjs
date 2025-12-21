import nextConfig from 'eslint-config-next';

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      // Warn when components exceed 80 lines
      'max-lines-per-function': ['warn', { max: 80, skipBlankLines: true, skipComments: true }],
      // Warn when files exceed 200 lines
      'max-lines': ['warn', { max: 200, skipBlankLines: true, skipComments: true }],
      // Cyclomatic complexity - suggests hook extraction
      'complexity': ['warn', { max: 15 }],
      // Limit nested callbacks
      'max-nested-callbacks': ['warn', { max: 3 }],
      // Limit statements per function
      'max-statements': ['warn', { max: 25 }, { ignoreTopLevelFunctions: true }],
    },
  },
  // Allow longer files for hooks
  {
    files: ['**/hooks/*.ts', '**/use*.ts'],
    rules: {
      'max-lines-per-function': ['warn', { max: 150, skipBlankLines: true, skipComments: true }],
      'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-statements': 'off',
    },
  },
  // Allow longer files for UI components
  {
    files: ['**/ui/*.tsx'],
    rules: {
      'max-lines': ['warn', { max: 250, skipBlankLines: true, skipComments: true }],
    },
  },
  // Allow longer presentational components with multiple sub-components
  {
    files: ['**/analytics/*.tsx', '**/components/**/*.tsx'],
    rules: {
      'max-lines-per-function': ['warn', { max: 120, skipBlankLines: true, skipComments: true }],
      'max-lines': ['warn', { max: 400, skipBlankLines: true, skipComments: true }],
    },
  },
];

export default eslintConfig;
