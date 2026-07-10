import { CitizenDetails } from '../types';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface DocumentItem {
  id: string;
  name: string;
  required: boolean;
  status: 'Verified' | 'Uploaded' | 'Missing';
  uploadDate: string | null;
  fileName?: string;
}
export interface WorkflowStep {
  id: number;
  name: string;
  status: 'completed' | 'current' | 'pending';
}

export interface NotificationItem {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'success';
  time: string;
}

export interface RecentActivity {
  id: number;
  text: string;
  time: string;
}
export type Page =
  | 'landing'
  | 'form'
  | 'results'
  | 'dashboard'
  | 'documents'
  | 'login'
  | 'logout';
interface AppContextType {
  documents: DocumentItem[];
  steps: WorkflowStep[];
  notifications: NotificationItem[];
  recentActivities: RecentActivity[];
  isUploading: boolean;
  uploadProgress: number;
  calculateProgress: () => number;
handleUploadDocument: (id: string, fileName?: string) => void;
  handleDeleteDocument: (id: string) => void;
  addNotification: (message: string, type?: 'info' | 'warning' | 'success') => void;
  page: Page;
setPage: React.Dispatch<React.SetStateAction<Page>>;
citizen: CitizenDetails | null;
setCitizen: React.Dispatch<React.SetStateAction<CitizenDetails | null>>;
isSchemeSaved: (schemeId: string) => boolean;
aiResponse: string;
setAiResponse: React.Dispatch<React.SetStateAction<string>>;
addApplication: (schemeId: string, schemeName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [documents, setDocuments] = useState<DocumentItem[]>([
{
  id: 'doc-1',
  name: 'Aadhaar Card / Identity Proof',
  required: true,
  status: 'Missing',
  uploadDate: null
},
{
  id: 'doc-2',
  name: 'Income Certificate',
  required: true,
  status: 'Missing',
  uploadDate: null
},
{
  id: 'doc-3',
  name: 'Caste Certificate',
  required: false,
  status: 'Missing',
  uploadDate: null
},
{
  id: 'doc-4',
  name: 'Residence Proof / Domicile',
  required: true,
  status: 'Missing',
  uploadDate: null
},
{
  id: 'doc-5',
  name: 'Educational Marksheet (10th/12th)',
  required: true,
  status: 'Missing',
  uploadDate: null
},
{
  id: 'doc-6',
  name: 'Passport Size Photograph',
  required: true,
  status: 'Missing',
  uploadDate: null
},
{
  id: 'doc-7',
  name: 'Bank Passbook Front Page',
  required: false,
  status: 'Missing',
  uploadDate: null
}  ]);

  const [steps, setSteps] = useState<WorkflowStep[]>([
    { id: 1, name: 'Profile Completed', status: 'completed' },
    { id: 2, name: 'Eligibility Checked', status: 'completed' },
    { id: 3, name: 'Documents Uploaded', status: 'current' },
    { id: 4, name: 'Application Submitted', status: 'pending' },
    { id: 5, name: 'Government Verification', status: 'pending' },
    { id: 6, name: 'Approved', status: 'pending' }
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, message: 'Welcome to JanMithra AI portal.', type: 'info', time: '2 hours ago' },
    { id: 2, message: 'Please upload missing documents to prevent application delays.', type: 'warning', time: '1 day ago' }
  ]);

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    { id: 1, text: 'Aadhaar Card successfully verified by system', time: 'July 01, 2026' },
    { id: 2, text: 'Income Certificate uploaded by user', time: 'July 05, 2026' },
    { id: 3, text: 'Passport Size Photograph uploaded by user', time: 'July 08, 2026' }
  ]);

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [applications, setApplications] = useState<
  { id: string; schemeId: string; schemeName: string; status: string }[]
>([]);
  const [page, setPage] = useState<Page>('landing');
  const [citizen, setCitizen] = useState<CitizenDetails | null>(null);
  const [aiResponse, setAiResponse] = useState("");
  const isSchemeSaved = (schemeId: string) => {
  return false;
};

  const addNotification = (message: string, type: 'info' | 'warning' | 'success' = 'info') => {
    const newNotif: NotificationItem = {
      id: Date.now(),
      message,
      type,
      time: 'Just now'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

const handleUploadDocument = (id: string, fileName?: string) => {    setIsUploading(true);
    setTimeout(() => {
      setDocuments((prevDocs) =>
        prevDocs.map((doc) => {
          if (doc.id === id) {
            return { ...doc, status: 'Uploaded', uploadDate: new Date().toISOString().split('T')[0],
                fileName: fileName || ''

       };
          }
          return doc;
        })
      );
      setIsUploading(false);
      addNotification('Document uploaded successfully', 'success');
      
      setRecentActivities((prev) => [
        { id: Date.now(), text: `Document updated or uploaded online`, time: 'Just now' },
        ...prev
      ]);
    }, 1200);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id === id) {
          return { ...doc, status: 'Missing', uploadDate: null };
        }
        return doc;
      })
    );
    addNotification('Document removed from records', 'warning');
  };

  useEffect(() => {
    const mandatoryDocs = documents.filter(d => d.required);
    const missingMandatory = mandatoryDocs.filter(d => d.status === 'Missing');
    
    setSteps(prevSteps =>
      prevSteps.map((step) => {
        if (step.id === 3) {
          return { ...step, status: missingMandatory.length === 0 ? 'completed' : 'current' };
        }
        if (step.id === 4) {
          return { ...step, status: missingMandatory.length === 0 ? 'current' : 'pending' };
        }
        return step;
      })
    );
  }, [documents]);

const calculateProgress = (): number => {
  const totalDocs = documents.length;

  const uploadedDocs = documents.filter(
    (doc) => doc.status === 'Uploaded' || doc.status === 'Verified'
  ).length;

  return Math.round((uploadedDocs / totalDocs) * 100);
};
  return (
    <AppContext.Provider value={{
      documents,
      steps,
      notifications,
      recentActivities,
      isUploading,
      uploadProgress,
      calculateProgress,
      handleUploadDocument,
      handleDeleteDocument,
      addNotification,
      page,
setPage,
citizen,
setCitizen,
isSchemeSaved,
aiResponse,
setAiResponse,
    }}>
      {children}
    </AppContext.Provider>
  );
};