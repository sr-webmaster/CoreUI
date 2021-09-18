import { storiesOf } from '@storybook/vue'
import { CORE } from '../../.storybook/categories'
// Components
import FDoughnut from './FDoughnut.vue'

const dataSet = [10, 20, 30]
const labels = ['Red', 'Green', 'Blue']
const colors = ['red', 'green', 'blue']

storiesOf(`${CORE}|Doughnut`, module)
  .addParameters({
    backgrounds: [
      { name: 'default', value: '#f1f3f6', default: true }
    ]
  })
  .add('chartData set', () => {
    return {
      components: { FDoughnut },
      data () {
        return {
          dataCollection: {
            datasets: [{
              data: dataSet,
              borderWidth: 0
            }],
            labels: labels
          }
        }
      },
      template: `
          <v-container>
          <v-layout row>
            <v-flex sm6>
              <v-card class="px-3 py-3">
                <f-doughnut
                  :chart-data="dataCollection"
                />
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      `
    }
  }).add('chartData and some options set', () => {
    return {
      components: { FDoughnut },
      data () {
        return {
          dataCollection: {
            datasets: [{
              data: dataSet,
              backgroundColor: colors,
              borderWidth: 5
            }],
            labels: labels
          },
          options: {
            legend: {
              display: false
            },
            cutoutPercentage: 70
          }
        }
      },
      template: `
        <v-container>
          <v-layout row>
            <v-flex sm6>
              <v-card class="px-3 py-3">
                <f-doughnut
                   :chart-data="dataCollection"
                   :options="options"
                />
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      `
    }
  }).add('chartData set, withLabels', () => {
    return {
      components: { FDoughnut },
      data () {
        return {
          dataCollection: {
            datasets: [{
              data: dataSet,
              backgroundColor: colors,
              borderWidth: 0
            }],
            labels: labels
          },
          options: {
            legend: {
              display: true,
              position: 'bottom',
              valign: 'center',
              labels: {
                boxWidth: 12
              }
            },
            cutoutPercentage: 70
          }
        }
      },
      template: `
        <v-container>
          <v-layout row>
            <v-flex sm6>
              <v-card class="px-3 py-3">
                <f-doughnut
                   :chart-data="dataCollection"
                   :options="options"
                />
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      `
    }
  }).add('chartData set, withLabels and withPercentage', () => {
    return {
      components: { FDoughnut },
      data () {
        return {
          dataCollection: {
            datasets: [{
              data: dataSet,
              backgroundColor: colors,
              borderWidth: 0
            }],
            labels: labels
          },
          options: {
            legend: {
              display: true,
              position: 'bottom',
              valign: 'center',
              labels: {
                boxWidth: 12
              }
            },
            withPercentage: true,
            cutoutPercentage: 70
          }
        }
      },
      template: `
        <v-container>
            <v-layout row>
                <v-flex sm6>
                    <v-card class="px-3 py-3">
                        <f-doughnut
                                :chart-data="dataCollection"
                                :options="options"
                        />
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    `
    }
  })
