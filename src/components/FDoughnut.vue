<script>
import { Doughnut } from 'vue-chartjs'
import reduce from 'lodash/reduce'

export default {
  extends: Doughnut,
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  created () {
    if ((typeof this.options !== 'undefined') && (this.options.withPercentage)) {
      this.chartData.labels = this.getPercentageLabels(this.chartData.labels, this.chartData.datasets[0].data)
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    getSum (total, num) {
      return total + Math.round(num)
    },
    getPercentageLabels (arrLabels, arrValues) {
      let total = arrValues.reduce(this.getSum, 0)
      return reduce(arrValues, (result, value, key) => {
        result.push(arrLabels[key] + ' ' + Math.round(value / total * 1000) / 10 + '%')
        return result
      }, [])
    }
  }
}
</script>

<style>
</style>
