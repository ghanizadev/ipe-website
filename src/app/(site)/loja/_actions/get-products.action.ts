"use server"

import {ProductService} from "@/services/product.service";

export default async function getProducts(page = 1) {
    const service = new ProductService();
    return service.findAll({page, limit: 6});
}