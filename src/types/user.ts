type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
};

type UserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
};

type GeoLocation = {
  lat: string;
  lng: string;
};

type UserCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type { User, UserAddress, GeoLocation, UserCompany };
