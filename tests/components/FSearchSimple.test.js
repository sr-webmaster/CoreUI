import { mount, shallowMount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import { apiMocked } from 'tests/PageStoryInstances'
import { advanceTo, clear } from 'jest-date-mock'
import VueAxios from 'vue-axios'
import { DEFAULT_DATE } from 'vue-cli-plugin-freshinup-ui/utils/testing/mockDate'
import Component from '../../src/components/FSearchSimple'

const FIXTURE_ITEMS = [
  { id: 1, name: 'John Smith', uuid: 1, other_field: 'John Smith' },
  { id: 2, name: 'Bob Loblaw', uuid: 2, other_field: 'Bob Loblaw' },
  { id: 3, name: 'Mario Brother', uuid: 3, other_field: 'Mario Brother' }
]

describe('Simple search', () => {
  describe('Snapshots', () => {
    test('snapshot', () => {
      const localVue = createLocalVue().localVue
      const wrapper = mount(Component, {
        localVue: localVue,
        propsData: {
          url: '/terms'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
  describe('Scenario', () => {
    let mock, localVue
    beforeEach(() => {
      clear()
      const v = createLocalVue()
      localVue = v.localVue
      mock = v.apiMocked
      localVue.use(VueAxios, mock.axiosInstance)

      mock.onGet('/terms').reply(200, {
        data: FIXTURE_ITEMS
      })

      mock.onGet('/uuid').reply(200, {
        data: FIXTURE_ITEMS
      })

      mock.onGet('/empty').reply(200, {
        data: []
      })

      mock.onGet('/should-not-be-here').reply(500, {
        data: []
      })

      mock.ready()
    })
    afterEach(() => {
      mock.reset()
      advanceTo(DEFAULT_DATE)
    })
    test('prop fetchOnValueChange=false does not trigger fetchWithIdKey when prop value changes', async () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          fetchOnValueChange: false
        },
        localVue
      })
      await wrapper.vm.$nextTick()
      expect(mock.history.get).toHaveLength(0)
      wrapper.setProps({
        value: '1234'
      })
      await wrapper.vm.$nextTick()
      expect(mock.history.get).toHaveLength(0)
    })
    test('prop fetchOnValueChange=true triggers fetchWithIdKey when prop value changes', async () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          fetchOnValueChange: true
        },
        localVue
      })
      await wrapper.vm.$nextTick()
      expect(mock.history.get).toHaveLength(0)
      wrapper.setProps({
        value: '1234'
      })
      await wrapper.vm.$nextTick()
      expect(mock.history.get).toHaveLength(1)
    })
    test('when term is matched, dropdown items display the name property value (default)', (done) => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: '/terms'
        }
      })
      let field = wrapper.find('input')
      field.setValue('Bob')
      setTimeout(() => {
        expect(mock.history.get[0].params['term']).toEqual('Bob')
        expect(mock.history.get[0].params['status']).toEqual(1)
        expect(mock.history.get[0].url).toEqual('/terms')
        expect(wrapper.text()).toContain('Bob Loblaw')
        done()
      }, 301)
      advanceTo(DEFAULT_DATE.setMilliseconds(302))
    })
    test('when term is matched, dropdown items display the other_field property value (valueParam is not default)', async () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: '/uuid',
          resultsTextKey: 'other_field'
        }
      })
      let field = wrapper.find('input')
      field.element.value = 'John'
      field.trigger('input')

      // Really we should just be testing that the term is changed and then test the method
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isLoading).toEqual(true)
      await wrapper.vm.$nextTick()
      expect(mock.history.get[0].params['term']).toEqual('John')
      expect(mock.history.get[0].params['status']).toEqual(1)
      expect(mock.history.get[0].url).toEqual('/uuid')
      expect(wrapper.text()).toContain('John Smith')
      expect(wrapper.vm.isLoading).toEqual(false)
    })

    test('"No data available" does not show if the term (input value) is empty and the "showNoData" property is set to true', async () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: '/empty',
          showNoData: true
        }
      })
      const input = wrapper.find('input')
      const menu = wrapper.find('.v-menu .v-menu__content')
      input.trigger('focus')
      input.trigger('click')
      input.element.value = ''
      input.trigger('input')
      expect(menu.isVisible()).toBe(false)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isLoading).toEqual(false)
      expect(mock.history.get).toHaveLength(0)
    })

    test('when there are no data available dropdown items display that the "No data available" is configurable', async () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: '/empty',
          showNoData: true,
          noDataText: 'No matching results',
          autocomplete: false
        }
      })
      let field = wrapper.find('input')
      field.element.value = 'test'
      field.trigger('input')
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      await wrapper.vm.fetch()
      expect(mock.history.get[0].params['term']).toEqual('test')
      expect(mock.history.get[0].params['status']).toEqual(1)
      expect(mock.history.get[0].url).toEqual('/empty')
      expect(wrapper.text()).toContain('No matching results')
    })
    test('when value property is not set, input element is empty and model is null', async () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: '/terms'
        }
      })
      expect(mock.history.get).toHaveLength(0)
      let field = wrapper.find('input')
      await wrapper.vm.$nextTick()
      expect(field.element.value).toEqual('')
      expect(wrapper.vm.model).toBeNull()
    })
    test('when value property is set, input element is not empty and model is not null', async () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: '/terms',
          value: '1',
          autocomplete: false
        }
      })
      await wrapper.vm.fetch()
      expect(mock.history.get[0].params['filter[id]']).toEqual('1')
      expect(mock.history.get[0].params['status']).toEqual(1)
      expect(mock.history.get[0].url).toEqual('/terms')
      const field = wrapper.find('input')
      await wrapper.vm.$nextTick()
      await new Promise(resolve => requestAnimationFrame(resolve))
      expect(field.element.value).toEqual('John Smith')
      expect(wrapper.vm.model).toEqual({ id: 1, name: 'John Smith', uuid: 1, other_field: 'John Smith' })
    })
    test('when value property and result id key are set, input element is not empty, model is not null and fired param is filter[uuid]', async () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: '/uuid',
          value: '1',
          resultsIdKey: 'uuid',
          autocomplete: false
        }
      })
      await wrapper.vm.$nextTick()
      await wrapper.vm.fetch()
      expect(mock.history.get[0].params['filter[uuid]']).toEqual('1')
      expect(mock.history.get[0].params['status']).toEqual(1)
      expect(mock.history.get[0].url).toEqual('/uuid')
      const field = wrapper.find('input')
      await wrapper.vm.$nextTick()
      expect(field.element.value).toEqual('John Smith')
      expect(wrapper.vm.model).toEqual({ id: 1, name: 'John Smith', uuid: 1, other_field: 'John Smith' })
    })
    test('dropdown items show the checkbox, if "multiple" option is set', async () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: '/terms',
          multiple: true,
          autocomplete: false
        }
      })
      const field = wrapper.find('input')
      field.element.value = 'John'
      field.trigger('input')
      const vm = wrapper.vm
      expect(vm.term).toEqual('John')
      await vm.fetch(vm.term)
      await vm.$nextTick()
      const checkboxElement = wrapper.find('input[type=checkbox]')
      expect(checkboxElement.exists()).toBe(true)
    })
    test('dropdown items not show the checkbox, if "multiple" option is not set', async () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: '/terms',
          autocomplete: false
        }
      })
      let field = wrapper.find('input')
      field.element.value = 'John'
      field.trigger('input')
      const vm = wrapper.vm
      expect(vm.term).toEqual('John')
      await vm.fetch(vm.term)
      await vm.$nextTick()
      const checkboxElement = wrapper.find('input[type=checkbox]')
      expect(checkboxElement.exists()).toBe(false)
    })
    test('if value and multiple is set, model is not null', async () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: '/terms',
          value: FIXTURE_ITEMS,
          multiple: true,
          autocomplete: false
        }
      })
      const vm = wrapper.vm
      await vm.fetch(vm.term)
      await vm.$nextTick()
      expect(mock.history.get[0].params['filter[id]']).toEqual(FIXTURE_ITEMS.map(item => item.id))
      expect(mock.history.get[0].params['status']).toEqual(1)
      expect(mock.history.get[0].url).toEqual('/terms')
      expect(wrapper.vm.model).toEqual(FIXTURE_ITEMS)
    })
    test('when notSelection and multiple is set, input value is null', (done) => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: '/terms',
          value: FIXTURE_ITEMS,
          multiple: true,
          notSelection: true
        }
      })
      setTimeout(() => {
        let field = wrapper.find('input')
        expect(field.element.value).toEqual('')
        done()
      }, 301)
    })
  })
  describe('Computed', () => {
    let mock, localVue
    beforeEach(() => {
      const v = createLocalVue()
      localVue = v.localVue
      mock = v.apiMocked
      localVue.use(VueAxios, mock.axiosInstance)

      mock.onGet('/terms').reply(200, {
        data: FIXTURE_ITEMS
      })

      mock.ready()
    })
    afterEach(() => {
      mock.reset()
    })

    describe('isNoDataAllowed', () => {
      test('is false by default', () => {
        const wrapper = shallowMount(Component, {
          localVue
        })
        expect(wrapper.vm.isNoDataAllowed).toBe(false)
      })

      test('is false with showNoData set to true', () => {
        const wrapper = shallowMount(Component, {
          localVue,
          propsData: {
            showNoData: true
          }
        })
        expect(wrapper.vm.isNoDataAllowed).toBe(false)

        wrapper.setData({ model: '' })
        expect(wrapper.vm.isNoDataAllowed).toBe(false)

        wrapper.setData({ model: null })
        wrapper.setData({ term: '' })
        expect(wrapper.vm.isNoDataAllowed).toBe(false)
      })

      test('is true when showNoData is true and model is set', () => {
        const wrapper = shallowMount(Component, {
          localVue,
          propsData: {
            showNoData: true
          }
        })

        wrapper.setData({ model: 'set ot something' })
        expect(wrapper.vm.isNoDataAllowed).toBe(true)
      })

      test('is true when showNoData is true and term is set', () => {
        const wrapper = shallowMount(Component, {
          localVue,
          propsData: {
            showNoData: true
          }
        })

        wrapper.setData({ term: 'set ot something' })
        expect(wrapper.vm.isNoDataAllowed).toBe(true)
      })
    })

    test('items (behavior)', (done) => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: '/terms'
        }
      })
      let field = wrapper.find('input')
      field.element.value = 'Bob'
      field.trigger('input')
      clear()
      setTimeout(() => {
        expect(wrapper.vm.items).toEqual([
          { ...FIXTURE_ITEMS[0], label: 'John Smith' },
          { ...FIXTURE_ITEMS[1], label: 'Bob Loblaw' },
          { ...FIXTURE_ITEMS[2], label: 'Mario Brother' }
        ])
        done()
      }, 301)
    })
    test('items (unit)', () => {
      const wrapper = shallowMount(Component)
      wrapper.setData({ results: FIXTURE_ITEMS })
      expect(wrapper.vm.items).toEqual([
        { ...FIXTURE_ITEMS[0], label: 'John Smith' },
        { ...FIXTURE_ITEMS[1], label: 'Bob Loblaw' },
        { ...FIXTURE_ITEMS[2], label: 'Mario Brother' }
      ])

      wrapper.setData({ results: FIXTURE_ITEMS, resultsTextKey: 'id' })
      expect(wrapper.vm.items).toEqual([
        { ...FIXTURE_ITEMS[0], label: 1 },
        { ...FIXTURE_ITEMS[1], label: 2 },
        { ...FIXTURE_ITEMS[2], label: 3 }
      ])

      wrapper.setData({ results: null, resultsTextKey: 'name' })
      expect(wrapper.vm.items).toEqual([])
    })
  })
  describe('Methods', () => {
    const originalError = console.error
    let localVue
    beforeEach(() => {
      const v = createLocalVue({
        apiMocked,
        apiMockRoutes: [
          {
            path: '/terms',
            GET: [200, { data: FIXTURE_ITEMS }]
          }
        ]
      })
      localVue = v.localVue
      localVue.use(VueAxios, apiMocked.axiosInstance)
    })

    afterEach(() => (console.error = originalError))

    describe('fetchWithIdKey()', () => {
      test('console.error on Vue Axios plugin not installed', async () => {
        console.error = jest.fn()
        const wrapper = shallowMount(Component, { localVue: createLocalVue({ apiMocked }).localVue })
        await wrapper.vm.fetchWithIdKey('id')
        expect(console.error).toHaveBeenCalledWith('FSearchSimple cannot fetch without vue-axios plugin installed')
      })
      test('does not fetch if value is nil', async () => {
        const wrapper = shallowMount(Component, { localVue })
        await wrapper.vm.fetchWithIdKey(null)
        expect(apiMocked.history.get).toHaveLength(0)
      })
    })
    test('termUpdate() change term value', () => {
      const wrapper = shallowMount(Component)
      const fetchMock = jest.fn()
      wrapper.vm.fetch = fetchMock
      wrapper.vm.termUpdate({ target: { value: 'test' } })
      expect(wrapper.vm.term).toBe('test')
    })
    test('resetTerm() reset term value', () => {
      const wrapper = shallowMount(Component)
      const fetchMock = jest.fn()
      wrapper.vm.fetch = fetchMock
      wrapper.vm.termUpdate({ target: { value: 'test' } })
      wrapper.vm.resetTerm()
      expect(wrapper.vm.term).toBe('')
    })

    test('cancelSelected() cancel the selected item', async () => {
      const wrapper = shallowMount(Component)
      wrapper.setData({ model: FIXTURE_ITEMS })
      wrapper.vm.cancelSelected(FIXTURE_ITEMS[0].id)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.model).toEqual([ { ...FIXTURE_ITEMS[1] }, { ...FIXTURE_ITEMS[2] } ])
    })
    describe('fetch()', () => {
      test('does not fetch on the endpoint when argument is null', (done) => {
        const wrapper = shallowMount(Component, {
          localVue,
          propsData: {
            url: '/should-not-be-here'
          }
        })
        wrapper.vm.fetch(null)
        setTimeout(() => {
          expect(apiMocked.history.get).toHaveLength(0)
          done()
        }, 301)
      })
      test('does not fetch on the endpoint when argument is the same as lastSearchTerm', (done) => {
        const wrapper = shallowMount(Component, {
          localVue,
          propsData: {
            url: '/should-not-be-here'
          }
        })
        wrapper.setData({ lastSearchTerm: 'hi' })
        wrapper.vm.fetch('hi')
        setTimeout(() => {
          expect(apiMocked.history.get).toHaveLength(0)
          done()
        }, 301)
      })
    })
  })
})
