import {useEffect, useRef} from "react";

export const useTracksObserver = (observerHandler: () => void) => {
    const observerElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log("Елемент з'явився на екрані");
                        observerHandler();
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        if (observerElementRef.current) {
            observer.observe(observerElementRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return {
        observerElementRef,
    }
}