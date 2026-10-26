import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Ajout de l'icône Eye
import '../Style/login.css';
import login from '../assets/login.jpg';

export default function Login() {
  const navigate = useNavigate();

  // États pour les champs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
   const [error, setError] = useState('');
   
 
  
  // 1. Nouvel état pour gérer la visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password, rememberMe ,error});
      if (password.length < 8){
      setError ("Le mot de passe doit avoir au moins 8 caracteres");
      return;
    }
    setError("");
    console.log("Validé:",password);
    
    // La redirection se fait ici après la soumission du formulaire
    navigate("/Dashbord");
    
  };

  return (
    // On applique l'image en arrière-plan ici pour que tout le site ait le fond visible sur la photo
    <div className="login-container" style={{ backgroundImage: `url(${login})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      <div className="login-card">
        <h1>CONNEXION</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              placeholder="exemple@mail.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group" style={{ position: 'relative' }}>
            <label htmlFor="password">Mot de passe</label>
            {/* 2. Le type change dynamiquement ici entre "text" et "password" */}
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              placeholder="Mot de passe" 
              minLength={8}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            {/* 3. Votre conteneur d'icône d'origine transformé en bouton interactif invisible */}
            <button 
              type="button"
              className='icon-1' 
              onClick={() => setShowPassword(!showPassword)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              {showPassword ? <Eye color="white" /> : <EyeOff color="white" />}
            </button>
          </div>

          <div className="login-options">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
              />
              <span>Se souvenir de moi</span>
            </label>
            <a href="#forgot" className="forgot-password">Mot de passe oublié ?</a>
          </div>

          {/* Retrait du onClick ici pour laisser le formulaire gérer la redirection proprement */}
          <button type="submit" className="btn-submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
