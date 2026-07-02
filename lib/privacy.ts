export interface PrivacySection {
  heading: string;
  body?: string;
  list?: string[];
}

export interface PrivacyContent {
  lastUpdated: string;
  sections: PrivacySection[];
  contactLabel: string;
  contactEmail: string;
}

export const privacyContentKo: PrivacyContent = {
  lastUpdated: "최종 수정일 - 2026년 7월 2일",
  sections: [
    {
      heading: "개요",
      body: "RunWay(이하 \"앱\")는 Harold(이하 \"개발자\")가 개발했습니다. 본 개인정보 처리방침은 앱이 수집하는 정보와 그 이용 방법, 저장 방식을 설명합니다.",
    },
    {
      heading: "수집하는 정보",
      body: "앱은 사용자의 동의를 받아 아래 정보에 접근합니다.",
      list: [
        "위치 정보 (GPS) - 러닝 경로 기록, 페이스/거리/속도 계산에 사용됩니다.",
        "HealthKit 데이터 (심박수 등) - 러닝 중 실시간 지표 표시 및 운동 기록 저장에 사용됩니다.",
      ],
    },
    {
      heading: "정보 저장 방식",
      body: "앱이 수집한 모든 데이터는 Apple의 SwiftData 프레임워크를 통해 사용자의 기기 내부에만 저장됩니다. RunWay는 어떠한 데이터도 외부 서버로 전송, 업로드, 동기화하지 않습니다.\n\n앱은 제3자 분석 도구, 광고 SDK, 크래시 리포트 서비스를 사용하지 않습니다. 개발자를 포함한 어떠한 제3자와도 데이터를 공유하지 않습니다.",
    },
    {
      heading: "Apple Watch 연동",
      body: "Apple Watch 앱을 사용하는 경우, 페이스, 거리, 심박수 등의 러닝 데이터는 Apple의 WatchConnectivity 프레임워크를 통해 iPhone과 Apple Watch 간에 직접 전송됩니다. 이 데이터는 사용자의 기기 밖으로 나가지 않습니다.",
    },
    {
      heading: "정보에 대한 권한",
      body: "iOS 설정 > 개인정보 보호에서 위치 정보 및 HealthKit 접근 권한을 언제든지 철회할 수 있습니다. 단, 권한을 철회할 경우 앱의 일부 기능이 제한되거나 작동하지 않을 수 있습니다.\n\n앱을 기기에서 삭제하면 로컬에 저장된 모든 러닝 데이터가 함께 삭제됩니다.",
    },
    {
      heading: "아동의 개인정보",
      body: "본 앱은 만 13세 미만 아동을 대상으로 하지 않으며, 만 13세 미만 아동의 정보를 고의로 수집하지 않습니다.",
    },
    {
      heading: "방침 변경",
      body: "본 개인정보 처리방침은 변경될 수 있으며, 변경 시 이 페이지에 최신 수정일과 함께 반영됩니다.",
    },
  ],
  contactLabel: "이메일",
  contactEmail: "dongik369@naver.com",
};

export const privacyContentEn: PrivacyContent = {
  lastUpdated: "Last updated - July 2, 2026",
  sections: [
    {
      heading: "Overview",
      body: "RunWay (\"the App\") is developed by Harold (\"we\", \"us\"). This Privacy Policy explains what data the App accesses, how it is used, and how it is stored.",
    },
    {
      heading: "Data We Access",
      body: "The App accesses the following data with your permission.",
      list: [
        "Location (GPS) - used to record your running route and calculate pace, distance, and speed.",
        "HealthKit data (e.g. heart rate) - used to display real-time metrics and save workout records.",
      ],
    },
    {
      heading: "How Your Data Is Stored",
      body: "All data collected by the App is stored locally on your device only, using Apple's SwiftData framework. RunWay does not transmit, upload, or sync any of your data to external servers.\n\nThe App does not use any third-party analytics, advertising, or crash-reporting services. No data is shared with the developer or any third party.",
    },
    {
      heading: "Apple Watch Connectivity",
      body: "If you use the Apple Watch app, running data such as pace, distance, and heart rate is transmitted directly between your iPhone and Apple Watch using Apple's WatchConnectivity framework. This data does not leave your devices.",
    },
    {
      heading: "Your Control Over Data",
      body: "You can revoke Location or HealthKit permissions at any time via iOS Settings > Privacy & Security. Revoking these permissions may limit or disable certain features of the App.\n\nDeleting the App removes all locally stored running data.",
    },
    {
      heading: "Children's Privacy",
      body: "The App is not directed at children under 13, and we do not knowingly collect data from children under 13.",
    },
    {
      heading: "Changes to This Policy",
      body: "This Privacy Policy may be updated from time to time. Changes will be posted on this page with an updated date.",
    },
  ],
  contactLabel: "Email",
  contactEmail: "dongik369@naver.com",
};
