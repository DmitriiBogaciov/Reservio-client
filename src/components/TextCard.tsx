//Custom props
import { TextCardProps } from "@/props/TextCard.props";

const TextCard = (props: TextCardProps) => {

    return (
        <div className="shadow-md p-4 rounded-xl bg-light-greenish">
            {(props.title) ? <h3>{props.title}</h3> : null}
            <div>
                <p>
                    {props.content}
                </p>
            </div>
        </div>
    )
}

export default TextCard;