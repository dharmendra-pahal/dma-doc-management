# 📚 Document Management Application (Frontend)

This project is a **Next.js 15** application using the **App Router**, built for managing users and documents with a Q&A interface.

---

## 🛠️ Tech Stack

- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Context API for global state
- Jest & Testing Library for unit tests
- Docker for containerization
- GitHub Actions for CI

---

## 🚀 Getting Started (Local Development)

1. Clone the repository:

```bash
git clone https://github.com/dharmendra-pahal/dma-doc-management.git
cd dma-doc-management
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🐳 Running with Docker

Build and run the container:

```bash
docker build -t document-management-frontend .
docker run -p 3000:3000 document-management-frontend
```

Or use Docker Compose:

```bash
docker-compose up --build
```

---

## 🧪 Running Tests
**Is Not a part of this deployment**
```bash
npm run test
```

Test coverage reports are available inside `/coverage` after running tests.

---

## 🏗️ GitHub Actions CI

On every push/PR to `main`, the following workflow runs automatically:

- Checkout code
- Install dependencies
- Build project
- Lint code
- Run tests
- Build Docker image

File: `.github/workflows/ci.yml`

---

## 📦 Deployment

This app is Docker-ready.  
You can deploy using:

- Docker CLI
- Docker Compose
- Kubernetes (with a Deployment.yaml file)
- Any cloud provider like AWS ECS, GCP Cloud Run, Azure Web Apps

---

## 📋 Environment Variables

Create a `.env` file if needed:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 📂 Project Structure

```bash
/
├── app/          # Next.js App Router pages
├── components/   # Reusable UI components
├── context/      # Context API providers
├── lib/          # Utility libraries
├── services/     # API service functions
├── tests/        # Unit and integration tests
├── public/       # Static files
├── styles/       # Global styles
├── Dockerfile
├── docker-compose.yml
├── .github/workflows/ci.yml
├── README.md
└── ...
```

---

## 📢 Author

Built with ❤️ by [Dharmendra Pahal].

---

### Note for Future Development

- Always use `"use client"` at the top of components that use hooks or dynamic data APIs to ensure they are treated as client components in Next.js.

---

## 📐 Design Documentation

### **Architecture Overview**
The application follows a modular and scalable architecture, ensuring separation of concerns and maintainability. The key components are:

1. **Frontend**:
   - Built with Next.js and React.
   - Uses the App Router for routing and page management.
   - Implements Context API for global state management.
   - Tailwind CSS is used for responsive and consistent styling.

2. **Mock Backend Services**:
   - Simulates backend APIs for user, document, ingestion, and Q&A management.
   - Located in `lib/api.ts`.

3. **Testing**:
   - Jest and React Testing Library are used for unit and integration tests.
   - Coverage reports are generated to ensure code quality.

4. **Deployment**:
   - Dockerized for easy deployment.
   - CI/CD pipeline set up using GitHub Actions.

---

### **Key Features**

1. **Authentication**:
   - Sign Up, Login, and Logout functionality.
   - Authentication state managed using Context API.

2. **User Management**:
   - Admin-only interface for managing users and assigning roles.

3. **Document Management**:
   - Interface for uploading, listing, and deleting documents.

4. **Ingestion Management**:
   - Interface to trigger and monitor ingestion processes.

5. **Q&A Interface**:
   - Allows users to ask questions and receive answers with relevant document excerpts.
   - Includes an autocomplete suggestion feature.

---

### **Folder Structure**

```bash
/
├── app/          # Next.js App Router pages
├── components/   # Reusable UI components
├── contexts/     # Context API providers
├── lib/          # Utility libraries and mock APIs
├── tests/        # Unit and integration tests
├── public/       # Static files
├── styles/       # Global styles
├── Dockerfile    # Docker configuration
├── jest.config.js # Jest configuration
├── README.md     # Documentation
└── ...
```

---

### **Design Decisions**

1. **State Management**:
   - Context API was chosen for lightweight global state management.
   - Avoided heavier solutions like Redux for simplicity.

2. **Styling**:
   - Tailwind CSS was used for its utility-first approach and responsiveness.

3. **Mock APIs**:
   - Mock services simulate backend behavior, enabling frontend-only development and testing.

4. **Testing**:
   - Focused on unit and integration tests to ensure component reliability.
   - Coverage reports ensure at least 70% test coverage.

5. **Deployment**:
   - Dockerized for portability and ease of deployment.
   - CI/CD pipeline automates testing, building, and deployment.

---

### **Non-Functional Considerations**

1. **Performance**:
   - Optimized for high performance with responsive design and efficient state management.

2. **Scalability**:
   - Modular architecture ensures the app can scale with additional features.

3. **Maintainability**:
   - Clean and modular code structure.
   - Detailed documentation for ease of onboarding and development.

4. **Security**:
   - Authentication and authorization mechanisms in place.

---

### **Future Enhancements**

1. **Analytics**:
   - Integrate website analytics to track user behavior and improve UX.

2. **Advanced Features**:
   - Implement advanced concepts like RxJS or NgRx for state management if needed.

3. **Cloud Deployment**:
   - Add Kubernetes deployment scripts for cloud providers like AWS, Azure, or GCP.

4. **Real Backend Integration**:
   - Replace mock APIs with real backend services.

---

# 🚀 Optional: `staging.yml` Example Workflow (Deploy Preview Builds)

```yaml
name: Staging Deployment

on:
  push:
    branches:
      - develop

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Docker build and push (Optional)
        run: |
          docker build -t your-dockerhub-username/document-management-frontend:develop .
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker push your-dockerhub-username/document-management-frontend:develop
```

---

✅ **Now you’ll have:**
- Local dev ready
- Docker dev ready
- GitHub Actions CI
- Staging deploys (optional)
- Clean documentation
- Project structure best practices
