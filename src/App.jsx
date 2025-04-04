"use client"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import TaskInput from "@/components/TaskInput"
import TaskList from "@/components/TaskList"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="todo-theme">
        <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Advanced Task Manager</h1>
              <p className="mt-2 text-muted-foreground">Manage your tasks with weather insights</p>
            </div>
            <div className="rounded-lg border bg-card p-4 shadow-sm md:p-6">
              <TaskInput />
              <TaskList />
            </div>
          </div>
        </main>
      </ThemeProvider>
    </Provider>
  )
}

