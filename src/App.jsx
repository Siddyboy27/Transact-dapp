import {Navbar,Welcome,Footer,Services,Transactions} from './components'

function App() {

  return (
    <h1 className="min-h-screen">
      <div className='gradient-bg-welcome'>
        <Navbar/>
        <Welcome/>

      </div>
      <Services/>
      <Transactions/>
      <Footer/>
    </h1>
  )
}

export default App
