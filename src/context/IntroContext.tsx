import {type Context, createContext, type FC, type ReactNode} from "react";

const IntroContext: Context<{}> = createContext({});

interface IntroContextProps {
    children: ReactNode;
}

const IntroContextProvider: FC<IntroContextProps> = (props) => {
    const {
        children,
    } = props

    return (
        <IntroContext.Provider value={{}}>
            {children}
        </IntroContext.Provider>
    )
}

export default IntroContextProvider