import { Check, ChevronDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"

const accentThemes = [
  { name: "Rose", value: "rose" },
  { name: "Orange", value: "orange" },
  { name: "Green", value: "green" },
  { name: "Blue", value: "blue" },
  { name: "Yellow", value: "yellow" },
  { name: "Violet", value: "violet" },
] as const

export function ThemeColors() {
  const { color, setColor } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="gap-2 min-w-16 px-2">
          <div 
            className={`h-4 w-4 rounded-full`}
            style={{ backgroundColor: `hsl(var(--primary))` }}
          />
          <ChevronDown className="h-4 w-4" />
          <span className="sr-only">Toggle accent colors</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {accentThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setColor(theme.value)}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <div 
                className={`h-4 w-4 rounded-full`}
                style={{ backgroundColor: `var(--${theme.value}-500)` }}
              />
              {theme.name}
            </div>
            {color === theme.value ? <Check className="h-4 w-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 