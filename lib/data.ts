export type TroubleshootStatus = "RESOLVED" | "KNOWN LIMITATION";

export interface TroubleshootStep {
  tag: string; // FINDING / ACTION / ROOT CAUSE / RESULT / DISCOVERY / APPROACH
  title: string;
  body: string;
}

export interface TroubleshootCase {
  id: string;
  number: string;
  title: string;
  status: TroubleshootStatus;
  squawk: string;
  steps: TroubleshootStep[];
  verdict?: string;
}

export const troubleshootCases: TroubleshootCase[] = [
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
        body: "elapsedTime을 FlightData 페이로드에 얹어 3초 throttle로 동기화. iPhone 단독 / Watch 단독 / 양방향 미러링 4가지 시나리오가 startOrigin 하나로 정리됐다.",
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
];

export const themeTokens = {
  bg: "#0B0E14",
  panel: "#161A22",
  panel2: "#1E2430",
  border: "#252D3A",
  green: "#64FFDA",
  green2: "#00C896",
  amber: "#FFB020",
  red: "#FF453A",
  blue: "#0A84FF",
  muted: "#88949E",
  text: "#E6EDF3",
};
