// /lib/api.ts

import { v4 as uuidv4 } from "uuid";
import { DocumentData, Ingestion, User, UserResponse } from "./types";

const mockUsers: User[] = [
  {
    id: 'someid',
    email: "user@example.com",
    password: "password",
    role: "user",
  },
  {
    id: 'someidagain',
    email: "admin@example.com",
    password: "password",
    role: "admin",
  },
];

// Mock data for documents, ingestion, and Q&A
const mockDocuments: DocumentData[] = [
  { id: uuidv4(), name: "Document 1", content: "Sample content for Document 1", uploadedBy: "test@example.com" },
  { id: uuidv4(), name: "Document 2", content: "Sample content for Document 2", uploadedBy: "admin@example.com" },
];

// Updated mockIngestionStatus to include a name field
const mockIngestionStatus: Ingestion[] = [
  { id: uuidv4(), name: "Initial Ingestion", status: "Completed", timestamp: new Date().toISOString(), done: true },
  { id: uuidv4(), name: "Second Ingestion", status: "In Progress", timestamp: new Date().toISOString() },
];

const mockQAResponses = [
  { question: "What is Document 1?", answer: "Document 1 is a sample document.", documentExcerpt: "Sample content for Document 1" },
  { question: "How do I upload a document?", answer: "To upload a document, go to the Document Management page and use the upload feature.", documentExcerpt: "Navigate to the Document Management page and click on the upload button." },
  { question: "What is the status of the latest ingestion?", answer: "The latest ingestion is in progress.", documentExcerpt: "Ingestion started on April 28, 2025, and is currently in progress." },
  { question: "Who uploaded Document 2?", answer: "Document 2 was uploaded by admin@example.com.", documentExcerpt: "Uploaded by admin@example.com on April 27, 2025." },
  { question: "Can I delete a document?", answer: "Yes, you can delete a document from the Document Management page.", documentExcerpt: "Go to the Document Management page and click on the delete button next to the document." },
  { question: "What is the purpose of the Q&A interface?", answer: "The Q&A interface allows users to ask questions and retrieve relevant document excerpts.", documentExcerpt: "Use the Q&A interface to ask questions and get answers based on document content." },
  { question: "How do I manage users?", answer: "User management is available to admins on the User Management page.", documentExcerpt: "Admins can assign roles and manage users from the User Management page." },
  { question: "What is the ingestion process?", answer: "The ingestion process involves processing and indexing uploaded documents.", documentExcerpt: "Ingestion processes documents to make them searchable and accessible." },
  { question: "How do I log out?", answer: "You can log out by clicking the logout button in the top-right corner of the dashboard.", documentExcerpt: "Click the logout button to end your session." },
  { question: "What is the role of an admin?", answer: "Admins can manage users, assign roles, and oversee document and ingestion management.", documentExcerpt: "Admins have access to User Management and other administrative features." }
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const authService = {
  login: async (email: string, password: string): Promise<{ user?: UserResponse; token?: string; success:boolean; message?:string }> => {
    await delay(500); // Simulate network delay
    const user = mockUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      return { user, token: uuidv4(), success:true }; 
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  },

  signup: async (email: string, password: string, role:string): Promise<{ user?: User; token?: string; success?:boolean; message?:string }> => {
    await delay(500);
    const existingUser = mockUsers.find((u) => u.email === email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    mockUsers.push({ email, password, id: uuidv4(), role });

    console.log("mockusers", mockUsers);
    

    return { success: true, message: 'Account created successfully.' };
  }

}

export const userService = {
  fetchUsers: async (): Promise<User[]> => {
    await delay(500);
    return mockUsers;
  },

  updateUserRole: async (userId: string, role: string): Promise<{ success: boolean; message: string }> => {
    await delay(500);
    const user = mockUsers.find((u) => u.id === userId);
    if (user) {
      user.role = role;
      return { success: true, message: "User role updated successfully." };
    }
    return { success: false, message: "User not found." };
  },
};

export const documentService = {
  fetchDocuments: async (): Promise<typeof mockDocuments> => {
    await delay(500);
    return mockDocuments;
  },

  uploadDocument: async (name: string, content: string, uploadedBy: string): Promise<{ success: boolean; message: string; mockDocuments: DocumentData[]}> => {
    await delay(500);
    mockDocuments.push({ id: uuidv4(), name, content, uploadedBy });
    return { success: true, mockDocuments ,message: "Document uploaded successfully." };
  },

  deleteDocument: async (documentId: string): Promise<{ success: boolean; message: string, mockDocuments: DocumentData[] }> => {
    await delay(500);
    const index = mockDocuments.findIndex((doc) => doc.id === documentId);
    if (index !== -1) {
      mockDocuments.splice(index, 1);
      return { success: true, mockDocuments, message: "Document deleted successfully." };
    }
    return { success: false, mockDocuments, message: "Document not found." };
  },
};

export const ingestionService = {
  fetchIngestionStatus: async (): Promise<typeof mockIngestionStatus> => {
    await delay(500);
    return mockIngestionStatus;
  },

  triggerIngestion: async (name: string): Promise<{ success: boolean; message: string; mockIngestionStatus: Ingestion[] }> => {
    await delay(500);
    mockIngestionStatus.push({ id: uuidv4(), name, status: "In Progress", timestamp: new Date().toISOString() });
    return { success: true, mockIngestionStatus, message: "Ingestion triggered successfully." };
  },

  updateIngestionStatus: async (ingestionId: string): Promise<{ success: boolean; message: string; mockIngestionStatus: Ingestion[] }> => {
    await delay(500);
    const ingestion = mockIngestionStatus.find((status) => status.id === ingestionId);
    if (ingestion) {
      ingestion.done = true; // Mark as done      
      mockIngestionStatus.push({ ...ingestion, id: uuidv4(),  status: "Completed", timestamp: new Date().toISOString() });
      console.log("mockIngestionStatus", mockIngestionStatus);
      
      return { success: true, mockIngestionStatus, message: "Ingestion status updated successfully." };
    }
    return { success: false, mockIngestionStatus, message: "Ingestion not found." };
  },
};

export const qaService = {
  fetchQuestions: async (): Promise<string[]> => {
    await delay(500);
    return mockQAResponses.map((qa) => qa.question);
  }
  , 

  askQuestion: async (question: string): Promise<{ answer: string; documentExcerpt: string }> => {
    await delay(500);
    const response = mockQAResponses.find((qa) => qa.question === question);
    if (response) {
      return { answer: response.answer, documentExcerpt: response.documentExcerpt };
    }
    return { answer: "No relevant answer found.", documentExcerpt: "" };
  },
};