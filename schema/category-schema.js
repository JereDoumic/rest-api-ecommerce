import z from "zod";

const categorySchema = z.object({
    category: z.string({
        invalid_type_error: "Category must be a string",
        required_error: "Category is required"
    })
});

export function validateCategory(input){
    return categorySchema.safeParse(input);
}

export function validatePartialCategory(input){
    return categorySchema.partial().safeParse(input);
}
