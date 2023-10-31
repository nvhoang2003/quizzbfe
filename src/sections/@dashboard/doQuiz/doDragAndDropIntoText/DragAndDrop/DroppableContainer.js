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
  style,
  hasSubmitted
}) {


  const { over, isOver, setNodeRef } = useDroppable({
    id
  });
  const isOverContainer = isOver || (over ? items.includes(over.id) : false);


  let backgroundColor = null;

  if (isOverContainer) {
    // backgroundColor = "gray";
  } else if (!allBlanksEmpty && typeof isCorrect === "boolean") {
    backgroundColor = isCorrect ? "#C2F8C2" : "#EEADAD";
  }else if( allBlanksEmpty && typeof isCorrect === "undefined" || typeof isCorrect === "boolean" ){
    backgroundColor = "#EEADAD";
  }

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
      sx={{ ...style, backgroundColor }}
    >
      {children.length ? (
        children
      ) : (
        <Flex align="center" h="full" sx={{ border: 'solid 1px', borderRadius: '5px', height: '30px' }}>
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