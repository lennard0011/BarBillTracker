import { Schema, model} from 'mongoose';

enum personRole {
    Landwerk,
    Waterwerk,
    Groendienst,
    Ondersteuning,
    Stam
}

type TPerson = {
    firstname: string;
    lastname: string;
    email: string;
    role?: personRole;
    consumption: []
}

const personSchema = new Schema<TPerson>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: false },
});

export default model<TPerson>('Person', personSchema, 'People');
