import React from 'react'

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
    className,
    ...props
}: ButtonType) => {
    return (
        <button
            className={`border-1  px-2 py-1 rounded-md cursor-pointer ${className ?? ""}`}
            {...props}
        />
    )
}

export default Button
