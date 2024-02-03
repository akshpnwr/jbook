import './text-editor.css'
import MDEditor from '@uiw/react-md-editor'
import React, { useEffect, useRef, useState } from 'react'
import { useAction } from '../hooks/use-actions'
import { Cell } from '../state'

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [isEditing, setIsEditing] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const { updateCell } = useAction()

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      )
        return

      setIsEditing(false)
    }

    document.addEventListener('click', listener, { capture: true })

    return () => {
      document.addEventListener('click', listener, { capture: true })
    }
  }, [])

  if (isEditing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || '')}
        />
      </div>
    )
  }

  return (
    <div className="text-editor card" onClick={() => setIsEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  )
}

export default TextEditor
