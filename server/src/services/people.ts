import {Person, PersonModel} from "../models/Person";

export type CreatePersonDto = {
    firstname: string;
    lastname: string;
    email: string;
}

export type UpdatePersonDto = {
    firstname?: string;
    lastname?: string;
    email?: string;
}

class PeopleService {
    async get(): Promise<Person[]>;
    async get(id: string): Promise<Person | null>;
    async get(id?: string): Promise<Person | Person[] | null>{
        if (id) {
            return await PersonModel.findById(id); 
        }
        return await PersonModel.find();;
    }

    async create(createPersonDto: CreatePersonDto): Promise<string> {
        const createdPerson = await PersonModel.create(createPersonDto);
        return createdPerson.id;
    }

    async delete(id: string): Promise<void> {
        await PersonModel.findByIdAndDelete(id);
    }

    async update(id: string, updatePersonDto: UpdatePersonDto): Promise<void> {
        await PersonModel.findByIdAndUpdate(id, updatePersonDto);
    }
}

export default PeopleService;
