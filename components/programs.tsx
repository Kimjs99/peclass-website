import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const programs = [
  {
    title: "우리의 서비스",
    description: "체계적이고 과학적인 체육 교육 프로그램",
  },
  {
    title: "팀 소개",
    description: "전문성과 열정을 갖춘 교육 전문가들",
  },
  {
    title: "리조트워크™",
    description: "창의적 사고를 위한 특별한 교육 방법론",
  },
  {
    title: "피드백 & 소식",
    description: "학생과 학부모님들의 생생한 후기",
  },
]

export function Programs() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {programs.map((program, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl md:text-3xl">{program.title}</CardTitle>
                  <CardDescription className="text-base md:text-lg">{program.description}</CardDescription>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-12 w-12 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
