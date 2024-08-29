import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export const editUserSchema = userSchema.partial();

export type User = z.infer<typeof userSchema>;
export type EditUser = z.infer<typeof editUserSchema>;

// export interface User {
//  id: number;
//  name: string;
//  username: string;
//  email: string;
//  address: Address;
//  phone: string;
//  website: string;
//  company: Company;
//}

// export interface Address {
//  street: string;
//  suite: string;
//  city: string;
//  zipcode: string;
//  geo: Geo;
// }

// export interface Geo {
//  lat: string;
//  lng: string;
// }

// export interface Company {
//  name: string;
//  catchPhrase: string;
//  bs: string;
// }
