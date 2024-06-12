
interface PlaceDataProps {
    _id?: string,
    features: Array<FeatureType>,
    name: string,
    address: string,
    owner: string,
    openingTime: Date,
    closingTime: Date,
    category: "restaurant" | "office" | "factory" | "other",
    image?: string,
    description?: string
}