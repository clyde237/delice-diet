import React from 'react'
import{
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    
} from "recharts";

const data = [
    { mois: "Dec.", kg:7},
    { mois: "Jan.", kg: 6},
    { mois: "Fevr.",kg:5},
    { mois: "Mar.", kg:4},
    { mois: "Avr.", kg:3 },
    { mois: "Mai.", kg:2 },
    { mois: "Jui.", kg:1 },
]

function EvolutionChart() {
  return (
    <div className='h-88 p-6 border-2 shadow border-slate-100 my-7 mx-1 rounded-2xl'>
     <div className="text-xl  ">
            <h3 className='text-xl font-bold text-slate-800'>Evolution du poids</h3>
            
             <div className='h-60 w-full  '>
       
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                    data={data}
                    margin={{ 
                        top:10,
                        right:10,
                        left:-20,
                        bottom:0,
                    }}
                    >
                        {/*Dregrade*/}
                        <defs>
                            <linearGradient
                            id="evolutionGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                            >
                                <stop
                                offset="0%"
                                stopColor="green"
                                stopOpacity={0.40}
                                />
                                 <stop
                                offset="100%"
                                stopColor="green"
                                stopOpacity={0.02}
                                />
                            </linearGradient>
                        </defs>

                        {/*GRILLE*/}
                        <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="black"
                        vertical={false}
                        />

                        {/*Axe X*/}
                        <XAxis
                        dataKey="mois"
                        axisLine={false}
                        tickLine={false}
                        
                        />

                        {/*Axe Y*/}
                        <YAxis
                        axisLine={false}
                        tickLine={false}
                        className="fill-texte-secondaire"
                        domain={["dataMin  4","dataMax + 0"]}
                        />

                        {/*TOOLTIP*/}
                        <Tooltip
                        formatter={(value) =>[
                            `${value} kg`,
                            "mois",
                        ]}
                          contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: 'o 10px 40px rgba(0, 0, 0, 0.1)',
                    }}
                        />

                        {/*COURBE + DEGRADE*/}
                        <Area
                        type="monotone"
                        dataKey="kg"
                        stroke="green"
                        strokeWidth={2}
                        fill="url(#evolutionGradient)"
                        dot={{
                            r:3,
                            fill: "green"
                        }}
                        activeDot={{
                            r:6,
                        }}
                        />
                    </AreaChart>
                </ResponsiveContainer>

        </div>
        </div>
        </div>
  )
  {React}
}

export default EvolutionChart