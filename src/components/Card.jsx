import React from 'react'

export default function Card({ children, className = '' }){
  return (
    <div className={`bg-gray-900 dark:bg-gray-800 border border-gray-800 dark:border-gray-700 shadow-sm rounded-lg p-6 text-white ${className}`}>
      {children}
    </div>
  )
}
