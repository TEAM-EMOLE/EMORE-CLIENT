import { Outlet } from 'react-router-dom';

export default function GlobalLayout() {
  return (
    <div className="max-w-[600px] min-w-[320px] h-screen overflow-y-auto m-auto custom-scrollbar shadow-md">
      <Outlet />
    </div>
  );
}
