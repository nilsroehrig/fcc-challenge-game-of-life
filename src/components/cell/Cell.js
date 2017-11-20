import React from 'react'

import './Cell.css'

export default function Cell (props) {
  return (
    <div className={'cell' + (props.alive === 1 ? ' cell--alive' : '')} onClick={props.onClick} />
  )
}
