<script setup>
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
</script>

<template>
    <Splitter style="height: 500px" layout="vertical">
        <SplitterPanel class="flex items-center justify-center">
            <Splitter layout="horizontal">
                <SplitterPanel class="flex items-center justify-center" :size="30" :minSize="10"> Panel 1.1 </SplitterPanel>
                <SplitterPanel class="flex items-center justify-center" :size="30"> Panel 1.2 </SplitterPanel>
                <SplitterPanel class="flex items-center justify-center" :size="30"> Panel 1.3 </SplitterPanel>
            </Splitter>
        </SplitterPanel>
        <SplitterPanel class="flex items-center justify-center"> Panel 2 </SplitterPanel>
    </Splitter>
</template>