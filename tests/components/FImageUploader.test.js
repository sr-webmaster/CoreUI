import { shallowMount, mount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import Component from '~/components/FImageUploader.vue'

function MockFile (name, size, mimeType) {
  name = name || 'mock.txt'
  size = size || 1024
  mimeType = mimeType || 'application/pdf'

  function range (count) {
    let output = ''
    for (let i = 0; i < count; i++) {
      output += 'a'
    }
    return output
  }

  let blob = new Blob([range(size)], { type: mimeType })
  blob.lastModifiedDate = new Date()
  blob.name = name

  return blob
}

describe('FileUploader', () => {
  // Component instance "under test"
  let localVue, mock
  describe('Snapshots', () => {
    test('defaults', () => {
      const vue = createLocalVue()
      localVue = vue.localVue
      const wrapper = mount(Component, {
        localVue: localVue
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
  describe('Methods', () => {
    beforeEach(() => {
      const vue = createLocalVue()
      localVue = vue.localVue
      mock = vue.mock
      mock
        .onPost('core-ui/tmp-media').reply(200, 'mock url')
        .onAny().reply(config => {
          console.warn('No mock match for ' + config.url, config)
          return [404, {}]
        })
    })

    test('removeImage() clear file name and src', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          value: { name: 'test_name', src: '' }
        }
      })
      wrapper.vm.removeImage()
      expect(wrapper.emitted().onValueChange).toBeTruthy()
      const changeValue = wrapper.emitted().onValueChange[0]
      expect(changeValue[0].name).toEqual('')
    })

    test('onFileChange() change file name and src', async () => {
      global.URL.createObjectURL = jest.fn()
      const wrapper = shallowMount(Component, {
        propsData: {
          value: { name: '', src: '' }
        }
      })
      const file = new MockFile('image.png', null, 'image/png')

      await wrapper.vm.onFileChange(file.name, [file])

      wrapper.vm.internalSrc = URL.createObjectURL(file)
      let reader = new FileReader()
      reader.onload = () => {
        expect(wrapper.emitted().change).toBeTruthy()
        const changeValue = wrapper.emitted().change[0]
        expect(changeValue[0]).toEqual(reader.result)
      }
      reader.readAsDataURL(file)

      expect(wrapper.emitted().onValueChange).toBeTruthy()

      const changeValue = wrapper.emitted().onValueChange[0]
      expect(changeValue[0].name).toEqual('image.png')
    })

    test('check onRemove() image', async () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          value: { name: '', src: '' }
        }
      })
      const file = new MockFile()
      await wrapper.vm.onFileChange(file.name, [file])

      wrapper.vm.removeImage()
      expect(wrapper.vm.src).toBeNull()
    })

    test('check launchFilePicker() image', () => {
      const wrapper = mount(Component, {
        propsData: {
          value: { name: '', src: '' }
        }
      })

      wrapper.vm.launchFilePicker()
      expect(wrapper.emitted().pickercalled).toBeTruthy()
    })

    test('display on change image file', async () => {
      global.URL.createObjectURL = jest.fn()
      const wrapper = shallowMount(Component, {
        propsData: {
          value: { name: '', src: '' },
          maxFileSize: 1,
          internalSrc: ''
        }
      })
      const file = new MockFile('image.png', null, 'image/png')
      let reader = new FileReader()
      await reader.readAsDataURL(file) // base64 encoded
      await wrapper.vm.onFileChange(file.name, [file])
      const changeValue = wrapper.emitted().onValueChange[0]
      expect(changeValue[0].src).toEqual('')
    })

    test('display error choose image file', async () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          value: { name: '', src: '' },
          maxFileSize: 1,
          internalSrc: ''
        }
      })
      const file = new MockFile(null, 10 * 1024 * 1024, null)
      let reader = new FileReader()
      reader.readAsDataURL(file) // base64 encoded
      await wrapper.vm.onFileChange(file.name, [file])
      expect(wrapper.emitted().onValueChange).toBeTruthy()

      expect(wrapper.emitted().error).toBeTruthy()
      const changeValue = wrapper.emitted().onValueChange[0]
      const errorValue = wrapper.emitted().error[0]
      expect(changeValue[0].name).toEqual('mock.txt')
      expect(errorValue[0]).toEqual('Please choose an image file')
    })

    test('display error file size', async () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          value: { name: '', src: '' },
          maxFileSize: 1,
          internalSrc: ''
        }
      })
      const file = new MockFile('mock.png', 10 * 1024 * 1024, 'image/png')
      let reader = new FileReader()
      reader.readAsDataURL(file) // base64 encoded
      await wrapper.vm.onFileChange(file.name, [file])
      expect(wrapper.emitted().onValueChange).toBeTruthy()

      expect(wrapper.emitted().error).toBeTruthy()
      const changeValue = wrapper.emitted().onValueChange[0]
      const errorValue = wrapper.emitted().error[0]
      expect(changeValue[0].name).toEqual('mock.png')
      expect(errorValue[0]).toEqual('Your file is too big! Please select an image under 100MB')
    })
  })
})
