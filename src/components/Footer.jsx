import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-12 py-6 text-center text-sm text-gray-400 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">© {new Date().getFullYear()} AuthUI — Built with ❤️</div>
    </footer>
  )
}
