import axiosInstance from '@/services/axiosInstance';
import axios from 'axios';
import { useEffect } from 'react';

/*

createdAt
: 
"2026-04-13T14:26:56.465Z"
description
: 
"English course tasks"
id
: 
1
name
: 
"English"
order
: 
0
updatedAt
: 
"2026-04-13T14:26:56.465Z"

(
task

{status: true, message: 'Operation completed successfully', data: Array(1), meta: {…}, pagination: {…}}
data
: 
Array(1)
0
: 
actualDuration
: 
null
completedAt
: 
null
createdAt
: 
"2026-04-13T14:22:07.710Z"
createdByType
: 
"user"
description
: 
"Read and complete chapter 3 exercises"
difficultyLevel
: 
"easy"
dueDate
: 
"2025-09-21T00:00:00.000Z"
estimatedDuration
: 
240
id
: 
2
priority
: 
"high"
sectionId
: 
null
status
: 
"pending"
tags
: 
['English']
title
: 
"Complete ch3"
updatedAt
: 
"2026-04-13T14:22:07.710Z"
[[Prototype]]
: 
Object
length
: 
1
[[Prototype]]
: 
Array(0)
message
: 
"Operation completed successfully"
meta
: 
{timestamp: '2026-05-07T08:56:06.804Z', path: '/tasks'}
pagination
: 
{page: 1, limit: 10, totalItems: 2, totalPages: 1, links: {…}}
status
: 
true



)



*/

const Tasks = () => {
  useEffect(() => {
    const getResponse = async () => {
      try {
        // Use 'api' instead of 'fetch' so your middleware/interceptors work
        const res = await axiosInstance.get('/tasks'); 
        
        console.log("--- Axios Response Data ---");
        console.log(res.data); // Axios puts the response body in .data
      } catch (error: unknown) {
        if(axios.isAxiosError(error))
        console.error("Axios error:", error.response?.status, error.message);
      }
    };

    getResponse();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Tasks Page</h1>
      <p className="text-gray-500">Check the browser console (F12) to see the response.</p>
    </div>
  );
};

export default Tasks;