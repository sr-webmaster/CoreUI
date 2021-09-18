<template>
  <v-layout column>
    <div class="subheading">
      Featured Image / Thumbnail
    </div>
    <f-image-uploader
      :src="src"
      :max-file-size="maxFileSize"
      @change="onChange"
      @remove="onRemove"
      @error="onError"
    >
      <template v-slot="slotProps">
        <v-img
          class="thumbnail"
          :src="slotProps.src"
          aspect-ratio="1.33"
        />
      </template>
    </f-image-uploader>
    <v-flex>Recommended size: 800 x 600</v-flex>

    <!-- error dialog displays any potential errors -->
    <v-dialog
      v-model="errorDialog"
      max-width="300"
    >
      <v-card>
        <v-card-text class="subheading">
          {{ errorText }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            flat
            @click="errorDialog = false"
          >
            Got it!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import FImageUploader from './FImageUploader'
const defaultImage = 'https://via.placeholder.com/800x600.png'
export default {
  name: 'FImageUpload',
  components: {
    FImageUploader
  },
  props: {
    src: {
      type: String,
      default: defaultImage
    },
    maxFileSize: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      errorDialog: null,
      errorText: ''
    }
  },
  methods: {
    onError (value) {
      this.errorDialog = true
      this.errorText = value
    },
    onRemove () {
      this.src = null
      this.$emit('remove')
    },
    onChange (file) {
      if (file === '') {
        this.onError('error occur')
      }
    }
  }
}
</script>
