import { storiesOf } from '@storybook/vue'
import FChipGroup from './FChipGroup.vue'
import { CORE } from '../../.storybook/categories'
import { FIXTURE_UI_FCHIPGROUP_TAGS } from '@freshinup/core-ui/tests/__data__/FChipGroup/tags'

storiesOf(`${CORE}|Chip Group`, module)
  .add('default', () => ({
    components: { FChipGroup },
    props: {
      selected: [],
      tags: {
        type: Array,
        default: FIXTURE_UI_FCHIPGROUP_TAGS
      }
    },
    template: `
      <v-container>
        <v-layout>
          <v-flex md4>
            <f-chip-group :tags="tags" :selected="selected" />
          </v-flex>
        </v-layout column>
      </v-container>
    `
  }))
  .add('with title', () => ({
    components: { FChipGroup },
    props: {
      selected: [],
      tags: {
        type: Array,
        default: FIXTURE_UI_FCHIPGROUP_TAGS
      }
    },
    template: `
    <v-container>
      <v-layout>
        <v-flex md4>
          <f-chip-group :tags="tags" :selected="selected" title="This is with a title" />
        </v-flex>
      </v-layout column>
    </v-container>
    `
  }))
