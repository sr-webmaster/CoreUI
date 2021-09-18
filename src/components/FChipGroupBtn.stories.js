import { storiesOf } from '@storybook/vue'
import FChipGroupBtn from './FChipGroupBtn.vue'
import { CORE } from '../../.storybook/categories'
import { FIXTURE_UI_FCHIPGROUP_TAGS } from '@freshinup/core-ui/tests/__data__/FChipGroup/tags'

storiesOf(`${CORE}|Chip Group Button`, module).add('default', () => ({
  components: { FChipGroupBtn },
  props: {
    selected: [],
    tags: {
      type: Array,
      default: FIXTURE_UI_FCHIPGROUP_TAGS
    }
  },
  template: `
      <v-container>
        <v-layout mb-5>
          <v-flex md4>
            <f-chip-group-btn :tags="tags" :selected="selected" title="This is with a title" titleIcon="fa-user" />
          </v-flex>
        </v-layout column>
      </v-container>
    `
}))
