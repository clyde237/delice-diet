import { ArrowUpRight, ArrowDownRight, Target, Activity, Users, CalendarDays } from 'lucide-react'
import React from 'react'

// Définition de la structure pour TypeScript
interface StatItem {
    title: string;
    value: string;
    change: string;
    trend: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    textColor: string;
}

const stats: StatItem[] = [
    {
        title: "Patients",
        value: "36",
        change: "+12.5%",
        trend: "up",
        icon: Users,
        color: "from-emerald-500 to-teal-600",
        bgColor: "bg-emerald-100",
        textColor: "text-emerald-600",
    },
    {
        title: "Rendez-vous",
        value: "18",
        change: "+12.5%",
        trend: "up",
        icon: CalendarDays,
        color: "from-blue-500 to-indigo-600",
        bgColor: "bg-blue-100",
        textColor: "text-blue-600",
    },
    {
        title: "Plans actifs",
        value: "12",
        change: "+2.5%",
        trend: "up",
        icon: Activity,
        color: "from-purple-500 to-pink-600",
        bgColor: "bg-purple-100",
        textColor: "text-purple-600",
    },
    {
        title: "Objectif non atteint",
        value: "7",
        change: "+1.5%",
        trend: "down",
        icon: Target,
        color: "from-orange-500 to-red-600",
        bgColor: "bg-orange-100",
        textColor: "text-orange-600",
    },
]

// 1. Nouveau sous-composant pour gérer l'animation de CHAQUE carte individuellement
function StatCard({ stat }: { stat: StatItem }) {
    const [width, setWidth] = React.useState('0%');
    const IconComponent = stat.icon;

    React.useEffect(() => {
        const timer = setTimeout(() => {
            // Ici, "stat.trend" fonctionne parfaitement car "stat" est un seul objet
            setWidth(stat.trend === "up" ? "75%" : "45%");
        }, 50);
        return () => clearTimeout(timer);
    }, [stat.trend]);

    return (
        <div className='bg-white shadow backdrop-blur-xl rounded-2xl p-4 m-2 border border-slate-200/50 hover:shadow-xl  transition-all duration-300 group'>
            <div className='flex items-start justify-between'>
                <div className='flex-1'>
                    <p className='text-m font-medium text-slate-600 '>
                        {stat.title}
                    </p>
                    <p className='text-2xl font-bold text-slate-800 '>
                        {stat.value}
                    </p>
                    <div className='flex items-center space-x-2'>
                        {stat.trend === "up" ? (
                            <ArrowUpRight className='w-4 h-4 text-emerald-500 ' />
                        ) : (
                            <ArrowDownRight className='w-4 h-4 text-red-500' />
                        )}
                        <span className={`text-sm font-semibold ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                            {stat.change}
                        </span>
                        <span className='text-sm text-slate-500'>
                            vs mois dernier
                        </span>
                    </div>
                </div>
                <div className={`p-2 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-all duration-300`}>
                    <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
                </div>
            </div>
            
            {/* Barre de progression animée */}
            <div className='mt-4 h-2 bg-slate-100 rounded-full overflow-hidden'>
                <div
                    className={`h-full bg-linear-120 ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: width }}
                ></div>
            </div>
        </div>
    )
}

// 2. Composant principal qui affiche la grille
function StatsGrid() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
            ))}
        </div>
    );
}

export default StatsGrid
