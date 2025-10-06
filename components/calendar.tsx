"use client"

import { useState, useEffect } from "react"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2 } from "lucide-react"
import { ScheduleModal } from "@/components/schedule-modal"
import "react-day-picker/dist/style.css"

// 스케줄 데이터 타입 정의
interface Schedule {
  id: string
  title: string
  time: string
  type: "class" | "event" | "meeting"
  description?: string
}

// 샘플 스케줄 데이터
const sampleSchedules: Record<string, Schedule[]> = {
  "2024-01-15": [
    {
      id: "1",
      title: "기초 체육 수업",
      time: "09:00 - 10:30",
      type: "class",
      description: "1학년 대상 기초 체육 수업"
    },
    {
      id: "2",
      title: "체육 교사 연수",
      time: "14:00 - 16:00",
      type: "meeting",
      description: "새로운 교수법에 대한 연수"
    }
  ],
  "2024-01-16": [
    {
      id: "3",
      title: "농구 수업",
      time: "10:00 - 11:30",
      type: "class",
      description: "2학년 대상 농구 수업"
    }
  ],
  "2024-01-18": [
    {
      id: "4",
      title: "체육 대회",
      time: "09:00 - 17:00",
      type: "event",
      description: "전교 체육 대회"
    }
  ],
  "2024-01-20": [
    {
      id: "5",
      title: "수영 수업",
      time: "13:00 - 14:30",
      type: "class",
      description: "3학년 대상 수영 수업"
    }
  ]
}

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [schedules, setSchedules] = useState<Record<string, Schedule[]>>(sampleSchedules)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)

  // 로컬 스토리지에서 스케줄 로드
  useEffect(() => {
    const savedSchedules = localStorage.getItem("peclass-schedules")
    if (savedSchedules) {
      try {
        setSchedules(JSON.parse(savedSchedules))
      } catch (error) {
        console.error("Failed to load schedules from localStorage:", error)
      }
    }
  }, [])

  // 스케줄을 로컬 스토리지에 저장
  const saveSchedules = (newSchedules: Record<string, Schedule[]>) => {
    setSchedules(newSchedules)
    localStorage.setItem("peclass-schedules", JSON.stringify(newSchedules))
  }

  // 선택된 날짜의 스케줄 가져오기
  const getSchedulesForDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd")
    return schedules[dateString] || []
  }

  // 날짜에 스케줄이 있는지 확인
  const hasSchedule = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd")
    return schedules[dateString] && schedules[dateString].length > 0
  }

  // 스케줄 추가
  const handleAddSchedule = (scheduleData: Omit<Schedule, "id">) => {
    if (!selectedDate) return

    const dateString = format(selectedDate, "yyyy-MM-dd")
    const newSchedule: Schedule = {
      ...scheduleData,
      id: Date.now().toString()
    }

    const newSchedules = {
      ...schedules,
      [dateString]: [...(schedules[dateString] || []), newSchedule]
    }

    saveSchedules(newSchedules)
  }

  // 스케줄 수정
  const handleEditSchedule = (id: string, scheduleData: Omit<Schedule, "id">) => {
    if (!selectedDate) return

    const dateString = format(selectedDate, "yyyy-MM-dd")
    const newSchedules = {
      ...schedules,
      [dateString]: schedules[dateString]?.map(schedule =>
        schedule.id === id ? { ...scheduleData, id } : schedule
      ) || []
    }

    saveSchedules(newSchedules)
    setEditingSchedule(null)
  }

  // 스케줄 삭제
  const handleDeleteSchedule = (id: string) => {
    if (!selectedDate) return

    const dateString = format(selectedDate, "yyyy-MM-dd")
    const newSchedules = {
      ...schedules,
      [dateString]: schedules[dateString]?.filter(schedule => schedule.id !== id) || []
    }

    saveSchedules(newSchedules)
  }

  // 스케줄 편집 모달 열기
  const handleEditClick = (schedule: Schedule) => {
    setEditingSchedule(schedule)
    setIsModalOpen(true)
  }

  // 모달 닫기
  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingSchedule(null)
  }

  // 스케줄 타입별 색상
  const getScheduleTypeColor = (type: Schedule["type"]) => {
    switch (type) {
      case "class":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "event":
        return "bg-green-100 text-green-800 border-green-200"
      case "meeting":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // 스케줄 타입별 라벨
  const getScheduleTypeLabel = (type: Schedule["type"]) => {
    switch (type) {
      case "class":
        return "수업"
      case "event":
        return "행사"
      case "meeting":
        return "회의"
      default:
        return "기타"
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* 캘린더 */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>수업 일정</CardTitle>
            <CardDescription>
              날짜를 선택하여 해당 날의 스케줄을 확인하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              locale={ko}
              modifiers={{
                hasSchedule: (date) => hasSchedule(date)
              }}
              modifiersStyles={{
                hasSchedule: {
                  backgroundColor: "#3b82f6",
                  color: "white",
                  fontWeight: "bold"
                }
              }}
              className="w-full"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                day_range_end: "day-range-end",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
              components={{
                Chevron: ({ ...props }) => {
                  if (props.orientation === 'left') {
                    return <ChevronLeft className="h-4 w-4" />
                  }
                  return <ChevronRight className="h-4 w-4" />
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* 선택된 날짜의 스케줄 */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, "yyyy년 M월 d일", { locale: ko }) : "날짜를 선택하세요"}
            </CardTitle>
            <CardDescription>
              {selectedDate ? "해당 날의 스케줄입니다" : "캘린더에서 날짜를 선택해주세요"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-3">
                {getSchedulesForDate(selectedDate).length > 0 ? (
                  getSchedulesForDate(selectedDate).map((schedule) => (
                    <div
                      key={schedule.id}
                      className="p-3 border rounded-lg hover:bg-accent/50 transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{schedule.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${getScheduleTypeColor(schedule.type)}`}
                          >
                            {getScheduleTypeLabel(schedule.type)}
                          </Badge>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleEditClick(schedule)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteSchedule(schedule.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{schedule.time}</p>
                      {schedule.description && (
                        <p className="text-xs text-muted-foreground">{schedule.description}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">이 날에는 스케줄이 없습니다</p>
                  </div>
                )}
                
                <Button 
                  className="w-full mt-4" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  스케줄 추가
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">캘린더에서 날짜를 선택해주세요</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 스케줄 모달 */}
      {selectedDate && (
        <ScheduleModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          selectedDate={selectedDate}
          onAddSchedule={handleAddSchedule}
          onEditSchedule={handleEditSchedule}
          editingSchedule={editingSchedule}
        />
      )}
    </div>
  )
}
