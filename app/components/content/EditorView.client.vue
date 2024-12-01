<script setup lang="ts">
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

import { onMounted } from "vue";

const modelValue = defineModel<{}>();

const emit = defineEmits(["update:modelValue"]);
onMounted(() => {
    const editor = new EditorJS({

        holder: "editor",
        minHeight: 100,
        tools: {

            header: Header,
            list: List,
        },
        defaultBlock: "paragraph",
        placeholder: "Template Description",
        
        onChange: (api, event) => {
            api.saver.save().then(async (data) => {
               modelValue.value = data;
            });
        },
        data: modelValue.value as any,
        logLevel: "ERROR" as any,
    });
});
</script>


<template>
    <div id="editor"></div>
</template>
