import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { Head } from 'components/Head'
import { Navbar } from 'components/Navbar'

function App() {
  return (
    <HashRouter>
      <Head>
        <meta charSet="utf-8" />
        <title>Mini Games</title>
      </Head>
      <Navbar />
      <AppRoutes />
    </HashRouter>
  )
}

export default App
