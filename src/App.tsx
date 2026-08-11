import type {FC} from "react";
import '@/styles/reset.css'
import '@/styles/fonts.css'
import '@/styles/global.css'
import Router from "./Router.tsx";

const App: FC = () => {
  return (
      <Router />
  )
}

export default App