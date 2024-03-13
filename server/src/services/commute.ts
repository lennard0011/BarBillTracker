import { Commute, CommuteModel } from "../models/commute";

class CommuteService {
    async get(): Promise<Commute[]>;
    async get(id: string): Promise<Commute | null>;
    async get(id?: string): Promise<Commute | Commute[] | null>{
        if (id) {
            return await CommuteModel.findById(id); 
        }
        return await CommuteModel.find();
    }

    async getOpenCommute(): Promise<Commute | null> {
        return await CommuteModel.findOne({ endDateTime: null });
    }

    async create(): Promise<string> {
        const startDateTime = new Date();
        const createdCommute = await CommuteModel.create({ startDateTime });
        return createdCommute.id;
    }

    async delete(id: string): Promise<void> {
        await CommuteModel.findByIdAndDelete(id);
    }

    async closeCommute(): Promise<void> {
        await CommuteModel.updateOne({ endDateTime: null }, { endDateTime: new Date() });
    }
}

export default CommuteService;
