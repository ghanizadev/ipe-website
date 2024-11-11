import React from "react";
import Image from "next/image";
import {H3} from "@/components/typography";
import PrimaryButton from "@/components/button/primary-button";


type ProductItemProps = {
    product: ProductDTO;
};

export default function ProductItem({product}: ProductItemProps) {
    return (
        <div className={"text-center my-8"}>
            <div>
                {product.photos.map(({photo, description}) => {
                    return (
                        <div key={photo.id}>
                            <Image
                                src={photo.url}
                                alt={photo.altText ?? ''}
                                width={photo.width}
                                height={photo.height}
                            />
                            <small>{description}</small>
                        </div>
                    )
                })}
            </div>
            <H3>{product.name}</H3>
            <p className={"mb-4"}>R$ {product.price.toFixed(2).replace('.', ',')}</p>
            <PrimaryButton
                tag={'anchor'}
                target={"_blank"}
                rel={"noreferrer,noopener"}
                href={product.link}
            >
                Comprar
            </PrimaryButton>
        </div>
    )
}