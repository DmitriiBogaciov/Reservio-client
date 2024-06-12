import { useEffect, useState } from "react";
import { FaBeer, FaWifi, FaParking, FaCarrot } from "react-icons/fa";

interface FeatureIconProps {

    features: Array<FeatureType>
}
const FeatureIconsComponent = (props: FeatureIconProps) => {
    const [features, setFeatures] = useState<FeatureIconProps>({features:[]});

    useEffect(() => {
        //Including only features that are not already in the array
        if(props.features)
            setFeatures(prevFeatures => ({...prevFeatures, features: [...prevFeatures.features, ...props.features.filter(feature => !prevFeatures.features.includes(feature))]}));
            
    }, [props.features])
    return (
        <div className="flex justify-between p-2">
            {
                features.features.map((feature,index) => {
                    switch (feature) {
                        case "wifi":
                            return <FaWifi key={index} size={20} />;
                        case "parking":
                            return <FaParking key={index} size={20} />;
                        case "drink":
                            return <FaBeer key={index} size={20} />;
                        case "food":
                            return <FaCarrot key={index} size={20} />;
                        default:
                            return null;
                    }
                })
            }
        </div>
    )
}

export default FeatureIconsComponent