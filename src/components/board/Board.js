import React from 'react'

import './Board.css'

export default function Board (props) {
  return (
    <div className={`board board--${props.size}`}>
      {props.cells}
    </div>
  )
}
