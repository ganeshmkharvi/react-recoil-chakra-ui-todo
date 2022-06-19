import { VStack, Text, Switch, TagLabel, Tag, HStack } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TodoContent } from "../interfaces/TodoContent";
import { todoContentState, toggleIsCompleteState } from "../state/ToDoState";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const InitialPage = () => {

  const setTodos = useSetRecoilState(todoContentState);
  const todos = useRecoilValue(todoContentState);
  const setIsToggleCompleted = useSetRecoilState(toggleIsCompleteState);
  const toggleIsCompleted = useRecoilValue(toggleIsCompleteState);
  
  function deleteTodo(id: string) {
    const newTodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(() => newTodos);
  }

  function toggleIsComplete(e: any) {
    setIsToggleCompleted(e.target.checked);
  }

  function addTodo(newTodo: TodoContent) {
    setTodos(todos => [...todos, newTodo]);
}
  

  function editTodo(id: string, updatedTodo: TodoContent) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setTodos(() => updatedItem);
  }

  return (
    <VStack p={5}>
      <Text bgGradient="linear(to-l, #7928CA,#FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold">
        Todo App
      </Text>
      <Tag size='10' colorScheme='cyan'>
      <HStack spacing={4}>
      <TagLabel>Show Completed Tasks</TagLabel>
      <Switch id='email-alerts' defaultChecked onChange={(e)=> {toggleIsComplete(e)}} />
      </HStack>
      </Tag>
      
      <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} toggleIsCompleted={toggleIsCompleted} />
      <AddTodo addTodo={addTodo} />
    </VStack>
  );
}
export default InitialPage;
