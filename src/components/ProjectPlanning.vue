<script setup>
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
</script>

<template>
    <Splitter layout="vertical">
        <SplitterPanel :size="25" class="flex items-center justify-center">
            Panel 1
        </SplitterPanel>
        <SplitterPanel :size="25" class="flex items-center justify-center">
            Panel 2
        </SplitterPanel>
        <SplitterPanel :size="25" class="flex items-center justify-center">
            Panel 3
        </SplitterPanel>
        <SplitterPanel :size="25" class="flex items-center justify-center">
            Panel 4
        </SplitterPanel>
    </Splitter>
</template>
