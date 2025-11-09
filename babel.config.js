module.exports = function(api) {
  api.cache(true);
  
  // Use different presets for test vs production
  const isTest = process.env.NODE_ENV === 'test';
  
  if (isTest) {
    return {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ],
    };
  }
  
  return {
    presets: ['babel-preset-expo'],
  };
};
