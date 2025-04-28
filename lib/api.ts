// /lib/api.ts

import { v4 as uuidv4 } from "uuid";
import { DocumentData, Ingestion, User, UserResponse } from "./types";

const mockUsers: User[] = [
  {
    id: 'someid',
    email: "test@example.com",
    password: "password",
    role: "user",
  },
];

// Mock data for documents, ingestion, and Q&A
const mockDocuments: DocumentData[] = [
  { id: uuidv4(), name: "Document 1", content: "Sample content for Document 1", uploadedBy: "test@example.com" },
  { id: uuidv4(), name: "Document 2", content: "Sample content for Document 2", uploadedBy: "admin@example.com" },
];

const mockIngestionStatus : Ingestion[] = [
  { id: uuidv4(), status: "Completed", timestamp: new Date().toISOString() },
  { id: uuidv4(), status: "In Progress", timestamp: new Date().toISOString() },
];

const mockQAResponses = [
  { question: "What is Document 1?", answer: "Document 1 is a sample document.", documentExcerpt: "Sample content for Document 1" },
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

  triggerIngestion: async (): Promise<{ success: boolean; message: string; mockIngestionStatus: Ingestion[] }> => {
    await delay(500);
    mockIngestionStatus.push({ id: uuidv4(), status: "In Progress", timestamp: new Date().toISOString() });
    return { success: true, mockIngestionStatus, message: "Ingestion triggered successfully." };
  },
};

export const qaService = {
  askQuestion: async (question: string): Promise<{ answer: string; documentExcerpt: string }> => {
    await delay(500);
    const response = mockQAResponses.find((qa) => qa.question === question);
    if (response) {
      return { answer: response.answer, documentExcerpt: response.documentExcerpt };
    }
    return { answer: "No relevant answer found.", documentExcerpt: "" };
  },
};