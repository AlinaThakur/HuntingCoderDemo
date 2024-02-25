import Navbar from '../component/Navbar'
import '../styles/globals.css'
// import '../styles/style.css'
function MyApp({ Component, pageProps }) {
  // console.log("I am App.css")
  return <>
<Navbar/>
  <Component {...pageProps} /></>
}

export default MyApp
