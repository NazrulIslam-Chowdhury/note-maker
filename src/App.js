import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";


function App() {
  return (
    <div className="dark:bg-slate-950 transition-colors duration-[0.5s] h-[200vh]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
