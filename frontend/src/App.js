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

 /* 
 // Work on the shop sellers account - message for account update for the day----done
 // Work on the css and display of sellers account ----done
 // Work on the payment approval
 // Work on the Admin dashboard
 // Work on admin who can get access to accounts and delivery page
 // Work the 
 */
