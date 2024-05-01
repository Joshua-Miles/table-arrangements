import { Card, CardBody } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { from } from "@triframe/ambassador";
import { AttendeeType } from "../../../api";

export const attendeeFields = from(AttendeeType)
    .id()
    .name()
    .tableId()
    .seatNumber();

export type Attendee = (typeof attendeeFields)["ᑕ_subset"];

type AttendeeCardProps = {
  attendee: Attendee;
};

export function AttendeeCard({ attendee }: AttendeeCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `attendee-${attendee.id}`,
    data:  {
        attendee
    }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Card ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <CardBody display="flex">{attendee.name}</CardBody>
    </Card>
  );
}
