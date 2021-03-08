Project Name : Intern Tracker

# Project Tables:

1. Student Table
2. Project Table
3. Admin Table (Optional)

# Operations Needs to be done:

1. CRUD operations for student profiles - done
2. CRUD operations for Project and Tasks of individual students - done
3. CRUD operations fo admin (May needed in feature)
4. Create and update task of each each student by their own - done
5. Upadate ETA and work history of tasks by students - done
6. Sort the students by their details in both admin and student dashboards - done(sorting)
7. Show the performance of students in dashboard (only api done)

# Table Structure of Student Table:

```json
Student_Table:{
    "_id": "Object Id",
    "name": "String",
    "email": "Email",
    "phone": "String",
    "password": "String",
    "address": "String",
    "college": "String",
    "company": "String",
    "internPeriod": "String",
    "dateOfJoining": "Date",
    "isCompleted" : "Boolean",
    "internRole": "String",
    "isDeleted": "Boolean",
    "createdAt": "Date",
    "createdBy": "String",
    "updatedAt": "Date",
    "udpatedBy": "String",
}
```

# Table Structure of Project Table:

```json
Project_Table: {
"_id": "Object Id",
"projectName": "String",
  "studentRef": "String",
  "noOfTasks": "Number",
  "noOfTasksCompleted": "Number",
  "noOfTaskRemaining": "Number",
  "Tasks": [
    {
      "id": "string",
      "taskName": "String",
      "estimatedCompletionTime": "String",
      "completedTime": "String",
      "totalTimeTaken": "String",
      "isTaskCompleted": "Boolean",
      "isTaskDeleted": "Boolean",
      "workHistory": [
        {
          "message": "String",
          "historyUpdatedAt": "Date",
          "isTaskCompleted": "Boolean",
          "timeSpent": "String",
        }
      ]
    }
  ],
  "isDeleted": "Boolean",
  "isCompleted": "Boolean",
  "createdAt": "Date",
  "createdBy": "String",
  "updatedAt": "Date",
  "updatedBy": "String",
}
```

# Idea to split the tasks into subtasks

1. Do project skeleton using nodeJs, typescript, mongodb
2. Create CRUD operation for students
3. Create CRUD operation for projects
4. Create CRUD operation for admin (optional)
5. Add Filters(sort) for users
6. Show performences in dashboard
