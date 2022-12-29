import ContextProvider from "@/components/ContextProvider.jsx"
import "@/styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}
