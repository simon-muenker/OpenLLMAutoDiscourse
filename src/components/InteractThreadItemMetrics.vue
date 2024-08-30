<template>
    <div class="mt-2 p-2 bg-teal-50 rounded-md">
        <span class="mb-2">metrics</span>
        <template v-for="(preds, label) in collated_metrics">
          <div class="mb-2" v-if="Object.keys(preds).length > 0">
            <span class="block text-sm mb-0.5">{{ label }}</span>
            <template v-for="(pred, name) in preds">
              <ProgressBar :label="name" :percentage="pred" class="mb-2"/>
            </template>
          </div>
        </template>
      </div>
</template>

<script>
import ProgressBar from "@/components/atoms/ProgressBar.vue"

export default {
    components: {
        ProgressBar
  },
  props: {
    metrics: Object,
    collate_metrics: {
        type: Array,
        default: ['irony', 'offensive', 'hate']
    }
  },
  computed: {
    collated_metrics() {
      let uncollated = Object.keys(this.metrics)
        .filter(key => !this.collate_metrics.includes(key))
        .reduce((obj, key) => {
            obj[key] = this.metrics[key];
            return obj;
        }, {});

      let collated = {
        other: {}
      }

      Object.keys(this.metrics)
        .filter(key => this.collate_metrics.includes(key))
        .forEach(key => {
          collated.other = {...collated.other, ...this.metrics[key]}
        });
          
      return {...uncollated, ...collated}
    }
  },
  mounted() {
    console.log(this.metrics)
    console.log(this.collated_metrics)
  },
}
</script>