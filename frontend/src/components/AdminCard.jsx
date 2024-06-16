import React from 'react'



const AdminCard = ({children, title, value, bg}) => {
  return (
    <div className={`border flex items-center gap-10 py-8 px-4 rounded-3xl bg-${bg}-100`}>
      <div className='text-2xl'>{children}</div>
      <span className='text-3xl'>{title}</span>
      <span className='text-3xl'>{value}</span>

    </div>
  )
}

export default AdminCard
