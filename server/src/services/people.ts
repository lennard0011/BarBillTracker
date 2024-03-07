import {TPerson, PersonModel} from "../models/Person";

class PeopleService {
    async get(): Promise<TPerson[]>;
    async get(id: string): Promise<TPerson>;
    async get(id?: string): Promise<TPerson | TPerson[]>{
        const people = await PersonModel.find({_id: id});
        if (id) {
            return people[0] as TPerson;
        }
        return people as TPerson[];
    }
}

export default PeopleService;
