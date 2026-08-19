import type {FC} from "react";
import '@/styles/reset.css'
import '@/styles/fonts.css'
import '@/styles/global.css'
import Router from "./Router.tsx";
import Toast from "./components/Toast/Toast.tsx";

const App: FC = () => {
  return (
      <>
        <Toast />
        <Router />
      </>
  )
}

export default App