import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  BookOpen, 
  Users, 
  Trophy, 
  Target, 
  MessageSquare, 
  ArrowRight,
  GraduationCap,
  Heart,
  Brain,
  Activity,
  FileText,
  Video,
  Phone,
  Mail,
  Home
} from "lucide-react"
import Link from "next/link"

export function SiteGuide() {
  const mainSections = [
    {
      title: "홈페이지",
      description: "체육 수업 연구소의 메인 페이지",
      icon: Home,
      href: "/",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      features: ["소개", "서비스 개요", "연락처"]
    },
    {
      title: "수업 스케줄",
      description: "체육 수업 일정을 확인하고 관리",
      icon: Calendar,
      href: "/calendar",
      color: "bg-green-100 text-green-800 border-green-200",
      features: ["월간 캘린더", "일정 관리", "스케줄 추가"]
    },
    {
      title: "프로그램 둘러보기",
      description: "전체 사이트의 가이드맵과 서비스 소개",
      icon: BookOpen,
      href: "/programs",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      features: ["사이트 맵", "서비스 안내", "이용 가이드"]
    }
  ]

  const services = [
    {
      title: "기초 체육 수업",
      description: "1학년 대상 기초 체육 교육 프로그램",
      icon: GraduationCap,
      color: "bg-blue-100 text-blue-800",
      details: ["기본 동작 학습", "체력 향상", "협동심 기르기"]
    },
    {
      title: "농구 수업",
      description: "2학년 대상 농구 전문 교육",
      icon: Activity,
      color: "bg-orange-100 text-orange-800",
      details: ["기본 기술", "전술 이해", "경기 운영"]
    },
    {
      title: "수영 수업",
      description: "3학년 대상 수영 교육 프로그램",
      icon: Heart,
      color: "bg-cyan-100 text-cyan-800",
      details: ["기본 영법", "안전 교육", "체력 강화"]
    },
    {
      title: "체육 대회",
      description: "전교 체육 대회 및 행사",
      icon: Trophy,
      color: "bg-yellow-100 text-yellow-800",
      details: ["경기 운영", "상품 시상", "기록 관리"]
    },
    {
      title: "교사 연수",
      description: "새로운 교수법에 대한 연수",
      icon: Users,
      color: "bg-indigo-100 text-indigo-800",
      details: ["교수법 연구", "실습 교육", "자료 공유"]
    },
    {
      title: "연구 자료",
      description: "체육 교육 연구 자료 및 논문",
      icon: FileText,
      color: "bg-pink-100 text-pink-800",
      details: ["연구 논문", "교육 자료", "통계 분석"]
    }
  ]

  const contactMethods = [
    {
      title: "이메일 문의",
      description: "궁금한 점을 이메일로 문의하세요",
      icon: Mail,
      action: "이메일 보내기",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "전화 상담",
      description: "직접 상담이 필요한 경우",
      icon: Phone,
      action: "전화하기",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "온라인 상담",
      description: "실시간 화상 상담 서비스",
      icon: Video,
      action: "상담 예약",
      color: "bg-purple-100 text-purple-800"
    }
  ]

  return (
    <div className="space-y-12">
      {/* 사이트 맵 */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">사이트 맵</h2>
          <p className="text-lg text-muted-foreground">체육 수업 연구소의 모든 서비스를 한눈에 확인하세요</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {mainSections.map((section, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${section.color}`}>
                    <section.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription className="text-sm">{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {section.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Link href={section.href}>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {section.title} 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 서비스 상세 안내 */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">서비스 상세 안내</h2>
          <p className="text-lg text-muted-foreground">체육 수업 연구소에서 제공하는 다양한 프로그램들</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${service.color}`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="text-sm">{service.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <Badge key={idx} variant="outline" className="mr-2 mb-2">
                      {detail}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 연락처 및 상담 */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">연락처 및 상담</h2>
          <p className="text-lg text-muted-foreground">언제든지 문의하세요. 친절하게 안내해드립니다</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 text-center">
              <CardHeader>
                <div className={`inline-flex p-3 rounded-full ${method.color} mb-4`}>
                  <method.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{method.title}</CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 이용 가이드 */}
      <section className="bg-muted/30 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">이용 가이드</h2>
          <p className="text-lg text-muted-foreground">체육 수업 연구소를 효과적으로 이용하는 방법</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">1단계: 사이트 둘러보기</h3>
            <p className="text-muted-foreground">
              먼저 홈페이지에서 우리 연구소의 비전과 서비스를 확인해보세요. 
              프로그램 둘러보기 페이지에서 전체적인 사이트 구조를 파악할 수 있습니다.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">2단계: 수업 일정 확인</h3>
            <p className="text-muted-foreground">
              캘린더 페이지에서 수업 일정을 확인하고, 관심 있는 프로그램의 
              시간과 내용을 미리 확인해보세요.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">3단계: 문의 및 상담</h3>
            <p className="text-muted-foreground">
              궁금한 점이 있으시면 언제든지 연락주세요. 이메일, 전화, 
              온라인 상담을 통해 친절하게 안내해드립니다.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">4단계: 프로그램 참여</h3>
            <p className="text-muted-foreground">
              원하는 프로그램에 참여하여 체육 교육의 새로운 경험을 
              시작해보세요. 지속적인 피드백과 개선을 통해 최고의 서비스를 제공합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
