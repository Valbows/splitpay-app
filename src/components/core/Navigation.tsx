import { Link, useLocation } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { Home, Users, Receipt, Settings } from "lucide-react"

export default function Navigation() {
  const location = useLocation()

  const navigation = [
    { name: "Dashboard", href: ROUTES.DASHBOARD, icon: Home },
    { name: "Groups", href: ROUTES.GROUPS, icon: Users },
    { name: "Expenses", href: ROUTES.EXPENSES, icon: Receipt },
    { name: "Settings", href: ROUTES.SETTINGS, icon: Settings },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm border-r min-h-screen w-64 fixed left-0 top-16 z-40">
      <div className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
