
import TableWithPaginationPage from "Pages/TableWithPaginationPage";
import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const DashBoardLazyComponent = lazy(() => import('Pages/DashboardPage.js'));
const MultiStepFormLazyCompoenent = lazy(() => import('Pages/MultiStepFormPage.js'));
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <Suspense fallback={<div>Loading...</div>}>
          <DashBoardLazyComponent />
        </Suspense>
    },
    {
      path: "/multi-step-form",
      element:
        <Suspense fallback={<div>Loading...</div>}>
          <MultiStepFormLazyCompoenent />
        </Suspense>
    }, 
    {
      path: "/pagination-table",
      element:
        <Suspense fallback={<div>Loading...</div>}>
          <TableWithPaginationPage />
        </Suspense>
    },
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
