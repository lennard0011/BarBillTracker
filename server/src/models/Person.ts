import { Schema, model} from 'mongoose';

export type TPerson = {
    firstname: string;
    lastname: string;
    email: string;
}

const personSchema = new Schema<TPerson>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
});

export const PersonModel = model<TPerson>('Person', personSchema, 'People');
