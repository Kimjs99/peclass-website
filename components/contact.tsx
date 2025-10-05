"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Contact() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">문의하기</h2>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">궁금한 점이 있으신가요?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>서비스 경험 준비되셨나요?</CardTitle>
                <CardDescription>지금 바로 시작해보세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="이름" />
                  <Input placeholder="성" />
                </div>
                <Input placeholder="이메일" type="email" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="조직/기관" />
                  <Input placeholder="역할" />
                </div>
                <Button className="w-full" size="lg">
                  제출하기
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>무엇이든 물어보세요</CardTitle>
                <CardDescription>
                  기업이나 브랜드이신가요? 창의적인 서비스를 찾고 계신가요? 프리랜서, 에이전시, 코치를 찾고 계신가요?
                  함께 새로운 것을 만들어보세요!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="이메일 입력" type="email" />
                <Textarea placeholder="메시지를 입력하세요" rows={5} />
                <Button variant="secondary" className="w-full" size="lg">
                  연락하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
