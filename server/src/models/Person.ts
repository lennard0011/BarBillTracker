import { Schema, model} from 'mongoose';

export type Person = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
}

const personSchema = new Schema<Person>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
});

export const PersonModel = model<Person>('Person', personSchema, 'People');
