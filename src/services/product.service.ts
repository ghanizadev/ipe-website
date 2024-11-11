import {APIService} from "@/services/api.service";

export class ProductService extends APIService<ProductDTO> {
    constructor() {
        super('products');
    }
}