import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Trophy, Target } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "연구 기반 교육",
    description: "최신 체육 교육 이론과 실천을 결합한 프로그램",
  },
  {
    icon: Users,
    title: "맞춤형 수업",
    description: "학생 개개인의 특성을 고려한 차별화된 교육",
  },
  {
    icon: Trophy,
    title: "성과 중심",
    description: "측정 가능한 목표 설정과 체계적인 평가",
  },
  {
    icon: Target,
    title: "전인적 발달",
    description: "신체, 정신, 사회성의 균형잡힌 성장",
  },
]

export function Research() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">우리의 연구 방법론</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            과학적 근거와 실천적 경험을 바탕으로 한 체육 교육
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
