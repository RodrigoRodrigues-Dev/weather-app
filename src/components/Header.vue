<script setup>
</script>

<template>
    <header class="sticky top-0 bg-light-background shadow-lg">
        <nav class="container flex flex-col sm:flex-row justify-between items-center gap-4 text-light-text py-6">
            <div class="flex justify-center items-center">
                <img class="w-12 mr-4" src="/favicon.png" alt="">
                <h1 class="text-xl font-black">Weather App</h1>
            </div>
            <div class="flex justify-center items-center">
                <div class="flex cursor-pointer">
                    <i class="bx bx-search-alt text-2xl"></i>
                    <span class="text-lg ml-2">Buscar</span>
                </div>
                <div class="ml-10">
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none 
                            dark:bg-light-pink-switch peer-checked:after:translate-x-full 
                            rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                            after:bg-white after:border after:border-gray-300 after:rounded-full 
                            after:h-5 after:w-5 after:transition-all dark:border-light-pink-switch
                            peer-checked:bg-dark-pink-switch rounded-full">
                        </div>
                    </label>
                </div>
            </div>
        </nav>
    </header>
</template>