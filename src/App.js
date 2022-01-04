import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { Head } from 'components/Head'
import { Navbar } from 'components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Head>
        <meta charSet="utf-8" />
        <title>Mini Games</title>
      </Head>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
