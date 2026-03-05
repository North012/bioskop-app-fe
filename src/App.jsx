import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardCustomer from "./pages/DashboardCustomer";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

import UserList from "./pages/user/UserList";
import CreateUser from "./pages/user/CreateUser";
import UpdateUser from "./pages/user/UpdateUser";

import FilmList from "./pages/film/FilmList";
import CreateFilm from "./pages/film/CreateFilm";
import UpdateFilm from "./pages/film/UpdateFilm";
import ShowFilm from "./pages/film/ShowFilm";

import LocationList from "./pages/location/LocationList";
import ShowLocation from "./pages/location/ShowLocation";
import CreateLocation from "./pages/location/CreateLocation";
import UpdateLocation from "./pages/location/UpdateLocation";

import TheaterList from "./pages/theater/TheaterList";
import ShowTheater from "./pages/theater/ShowTheater";
import CreateTheater from "./pages/theater/CreateTheater";
import UpdateTheater from "./pages/theater/UpdateTheater";

import StudioList from "./pages/studio/StudioList";
import CreateStudio from "./pages/studio/CreateStudio";
import UpdateStudio from "./pages/studio/UpdateStudio";
import ShowStudio from "./pages/studio/ShowStudio";

import ScheduleList from "./pages/schedule/ScheduleList";
import ShowSchedule from "./pages/schedule/ShowSchedule";
import CreateSchedule from "./pages/schedule/CreateSchedule";
import UpdateSchedule from "./pages/schedule/UpdateSchedule";

import CreateSeat from "./pages/seat/CreateSeat";
import UpdateSeat from "./pages/seat/UpdateSeat";
import Register from "./pages/Register";

import OrderList from "./pages/order/orderList";
import ShowOrder from "./pages/order/ShowOrder";
import PaymentDetail from "./pages/order/PaymentDetail";

import DetailTicket from "./pages/ticket/detailTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Semua route berikut dilindungi */}
        <Route element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } >
        
          <Route path="dashboard/admin" element={<DashboardAdmin />} />
          <Route path="dashboard/customer" element={<DashboardCustomer />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="users/:id/edit" element={<UpdateUser />} />

          <Route path="films" element={<FilmList />} />
          <Route path="films/create" element={<CreateFilm />} />
          <Route path="films/:id/edit" element={<UpdateFilm />} />
          <Route path="films/:id/show" element={<ShowFilm />} />

          <Route path="locations" element={<LocationList />} />
          <Route path="locations/:id/show" element={<ShowLocation />} />
          <Route path="locations/create" element={<CreateLocation />} />
          <Route path="locations/:id/edit" element={<UpdateLocation />} />

          <Route path="theaters" element={<TheaterList />} />
          <Route path="theaters/create" element={<CreateTheater />} />
          <Route path="theaters/:id/show" element={<ShowTheater />} />
          <Route path="theaters/:id/edit" element={<UpdateTheater />} />

          <Route path="studios" element={<StudioList />} />
          <Route path="studios/create" element={<CreateStudio />} />
          <Route path="studios/:id/edit" element={<UpdateStudio />} />
          <Route path="studios/:id/show" element={<ShowStudio />} />

          <Route path="schedules" element={<ScheduleList />} />
          <Route path="schedules/:id/create" element={<CreateSchedule />} />
          <Route path="schedules/:id/show" element={<ShowSchedule />} />
          <Route path="schedules/:id/edit" element={<UpdateSchedule />} />

          <Route path="seats/:id/create" element={<CreateSeat />} />
          <Route path="seats/:id/edit" element={<UpdateSeat />} />

          <Route path="order/:id" element={<OrderList />} />
          <Route path="order/detail/seat/:id" element={<ShowOrder />} />
          <Route path="order/detail" element={<PaymentDetail />} />

          <Route path="booked/detail/:id" element={<DetailTicket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
