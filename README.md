# RunWay Portfolio

RunWay 앱 포트폴리오 웹사이트. Next.js 16 (App Router) + Tailwind v4.

## 로컬 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인.

## Vercel 배포

```bash
npm i -g vercel
vercel
```

또는 GitHub에 push 후 vercel.com에서 저장소 import - 별도 설정 없이 바로 빌드됨.

> 참고: 이 빌드 환경에서는 `next/font/google`(Google Fonts API)에 네트워크
> 접근이 막혀 있어서, `next/font/local`로 폰트 파일(`public/fonts/`)을
> 직접 서빙하도록 구성했습니다. Vercel 배포 환경에서는 문제없이 동작합니다.
> Google Fonts CDN을 직접 쓰고 싶다면 `app/layout.tsx`의 `localFont` import를
> `next/font/google`의 `Orbitron`, `Inter`로 교체하면 됩니다.

## 구조

```
app/
  page.tsx                  → 메인 페이지 (Hero, Concept, Screens, Architecture)
  troubleshooting/page.tsx  → 정비 로그 (트러블슈팅 6건)
  layout.tsx                → 폰트, 메타데이터
  globals.css                → RunWay 테마 토큰 (앱과 동일한 색상)
components/
  Hero.tsx             → 랜딩 히어로 + PFDWidget
  PFDWidget.tsx         → 자동 재생되는 미니 계기판 시뮬레이션 (GPWS 사이클)
  Concept.tsx           → Mission/Free Flight 모드 + GPWS 카드
  Screens.tsx           → iPhone/Watch 스크린샷 갤러리 (현재 플레이스홀더)
  DeviceFrame.tsx       → 디바이스 베젤 프레임 컴포넌트
  Architecture.tsx      → RunningCenter Actor 데이터 흐름 다이어그램
  TroubleshootCard.tsx  → 정비 로그 아코디언 카드
  Nav.tsx / Footer.tsx
lib/
  data.ts → 트러블슈팅 콘텐츠 (troubleshooting_content.md 기반)
```

## 스크린샷 교체하기

`components/Screens.tsx`에서 `PhoneFrame` / `WatchFrame` 안의
`ScreenPlaceholder`를 실제 이미지로 바꾸면 됩니다:

```tsx
// Before
<PhoneFrame label="TAKEOFF SEQUENCE">
  <ScreenPlaceholder title="TAKEOFF SEQUENCE" />
</PhoneFrame>

// After
<PhoneFrame label="TAKEOFF SEQUENCE">
  <img src="/screenshots/takeoff.png" alt="Takeoff sequence" className="h-full w-full object-cover" />
</PhoneFrame>
```

이미지는 `public/screenshots/`에 넣고 경로로 참조하면 됩니다. GIF도 동일하게
`<img>` 태그로 처리 가능합니다 (Next.js `<Image>`는 GIF 애니메이션을
정적으로 만들어버리니 GIF는 일반 `<img>` 권장).

## 콘텐츠 수정

- 트러블슈팅 항목: `lib/data.ts`의 `troubleshootCases` 배열 편집
- FAQ 항목: `lib/faq.ts`의 `faqItems` 배열 편집
- 색상 토큰: `app/globals.css`의 `:root` 안 `--rw-*` 변수 (앱 테마와 동일하게 유지 중)
- 카피/문구: 각 컴포넌트 파일 내 직접 수정

## 문의 폼 (Support 페이지) 설정

`/support` 페이지의 문의 폼은 [Formspree](https://formspree.io)의
`@formspree/react` SDK를 사용합니다. 서버 없이 클라이언트에서 바로
제출하는 방식이라 별도 백엔드나 도메인 인증이 필요 없습니다.

1. [formspree.io](https://formspree.io)에서 가입 후 새 Form 생성
2. 생성된 Form의 ID(대시보드에서 확인 가능, 예: `mwvdwrng`) 확인
3. 로컬 개발: 프로젝트 루트에 `.env.local` 파일을 만들고 아래처럼 작성

   ```
   NEXT_PUBLIC_FORMSPREE_ID=mwvdwrng
   ```

4. Vercel 배포: 프로젝트 설정 → **Settings → Environment Variables**에서
   `NEXT_PUBLIC_FORMSPREE_ID`를 동일하게 등록 후 재배포

Formspree 무료 티어는 월 50건까지 제출 가능합니다. Form 대시보드에서
받는 이메일 주소를 지정할 수 있습니다(기본값은 가입 이메일).

환경변수가 설정되지 않은 상태에서는 제출 버튼이 비활성화되고
안내 메시지가 표시되며, 하단의 mailto 링크로 직접 연락할 수 있습니다.
