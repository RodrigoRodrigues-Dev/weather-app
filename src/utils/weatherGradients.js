export const getWeatherGradient = (condition, isDay = true) => {
  if (condition.icon.includes('/night/')) {
    isDay = false;
  }

  const iconCode = condition.icon.match(/\/(\d+)\.png/)?.[1];
  const key = iconCode === '113' && !isDay ? '113_night' : iconCode;

  const gradientMap = {
    113: 'bg-gradient-to-br from-[#ff9a56] to-[#ffcd6b]',
    '113_night': 'bg-gradient-to-br from-[#141e30] to-[#243b55]', // ✅ aspas
    116: 'bg-gradient-to-br from-[#56ccf2] to-[#2f5461]',
    119: 'bg-gradient-to-br from-[#636fa4] to-[#384c7f]',
    122: 'bg-gradient-to-br from-[#757f9a] to-[#d7dde8]',
    143: 'bg-gradient-to-br from-[#bdc3c7] to-[#2c3e50]',
    149: 'bg-gradient-to-br from-[#bdc3c7] to-[#2c3e50]',
    248: 'bg-gradient-to-br from-[#bdc3c7] to-[#2c3e50]',
    200: 'bg-gradient-to-br from-[#4b6cb7] to-[#182848]',
    176: 'bg-gradient-to-br from-[#4facfe] to-[#00f2fe]',
    302: 'bg-gradient-to-br from-[#2c3e50] to-[#4ca1af]',
    296: 'bg-gradient-to-br from-[#2c3e50] to-[#4ca1af]',
    299: 'bg-gradient-to-br from-[#4facfe] to-[#00f2fe]',
    263: 'bg-gradient-to-br from-[#606c88] to-[#3f4c6b]',
    266: 'bg-gradient-to-br from-[#606c88] to-[#3f4c6b]',
    353: 'bg-gradient-to-br from-[#141e30] to-[#243b55]'
  };

  return gradientMap[key] || 'bg-gradient-to-br from-[#ff5733] to-[#00d4ff]';
};
