import type { SiteDictionary } from "./schema";

export const ja: SiteDictionary = {
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
    badge: "元航空整備士が設計したランニングアプリ",
    titleLine1: "Turn Every",
    titleLine2Prefix: "Run Into A",
    titleLine2Accent: "Flight.",
    description: [
      "A320Fの整備士出身の開発者が作ったiOSランニングトラッカー。",
      "GPS、心拍数、ケイデンスを計器のように読み取り、ペースのズレをGPWS警報でお知らせします。",
    ],
    appStoreCta: "App Storeでダウンロード",
    badgeOs: "iOS 26+ · watchOS 11.5+",
    badgeStack: "SwiftUI · Actor · AsyncStream",
  },
  concept: {
    title: "2つの飛行モード",
    description: [
      "航空機の運航手順にヒントを得た状態機械が、ランニング全体を管理します。",
      "スタートボタンを押すと離陸シーケンスが始まり、走行中はリアルタイムの計器パネルが待っています。",
    ],
    modes: [
      {
        tag: "MODE A",
        title: "Mission Flight",
        desc: "目標ペースと距離を設定して運航します。許容誤差を外れるとGPWSが即座に警告します。",
        points: [
          "目標ペース ± 許容誤差の設定",
          "距離のクイック選択(3K / 5K / 10K / ハーフ / フル)",
          "目標距離の50m手前でMINIMUMS警報",
        ],
      },
      {
        tag: "MODE B",
        title: "Free Flight",
        desc: "目標を設定せず自由に走るVFR(有視界飛行方式)モード。手動でTouchdownして終了します。",
        points: ["目標設定なし", "GPWS無効", "自由なペース記録"],
      },
    ],
    gpwsEyebrow: "Ground Proximity Warning System",
    gpwsAlerts: [
      { label: "SINK RATE", desc: "目標ペースより遅い" },
      { label: "OVERSPEED", desc: "目標ペースより速い" },
      { label: "MINIMUMS", desc: "目標距離の50m手前" },
    ],
  },
  screens: {
    title: "2つの画面、1つの飛行",
    description: [
      "WatchがリードしてもiPhoneがリードしても、両方の端末は同じFlightDataを共有します。",
      "離陸準備から着陸後の記録まで、実際の画面でご確認いただけます。",
    ],
    phoneLabel: "iPhone · 横にスクロール",
    watchLabel: "Apple Watch",
    phoneShots: [
      { key: "homeview", label: "HOME · ダッシュボード" },
      { key: "missionflight", label: "MISSION FLIGHT · 設定" },
      { key: "takeoff", label: "TAKEOFF · 事前点検" },
      { key: "missionrunning", label: "MISSION FLIGHT · CRUISE" },
      { key: "freerunning", label: "FREE FLIGHT · CRUISE" },
      { key: "touchdown", label: "TOUCHDOWN" },
      { key: "summary", label: "FLIGHT SUMMARY · マップルート" },
      { key: "debrief", label: "DEBRIEF · ランニング分析" },
      { key: "fdr", label: "FLIGHT DATA RECORDER" },
      { key: "fdr-drag", label: "FLIGHT DATA RECORDER · 巻き戻し" },
      { key: "logbook", label: "LOGBOOK" },
      { key: "databackup", label: "DATA BACKUP · CloudKit" },
      { key: "alerts", label: "ALERTS · GPWS履歴" },
      { key: "chart", label: "FLIGHT CALENDAR" },
      { key: "notification", label: "TOWER REMINDERS · リマインダー" },
      { key: "dynamic-island", label: "DYNAMIC ISLAND" },
    ],
    watchShots: [
      { key: "home", label: "WATCH · モード選択" },
      { key: "running", label: "WATCH · PFD" },
      { key: "summary", label: "WATCH · サマリー" },
    ],
  },
  architecture: {
    eyebrow: "Under The Hood",
    title: "4つの設計判断",
    description: [
      "並行処理、状態管理、端末間の同期、GPWS判定ロジック - RunWayを",
      "作る上で最も悩んだ4つのポイントです。",
    ],
    quoteLabel: "なぜこの設計にしたのか",
    tabs: [
      { id: "actor", label: "RunningCenter Actor", eyebrow: "並行処理" },
      { id: "phase", label: "FlightPhase 状態機械", eyebrow: "状態管理" },
      { id: "mirroring", label: "Watch ミラーリング", eyebrow: "端末間同期" },
      { id: "gpws", label: "GPWS 判定ロジック", eyebrow: "ペース逸脱の検知" },
    ],
    actor: {
      quote:
        "GPSの更新が連続的に発生し、そのたびにペース・距離・GPWS判定を再計算する必要があるため、この計算ロジックをRunningCenter Actorに隔離して状態の整合性を保証しました。心拍数とケイデンスはWatchConnectivityが受け取り、判定ロジックを持たずスレッドセーフに値を保持するだけのHealthCenter Actorに渡され、RunningCenterが必要なときにそこから値を取得して@Observable ViewModelへ渡します。",
    },
    phase: {
      quote: [
        "各画面が独立して状態を判断すると、画面間で不整合が生じます。",
        "航空機の運航フェーズにヒントを得たFlightPhaseをアプリ全体が参照するようにし、Dynamic IslandとWatch、iPhoneのPFDが常に同じ状態を表示するようにしました。",
      ],
    },
    mirroring: {
      leadingLabel: "GPS + 計算担当",
      followingLabel: "受信 + 表示のみ",
      payloadLabel: "FlightData(ペース・距離・座標、3秒throttle) + elapsedTime(1秒ごとに別途同期)",
      quote: [
        "最初はミラーリング中でもiPhoneとWatchがそれぞれ独自にGPSを取得していました。",
        "主導端末(startOrigin)のみが位置を追跡し、計算結果を相手に送る構造に変更したことで、重複した計算がなくなり、画面切り替えの遅延も解消されました。",
      ],
    },
    gpws: {
      overspeedLabel: "OVERSPEED - 目標より速い",
      normalLabel: "許容範囲内",
      sinkRateLabel: "SINK RATE - 目標より遅い",
      minimumsLabel: "MINIMUMS - 目標まで残り50m",
      quote:
        "目標ペース ± 許容誤差を外れた瞬間にGPWSが反応する必要があるため、位置情報が更新されるたびに現在のペースを計算し、SINK RATEかOVERSPEEDかを判定します。目標距離まで残り50mを切ったら、ペースに関係なくMINIMUMSを優先することで、ゴール間近であるサインを見逃さないようにしました。",
    },
    stack: [
      { label: "SwiftUI", role: "UI" },
      { label: "@MainActor + @Observable", role: "状態管理" },
      { label: "RunningCenter (Actor)", role: "並行処理" },
      { label: "HealthCenter (Actor)", role: "心拍数/ケイデンスのスレッドセーフな保管" },
      { label: "AsyncStream", role: "センサー → ViewModel" },
      { label: "FlightPhase enum", role: "状態機械" },
      { label: "WatchConnectivity", role: "iPhone ↔ Watch" },
      { label: "SwiftData", role: "保存" },
      { label: "CloudKit (CKRecord)", role: "手動バックアップ/復元 · Private Database" },
      { label: "Douglas-Peucker", role: "経路の対角線長に比例した誤差でGPS座標を圧縮" },
      { label: "MapKit + MapPolyline", role: "ルート可視化" },
      { label: "HealthKit", role: "心拍数・ケイデンス・ワークアウトセッション" },
      { label: "WidgetKit + ActivityKit", role: "Dynamic Island" },
      { label: "WeatherKit", role: "リアルタイム天気" },
      { label: "AVSpeechSynthesizer", role: "kmスプリット・カウントダウンの音声案内" },
      { label: "Combine", role: "位置情報・アラート・セッション状態のPublisher + Timer" },
    ],
  },
  architecturePage: {
    backLabel: "RunWayホームへ",
    mapEyebrow: "System Flow",
    mapTitle: "全体システムマップ",
    mapDescription: [
      "GPS・心拍・高度センサーから画面、保存、iPhone↔Watch同期まで、実際のアプリを",
      "構成する17個のコンポーネントとその間を行き来するデータを一枚にまとめました。",
    ],
    mapHint: "ボックスをクリックすると右側に実際のコードが表示されます",
    bands: ["01・センサー入力", "02・コア演算(actor)", "03・ViewModel・端末間同期", "04・リアルタイム画面", "05・保存", "06・記録閲覧"],
    intentLabel: "なぜこの設計にしたのか",
    respLabel: "担当機能",
  },
  systemsMapNodes: [
    {
      id: "loc",
      name: "LocationService",
      path: "RunWay/Shared/Service/LocationService.swift",
      desc: "CLLocationManagerをラップし、位置更新を発行する。10秒以内・精度50m以内のサンプルのみ通過させる。",
      resp: [
        "CLLocationManagerをラップし、位置更新をCombineパブリッシャーとして発行",
        "10秒以内・水平精度50m以内のサンプルのみ通過させるフィルタリング",
        "位置情報権限の状態変化を処理(リクエスト/制限/拒否の通知発行)",
        "distanceFilterなしで、停止中も位置を受信し続けるよう追跡を開始/停止",
      ],
    },
    {
      id: "health",
      name: "HealthCenter",
      path: "RunWay/Shared/Actor/HealthCenter.swift",
      desc: "バックグラウンドで届く心拍数/ケイデンスをスレッドセーフに保持するだけ。判定ロジックはRunningCenter側が持つ。",
      resp: [
        "actorとして心拍数・ケイデンスの値をスレッドセーフに保持",
        "判定ロジックは持たず、RunningCenterが必要なときに値を読み取る",
      ],
    },
    {
      id: "alt",
      name: "AltimeterService",
      path: "RunWay/Shared/Service/AltimeterService.swift",
      desc: "CMAltimeterで気圧計ベースの相対高度を収集する。気圧計のない端末は値を一切発行しない。",
      resp: [
        "CMAltimeterをラップし、相対高度更新をパブリッシャーとして発行",
        "気圧計のない端末では何も発行しない",
        "オンボーディング時点で権限ポップアップだけ先に表示し即座に停止",
      ],
    },
    {
      id: "core",
      name: "RunningCenter",
      path: "RunWay/Shared/Actor/RunningCenter.swift",
      desc: "すべてのランニング計算の中心。GPS/心拍/高度を受け取り、距離・ペース・GPWS・スプリットを計算してFlightDataストリームへ送り出す。",
      resp: [
        "累積距離の計算、二重指数移動平均(Double EMA)によるペーススムージング",
        "raw速度ベースの停止判定(isStationary)、speedAccuracyによる信頼度チェック",
        "GPWS(SINK RATE/OVERSPEED/MINIMUMS)判定、停止中はnormalへリセット",
        "km単位のスプリット記録、相対高度のスムージングと外れ値フィルタリング",
      ],
      intent: "iOSとWatchはそれぞれ独立にGPS・心拍・高度を受け取るため、RunningCenterも端末ごとに別インスタンスとして動く。停止判定はGPS信頼度(speedAccuracy)が低いサンプルを除外しながら確定するが、当初はこのチェックが停止判定にしか掛かっておらず、ペース計算用の速度スムージングには掛かっていなかった。OVERSPEEDに反応して急減速する瞬間はまさに信頼度が負になりやすく、停止確定はできないままスムージング値だけが下がり続けてペースが際限なく膨らみ、アプリがクラッシュする実害につながった。スムージング更新を同じ信頼度チェックの中に移すことで1.3.1で解決した。",
    },
    {
      id: "runvm",
      name: "RunViewModel",
      path: "RunWay/ViewModels/RunViewModel.swift",
      desc: "iPhoneランニング画面の中核ViewModel。LocationService・RunningCenter・HealthKitService・WatchConnectivityServiceを統括する。",
      resp: [
        "LocationService・RunningCenter・HealthKitService・WatchConnectivityServiceを統括",
        "Live Activity、音声案内(TTS)、WeatherKit天気情報サービスを管理",
        "区間音声はイヤホンが接続された端末が読み上げる。iPhoneが自身の出力を確認し、そうでなければWatchに渡し、受け渡しに失敗すれば自分で読む",
        "ラン終了時のSwiftData保存とRunReminderServiceの再予約",
        "Watchミラーリングの開始/終了、リモート終了信号の処理",
      ],
    },
    {
      id: "watchvm",
      name: "WatchViewModel",
      path: "RunWayWatch Watch App/ViewModels/WatchViewModel.swift",
      desc: "RunViewModelと同じ構造をWatch向けに実装。startOriginで主導端末/ミラーリング端末の動作を分岐する。",
      resp: [
        "RunViewModelと同じ構造をWatch環境向けに実装",
        "startOriginで主導端末/ミラーリング端末の動作を分岐",
        "ミラーリング中も受信した距離からkm境界を自分で判定し、区間の振動を鳴らす",
        "Watch単独ランは保存まで直接処理",
      ],
    },
    {
      id: "wc",
      name: "WatchConnectivityService",
      path: "RunWay/Shared/Service/WatchConnectivityService.swift",
      desc: "WCSessionをラップした端末間ブリッジ。FlightDataは3秒throttle、isPausedは即座に送信される。",
      resp: [
        "WCSessionをラップし、iPhone↔Watch間でメッセージを送受信",
        "FlightDataは3秒throttle、isPaused/経過時間は即座に送信",
        "iOS専用/watchOS専用ロジックはそれぞれextensionに分離",
      ],
      intent: "当初はミラーリング中でもiPhoneとWatchがそれぞれ独自にGPSを取得しており、主導端末がGPSロックを再取得する間、画面切り替えが遅延していた。startOriginを基準に主導端末のみが位置を追跡し、計算結果を相手に送る構造に変更したことで、重複した計算と遅延の両方が解消された。",
    },
    {
      id: "pfd",
      name: "PFDView",
      path: "RunWay/Views/Running/PFDView.swift",
      desc: "ラン中のリアルタイム計器パネル。SpeedTape、NavDisplay、Mission HUD、GPWS Barで構成される。",
      resp: [
        "SpeedTape、NavDisplay、Mission HUD、GPWS Barで画面を構成",
        "GPWS状態変化時に画面フラッシュとハプティックフィードバック",
        "セッションが中断してもonDisappearで状態を整理",
      ],
    },
    {
      id: "watchpfd",
      name: "WatchPFDView",
      path: "RunWayWatch Watch App/Views/WatchPFDView.swift",
      desc: "Watch用リアルタイム計器パネル。gpwsStatusに応じてWatchGPWSViewオーバーレイの表示可否を決める。",
      resp: [
        "gpwsStatusに応じてWatchGPWSViewオーバーレイの表示可否を決定",
        "目標(ペース/心拍)に対するリアルタイム偏差を計算",
      ],
    },
    {
      id: "gpws",
      name: "WatchGPWSView",
      path: "RunWayWatch Watch App/Views/WatchGPWSView.swift",
      desc: "SINK RATE/OVERSPEED警告オーバーレイ。画面が表示されている間、2秒間隔の振動ループが回る。",
      resp: [
        "SINK RATE/OVERSPEED/MINIMUMSタイプ別の警告オーバーレイを描画",
        "警告タイプごとに異なるハプティックパターンを2秒間隔で繰り返す",
        "onDisappear時にハプティックを即座にキャンセル",
      ],
      intent: "画面を見ずに走っているときでも警告の種類を区別できる必要があり、SINK RATEは上方向に余裕を持って2回、OVERSPEEDは下方向に素早く4回というように、タイプごとに異なるハプティックパターンを入れた。ただし停止中に警告状態をそのまま「凍結」する当初の方式は、停止直前がたまたま警告状態だった場合その状態のまま固まり振動が止まらない問題があり、凍結の代わりにnormalへ戻す方式に1.3.1で修正した。",
    },
    {
      id: "sdmodels",
      name: "SwiftData Models",
      path: "RunWay/Models/SwiftData/*.swift",
      desc: "SwiftDataFlight(ラン1件)にSplit(km区間)・Alert(GPWS履歴)・Coordinate(座標)がcascadeで紐づく。",
      resp: [
        "SwiftDataFlight: ラン1件の距離・時間・ペース・心拍サマリー",
        "SwiftDataSplit: km区間ごとのペース/心拍/ケイデンス/高度",
        "SwiftDataAlert: GPWS警告の発生時点とタイプの履歴",
        "Flight削除時に関連データをcascade削除",
      ],
      intent: "CloudKit同期を追加したことで、すべてのnon-optionalプロパティに宣言部でのデフォルト値が必要になった。SwiftDataの軽量マイグレーションはinitパラメータではなく宣言部のデフォルト値を見て既存レコードを埋めるため、後からフィールドが追加されても既存ユーザーのマイグレーションが安全に保たれるよう、最初からすべてにデフォルト値を用意した。",
    },
    {
      id: "cloud",
      name: "CloudBackupService",
      path: "RunWay/Shared/Service/CloudBackupService.swift",
      desc: "ユーザーがボタンを押したときだけCKRecordを直接作成し、CloudKit Private Databaseへアップロード/ダウンロードする。",
      resp: [
        "ユーザーがボタンを押したときだけCKRecordを直接生成してアップロード/ダウンロード",
        "座標・警告・スプリットの配列はJSONエンコードして1つのフィールドに保存",
      ],
    },
    {
      id: "reminder",
      name: "RunReminderService",
      path: "RunWay/Services/RunReminderService.swift",
      desc: "最後のラン + 7日後の時点でローカル通知を予約する。ランを保存するたびに予約を組み直す。",
      resp: [
        "最後のラン + 7日後の時点でローカル通知を予約",
        "新しいランを保存するたびに予約を組み直す",
        "設定画面のトグルでオン/オフ可能",
      ],
    },
    {
      id: "logbook",
      name: "LogbookView",
      path: "RunWay/Views/Running/LogbookView.swift",
      desc: "SwiftDataFlightを週単位、さらに月単位でグループ化してリスト表示する。",
      resp: [
        "SwiftDataFlightを週単位、さらに月単位でグループ化",
        "月/週ごとに開閉できるリストUIを提供",
      ],
    },
    {
      id: "summary",
      name: "FlightSummaryView",
      path: "RunWay/Views/Running/FlightSummaryView.swift",
      desc: "ラン1件の詳細画面。MapKitのルート、kmスプリットチャート、GPWSバッジを表示する。",
      resp: [
        "GPS座標からMapKitのルートを描画",
        "kmスプリットをナイキランクラブ風チャートで表示",
        "スプリットパターンバッジとGPWS警告を表示",
      ],
    },
    {
      id: "alerts",
      name: "AlertsView",
      path: "RunWay/Views/Alert/AlertsView.swift",
      desc: "保存されたSwiftDataAlertを月別にまとめ、SINK RATE/OVERSPEED/MINIMUMSの履歴を表示する。",
      resp: [
        "SwiftDataAlertを月別にグループ化して履歴表示",
        "SINK RATE/OVERSPEED/MINIMUMSをタイプ別アイコンで区別",
      ],
    },
    {
      id: "calendar",
      name: "FlightCalendarView",
      path: "RunWay/Views/Chart/FlightCalendarView.swift",
      desc: "月間の記録をGitHubヒートマップ風に表示する。日ごとの累積距離に応じて色の濃さが変わる。",
      resp: [
        "日ごとの累積距離に応じてaccentカラーの濃淡を変えたヒートマップを描画",
        "月間の総距離・ラン回数・平均ペースを上部のサマリーカードに表示",
      ],
    },
  ],
  footer: {
    tagline: "CLEARED FOR TAKE-OFF",
    description: [
      "元航空整備士の哲学が息づく精密ランニングソリューション。",
      "Rotateとともに、飛行を始めましょう。",
    ],
    githubLabel: "GitHub",
    blogLabel: "Blog",
    bottomLine: "RunWay - Turn Every Run Into A Flight",
  },
  troubleshootingPage: {
    backLabel: "RunWayホームへ",
    eyebrow: "Maintenance Log",
    title: "整備記録",
    description: [
      "開発中に実際に直面した問題と原因追跡、解決までの過程を",
      "整備ログの形式でまとめました。すべてが解決したわけではなく、",
      "構造的な限界は限界として正直に残しています。",
    ],
    resolvedLabel: "Resolved",
    limitationLabel: "Known Limitation",
    verdictLabel: "FINAL VERDICT",
    filterAllLabel: "すべて",
    filterEmpty: "該当する記録はありません。",
  },
  supportPage: {
    backLabel: "RunWayホームへ",
    eyebrow: "Support",
    title: "サポート・お問い合わせ",
    description: [
      "バグを発見された方、機能のご提案がある方は下記フォームからお知らせください。",
      "よくある質問はその下でも確認いただけます。",
    ],
    successTitle: "お問い合わせを送信しました",
    successBody: "確認後、ご入力いただいたメールアドレスへご返信いたします。",
    categoryLabel: "お問い合わせの種類",
    categories: [
      { id: "bug", label: "バグ報告" },
      { id: "feature", label: "機能の提案" },
      { id: "other", label: "その他のお問い合わせ" },
    ],
    nameLabel: "お名前(任意)",
    namePlaceholder: "山田太郎",
    emailLabel: "メールアドレス",
    emailPlaceholder: "you@example.com",
    messageLabel: "お問い合わせ内容",
    messagePlaceholder: "どのような状況でどんな問題が発生したか、詳しく教えていただけると助かります。",
    notConfiguredMsg: "お問い合わせフォームはまだ設定されていません。下記のメールアドレスへ直接ご連絡ください。",
    submitErrorMsg: "送信に失敗しました。しばらくしてから再度お試しください。",
    submitting: "送信中...",
    submitLabel: "送信する",
    directEmailPrefix: "直接メールで連絡したい方は",
    faqTitle: "よくある質問",
    faqFooterPrefix: "個人情報の取り扱いについての詳細は",
    faqFooterLinkLabel: "プライバシーポリシー",
    faqFooterSuffix: "ページをご参照ください。",
    subjectNewInquiry: "新しいお問い合わせ",
    subjectFromNameSuffix: "様からのお問い合わせ",
  },
  updatesPage: {
    backLabel: "RunWayホームへ",
    eyebrow: "Updates",
    title: "アップデート履歴",
    description: [
      "バージョンごとに何が変わったかをまとめました。実際に配信",
      "された時点のバージョン基準なので、この整備記録同様、次の",
      "バージョンにしか存在しない作業はまだ含まれていません。",
    ],
    currentLabel: "現在のバージョン",
    releasedLabel: "配信日",
  },
  faq: [
    {
      q: "iPhoneとApple Watchのどちらか一方だけでも使えますか？",
      a: "はい。iPhone単独、Apple Watch単独、両方を一緒に使う三つの方法すべてに対応しています。Watchで開始したランニングはWatchが単独で処理し、終了後に記録がiPhoneのLogbookへ送られます。iPhoneで開始するとWatchアプリが自動的に起動し、iPhoneがGPSと計算を担当し、Watchは心拍を測定して画面に表示します。",
    },
    {
      q: "ランニング中に片方の端末が切れたりアプリが終了すると記録は消えますか？",
      a: "GPSを追跡している端末が終了すると、そのランニングは中断されます。正常に終了した場合、そこまでの記録はLogbookに残ります。ただしiPhoneで開始したランニング中にiPhoneアプリを強制終了すると、Watchの画面が最後の値で止まり、その記録がLogbookに残らないことがあります。この場合でもヘルスケアアプリには記録が残ります。現在判明している制限で、改善を準備しています。",
    },
    {
      q: "ランニングデータはどこに保存されますか？",
      a: "既定ではすべてのランニング記録がAppleのSwiftDataを通じてユーザーの端末内にのみ保存されます。設定画面でバックアップボタンを押すとユーザー本人のiCloudに保存でき、自動的には実行されません。また、ランニング記録はAppleのヘルスケアアプリにも保存されます。",
    },
    {
      q: "アプリを削除すると記録も一緒に消えますか？",
      a: "端末に保存された記録は一緒に削除されます。ただし設定画面で事前にバックアップしておけば、アプリを再インストールして同じApple アカウントで復元ボタンを押すと元に戻せます。バックアップは自動ではないため、削除前にご自身で押していただく必要があります。ヘルスケアアプリに保存されたワークアウト記録は、アプリを削除してもそのまま残ります。",
    },
    {
      q: "位置情報や心拍数のデータが外部に送信されますか？",
      a: "サードパーティの分析ツールや広告SDKは使用しておらず、開発者を含むいかなる第三者もデータにアクセスできません。外部に出るのは三つだけです。ランニング準備画面に天気を表示するため現在地をAppleのWeatherKitへ送ること、バックアップボタンを押した際に記録がユーザー本人のiCloudへ保存されること、そして1日1回App Storeに新しいバージョンがあるかを確認することです。いずれもAppleが処理し、開発者はアクセスできません。アップデート確認はアプリの識別子と国コードのみを送信し、ランニングデータは送信しません。詳細はプライバシーポリシーのページをご確認ください。",
    },
    {
      q: "GPWS警告（SINK RATE、OVERSPEED）が想定と違うタイミングで鳴ります。",
      a: "Mission Flightモードで設定した目標と許容誤差を基準に警告が発生します。目標はペースと心拍数のどちらかを選べるため、どちらに設定しているかと許容誤差の値を合わせてご確認ください。許容誤差を狭くするほど警告は頻繁になります。それでもおかしい場合は、下のお問い合わせフォームから状況をお知らせください。",
    },
    {
      q: "Watchでランニングを終了したのにアプリにLOST CONTACTの通知が表示されます。",
      a: "Apple Watchからのデータが15秒以上届かない場合にアプリが知らせる通知です。Watchでランニングを終了したものの、その信号がアプリに届かなかった場合に表示されます。通知で終了を選ぶとそこまでの記録がそのまま保存され、継続を選ぶとランニングが続きます。Watchのデータが再び届き始めると通知は自動的に消えます。ラン中に接続が一時的に途切れた場合にも表示されることがありますが、その際は閉じてそのまま走って問題ありません。",
    },
  ],
  troubleshooting: [
    {
      id: "mirroring-redesign",
      number: "01",
      title: "ミラーリングアーキテクチャの再設計",
      status: "RESOLVED",
      squawk: "Watch主導のセッションなのに、iPhoneが独自にGPSを取得しようとして画面切り替えが遅延",
      steps: [
        {
          tag: "FINDING",
          title: "問題の認識",
          body: "ミラーリング中でもiPhoneとWatchがそれぞれ独自にLocationServiceとRunningCenterを動かしていた。Watchから開始しても、iPhoneが新たにGPSロックを取得する間に遅延が発生していた。",
        },
        {
          tag: "ACTION",
          title: "方向転換",
          body: "既存のstartOriginを位置追跡の要否を判断する基準にまで拡張。主導端末のみGPSをオンにして計算結果を相手に送信し、ミラーリング端末は受信後に表示するだけとした。",
        },
        {
          tag: "DISCOVERY",
          title: "双方向の実装",
          body: "sendFlightData()がiOS側にしか存在せず、iPhone → Watch方向にしか送れなかった。Watch主導のミラーリングでは、Watchが計算したデータをiPhoneに送る経路そのものが存在しないという隠れた盲点だった。",
        },
        {
          tag: "RESULT",
          title: "補完",
          body: "elapsedTimeまで3秒スロットルに乗せると誤差が積み重なるため、FlightDataとは分離して1秒ごとに専用メッセージ(sendElapsedTime())で同期。iPhone単独 / Watch単独 / 双方向ミラーリングの4つのシナリオがstartOrigin一つで整理された。",
        },
      ],
    },
    {
      id: "nonisolated-crash",
      number: "02",
      title: "nonisolated漏れによる実機クラッシュ",
      status: "RESOLVED",
      squawk: "シミュレーターでは問題ないのに実機でのみクラッシュ",
      steps: [
        {
          tag: "FINDING",
          title: "発見",
          body: "スタックトレースを追跡した結果、session(_:activationDidCompleteWith:error:)内でクラッシュが発生していた。",
        },
        {
          tag: "ROOT CAUSE",
          title: "原因",
          body: "クラス自体はnonisolatedで宣言していたが、extension内のdelegateメソッド自体に明示しないと、Xcode 26のSWIFT_DEFAULT_ACTOR_ISOLATION = MainActorのデフォルト設定により再び@MainActorと推論されてしまう。",
        },
        {
          tag: "FINDING",
          title: "再発",
          body: "1次修正後もdidReceiveUserInfo内で同じパターンのクラッシュが実機でのみ再現した。",
        },
        {
          tag: "ACTION",
          title: "全数点検",
          body: "+iOS、+watchOS extensionのWCSessionDelegateコールバックを全て点検し、漏れていたnonisolatedをすべて追加した。",
        },
      ],
    },
    {
      id: "timer-restart",
      number: "03",
      title: "Timer再起動の問題",
      status: "RESOLVED",
      squawk: "停止後に再開してもelapsedTimeがリセットも再作動もしない",
      steps: [
        {
          tag: "APPROACH",
          title: "1次実装",
          body: "Timer.publish().connect()で開始タイミングを直接制御。一時停止の実装を見据えてautoconnect()の代わりに選択した。",
        },
        {
          tag: "FINDING",
          title: "再起動の失敗",
          body: "停止後に再開してもタイマーが動かない。connect()は一回限りの接続で、一度cancel()したPublisherは再接続できない。",
        },
        {
          tag: "ACTION",
          title: "autoconnectへの転換",
          body: "start()が呼ばれるたびにautoconnect() + sinkで毎回新しく購読。Set<AnyCancellable>に保存し、stop()時にremoveAll()で整理した。",
        },
        {
          tag: "RESULT",
          title: "重複購読の防止",
          body: "start()を連続で押すと購読が積み重なり、秒数が2、3ずつ飛ぶ問題も発見。start()の実行時点で既存の購読を先に整理するよう補完し、最終的に解決した。",
        },
      ],
    },
    {
      id: "asyncstream-continuation",
      number: "04",
      title: "AsyncStream continuationの管理",
      status: "RESOLVED",
      squawk: "位置情報が更新されるたびに新しいストリームと新しいTaskが繰り返し生成される",
      steps: [
        {
          tag: "FINDING",
          title: "発見",
          body: "InstrumentsのSwift Concurrencyプロファイラーで確認したところ、位置情報の更新のたびに新しいAsyncStreamと新しいTaskが繰り返し生成されていた。",
        },
        {
          tag: "ACTION",
          title: "プロパティへの昇格",
          body: "continuationをActorのプロパティに昇格。ストリームは一度だけ開いておき、processLocation()内部で保存されたcontinuationから直接yield()するように変更した。",
        },
        {
          tag: "FINDING",
          title: "Sendableの衝突",
          body: "onTerminationでcontinuation = nilを直接呼び出すと「Actor-isolated property can not be mutated from a Sendable closure」エラー。任意のスレッドで実行される@Sendableクロージャのため、Actor保護されたプロパティに直接アクセスできない。",
        },
        {
          tag: "RESULT",
          title: "init → taskの分離",
          body: "Actor-isolatedなメソッド(clearContinuation())を作り、Task { await ... }で包んで解決。その後startStream()として分離し、Viewの.taskから呼び出すよう再整理した。",
        },
      ],
    },
    {
      id: "state-reset",
      number: "05",
      title: "画面離脱時に状態が初期化されない",
      status: "RESOLVED",
      squawk: "タブバーで突然離脱するとresetState()が呼ばれず、次のランニングに前の状態が残る",
      steps: [
        {
          tag: "FINDING",
          title: "問題の認識",
          body: "正常なフロー(ボタンクリック)だけが状態整理を処理しており、異常な離脱(タブバーのクリック、Watchのクラウン操作)は全くカバーされていないことを実機テストで発見した。",
        },
        {
          tag: "FINDING",
          title: "判断基準",
          body: "isRunningフラグで判断しようとしたが、ミラーリング中のiPhoneはstart()を呼ばないため、セッションが生きていてもfalseになる場合があった。HealthKitService.shared.session != nilを基準に置き換えた。",
        },
        {
          tag: "ACTION",
          title: "フラグパターン",
          body: "ボタンアクションでdidNavigateToTouchdownのようなフラグを先にtrueに設定し、.onDisappearはそのフラグが立っていないことを「異常離脱」と解釈するパターンを5つのViewに同様に適用した。",
        },
        {
          tag: "RESULT",
          title: "例外処理",
          body: "FlightSummaryViewはLogbook閲覧時にも使われるViewのため、selectedFlight == nil条件で区別。Watchは WatchSummaryViewのみ例外的に無条件で整理するようにした。",
        },
      ],
    },
    {
      id: "zombie-session",
      number: "06",
      title: "ゾンビセッション - 原因究明後、保留",
      status: "KNOWN LIMITATION",
      squawk: "ミラーリング中に強制終了 → 再起動時にPFDがそのまま残っている",
      steps: [
        {
          tag: "FINDING",
          title: "1次試行",
          body: "startDate基準で5秒経過したらゾンビとみなす方式を試みたが検証不可 - デバッガーで強制終了した直後に接続が切れ、ログを確認できなかった。",
        },
        {
          tag: "DISCOVERY",
          title: "原因の特定",
          body: "os_log / Console.appに切り替えてprivacyマスキングの問題を解決した後、ようやく本当の原因を特定した。retrieveRemoteSessionが再起動時に既に生きているセッションを再検知する構造だった。",
        },
        {
          tag: "ACTION",
          title: "フラグベースの判別",
          body: "UserDefaultsフラグ(wasZombieSuspected)による判別は正確だったが、.end()呼び出し時にWatchセッションまで連鎖終了する副作用が発生した。",
        },
        {
          tag: "FINDING",
          title: "代替案の模索",
          body: "appLaunchTime比較方式へ転換。ゾンビと判断しても無視すると新しいミラーリングがブロックされ、end()を呼ぶと先の副作用が再発するというジレンマだった。",
        },
        {
          tag: "RESULT",
          title: "構造的限界の確定",
          body: "HKWorkoutSessionはhealthd(システムデーモン)レベルのリソースであり、アプリコードでは完全な制御が不可能だと結論。関連コードを全てロールバックし、ロギングインフラのみ維持した。",
        },
      ],
      verdict:
        "HKWorkoutSessionはhealthd(システムデーモン)レベルのリソースであり、アプリコードでは完全な制御が不可能だと結論。os_log/Console.appベースで原因を正確に特定したが、副作用なしでの解決が不可能だったためv1.0ではknown limitationとして明記した。",
    },
    {
      id: "mirroring-race-condition",
      number: "07",
      title: "Watch主導ミラーリングのレースコンディション",
      status: "RESOLVED",
      squawk: "Watch主導のランニングでのみGPSが全く取得できず、コード変更なしの再ビルドだけで症状が逆側に移動",
      steps: [
        {
          tag: "FINDING",
          title: "症状の移動",
          body: "iPhone主導のミラーリングで出ていた症状(Watch表示が更新されない、終了が同期しない)が、コード変更なしの再ビルドだけで消えた。代わりにWatch主導のミラーリングで、位置情報が全く取得できないという新しい症状が現れた。",
        },
        {
          tag: "ROOT CAUSE",
          title: "非同期の代入と同期チェックの衝突",
          body: "updatePhase(.cruise)内のstartOrigin = .localという代入がTask {}の中にあり非同期で実行される。すぐ次の行のstart()はこの値を一度だけ同期的にチェックするため、代入が完了する前にチェックが走ると、そのランニング中ずっとGPSが起動しない。",
        },
        {
          tag: "DISCOVERY",
          title: "iPhoneが無事だった理由",
          body: "同じ呼び出し順序なのにiPhoneは問題なかった。TakeoffViewにPre-flight Checkを追加した際にprepareTracking()を先に呼ぶようにしていたため、start()が実行される時点ですでにGPSが動いており、レース自体が発生しなかった。Watchにはこの事前ステップがなく、そのまま影響を受けていた。",
        },
        {
          tag: "ACTION",
          title: "レース自体を排除",
          body: "WatchにもiPhoneと同じprepareTracking()/stopTracking()パターンを導入。GPS起動ロジックをstart()から完全に分離し、start()がstartOriginを一切参照しない構造に変更した。",
        },
        {
          tag: "RESULT",
          title: "プラットフォーム構造の統一",
          body: "didStartFlightフラグで、ROTATEによる正常な開始とカウントダウン中の離脱を区別。iOSとWatchが同じアーキテクチャになり、以降両プラットフォームのコードを並べて見ても混乱しにくくなった。",
        },
      ],
    },
    {
      id: "pace-corruption",
      number: "08",
      title: "保存されたinfペースがカレンダーの月平均を汚染した問題",
      status: "RESOLVED",
      squawk: "リアルタイム画面のペースは正常なのに、月間・週間の平均ペースが常に--:--と表示される",
      steps: [
        {
          tag: "FINDING",
          title: "画面と保存値の不一致",
          body: "PFDのリアルタイムペース計算にはすでにisFiniteガードがあり、画面には計算不能時も安全に--'--\"と表示されていた。しかしSwiftDataに保存するsaveRunningData()には同じガードが抜けていた。",
        },
        {
          tag: "ROOT CAUSE",
          title: "infの伝播",
          body: "距離が0だとDoubleはクラッシュせずinfを返す。このinfがそのまま保存され、月平均を求めるreduce演算にinfが一つ混ざるだけで合計全体がinfに汚染され、その月の平均が丸ごと壊れていた。",
        },
        {
          tag: "ACTION",
          title: "保存・集計の二重防御",
          body: "保存時にisFiniteガードを追加し、計算不能な値は0として保存。集計時にもisFiniteフィルタをもう一段かけた。同じ計算式を持つWatch側のWatchPFDView.swiftにも同様のガードを適用した。",
        },
        {
          tag: "FINDING",
          title: "後続の問題",
          body: "ランニング開始直後にすぐ終了すると、ペースが異常に跳ね上がる別の問題を発見。infではなく、時間に対して距離が極端に小さいことで生じた非現実的な有限値だったため、isFiniteガードでは検出できなかった。",
        },
        {
          tag: "RESULT",
          title: "閾値の導入とデータ整理",
          body: "最小有効距離(50m)と現実的なペース上限(30 min/km)を追加。すでに汚染されていた14件のレコードは、使い捨てのクリーンアップスクリプトで削除した。「画面に見えなければ問題ない」ではなく、保存される値自体の安全性を確認すべきだという教訓を得た。",
        },
      ],
    },
    {
      id: "mirroring-scope-narrowing",
      number: "09",
      title: "ミラーリング範囲の縮小 - Watch主導は完全独立実行へ",
      status: "RESOLVED",
      squawk: "Watch主導ミラーリングでのみ繰り返し発生する問題群 - 地図欠落、終了イベント重複、GPS追跡の交錯、Dynamic Islandの停止",
      steps: [
        {
          tag: "FINDING",
          title: "パターンの確認",
          body: "ミラーリングの4つの組み合わせ(アプリ主導/Watch主導 × アプリ終了/Watch終了)をコードで全て再検証した結果、これまでの問題の半分以上が「Watch主導 + iPhoneがそれをリアルタイムで追従する」という組み合わせでのみ発生していた。",
        },
        {
          tag: "DISCOVERY",
          title: "GPS交錯の正体",
          body: "WatchPFDViewには「.onDisappearで状態を整理する」というドキュメントコメントがあったが、実際のコードには存在しなかった。デジタルクラウンで離脱してもGPS追跡が停止せず、止まらないまま残った以前の追跡が次のランと重なっていた。",
        },
        {
          tag: "DISCOVERY",
          title: "Dynamic Islandも同じ根本原因",
          body: "Live Activityを更新するupdateCruise()はiPhone自身のGPSストリームからしか呼ばれておらず、Watchから送られるflightData受信ロジックには接続されていなかった。Watch主導の場合、Live Activityは開始画面から一歩も動けない構造だった。",
        },
        {
          tag: "ACTION",
          title: "妥協点",
          body: "完全な双方向ミラーリングの代わりに、アプリ主導(+ Watchセンサーデータのミラーリング)のみを維持し、Watch主導ではミラーリングを一切試みないようstartOriginで分岐させた。終了時は既存の「Watch単独ラン」経路のまま記録だけiPhoneのLogbookに渡す。",
        },
      ],
      verdict:
        "Watchで走っている間はたいてい画面を見ないという現実を受け入れた。Watch主導のランにiPhoneのリアルタイム同期は必須ではないと判断し、完全な双方向ミラーリングを追い求める代わりに実際の使われ方に合わせてスコープを意図的に狭めた。01番(ミラーリングアーキテクチャ再設計)で組み上げた4つのシナリオのうち一つを、今回撤回した形になる。",
    },
    {
      id: "session-id-duplicate-save",
      number: "10",
      title: "ミラーリング中の重複保存 - 共有セッションIDで整理",
      status: "RESOLVED",
      squawk: "ミラーリング中にWatchでランを終了してすぐ再開すると、同じランがログに何度も重複して保存される",
      steps: [
        {
          tag: "FINDING",
          title: "実機での症状",
          body: "ミラーリング中にWatchでランを終了したが、iPhoneはまだ生きていた。その状態でWatchでランを再開すると、WatchとiPhoneがそれぞれ位置情報を集め続ける状態が重なり、Watchのランをさらに終了するとログに値が3回記録された。",
        },
        {
          tag: "ROOT CAUSE",
          title: "「同じラン」だと確認する共通の識別子がなかった",
          body: "両方の端末が自分の側で終わったランをそれぞれ保存するだけで、お互いに「これは同じランだ」と確認する方法がなかった。終了信号が少し遅れて届くだけで、新しいランと以前のセッションが混ざってしまっていた。",
        },
        {
          tag: "ACTION",
          title: "共有セッションIDの導入",
          body: "ランを開始する端末でUUIDを発行しrunSessionIDとして保持し、flightDataと最終保存メッセージに毎回乗せて送る。保存時にはこの値をそのままSwiftDataFlight.idとして使い、同じidがすでに保存されていれば再度保存しない。",
        },
        {
          tag: "ACTION",
          title: "受信側にもガードを追加",
          body: "Watchが自分だけで新しいランを開始したら(startOrigin == .local)、iPhoneから届く古いflightDataを無視するようガードをかけた。逆方向も同様に処理した。",
        },
        {
          tag: "DISCOVERY",
          title: "iPhone側のnativeミラーリング受信も整理",
          body: "この調査中に、HealthKitService+iOS.swiftのretrieveRemoteSession()が心拍数の伝達にもApple Healthへの保存にも使われていないことを確認した。むしろ残しておくと保存ガードが壊れたり、PFDViewがナビゲーションに重複して積まれる危険しかなかったため、登録を止めた。",
        },
      ],
      verdict:
        "09番でWatch主導ミラーリング自体はなくしたはずだったが、iPhoneがWatchのセッションを受け取り返すコードはまだ残っていた。開始側は今や完全にiPhone一つだけで判断され、終了側はセッションIDで同じランかどうかを確認する形に整理された。",
    },
    {
      id: "runningmode-vs-startorigin",
      number: "11",
      title: "終了信号が届かない問題 - runningModeからstartOriginへ",
      status: "RESOLVED",
      squawk: "iPhoneがstartWatchAppでWatchアプリを直接起動してミラーリングする場合、Watchで終了してもiPhoneのランが終わらない",
      steps: [
        {
          tag: "FINDING",
          title: "実機での症状",
          body: "iPhoneがstartWatchAppでWatchアプリを直接起動してミラーリングする場合、Watchでランを終了してもiPhone側のランが全く終わらなかった。",
        },
        {
          tag: "ROOT CAUSE",
          title: "10番で止めたコードに密かに依存していた",
          body: "WatchViewModelは自分の終了をiPhoneに知らせるかどうかをrunningMode == .mirroredで判断していたが、runningModeはstartMirroringToCompanionDevice()が成功したときだけ.mirroredに変わる。10番でretrieveRemoteSession()(このハンドシェイクを受け取るリスナー)を止めたため、iPhone側に受け取ってくれるものがなくなり、この呼び出しが失敗してrunningModeがずっと.standaloneのままになり、sendStopSignal()自体が呼ばれなくなっていた。",
        },
        {
          tag: "ACTION",
          title: "判定基準の入れ替え",
          body: "判定基準をrunningModeの代わりにstartOrigin != .localに変えた。startOriginはAppDelegate.handle()でこのハンドシェイクの成功可否と関係なく必ず先にセットされ、stopWorkout()もこの値に触れないため、終了時点までそのまま残っている。",
        },
      ],
      verdict:
        "10番でretrieveRemoteSession()を止めたことによる副作用だった。コードを消すときは、それに密かに寄りかかっていた別のロジック(今回は全く別の関数の判定基準)まで一緒に点検する必要があると改めて感じた。",
    },
    {
      id: "gpws-reset-clears-mission-data",
      number: "12",
      title: "GPWS全体リセットバグ - 共有reset()がミッション目標まで消していた",
      status: "RESOLVED",
      squawk: "画面遷移やランニング再開のたびに、Mission Flightの目標(ペース/距離)が原因不明で消えていた",
      steps: [
        {
          tag: "FINDING",
          title: "ホットフィックス分離中に発見",
          body: "まだマージされていない心拍数ブランチをv1.0向けの単独ホットフィックスとして急いで切り出す途中で発見した。RunningCenter.reset()は画面遷移だけでなくstart()の中でも防御的に呼ばれていたが、この呼び出しがmodeAData(ミッション目標)まで毎回消していた。",
        },
        {
          tag: "ROOT CAUSE",
          title: "1つの関数に2つの役割が混ざっていた",
          body: "start()内の防御的なreset()は、elapsedTime/flightDataが前の値を引きずる問題を防ぐためのものであり、modeADataを消す意図はなかった。しかし同じ関数の中に一緒に入っていたため、画面遷移のたびにも、再開時の防御でも、毎回目標データまで一緒に消えていた。",
        },
        {
          tag: "ACTION",
          title: "責務を分離",
          body: "目標データを消す役割をclearModeAData()として切り出した。reset()はmodeADataに触れなくなり、RunViewModel/WatchViewModelのresetState()だけがclearModeAData()を明示的に呼ぶようにした。",
        },
      ],
      verdict:
        "「画面遷移用のクリーンアップ」と「再開時の防御」という別々の目的が1つの関数に同居していると、片方だけを意図した変更がもう片方まで巻き込んでしまう。関数単位で責務を分けるだけで解決した。",
    },
    {
      id: "swiftdata-migration-default-value",
      number: "13",
      title: "SwiftDataの軽量マイグレーションが静かに失敗していた問題",
      status: "RESOLVED",
      squawk: "削除して再インストールするテストしかしていなかったため、既存ユーザーがアプリを更新するだけでマイグレーションに失敗するリスクがあった",
      steps: [
        {
          tag: "FINDING",
          title: "テスト方法の死角",
          body: "心拍数ベースのGPWSのためにSwiftDataAlertにtarget/heartRateフィールドを追加したが、毎回削除して再インストールするテストしかしておらず、マイグレーション経路自体を一度も通っていなかった。",
        },
        {
          tag: "ROOT CAUSE",
          title: "initのデフォルト値はマイグレーションから見えない",
          body: "新しいフィールドのデフォルト値をinit()のパラメータにしか入れていなかった。SwiftDataの自動軽量マイグレーションは、既存レコードに新しいフィールドの値を埋める際にプロパティ宣言部のデフォルト値を参照するが、initパラメータのデフォルト値はそこからは見えない。",
        },
        {
          tag: "ACTION",
          title: "宣言部に直接デフォルト値を明記",
          body: "プロパティ宣言部に直接デフォルト値を入れた。調査の過程で、これをやってもクラッシュするケースがあることも確認した。Appleのフォーラムではこれを「意図された動作」としている。完全に安全にするには、VersionedSchemaでフィールドを一旦オプショナルにしてから必須値に変える多段階マイグレーションが必要。",
        },
      ],
      verdict:
        "削除して再インストールするテストではマイグレーション経路自体を通らない。スキーマを変更するたびに、少なくとも一度は既存バージョンからのアップデート経路で確認する必要があると学んだ。",
    },
    {
      id: "cloudkit-backup-save-policy-and-index",
      number: "14",
      title: "CloudKitバックアップのバグ2件 - savePolicyとqueryableインデックス",
      status: "RESOLVED",
      squawk: "2回目のバックアップから静かに「0件バックアップしました」、CloudKit Dashboardでは照会すらできない",
      steps: [
        {
          tag: "FINDING",
          title: "バグ1 - 2回目のバックアップから静かに失敗",
          body: "バックアップボタンを押すとCloudKit Dashboardにレコードまでは正しくできたが、2回目に押すと「0件バックアップしました」と表示された。",
        },
        {
          tag: "ROOT CAUSE",
          title: "変更タグの比較失敗が静かに埋もれていた",
          body: "modifyRecords(saving:deleting:)のデフォルトの保存ポリシー(.ifServerRecordUnchanged)はサーバー上のレコードと変更タグを比較するが、新しく作ったローカルレコードにはその情報がなく、競合として扱われていた。しかもこの失敗はエラーを投げず、レコードごとの結果の中にだけ含まれていたため、表面上は何の問題もないように見えた。",
        },
        {
          tag: "ACTION",
          title: "常に上書きする方式へ変更",
          body: "savePolicy: .changedKeysに変更し、常にローカルの状態で無条件に上書きするようにした。",
        },
        {
          tag: "FINDING",
          title: "バグ2 - Dashboardで照会できない",
          body: "バックアップはできるのに、CloudKit Dashboardで条件なしの全件照会をすると「Field 'recordName' is not marked queryable」というエラーが出た。",
        },
        {
          tag: "ROOT CAUSE",
          title: "recordNameにはデフォルトでインデックスがない",
          body: "CKQueryで照会する際、条件や並び替えに使うフィールドごとにQueryableインデックスが必要だが、recordNameにはデフォルトでインデックスがない。条件なしの照会(NSPredicate(value: true))が内部的にrecordNameを参照しようとして引っかかっていた。",
        },
        {
          tag: "RESULT",
          title: "クエリ条件の変更とインデックス追加",
          body: "クエリをdateフィールドの条件基準に変更してrecordNameの参照自体を回避し、CloudKit DashboardのSchema > IndexesでrecordNameにQUERYABLEインデックスも直接追加した。",
        },
      ],
      verdict:
        "保存の失敗がエラーを投げずに結果値の中だけに静かに含まれるAPIだったため、「成功したように見える失敗」を捕まえるには戻り値自体を確認する習慣が必要だった。CloudKit Dashboardとアプリのコードが互いに異なるクエリを作るという点も見落としやすいポイントだった。",
    },
    {
      id: "tts-audio-ducking-cross-device",
      number: "15",
      title: "kmスプリットのTTSが聞こえない問題 - セッションのアクティブ化とデバイス間のオーディオ分離",
      status: "KNOWN LIMITATION",
      squawk: "音楽再生中にkmスプリットの音声案内が聞こえない、あるいはWatch単独ランニングでは全く聞こえない",
      steps: [
        {
          tag: "FINDING",
          title: "実機での症状",
          body: "音楽を聴きながら走ってみると、kmスプリットの案内自体が全く聞こえなかった。SpeechAnnouncerServiceはAVAudioSessionを.duckOthersオプションで設定し、案内中だけ音楽を下げるようにしているが、このアクティブ化コードはランニング開始時に一度だけ呼ばれていて、途中で音楽アプリがセッションを奪って中断されると、その後は復旧しなかった。",
        },
        {
          tag: "ACTION",
          title: "再アクティブ化で一次修正、そして逆の問題",
          body: "speak()の直前に毎回セッションを再アクティブ化するよう修正したところ、今度は音楽の音量がランニング中ずっと下がったまま戻らなくなった。原因はstart()に残っていたアクティブ化呼び出しだった。ダッキングはspeak()ではなくセッションがアクティブな間ずっとかかるものなので、この呼び出しを削除し、AVSpeechSynthesizerDelegateのdidFinish/didCancelで発話終了と同時に非アクティブ化するようにした。",
        },
        {
          tag: "DISCOVERY",
          title: "デバイス間でオーディオセッションは分離されている",
          body: "Watch単独ランニング中にiPhoneで音楽を聴いていると、TTSは全く聞こえなかった。AirPodsは両方のデバイスにBluetoothでペアリングされていても、実際のオーディオストリームは一方のデバイスしか持たない。AVAudioSessionはデバイスごとに完全に独立したインスタンスのため、Watch側の設定がiPhoneのオーディオに影響する方法がない。",
        },
        {
          tag: "FINDING",
          title: "Nike Run Clubも同じ壁にぶつかっている",
          body: "コミュニティを調べてみると、Nike Run Clubも全く同じ症状を抱えていて、提示されている解決策も「音楽もWatch自体で再生する」ことだけだった。自分たちのアプリだけのバグではなく、Appleエコシステム全体の構造的な限界だった。",
        },
      ],
      verdict:
        "オンデバイスのダッキングのバグは2つとも直したが、デバイス間のオーディオセッション分離という根本的な限界はコードでは解決できなかった。代わりにアプリのお知らせ画面に「音楽もApple Watchで再生してほしい」という案内を追加し、ユーザーの行動で回避した。すべての問題がコードで解決するわけではなく、時には正直に案内することも答えになる。",
    },
    {
      id: "watch-crown-distance-step-gap",
      number: "16",
      title: "Watchの距離設定Digital Crownが中途半端な値で止まる問題",
      status: "RESOLVED",
      squawk: "CUSTOM距離をCrownで調整すると500m、600m、1.1km、1.6kmのような中途半端な値で止まる",
      steps: [
        {
          tag: "FINDING",
          title: "すでに残っていたTODO",
          body: "最小値100mから回し続けると中途半端な値で止まることを発見した。コードにはすでに「// 修正が必要」というTODOが残っていた。",
        },
        {
          tag: "ROOT CAUSE",
          title: "開始点がステップの倍数になっていなかった",
          body: "Crownのバインディングは開始値0.1(100m)から0.5ずつ足していく構造だった。100mは0.5の倍数ではないため、それ以降のすべての値が開始点の分だけずれ続けていた。",
        },
        {
          tag: "ACTION",
          title: "値の代わりにインデックスへ変更",
          body: "Crownの値を距離そのものではなく、あらかじめ用意したdistanceSteps配列のインデックスに変更した。100mは配列の先頭に例外として置き、以降は0.5km刻みのグリッドにハーフ/フルマラソン(21.1km/42.2km)だけを間に挟んだ。プリセットボタン(3K/5K/10K/HALF/FULL)も値の代わりにインデックスを探して設定するよう修正した。",
        },
      ],
      verdict:
        "開始点とステップ幅が互いの倍数になっていないと、そのずれが積み重なり続けるという、よくあるが見落としやすい算術バグだった。",
    },
    {
      id: "sink-rate-stuck-crash",
      number: "17",
      title: "SINK RATE固着と強制終了 - 三度目の変更で表面化した組み合わせバグ",
      status: "RESOLVED",
      squawk: "OVERSPEED後に減速するとSINK RATEから戻らず、偏差が300秒まで上昇して強制終了",
      steps: [
        {
          tag: "FINDING",
          title: "リリース直後に再現",
          body: "1.3リリース直後、OVERSPEED警告に反応して減速すると正常にSINK RATEに切り替わったが、再び加速してもNORMALに戻らなかった。偏差の数値は上がり続けて300秒に達し、最終的にWatchアプリが強制終了した。",
        },
        {
          tag: "ROOT CAUSE",
          title: "停止判定とペース計算が別々のものを見ていた",
          body: "GPS信頼度(speedAccuracy)が負のサンプルは停止判定(isStationary)では確実にスキップされるが、ペース計算用の速度スムージングはこのチェックの外で毎回無条件に更新されていた。OVERSPEEDに反応して急減速する区間はまさに信頼度が負になりやすく、停止確定はできないままスムージング値だけが低い方へ引っ張られ続けた。",
        },
        {
          tag: "DISCOVERY",
          title: "心拍モードで裏付け",
          body: "心拍ベースのGPWSはこのスムージング計算自体を経由せず、リアルタイムの心拍をそのまま使う。同じ条件でも問題は起きなかった。原因がペース計算の経路だけにあることを裏付ける手がかりになった。",
        },
        {
          tag: "ACTION",
          title: "修正",
          body: "スムージング更新を停止判定と同じspeedAccuracyチェックの中に移した。信頼できない速度値なら、停止判定もペース計算も両方それまでの状態を保つようにした。",
        },
        {
          tag: "FINDING",
          title: "検証中に見つかった二つ目のバグ",
          body: "この修正を確認している最中、別件として、停止して休んでいる間もSINK RATE/OVERSPEEDの振動が鳴り止まない問題が見つかった。停止中はGPWSを凍結する既存のロジックが、停止直前がたまたま警告状態だった場合その状態のまま固まり、警告画面と繰り返し振動を鳴らし続けていた。",
        },
        {
          tag: "RESULT",
          title: "凍結ではなく初期化に",
          body: "停止中は凍結する代わりにnormalへ戻すよう変更した。心拍低下による新規誤警告も引き続き防げるうえ、停止直前に警告が出ていても停止した瞬間に消えるようになった。1.3.1としてリリース。",
        },
      ],
      verdict:
        "このバグは一度に生まれたものではなく、v1.3準備中に行った二つの変更が重なって生まれたものだった。まず停止判定の仕組みをraw速度ベースに作り直し、その後まったく別の理由(心拍低下による誤警告防止)で停止中に凍結するロジックを追加した。それぞれはその時点では妥当な理由による変更だったが、停止判定側のルールが後から追加した凍結ロジックの前提を崩しうることには気づいていなかった。片方のコードだけを見ていては見つからない、二つの変更の関係の中にだけ現れるバグだった。",
    },
    {
      id: "health-duplicate-save-owner",
      number: "18",
      title: "ヘルスケアに同じランニングが二つ - 重複を消すことと保存の主体を決めることは別の作業だった",
      status: "RESOLVED",
      squawk: "ミラーリングで記録したランニングがヘルスケアの運動一覧にiPhoneとApple Watchで一件ずつ残る",
      steps: [
        {
          tag: "FINDING",
          title: "コメントが事実ではなかった",
          body: "開始時刻が秒まで同じ記録が二件あり、ソースはどちらもRunWayでデバイスだけが違った。コードのコメントには「Apple Healthへの保存はWatchのbuilderだけで行われる」とあったが事実ではなかった。iPhoneもセッションにbuilderを付けて収集を始めており、終了時に締めずに置くとシステムがそれまでのデータでワークアウトを確定して保存する。",
        },
        {
          tag: "ACTION",
          title: "片方を止めた",
          body: "ミラーリング中はiPhoneのbuilderを破棄するようにした。無条件に破棄するとWatchなしで走るときに保存する側がいなくなるため、ミラーリング時だけに限定した。",
        },
        {
          tag: "DISCOVERY",
          title: "終了の主体で結果が分かれた",
          body: "実機で確認すると、Watchで終了すると正常だがアプリで終了するとヘルスケアに何も残らなかった。Watch画面から終了する経路はHealthKitのデリゲートが締めてくれるが、iPhoneからの終了信号で入る経路はそのデリゲートを通らない。iPhoneは自分の分を破棄し、Watchも締めないため保存する側が一つもなかった。",
        },
        {
          tag: "RESULT",
          title: "先にルールを決めた",
          body: "「センサーを持つ機器が保存する」と決めたことで、直すべき箇所が二つに絞られた。Watchは遠隔終了信号でも締めるようにし、iPhoneはミラーリング判定の順序を直した。finishWatchWorkout()はセッションを先に終了する順序にも変えた。遠隔終了の経路はセッションがまだ動いた状態で入ってくるためだ。",
        },
      ],
      verdict:
        "最初は保存する側を一つに減らす問題だと考えた。実際には誰が保存するのかを決める問題だった。それを決めずに片方を塞いだため、塞いだ経路では誰も保存せず、塞がなかった経路では両方が保存した。重複を消すことと主体を決めることは別の作業だった。",
    },
    {
      id: "watch-touchdown-teardown",
      number: "19",
      title: "次のランニングを終わらせた前の画面 - 仮説を二度外し、報告者の一言で解けた",
      status: "RESOLVED",
      squawk: "アプリからランニングを開始するとWatchにPFDが一瞬表示され、すぐホーム画面に戻る",
      steps: [
        {
          tag: "FINDING",
          title: "他人が遭遇した症状",
          body: "1.3.1利用者からの報告で、自分の端末では再現しなかった。ホームに戻すコードを全て探すと経路は一つしかなく、利用者は何も押していないのに誰かが代わりにランニングを終了させていた。",
        },
        {
          tag: "ACTION",
          title: "外れた仮説が二つ",
          body: "まず前回のランニングの終了信号がキューに残って遅れて配達されたと考えた。再現手順を作って依頼したが再現せず、後で見ると手順が仮説そのものを避けていた。次にスプラッシュ画面が1.5秒間NavigationStackを塞ぐ構造を見つけて確信した。しかし追加で聞いた「完全終了は正常、バックグラウンドのときだけ問題」が予測と正反対だった。",
        },
        {
          tag: "DISCOVERY",
          title: "サマリーを見ていなかった",
          body: "三つ目に聞いた言葉が答えだった。Watchでランニングを終えると着陸画面が出るが、サマリーを押さずに手首を下ろすとバックグラウンド移行ではonDisappearが呼ばれず後片付けが走らない。次に新しいランニングが始まるとその画面の上にPFDが押し入り、覆われた着陸画面のonDisappearがそこで初めて呼ばれ、始まったばかりのランニングを片付けてしまう。",
        },
        {
          tag: "RESULT",
          title: "覆われたのか離れたのかを区別",
          body: "後片付けに「ワークアウトセッションが動いていれば触らない」条件を付けた。正常に離れる場合はセッションが既に終わっているためそのまま通る。加えて新しいランニングはナビゲーション経路を置き換え、前の画面の上に積まないようにした。外れた仮説のために入れたコードは全て元に戻した。",
        },
      ],
      verdict:
        "onDisappearは「利用者が離れた」と「別の画面が上に覆った」を区別できない。ただ、より大きな学びは別にある。外れた二つの仮説はコードだけを見て立てたもので、当たった一つは報告者が「サマリーを見ていない」と言ってくれた後に出てきた。再現しないと聞いても、仮説ではなく手順を疑わなかった。他人が遭遇したバグは、コードをいくら読んでも条件を埋められない。条件はその人だけが知っている。",
    },
    {
      id: "ghost-viewmodel-blocked-save",
      number: "20",
      title: "死なないコピー - @Stateが作った二つ目のビューモデルが保存を塞いでいた",
      status: "RESOLVED",
      squawk: "Watchで終了したミラーリングのランニングだけアプリのLogbookに保存されない（ヘルスケアには正常に残る）",
      steps: [
        {
          tag: "FINDING",
          title: "同じ関数なのに一つの場合だけ失敗",
          body: "アプリで終了しても、Watchを切って走っても、Watch単独で走っても保存された。Watchで終了した場合だけ失敗した。つまり保存関数自体は正常ということだ。しかし保存を飛ばす箇所が四つとも何も言わずに戻るため、どこで抜けたのか分からなかった。",
        },
        {
          tag: "ACTION",
          title: "順序を出力した",
          body: "四箇所それぞれに理由を付け、その順序をまとめて一度に表示するようにした。外で確認する問題なので画面にも出した。十行が出てきて、二箇所がおかしかった。重複処理を防ぐ値が二度とも無効で、同じランニングなのに距離が0mと264mで違っていた。",
        },
        {
          tag: "DISCOVERY",
          title: "ビューモデルが二つあった",
          body: "App構造体の@State初期値はSwiftUIが構造体を作り直すたびに新しく生成され、最初の一つだけが使われる。捨てられたインスタンスもinit()で既に購読を張っており、終わらないストリームをselfを掴んだまま待つTaskのせいで解放されなかった。重複防止の値はインスタンスごとに別々なので効かず、先に動く幽霊が共有状態を空にして本物の保存がガードに引っかかった。",
        },
        {
          tag: "RESULT",
          title: "繰り返しごとに確認",
          body: "二つのTaskを弱参照にし、繰り返しごとに生きているか確認するようにした。捨てられたインスタンスが正常に解放され、解放されれば購読も切れる。1.3.1のコミットに戻して同じ試験をしても同様に失敗したため、今回の作業が生んだ問題ではないことも確認した。",
        },
      ],
      verdict:
        "購読を経由して保存する経路が一つだけだったため、残り三つは正常に見えた。幽霊がいても表に出ない場所だったのだ。そして幽霊は終了信号だけでなくinit()で張った購読を全て受け取っていた。保存されないことが最も目立っただけだ。@Stateの初期値が複数回作られること自体は知っていたが、それが購読と結び付くと捨てられたコピーが働き続けるところまでは思い至らなかった。",
    },
    {
      id: "watch-stop-waiting-on-save",
      number: "21",
      title: "戻ってこない保存 - 終了信号がその後ろに並んでいた",
      status: "RESOLVED",
      squawk: "Watchでランニングを終了してもiPhoneがラン画面に残ったままになる",
      steps: [
        {
          tag: "FINDING",
          title: "条件が掴めなかった",
          body: "間欠的で、やり直すと正常だった。長いランでのみ発生したが、40分で起きて114分では起きないこともあり、長さでも線が引けなかった。より厄介だったのはiPhone側に何も残らないことだ。信号が届かなければ何も起きていない状態になるため、Watchが送らなかったのか、途中で消えたのか、届いて捨てられたのかを区別できない。",
        },
        {
          tag: "ACTION",
          title: "まず読む手段を作った",
          body: "ボタンから信号までの各地点に一行ずつ残すようにした。ところがWatchシミュレータはアプリが書いたログを保存領域に残さない。6時間分を探してもアプリの行はゼロで、同じ時間帯のシステムアプリのログは正常に残っていた。症状はシミュレータで出るのにログは実機でしか読めない、再現する場所と読める場所がずれた状態だった。同じ行をアプリのフォルダ内のファイルにも書くことで回避した。",
        },
        {
          tag: "DISCOVERY",
          title: "まず正常時を測った",
          body: "失敗した記録を見ても「本来どこまで記録されるのか」が分からなければ意味がない。そこで成功した終了を最後まで記録した。ボタンからiPhoneがホームに戻るまで10秒、そのうち6秒がWatchのHealthKit保存という一箇所だった。基準ができると、失敗した記録で欠けている行がすぐ分かった。",
        },
        {
          tag: "ROOT CAUSE",
          title: "保存が戻ってこなかった",
          body: "再現した日の記録は「保存開始」で途切れていた。システムログを見ると収集終了は3.5秒で完了し、その後の保存段階から出てこない。9分待っても解消せず、その間iPhoneは実際より9分10秒長い記録を積み上げていた。終了信号はその保存が終わってから発行される位置にあった。",
        },
        {
          tag: "ACTION",
          title: "順序を入れ替えた",
          body: "発行を保存の前に移した。iPhoneが自分のランニングを終えるのに、WatchのHealthKit保存が終わる必要はない。保存をなくしたのではなく信号の後ろに回しただけなので、保存はそのまま走り、iPhoneだけがそこから外れる。",
        },
        {
          tag: "RESULT",
          title: "10秒から3秒へ",
          body: "同じ長さのランでボタンからホームまで3.2秒になった。6時間41分のランでは保存に26秒かかったがiPhoneは4.2秒で終了した。保存が終わる24秒前だ。同時に入れた安全装置は、Watchのデータが10秒途切れると待機中であることを表示し、15秒でここで終了するか確認する。",
        },
      ],
      verdict:
        "変えたのは順序であって保存ではない。Watchの保存がなぜ一部のランでだけ終わらないのかは、まだ分かっていない。長さでもデータ量でもなかった。6時間41分のランの方がはるかに多く書き込んで完了し、止まった方はむしろデータベース書き込みが速かった。ただしその答えがなくても直せる問題だった。iPhoneにはそもそもWatchの保存を待つ理由がなかったのだ。原因を最後まで突き止めることと、ユーザーが体験する問題をなくすことは、いつも同じ作業とは限らない。",
    },
  ],
  releases: [
    {
      version: "v1.4.1",
      date: "2026.10",
      items: [
        "FLIGHT DATA RECORDER の PACE の行を反転しました。速いほど上に表示されます。残り 3 行はこれまで通り大きい値が上です",
        "33 分/km より遅いペースは記録しません。走り出した直後や立ち止まったときにしか出ない値のため、40 分/km のような数値が残る問題を防ぎます",
        "FLIGHT DATA RECORDER で値が縦幅を外れた区間は、行の端に帯で表示します。記録がなくて途切れた場合と区別できます",
        "FLIGHT DATA RECORDER のグラフをより広く描画します",
        "ウォッチで 20km を超えると距離が切れて見える問題を修正",
        "アプリから開始したランニングでも、ウォッチが 1km ごとに振動します",
        "区間の音声アナウンスは、イヤホンが接続されている機器から流れます。ウォッチに接続していればウォッチが、アプリ側に接続していればアプリが読み上げます",
        "アプリを終了せずに続けてランニングを始めると、2 回目以降は区間の音声アナウンスが流れなくなる問題を修正しました",
      ],
    },
    {
      version: "v1.4",
      date: "2026.10",
      items: [
        "ウォッチでランを終了してもアプリがラン画面に残っていた問題を修正",
        "ウォッチのデータが途切れるとアプリがお知らせし、戻らない場合はここで終了するか確認します",
        "Debriefタブを追加。蓄積したランニング記録からペースのパターン、心拍の反応、警告の分布を分析して表示します",
        "FLIGHT DATA RECORDERを追加 - 過去のランニングの任意の時点を指して、そのときのペース / 心拍 / ケイデンス / 高度と、走っていた位置を見られます（5秒間隔で記録、このバージョン以降に保存したランニングのみ）",
        "設定でアプリの言語を韓国語 / English / 日本語から選べるようになりました",
        "一時停止していた時間がスプリットペースとFLIGHT DATA RECORDERの時刻に含まれる問題を修正",
        "1kmごとに振動でもお知らせします",
        "Flight Calendarで日付をタップすると、その日のランニング記録に直接移動できます",
        "Flight Calendar で同じ日に複数回走った場合、回数をドットで表示します",
        "App Storeに新しいバージョンが公開されるとアプリがお知らせします",
        "Flight Summary、Flight Calendar、Logbookにランニング時間の表示を追加",
        "長いランの記録を開いたりスクロールしたりする際のもたつきを改善",
        "高度の目盛りが実際の起伏より広く描かれていた問題を改善",
        "マップ上で出発地点と到着地点を色で区別します",
        "ランニング終了後もサマリー画面を離れるまで位置追跡が続いていた問題を修正",
        "新しいランニングの開始直後にWatchへ前回の値が一瞬表示される問題を修正",
        "Watchで目標ペースや許容誤差を選ぶと1小さい値が保存される問題を修正",
        "記録1件のためにiCloudバックアップ全体が失敗することがある問題を修正",
      ],
    },
    {
      version: "v1.3.2",
      date: "2026.10",
      items: [
        "ミラーリングで記録したランニングがヘルスケアアプリに二重保存される問題を修正",
        "Watchでランニングを終了した際にアプリへ記録が残らない問題を修正",
        "Watch単独のランニング記録がiPhoneに届かない場合がある問題を修正",
        "Watchのサマリー画面を見ずに離れた場合、次のランニングがすぐ終了する問題を修正",
        "GPWS警告が地図に過剰に記録される問題を修正",
        "警告が解除される反応速度を改善",
        "1週間リマインダーが一度しか通知されない問題を改善",
        "ランニング準備画面のApple Watch表示基準を改善",
      ],
    },
    {
      version: "v1.3.1",
      date: "2026.09",
      items: [
        "OVERSPEED/SINK RATE警告後にNORMALへ戻らず強制終了する問題を修正",
        "一時停止中もGPWS警告の振動が鳴り続ける問題を修正",
        "設定画面から7日間非アクティブ時のリマインダー通知をオフにできるオプションを追加",
      ],
    },
    {
      version: "v1.3",
      date: "2026.08",
      items: [
        "Watch単独ランの記録が保存されないことがあった問題を修正",
        "その場で停止した際の一時停止判定速度を改善",
        "GPWS警告の種類ごとに異なる振動パターンを追加",
        "WatchでDigital Crownによる目標距離設定の間隔を修正",
        "フライトサマリー画面の地図に拡大/縮小機能を追加",
        "1週間以上ランニングをしていないときに知らせるリマインダー通知を追加",
        "Alerts画面を月別に整理して表示するよう改善",
        "ラン記録を個別に削除する機能を追加",
        "WatchのEND FLIGHTボタンを拡大",
      ],
    },
    {
      version: "v1.2",
      date: "2026.07",
      items: [
        "kmスプリットの音声案内(TTS)を追加",
        "Mission Flightの目標ペース/心拍数表示を改善",
        "地図の終了マーカー表示を変更",
        "設定画面を追加",
        "iCloudバックアップ/復元機能を追加",
        "ログブック画面を改善(月/週単位で記録を整理)",
        "Watch単独ランニング中に発生していた終了/音声案内の問題を修正",
      ],
    },
    {
      version: "v1.1",
      date: "2026.07",
      items: [
        "Mission FlightのGPWS(SINK RATE/OVERSPEED)警告が表示されない問題を修正",
        "GPWS警告画面でランを終了できない問題を修正",
        "MINIMUMS通知の残り距離表示の誤りを修正",
        "Watch単独ランの記録がiPhoneに届かない問題を修正",
      ],
    },
    {
      version: "v1.0",
      date: "2026.06",
      items: ["RunWayリリース"],
    },
  ],
};
