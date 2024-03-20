import { Commute, CommuteModel } from "../models/commute";

type GetCommuteDto = {
    id: string;
    startDateTime: Date;
    endDateTime: Date | null;
    durationInSeconds: number | null;
}

class CommuteService {
    async get(): Promise<GetCommuteDto[]>;
    async get(id: string): Promise<GetCommuteDto | null>;
    async get(id?: string): Promise<GetCommuteDto | GetCommuteDto[] | null> {
        if (id) {
            const commute = await CommuteModel.findById(id);
            if (!commute) return null;
            return mapCommuteToDto(commute.toObject());
        }
        const commutes = await CommuteModel.find();        
        return commutes.map((commute) => commute.toObject() as Commute).map(mapCommuteToDto);
    }

    async getOpenCommute(): Promise<GetCommuteDto | null> {
        const commute = await CommuteModel.findOne({ endDateTime: null });
        if (!commute) return null;
        return mapCommuteToDto(commute.toObject());
    }

    async create(): Promise<string> {
        const openCommute = await this.getOpenCommute();
        if (openCommute) throw new Error("There is already an open commute");
        
        const startDateTime = new Date();
        const createdCommute = await CommuteModel.create({ startDateTime, endDateTime: null });
        return createdCommute.id;
    }

    async delete(id: string): Promise<void> {
        await CommuteModel.findByIdAndDelete(id);
    }

    async closeCommute(): Promise<void> {
        await CommuteModel.updateOne({ endDateTime: null }, { endDateTime: new Date() }).orFail();
    }
}

const mapCommuteToDto = (commute: Commute): GetCommuteDto => {
    return { 
        id: commute._id, 
        startDateTime: commute.startDateTime, 
        endDateTime: commute.endDateTime ?? null, 
        durationInSeconds: calculateDuration(commute.startDateTime, commute.endDateTime)
    };
}

const calculateDuration = (startDateTime: Date | null, endDateTime: Date | null): number | null => {
    if (!startDateTime) return null;
    if (!endDateTime) return (new Date().getTime() - startDateTime.getTime()) / 1000;
    return (endDateTime.getTime() - startDateTime.getTime()) / 1000
}

export default CommuteService;
