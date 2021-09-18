export const FIXTURE_USER_PERMISSIONS = {
  items: {
    data: {
      'properties': {
        'status': {
          'label': 'Status',
          'rules': ['required'],
          'readonly': false
        },
        'first_name': {
          'label': 'First Name',
          'rules': ['required'],
          'readonly': false
        },
        'last_name': {
          'label': 'Last Name',
          'rules': ['required'],
          'readonly': false
        },
        'title': {
          'label': 'Title',
          'rules': [],
          'readonly': true
        },
        'industry_roles': {
          'label': 'Industry Roles',
          'rules': [],
          'readonly': false
        },
        'email': {
          'label': 'Email',
          'rules': ['required', 'email'],
          'readonly': false
        },
        'level': {
          'label': 'BUS Role',
          'rules': ['required'],
          'readonly': false
        },
        'type': {
          'label': 'User Type',
          'rules': ['required'],
          'readonly': false
        },
        'office_phone': {
          'label': 'Office Phone',
          'rules': [],
          'readonly': true
        },
        'mobile_phone': {
          'label': 'Mobile Phone',
          'rules': [],
          'readonly': true
        },
        'street': {
          'label': 'Street address',
          'rules': [],
          'readonly': true
        },
        'street_2': {
          'label': 'Street address 2',
          'rules': [],
          'readonly': true
        },
        'city': {
          'label': 'City',
          'rules': [],
          'readonly': false
        },
        'country_id': {
          'label': 'Country',
          'rules': [],
          'readonly': false
        },
        'post_code': {
          'label': 'Post Code',
          'rules': [],
          'readonly': false
        },
        'notes': {
          'label': 'Notes',
          'rules': [],
          'readonly': false
        }
      }
    }
  }
}

export const FIXTURE_USER_PERMISSIONS_ITEMS_EMPTY = {
  items: null
}

export const FIXTURE_USER_PERMISSIONS_DATA_EMPTY = {
  items: {
    data: null
  }
}
