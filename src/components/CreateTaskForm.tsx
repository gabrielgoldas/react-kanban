import { PlusIcon } from "@radix-ui/react-icons"
import { Badge, Box, Button, Dialog, Flex, RadioGroup, Text, TextArea, TextField } from "@radix-ui/themes"
import { FormEventHandler } from "react"
import { z } from "zod"
import { useTasks } from "../hooks/useTasks"
import { DialogNewTask } from "./DialogNewTask"

const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "doing", "done"]),
  priority: z.enum(["low", "medium", "high"])
})

export const CreateTaskForm: React.FC = () => {
  const { createTask } = useTasks()

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
    ev.preventDefault()

    const formData = new FormData(ev.currentTarget)

    const title = formData.get("title") // name do input
    const description = formData.get("description") // name do input
    const status = formData.get("status") // name do input
    const priority = formData.get("priority") // name do input

    ev.currentTarget.reset()

    const taskData = CreateTaskSchema.parse({ title, description, status, priority })
    await createTask(taskData)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <PlusIcon /> Nova Tarefa
        </Button>
      </Dialog.Trigger>

      <DialogNewTask handleSubmit={handleSubmit} />
      
    </Dialog.Root>
  )
}