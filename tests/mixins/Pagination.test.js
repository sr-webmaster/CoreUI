import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Pagination from '@freshinup/core-ui/src/mixins/Pagination'
describe('Mixins Pagination', () => {
  test('pagination setting triggers event', () => {
    const Component = Vue.component('Table', {
      mixins: [
        Pagination
      ],
      template: '<div></div>'
    })
    const wrapper = shallowMount(Component, {
      localVue: createLocalVue()
    })
    wrapper.vm.pagination = {
      descending: false,
      rowsPerPage: 6,
      page: 1,
      sortBy: 'name',
      totalItems: 12,
      totalPages: 2
    }
    expect(wrapper.emitted('paginate')).toBeTruthy()
    expect(wrapper.emitted('paginate')).toHaveLength(1)
    expect(wrapper.emitted('paginate')[0]).toEqual([{
      descending: false,
      rowsPerPage: 6,
      page: 1,
      sortBy: 'name',
      totalItems: 12,
      totalPages: 2
    }])
  })

  test('pagination properties are made available in the computed property for syncing purposes', () => {
    const Component = Vue.component('Table', {
      mixins: [
        Pagination
      ],
      template: `<div>
          <div class="sortBy">{{ pagination.sortBy }}</div>
          <div class="descending">{{ pagination.descending ? 'is descending' : 'is not descending' }}</div>
          <div class="rowsPerPage">{{ pagination.rowsPerPage }}</div>
          <div class="page">{{ pagination.page }}</div>
          <div class="totalItems">{{ pagination.totalItems }}</div>
          <div class="totalPages">{{ pagination.totalPages }}</div>
      </div>`
    })
    const wrapper = shallowMount(Component, {
      localVue: createLocalVue(),
      propsData: {
        sortBy: 'name',
        descending: true,
        rowsPerPage: 6,
        page: 1,
        totalItems: 12
      }
    })
    expect(wrapper.vm).toHaveProperty('pagination.sortBy', 'name')
    expect(wrapper.vm).toHaveProperty('pagination.descending', true)
    expect(wrapper.vm).toHaveProperty('pagination.rowsPerPage', 6)
    expect(wrapper.vm).toHaveProperty('pagination.page', 1)
    expect(wrapper.vm).toHaveProperty('pagination.totalItems', 12)
    expect(wrapper.vm).toHaveProperty('pagination.totalPages', 2)
    expect(wrapper.find('.sortBy').text()).toContain('name')
    expect(wrapper.find('.descending').text()).toContain('is descending')
    expect(wrapper.find('.rowsPerPage').text()).toContain('6')
    expect(wrapper.find('.page').text()).toContain('1')
    expect(wrapper.find('.totalItems').text()).toContain('12')
    expect(wrapper.find('.totalPages').text()).toContain('2')
  })
})
