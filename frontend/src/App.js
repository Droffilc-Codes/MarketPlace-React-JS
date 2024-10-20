import AppRoutes from "./AppRoutes";
import Header from "./Components/Header/Header";
import Loading from "./Components/Loading/Loading";
import { useLoading } from "./Hook/useLoading";
import setLoadingInterceptor from "./Components/Interceptors/LoadingInterceptor";
import { useEffect } from "react";

function App() {
  const { showLoading, stopLoading } = useLoading()

  useEffect(()=>{
    setLoadingInterceptor({ showLoading, stopLoading})
  })
  return (
    <>
    <Loading />
    <Header />
    <AppRoutes />
    </>
  );
}

export default App;
