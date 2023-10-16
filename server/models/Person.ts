import { Schema, model} from 'mongoose';

enum personRole {
    Landwerk,
    Waterwerk,
    Groendienst,
    Ondersteuning,
    Stam
}

type TPerson = {
    firstName: string;
    lastName: string;
    email: string;
    role?: personRole;
}

const personSchema = new Schema<TPerson>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: false }
});

export default model<TPerson>('Person', personSchema);
