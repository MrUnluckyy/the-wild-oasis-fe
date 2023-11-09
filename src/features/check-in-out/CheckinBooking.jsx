import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import { useEffect } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmedPaid] = useState();
  const [includeBreakfast, setIncludeBreakfast] = useState();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: loadingSettings } = useSettings();
  const { isLoading, booking } = useGetBooking(false);

  useEffect(() => {
    setConfirmedPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading || loadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfast = settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (includeBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      });
    } else {
      checkin({ bookingId, breakfas: {} });
    }
  }

  const handleAddBreakfast = () => {
    setIncludeBreakfast((breakfast) => !breakfast);
    setConfirmedPaid(false);
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={includeBreakfast}
            onChange={handleAddBreakfast}
            disabled={isCheckingIn}
            id="breakfast"
          >
            Add breakfast for {formatCurrency(optionalBreakfast)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmedPaid((paid) => !paid)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!includeBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfast
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfast
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
