import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";


function App() {
  return (
    <div className="dark:bg-slate-950 transition-colors duration-[0.5s] min-h-[100vh] max-h-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
