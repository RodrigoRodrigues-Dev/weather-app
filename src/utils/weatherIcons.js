// simples ícones SVG importados como componentes
import IconSunset from '../assets/icons/simple/icon-sunrise.svg?component';
import IconStorm from '../assets/icons/simple/icon-storm.svg?component';
import IconCloudyClearNight from '../assets/icons/simple/icon-cloudy-clear-night.svg?component';
import IconCloudyClearDay from '../assets/icons/simple/icon-cloudy-clear-day.svg?component';
import IconFog from '../assets/icons/simple/icon-fog.svg?component';
import IconCloudy from '../assets/icons/simple/icon-cloudy.svg?component';
import IconClearNight from '../assets/icons/simple/icon-clear-night.svg?component';
import IconScatteredShowers from '../assets/icons/simple/icon-scattered-showers.svg?component';
import IconRain from '../assets/icons/simple/icon-rain.svg?component';
import IconDrizzle from '../assets/icons/simple/icon-drizzle.svg?component';
import IconRainNight from '../assets/icons/simple/icon-rain-night.svg?component';
import IconRainThuderstorm from '../assets/icons/simple/icon-rain-thunderstorm.svg?component';

// colored icons - importados como strings brutas
import IconSunsetcolored from '../assets/icons/colored/icon-sunrise.svg?raw';
import IconStormcolored from '../assets/icons/colored/icon-storm.svg?raw';
import IconCloudyClearNightcolored from '../assets/icons/colored/icon-cloudy-clear-night.svg?raw';
import IconCloudyClearDaycolored from '../assets/icons/colored/icon-cloudy-clear-day.svg?raw';
import IconFogcolored from '../assets/icons/colored/icon-fog.svg?raw';
import IconCloudycolored from '../assets/icons/colored/icon-cloudy.svg?raw';
import IconClearNightcolored from '../assets/icons/colored/icon-clear-night.svg?raw';
import IconScatteredShowerscolored from '../assets/icons/colored/icon-scattered-showers.svg?raw';
import IconRaincolored from '../assets/icons/colored/icon-rain.svg?raw';
import IconDrizzlecolored from '../assets/icons/colored/icon-drizzle.svg?raw';
import IconRainNightcolored from '../assets/icons/colored/icon-rain-night.svg?raw';
import IconRainThuderstormcolored from '../assets/icons/colored/icon-rain-thunderstorm.svg?raw';

// Ícones de métricas (customizados)
import IconHumiditycolored from '../assets/icons/colored/icon-humidity.svg?raw';
import IconWindcolored from '../assets/icons/colored/icon-wind.svg?raw';
import IconVisibilitycolored from '../assets/icons/colored/icon-visibility.svg?raw';
import IconUVcolored from '../assets/icons/colored/icon-uv.svg?raw';
import IconPressurecolored from '../assets/icons/colored/icon-pressure.svg?raw';

// Mapas dos ícones da API
export const simpleIconMap = {
  113: IconSunset,
  '113_night': IconClearNight,
  116: IconCloudyClearDay,
  119: IconCloudyClearNight,
  122: IconCloudy,
  143: IconFog,
  248: IconFog,
  149: IconFog,
  200: IconStorm,
  176: IconScatteredShowers,
  299: IconScatteredShowers,
  302: IconRain,
  296: IconRain,
  263: IconDrizzle,
  266: IconDrizzle,
  353: IconRainNight,
  293: IconRainNight,
  308: IconRainThuderstorm
};

export const coloredIconMap = {
  113: IconSunsetcolored,
  '113_night': IconClearNightcolored,
  116: IconCloudyClearDaycolored,
  119: IconCloudyClearNightcolored,
  122: IconCloudycolored,
  143: IconFogcolored,
  149: IconFogcolored,
  248: IconFogcolored,
  200: IconStormcolored,
  176: IconScatteredShowerscolored,
  299: IconScatteredShowerscolored,
  302: IconRaincolored,
  296: IconRaincolored,
  263: IconDrizzlecolored,
  266: IconDrizzlecolored,
  353: IconRainNightcolored,
  293: IconRainNightcolored,
  308: IconRainThuderstormcolored
};

export const metricIcons = {
  humidity: IconHumiditycolored,
  wind: IconWindcolored,
  visibility: IconVisibilitycolored,
  uv: IconUVcolored,
  pressure: IconPressurecolored
};

/**
 * Retorna o ícone baseado na condição da API
 * @param {Object} condition - objeto condition da API
 * @param {boolean} isDay - se é dia ou noite
 * @param {boolean} colored - se quer ícone colorido (string SVG) ou simples (componente Vue)
 */
export const getIcon = (condition, isDay = true, colored = false) => {
  if (condition.icon.includes('/night/')) {
    isDay = false;
  }

  const iconCode = condition.icon.match(/\/(\d+)\.png/)?.[1];
  const key = iconCode === '113' && !isDay ? '113_night' : iconCode;
  const iconMap = colored ? coloredIconMap : simpleIconMap;

  return iconMap[key] || null;
};
