import {
    HStack, VStack, Text, Flex, Badge, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Input, Checkbox
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import  { useState } from 'react'
import { TodoContent } from '../interfaces/TodoContent';
import { useRecoilValue } from 'recoil';
import { todoContentState } from '../state/ToDoState';

const TodoList = (data: any) => {

    const todos = useRecoilValue(todoContentState);
    const [modalValue, setModalValue] = useState<TodoContent>({id: '', description: '', isCompleted: false})
    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => {
        setIsOpen(false)
    }

    const handleEditClick = (todo: TodoContent) => {
        setIsOpen(true);
        setModalValue(todo)
        console.log(todo)
    }

    const handleEditInputChange = (e: any, id: string) => {
        setModalValue({ ...modalValue, description: e.target.value });
    }

    const handleEditIsCompletedChange = (e: any, id: string) => {
        setModalValue({ ...modalValue, isCompleted: e.target.checked });
    }

    function handleEditSubmit(e: any) {
        e.preventDefault();
        data.editTodo(modalValue.id, modalValue)
       setModalValue({id: '', description: '', isCompleted: false});
        setIsOpen(false)
    }
    return (
        !todos.length ?
            <Badge
                colorScheme="purple"
                variant="outline"
                borderRadius="4"
                p='4' m='5'
            >No todos for Today!!</Badge> : (
                <VStack>
                    {todos.map((todo: TodoContent, index: number) => (
                        todo.isCompleted === data.toggleIsCompleted &&  <HStack spacing="24px" w="380px" key={index}>
                            <Flex p={6} w="300px" h="50px" justifyContent="space-between">
                                <Text>{todo.description}</Text>
                                <Checkbox marginTop='15px' borderColor='red'  size="lg" colorScheme="green" isChecked={todo.isCompleted} ></Checkbox>
                                <Flex w="12px" >
                                    <DeleteIcon color="red.500" mr="2" onClick={() => data.deleteTodo(todo.id)} />
                                    <EditIcon onClick={() => handleEditClick(todo)} />
                                </Flex>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Edit Your Todo</ModalHeader>
                                        <ModalCloseButton />
                                        <form onSubmit={handleEditSubmit}>
                                            <ModalBody>
                                                <Input
                                                    value={modalValue.description}
                                                    key={modalValue.id}
                                                    variant="outline"
                                                    type="text"
                                                    placeholder="Update your todo..."
                                                    onChange={(e) => {handleEditInputChange(e,modalValue.id)}} />
                                                    <Checkbox borderColor='red' isChecked={modalValue.isCompleted} colorScheme="green" size="lg" onChange={(e) => {handleEditIsCompletedChange(e,modalValue.id)}}>Complete</Checkbox>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme="teal" mr={3} onClick={onClose}>
                                                    Close
                                                </Button>
                                                <Button type="submit" colorScheme="teal" mr={3}>
                                                    Update
                                                </Button>
                                            </ModalFooter>
                                        </form>

                                    </ModalContent>
                                </Modal>

                            </Flex>
                        </HStack>
                    
                    ))}
                </VStack>
            ))
}
export default TodoList
