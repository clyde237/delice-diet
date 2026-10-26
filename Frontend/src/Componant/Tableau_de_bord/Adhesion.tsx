import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
}from 'recharts';

const data = [
    {name: 'Bonne adhesion', value: 45, color: " #1FBE53"},
    {name: 'Adhesion moyenne', value: 40, color: " #F4C802"},
    {name: 'Mauvaise adhesion', value: 15, color: " #5B02F4"},
    
];

function Adhesion() {
  return (
    <div className='bg-white shadow-2xl backdrop-blur-xl rounded-b-2xl p-6 my-2  border border-slate-200/50 rounded-2xl'>
        <div className=''>
            <h3 className='text-lg font-bold text-slate-800'>
                Adhesion aux programme
            </h3>
        </div>
        <div className='h-48'>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey={"value"}>
                        {data.map((entry,index) => (
                            <Cell key={`cell-${index}`} fill={entry.color}/>
                        ))}
                    </Pie>
                    <Tooltip
                    contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: 'o 10px 40px rgba(0, 0, 0, 0.1)',
                    }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
        
        <div className='space-y-3'>
            {data.map((item,index) => {
                return (<div className='flex items-center justify-between' key={index}>
                    <div className='flex space-x-3'>
                        <div className='w-3 h-3 rounded-full' style={{backgroundColor: item.color}}
                        />
                        <span className='text-sm text-slate-600 space-x-3'>
                            {item.name}
                        </span>
                     </div>
                     <div className='text-sm font-semibold text-slate-800'>{item.value}%</div>
                </div>
                );
            })}
        </div>
    </div>
    
    
  )
  
  
}

export default Adhesion