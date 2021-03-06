module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
  },
  plugins: ['prettier'],
  rules: {
    strict: 0,
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
    'react/no-array-index-key': 'off',
    'react/forbid-prop-types': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'arrow-parens': 'off',
    'import/no-named-as-default': 'off',
    'arrow-body-style': 'off',
    'import/prefer-default-export': 'off',
  },
};
