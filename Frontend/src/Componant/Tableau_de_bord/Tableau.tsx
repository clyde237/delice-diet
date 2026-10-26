import React from 'react'
import StatsGrid from "../Tableau_de_bord/StatsGrid"
import ChartSection from './ChartSection'
import TableSection from './TableSection'
import Répartition from './Répartition'
import Titres from './Titres'


function Tableau() {
  return (
  
    <div className='space-y-6'>

      <Titres/>
      {/*Stats Grid*/}
      <StatsGrid/>

      <ChartSection/>
      <div className='grid grid-cols-1 xl:grid-cols-4 gap-6'>
        <div className='xl:col-span-3'>
            <TableSection/>
        </div>
        <Répartition/>
              
      </div>
    </div>
  )
  {React}
}

export default Tableau