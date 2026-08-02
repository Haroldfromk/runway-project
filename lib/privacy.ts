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
  lastUpdated: "최종 수정일 - 2026년 7월 29일",
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
        "동작 및 피트니스 데이터 (기압계 기반 고도) - 러닝 중 상대 고도 변화를 측정하는 데 사용됩니다.",
      ],
    },
    {
      heading: "정보 저장 방식",
      body: "앱이 수집한 모든 데이터는 기본적으로 Apple의 SwiftData 프레임워크를 통해 사용자의 기기 내부에만 저장됩니다. RunWay는 아래 iCloud 백업 기능이나 날씨 조회(WeatherKit)를 제외하면, 어떠한 데이터도 자동으로 외부 서버에 전송하지 않습니다.\n\n앱은 제3자 분석 도구, 광고 SDK, 크래시 리포트 서비스를 사용하지 않습니다. 개발자를 포함한 어떠한 제3자와도 데이터를 공유하지 않습니다.",
    },
    {
      heading: "iCloud 백업",
      body: "설정 화면에서 백업 버튼을 직접 눌렀을 때만 러닝 기록이 Apple의 CloudKit을 통해 사용자 본인의 iCloud Private Database에 저장됩니다. 이 데이터는 Apple 계정 소유자 본인만 접근할 수 있으며, 개발자를 포함한 제3자는 접근할 수 없습니다.\n\n복원 버튼을 누르면 iCloud에 저장된 기록 중 이 기기에 없는 것만 다시 받아옵니다. 백업/복원은 자동으로 실행되지 않으며, 설정 화면에서 언제든지 상태를 확인할 수 있습니다.",
    },
    {
      heading: "날씨 정보 (WeatherKit)",
      body: "Pre-flight Check 화면에 현재 날씨를 표시하기 위해, 현재 위치를 Apple의 WeatherKit 서비스로 전달해 날씨 정보를 가져옵니다. 이 요청은 Apple이 처리하며, 개발자는 이 위치 데이터를 별도로 수집하거나 저장하지 않습니다.",
    },
    {
      heading: "Apple Watch 연동",
      body: "Apple Watch 앱을 사용하는 경우, 페이스, 거리, 심박수 등의 러닝 데이터는 Apple의 WatchConnectivity 프레임워크를 통해 iPhone과 Apple Watch 간에 직접 전송됩니다. 이 데이터는 사용자의 기기 밖으로 나가지 않습니다.",
    },
    {
      heading: "정보에 대한 권한",
      body: "iOS 설정 > 개인정보 보호에서 위치 정보, HealthKit, 동작 및 피트니스 접근 권한을 언제든지 철회할 수 있습니다. 단, 권한을 철회할 경우 앱의 일부 기능이 제한되거나 작동하지 않을 수 있습니다.\n\n앱을 기기에서 삭제하면 로컬에 저장된 모든 러닝 데이터가 함께 삭제됩니다.",
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
  lastUpdated: "Last updated - July 29, 2026",
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
        "Motion & Fitness data (barometric altitude) - used to measure relative elevation changes during your run.",
      ],
    },
    {
      heading: "How Your Data Is Stored",
      body: "By default, all data collected by the App is stored locally on your device only, using Apple's SwiftData framework. Aside from the iCloud backup feature and weather lookups (WeatherKit) described below, RunWay does not automatically transmit any of your data to external servers.\n\nThe App does not use any third-party analytics, advertising, or crash-reporting services. No data is shared with the developer or any third party.",
    },
    {
      heading: "iCloud Backup",
      body: "Your running records are only uploaded to your own iCloud Private Database, via Apple's CloudKit, when you tap the backup button in Settings. This data can only be accessed by you, the owner of the Apple ID - not by the developer or any other third party.\n\nTapping restore retrieves records from iCloud that aren't already on this device. Backup and restore never run automatically; you can check their status in Settings at any time.",
    },
    {
      heading: "Weather (WeatherKit)",
      body: "To show current weather on the Pre-flight Check screen, your current location is sent to Apple's WeatherKit service to retrieve weather data. This request is handled by Apple, and the developer does not separately collect or store this location data.",
    },
    {
      heading: "Apple Watch Connectivity",
      body: "If you use the Apple Watch app, running data such as pace, distance, and heart rate is transmitted directly between your iPhone and Apple Watch using Apple's WatchConnectivity framework. This data does not leave your devices.",
    },
    {
      heading: "Your Control Over Data",
      body: "You can revoke Location, HealthKit, or Motion & Fitness permissions at any time via iOS Settings > Privacy & Security. Revoking these permissions may limit or disable certain features of the App.\n\nDeleting the App removes all locally stored running data.",
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

export const privacyContentJa: PrivacyContent = {
  lastUpdated: "最終更新日 - 2026年7月29日",
  sections: [
    {
      heading: "概要",
      body: "RunWay(以下「本アプリ」)はHarold(以下「開発者」)が開発しました。本プライバシーポリシーは、本アプリがアクセスする情報とその利用方法、保存方式について説明します。",
    },
    {
      heading: "アクセスする情報",
      body: "本アプリはユーザーの同意を得て、以下の情報にアクセスします。",
      list: [
        "位置情報(GPS) - ランニングルートの記録、ペース/距離/速度の計算に使用されます。",
        "HealthKitデータ(心拍数など) - ランニング中のリアルタイム表示および運動記録の保存に使用されます。",
        "モーションとフィットネスデータ(気圧計による高度) - ランニング中の相対的な高度変化を測定するために使用されます。",
      ],
    },
    {
      heading: "情報の保存方式",
      body: "本アプリが収集したすべてのデータは、既定ではAppleのSwiftDataフレームワークを通じてユーザーのデバイス内にのみ保存されます。RunWayは、下記のiCloudバックアップと天気情報の取得(WeatherKit)を除き、いかなるデータも自動的に外部サーバーへ送信することはありません。\n\n本アプリはサードパーティの分析ツール、広告SDK、クラッシュレポートサービスを使用しません。開発者を含むいかなる第三者ともデータを共有しません。",
    },
    {
      heading: "iCloudバックアップ",
      body: "設定画面でバックアップボタンを押した場合にのみ、ランニング記録はAppleのCloudKitを通じてユーザー本人のiCloud Private Databaseに保存されます。このデータはApple IDの所有者本人のみがアクセスでき、開発者を含む第三者はアクセスできません。\n\n復元ボタンを押すと、iCloudに保存された記録のうちこの端末にないものだけを受信します。バックアップと復元は自動的には実行されず、設定画面でいつでも状態を確認できます。",
    },
    {
      heading: "天気情報(WeatherKit)",
      body: "Pre-flight Check画面に現在の天気を表示するため、現在地をAppleのWeatherKitサービスへ送信して天気情報を取得します。このリクエストはAppleが処理し、開発者がこの位置データを別途収集・保存することはありません。",
    },
    {
      heading: "Apple Watch連携",
      body: "Apple Watchアプリを使用する場合、ペース、距離、心拍数などのランニングデータは、AppleのWatchConnectivityフレームワークを通じてiPhoneとApple Watch間で直接送信されます。このデータはユーザーのデバイス外に出ることはありません。",
    },
    {
      heading: "情報に対する権限",
      body: "iOSの設定 > プライバシーとセキュリティから、位置情報、HealthKit、モーションとフィットネスへのアクセス権限をいつでも取り消すことができます。ただし、権限を取り消した場合、本アプリの一部機能が制限されるか、動作しなくなることがあります。\n\n本アプリをデバイスから削除すると、ローカルに保存されたすべてのランニングデータも削除されます。",
    },
    {
      heading: "子供のプライバシー",
      body: "本アプリは13歳未満の子供を対象としておらず、13歳未満の子供の情報を意図的に収集することはありません。",
    },
    {
      heading: "ポリシーの変更",
      body: "本プライバシーポリシーは変更されることがあります。変更があった場合、このページに最新の更新日とともに反映されます。",
    },
  ],
  contactLabel: "メール",
  contactEmail: "dongik369@naver.com",
};

export function getPrivacyContent(lang: "ko" | "en" | "ja"): PrivacyContent {
  if (lang === "en") return privacyContentEn;
  if (lang === "ja") return privacyContentJa;
  return privacyContentKo;
}
