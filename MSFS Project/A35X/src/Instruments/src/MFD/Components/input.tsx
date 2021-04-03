import React from 'react'
import './input.scss'

type InputProps = {
    type?: 'text' | 'number',
    value?: any,
    characterLimit?: number,
    posX?: number,
    posY?: number,
    onChange: (value: string) => any,
    className?: string
}
export const Input = ({type, characterLimit, value: propsValue, posX, posY, onChange: onChangeProps, className, ...props}: InputProps) =>
{
    const onChange = (value: string) =>
    {
        if(value !== "")

        onChangeProps(value)
    }
    function currentColour(): string
    {
        if(propsValue === "")
            return ""
        else
            return "cyan"
    }
    return(
            <input maxLength={characterLimit} style={{left: (posX + "%"), top: (posY + "%"), color: currentColour() }} className={className} type={type} placeholder={Array((characterLimit? characterLimit : 0) + 1).join('0')} value={propsValue} onChange={(event) => onChange(event.target.value)} />
        );
    
}