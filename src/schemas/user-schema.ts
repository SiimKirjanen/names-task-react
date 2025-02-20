import { z } from "zod";

const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*$/;

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  website: z.string().refine((value) => urlRegex.test(value), {
    message: "Invalid website URL",
  }),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    suite: z.string().min(1, "Suite is required"),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(1, "Zipcode is required"),
    geo: z.object({
      lat: z.string().min(1, "Latitude is required"),
      lng: z.string().min(1, "Longitude is required"),
    }),
  }),
  company: z.object({
    name: z.string().min(1, "Company name is required"),
    catchPhrase: z.string().min(1, "Catch phrase is required"),
    bs: z.string().min(1, "Business BS is required"),
  }),
});

export { userSchema };
