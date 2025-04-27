import axios from 'axios';
import { Application, Request, Response } from 'express';

export default function (app: Application): void {
  // Render the Create Task form
  app.get('/tasks/create', (req: Request, res: Response) => {
    res.render('create-task'); // The form for creating a new task
  });

  // Handle form submission for task creation
  app.post('/tasks/create', async (req: Request, res: Response) => {
    try {
      const taskData = req.body;

      // Post the task data to the backend to create the task
      const response = await axios.post('http://localhost:4000/tasks/create', taskData);

      console.log('Created task:', response.data);

      // After successful task creation, redirect to the home page
      res.redirect('/');
    } catch (error) {
      console.error('Error creating task:', error);
      res.render('create-task', { errorMessage: 'Failed to create task. Please try again.' });
    }
  });

    // View Task Route
    app.get('/tasks/:id/view', async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
      
            // Fetch the task details from the backend
            const response = await axios.get(`http://localhost:4000/tasks/${taskId}/view`);
            const task = response.data;
  
            // Render the 'view-task' template with task details
            res.render('view-task', { task });
        } catch (error) {
            console.error('Error fetching task:', error);
            res.redirect('/'); // Redirect to home if task not found
        }
    });
  
    // Edit Task Route
    app.get('/tasks/:id/edit', async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
      
            // Fetch the task details from the backend
            const response = await axios.get(`http://localhost:4000/tasks/${taskId}/view`);
            const task = response.data;
  
            // Render the 'edit-task' template with task details
            res.render('edit-task', { task });
        } catch (error) {
            console.error('Error fetching task:', error);
            res.redirect('/'); // Redirect to home if task not found
        }
    });
  
    app.post('/tasks/:id/edit', async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
            const taskData = req.body;
  
            // Post the updated task data to the backend
            const response = await axios.put(`http://localhost:4000/tasks/${taskId}/edit`, taskData);
            console.log('Task data updated successfuly:', response.data);

            // After successful task update, redirect to the home page
            res.redirect('/');
        } catch (error) {
            console.error('Error updating task:', error);
            res.render('edit-task', { task: req.body, errorMessage: 'Failed to update task. Please try again.' });
        }
    });
    
    // Delete Task Route
    // Display Delete Task Confirmation
    app.get('/tasks/:id/delete', async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
        
            // Fetch the task to be deleted from the backend
            const response = await axios.get(`http://localhost:4000/tasks/${taskId}/delete`);
            const task = response.data;
        
            // Render the 'delete-task' template with task details
            res.render('delete-task', { task });
        } catch (error) {
            console.error('Error fetching task to delete:', error);
            res.redirect('/'); // Redirect to home if task not found
        }
    });
    
    // Handle Deletion Confirmed
    app.post('/tasks/:id/delete', async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
        
            // Send delete request to the backend
            await axios.post(`http://localhost:4000/tasks/${taskId}/delete`);
        
            // Redirect back to the task list after deletion
            res.redirect('/');
        } catch (error) {
            console.error('Error deleting task:', error);
            res.redirect('/'); // Redirect to home if deletion fails
        }
    });
  
}
