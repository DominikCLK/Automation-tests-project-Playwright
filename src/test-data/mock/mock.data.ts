export const mockedApiFullResponse = {
  cartItems: [
    {
      product: {
        id: 24,
        name: 'Shaver',
        price: 80,
        icon: '🪒',
      },
      quantity: 2,
      subtotal: 160,
    },
    {
      product: {
        id: 29,
        name: 'Conditioner',
        price: 4,
        icon: '🧴',
      },
      quantity: 10,
      subtotal: 40,
    },
  ],
};

export const mockedApiResponseZeroQuantityAndSubtotal = {
  cartItems: [
    {
      product: {
        id: 24,
        name: 'Shaver',
        price: 80,
        icon: '🪒',
      },
      quantity: 0,
      subtotal: 0,
    },
    {
      product: {
        id: 29,
        name: 'Conditioner',
        price: 4,
        icon: '🧴',
      },
      quantity: 10,
      subtotal: 40,
    },
  ],
};

export const mockedApiResponseMissingProductData = {
  cartItems: [
    {
      product: {},
      quantity: 2,
      subtotal: 160,
    },
    {
      product: {
        id: 29,
        name: 'Conditioner',
        price: 4,
        icon: '🧴',
      },
      quantity: 10,
      subtotal: 40,
    },
  ],
};

export const mockedUserData = {
  userId: 'U2636',
  username: 'selinnelson235',
  firstName: 'John',
  lastName: 'Doe',
  email: 'selinnelson235@test.test.com',
  phone: '+845-777-150-7395',
  dateOfBirth: '1980-07-06T22:00:00.000Z',
  profilePicture: '1cfe385c-571f-4047-a717-3df0f4031590.jpg',
  address: {
    street: '566 Lake Street',
    city: 'Hub City',
    postalCode: 92115,
    country: 'South Africa',
  },
  lastLogin: '2022-02-14T23:00:00.000Z',
  accountCreated: '2019-03-21T23:00:00.000Z',
  status: 0,
};

export const mockedWeatherApiBaseResponse = [
  {
    date: '2024-12-13',
    city: 'Warsaw',
    temperature: 27,
    temperatureMin: 27,
    temperatureMax: 30,
    humidity: '71%',
    dayLength: 15,
    windSpeed: 90,
    windSpeedRange: '40+ km/h',
  },
  {
    date: '2024-12-12',
    city: 'Warsaw',
    temperature: 21,
    temperatureMin: -6,
    temperatureMax: 42,
    humidity: '32%',
    dayLength: 15,
    windSpeed: 4,
    windSpeedRange: '0-5 km/h',
  },
  {
    date: '2024-12-11',
    city: 'Warsaw',
    temperature: 20,
    temperatureMin: 8,
    temperatureMax: 31,
    humidity: '62%',
    dayLength: 15,
    windSpeed: 0,
    windSpeedRange: '0-5 km/h',
  },
];

export const mockedWeatherApiOneDayResponse = [
  {
    date: '2024-12-10',
    city: 'Warsaw',
    temperature: 34,
    temperatureMin: 28,
    temperatureMax: 41,
    humidity: '36%',
    dayLength: 19,
    windSpeed: 0,
    windSpeedRange: '0-5 km/h',
  },
];
