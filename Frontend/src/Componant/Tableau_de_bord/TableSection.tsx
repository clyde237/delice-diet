import React from 'react'
import { MoreHorizontal } from 'lucide-react'

const recentOrders=[
  {
    id: "#678",
    customer:"john week",
    product:"Consultation de suivis",
    statut:"Confirmé",
    date:"2026-07-21",
  },
   {
    id: "#098",
    customer:"Peter Paker",
    product:"Premiere consultation",
    statut:"Confirmé",
    date:"2026-09-01",
  },
   {
    id: "#543",
    customer:"Kaneki ken",
    product:"Consultation de suivis",
    statut:"En attente",
    date:"2026-10-01",
  },
]

function TableSection() {
  const getStatusColor =(statut:any) =>{
    switch (statut) {
      case "Confirmé":
      return "bg-emerald-100 text-emerald-700 ";
          case "En attente":
        return"bg-red-100 text-red-700";
        default:
          return
          "bg-slate-100 text-slate-700";
        

    }
  };
  return (
    <div className='space-y-6 mx-3 rounded-4xl'>
      <div className='bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden'>
      <div className='p-6 border-b border-slate-200/50'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-800'>
            Rendez-vous
          </h3>
        </div>
        <button className='text-green-800 hover:text-green-900 text-sm font-medium'>
          VIew
          </button>
      </div>
      </div>

      {/*Table*/}
      <div className='overflow-x-auto '>
        <table className='w-full'>
          <thead>
            <tr>
              <th className=' text-left p-4 text-sm font-semibold text-slate-600'>
                Order ID
              </th>
              <th className='text-left p-4 text-sm font-semibold text-slate-600'>
                Nom du patients
              </th>
               <th className='text-left p-4 text-sm font-semibold text-slate-600'>
                Objets
              </th>
               <th className='text-left p-4 text-sm font-semibold text-slate-600'>
                Statut
              </th>
               <th className='text-left p-4 text-sm font-semibold text-slate-600'>
                Date
              </th>
            </tr>
            </thead>
            <tbody>
             {recentOrders.map((order,index) =>{
              return(
                 <tr className='border-b border-slate-200/50 hover:bg-slate-50/50 transition-colors'>
              <td className='p-4' key={index}>
                <span className='text-sm font-medium text-blue'>
                  {order.id}
                </span>
                </td>
                <td className='p-4'>
                  <span className='text-sm text-slate-800'>
                    {order.customer}
                  </span>
                </td>
                <td className='p-4'>
                  <span className='text-sm text-slate-800'>
                    {order.product}
                  </span>
                </td>
                <td className='p-4'>
                  <span className={`text-xs  font-medium px-3 py-1 rounded-full ${getStatusColor(order.statut)}`}>
                  {order.statut}
                  </span>
                </td>
                <td className='p-4'>
                  <span className={`text-xs text-slate-400 font-medium px-3 py-1 rounded-full`}>
                  {order.date}
                  </span>
                </td>
                <td className='p-4'>
                  <span className='text-sm text-slate-800'>
                    <MoreHorizontal className="w-4 h-4"/>
                  </span>
                </td>
              </tr>
              )
               })}
            </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default TableSection