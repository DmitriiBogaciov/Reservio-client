interface SearchBarProps
{
    placeHolder?:string,
    onSearch:(searchedTerm:string)=>void
}

export type {SearchBarProps}