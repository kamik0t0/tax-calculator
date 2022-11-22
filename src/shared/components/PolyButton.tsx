import React, { ComponentProps, ElementType } from "react";
import Button from "@mui/material/Button";
/* 
E - некий тип который сужается до ElementType, т.е. до html-тега. Если тип не передан то по умолчанию тип = ElementType;
*/

type ButtonOwnProps<E extends ElementType = ElementType> = {
    children: string;
    as?: E;
};

/* 
ComponentProps - это пропсы которые присущи конкретному html-элементу;
ButtonProps - это тип который является ButtonOwnProps но и + все типы которые идут из дженерика E исключая свои собственные типы 
*/

// type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & ComponentProps<E>;
type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
    Omit<ComponentProps<E>, keyof ButtonOwnProps>;

const defaultElement = Button;

const PolyButton = <E extends ElementType = typeof defaultElement>({
    children,
    primary,
    secondary,
    as,
    ...otherProps
}: ButtonProps<E>) => {
    const TagName = as || defaultElement;
    return <TagName {...otherProps}>{children}</TagName>;
};
export default PolyButton;
