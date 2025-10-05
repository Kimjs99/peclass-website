"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, Clock, Tag, FileText } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface Schedule {
  id: string
  title: string
  time: string
  type: "class" | "event" | "meeting"
  description?: string
}

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date
  onAddSchedule: (schedule: Omit<Schedule, "id">) => void
  onEditSchedule?: (id: string, schedule: Omit<Schedule, "id">) => void
  editingSchedule?: Schedule | null
}

export function ScheduleModal({ 
  isOpen, 
  onClose, 
  selectedDate, 
  onAddSchedule, 
  onEditSchedule,
  editingSchedule 
}: ScheduleModalProps) {
  const [formData, setFormData] = useState({
    title: editingSchedule?.title || "",
    time: editingSchedule?.time || "",
    type: editingSchedule?.type || "class" as const,
    description: editingSchedule?.description || ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const scheduleTypes = [
    { value: "class", label: "수업", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { value: "event", label: "행사", color: "bg-green-100 text-green-800 border-green-200" },
    { value: "meeting", label: "회의", color: "bg-purple-100 text-purple-800 border-purple-200" }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요"
    }

    if (!formData.time.trim()) {
      newErrors.time = "시간을 입력해주세요"
    } else {
      // 시간 형식 검증 (예: 09:00 - 10:30)
      const timePattern = /^\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/
      if (!timePattern.test(formData.time)) {
        newErrors.time = "시간 형식을 맞춰주세요 (예: 09:00 - 10:30)"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const scheduleData = {
      title: formData.title.trim(),
      time: formData.time.trim(),
      type: formData.type,
      description: formData.description.trim()
    }

    if (editingSchedule && onEditSchedule) {
      onEditSchedule(editingSchedule.id, scheduleData)
    } else {
      onAddSchedule(scheduleData)
    }

    // 폼 초기화
    setFormData({
      title: "",
      time: "",
      type: "class",
      description: ""
    })
    setErrors({})
    onClose()
  }

  const handleClose = () => {
    setFormData({
      title: "",
      time: "",
      type: "class",
      description: ""
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg">
              {editingSchedule ? "스케줄 수정" : "새 스케줄 추가"}
            </CardTitle>
            <CardDescription>
              {format(selectedDate, "yyyy년 M월 d일", { locale: ko })}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 제목 */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                제목 *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="스케줄 제목을 입력하세요"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* 시간 */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                시간 *
              </label>
              <Input
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="09:00 - 10:30"
                className={errors.time ? "border-red-500" : ""}
              />
              {errors.time && (
                <p className="text-sm text-red-500">{errors.time}</p>
              )}
              <p className="text-xs text-muted-foreground">
                형식: 09:00 - 10:30
              </p>
            </div>

            {/* 타입 */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Tag className="h-4 w-4" />
                타입
              </label>
              <div className="flex gap-2">
                {scheduleTypes.map((type) => (
                  <Button
                    key={type.value}
                    type="button"
                    variant={formData.type === type.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, type: type.value as any })}
                    className="flex-1"
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 설명 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">설명</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="스케줄에 대한 추가 설명을 입력하세요"
                rows={3}
              />
            </div>

            {/* 미리보기 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">미리보기</label>
              <div className="p-3 border rounded-lg bg-muted/30">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{formData.title || "제목"}</h4>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      scheduleTypes.find(t => t.value === formData.type)?.color || ""
                    }`}
                  >
                    {scheduleTypes.find(t => t.value === formData.type)?.label || "수업"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {formData.time || "시간"}
                </p>
                {formData.description && (
                  <p className="text-xs text-muted-foreground">
                    {formData.description}
                  </p>
                )}
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                취소
              </Button>
              <Button type="submit" className="flex-1">
                {editingSchedule ? "수정" : "추가"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
