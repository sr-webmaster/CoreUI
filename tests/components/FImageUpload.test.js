import { shallowMount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FImageUpload.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    propsData: {
      srcDefault: 'https://via.placeholder.com/800x600.png',
      src: 'https://placeimg.com/800/600/people?t=1551113577547',
      fieldName: 'file',
      maxFileSize: 100
    },
    mocks: {},
    stubs: {},
    methods: {}
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Component', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  test('check onRemove() image', () => {
    wrapper.vm.onRemove()
    expect(wrapper.vm.src).toBeNull()
  })

  test('more than max file size display error', () => {
    const wrapper = shallowMount(Component, {
      propsData: {
        value: { name: 'mock.txt', src: '' },
        maxFileSize: 1
      }
    })
    wrapper.vm.onChange('')
    expect(wrapper.vm.errorDialog).toBeTruthy()
    expect(wrapper.vm.errorText).toEqual('error occur')
  })
})
