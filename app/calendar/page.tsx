import { Calendar } from "@/components/calendar"

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">수업 스케줄</h1>
          <p className="text-lg text-muted-foreground">체육 수업 일정을 확인하고 관리하세요</p>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="container mx-auto px-4 py-8">
        <Calendar />
      </div>
    </main>
  )
}
