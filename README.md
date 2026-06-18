# 🎓 College Compass – College Discovery & Admission Prediction Platform

A modern full-stack web application that helps students discover, compare, and evaluate colleges across India. The platform provides advanced search, filtering, college comparison, admission prediction based on entrance exam ranks, user authentication, and personalized favorites management.

## 🌐 Live Demo

**Live Website:** https://college-discovery-platform-e3g4.onrender.com

---

## 📖 Overview

Choosing the right college can be overwhelming due to the large amount of information available across multiple sources. College Compass simplifies this process by bringing college details, placements, courses, reviews, and admission prediction into a single platform.

Students can:

* Search colleges by name, city, or state
* Filter colleges based on multiple criteria
* Compare colleges side-by-side
* Predict admission chances using entrance exam ranks
* Save favorite colleges for future reference
* Access detailed college information and placement statistics

---

## ✨ Features

### 🔍 Smart College Search

* Search colleges by name, city, or state
* Instant search results
* Responsive search experience

### 🎯 Advanced Filters

Filter colleges by:

* State
* College Type (Government / Private)
* Annual Fees
* Student Rating
* Placement Statistics

### 🏛 College Detail Pages

Each college contains:

#### Overview

* College information
* Location
* Establishment year
* Description
* College type

#### Courses

* Available programs
* Course duration
* Fee structure

#### Placements

* Placement percentage
* Highest package
* Average package
* Placement insights

#### Reviews

* Student ratings
* Feedback and reviews

### ⚖️ College Comparison

Compare up to 3 colleges side-by-side.

Comparison includes:

* Location
* College type
* Annual fees
* Student ratings
* Placement percentage
* Highest package
* Average package
* Offered courses

Best-performing values are automatically highlighted for easier decision making.

### 🎓 Admission Predictor

Predict admission chances based on:

#### Supported Exams

* JEE Main
* JEE Advanced
* AP EAPCET
* TS EAPCET
* And more

#### Supported Categories

* General
* OBC
* BC-A
* BC-B
* BC-C
* BC-D
* BC-E
* SC
* ST

The system analyzes cutoff data and categorizes colleges into:

* 🟢 High Chance
* 🟡 Medium Chance
* 🔴 Low Chance

### ❤️ Favorites System

Authenticated users can:

* Save colleges to favorites
* Remove favorites
* Access saved colleges anytime

### 🔐 Secure Authentication

Features include:

* User Registration
* User Login
* JWT-based sessions
* Password hashing using bcrypt
* Protected routes and middleware

---

## 📊 Database Coverage

The platform contains 60+ Indian colleges including:

### IITs

* IIT Bombay
* IIT Delhi
* IIT Madras
* IIT Kanpur
* IIT Kharagpur
* IIT Roorkee
* IIT Hyderabad

### NITs

* NIT Trichy
* NIT Warangal
* NIT Surathkal
* NIT Calicut

### IIITs

* IIIT Hyderabad
* IIIT Bangalore
* IIIT Delhi

### Andhra Pradesh Colleges

* Shri Vishnu Engineering College for Women
* Gayatri Vidya Parishad
* Vignan University
* VVIT Guntur
* ANITS
* RVR & JC College of Engineering
* Narasaraopeta Engineering College
* GITAM University

and many more.

---

## 🛠 Tech Stack

### Frontend

* Next.js 15 (App Router)
* React
* TypeScript
* Tailwind CSS
* ShadCN UI

### Backend

* Next.js API Routes
* TypeScript
* REST APIs

### Database

* PostgreSQL
* Prisma ORM
* Neon Database

### Authentication

* NextAuth.js
* JWT Sessions
* bcrypt Password Hashing

### Data Fetching

* TanStack Query

### Validation

* Zod

### Deployment

* Render
* Neon PostgreSQL

---

## 🏗 Architecture

```text
Client (Next.js Frontend)
           │
           ▼
Next.js API Routes
           │
           ▼
Business Logic Layer
           │
           ▼
Prisma ORM
           │
           ▼
PostgreSQL (Neon)
```

---

## 🔄 API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/[...nextauth]

### Colleges

* GET /api/colleges
* GET /api/colleges/[id]

### Compare

* POST /api/compare

### Favorites

* GET /api/favorites
* POST /api/favorites
* DELETE /api/favorites/[id]

### Predictor

* POST /api/predictor

---

## ⚡ Key Technical Decisions

### Why Next.js?

Provides frontend and backend in a single project with excellent developer experience and performance.

### Why Prisma?

Type-safe database queries and simplified database management with TypeScript support.

### Why PostgreSQL?

Reliable relational database suitable for structured college and admission data.

### Why Neon?

Serverless PostgreSQL platform with excellent integration and free hosting.

### Why TanStack Query?

Handles caching, data synchronization, loading states, and optimistic updates efficiently.

---

## 🛡 Edge Cases Handled

* Invalid predictor inputs are validated using Zod
* Unauthorized users are redirected to login
* Image loading failures show fallback placeholders
* API errors return standardized responses
* Empty search results handled gracefully
* Form validation across all user inputs

---

## 🚀 Future Enhancements

* AI-powered college recommendations
* Scholarship finder
* Placement trend analytics
* College ranking system
* Student discussion forums
* Personalized recommendation engine
* Advanced admission forecasting

---

## 👩‍💻 Developer

Built as a full-stack engineering project demonstrating modern web development practices, scalable architecture, authentication, database design, API development, and cloud deployment.

### Project Highlights

✅ Full Stack Application
✅ Responsive Design
✅ Authentication System
✅ College Comparison Engine
✅ Admission Prediction Tool
✅ PostgreSQL Database
✅ Prisma ORM
✅ Cloud Deployment
✅ Production Ready Architecture
