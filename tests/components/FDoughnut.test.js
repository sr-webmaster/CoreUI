import { mount, createLocalVue } from '@vue/test-utils'
import Component from '../../src/components/FDoughnut'

const dataSet = [10, 20, 30]
const labels = ['Red', 'Green', 'Blue']
const colors = ['red', 'green', 'blue']

describe('Doughnut Component', () => {
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
  })

  describe('Visual', () => {
    test('chartData set', () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          chartData: {
            datasets: [{
              data: dataSet,
              backgroundColor: colors,
              borderWidth: 0
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
      })
      expect(wrapper.element).toMatchSnapshot()
    })
    test('chartData and some options set', () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          chartData: {
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
      })
      expect(wrapper.element).toMatchSnapshot()
    })
    test('chartData set, withLabels', () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          chartData: {
            datasets: [{
              data: dataSet,
              backgroundColor: colors,
              borderWidth: 0
            }],

            labels: labels
          },
          options: {
            legend: {
              display: true
            },
            cutoutPercentage: 70
          }
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
    test('chartData set, withLabels and withPercentage', () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          chartData: {
            datasets: [{
              data: dataSet,
              backgroundColor: colors,
              borderWidth: 0
            }],

            labels: labels,
            withPercentage: true
          },
          options: {
            legend: {
              display: true
            },
            cutoutPercentage: 70
          }
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
  describe('Method', () => {
    test('getPercentageLabels()', () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          chartData: {
            datasets: [{
              data: dataSet,
              backgroundColor: colors,
              borderWidth: 0
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
      })
      expect(wrapper.vm.getPercentageLabels(labels, dataSet)).toEqual(['Red 16.7%', 'Green 33.3%', 'Blue 50%'])
    })
  })
})
