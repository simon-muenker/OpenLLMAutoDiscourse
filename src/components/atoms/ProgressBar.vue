<template>
    <div class="w-full bg-transparent rounded-full">
        <div 
            class="bg-teal-600 text-xs text-white text-center p-0.5 py-1 rounded-full" 
            :style="{width: percentage * 100 + '%'}"
        > 
                <span class="mr-2 opacity-80">{{ label.toLowerCase().replaceAll("_", "-") }}</span>
                <span>{{ (percentage * 100).toFixed(2) }} %</span>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    label: String,
    percentage: Number,
  }
}
</script>