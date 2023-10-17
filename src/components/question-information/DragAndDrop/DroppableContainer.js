import PropTypes from "prop-types";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

export default function DroppableContainer({
  children,
  id,
  items,
  isCorrect,
  allBlanksEmpty,
  style
}) {
  const { over, isOver, setNodeRef } = useDroppable({
    id
  });
  const isOverContainer = isOver || (over ? items.includes(over.id) : false);

  return (
    <Box
      ref={setNodeRef}
      display="inline-block"
      minW="150px"
      minH="40px"
      p="2px"
      my="1"
      borderWidth="2px"
      rounded="md"
      transition="background-color .35s ease"
      sx={style}
      css={({ theme }) => {
        if (isOverContainer) {
          return {
            backgroundColor: "#707171"
          };
        }

        if (!allBlanksEmpty && typeof isCorrect === "boolean") {
          const color = theme.colors?.[isCorrect ? "green" : "red"] || "#999999";
          return {
            backgroundColor: color
          };
        }
      }}
    >
      {children.length ? (
        children
      ) : (
        <Flex align="center" h="full">
          &nbsp;
        </Flex>
      )}
    </Box>
  );
}

DroppableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  isCorrect: PropTypes.bool,
  allBlanksEmpty: PropTypes.bool,
  style: PropTypes.object
};
