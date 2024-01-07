import { Schema, model} from 'mongoose';

type TProduct = {
    name: string;
    currentPrice: number,
}

const productSchema = new Schema<TProduct>({
    name: { type: String, required: true },
    currentPrice: { type: Number, required: true },
});

export default model<TProduct>('Product', productSchema, 'Products');
