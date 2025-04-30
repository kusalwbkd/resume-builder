import{Book, CheckCircle, LayoutDashboard,Shield, ShieldCheck, Star, UserCircle} from 'lucide-react'


export const menuList=[
    {
      name:"Dashboard",
      icon: LayoutDashboard,
      path:"/dashboard"
    },
    {
      name:"Upgrade",
      icon:Shield,
      path:"/dashboard/upgarde"
    },
    {
        name:"LMS",
        icon:Book,
        path:"/dashboard/lms"
      },
    {
      name:"Profile",
      icon:UserCircle,
      path:"/dashboard/profile"
    },
   
  ]