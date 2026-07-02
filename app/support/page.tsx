import type { Metadata } from "next";
import SupportClient from "./SupportClient";

export const metadata: Metadata = {
  title: "Support - RunWay",
  description: "RunWay 지원 및 문의 페이지. 버그 제보, 기능 제안, 자주 묻는 질문.",
};

export default function SupportPage() {
  return <SupportClient />;
}
