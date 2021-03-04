Project Name : Intern Tracker

# Project Tables:

1. Student Table
2. Project Table
3. Admin Table (Optional)

# Operations Needs to be done:

1. CRUD operations for student profiles
2. CRUD operations for Project and Tasks of individual students
3. CRUD operations fo admin (May needed in feature)
4. Create and update task of each each student by their own
5. Upadate ETA and work history of tasks by students
6. Sort the students by their details in both admin and student dashboards
7. Show the performance of students in dashboard

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
"name": "String",
"sudentRef": "String",
"noOfTasks": "Number",
"noOfTasksCompleted": "Number",
"noOfTaskRemaining": "Number",
"Tasks": [
{
"name": "String",
"estimatedCompletionTime": "String",
"completedTime": "String",
"totalTimeTaken": "String",
"isCompleted": "Boolean",
"isDeleted": "Boolean",
"workHistory": [
{
"message": "String",
"updatedAt": "Date",
"timeSpent": "String"
}
]
}
],
"isDeleted": "Boolean",
"isCompleted": "Boolean",
"createdAt": "Date",
"createdBy": "String",
"updatedAt": "Date",
"updatedBy": "String"
}
```

# Idea to split the tasks into subtasks

1. Do project skeleton using nodeJs, typescript, mongodb
2. Create CRUD operation for students
3. Create CRUD operation for projects
4. Create CRUD operation for admin (optional)
5. Add Filters(sort) for users
6. Show performences in dashboard
