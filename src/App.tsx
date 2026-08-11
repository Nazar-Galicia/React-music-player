import type {FC} from "react";
import '@/styles/reset.css'
import '@/styles/fonts.css'
import '@/styles/global.css'
import MusicPlayer from "./components/MusicPlayer/MusicPlayer.tsx";
import IntroContextProvider from "./context/IntroContext.tsx";

const App: FC = () => {
  return (
      <IntroContextProvider>
        <MusicPlayer />
      </IntroContextProvider>
  )
}

export default App