import {Metadata} from "next";

import {H1, H2, P} from "@/components/typography";
import getProducts from "@/app/(site)/loja/_actions/get-products.action";
import ProductItem from "@/app/(site)/loja/_components/product-item";
import Pagination from "@/components/pagination";
import {Suspense} from "react";


export default async function StorePage(props: { searchParams: Promise<Record<string, string>> }) {
    const searchParams = await props.searchParams;
    const products = await getProducts(+(searchParams.page ?? '1'));

    return (
        <div className={""}>
            <H1>Loja</H1>
            <div className={"my-4"}>
                <H2>Confira nossos produtos</H2>
                <P>Comprando nossos produtos você está ajudando os projetos e progamas do Instituto.</P>
            </div>
            <div className={"grid grid-cols-1 gap-4 mb-8 md:grid-cols-3"}>
                {(products?.docs ?? []).map(product => (<ProductItem key={product.id} product={product}/>))}
            </div>
            <div className={"w-full flex justify-center mb-8"}>
                <Suspense>
                    <Pagination
                        page={products?.page ?? 1}
                        totalPages={products?.totalPages ?? 1}
                        hasPrevious={!!products?.hasPrevPage}
                        hasNext={!!products?.hasNextPage}
                    />
                </Suspense>
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: "Loja / IPE - Inclusão Pelo Esporte"
}