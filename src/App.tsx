import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Microscope, 
  Clock, 
  MessageCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Activity,
  MapPin,
  Star,
  HeartPulse,
  Stethoscope
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from './lib/supabase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Tracking ---
const trackClick = async (label: string) => {
  try {
    await supabase.from('app_80a85_clicks').insert([
      { location: label, created_at: new Date().toISOString() }
    ]);
  } catch (e) {
    // Silent fail for analytics
    console.warn("Tracking failed", e);
  }
};

// --- Components ---

const WhatsAppButton = ({ 
  text, 
  className, 
  variant = 'primary',
  size = 'normal'
}: { 
  text: string, 
  className?: string, 
  variant?: 'primary' | 'secondary' | 'outline',
  size?: 'normal' | 'large'
}) => {
  const baseStyles = "flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 group shadow-lg hover:shadow-xl";
  const sizeStyles = size === 'large' ? "px-8 py-5 text-lg" : "px-6 py-3 text-sm";
  
  const variants = {
    primary: "bg-whatsapp-500 hover:bg-whatsapp-600 text-white shadow-whatsapp-500/30",
    secondary: "bg-medical-900 hover:bg-medical-800 text-white",
    outline: "bg-white border-2 border-slate-200 hover:border-whatsapp-500 text-slate-700 hover:text-whatsapp-600"
  };

  return (
    <a 
      href="https://wa.me/573000000000?text=Hola,%20Clínica%20Biodermo.%20Quisiera%20solicitar%20información%20sobre%20la%20valoración%20médica%20para%20implante%20capilar."
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackClick(`whatsapp_${variant}`)}
      className={cn(baseStyles, sizeStyles, variants[variant], className)}
    >
      <MessageCircle className={cn("fill-current", size === 'large' ? "w-6 h-6" : "w-4 h-4")} />
      {text}
    </a>
  );
};

const Section = ({ children, className, id, bg = 'white' }: { children: React.ReactNode, className?: string, id?: string, bg?: 'white' | 'gray' | 'blue' }) => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-slate-50',
    blue: 'bg-medical-50',
  };
  
  return (
    <section id={id} className={cn("py-20 md:py-28 px-4 overflow-hidden", backgrounds[bg], className)}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
};

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-medical-100 text-medical-600 text-xs font-bold tracking-wide uppercase mb-6">
    {children}
  </span>
);

// --- Sections ---

const Header = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-20 flex items-center">
    <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="bg-medical-500 p-2 rounded-lg">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-display font-bold text-slate-900 tracking-tight leading-none">
          Clínica<br/><span className="text-medical-600">Biodermo</span>
        </span>
      </div>
      <WhatsAppButton text="Agendar Cita" variant="outline" className="hidden md:flex" />
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden bg-slate-50">
    <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-40" />
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-medical-200/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
    
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Badge><ShieldCheck className="w-3 h-3" /> Implante Capilar Médico Especializado</Badge>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
          Resultados Reales. <br/>
          <span className="text-medical-600">Sin Falsas Promesas.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed text-balance">
          Recupera tu cabello (y tu confianza) con técnicas médicas avanzadas. Procedimiento ambulatorio realizado por especialistas en Bogotá y Yopal.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <WhatsAppButton text="Solicitar Valoración Médica" size="large" />
          <div className="flex items-center gap-2 text-sm text-slate-500 mt-3 sm:mt-0 bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Cupos limitados por mes
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative hidden md:block"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
           <img 
             src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2864&auto=format&fit=crop" 
             alt="Doctor analizando paciente" 
             className="w-full h-auto object-cover"
           />
           <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-6 border-t border-slate-100 flex items-center gap-4">
              <div className="bg-medical-100 p-3 rounded-full">
                <Stethoscope className="w-6 h-6 text-medical-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Diagnóstico Ético</p>
                <p className="text-sm text-slate-500">Evaluamos viabilidad antes de cualquier procedimiento.</p>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Qualifier = () => (
  <Section bg="white">
    <div className="grid md:grid-cols-2 gap-8 md:gap-16">
      {/* Not For You */}
      <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100">
        <h3 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-3">
          <XCircle className="text-red-500 fill-red-50" /> No somos para ti si...
        </h3>
        <ul className="space-y-4 text-slate-600">
          <li className="flex gap-3 text-sm md:text-base"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />Buscas la opción más barata poniendo en riesgo tu salud.</li>
          <li className="flex gap-3 text-sm md:text-base"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />Quieres resultados "mágicos" en 1 semana (esto es ciencia).</li>
          <li className="flex gap-3 text-sm md:text-base"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />No estás dispuesto a seguir las indicaciones médicas post-cirugía.</li>
        </ul>
      </div>

      {/* Is For You */}
      <div className="bg-medical-50 p-8 md:p-10 rounded-3xl border border-medical-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-medical-200/20 rounded-full blur-3xl" />
        <h3 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-3">
          <CheckCircle2 className="text-whatsapp-500 fill-green-50" /> Esto SÍ es para ti si...
        </h3>
        <ul className="space-y-4 text-slate-700">
          <li className="flex gap-3 text-sm md:text-base items-start">
            <CheckCircle2 className="w-5 h-5 text-whatsapp-500 shrink-0 mt-0.5" /> 
            <span>Valoras tu seguridad y buscas un equipo médico certificado.</span>
          </li>
          <li className="flex gap-3 text-sm md:text-base items-start">
            <CheckCircle2 className="w-5 h-5 text-whatsapp-500 shrink-0 mt-0.5" /> 
            <span>Entiendes que recuperar tu imagen es una inversión en ti mismo.</span>
          </li>
          <li className="flex gap-3 text-sm md:text-base items-start">
            <CheckCircle2 className="w-5 h-5 text-whatsapp-500 shrink-0 mt-0.5" /> 
            <span>Buscas naturalidad: ni tú mismo notarás qué es implantado.</span>
          </li>
        </ul>
      </div>
    </div>
  </Section>
);

const EmotionalProblem = () => (
  <Section bg="gray" className="text-center">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
        ¿Hace cuánto dejaste de sentirte cómodo frente al espejo?
      </h2>
      <p className="text-lg text-slate-600 leading-relaxed mb-8">
        La pérdida de cabello en la cabeza, o la falta de densidad en barba y cejas, no es solo estética. 
        Es esa sensación de aparentar más edad, de perder frescura, de no reconocerte.
      </p>
      <div className="inline-flex flex-col items-center">
        <p className="font-semibold text-medical-600 mb-2">No es vanidad, es salud emocional.</p>
        <div className="w-16 h-1 bg-medical-500 rounded-full" />
      </div>
    </div>
  </Section>
);

const TechnicalSolution = () => (
  <Section>
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <Badge>Técnica FUE / DHI</Badge>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
          Tu propio cabello.<br/>
          <span className="text-medical-600">Donde más lo necesitas.</span>
        </h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          El implante capilar no es una peluca ni un tratamiento cosmético superficial. Es un procedimiento médico 
          donde redistribuimos unidades foliculares de tu zona donante (usualmente la nuca) a las zonas despobladas.
        </p>
        
        <div className="space-y-6">
          {[ 
            { icon: UserCheck, title: "100% Compatible", desc: "Al ser tu propio ADN, no existe riesgo de rechazo." },
            { icon: Microscope, title: "Pelo a Pelo", desc: "Extraemos e implantamos folículo por folículo para máxima densidad." },
            { icon: HeartPulse, title: "Sin Dolor", desc: "Anestesia local. Estarás despierto, tranquilo y sin dolor." }
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-12 h-12 bg-medical-50 rounded-full flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-medical-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative h-[500px] bg-slate-100 rounded-2xl overflow-hidden shadow-lg">
        <img 
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
          alt="Procedimiento médico estéril" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-medical-900/60 to-transparent flex items-end p-8">
          <p className="text-white font-medium">
            * Procedimiento ambulatorio. <br/>Vuelves a casa el mismo día.
          </p>
        </div>
      </div>
    </div>
  </Section>
);

const AntiFears = () => (
  <Section bg="blue">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Resolvamos tus dudas ahora</h2>
      <p className="text-slate-600">Sabemos que puedes tener miedo. Aquí te hablamos con la verdad.</p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[ 
        { 
          q: "¿Duele?", 
          a: "No. Usamos anestesia local (similar a la del odontólogo). La molestia es mínima solo al inicio.",
          icon: Activity
        },
        { 
          q: "¿Se ve falso?", 
          a: "Jamás. Diseñamos la línea frontal respetando tu fisonomía. Nadie notará que es un implante.",
          icon: UserCheck
        },
        { 
          q: "¿Cuándo crece?", 
          a: "Es progresivo. Al 3er mes inicia, al 6to es visible y al año tienes el resultado final definitivo.",
          icon: Clock
        },
        { 
          q: "¿Cicatrices?", 
          a: "Con la técnica FUE no queda la cicatriz lineal antigua. Usamos micropunches de menos de 1mm.",
          icon: Microscope
        }
      ].map((card, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
        >
          <card.icon className="w-8 h-8 text-medical-500 mb-4" />
          <h4 className="font-bold text-slate-900 mb-2">{card.q}</h4>
          <p className="text-sm text-slate-500 leading-relaxed">{card.a}</p>
        </motion.div>
      ))}
    </div>
  </Section>
);

const Authority = () => (
  <Section>
    <div className="bg-slate-900 rounded-3xl overflow-hidden text-white relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
      
      <div className="relative z-10 p-10 md:p-20 text-center">
        <Star className="w-12 h-12 text-yellow-400 mx-auto mb-6 fill-current" />
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Tu salud no es un juego</h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg mb-10">
          En Clínica Biodermo no somos vendedores, somos personal de salud. 
          Te acompañamos desde la primera valoración hasta el último control post-operatorio. 
          Si no eres candidato, te lo diremos.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="text-medical-500" /> Sede Bogotá
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="text-medical-500" /> Sede Yopal
          </div>
        </div>

        <WhatsAppButton text="Hablar con un Especialista" variant="primary" size="large" />
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="bg-white border-t border-slate-100 py-12">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <span className="text-xl font-display font-bold text-slate-900">Clínica<span className="text-medical-600">Biodermo</span></span>
        <p className="text-slate-500 text-sm mt-2">© 2024 Todos los derechos reservados.</p>
      </div>
      <div className="text-center md:text-right">
        <p className="text-sm text-slate-400 mb-2">¿Tienes dudas?</p>
        <WhatsAppButton text="Escribir al WhatsApp" variant="outline" />
      </div>
    </div>
  </footer>
);

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <Hero />
      <Qualifier />
      <EmotionalProblem />
      <TechnicalSolution />
      <AntiFears />
      <Authority />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
