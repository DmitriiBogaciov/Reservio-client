
interface ListCardProps
{
    //Image path
    image?:string,
    title:string,
    shortText:string,
} 
type ListCardType = (props:ListCardProps) => JSX.Element; 

export type {ListCardProps, ListCardType}