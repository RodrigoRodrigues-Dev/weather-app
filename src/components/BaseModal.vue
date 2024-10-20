<script setup>
defineProps({
    modalActive: {
        type:Boolean,
        default: false,
    }
})
</script>

<template>
    <div 
        v-show="modalActive"
        class="z-50 absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex 
        justify-center items-center px-8"
    >
        <div v-if="modalActive" class="p-4 bg-light-background dark:bg-dark-background mt-32 max-w-screen-md rounded-md">
            <slot />
            <button 
                class="text-white mt-8 bg-light-secondary-text rounded-md py-2 px-6"
                @click="$emit('close-modal')"
            >
                Fechar
            </button>
        </div>
    </div>
</template>