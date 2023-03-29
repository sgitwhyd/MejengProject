import "@/styles/globals.css";
import LayoutAdmin from "@/components/main/layouts/layout-admin";
import LayoutMain from "@/components/main/layouts/layout-main";
import LayoutLogReg from "@/components/main/layouts/layout-log-reg";

export default function App({ Component, pageProps, router }) {
  const getLayout = router.pathname.includes("/admin")
    ? (page) => <LayoutAdmin children={page} />
    : router.pathname.match(/^\/auth\/.*$/)
    ? (page) => <LayoutLogReg children={page} />
    : (page) => <LayoutMain children={page} />;

  return <>{getLayout(<Component {...pageProps} />, pageProps)}</>;
}
