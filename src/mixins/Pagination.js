export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    /**
     * Used as a part of the Pagination object (see https://vuetifyjs.com/en/components/data-tables)
     */
    descending: {
      type: Boolean,
      default: true
    },
    /**
     * Used as a part of the Pagination object (see https://vuetifyjs.com/en/components/data-tables)
     */
    page: {
      type: Number,
      default: 1
    },
    /**
     * Used as a part of the Pagination object (see https://vuetifyjs.com/en/components/data-tables)
     */
    rowsPerPage: {
      type: Number,
      default: 10
    },
    /**
     * Used as a part of the Pagination object (see https://vuetifyjs.com/en/components/data-tables)
     */
    sortBy: {
      type: String,
      default: null
    },
    /**
     * Used as a part of the Pagination object (see https://vuetifyjs.com/en/components/data-tables)
     */
    totalItems: {
      type: Number,
      default: 10
    },
    /**
     * The list of selectable Rows Per Page (see https://vuetifyjs.com/en/components/data-tables)
     */
    rowsPerPageItems: {
      type: Array,
      default: () => ([5, 10, 15, 25, 30, 50])
    }
  },
  computed: {
    pagination: {
      get () {
        return {
          descending: this.descending,
          rowsPerPage: this.rowsPerPage,
          page: this.page,
          sortBy: this.sortBy,
          totalItems: this.totalItems,
          totalPages: Math.ceil(this.totalItems / this.rowsPerPage)
        }
      },
      set (value) {
        this.$emit('paginate', value)
      }
    }
  },
  watch: {
    isLoading: {
      handler () {
        if (this.isLoading) {
          this.pagination.totalPages = Math.ceil(this.totalItems / this.rowsPerPage)
        }
      }
    }
  },
  methods: {
    onPageChange (value) {
      this.pagination = { ...this.pagination, page: value }
    },
    onRowsPerPageChange (value) {
      this.pagination = { ...this.pagination, rowsPerPage: value }
    }
  }
}
