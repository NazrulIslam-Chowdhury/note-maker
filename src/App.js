import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="dark:bg-slate-950 transition-colors duration-[0.5s] h-[200vh]">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
