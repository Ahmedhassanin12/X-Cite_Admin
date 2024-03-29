export interface Product {
    id?: string,
    name: string,
    brandName:string,
    description:string,
    quantity: number,
    price: number,
    discount:number,
    images: (string | File)[],
    sku:string,
    categoryName:string,
    seller:string,
    AddedBy?:string,
    imgsDescription?: string[],

    nameAR: string,
    brandNameAR:string,
    descriptionAR:string,
    categoryNameAR:string,
    sellerAR:string,

    // labtops
    touchScreen?:boolean,
    processor?:string,
    Ram?: number,
    displaySize?: string,
    OS?:string,
    type?: string,
    storage?: string,
    graphicsMemory?:string,
    color?:string,

    touchScreenAR?:string,
    processorAR?:string,
    RamAR?: number,
    displaySizeAR?: string,
    OSAR?:string,
    typeAR?: string,
    storageAR?: string,
    graphicsMemoryAR?:string,
    colorAR?:string,
    // hardType?:string,

    // tablets
    rearCamera?:string,
    connectivity?:string,
    rearCameraAR?:string,
    connectivityAR?:string,
    // processor?:string,
    // Ram?:number,
    // displaySize?:string,
    // OS?:string,
    // storage?:string,
    // color?:string,
    
    // Mobiles
    GPS?:boolean,
    SIMCount?:number,
    GPSAR?:string,
    SIMCountAR?:number,
    // Ram?:number,
    // displaySize?:string,
    // OS?:string,
    // storage?:string,
    // color?:string,
    // rearCamera?:string,
    // type?:string,

    // tvs
    tvCat?:string,
    HDtech?:string,
    Type?:string,
    displayType?:string,
    motionRate?:string,
    tvCatAR?:string,
    HDtechAR?:string,
    TypeAR?:string,
    displayTypeAR?:string,
    motionRateAR?:string,
    // displaySize?:string,
    // color?:string,

    // digital Cards
    value?:string,
    valueAR?:string,
    // type?:string,
}