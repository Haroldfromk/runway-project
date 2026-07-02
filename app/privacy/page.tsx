import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy - RunWay",
  description: "RunWay 개인정보 처리방침 / RunWay Privacy Policy",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
