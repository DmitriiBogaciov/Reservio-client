import { IconListCardProps } from "./IconListCard.props"
import { ListCardProps } from "./ListCard.props"

interface ListProps
{
    title?:string,
    emptyText?:string,
    items:Array<ListCardProps | IconListCardProps>
}


export type {ListProps}