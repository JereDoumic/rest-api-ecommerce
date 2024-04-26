import z from "zod";

const userSchema = z.object({
    email: z.string({
        invalid_type_error: "Product title must be a string",
        required_error: "Product title is required"
    }).email(),
    password: z.string({
        invalid_type_error: "Product title must be a string",
        required_error: "Product title is required"
    }),
    userName: z.string({
        invalid_type_error: "Product title must be a string",
        required_error: "Product title is required"
    })
});

export function validateUser(input){
    return userSchema.safeParse(input);
}

export function validatePartialUser(input){
    return userSchema.partial().safeParse(input);
}