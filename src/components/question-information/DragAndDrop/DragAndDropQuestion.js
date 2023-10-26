import DroppableContainer from "./DroppableContainer";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import SortableItem from "./SortableItem";
import Submission from "./Submission";
import WordBank from "./WordBank";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { Global } from "@emotion/react";
import { Item } from "./Item";
import { RiDragDropLine } from "react-icons/ri";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import PropTypes from "prop-types";
import shuffle from "lodash/shuffle";
import uniq from "lodash/uniq";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SolutionGetter, WORD_BANK } from "@/utils/drag-and-drop";
import { Card, Stack } from "@mui/material";

export function Blank({ solution }) {
  return <span style={{
    border: "solid",
  }}

  >

  </span>;
}

const parseItemsFromChildren = (children, wrongAnswers, isTaskComplete) => {
  const childrenArray = children.flatMap((element) => element.props.children);
  const solutionGetter = new SolutionGetter();
  const childrenWithBlanks = React.Children.toArray(childrenArray).map(
    (child, index) => {
      if (child.props?.solution) {
        const { solution } = child.props;
        const solutions = Array.isArray(solution) ? solution : [solution];
        return {
          id: `blank-${index}`,
          solutions,
          isCorrect: isTaskComplete || null,
          items: isTaskComplete ? solutionGetter.get(solutions) : []
        };
      }
      return child;
    }
  );

  const solutions = [];
  const blanks = childrenWithBlanks.reduce((acc, currChild) => {
    if (currChild.solutions) {
      solutions.push(...currChild.solutions);
      return {
        ...acc,
        [currChild.id]: currChild
      };
    }

    return acc;
  }, {});

  blanks[WORD_BANK] = {
    items: isTaskComplete
      ? wrongAnswers
      : shuffle(uniq(solutions).concat(wrongAnswers))
  };

  return [blanks, childrenWithBlanks];
};


export default function Dnd({
  taskId,
  children,
  wrongAnswers = [],
  title,
  correct = []
  // submit,
  // setSubmit

}) {
  const [isTaskComplete] = [];
  const [isCorrect, setIsCorrect] = useState(
    isTaskComplete && isTaskComplete.length ? true : false
  );
  const [activeId, setActiveId] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(
    isTaskComplete && isTaskComplete.length ? true : false
  );

  const [initialItems] = useMemo(
    () => parseItemsFromChildren(children, wrongAnswers),
    [children, wrongAnswers]
  );


  const [defaultItems, childrenWithBlanks] = useMemo(
    () => parseItemsFromChildren(children, wrongAnswers, isTaskComplete),
    [children, isTaskComplete, wrongAnswers]
  );

  const [items, setItems] = useState(defaultItems);

  useEffect(() => {
    if (defaultItems) {
      setItems(defaultItems);
    }
    // if(hasSubmitted){
    //   setSubmit(hasSubmitted);
    // }
  }, [defaultItems]);

  const allBlanksEmpty = useMemo(
    () =>
      !Object.entries(items).some(
        ([key, value]) => key !== WORD_BANK && value.items.length
      ),
    [items]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  // find the blank/droppableContainer that an item is in
  const findContainer = (id) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].items.includes(id));
  };

  const onDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const onDragEnd = ({ active, over }) => {
    const activeContainer = findContainer(active.id);

    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    const overId = over?.id;
    const overContainer = findContainer(overId);

    if (activeContainer && overContainer) {
      const activeIndex = items[activeContainer].items.indexOf(active.id);
      const overIndex = items[overContainer].items.indexOf(overId);

      if (activeContainer !== overContainer) {
        setItems((prevItems) => {
          let activeItems = [...prevItems[activeContainer].items];
          let overItems = [...prevItems[overContainer].items];


          if (overContainer === WORD_BANK) {
            activeItems = [];
            overItems.push(active.id);
          } else {
            activeItems.splice(activeIndex, 1);

            // if there's already something in the blank, push its contents to activeItems
            if (overItems.length) {
              activeItems.push(...overItems);
            }
            overItems = [active.id];
          }

          const updatedItems = {
            ...prevItems,
            [activeContainer]: {
              ...prevItems[activeContainer],
              isCorrect: null,
              items: activeItems
            },
            [overContainer]: {
              ...prevItems[overContainer],
              isCorrect: null,
              items: overItems
            }
          };

          // reset isCorrect values if all of the blanks (minus word bank) are empty
          if (allBlanksEmpty) {
            Object.values(updatedItems).forEach((blank) => {
              blank.isCorrect = null;
            });
          }

          return updatedItems;
        });
      } else if (activeIndex !== overIndex) {
        setItems((prevItems) => ({
          ...prevItems,
          [overContainer]: {
            ...prevItems[overContainer],
            isCorrect: null,
            items: arrayMove(items[overContainer].items, activeIndex, overIndex)
          }
        }));
      }
    }

    setActiveId(null);
  };

  const onDragCancel = () => {
    setActiveId(null);
  };
  const cardBackground = isCorrect ? 'green' : 'red';
  const colorScheme = !hasSubmitted ? "blue" : isCorrect ? "green" : "red";
  const showWordBank = !hasSubmitted || !isCorrect;
  const isDisabled = true;
  return (
    <Box pl="4" py="1" maxW="960px" mx="auto">
      <Flex
        align="center"
        color={`${colorScheme}.600`}
        fontWeight="semibold"
        mb="2"
      >
        <Box mr="2" as={RiDragDropLine} fontSize="xl" />
        <Text><strong>{title}</strong></Text>
      </Flex>
      <Stack spacing={2}>
        <Card sx={{ p: 5 }}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
          >
            <Flex key={1} direction="column" alignItems="flex-start">
              <div>
                {childrenWithBlanks.map((child, index) => {
                  const { solutions, id } = child;
                  if (solutions) {
                    const { items: blankItems, isCorrect: isBlankCorrect } = items[id];

                    return (
                      <React.Fragment key={index} >
                        {" "}
                        <DroppableContainer
                          key={id}
                          id={id}
                          items={blankItems}
                          isCorrect={isBlankCorrect}
                          allBlanksEmpty={allBlanksEmpty}
                          style={{
                            height: "40px"
                          }}
                          hasSubmitted={hasSubmitted}
                        >
                          {blankItems.map((value) => {
                            return (
                              <SortableItem
                                key={`sortable-item--${value}`}
                                id={value}
                                taskId={taskId}
                                isCorrect={isBlankCorrect}
                                hasSubmitted={hasSubmitted}
                              />
                            );
                          })}
                        </DroppableContainer>
                        {" "}
                      </React.Fragment>
                    );
                  }
                  return <Fragment key={index}>{child}</Fragment>;
                })}
              </div>

              <div style={{ paddingTop: '25px' }}>
                {showWordBank && <WordBank hasSubmitted={hasSubmitted} taskId={taskId} items={items} />}
              </div>

            </Flex>
            <DragOverlay>
              {activeId && (
                <>
                  {/* <Global styles={{ body: { cursor: isDisabled ? "not-allowed" : "grabbing" } }} />
                  <Item value={activeId} dragOverlay isdisabled={isDisabled} /> */}
                  <Global styles={{ body: { cursor: "grabbing" } }} />
                  <Item value={activeId} dragOverlay />
                </>
              )}
            </DragOverlay>



          </DndContext>
        </Card>

        {hasSubmitted === true ? (
          <Card sx={{ p: 5, background: cardBackground }}>
            {isCorrect === true ? (
              <React.Fragment>
                <span>Bạn đã trả lời đúng: </span>
                <br />
                <span>Đáp án của câu hỏi là : </span>
                {correct?.map((item, index) => (
                  <React.Fragment key={index}>
                    &nbsp;<br /><span>{item}</span>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span>Bạn đã trả lời sai: </span>
                <br />
                <span>Đáp án của câu hỏi là : </span>
                {correct?.map((item, index) => (
                  <React.Fragment key={index}>
                    &nbsp;<br /><span>{item}</span>
                  </React.Fragment>
                ))}
              </React.Fragment>
            )}
          </Card>
        ) : null}
      </Stack>





      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 3 }}>
        <Submission
          taskId={taskId}
          isCorrect={isCorrect}
          items={items}
          hasSubmitted={hasSubmitted}
          setIsCorrect={setIsCorrect}
          setItems={setItems}
          reset={onDragCancel}
          initialItems={initialItems}
          setHasSubmitted={setHasSubmitted}
        />
      </Stack>
    </Box>
  );
}

Dnd.propTypes = {
  taskId: PropTypes.string.isRequired,
  children: PropTypes.node,
  wrongAnswers: PropTypes.array,
  title: PropTypes.string,
  items: PropTypes.object
};
