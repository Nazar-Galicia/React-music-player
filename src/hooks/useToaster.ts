import {useContext} from "react";
import {ToasterContext} from "../context/ToasterContext.tsx";

export const useToaster = () => {
    const context = useContext(ToasterContext);

    if (!context) throw new Error('toaster context is missing');

    return context;
}