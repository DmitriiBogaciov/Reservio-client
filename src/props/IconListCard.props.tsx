import { IconType } from "react-icons"
import { ListCardProps } from "./ListCard.props"
interface IconListCardProps extends ListCardProps
{
    icons:Array<IconType>
}

type IconListCardType = (props:IconListCardProps) => JSX.Element; 

export type {IconListCardProps, IconListCardType}