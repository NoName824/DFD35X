
type ButtonProps = {
    posX?: number,
    posY?: number,
    onClick?: (e?: any) => any,
    className?: string,
    disabled?: boolean,
    children?: any
}
export const Button = ({onClick,...props}: ButtonProps) =>
{
    return(
        <button style={{left: (props.posX + "%"), top: (props.posY + "%")}} className={props.className} disabled={props.disabled} onClick={onClick}>{props.children}</button>
    );
}