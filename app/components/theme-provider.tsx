import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"
type Color = "neutral" | "zinc" | "slate" | "stone" | "gray" | "rose" | "orange" | "green" | "blue" | "yellow" | "violet"
type ContentColor = "neutral" | "zinc" | "slate" | "stone" | "gray"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultColor?: Color
  defaultContentColor?: ContentColor
}

interface ThemeProviderState {
  theme: Theme
  color: Color
  contentColor: ContentColor
  setTheme: (theme: Theme) => void
  setColor: (color: Color) => void
  setContentColor: (color: ContentColor) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  color: "neutral",
  contentColor: "neutral",
  setTheme: () => null,
  setColor: () => null,
  setContentColor: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColor = "neutral",
  defaultContentColor = "neutral",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || defaultTheme
    }
    return defaultTheme
  })
  
  const [color, setColor] = useState<Color>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme-color") as Color) || defaultColor
    }
    return defaultColor
  })

  const [contentColor, setContentColor] = useState<ContentColor>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("content-color") as ContentColor) || defaultContentColor
    }
    return defaultContentColor
  })

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute("data-color", color)
  }, [color])

  useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute("data-content", contentColor)
  }, [contentColor])

  const value = {
    theme,
    color,
    contentColor,
    setTheme: (theme: Theme) => {
      setTheme(theme)
      try {
        localStorage.setItem("theme", theme)
      } catch {
        // Ignore localStorage errors
      }
    },
    setColor: (color: Color) => {
      setColor(color)
      try {
        localStorage.setItem("theme-color", color)
      } catch {
        // Ignore localStorage errors
      }
    },
    setContentColor: (color: ContentColor) => {
      setContentColor(color)
      try {
        localStorage.setItem("content-color", color)
      } catch {
        // Ignore localStorage errors
      }
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
} 