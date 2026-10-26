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
    { mois: "Dec.", poids:4},
    { mois: "Jan.", poids:3 },
    { mois: "Fevr.", poids:2},
    { mois: "Mar.", poids:2},
    { mois: "Avr.", poids:3 },
    { mois: "Mai.", poids:1 },
    { mois: "Jui.", poids:3 },
]

function EvolutionChart() {
  return (
    <div className='h-88 p-6 border-2 shadow-2xl border-slate-100 my-2 mx-3 rounded-2xl'>
     <div className="text-xl  ">
            <h3 className='text-xl font-bold text-slate-800'>Evolution globale de poids</h3>
            <p className='text-sm text-slate-500'>Moyenne des poids</p>
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
                            `${value} poids`,
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
                        dataKey="poids"
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