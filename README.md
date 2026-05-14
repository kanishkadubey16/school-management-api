# Live API Endpoints

## GET - List Schools

Returns schools sorted by proximity to the user's location.

### Endpoint

https://school-management-api-fvdq.onrender.com/listSchools?latitude=28.61&longitude=77.20

### Method

GET

### Example Response

```json
[
  {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Delhi",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "distance": "14.14 km"
  }
]
```

---

## POST - Add School

Adds a new school to the database.

### Endpoint

https://school-management-api-fvdq.onrender.com/addSchool

### Method

POST

### Example Request Body

```json
{
  "name": "Modern School",
  "address": "Sonipat",
  "latitude": 28.99,
  "longitude": 77.01
}
```

### Example Response

```json
{
  "message": "School added successfully",
  "schoolId": 2
}
```

---

# Deployment

- Backend deployed on Render
- Database hosted on Aiven MySQL
