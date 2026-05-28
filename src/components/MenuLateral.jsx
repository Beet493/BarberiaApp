import { useNavigate } from "react-router-dom"
import {Home,Settings,CalendarClock,HeartPlus,Users,Tag, X} from "lucide-react"
import { NavLink } from "react-router-dom"

export function MenuLateral({isOpen,toggleSidebar}) {
 
 const menuItems = [
    { name: "Home", path: "/home", icon: <Home size={20}/> },
    { name: "Citas", path: "/citas", icon: <CalendarClock size={20}/> },
    { name: "Barberos", path: "/barberos", icon: <Users size={20}/> },
    { name: "Favoritos", path: "/favoritos", icon: <HeartPlus size={20}/> },
    { name: "Promociones", path: "/promociones", icon: <Tag size={20}/> }
    
  ]


  const navigate = useNavigate()

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 bg-slate-900 w-64 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0':'-translate-x-full'}`}>
  <div className="p-6 border-b border-slate-800 flex justify-between items-center">
    <h1 className="text-xl font-bold tracking-tight">Barber-CitasT</h1>
    <button onClick={toggleSidebar} className="lg:hidden text-slate-400"><X size={24}/></button>
  </div>
  <nav className="flex-1 p-4 mt-4 space-y-2">
    {
      menuItems.map((menuitem)=>(
        <NavLink key={menuitem.name} to={menuitem.path}
        onClick={()=>{if (window.innerWidth<1024) toggleSidebar()}}
        className={({isActive})=>`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-red-600 text-white shadow-lg':'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          {menuitem.icon}
          <span className="font-medium">{menuitem.name}</span>
        </NavLink>
      ))
    }
  </nav>
</aside>
  
  );

    
    // <div className="w-64 bg-black text-white p-6 space-y-4">

    //   <h2 className="text-xl font-bold mb-6">
    //     BarberApp 💈
    //   </h2>

    //   <button onClick={() => navigate("/home")} className="block w-full text-left hover:text-gray-400">
    //     <Home size={20}/> Home
        
    //   </button>

    //   <button onClick={() => navigate("/citas")} className="block w-full text-left hover:text-gray-400">
    //     <CalendarClock size={20}/> Citas
    //   </button>

    //   <button onClick={() => navigate("/barberos")} className="block w-full text-left hover:text-gray-400">
    //     <Users size={20}/> Barberos
    //   </button>

    //   <button onClick={() => navigate("/favoritos")} className="block w-full text-left hover:text-gray-400">
    //     <HeartPlus size={20}/> Favoritos
    //   </button>

    //   <button onClick={() => navigate("/promociones")} className="block w-full text-left hover:text-gray-400">
    //     <Tag size={20}/> Promociones
    //   </button>

    // </div>
}

/*

*/