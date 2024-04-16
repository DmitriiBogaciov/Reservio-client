import { IconType } from "react-icons"
import { ListCardProps } from "./ListCard.props"
interface IconListCardProps extends ListCardProps {
    icons: Array<IconType>
}
const IsInstanceOfIconListCard = (object: any): object is IconListCardProps => {
    return 'icons' in object;
}


export {IsInstanceOfIconListCard,  type IconListCardProps }
