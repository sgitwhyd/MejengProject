import { plusJakartaSans } from "@/utils/font";

export default function LayoutLogReg({ children }) {
  return <main className={`${plusJakartaSans.className}`}>{children}</main>;
}
