import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useGetCabins } from "../cabins/useGetCabins";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const {
    confirmedStays,
    numDays,
    isLoading: isLoadingStays,
  } = useRecentStays();

  const { cabins, isLoading: isLoadingCabins } = useGetCabins();

  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Todays Activities</div>
      <div>Chart Stay Durations</div>
      <div>Chart Sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
