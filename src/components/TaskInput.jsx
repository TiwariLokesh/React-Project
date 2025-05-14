import { useState } from "react";
import { useDispatch } from "react-redux";
// import { addTask } from "@/lib/store/taskSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { fetchWeatherForLocation } from "@/lib/store/weatherSlice";
import { PlusCircle } from "lucide-react";

export default function TaskInput() {
  
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [priority, setPriority] = useState("medium");
  
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      location,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    
    
    // dispatch(addTask(newTask));

    // If location is provided, fetch weather data
    
    if (location.trim()) {
      dispatch(fetchWeatherForLocation(location));
    }

    // Reset form
    setTitle("");
    setDescription("");
    
    
    setPriority("medium");
    
    setLocation("");
  };

  return (
    
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        
        <Textarea
          id="description"
          placeholder="Add details about your task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </div>
      
      

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
        
        
          <Label htmlFor="location">Location (for weather)</Label>
          <Input
            id="location"
            placeholder="e.g., New York"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Task
      </Button>
    </form>
  );
}
