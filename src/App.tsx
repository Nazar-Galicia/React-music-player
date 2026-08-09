import type {FC} from "react";
import '@/styles/reset.css'
import '@/styles/fonts.css'
import '@/styles/global.css'
import MusicPlayer from "./components/MusicPlayer/MusicPlayer.tsx";

const App: FC = () => {
  return (
      <MusicPlayer />
  )
}

export default App