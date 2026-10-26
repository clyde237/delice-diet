import React from 'react'
import EvolutionChart from './EvolutionChart'
import Adhesion from './Adhesion'


function ChartSection() {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        <div className='xl:col-span-2'>
            <EvolutionChart/>
        </div>
        <div className=''>
           <Adhesion/>
        </div>
          
    </div>
  )
  {React}
}

export default ChartSection