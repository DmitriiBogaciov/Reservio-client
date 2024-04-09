import { ListCardProps,ListCardType } from "./ListCard.props"
import { IconListCardType } from "./IconListCard.props"

interface ListProps
{
    title?:string,
    items:Array<ListCardType | IconListCardType>
}


export type {ListProps}