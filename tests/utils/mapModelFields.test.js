import { shallowMount } from '@vue/test-utils'
import mapModelFields from '@/utils/mapModelFields'

const mockDeal = {
  name: 'Deal',
  age: 1,
  customer: {
    uuid: '123',
    name: 'User'
  }
}

const mockValueDefaultVue = {
  props: { value: { type: Object, default: () => ({}) } }
}

const mockValueDealVue = {
  model: { prop: 'deal', event: 'change' },
  props: { deal: { type: Object, default: () => ({}) } },
  methods: { emitChange: () => {} }
}

describe('Mappings', () => {
  test('Computeds Created - Default model', () => {
    const wrapper = shallowMount({
      ...mockValueDefaultVue,
      computed: {
        ...mapModelFields([ 'name', 'age' ])
      }
    }, {
      propsData: { value: mockDeal }
    })
    expect(wrapper.vm.name).toEqual('Deal')
    expect(wrapper.vm.age).toEqual(1)
  })
  test('Computeds Created - Named model', () => {
    const wrapper = shallowMount({
      ...mockValueDealVue,
      computed: {
        ...mapModelFields([ 'name', 'age' ], mockValueDealVue.model)
      }
    }, {
      propsData: { deal: mockDeal }
    })
    expect(wrapper.vm.name).toEqual('Deal')
    expect(wrapper.vm.age).toEqual(1)
  })
  test('Change Event Emitted', () => {
    const wrapper = shallowMount({
      ...mockValueDealVue,
      computed: {
        ...mapModelFields([ 'name', 'age' ], mockValueDealVue.model)
      }
    },
    {
      propsData: { deal: mockDeal }
    })
    var spy = jest.spyOn(wrapper.vm, 'emitChange')
    wrapper.vm.age = 2
    expect(spy).toHaveBeenCalledWith({ age: 2 })
  })
  test('Change Event Skipped on non changes', () => {
    const wrapper = shallowMount({
      ...mockValueDealVue,
      computed: {
        ...mapModelFields([ 'name', 'age' ], mockValueDealVue.model)
      }
    },
    {
      propsData: { deal: mockDeal }
    })
    var spy = jest.spyOn(wrapper.vm, 'emitChange')
    wrapper.vm.age = 1
    expect(spy).not.toHaveBeenCalled()
  })
})
