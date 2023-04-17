import "@/styles/globals.css";
import LayoutAdmin from "@/components/layouts/layout-admin";
import LayoutMain from "@/components/layouts/layout-main";
import LayoutLogReg from "@/components/layouts/layout-log-reg";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps, router }) {
  const getLayout = router.pathname.includes("/admin")
    ? (page) => <LayoutAdmin children={page} />
    : router.pathname.match(/^\/auth\/.*$/)
    ? (page) => <LayoutLogReg children={page} />
    : (page) => <LayoutMain children={page} />;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {getLayout(<Component {...pageProps} />, pageProps)}
    </>
  );
}
