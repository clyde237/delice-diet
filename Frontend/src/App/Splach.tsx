
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.jpg';
import Bgimage from '../assets/Bgimage.jpg';

export default function Splach() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Login', { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${Bgimage})` }} >
      <div className="absolute inset-0 bg-white/85" />

      <section className="relative z-10 flex w-[90%] max-w-md flex-col items-center rounded-3xl border-2 border-green-600/20 bg-green-700 px-8 py-12 text-center shadow-2xl">
        <div className="mb-6 rounded-full border-8 border-white bg-white p-2 shadow-lg">
          <img
            src={Logo}
            alt="Logo de l'application"
            className="h-28 w-28 rounded-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold tracking-wide text-white">Bienvenue</h1>
        <p className="mt-2 text-sm text-emerald-100">Votre santé, notre priorité</p>
        <div className="mt-10 flex items-center gap-3 text-sm text-white">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-orange-400" />
          <span>Chargement en cours...</span>
        </div>
        <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-white/30">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-orange-500" />
        </div>
      </section>
      <div className="absolute bottom-8 h-2 w-20 rounded-full bg-orange-500" />
    </main>
  );
}
