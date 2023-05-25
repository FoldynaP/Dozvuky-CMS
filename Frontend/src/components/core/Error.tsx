import React from 'react'
import Button from './Button'

export default function Error() {
  return (
    <div className="error u-text-center">
        <h4>Upss něco se pokazilo</h4>
        <p>zkuste znovu načíst stránku</p>
        <button className='btn-glitch'  onClick={() => {location.reload()}}>Znovu načíst</button>
    </div>
  )
}
