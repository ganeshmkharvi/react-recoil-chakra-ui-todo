import { Stack, Input, Button, useToast, Checkbox, Center } from '@chakra-ui/react'
import { useState } from 'react'
import { nanoid } from 'nanoid';

const AddTodo = (props: any) => {
    const toast = useToast()
    const [value, setValue] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    function handleSubmit(e: any) {
        e.preventDefault();

        if (value === '') {
            toast({
                title: "Please enter the text.",
                status: "warning",
                duration: 2000,
                isClosable: true,
            })
            return;
        }
        const todo = {
            id: nanoid(),
            description: value,
            isCompleted: isCompleted
        }

        props.addTodo(todo)
        setValue('');
        setIsCompleted(false);

    }
    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={5} direction='row' >
                <Input
                    mt={5}
                    value={value}
                    variant="outline"
                    type="text"
                    placeholder="Enter your todo..."
                    onChange={(e) => setValue(e.target.value)} />
                <Checkbox colorScheme="green" borderColor='red' size="lg" onChange={(e) => setIsCompleted(e.target.checked)}>Complete</Checkbox>
            </Stack>
            <Button mt={5} colorScheme="teal" type="submit">Add Todo</Button>
        </form>

    )
}

export default AddTodo