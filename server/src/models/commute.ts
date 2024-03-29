import { Schema, model} from 'mongoose';

export type Commute = {
    _id: string;
    startDateTime: Date;
    endDateTime: Date;
}

const commuteSchema = new Schema({
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date },
});

export const CommuteModel = model('Commute', commuteSchema);
