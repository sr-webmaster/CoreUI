export const FIXTURE_USER = {
  id: 1,
  uuid: '2cd4ac03-b3e1-4bbf-9c60-232af78e72a7',
  company_id: 1,
  company_name: 'Laravel',
  status: 1,
  type: 1,
  level: 1,
  level_name: 'Platform Admin',
  first_name: 'Demo',
  last_name: 'Admin',
  name: 'Demo Admin',
  email: 'demoAdmin@example.com',
  mobile_phone: '321-123-1234',
  office_phone: '123-456-7890',
  notes: null,
  title: null,
  avatar: 'https://i.pravatar.cc/300',
  requested_company: null,
  company: {
    id: 1,
    uuid: '07b34004-738f-45a0-88e5-1c5958bc9eb0',
    created_at: '2019-06-29 04:12:23',
    status: 1,
    name: 'Laravel',
    address: '8342 Test Ave',
    address2: 'unit 15',
    city: 'Chicago',
    state: 'IL',
    zip: '60606',
    country: 'US',
    website: null,
    notes: null,
    members_count: null,
    teams_count: null,
    tags: [],
    logo: 'https://via.placeholder.com/800x600.png',
    company_types: []
  },
  last_login: '2019-07-02 23:32:29',
  has_admin_access: true,
  joined_at: '2019-06-29 04:12:23',
  addresses: [
    {
      street: '8342 Test Ave',
      street_2: 'unit 15',
      city: 'Chicago',
      country: {
        id: 1,
        name: 'US'
      },
      post_code: '60606',
      is_primary: true
    }
  ]
}

export const FIXTURE_USER_NO_AVATAR = {
  id: 1,
  uuid: '2cd4ac03-b3e1-4bbf-9c60-232af78e72a7',
  company_id: 1,
  company_name: 'Laravel',
  status: 1,
  type: 1,
  level: 1,
  level_name: 'Platform Admin',
  first_name: 'Demo',
  last_name: 'Admin',
  name: 'Demo Admin',
  email: 'demoAdmin@example.com',
  mobile_phone: '321-123-1234',
  office_phone: '123-456-7890',
  notes: null,
  title: null,
  avatar: '',
  requested_company: null,
  company: {
    id: 1,
    uuid: '07b34004-738f-45a0-88e5-1c5958bc9eb0',
    created_at: '2019-06-29 04:12:23',
    status: 1,
    name: 'Laravel',
    address: '8342 Test Ave',
    address2: 'unit 15',
    city: 'Chicago',
    state: 'IL',
    zip: '60606',
    country: 'US',
    website: null,
    notes: null,
    members_count: null,
    teams_count: null,
    tags: [],
    logo: 'https://via.placeholder.com/800x600.png',
    company_types: []
  },
  last_login: '2019-07-02 23:32:29',
  has_admin_access: true,
  joined_at: '2019-06-29 04:12:23',
  addresses: [
    {
      street: '8342 Test Ave',
      street_2: 'unit 15',
      city: 'Chicago',
      country: {
        id: 1,
        name: 'US'
      },
      post_code: '60606',
      is_primary: true
    }
  ]
}
