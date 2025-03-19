import { Check, ChevronDown } from "lucide-react"

import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const contentThemes = [
  { name: "Neutral", value: "neutral" },
  { name: "Zinc", value: "zinc" },
  { name: "Slate", value: "slate" },
  { name: "Stone", value: "stone" },
  { name: "Gray", value: "gray" },
] as const

export function ContentColors() {
  const { contentColor, setContentColor } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="gap-2">
          <span className="text-xs font-semibold">Aa</span>
          <ChevronDown className="h-4 w-4" />
          <span className="sr-only">Toggle content colors</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {contentThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setContentColor(theme.value)}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Aa</span>
              {theme.name}
            </div>
            {contentColor === theme.value ? <Check className="h-4 w-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 