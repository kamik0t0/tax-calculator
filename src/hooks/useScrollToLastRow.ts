import { useState, useEffect } from "react";

export const useScrollToLastRow = (
    viewElemId: string
): React.Dispatch<React.SetStateAction<number>> => {
    const [conteinerHeight, setConteinerHeight] = useState(0);

    const observer = new IntersectionObserver((entries) => {
        const elem = entries[0];
        if (!elem.isIntersecting) {
            elem.target.scrollIntoView({ behavior: "smooth" });
            observer.unobserve(elem.target);
        }
    });

    useEffect(() => {
        setTimeout(() => {
            if (conteinerHeight !== 0) {
                const lastRow = document.getElementById(viewElemId);
                lastRow && observer.observe(lastRow);
            }
        }, 100);
    }, [conteinerHeight]);

    return setConteinerHeight;
};
