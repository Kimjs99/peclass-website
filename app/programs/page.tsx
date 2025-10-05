import { SiteGuide } from "@/components/site-guide"

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">프로그램 둘러보기</h1>
          <p className="text-lg text-muted-foreground">체육 수업 연구소의 모든 서비스를 확인하세요</p>
        </div>
      </div>

      {/* Site Guide Content */}
      <div className="container mx-auto px-4 py-8">
        <SiteGuide />
      </div>
    </main>
  )
}
