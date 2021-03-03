export interface IImage {
    id: number
    productId: number;
    createdAt: string;
    updatedAt: string;
    width: number;
    height: number;
    src: string;
}

export interface IProduct {
    title: string
    bodyHtml: string
    vendor: string
    productType: string
    createdAt: string
    handle: string
    publishedScope: string
    tags: string;
    image: IImage;
}