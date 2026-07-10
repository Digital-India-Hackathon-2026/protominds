import React, { useState } from 'react';
import { useApp, DocumentItem } from '../context/AppContext';

const Documents: React.FC = () => {
  const { documents, handleUploadDocument, handleDeleteDocument, uploadProgress,isUploading, addNotification } = useApp();
  const [submitError, setSubmitError] = useState<string>('');
  const [successSubmission, setSuccessSubmission] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  const totalRequired = documents.filter(d => d.required).length;
  const uploadedRequiredCount = documents.filter(d => d.required && d.status !== 'Missing').length;
  const missingRequiredCount = totalRequired - uploadedRequiredCount;

  const missingDocuments = documents.filter(d => d.status === 'Missing');
  const availableDocuments = documents.filter(d => d.status !== 'Missing');

  const handleGlobalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (missingRequiredCount > 0) {
      setSubmitError('Please upload all mandatory documents before submitting your application.');
      addNotification('Submission blocked: Outstanding required fields', 'warning');
      setTimeout(() => setSubmitError(''), 5000);
    } else {
      setSuccessSubmission(true);
      addNotification('Application submitted successfully', 'success');
    }
  };
const handleFileSelect = (
  e: React.ChangeEvent<HTMLInputElement>,
  docId: string
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setUploadedFiles((prev) => ({
    ...prev,
    [docId]: file,
  }));

  handleUploadDocument(docId,file.name);
};
  const triggerSimulatedAction = (action: string, docName: string) => {
    addNotification(`${action} simulation launched for: ${docName}`, 'info');
  };

  const renderDocumentCard = (doc: DocumentItem) => {
    return (
      <div
        key={doc.id}
        className={`bg-white rounded-xl shadow-sm border p-5 transition-all duration-300 hover:shadow-md flex flex-col justify-between ${
          doc.status === 'Missing' ? 'border-rose-200 bg-rose-50/20' : 'border-slate-100'
        }`}
      >
        <div>
          <div className="flex items-start justify-between mb-3 gap-2">
            <h3 className="font-bold text-sm text-slate-800 leading-tight tracking-tight">{doc.name}</h3>
            {doc.required ? (
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200 shrink-0">
                Mandatory
              </span>
            ) : (
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                Optional
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 mb-4">
            {doc.status === 'Verified' && (
              <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5" />
                ✅ Verified
              </span>
            )}
            {doc.status === 'Uploaded' && (
              <span className="inline-flex items-center text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5" />
                ✅ Uploaded
              </span>
            )}
            {doc.status === 'Missing' && (
              <span className="inline-flex items-center text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mr-1.5" />
                ❌ Missing
              </span>
            )}
            
            {doc.uploadDate && (
              <span className="text-[11px] text-slate-400 font-medium">
                Up: {doc.uploadDate}
              </span>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-auto">
          {doc.status === 'Missing' ? (
            
<>
  <input
    type="file"
    id={`file-${doc.id}`}
    className="hidden"
    accept=".pdf,.jpg,.jpeg,.png"
    onChange={(e) => handleFileSelect(e, doc.id)}
  />

  <button
    onClick={() =>
      document.getElementById(`file-${doc.id}`)?.click()
    }
    disabled={isUploading}
    className="w-full flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
  >
    {isUploading ? (
    <div className="w-full">
        <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
            <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
            />
        </div>

        <p className="text-xs text-center text-white">
            Uploading... {uploadProgress}%
        </p>
    </div>
) : ( <span>📤 Upload File</span>
    )}
  </button>

  {uploadedFiles[doc.id] && (
    <p className="text-xs text-emerald-600 mt-2 font-medium">
      Selected: {uploadedFiles[doc.id].name}
    </p>
  )}
</>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => triggerSimulatedAction('Preview', doc.name)}
                  className="flex items-center justify-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold py-1.5 px-2 rounded-md transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => triggerSimulatedAction('Download', doc.name)}
                  className="flex items-center justify-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold py-1.5 px-2 rounded-md transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download</span>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleUploadDocument(doc.id)}
                  className="flex items-center justify-center space-x-1 bg-slate-50 hover:bg-amber-50 hover:text-amber-700 text-slate-500 text-[11px] font-bold py-1.5 px-2 rounded-md border border-slate-200 hover:border-amber-200 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" />
                  </svg>
                  <span>Replace</span>
                </button>
                <button
                  onClick={() => handleDeleteDocument(doc.id)}
                  className="flex items-center justify-center space-x-1 bg-slate-50 hover:bg-rose-50 hover:text-rose-700 text-slate-500 text-[11px] font-bold py-1.5 px-2 rounded-md border border-slate-200 hover:border-rose-200 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Cloud Document Repository</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Manage and audit institutional credentials required for platform dispatch.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center justify-between col-span-1 lg:col-span-1">
          <div>
            <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">Upload Completeness</h4>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-slate-800">
                {documents.filter(d => d.status !== 'Missing').length}
              </span>
              <span className="text-sm font-bold text-slate-400">/ {documents.length} Files</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-black text-slate-700 shadow-inner">
            DCS
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 col-span-1 lg:col-span-2">
          <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">Document Summary Status</h4>
          {missingRequiredCount === 0 ? (
            <div className="flex items-center space-x-2 text-emerald-800 bg-emerald-50 border border-emerald-100 p-3 rounded-lg text-sm font-bold">
              <span className="text-base">🟢</span>
              <span>All required documents uploaded successfully. Ready for validation submission.</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-rose-800 bg-rose-50 border border-rose-100 p-3 rounded-lg text-sm font-bold animate-pulse">
              <span className="text-base">🔴</span>
              <span>{missingRequiredCount} Required Documents Missing from Active Context.</span>
            </div>
          )}
        </div>
      </div>

      {missingDocuments.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-xl p-5 mb-8 animate-shake">
          <div className="flex items-start space-x-3">
            <div className="text-rose-600 mt-0.5 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-rose-850">Outstanding Documents Required</h3>
              <p className="text-xs font-medium text-rose-700 mt-0.5 mb-3">
                Please upload the missing documents to continue your application.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {missingDocuments.map(renderDocumentCard)}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <svg className="w-5 h-5 text-slate-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 012-2h4a2 2 0 012 2v2H5v-2zM13 3v6a1 1 0 001 1h6L13 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 21h8a2 2 0 002-2v-6H13v6z" />
          </svg>
          Active Uploaded & Verified Repositories
        </h2>
        {availableDocuments.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-xs font-semibold text-slate-400">
            No dynamic files are completely synchronized inside this cluster.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableDocuments.map(renderDocumentCard)}
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 pt-6 flex flex-col items-end">
        {submitError && (
          <div className="text-rose-600 text-xs font-bold mb-3 animate-fade-in bg-rose-50 border border-rose-100 px-4 py-2 rounded-lg">
            ⚠️ {submitError}
          </div>
        )}
        {successSubmission && (
          <div className="text-emerald-700 text-xs font-bold mb-3 animate-scale bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg">
            🎉 Application state dispatched successfully to administrative endpoints!
          </div>
        )}

        <button
          onClick={handleGlobalSubmit}
          disabled={missingRequiredCount > 0}
          className={`px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-sm ${
            missingRequiredCount > 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md focus:ring-4 focus:ring-emerald-200'
          }`}
        >
          Submit Complete Application File
        </button>
      </div>
    </div>
  );
};

export default Documents;