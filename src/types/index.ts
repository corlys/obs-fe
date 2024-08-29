import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
});

export const userFormSchema = userSchema.omit({ id: true });
export const editUserFormSchema = userFormSchema.partial();

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof userFormSchema>;
export type EditUser = z.infer<typeof editUserFormSchema>;

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
