import React from 'react'

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
    className,
    ...props
}: ButtonType) => {
    return (
        <button
            className={`border-background-300 border bg-background-200 text-sm  px-2 py-1 rounded-md cursor-pointer ${className ?? ""}`}
            {...props}
        />
    )
}

export default Button
