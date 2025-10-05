export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
                체육
                <br />
                연구소
              </h3>
              <p className="text-sm text-primary-foreground/80">모든 권리 보유.</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4 text-lg">바로가기</h4>
                <ul className="space-y-3 text-primary-foreground/80">
                  <li>
                    <a href="/calendar" className="hover:text-primary-foreground transition-colors">
                      캘린더
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-foreground transition-colors">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-foreground transition-colors">
                      개인정보처리방침
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-lg">소셜 미디어</h4>
                <ul className="space-y-3 text-primary-foreground/80">
                  <li>
                    <a href="#" className="hover:text-primary-foreground transition-colors">
                      인스타그램
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-foreground transition-colors">
                      링크드인
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-foreground transition-colors">
                      유튜브
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8">
            <p className="text-sm text-primary-foreground/60 text-center">
              체육 수업 연구소 · 창의성, 문화, 성장을 위한 헌신
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
