<template>
  <v-layout
    column
    justify-center
    fill-height
  >
    <v-layout
      row
      justify-center
      align-end
    >
      <slot :src="internalSrc">
        <v-img
          cover
          :src="internalSrc"
          aspect-ratio="1.33"
        />
      </slot>
    </v-layout>
    <v-layout
      row
      justify-center
    >
      <v-btn
        ref="filelauncher"
        color="primary"
        @click="launchFilePicker"
      >
        Change
      </v-btn>
      <v-btn
        v-if="hasImage"
        color="error"
        @click="removeImage"
      >
        Remove
      </v-btn>
    </v-layout>

    <input
      v-show="false"
      ref="file"
      type="file"
      :name="fieldName"
      @change="onFileChange($event.target.name, $event.target.files)"
    >
  </v-layout>
</template>

<script>
import isEmpty from 'lodash/isEmpty'

const MB = 1024 * 1024

export default {
  name: 'FImageUploader',
  model: {
    prop: 'value',
    event: 'onValueChange'
  },
  props: {
    srcDefault: {
      type: String,
      default: 'https://via.placeholder.com/800x600.png'
    },
    src: {
      type: String,
      default: null
    },
    fieldName: {
      type: String,
      default: 'file'
    },
    maxFileSize: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      internalSrc: this.src || this.srcDefault
    }
  },
  computed: {
    hasImage () {
      return !isEmpty(this.src) && this.internalSrc !== this.srcDefault
    },
    maxInBytes () {
      return MB * this.maxFileSize
    }
  },
  watch: {
    src (value) {
      this.internalSrc = value || this.srcDefault
    }
  },
  methods: {
    launchFilePicker () {
      this.$emit('pickercalled')
      this.$refs.file.click()
    },
    onFileChange (fieldName, file) {
      let imageFile = file[0]

      this.$emit('onValueChange', { name: imageFile.name, src: '' })
      // check if user actually selected a file
      if (file.length > 0) {
        let size = imageFile.size - this.maxInBytes
        if (!imageFile.type.match('image.*')) {
          // check whether the upload is an image
          this.$emit('error', 'Please choose an image file')
        } else if (size > 1) {
          // check whether the size is greater than the size limit
          this.$emit('error', 'Your file is too big! Please select an image under 100MB')
        } else {
          this.internalSrc = URL.createObjectURL(imageFile)
          let reader = new FileReader()
          reader.onload = () => {
            this.$emit('change', reader.result)
          }
          reader.readAsDataURL(imageFile) // base64 encoded
        }
      }
    },
    removeImage () {
      this.$refs.file.value = ''
      this.internalSrc = this.srcDefault
      this.$emit('remove')
      this.$emit('onValueChange', { name: '', src: '' })
    }
  }
}
</script>
