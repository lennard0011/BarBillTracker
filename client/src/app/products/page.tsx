type newProduct = {
    name: string,
    priceInCents: number,
}

type Product = newProduct & { id: string };

const initialNewProduct = {
    name: "",
    priceInCents: 0,
}

export default function Products() {
    
}