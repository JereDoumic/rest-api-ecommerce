import z from "zod";

const productSchema = z.object({
    id_category: z.number().int(),
    title: z.string({
        invalid_type_error: "Product title must be a string",
        required_error: "Product title is required"
    }),
    description: z.string({
        invalid_type_error: "Product title must be a string",
        required_error: "Product title is required"
    }),
    price: z.number(),
    image: z.string().url({
        message: "image must be a valid URL"
    })
});

export function validateProduct(input){
    return productSchema.safeParse(input);
}

export function validatePartialProduct(input){
    return productSchema.partial().safeParse(input);
}
