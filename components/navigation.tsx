"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Menu, 
  X,
  GraduationCap,
  Users,
  Trophy
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    {
      title: "홈",
      href: "/",
      icon: Home,
      description: "메인 페이지"
    },
    {
      title: "수업 스케줄",
      href: "/calendar",
      icon: Calendar,
      description: "일정 확인"
    },
    {
      title: "프로그램 둘러보기",
      href: "/programs",
      icon: BookOpen,
      description: "사이트 가이드"
    }
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">체육 수업 연구소</h1>
                <p className="text-xs text-primary-foreground/70">Physical Education Lab</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  className={`text-primary-foreground hover:bg-primary-foreground/10 ${
                    isActive(item.href) ? "bg-primary-foreground/20" : ""
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-primary-foreground/20 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className={`w-full justify-start text-primary-foreground hover:bg-primary-foreground/10 ${
                      isActive(item.href) ? "bg-primary-foreground/20" : ""
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-primary-foreground/70">{item.description}</div>
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
