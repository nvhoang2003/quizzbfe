import DroppableContainer from "./DroppableContainer";
import PropTypes from "prop-types";
import React from "react";
import SortableItem from "./SortableItem";
// import { Box, Text } from "@chakra-ui/react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { WORD_BANK } from "@/utils/drag-and-drop";
import { Box, Stack } from "@mui/material";
import { Text } from "@chakra-ui/react";

export default function WordBank({hasSubmitted, taskId, items }) {
  return (
    <Stack spacing={4} >
      <Text
        fontSize="md" 
      >
        Drag items from the box to the blanks above
      </Text>
      <SortableContext
        items={items[WORD_BANK].items}
        strategy={rectSortingStrategy}
      >
        <DroppableContainer
          taskId={taskId}
          id={WORD_BANK}
          items={items[WORD_BANK].items}
          style={{
            display: "grid",
            gridAutoRows: "max-content",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridGap: "30px" ,
          }}
        >
          {items[WORD_BANK].items.map((value) => {
            return <SortableItem hasSubmitted={hasSubmitted} key={value} id={value} taskId={taskId} />;
          })}
        </DroppableContainer>
      </SortableContext>
    </Stack>
  );
}

WordBank.propTypes = {
  taskId: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired
};
