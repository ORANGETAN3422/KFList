import ListSorter from './components/ListSorter/ListSorter.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function App() {

  return (
    <>
      <header>
        <FontAwesomeIcon icon={faBars} className='bars' />
        <h1>Karma Farm List - Classic Completions</h1>
      </header>

      <div className='list-bg'>
        <ListSorter />
      </div>
    </>
  );
}

export default App