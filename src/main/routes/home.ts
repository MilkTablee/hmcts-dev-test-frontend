import taskRoutes from './taskRoutes';

import axios from 'axios';
import { Application } from 'express';


export default function (app: Application): void {
  // Render the home page with a list of tasks
  app.get('/', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:4000/tasks/');
      res.render('home', { 'tasks': response.data });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.render('home', { 'tasks': [] });
    }
  });

  // Use task routes (handles /tasks-related routes)
  taskRoutes(app);
}
