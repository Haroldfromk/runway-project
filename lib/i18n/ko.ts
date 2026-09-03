import type { SiteDictionary } from "./schema";

export const ko: SiteDictionary = {
  nav: {
    concept: "Concept",
    screens: "Screens",
    architecture: "Architecture",
    privacy: "Privacy",
    support: "Support",
    maintenanceLog: "Maintenance Log",
    updates: "Updates",
  },
  hero: {
    badge: "Ex-항공정비사가 설계한 러닝 앱",
    titleLine1: "Turn Every",
    titleLine2Prefix: "Run Into A",
    titleLine2Accent: "Flight.",
    description: [
      "A320F 정비사 출신 개발자가 만든 iOS 러닝 트래커.",
      "GPS, 심박수, 케이던스를 계기판처럼 읽고, 페이스 이탈을 GPWS 경보로 알려줍니다.",
    ],
    appStoreCta: "App Store에서 다운로드",
    badgeOs: "iOS 26+ · watchOS 11.5+",
    badgeStack: "SwiftUI · Actor · AsyncStream",
    androidBadge: "Android 포팅 진행 중",
  },
  concept: {
    eyebrow: "Flight Operations",
    title: "두 가지 비행 모드",
    description: [
      "항공기 운항 절차에서 착안한 상태 머신으로 러닝 전체를 관리합니다.",
      "시작 버튼을 누르면 이륙 시퀀스가, 러닝 중에는 실시간 계기판이 기다립니다.",
    ],
    modes: [
      {
        tag: "MODE A",
        title: "Mission Flight",
        desc: "목표 페이스와 거리를 설정하고 운항합니다. 허용 오차를 벗어나면 GPWS가 즉시 경고합니다.",
        points: [
          "목표 페이스 ± 오차 설정",
          "빠른 거리 선택 (3K / 5K / 10K / 하프 / 풀)",
          "목표 거리 50m 전 MINIMUMS 경보",
        ],
      },
      {
        tag: "MODE B",
        title: "Free Flight",
        desc: "목표 없이 자유롭게 달리는 VFR(시계비행) 모드. 수동으로 Touchdown하여 종료합니다.",
        points: ["목표 설정 없음", "GPWS 비활성", "자유로운 페이스 기록"],
      },
    ],
    gpwsEyebrow: "Ground Proximity Warning System",
    gpwsAlerts: [
      { label: "SINK RATE", desc: "목표 페이스보다 느려짐" },
      { label: "OVERSPEED", desc: "목표 페이스보다 빨라짐" },
      { label: "MINIMUMS", desc: "목표 거리 50m 전 진입" },
    ],
  },
  screens: {
    eyebrow: "iPhone & Apple Watch",
    title: "두 화면, 하나의 비행",
    description: [
      "Watch가 주도하든 iPhone이 주도하든, 두 기기는 같은 FlightData를 공유합니다.",
      "이륙 준비부터 착륙 후 기록까지, 실제 화면으로 확인해보세요.",
    ],
    phoneLabel: "iPhone · 좌우로 스크롤",
    watchLabel: "Apple Watch",
    phoneShots: [
      { key: "homeview", label: "HOME · 대시보드" },
      { key: "missionflight", label: "MISSION FLIGHT · 설정" },
      { key: "takeoff", label: "TAKEOFF · 사전 점검" },
      { key: "missionrunning", label: "MISSION FLIGHT · CRUISE" },
      { key: "freerunning", label: "FREE FLIGHT · CRUISE" },
      { key: "touchdown", label: "TOUCHDOWN" },
      { key: "summary", label: "FLIGHT SUMMARY · MAP ROUTE" },
      { key: "logbook", label: "LOGBOOK" },
      { key: "databackup", label: "DATA BACKUP · CloudKit" },
      { key: "alerts", label: "ALERTS · GPWS 기록" },
      { key: "chart", label: "FLIGHT CALENDAR" },
      { key: "notification", label: "TOWER REMINDERS · 알림" },
      { key: "dynamic-island", label: "DYNAMIC ISLAND" },
    ],
    watchShots: [
      { key: "home", label: "WATCH · MODE SELECT" },
      { key: "running", label: "WATCH · PFD" },
      { key: "summary", label: "WATCH · SUMMARY" },
    ],
  },
  architecture: {
    eyebrow: "Under The Hood",
    title: "설계 결정 네 가지",
    description: [
      "동시성 처리, 상태 관리, 기기 간 동기화, GPWS 판정 로직 - RunWay를",
      "만들며 가장 많이 고민한 네 가지 지점입니다.",
    ],
    quoteLabel: "왜 이렇게 설계했는가",
    tabs: [
      { id: "actor", label: "RunningCenter Actor", eyebrow: "동시성" },
      { id: "phase", label: "FlightPhase 상태 머신", eyebrow: "상태 관리" },
      { id: "mirroring", label: "Watch 미러링", eyebrow: "기기 간 동기화" },
      { id: "gpws", label: "GPWS 판정 로직", eyebrow: "페이스 이탈 감지" },
    ],
    actor: {
      quote:
        "GPS 업데이트가 연속적으로 들어오면서 페이스, 거리, GPWS 판정까지 매번 계산해야 하므로, 이 계산 로직을 RunningCenter Actor로 격리해 상태 무결성을 보장했습니다. 심박수와 케이던스는 WatchConnectivity가 받아서 판정 로직 없이 값만 스레드 안전하게 들고 있는 HealthCenter Actor에 넘기고, RunningCenter가 필요할 때 그 값을 가져가 @Observable ViewModel로 전달합니다.",
    },
    phase: {
      quote: [
        "각 화면이 독립적으로 상태를 판단하면 화면 간 불일치가 생깁니다.",
        "항공기 운항 단계에서 착안한 FlightPhase 하나를 앱 전체가 참조하게 해서, Dynamic Island와 Watch, iPhone PFD가 항상 같은 상태를 보여주도록 했습니다.",
      ],
    },
    mirroring: {
      leadingLabel: "GPS + 계산 담당",
      followingLabel: "수신 + 표시만",
      payloadLabel: "FlightData (pace/거리/좌표, 3초 throttle) + elapsedTime (1초 별도 동기화)",
      quote: [
        "처음에는 iPhone과 Watch가 미러링 중에도 각자 GPS를 잡고 있었습니다.",
        "주도 기기(startOrigin) 하나만 위치를 추적하고 계산 결과를 상대에게 보내는 구조로 바꾸니, 중복 연산도 없어지고 화면 전환 지연도 사라졌습니다.",
      ],
    },
    gpws: {
      overspeedLabel: "OVERSPEED - 목표보다 빠름",
      normalLabel: "정상 범위",
      sinkRateLabel: "SINK RATE - 목표보다 느림",
      minimumsLabel: "MINIMUMS - 목표 거리 50m 전",
      quote:
        "목표 페이스 ± 허용 오차를 벗어나면 GPWS가 즉시 반응해야 하므로, 위치가 업데이트될 때마다 현재 페이스를 계산해 SINK RATE·OVERSPEED 여부를 판정합니다. 목표 거리 50m 전부터는 페이스와 무관하게 MINIMUMS를 우선 적용해, 완주가 임박했다는 신호를 놓치지 않도록 했습니다.",
    },
    stack: [
      { label: "SwiftUI", role: "UI" },
      { label: "@MainActor + @Observable", role: "상태관리" },
      { label: "RunningCenter (Actor)", role: "동시성" },
      { label: "HealthCenter (Actor)", role: "심박수/케이던스 스레드 안전 보관" },
      { label: "AsyncStream", role: "센서 → ViewModel" },
      { label: "FlightPhase enum", role: "상태 머신" },
      { label: "WatchConnectivity", role: "iPhone ↔ Watch" },
      { label: "SwiftData", role: "저장" },
      { label: "CloudKit (CKRecord)", role: "수동 백업/복원 · Private Database" },
      { label: "Douglas-Peucker", role: "경로 대각선 비례 오차로 GPS 좌표 압축" },
      { label: "MapKit + MapPolyline", role: "경로 시각화" },
      { label: "HealthKit", role: "심박수·케이던스·운동 세션" },
      { label: "WidgetKit + ActivityKit", role: "Dynamic Island" },
      { label: "WeatherKit", role: "실시간 날씨" },
      { label: "AVSpeechSynthesizer", role: "km 스플릿·카운트다운 음성 안내" },
      { label: "Combine", role: "위치·알림·세션 상태 Publisher + Timer" },
    ],
  },
  architecturePage: {
    backLabel: "RunWay 홈으로",
    mapEyebrow: "System Flow",
    mapTitle: "전체 시스템맵",
    mapDescription: [
      "GPS·심박·고도 센서부터 화면, 저장, 아이폰↔워치 동기화까지 실제 앱을 구성하는",
      "17개 컴포넌트와 그 사이를 오가는 데이터를 한 장으로 그렸습니다.",
    ],
    mapHint: "박스를 클릭하면 오른쪽에 실제 코드가 뜹니다",
    bands: ["01 · 센서 입력", "02 · 핵심 연산 (actor)", "03 · ViewModel · 기기간 동기화", "04 · 실시간 화면", "05 · 저장", "06 · 기록 열람"],
    intentLabel: "왜 이렇게 했는가",
    respLabel: "담당 기능",
  },
  systemsMapNodes: [
    {
      id: "loc",
      name: "LocationService",
      path: "RunWay/Shared/Service/LocationService.swift",
      desc: "CLLocationManager를 래핑해 위치 업데이트를 발행한다. 10초 이내 · 정확도 50m 이내인 샘플만 통과시킨다.",
      resp: [
        "CLLocationManager 래핑, 위치 업데이트를 Combine 퍼블리셔로 발행",
        "10초 이내 · 수평 정확도 50m 이내 샘플만 통과시키는 필터링",
        "위치 권한 상태 변화 처리 (요청/제한/거부 알림 발행)",
        "distanceFilter 없이 정지 중에도 위치를 계속 수신하도록 추적 시작/중단",
      ],
    },
    {
      id: "health",
      name: "HealthCenter",
      path: "RunWay/Shared/Actor/HealthCenter.swift",
      desc: "백그라운드로 들어오는 심박/케이던스를 스레드 안전하게 보관만 한다. 판정 로직은 RunningCenter가 가져가서 한다.",
      resp: [
        "actor로 심박수·케이던스 값을 스레드 안전하게 보관",
        "판정 로직은 갖지 않고, RunningCenter가 필요할 때 값을 읽어감",
      ],
    },
    {
      id: "alt",
      name: "AltimeterService",
      path: "RunWay/Shared/Service/AltimeterService.swift",
      desc: "CMAltimeter로 기압계 기반 상대 고도를 수집한다. 기압계가 없는 기기는 아무 값도 발행하지 않는다.",
      resp: [
        "CMAltimeter 래핑, 상대 고도 업데이트를 퍼블리셔로 발행",
        "기압계 없는 기기는 아무 값도 발행 안 함",
        "온보딩 시점에 권한 팝업만 미리 띄우고 즉시 중단",
      ],
    },
    {
      id: "core",
      name: "RunningCenter",
      path: "RunWay/Shared/Actor/RunningCenter.swift",
      desc: "모든 러닝 계산의 중심. GPS/심박/고도를 받아 거리·페이스·GPWS·스플릿을 계산해 FlightData 스트림으로 내보낸다.",
      resp: [
        "누적 거리 계산, 이중 지수 이동평균(Double EMA)으로 페이스 스무딩",
        "raw 속도 기반 정지 판단(isStationary), speedAccuracy 신뢰도 체크",
        "GPWS(SINK RATE/OVERSPEED/MINIMUMS) 판정, 정지 중엔 normal로 리셋",
        "km 단위 스플릿 기록, 상대 고도 스무딩과 이상치 필터링",
      ],
      intent: "iOS와 Watch는 각자 GPS·심박·고도를 따로 받기 때문에, RunningCenter도 기기마다 독립된 인스턴스로 돈다. 정지 판단은 GPS 신뢰도(speedAccuracy)가 낮은 샘플을 걸러가며 확정하는데, 처음엔 이 체크가 정지 판단에만 걸려있고 페이스 계산용 속도 스무딩에는 안 걸려있었다. 오버스피드에 반응해 급감속하는 순간 신뢰도가 자주 음수로 찍히는 바람에, 정지 확정은 안 되는데 스무딩 값만 계속 낮아져 페이스가 무한정 부풀다 앱이 죽는 실사용 버그로 이어졌다. 스무딩 갱신을 같은 신뢰도 체크 안으로 옮기는 것으로 1.3.1에서 해결했다.",
    },
    {
      id: "runvm",
      name: "RunViewModel",
      path: "RunWay/ViewModels/RunViewModel.swift",
      desc: "iPhone 러닝 화면의 핵심 ViewModel. LocationService·RunningCenter·HealthKitService·WatchConnectivityService를 조율한다.",
      resp: [
        "LocationService·RunningCenter·HealthKitService·WatchConnectivityService 조율",
        "Live Activity, 음성 안내(TTS), WeatherKit 날씨 정보 서비스 관리",
        "러닝 종료 시 SwiftData 저장 및 RunReminderService 재예약",
        "Watch 미러링 시작/종료, 원격 종료 신호 처리",
      ],
    },
    {
      id: "watchvm",
      name: "WatchViewModel",
      path: "RunWayWatch Watch App/ViewModels/WatchViewModel.swift",
      desc: "RunViewModel과 동일한 구조를 Watch에 맞게 구현. startOrigin으로 주도 기기/미러링 기기 동작을 가른다.",
      resp: [
        "RunViewModel과 동일한 구조를 Watch 환경에 맞게 구현",
        "startOrigin으로 주도 기기 / 미러링 기기 동작을 분기",
        "Watch 단독 러닝은 저장까지 직접 처리",
      ],
    },
    {
      id: "wc",
      name: "WatchConnectivityService",
      path: "RunWay/Shared/Service/WatchConnectivityService.swift",
      desc: "WCSession을 래핑한 기기간 브리지. FlightData는 3초 throttle로, isPaused는 즉시 전송된다.",
      resp: [
        "WCSession 래핑, 아이폰↔워치 메시지 송수신",
        "FlightData는 3초 throttle, isPaused/경과시간은 즉시 전송",
        "iOS 전용/watchOS 전용 로직은 extension으로 분리",
      ],
      intent: "처음엔 미러링 중에도 iPhone과 Watch가 각자 GPS를 잡고 있어서, 주도 기기가 GPS 락을 새로 잡는 동안 화면 전환이 늦어졌다. startOrigin을 기준으로 주도 기기만 위치를 추적하고 계산 결과를 상대에게 보내는 구조로 바꾸면서 중복 연산과 지연이 함께 사라졌다.",
    },
    {
      id: "pfd",
      name: "PFDView",
      path: "RunWay/Views/Running/PFDView.swift",
      desc: "러닝 중 실시간 계기판. SpeedTape, NavDisplay, Mission HUD, GPWS Bar로 구성된다.",
      resp: [
        "SpeedTape, NavDisplay, Mission HUD, GPWS Bar로 화면 구성",
        "GPWS 상태 변화 시 화면 플래시와 햅틱 피드백",
        "세션이 끊겨도 onDisappear에서 상태 정리",
      ],
    },
    {
      id: "watchpfd",
      name: "WatchPFDView",
      path: "RunWayWatch Watch App/Views/WatchPFDView.swift",
      desc: "Watch용 실시간 계기판. gpwsStatus에 따라 WatchGPWSView 오버레이 표시 여부를 결정한다.",
      resp: [
        "gpwsStatus에 따라 WatchGPWSView 오버레이 표시 여부 결정",
        "목표(페이스/심박) 기준 실시간 편차 계산",
      ],
    },
    {
      id: "gpws",
      name: "WatchGPWSView",
      path: "RunWayWatch Watch App/Views/WatchGPWSView.swift",
      desc: "SINK RATE/OVERSPEED 경고 오버레이. 화면이 떠 있는 동안 2초 간격 햅틱 루프가 돈다.",
      resp: [
        "SINK RATE/OVERSPEED/MINIMUMS 유형별 경고 오버레이 렌더링",
        "경고 유형별로 다른 햅틱 패턴을 2초 간격으로 반복",
        "onDisappear 시 햅틱 즉시 취소",
      ],
      intent: "화면을 안 보고 뛸 때도 경고 종류를 구분할 수 있어야 해서, SINK RATE는 위로 두 번 여유 있게, OVERSPEED는 아래로 네 번 빠르게처럼 유형마다 다른 햅틱 패턴을 넣었다. 다만 정지 중 경고를 그대로 '얼리는' 초기 방식은 멈추기 직전 상태가 경고였으면 그 상태가 굳어 진동이 안 꺼지는 문제가 있었고, 얼리는 대신 normal로 되돌리는 방식으로 1.3.1에서 고쳤다.",
    },
    {
      id: "sdmodels",
      name: "SwiftData Models",
      path: "RunWay/Models/SwiftData/*.swift",
      desc: "SwiftDataFlight(러닝 1건) 안에 Split(km 구간)·Alert(GPWS 이력)·Coordinate(좌표)가 cascade로 딸린다.",
      resp: [
        "SwiftDataFlight: 러닝 1건의 거리·시간·페이스·심박 요약",
        "SwiftDataSplit: km 구간별 페이스/심박/케이던스/고도",
        "SwiftDataAlert: GPWS 경고 발생 시점과 유형 이력",
        "Flight 삭제 시 연관 데이터 cascade 삭제",
      ],
      intent: "CloudKit 동기화를 붙이면서 모든 non-optional 프로퍼티에 선언부 기본값이 필요해졌다. SwiftData의 라이트웨이트 마이그레이션이 init 파라미터가 아니라 선언부 기본값을 보고 기존 레코드를 채우기 때문에, 나중에 필드가 추가돼도 기존 유저의 마이그레이션이 안전하도록 처음부터 전부 기본값을 뒀다.",
    },
    {
      id: "cloud",
      name: "CloudBackupService",
      path: "RunWay/Shared/Service/CloudBackupService.swift",
      desc: "유저가 버튼을 눌렀을 때만 CKRecord를 직접 만들어 CloudKit Private Database에 올리고 받는다.",
      resp: [
        "유저가 버튼을 눌렀을 때만 CKRecord를 직접 생성해 업로드/다운로드",
        "좌표·알림·스플릿 배열은 JSON 인코딩해 필드 하나에 저장",
      ],
    },
    {
      id: "reminder",
      name: "RunReminderService",
      path: "RunWay/Services/RunReminderService.swift",
      desc: "마지막 러닝 + 7일 시점으로 로컬 알림을 예약한다. 러닝을 저장할 때마다 예약을 새로 잡는다.",
      resp: [
        "마지막 러닝 + 7일 시점으로 로컬 알림 예약",
        "러닝을 새로 저장할 때마다 예약을 다시 잡음",
        "설정 화면 토글로 켜고 끌 수 있음",
      ],
    },
    {
      id: "logbook",
      name: "LogbookView",
      path: "RunWay/Views/Running/LogbookView.swift",
      desc: "SwiftDataFlight를 주/월 단위로 그룹핑해서 목록으로 보여준다.",
      resp: [
        "SwiftDataFlight를 주 단위로, 다시 월 단위로 그룹핑",
        "월/주별로 접고 펼치는 목록 UI 제공",
      ],
    },
    {
      id: "summary",
      name: "FlightSummaryView",
      path: "RunWay/Views/Running/FlightSummaryView.swift",
      desc: "러닝 하나의 상세 화면. MapKit 경로, km 스플릿 차트, GPWS 배지를 보여준다.",
      resp: [
        "GPS 좌표로 MapKit 경로 지도 렌더링",
        "km 스플릿을 나이키 런클럽 스타일 차트로 표시",
        "스플릿 패턴 배지, GPWS 경고 표시",
      ],
    },
    {
      id: "alerts",
      name: "AlertsView",
      path: "RunWay/Views/Alert/AlertsView.swift",
      desc: "저장된 SwiftDataAlert를 월별로 묶어 SINK RATE/OVERSPEED/MINIMUMS 이력을 보여준다.",
      resp: [
        "SwiftDataAlert를 월별로 그룹핑해서 이력 표시",
        "SINK RATE/OVERSPEED/MINIMUMS 유형별 아이콘 구분",
      ],
    },
    {
      id: "calendar",
      name: "FlightCalendarView",
      path: "RunWay/Views/Chart/FlightCalendarView.swift",
      desc: "월간 기록을 GitHub 히트맵 스타일로 보여준다. 날짜별 누적 거리에 따라 색 농도가 달라진다.",
      resp: [
        "날짜별 누적 거리에 따라 accent 색 투명도를 달리해 히트맵 렌더링",
        "월간 총 거리 · 러닝 횟수 · 평균 페이스를 상단 요약 카드로 표시",
      ],
    },
  ],
  footer: {
    tagline: "CLEARED FOR TAKE-OFF",
    description: [
      "전직 항공정비사의 철학이 담긴 정밀 러닝 솔루션.",
      "Rotate와 함께 비행을 시작하세요.",
    ],
    githubLabel: "GitHub",
    blogLabel: "Blog",
    bottomLine: "RunWay - Turn Every Run Into A Flight",
  },
  troubleshootingPage: {
    backLabel: "RunWay 홈으로",
    eyebrow: "Maintenance Log",
    title: "정비 기록",
    description: [
      "개발 중 실제로 마주친 문제와 원인 추적, 해결 과정을 정비 로그",
      "형식으로 정리했습니다. 모든 것이 해결되지는 않았고, 구조적",
      "한계는 한계라고 정직하게 남겨두었습니다.",
    ],
    resolvedLabel: "Resolved",
    limitationLabel: "Known Limitation",
    verdictLabel: "FINAL VERDICT",
  },
  supportPage: {
    backLabel: "RunWay 홈으로",
    eyebrow: "Support",
    title: "지원 및 문의",
    description: [
      "버그를 발견했거나 기능 제안이 있다면 아래 폼으로 알려주세요.",
      "자주 묻는 질문은 그 아래에서 먼저 확인해보실 수 있습니다.",
    ],
    successTitle: "문의가 전송되었습니다",
    successBody: "확인 후 입력하신 이메일로 답변드리겠습니다.",
    categoryLabel: "문의 유형",
    categories: [
      { id: "bug", label: "버그 제보" },
      { id: "feature", label: "기능 제안" },
      { id: "other", label: "기타 문의" },
    ],
    nameLabel: "이름 (선택)",
    namePlaceholder: "홍길동",
    emailLabel: "이메일",
    emailPlaceholder: "you@example.com",
    messageLabel: "문의 내용",
    messagePlaceholder: "어떤 상황에서 어떤 문제가 있었는지 자세히 알려주시면 도움이 됩니다.",
    notConfiguredMsg: "문의 폼이 아직 설정되지 않았습니다. 아래 이메일로 직접 연락해주세요.",
    submitErrorMsg: "전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
    submitting: "전송 중...",
    submitLabel: "문의 보내기",
    directEmailPrefix: "직접 이메일을 보내고 싶다면",
    faqTitle: "자주 묻는 질문",
    faqFooterPrefix: "개인정보 처리 관련 세부 사항은",
    faqFooterLinkLabel: "개인정보 처리방침",
    faqFooterSuffix: "페이지를 참고해주세요.",
    subjectNewInquiry: "새 문의",
    subjectFromNameSuffix: "님의 문의",
  },
  updatesPage: {
    backLabel: "RunWay 홈으로",
    eyebrow: "Updates",
    title: "업데이트 내역",
    description: [
      "버전별로 뭐가 바뀌었는지 정리했습니다. 지금 실제로 배포된",
      "버전 기준이라, 이 정비 기록과 아직 다음 버전으로만 존재하는",
      "작업은 여기 포함되지 않습니다.",
    ],
    currentLabel: "현재 버전",
    releasedLabel: "배포",
  },
  faq: [
    {
      q: "iPhone과 Apple Watch 중 하나만 써도 되나요?",
      a: "네. RunWay는 iPhone 단독, Watch 단독, 또는 둘을 미러링해서 함께 사용하는 세 가지 방식을 모두 지원합니다. 미러링 시에는 러닝을 시작한 기기가 GPS와 계산을 주도하고, 다른 기기는 결과를 실시간으로 전달받아 표시만 합니다.",
    },
    {
      q: "미러링 중 한쪽 기기가 꺼지거나 앱이 종료되면 기록이 사라지나요?",
      a: "주도 기기(GPS를 추적하는 쪽)가 종료되면 해당 러닝은 중단됩니다. 다만 종료 시점까지 기록된 데이터는 로컬에 저장되어 있으니 Logbook에서 확인할 수 있습니다.",
    },
    {
      q: "러닝 데이터는 어디에 저장되나요?",
      a: "모든 러닝 기록은 Apple의 SwiftData 프레임워크를 통해 사용자 기기 내부에만 저장됩니다. 외부 서버로 전송되거나 동기화되지 않습니다.",
    },
    {
      q: "앱을 삭제하면 기록도 함께 사라지나요?",
      a: "네. 로컬 저장 방식이기 때문에 앱을 기기에서 삭제하면 저장된 모든 러닝 데이터도 함께 삭제됩니다. 삭제 전 별도 백업 기능은 현재 제공하지 않습니다.",
    },
    {
      q: "제 위치 정보나 심박수 데이터가 외부로 전송되나요?",
      a: "아니요. RunWay는 어떠한 데이터도 외부 서버로 전송, 업로드하지 않으며 제3자 분석 도구나 광고 SDK도 사용하지 않습니다. 자세한 내용은 개인정보 처리방침 페이지에서 확인하실 수 있습니다.",
    },
    {
      q: "GPWS 경고(SINK RATE, OVERSPEED)가 예상과 다르게 울려요.",
      a: "Mission Flight 모드에서 설정한 목표 페이스와 허용 오차(Pace Deviation) 기준으로 경고가 발생합니다. 설정값을 다시 확인해보시고, 그래도 이상하다면 아래 문의 폼으로 상황을 알려주세요.",
    },
  ],
  troubleshooting: [
    {
      id: "mirroring-redesign",
      number: "01",
      title: "미러링 아키텍처 재설계",
      status: "RESOLVED",
      squawk: "Watch 주도 세션인데 iPhone이 독자적으로 GPS를 잡느라 화면 전환 지연",
      steps: [
        {
          tag: "FINDING",
          title: "문제 인식",
          body: "iPhone과 Watch가 미러링 중에도 각자 LocationService와 RunningCenter를 독립적으로 돌리고 있었다. Watch에서 시작해도 iPhone이 GPS 락을 새로 잡는 동안 딜레이가 발생.",
        },
        {
          tag: "ACTION",
          title: "방향 전환",
          body: "이미 쓰이던 startOrigin을 위치 추적 여부의 기준으로 확장. 주도 기기만 GPS를 켜고 계산 결과를 상대에게 전송, 미러링 기기는 수신 후 표시만.",
        },
        {
          tag: "DISCOVERY",
          title: "양방향 구현",
          body: "sendFlightData()가 iOS 쪽에만 있어서 iPhone → Watch 방향만 가능했다. Watch 주도 미러링에서 Watch가 계산한 데이터를 iPhone에 보낼 경로 자체가 없던 숨은 허점이었다.",
        },
        {
          tag: "RESULT",
          title: "보완",
          body: "elapsedTime까지 3초 throttle에 묶으면 오차가 누적되니, FlightData와 분리해 1초마다 별도 메시지(sendElapsedTime())로 동기화. iPhone 단독 / Watch 단독 / 양방향 미러링 4가지 시나리오가 startOrigin 하나로 정리됐다.",
        },
      ],
    },
    {
      id: "nonisolated-crash",
      number: "02",
      title: "nonisolated 누락 실기기 크래시",
      status: "RESOLVED",
      squawk: "시뮬레이터는 멀쩡한데 실기기에서만 크래시",
      steps: [
        {
          tag: "FINDING",
          title: "발견",
          body: "스택 트레이스 추적 결과 session(_:activationDidCompleteWith:error:)에서 크래시 발생.",
        },
        {
          tag: "ROOT CAUSE",
          title: "원인",
          body: "클래스는 nonisolated로 선언했지만, extension 안 delegate 메서드 자체에 명시 안 하면 Xcode 26의 SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor 기본값 때문에 다시 @MainActor로 추론된다.",
        },
        {
          tag: "FINDING",
          title: "재발",
          body: "1차 수정 후에도 didReceiveUserInfo에서 동일 패턴의 크래시가 실기기에서만 재현됐다.",
        },
        {
          tag: "ACTION",
          title: "전수 점검",
          body: "+iOS, +watchOS extension의 WCSessionDelegate 콜백 전체를 점검해 빠진 nonisolated를 모두 추가했다.",
        },
      ],
    },
    {
      id: "timer-restart",
      number: "03",
      title: "Timer 재시작 문제",
      status: "RESOLVED",
      squawk: "정지 후 재시작하면 elapsedTime이 리셋도 재작동도 안 됨",
      steps: [
        {
          tag: "APPROACH",
          title: "1차 구현",
          body: "Timer.publish().connect()로 시작 시점을 직접 제어. 일시정지 구현을 염두에 두고 autoconnect() 대신 선택했다.",
        },
        {
          tag: "FINDING",
          title: "재시작 실패",
          body: "정지 후 재시작 시 타이머가 안 돎. connect()는 1회성 연결이라 한 번 cancel()한 Publisher는 재연결이 불가능하다.",
        },
        {
          tag: "ACTION",
          title: "autoconnect 전환",
          body: "start()가 호출될 때마다 autoconnect() + sink로 매번 새로 구독. Set<AnyCancellable>에 저장하고 stop() 시 removeAll()로 정리했다.",
        },
        {
          tag: "RESULT",
          title: "중복 구독 방지",
          body: "start()를 연달아 누르면 구독이 누적돼 초가 2, 3씩 뛰는 문제도 발견. start() 진입 시점에 기존 구독을 먼저 정리하도록 보완해 최종 해결했다.",
        },
      ],
    },
    {
      id: "asyncstream-continuation",
      number: "04",
      title: "AsyncStream continuation 관리",
      status: "RESOLVED",
      squawk: "위치 업데이트마다 새 스트림과 새 Task가 반복 생성됨",
      steps: [
        {
          tag: "FINDING",
          title: "발견",
          body: "Instrument의 Swift Concurrency 프로파일러로 확인한 결과, 위치 업데이트마다 새 AsyncStream과 새 Task가 반복 생성되고 있었다.",
        },
        {
          tag: "ACTION",
          title: "프로퍼티 승격",
          body: "continuation을 Actor 프로퍼티로 승격. 스트림은 한 번만 열어두고, processLocation() 내부에서 저장된 continuation으로 직접 yield()하도록 변경했다.",
        },
        {
          tag: "FINDING",
          title: "Sendable 충돌",
          body: "onTermination에서 continuation = nil 직접 호출 시 'Actor-isolated property can not be mutated from a Sendable closure' 에러. 임의 스레드에서 실행되는 @Sendable 클로저라 Actor 보호 프로퍼티에 직접 접근할 수 없다.",
        },
        {
          tag: "RESULT",
          title: "init → task 분리",
          body: "Actor-isolated 메서드(clearContinuation())를 만들고 Task { await ... }로 감싸 해결. 이후 startStream()으로 분리해 View의 .task에서 호출하도록 재정리했다.",
        },
      ],
    },
    {
      id: "state-reset",
      number: "05",
      title: "화면 이탈 시 상태 미초기화",
      status: "RESOLVED",
      squawk: "탭바로 갑자기 이탈하면 resetState()가 호출되지 않아 다음 러닝에 이전 상태가 남음",
      steps: [
        {
          tag: "FINDING",
          title: "문제 인식",
          body: "정상 흐름(버튼 클릭)만 상태 정리를 처리하고 있었고, 비정상 이탈(탭바 클릭, Watch 크라운)은 전혀 커버되지 않았다는 걸 실기기 테스트로 발견했다.",
        },
        {
          tag: "FINDING",
          title: "판단 기준",
          body: "isRunning 플래그로 판단하려 했으나, 미러링 중인 iPhone은 start()를 안 불러 세션이 살아있는데도 false인 경우가 있었다. HealthKitService.shared.session != nil로 기준을 교체했다.",
        },
        {
          tag: "ACTION",
          title: "플래그 패턴",
          body: "버튼 액션에서 didNavigateToTouchdown 같은 플래그를 먼저 true로 세팅하고, .onDisappear는 그 플래그의 부재를 '비정상 이탈'로 해석하는 패턴을 5개 View에 동일 적용했다.",
        },
        {
          tag: "RESULT",
          title: "예외 처리",
          body: "FlightSummaryView는 Logbook 열람 시에도 쓰이는 View라 selectedFlight == nil 조건으로 구분. Watch는 WatchSummaryView만 예외적으로 무조건 정리하도록 했다.",
        },
      ],
    },
    {
      id: "zombie-session",
      number: "06",
      title: "좀비 세션 - 원인 규명 후 보류",
      status: "KNOWN LIMITATION",
      squawk: "미러링 중 강제종료 → 재실행 시 PFD가 그대로 남아있음",
      steps: [
        {
          tag: "FINDING",
          title: "1차 시도",
          body: "startDate 기준 5초 경과 시 좀비로 간주하는 방식을 시도했으나 검증 불가 - 디버거로 강제종료한 직후 연결이 끊겨 로그를 확인할 수 없었다.",
        },
        {
          tag: "DISCOVERY",
          title: "원인 확정",
          body: "os_log / Console.app로 전환해 privacy 마스킹 문제를 해결한 뒤에야 진짜 원인을 특정했다. retrieveRemoteSession이 재실행 시 이미 살아있는 세션을 다시 감지하는 구조였다.",
        },
        {
          tag: "ACTION",
          title: "플래그 기반 판별",
          body: "UserDefaults 플래그(wasZombieSuspected)로 판별은 정확했으나, .end() 호출 시 Watch 세션까지 연쇄 종료되는 부작용이 발생했다.",
        },
        {
          tag: "FINDING",
          title: "대안 탐색",
          body: "appLaunchTime 비교 방식으로 전환. 좀비로 판단해도 무시하면 새 미러링이 차단되고, end()를 호출하면 앞선 부작용이 재발하는 딜레마였다.",
        },
        {
          tag: "RESULT",
          title: "구조적 한계 확정",
          body: "HKWorkoutSession은 healthd(시스템 데몬) 레벨 자원이라 앱 코드로는 완전한 제어가 불가능하다고 결론. 관련 코드를 전체 롤백하고 로깅 인프라만 유지했다.",
        },
      ],
      verdict:
        "HKWorkoutSession이 healthd(시스템 데몬) 레벨 자원이라 앱 코드로는 완전한 제어가 불가능하다고 결론. os_log/Console.app 기반으로 원인을 정확히 특정했지만, 부작용 없이는 해결이 불가능해 v1.0에서는 known limitation으로 명시했다.",
    },
    {
      id: "mirroring-race-condition",
      number: "07",
      title: "Watch 주도 미러링 레이스 컨디션",
      status: "RESOLVED",
      squawk: "Watch 주도 러닝에서만 GPS가 아예 안 잡힘, 코드 변경 없이 재빌드만 해도 증상이 반대로 옮겨감",
      steps: [
        {
          tag: "FINDING",
          title: "증상 이동",
          body: "앱 주도 미러링에서 나타나던 증상(Watch 표시 안 됨, 종료 동기화 안 됨)이 코드 수정 없이 재빌드만으로 사라지고, 대신 Watch 주도 미러링에서 location 자체가 안 잡히는 새 증상이 나타났다.",
        },
        {
          tag: "ROOT CAUSE",
          title: "비동기 대입과 동기 체크의 충돌",
          body: "updatePhase(.cruise) 안의 startOrigin = .local 대입이 Task {} 안에 있어 비동기로 실행된다. 바로 다음 줄 start()는 이 값을 한 번, 동기적으로만 확인하기 때문에 대입이 끝나기 전에 체크가 먼저 실행되면 GPS가 그 러닝 내내 켜지지 않는다.",
        },
        {
          tag: "DISCOVERY",
          title: "iPhone이 무사했던 이유",
          body: "동일한 호출 순서인데도 iPhone은 멀쩡했다. TakeoffView에 Pre-flight Check를 붙이며 prepareTracking()을 미리 호출해 GPS를 켜두고 있었기 때문에, start() 시점엔 이미 GPS가 돌고 있어 레이스 자체를 밟지 않았던 것. Watch만 이 사전 단계가 없어 그대로 노출됐다.",
        },
        {
          tag: "ACTION",
          title: "레이스 자체를 제거",
          body: "Watch에도 iPhone과 동일한 prepareTracking()/stopTracking() 패턴을 도입. GPS 시작 로직을 start()에서 완전히 분리해, start()는 더 이상 startOrigin을 확인하지 않도록 재구성했다.",
        },
        {
          tag: "RESULT",
          title: "플랫폼 구조 통일",
          body: "didStartFlight 플래그로 ROTATE를 통한 정상 진입과 카운트다운 중 이탈을 구분. iOS와 Watch가 동일한 아키텍처를 갖게 되어 이후 두 플랫폼 코드를 나란히 봐도 헷갈릴 일이 줄었다.",
        },
      ],
    },
    {
      id: "pace-corruption",
      number: "08",
      title: "저장된 inf 페이스가 캘린더 평균을 오염시킨 문제",
      status: "RESOLVED",
      squawk: "실시간 화면 페이스는 정상인데, 월별/주간 평균 페이스가 전부 --:--로 나옴",
      steps: [
        {
          tag: "FINDING",
          title: "화면과 저장의 불일치",
          body: "PFD 실시간 페이스 계산에는 이미 isFinite 가드가 있어 화면엔 항상 --'--\"로 안전하게 표시됐다. 하지만 SwiftData에 저장하는 saveRunningData()에는 같은 가드가 빠져 있었다.",
        },
        {
          tag: "ROOT CAUSE",
          title: "inf의 전파",
          body: "거리가 0이면 Double은 크래시 없이 inf를 반환한다. 이 inf가 그대로 저장되고, 월별 평균을 구하는 reduce 연산에 inf가 하나만 섞여도 합계 전체가 inf로 오염되어 그 달 평균이 통째로 깨졌다.",
        },
        {
          tag: "ACTION",
          title: "저장·집계 이중 방어",
          body: "저장 시점에 isFinite 가드를 추가해 계산 불가능한 값은 0으로 저장하고, 집계 시점에도 isFinite 필터를 한 번 더 걸었다. 동일 계산식이 있던 Watch 쪽 WatchPFDView.swift에도 같은 가드를 적용했다.",
        },
        {
          tag: "FINDING",
          title: "후속 문제",
          body: "러닝 시작 직후 바로 종료하면 페이스가 비정상적으로 크게 튀는 별도 문제를 발견했다. inf는 아니지만 시간 대비 거리가 극단적으로 작아 나온 비현실적인 유한값이라 isFinite 가드로는 걸러지지 않았다.",
        },
        {
          tag: "RESULT",
          title: "임계값 도입과 데이터 정리",
          body: "최소 유효 거리(50m)와 현실적인 페이스 상한선(30 min/km)을 추가로 걸었다. 이미 오염된 레코드 14개는 일회성 정리 스크립트로 삭제. 화면에 안 보이면 괜찮다가 아니라 저장되는 값 자체의 안전성을 확인해야 한다는 교훈을 얻었다.",
        },
      ],
    },
    {
      id: "mirroring-scope-narrowing",
      number: "09",
      title: "미러링 범위 축소 - 워치 주도는 독립 실행으로",
      status: "RESOLVED",
      squawk: "워치 주도 미러링에서만 반복적으로 터지는 문제들 - 지도 누락, 종료 이벤트 중복, GPS 추적 교차, 다이나믹 아일랜드 정지",
      steps: [
        {
          tag: "FINDING",
          title: "패턴 확인",
          body: "미러링 4가지 조합(앱주도/워치주도 × 앱종료/워치종료)을 코드로 전부 재검토한 결과, 지금까지 나온 문제의 절반 이상이 '워치 주도 + iPhone이 그걸 실시간으로 따라가야 한다'는 조합 하나에서만 발생하고 있었다.",
        },
        {
          tag: "DISCOVERY",
          title: "GPS 교차 추적의 실체",
          body: "WatchPFDView에는 '.onDisappear에서 상태를 정리한다'는 문서 주석이 있었지만 실제 코드는 없었다. 크라운으로 이탈해도 GPS 추적이 멈추지 않아, 멈추지 않은 이전 추적이 orphan 상태로 남은 채 다음 러닝과 겹치고 있었다.",
        },
        {
          tag: "DISCOVERY",
          title: "다이나믹 아일랜드도 같은 뿌리",
          body: "Live Activity를 갱신하는 updateCruise()가 iPhone 자신의 GPS 스트림에서만 호출되고, Watch가 보내는 flightData 수신 로직엔 연결돼 있지 않았다. 워치 주도일 땐 Live Activity가 시작 화면에서 한 발짝도 못 움직이는 구조였다.",
        },
        {
          tag: "ACTION",
          title: "타협점",
          body: "완전한 양방향 미러링 대신, 앱 주도(+ 워치 센서 데이터 미러링)만 유지하고 워치 주도는 미러링을 아예 시도하지 않도록 startOrigin으로 분기했다. 종료 시엔 기존 '워치 단독 러닝' 경로 그대로 기록만 iPhone Logbook에 전달한다.",
        },
      ],
      verdict:
        "워치로 뛸 땐 대개 화면을 보지 않는다는 현실을 인정했다. 워치 주도 러닝에 iPhone 실시간 동기화가 꼭 필요하지 않다고 판단해서, 완전한 양방향 미러링 대신 실사용에 맞춰 스코프를 의도적으로 좁혔다. 01번(미러링 아키텍처 재설계)에서 완성했던 4가지 시나리오 중 하나를 다시 걷어낸 셈이다.",
    },
    {
      id: "session-id-duplicate-save",
      number: "10",
      title: "미러링 중복 저장 - 공유 세션 ID로 정리",
      status: "RESOLVED",
      squawk: "미러링 중 워치에서 러닝을 종료했다가 곧바로 재개하면, 로그에 같은 러닝이 여러 번 겹쳐 저장됨",
      steps: [
        {
          tag: "FINDING",
          title: "실기기 증상",
          body: "미러링 상태에서 워치로 러닝을 종료했는데 아이폰은 아직 살아있었다. 그 상태에서 워치로 러닝을 재개하니 워치와 아이폰이 각자 위치 정보를 쌓는 상태가 겹쳤고, 워치 러닝을 마저 종료하니 로그에 값이 세 번 찍혔다.",
        },
        {
          tag: "ROOT CAUSE",
          title: "같은 러닝이라는 공통 식별자가 없었다",
          body: "두 기기 다 자기 쪽에서 끝난 러닝을 각자 저장할 뿐, 서로 '이건 같은 러닝이다'를 확인할 방법이 없었다. 종료 신호가 조금만 늦게 도착해도 새 러닝과 예전 세션이 뒤섞였다.",
        },
        {
          tag: "ACTION",
          title: "공유 세션 ID 도입",
          body: "러닝을 시작하는 기기에서 UUID를 발급해 runSessionID로 들고 있다가, flightData와 최종 저장 메시지에 매번 실어 보낸다. 저장 시점엔 이 값을 그대로 SwiftDataFlight.id로 써서, 같은 id가 이미 저장돼 있으면 다시 저장하지 않는다.",
        },
        {
          tag: "ACTION",
          title: "수신 쪽 가드 추가",
          body: "워치가 자기 혼자 새 러닝을 시작하면(startOrigin == .local) 아이폰이 보내는 예전 flightData를 무시하게 가드를 걸었다. 반대 방향도 동일하게 처리했다.",
        },
        {
          tag: "DISCOVERY",
          title: "아이폰 쪽 native 미러링 수신도 정리",
          body: "이 조사 중에 HealthKitService+iOS.swift의 retrieveRemoteSession()이 심박수 전달에도 Apple Health 저장에도 안 쓰이고 있다는 걸 확인했다. 오히려 있으면 저장 가드가 깨지거나 PFDView가 내비게이션에 중복으로 쌓일 위험만 있어서 등록을 껐다.",
        },
      ],
      verdict:
        "09번에서 워치 주도 미러링 자체를 없앴는데도, 아이폰이 워치의 세션을 되받는 코드는 남아있었다. 시작 쪽은 이제 완전히 아이폰 하나로만 판단되고, 종료 쪽은 세션 ID로 같은 러닝인지 확인하는 걸로 정리됐다.",
    },
    {
      id: "runningmode-vs-startorigin",
      number: "11",
      title: "종료 신호가 안 나가던 문제 - runningMode 대신 startOrigin으로",
      status: "RESOLVED",
      squawk: "아이폰이 startWatchApp으로 워치 앱을 직접 실행시켜 미러링할 때, 워치에서 종료해도 아이폰 러닝이 끝나지 않음",
      steps: [
        {
          tag: "FINDING",
          title: "실기기 증상",
          body: "아이폰이 startWatchApp으로 워치 앱을 직접 실행시키면서 미러링하는 경우, 워치에서 러닝을 종료해도 아이폰 쪽 러닝이 전혀 끝나지 않았다.",
        },
        {
          tag: "ROOT CAUSE",
          title: "10번에서 끈 코드에 은근히 의존하고 있었다",
          body: "WatchViewModel이 자기 종료를 아이폰에 알릴지 말지를 runningMode == .mirrored로 판단하고 있었는데, runningMode는 startMirroringToCompanionDevice()가 성공했을 때만 .mirrored로 바뀐다. 10번에서 retrieveRemoteSession()(이 핸드셰이크를 받아주는 리스너)을 꺼서 아이폰 쪽에 받아줄 게 없어졌고, 이 호출이 실패하면서 runningMode가 계속 .standalone으로 남아 sendStopSignal() 자체가 안 불렸다.",
        },
        {
          tag: "ACTION",
          title: "판단 기준 교체",
          body: "판단 기준을 runningMode 대신 startOrigin != .local로 바꿨다. startOrigin은 AppDelegate.handle()에서 핸드셰이크 성공 여부와 무관하게 항상 먼저 세팅되고, stopWorkout()도 이 값을 안 건드려서 종료 시점까지 그대로 남아있다.",
        },
      ],
      verdict:
        "10번에서 retrieveRemoteSession()을 끄면서 생긴 부작용이었다. 코드를 지울 때 그 코드에 은근히 기대고 있던 다른 로직(이번엔 완전히 다른 함수의 판단 기준)까지 같이 점검해야 한다는 걸 다시 느꼈다.",
    },
    {
      id: "gpws-reset-clears-mission-data",
      number: "12",
      title: "GPWS 전역 리셋 버그 - 공유 reset()이 미션 목표까지 지움",
      status: "RESOLVED",
      squawk: "화면을 전환하거나 러닝을 다시 시작할 때마다 Mission Flight 목표(페이스/거리)가 알 수 없이 사라짐",
      steps: [
        {
          tag: "FINDING",
          title: "핫픽스 분리 중 발견",
          body: "아직 머지되지 않은 심박수 브랜치를 v1.0에 급하게 단독 핫픽스로 분리하던 중 발견했다. RunningCenter.reset()이 화면 전환뿐 아니라 start() 안에서도 방어적으로 다시 호출되고 있었는데, 이 호출이 modeAData(미션 목표)까지 매번 지우고 있었다.",
        },
        {
          tag: "ROOT CAUSE",
          title: "한 함수에 두 가지 책임이 섞여 있었다",
          body: "start()에서의 방어적 reset()은 원래 elapsedTime/flightData가 이전 값에서 이어지는 걸 막으려던 조치였지, modeAData를 지우려던 의도가 아니었다. 그런데 같은 함수 안에 같이 들어있어서 화면 전환 때도, 재시작 방어 때도 매번 목표 데이터까지 같이 날아갔다.",
        },
        {
          tag: "ACTION",
          title: "책임 분리",
          body: "목표 데이터를 지우는 역할을 clearModeAData()로 따로 뺐다. reset()은 더 이상 modeAData를 건드리지 않고, RunViewModel/WatchViewModel의 resetState()에서만 clearModeAData()를 명시적으로 호출하도록 정리했다.",
        },
      ],
      verdict:
        "\"화면 전환용 정리\"와 \"재시작 방어\"라는 서로 다른 두 목적이 한 함수 안에 같이 들어있으면, 한쪽만 의도한 변경이 다른 쪽까지 건드리는 부작용을 만든다. 책임을 함수 단위로 쪼개는 것만으로 해결됐다.",
    },
    {
      id: "swiftdata-migration-default-value",
      number: "13",
      title: "SwiftData 라이트웨이트 마이그레이션 조용한 실패",
      status: "RESOLVED",
      squawk: "삭제 후 재설치로만 테스트해서 몰랐던 문제 - 기존 유저가 앱만 업데이트하면 마이그레이션 실패 위험",
      steps: [
        {
          tag: "FINDING",
          title: "테스트 방식의 사각지대",
          body: "심박 기반 GPWS를 위해 SwiftDataAlert에 target/heartRate 필드를 추가했는데, 매번 삭제 후 재설치로만 테스트하고 있어서 마이그레이션 경로 자체를 한 번도 안 타보고 있었다.",
        },
        {
          tag: "ROOT CAUSE",
          title: "init 기본값은 마이그레이션에서 안 보인다",
          body: "새 필드의 기본값을 init() 파라미터에만 넣어뒀다. SwiftData의 자동 라이트웨이트 마이그레이션은 기존 레코드에 새 필드 값을 채울 때 프로퍼티 선언부의 기본값을 보는데, init 파라미터의 기본값은 여기서 보이지 않는다.",
        },
        {
          tag: "ACTION",
          title: "선언부에 기본값 직접 명시",
          body: "프로퍼티 선언부에 직접 기본값을 넣었다. 자료 조사 중 이렇게 해도 크래시가 나는 사례가 있다는 것도 확인했는데, Apple 포럼에서는 이를 \"의도된 동작\"으로 밝혔다. 완전히 안전하게 하려면 VersionedSchema로 필드를 옵셔널로 먼저 마이그레이션한 뒤 필수값으로 바꾸는 멀티스테이지 마이그레이션이 필요하다.",
        },
      ],
      verdict:
        "삭제 후 재설치 테스트는 마이그레이션 경로 자체를 타지 않는다. 스키마를 바꿀 때마다 최소 한 번은 기존 버전에서 업데이트하는 경로로 확인해야 한다는 걸 배웠다.",
    },
    {
      id: "cloudkit-backup-save-policy-and-index",
      number: "14",
      title: "CloudKit 백업 버그 2건 - savePolicy와 queryable 인덱스",
      status: "RESOLVED",
      squawk: "두 번째 백업부터 조용히 \"0개 백업했습니다\", CloudKit Dashboard에서는 조회조차 안 됨",
      steps: [
        {
          tag: "FINDING",
          title: "버그 1 - 두 번째 백업부터 조용히 실패",
          body: "백업 버튼을 눌러 CloudKit Dashboard에 레코드까지 잘 생겼는데, 두 번째로 누르니 \"0개 백업했습니다\"라고 떴다.",
        },
        {
          tag: "ROOT CAUSE",
          title: "변경 태그 비교 실패가 조용히 묻혔다",
          body: "modifyRecords(saving:deleting:)의 기본 저장 정책(.ifServerRecordUnchanged)은 서버 레코드와 변경 태그를 비교하는데, 새로 만든 로컬 레코드엔 그 정보가 없어 충돌로 처리됐다. 게다가 이 실패가 에러를 던지지 않고 레코드별 결과 안에만 담겨서 겉으로는 문제없어 보였다.",
        },
        {
          tag: "ACTION",
          title: "무조건 덮어쓰기로 전환",
          body: "savePolicy: .changedKeys로 바꿔서 항상 로컬 상태로 무조건 덮어쓰게 했다.",
        },
        {
          tag: "FINDING",
          title: "버그 2 - 대시보드에서 조회가 안 됨",
          body: "백업은 되는데 CloudKit Dashboard에서 조건 없이 전체 조회하면 \"Field 'recordName' is not marked queryable\" 에러가 났다.",
        },
        {
          tag: "ROOT CAUSE",
          title: "recordName엔 기본 인덱스가 없다",
          body: "CKQuery로 조회할 때 조건/정렬에 쓰는 필드마다 Queryable 인덱스가 필요한데, recordName은 기본으로 인덱스가 없다. 조건 없는 조회(NSPredicate(value: true))가 내부적으로 recordName을 참조하려다 막힌 것.",
        },
        {
          tag: "RESULT",
          title: "쿼리 조건 변경 + 인덱스 추가",
          body: "쿼리를 date 필드 조건 기준으로 바꿔서 recordName 참조 자체를 피했고, CloudKit Dashboard의 Schema > Indexes에서 recordName에 QUERYABLE 인덱스도 직접 추가했다.",
        },
      ],
      verdict:
        "저장 실패가 에러 없이 결과 값 안에만 조용히 담기는 API라, \"성공처럼 보이는 실패\"를 잡으려면 반환값 자체를 확인하는 습관이 필요했다. CloudKit Dashboard와 앱 코드가 서로 다른 쿼리를 만든다는 점도 헷갈리기 쉬운 지점이었다.",
    },
    {
      id: "tts-audio-ducking-cross-device",
      number: "15",
      title: "km 스플릿 TTS가 안 들리는 문제 - 세션 활성화와 기기 간 오디오 격리",
      status: "KNOWN LIMITATION",
      squawk: "음악 재생 중 km 스플릿 음성 안내가 안 들리거나, 워치 단독 러닝에서는 아예 안 들림",
      steps: [
        {
          tag: "FINDING",
          title: "실기기 증상",
          body: "음악을 들으며 뛰어보니 km 스플릿 안내 자체가 안 들렸다. SpeechAnnouncerService는 AVAudioSession을 .duckOthers 옵션으로 설정해 안내가 나오는 동안만 음악을 줄이는데, 이 활성화 코드가 러닝 시작 시점에 딱 한 번만 불리고 있어서 중간에 음악 앱이 세션을 가져가며 인터럽트되면 그 뒤로 복구되지 않았다.",
        },
        {
          tag: "ACTION",
          title: "재활성화로 1차 수정, 그리고 반대 문제",
          body: "speak() 직전에 세션을 매번 재활성화하도록 고쳤더니, 이번엔 음악 소리가 러닝 내내 줄어든 채로 안 돌아왔다. start()에 남아있던 활성화 호출이 원인이었다. 덕킹은 speak()가 아니라 세션이 활성화된 동안 계속 걸리는 것이라, 이 호출을 지우고 AVSpeechSynthesizerDelegate의 didFinish/didCancel에서 즉시 비활성화하도록 바꿨다.",
        },
        {
          tag: "DISCOVERY",
          title: "기기 간 오디오 세션은 격리되어 있다",
          body: "워치 단독 러닝 중 아이폰에서 음악을 들으면 TTS가 아예 안 들렸다. 에어팟은 두 기기 모두에 페어링돼 있어도 오디오 스트림은 한 기기만 갖고, AVAudioSession은 기기별로 완전히 독립된 인스턴스라 워치 설정이 아이폰 오디오에 영향을 줄 방법이 없다.",
        },
        {
          tag: "FINDING",
          title: "나이키 런 클럽도 같은 한계",
          body: "커뮤니티를 찾아보니 나이키 런 클럽도 동일한 증상을 갖고 있었고, 제시된 해법은 '음악도 워치에서 재생하라'는 것뿐이었다. 앱만의 버그가 아니라 애플 생태계 전체의 구조적 한계였다.",
        },
      ],
      verdict:
        "온디바이스 덕킹 버그 두 개는 고쳤지만, 기기 간 오디오 세션 격리라는 근본 한계는 코드로 풀 수 없었다. 대신 앱 공지사항에 '음악도 Apple Watch에서 재생해달라'는 안내를 추가해 사용자 행동으로 우회했다. 모든 문제가 코드로 풀리는 건 아니고, 때로는 정직하게 안내하는 것도 답이 된다.",
    },
    {
      id: "watch-crown-distance-step-gap",
      number: "16",
      title: "Watch 거리 설정 Digital Crown이 애매한 값에서 멈추는 문제",
      status: "RESOLVED",
      squawk: "CUSTOM 거리를 Crown으로 조절하면 500m, 600m, 1.1km, 1.6km처럼 어중간한 값에서 멈춤",
      steps: [
        {
          tag: "FINDING",
          title: "이미 남아있던 TODO",
          body: "최소값 100m부터 계속 돌려보니 어중간한 값에서 멈추는 걸 발견했다. 코드에는 이미 \"// 수정해야함\"이라는 TODO가 남아있었다.",
        },
        {
          tag: "ROOT CAUSE",
          title: "시작점이 스텝의 배수가 아니었다",
          body: "Crown 바인딩이 시작값 0.1(100m)에서 0.5씩 계속 더하는 구조였다. 100m는 0.5의 배수가 아니라서, 그 뒤로 나오는 모든 값이 시작점만큼 계속 밀렸다.",
        },
        {
          tag: "ACTION",
          title: "값 대신 인덱스로 전환",
          body: "Crown 값을 거리 자체가 아니라 미리 정해둔 distanceSteps 배열의 인덱스로 바꿨다. 100m는 배열 맨 앞에 예외로 두고, 이후 0.5km 격자에 하프/풀마라톤(21.1km/42.2km)만 중간에 끼워 넣었다. 프리셋 버튼(3K/5K/10K/HALF/FULL)도 값 대신 인덱스를 찾아 설정하도록 같이 고쳤다.",
        },
      ],
      verdict:
        "시작점과 스텝 크기가 서로 배수 관계가 아니면 그 어긋남이 계속 누적된다는, 흔하지만 놓치기 쉬운 산술 버그였다.",
    },
    {
      id: "sink-rate-stuck-crash",
      number: "17",
      title: "SINK RATE 고착과 강제 종료 - 세 번째 손댈 때 드러난 조합 버그",
      status: "RESOLVED",
      squawk: "OVERSPEED 후 감속하면 SINK RATE에서 안 풀리고, 편차가 300초까지 치솟다 강제 종료",
      steps: [
        {
          tag: "FINDING",
          title: "배포 직후 재현",
          body: "1.3 배포 얼마 안 돼 OVERSPEED 경고에 반응해 속도를 줄였더니 정상적으로 SINK RATE로 바뀌었는데, 다시 속도를 올려도 SINK RATE에서 안 돌아왔다. 편차 숫자는 계속 커지다 300초까지 갔고 결국 워치 앱이 강제 종료됐다.",
        },
        {
          tag: "ROOT CAUSE",
          title: "정지 판단과 페이스 계산이 서로 다른 걸 보고 있었다",
          body: "GPS 신뢰도(speedAccuracy)가 음수인 샘플은 정지 판단(isStationary)에서는 확실히 건너뛰는데, 페이스 계산용 속도 스무딩은 이 체크 밖에서 매번 무조건 갱신되고 있었다. 오버스피드에 반응해 속도를 확 줄이는 구간은 신뢰도가 음수로 찍히는 일이 흔해서, 정지 확정은 못 되는데 스무딩 값은 계속 낮은 쪽으로 끌려 내려갔다.",
        },
        {
          tag: "DISCOVERY",
          title: "심박 모드로 교차 확인",
          body: "심박 기반 GPWS는 이 스무딩 계산 자체를 거치지 않고 실시간 심박을 그대로 읽어서 쓰는데, 같은 조건에서도 문제가 없었다. 원인이 정확히 페이스 계산 경로에만 있다는 걸 확인해준 단서였다.",
        },
        {
          tag: "ACTION",
          title: "수정",
          body: "스무딩 갱신을 정지 판단과 같은 speedAccuracy 체크 안으로 옮겼다. 못 믿을 속도값이면 정지 판단도 페이스 계산도 둘 다 이전 상태를 그대로 유지하게 만든 것.",
        },
        {
          tag: "FINDING",
          title: "검증 중 두 번째 버그 발견",
          body: "이 수정을 확인하다 별개로, 멈춰서 쉬는 중에 SINK RATE/OVERSPEED 진동이 안 꺼지고 계속 울리는 걸 발견했다. 정지 중 GPWS를 얼리는 기존 로직이, 멈추기 직전 상태가 하필 경고였으면 그 상태가 그대로 굳어 경고 화면과 반복 햅틱이 계속되게 만들고 있었다.",
        },
        {
          tag: "RESULT",
          title: "얼리기 대신 되돌리기",
          body: "정지 중엔 얼리는 대신 normal로 되돌리도록 바꿨다. 심박 하강으로 새 경고가 뜨는 것도 여전히 막히고, 멈추기 직전 경고가 있었어도 멈추는 순간 바로 꺼진다. 1.3.1로 배포.",
        },
      ],
      verdict:
        "이 버그는 한 번에 생긴 게 아니라 v1.3 준비하면서 두 번에 걸쳐 손댄 로직이 겹쳐서 만들어졌다. 정지 판단 방식 자체를 raw 속도 기반으로 갈아엎은 게 먼저였고, 그 다음엔 완전히 다른 이유로(심박 하강 오탐 방지) 얼리는 로직을 추가했다. 각각은 그 순간엔 멀쩡한 이유로 손댄 건데, 정지 판단 쪽 규칙이 나중에 추가한 얼리기 로직의 전제를 깰 수 있다는 건 그땐 몰랐다. 코드 한 부분만 보고는 못 잡는, 두 변경 사이의 관계에서만 드러나는 버그였다.",
    },
  ],
  releases: [
    {
      version: "v1.3.1",
      date: "2026.09",
      items: [
        "OVERSPEED/SINK RATE 경고 후 NORMAL로 돌아오지 않고 앱이 강제 종료되던 문제 수정",
        "일시정지 중에도 GPWS 경고 진동이 계속 울리던 문제 수정",
        "설정에서 7일 무활동 리마인더 알림을 끌 수 있는 옵션 추가",
      ],
    },
    {
      version: "v1.3",
      date: "2026.08",
      items: [
        "워치 단독 러닝 기록이 간헐적으로 저장되지 않던 문제 수정",
        "제자리에 멈췄을 때 일시정지 판단 속도 개선",
        "GPWS 경고 유형별로 다른 진동 패턴 추가",
        "Watch 목표 거리 설정 시 Digital Crown 간격 수정",
        "러닝 종료 후 지도 화면 확대/축소 기능 추가",
        "일주일 이상 러닝을 하지 않으면 알려주는 리마인더 알림 추가",
        "Alerts 경고 내역을 월별로 정리해서 볼 수 있도록 개선",
        "러닝 기록 개별 삭제 기능 추가",
        "Watch END FLIGHT 버튼 확대",
      ],
    },
    {
      version: "v1.2",
      date: "2026.07",
      items: [
        "km 스플릿 음성 안내(TTS) 추가",
        "Mission Flight 목표 페이스/심박수 표시 개선",
        "지도 종료 마커 표기 변경",
        "설정 화면 추가",
        "iCloud 백업/복원 기능 추가",
        "로그북 화면 개편 (월/주 단위로 기록 정리)",
        "워치 단독 러닝 중 발생하던 종료/음성 안내 문제 수정",
      ],
    },
    {
      version: "v1.1",
      date: "2026.07",
      items: [
        "Mission Flight GPWS(SINK RATE/OVERSPEED) 경고가 표시되지 않던 문제 수정",
        "GPWS 경고 화면에서 러닝 종료가 안 되던 문제 수정",
        "MINIMUMS 알림의 남은 거리 표시 오류 수정",
        "워치 단독 러닝 기록이 아이폰에 전달되지 않던 문제 수정",
      ],
    },
    {
      version: "v1.0",
      date: "2026.06",
      items: ["RunWay 출시"],
    },
  ],
};
