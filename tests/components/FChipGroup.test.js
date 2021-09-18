import { mount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FChipGroup.vue'
import { FIXTURE_UI_FCHIPGROUP_TAGS } from '@freshinup/core-ui/tests/__data__/FChipGroup/tags'

describe('FChipGroup', () => {
  describe('Visuals', () => {
    it('snapshot default', async () => {
      const wrapper = mount(Component, {
        propsData: {
          selected: [],
          tags: FIXTURE_UI_FCHIPGROUP_TAGS
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
    it('snapshot with title', async () => {
      const wrapper = mount(Component, {
        propsData: {
          selected: [],
          tags: FIXTURE_UI_FCHIPGROUP_TAGS,
          title: 'This is with a title',
          titleClass: 'grey--text text-uppercase font-weight-bold'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
  describe('Property Change', () => {
    it('selected', async () => {
      const initialTags = [
        FIXTURE_UI_FCHIPGROUP_TAGS[0],
        FIXTURE_UI_FCHIPGROUP_TAGS[1],
        FIXTURE_UI_FCHIPGROUP_TAGS[2]
      ]

      const changedTags = [
        FIXTURE_UI_FCHIPGROUP_TAGS[0],
        FIXTURE_UI_FCHIPGROUP_TAGS[1]
      ]

      const wrapper = mount(Component, {
        propsData: {
          selected: initialTags,
          tags: FIXTURE_UI_FCHIPGROUP_TAGS
        }
      })

      expect(wrapper.vm.selectedTagsData).toEqual(initialTags)

      wrapper.setProps({ selected: changedTags })

      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.selectedTagsData).toEqual(changedTags)
    })
  })
  describe('Methods', () => {
    describe('changeTags()', () => {
      test('adds selected and emits "input" with selectedTags', () => {
        const wrapper = mount(Component, {
          propsData: {
            selected: [],
            tags: FIXTURE_UI_FCHIPGROUP_TAGS
          }
        })
        wrapper.vm.changeTags(FIXTURE_UI_FCHIPGROUP_TAGS[0])
        expect(wrapper.vm.selectedTagsData).toEqual([FIXTURE_UI_FCHIPGROUP_TAGS[0]])
        // assert event has been emitted
        expect(wrapper.emitted('input')).toBeTruthy()
        expect(wrapper.emitted('input')).toHaveLength(1)
        expect(wrapper.emitted('input')[0]).toEqual([[FIXTURE_UI_FCHIPGROUP_TAGS[0]]])
        wrapper.vm.changeTags(FIXTURE_UI_FCHIPGROUP_TAGS[1])
        expect(wrapper.emitted('input')).toHaveLength(2)
        expect(wrapper.emitted('input')[1]).toEqual([[FIXTURE_UI_FCHIPGROUP_TAGS[0], FIXTURE_UI_FCHIPGROUP_TAGS[1]]])
      })
      test('removes previously selected and emits "input" with selectedTags', () => {
        const wrapper = mount(Component, {
          propsData: {
            selected: [FIXTURE_UI_FCHIPGROUP_TAGS[0]],
            tags: FIXTURE_UI_FCHIPGROUP_TAGS
          }
        })
        wrapper.vm.changeTags(FIXTURE_UI_FCHIPGROUP_TAGS[0])
        expect(wrapper.vm.selectedTagsData).toEqual([])
        // assert event has been emitted
        expect(wrapper.emitted('input')).toBeTruthy()
        expect(wrapper.emitted('input')).toHaveLength(1)
        expect(wrapper.emitted('input')[0]).toEqual([[]])
      })
      describe('isSelected()', () => {
        test('returns true', () => {
          const wrapper = mount(Component, {
            propsData: {
              selected: [FIXTURE_UI_FCHIPGROUP_TAGS[0]],
              tags: FIXTURE_UI_FCHIPGROUP_TAGS
            }
          })
          expect(wrapper.vm.isSelected(FIXTURE_UI_FCHIPGROUP_TAGS[0].id)).toEqual(true)
        })
      })
    })
  })
})
