import React from 'react'

export default function Input(props){
  return (
    <input {...props} className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" />
  )
}
