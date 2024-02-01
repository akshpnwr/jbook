import 'bulmaswatch/superhero/bulmaswatch.min.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './state'
import CellList from './components/cell-list'

const App = () => {
  return (
    <div>
      <CellList />
    </div>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
