<template>
    <div id="map" class="w-full h-full"></div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useTheme } from '../Composable/theme.js';
import { watch, onMounted } from 'vue';

const route = useRoute();
const { isDark } = useTheme();

const colors = {
    light: {
        background: '#FBFBFB',
        backgroundSecondary: '#F6F6F6',
        text: '#333333',
        secondaryText: '#666666',
        highlight: '#007BFF',
        border: '#DDDDDD',
        cardBackground: '#F8F9FA',
        water: '#B0C4DE',
        poi: '#007BFF',
    },
    dark: {
        background: '#121212',
        backgroundSecondary: '#141414',
        text: '#FFFFFF',
        secondaryText: '#BBBBBB',
        highlight: '#82B1FF',
        border: '#333333',
        cardBackground: '#1E1E1E',
        water: '#004170',
        poi: '#004170',
    }
};

onMounted(() => {
    loadGoogleMapsApi();
});

function loadGoogleMapsApi() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_KEY}&callback=vueGoogleMapsInit`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
}

function initializeMap() {
    const themeColors = isDark ? colors.dark : colors.light;

    const mapStyle = getMapStyle(themeColors);

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: parseFloat(route.query.lat), lng: parseFloat(route.query.lng) },
        zoom: 8,
        styles: mapStyle,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        scrollwheel: true,  
        gestureHandling: 'greedy',
        restriction: {
            latLngBounds: {
                north: 85,
                south: -85,
                west: parseFloat(route.query.lng) - 5,
                east: parseFloat(route.query.lng) + 5 
            },
            strictBounds: false, 
        },
        minZoom: 1,  
        maxZoom: 20
    });

    const marker = new google.maps.Marker({
        position: { lat: parseFloat(route.query.lat), lng: parseFloat(route.query.lng) },
        map,
        title: 'Meu Marcador',
    });

    watch(isDark, (newVal) => {
        const themeColors = newVal ? colors.dark : colors.light;
        map.setOptions({ styles: getMapStyle(themeColors) });
    });
}


function getMapStyle(themeColors) {
    return [
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
                { "color": themeColors.background }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                { "color": themeColors.water }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                { "color": themeColors.backgroundSecondary }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                { "color": themeColors.border },
                { "lightness": 50 }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                { "color": themeColors.poi }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                { "color": themeColors.border }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                { "color": themeColors.secondaryText }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                { "color": themeColors.highlight }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
                { "color": themeColors.text }
            ]
        }
    ];
}
</script>

<style>
#map {
    height: 500px;
    width: 100%;
    z-index: 1;
}

.gmnoprint,
.gm-style-cc {
    display: none;
}

.gm-bundled-control .gmnoprint {
    display: none;
}

.gm-bundled-control {
    display: none;
}
</style>