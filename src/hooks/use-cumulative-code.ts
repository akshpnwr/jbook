import { useTypedSelector } from './use-typed-selector'

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const data = state.cells.data
    const order = state.cells.order

    const orderedCells = order.map((id) => data[id])

    const showFunNoop = `var show = () => {}`

    const showFun = `
    import _React from 'react'
    import _ReactDom from 'react-dom'

    var show = (value) => {
      const root = document.querySelector('#root');

      if(typeof value === 'object') {          
        if(value.$$typeof && value.props)
        {
          _ReactDom.render(value, root)
        }
        else{
          root.innerHTML = JSON.stringify(value);
        }
      }
      else {
        root.innerHTML = value
      }
    }
  `
    const cumulativeCode = []

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) cumulativeCode.push(showFun)
        else cumulativeCode.push(showFunNoop)
        cumulativeCode.push(c.content)
      }
      if (c.id === cellId) break
    }

    return cumulativeCode
  }).join('\n')
}
