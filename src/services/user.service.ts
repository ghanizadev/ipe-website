import {APIService} from "@/services/api.service";

export default class UserService extends APIService<UserDTO> {
    constructor() {
        super('users');
    }
}