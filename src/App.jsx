import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { routesDeveloper } from "./routes/routesDeveloper";
import { routesAccess } from "./routes/routesAccess"; // ADDED: Import your access routes
import { StoreProvider } from "./store/StoreContext";
import PageNotFound from "./partials/PageNotFound"; // ADDED: Import your proper 404 component

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
          <Routes>
            <Route path="*" element={<PageNotFound />} />{" "}
            {/* FIXED: Uses your 404 component */}
            {/* ADDED: Map through the access routes (like Create Password) */}
            {routesAccess.map(({ ...routesProps }, key) => {
              return <Route key={key} {...routesProps} />;
            })}
            {/* Map through the developer routes */}
            {routesDeveloper.map(({ ...routesProps }, key) => {
              return <Route key={key} {...routesProps} />;
            })}
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
