import { Switch, Route, Router as WouterRouter } from "wouter";
  import Step01 from "@/pages/Step01";
  import Step02 from "@/pages/Step02";
  import Step03 from "@/pages/Step03";
  import Step04 from "@/pages/Step04";
  import Step05 from "@/pages/Step05";
  import Pix from "@/pages/Pix";

  function NotFound() {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#888" }}>Página não encontrada.</p>
      </div>
    );
  }

  function Router() {
    return (
      <Switch>
        <Route path="/" component={Step01} />
        <Route path="/step-01" component={Step01} />
        <Route path="/step-02" component={Step02} />
        <Route path="/step-03" component={Step03} />
        <Route path="/step-04" component={Step04} />
        <Route path="/step-05" component={Step05} />
        <Route path="/pix" component={Pix} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  export default function App() {
    return (
      <WouterRouter base="">
        <Router />
      </WouterRouter>
    );
  }
  