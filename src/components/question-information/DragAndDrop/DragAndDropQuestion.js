import React, { Fragment, useEffect, useMemo, useState } from "react";
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
import { RiDragDropLine } from "react-icons/ri";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import PropTypes from "prop-types";
import shuffle from "lodash/shuffle";
import uniq from "lodash/uniq";
import { SolutionGetter, WORD_BANK } from "@/utils/drag-and-drop";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import DroppableContainer from "./DroppableContainer";
import SortableItem from "./SortableItem";
import WordBank from "./WordBank";
import { Item } from "./Item";
import Buttons from "./Submission";
//-----------------------------------------------------------
export function Blank({ solution }) {
  return <span></span>;
}

const parseItemsFromChildren = (children, wrongAnswers, isTaskComplete) => {
  // console.log(isTaskComplete);
  const solutionGetter = new SolutionGetter();
  const childrenWithBlanks = React.Children.toArray(children).map(
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
    if (currChild.items) {
      solutions.push(...currChild.solutions);
      return {
        ...acc,
        [currChild.id]: currChild
      };
    }
    return acc;
  }, {});
  blanks[WORD_BANK] = {
    items: isTaskComplete ? wrongAnswers : shuffle(uniq(solutions).concat(wrongAnswers))
  };
  return [blanks, childrenWithBlanks];
};

export default function DragAndDropQuestion({
  taskId,
  children,
  wrongAnswers = [],
  title = "Drag 'n' Drop",
  successMessage = "Nicely done!",
  failureMessage = "Review the video or read the course to find the right information."
}) {
  const [isTaskComplete] = useLocalStorage(taskId);
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
    [children, wrongAnswers, isTaskComplete]
  );


  const [items, setItems] = useState([]);


  useEffect(() => {
    setItems(defaultItems);
  }, [defaultItems]);

  console.log(items);

  const allBlanksEmpty = useMemo(
    () =>
      !Object.entries(items).some(
        ([key, value]) => key !== WORD_BANK && value?.items?.length
      ),
    [items]

  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );


  const findContainer = (id) => {
    if (id in initialItems[WORD_BANK]?.items) {
      return id;
    }
    return Object.keys(initialItems[WORD_BANK]?.items).find((key) => initialItems[WORD_BANK]?.items[key].includes(id));
  };

  const onDragStart = ({ active }) => {
    setActiveId(active.id);
  };
  console.log(activeId);

  const onDragEnd = ({ active, over }) => {
    console.log(active);
    console.log(over);
    const activeContainer = findContainer(active.id);
    if (!activeContainer) {
      setActiveId(null);
      return;
    }
    
    const overId = over?.id;
    const overContainer = findContainer(overId);

    if (activeContainer && overContainer) {
      const activeIndex = items[WORD_BANK]?.items.indexOf(active.id);
      const overIndex = items[WORD_BANK]?.items.indexOf(overId);
      console.log(activeContainer);
      // console.log(items);
      // if it's different than overContainer, swap the items
      if (activeContainer !== overContainer) {
        setItems((prevItems) => {
          console.log(prevItems);
          let activeItems = [];
          if (Array.isArray(prevItems[activeContainer]?.items)) {
            activeItems = [prevItems[activeContainer].items];
          }
          console.log(activeItems);

          let overItems = [];
          if (Array.isArray(prevItems[overContainer]?.items)) {
            overItems = [prevItems[overContainer].items];
          }

          if (overContainer === WORD_BANK) {
            activeItems = [];
            overItems.push(active.id);
          } else {
            activeItems.splice(activeIndex, 1);

            if (overItems.length) {
              activeItems.push(overItems);
            }
            overItems = [active.id];
          }

          const updatedItems = {
            prevItems,
            [activeContainer]: {
              isCorrect: null,
              items: activeItems
            },
            [overContainer]: {
              isCorrect: null,
              items: overItems
            }
          };

          if (allBlanksEmpty) {
            console.log(updatedItems);
            Object.keys(updatedItems).forEach((key) => {
              console.log(key);
              const index = parseInt(key.split('-')[1]);
              if (!isNaN(index) && updatedItems[key]) {
                updatedItems[key].isCorrect = null;
              }
            });
          }

          return updatedItems;
        });
      } else if (activeIndex !== overIndex) {
        setItems((prevItems) => ({
          prevItems,
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

  

  const colorScheme = !hasSubmitted ? "blue" : isCorrect ? "green" : "red";
  const showWordBank = !hasSubmitted || !isCorrect;//!hasSubmitted || !isCorrect;

  return (
    <Box pl="4" py="1" maxW="960px" mx="auto">
      <Flex
        align="center"
        color={`${colorScheme}.600`}
        fontWeight="semibold"
        mb="2"
      >
        <Box mr="2" as={RiDragDropLine} fontSize="xl" />
        <Text>{title}</Text>
      </Flex>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
      >
        <Flex direction="column" alignItems="flex-start">
          <div>
          
            {childrenWithBlanks.map((child, index) => {
              const { solutions, id } = child;
              if (solutions) {
                let blankItems, isBlankCorrect;
                if (items && items[id]) {
                  const { items: itemsWithId, isCorrect: isCorrectWithId } = items[id];
                  blankItems = itemsWithId;
                  isBlankCorrect = isCorrectWithId;
                } else {
                  blankItems = [];
                  isBlankCorrect = false;
                }
                return (
                  <>
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
                    >
                      {blankItems.map((value) => {
                        return (
                          <SortableItem
                            key={`sortable-item--${value}`}
                            id={value}
                            taskId={taskId}
                            isCorrect={isBlankCorrect}
                          />
                        );
                      })}
                    </DroppableContainer>{" "}
                  </>
                );
              }
              return <Fragment key={index}>{child}</Fragment>;
            })}
          </div>
          {items[WORD_BANK] && (
            <div>
              {showWordBank && <WordBank taskId={taskId} items={items} />}
            </div>
          )}
        </Flex>
        <DragOverlay>
          {activeId && (
            <>
              <Global styles={{ body: { cursor: "grabbing" } }} />
              <Item value={activeId} dragOverlay />
            </>
          )}
        </DragOverlay>
        <Buttons
          taskId={taskId}
          isCorrect={isCorrect}
          items={items}
          hasSubmitted={hasSubmitted}
          failureMessage={failureMessage}
          successMessage={successMessage}
          setIsCorrect={setIsCorrect}
          setItems={setItems}
          reset={onDragCancel}
          initialItems={initialItems}
          setHasSubmitted={setHasSubmitted}
        />
      </DndContext>
    </Box>
  );
}

DragAndDropQuestion.propTypes = {
  taskId: PropTypes.string.isRequired,
  children: PropTypes.node,
  wrongAnswers: PropTypes.array,
  successMessage: PropTypes.string,
  title: PropTypes.string,
  failureMessage: PropTypes.string,
  items: PropTypes.object
};
