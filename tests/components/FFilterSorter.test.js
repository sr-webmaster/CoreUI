import { mount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FFilterSorter.vue'

describe('Filter Sorter', () => {
  describe('Snapshots', () => {
    test('default', () => {
      const wrapper = mount(Component)
      expect(wrapper.element).toMatchSnapshot()
    })

    test('Slot expanded', async () => {
      const wrapper = mount(Component, {
        slots: {
          expanded: '<div class="slot" />'
        }
      })
      expect(wrapper.find('.v-btn__content').text()).toContain('More Filters')
      wrapper.vm.toggleExpanded()
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.v-btn__content').text()).toContain('Less Filters')
    })
  })
  describe('Properties', () => {
    describe('flat-container', () => {
      test('defaults to being raised (the default for V-Cards)', () => {
        const wrapper = mount(Component)
        expect(wrapper.classes('v-card')).toEqual(true)
        expect(wrapper.classes('v-card--flat')).toEqual(false)
      })
      test('when set will place the v-card--flat', () => {
        const wrapper = mount(Component, {
          propsData: {
            flatContainer: true
          }
        })
        expect(wrapper.classes('v-card')).toEqual(true)
        expect(wrapper.classes('v-card--flat')).toEqual(true)
      })
    })
  })
  describe('Watch', () => {
    test('expanded', async () => {
      const wrapper = mount(Component, {
        propsData: {
          expanded: false
        }
      })
      wrapper.setProps({ expanded: true })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isExpanded).toEqual(true)
    })
  })
  describe('Methods', () => {
    test('clear', () => {
      const wrapper = mount(Component)
      wrapper.vm.term = 'something'
      wrapper.vm.clear()
      expect(wrapper.vm.term).toEqual('')
      expect(wrapper.emitted('clear')).toBeTruthy()
    })
    test('collapse', () => {
      const wrapper = mount(Component)
      wrapper.vm.isExpanded = true
      wrapper.vm.collapse()
      expect(wrapper.vm.isExpanded).toEqual(false)
      expect(wrapper.emitted('collapsed')).toBeTruthy()
    })
    test('expand', () => {
      const wrapper = mount(Component)
      wrapper.vm.isExpanded = false
      wrapper.vm.expand()
      expect(wrapper.vm.isExpanded).toEqual(true)
      expect(wrapper.emitted('expanded')).toBeTruthy()
    })
    test('toggleExpanded', () => {
      const wrapper = mount(Component)
      wrapper.vm.isExpanded = false
      wrapper.vm.toggleExpanded()
      expect(wrapper.vm.isExpanded).toEqual(true)
      expect(wrapper.emitted('expanded')).toBeTruthy()
      wrapper.vm.toggleExpanded()
      expect(wrapper.vm.isExpanded).toEqual(false)
      expect(wrapper.emitted('collapsed')).toBeTruthy()
    })
    test('getRunParams', () => {
      const wrapper = mount(Component)
      wrapper.vm.term = 'some'
      wrapper.vm.sort = 'thing'
      expect(wrapper.vm.getRunParams()).toEqual({
        term: 'some',
        orderBy: 'thing'
      })
    })
    test('run', done => {
      const wrapper = mount(Component)
      wrapper.vm.term = 'some'
      wrapper.vm.sort = 'thing'
      wrapper.vm.run()
      setTimeout(() => {
        expect(wrapper.emitted('run')).toBeTruthy()
        expect(wrapper.emitted('run')[0][0]).toEqual({
          term: 'some',
          orderBy: 'thing'
        })
        done()
      }, 501)
    })
    test('termChange', () => {
      const wrapper = mount(Component)
      wrapper.vm.termChange('something')
      expect(wrapper.vm.term).toEqual('something')
    })
  })
  describe('CSS Names', () => {
    test('follows FreshinUp BEM standards', () => {
      const wrapper = mount(Component)
      expect(wrapper.classes('f-filter-sorter')).toEqual(true)
      expect(wrapper.exists('.f-filter-sorter__main-layout')).toEqual(true)
      expect(wrapper.exists('.f-filter-sorter__sortable-select')).toEqual(true)
    })
  })
})
