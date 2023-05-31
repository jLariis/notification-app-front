
interface AvatarProps {
    name: String;
    imageUrl: String;
}

export default function Avatar(props: AvatarProps) {
    return (
        <>
            <h1> {props.name} </h1>
        </>
    )
}