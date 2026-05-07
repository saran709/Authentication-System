import React from 'react'

export default function Button({ children, className = '', disabled = false, ...props }){
  return (
    <button 
      {...props} 
      disabled={disabled}
      className={`inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed text-white rounded-md transition ${className}`}
    >
      {children}
    </button>
  )
}
