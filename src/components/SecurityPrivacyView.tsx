import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Server,
  FileCheck,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Database,
  KeyRound,
  FileText,
  HelpCircle,
  Smartphone,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type TabType = 'privacy' | 'security' | 'terms' | 'controls';

interface SecurityPrivacyViewProps {
  initialTab?: TabType;
  onNavigateToGenerator?: () => void;
}

export const SecurityPrivacyView: React.FC<SecurityPrivacyViewProps> = ({
  initialTab = 'privacy',
  onNavigateToGenerator,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const { user, exportUserData, deleteAllUserData, clearLocalDataOnly, isFirebaseConfigured } = useAuth();

  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setActionSuccessMsg(null);
    try {
      await exportUserData();
      setActionSuccessMsg('Your data archive has been compiled and downloaded successfully.');
    } catch (err: any) {
      alert('Failed to export data: ' + (err?.message || 'Unknown error'));
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear your local offline browser storage? (Your Firebase cloud papers remain intact if you are logged in)')) {
      clearLocalDataOnly();
      setActionSuccessMsg('Local browser cache cleared.');
    }
  };

  const handleDeleteAll = async () => {
    setIsDeleting(true);
    setActionSuccessMsg(null);
    try {
      await deleteAllUserData();
      setShowDeleteConfirm(false);
      setActionSuccessMsg('Your account, cloud database records, and all stored papers have been permanently erased.');
    } catch (err: any) {
      alert('Failed to erase user data: ' + (err?.message || 'Unknown error'));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>DPDP Act 2023 & GDPR Aligned • Zero Photo Retention</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Trust, Security & Privacy Center
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Learn how PaperGenius AI safeguards educator question papers, processes textbook page photographs ephemerally, and enforces strict data isolation.
        </p>
      </div>

      {/* Trust Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <EyeOff className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Zero Photo Retention</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Photos are processed in RAM solely during question extraction and never stored on disk.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">End-to-End Encryption</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              All communications TLS 1.3 encrypted; Firebase Firestore AES-256 encrypted at rest.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Isolated User Vaults</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Firestore security rules enforce that only you can read or edit your examination papers.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">100% Educator Ownership</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              You own all intellectual property of generated papers, solution keys, and test rubrics.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'privacy'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'security'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Security Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'terms'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Terms & Disclaimer</span>
        </button>

        <button
          onClick={() => setActiveTab('controls')}
          className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'controls'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Your Data Controls</span>
        </button>
      </div>

      {actionSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* TAB 1: PRIVACY POLICY */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Privacy Policy</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Last Updated: October 30, 2026 • Compliant with DPDP Act 2023 & GDPR
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px] font-bold">
              v2.4
            </span>
          </div>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              1. Introduction & Overview
            </h3>
            <p>
              PaperGenius AI (&quot;we&quot;, &quot;our&quot;, or &quot;the Service&quot;) is an educational assessment formulation platform engineered for teachers, school educators, coaching institutes, and academic tutors. This policy governs how information is collected, processed, encrypted, and protected when you access our web application or mobile services.
            </p>
            <p>
              We treat user privacy with paramount seriousness and adhere to the principles of the <strong>Digital Personal Data Protection Act, 2023 (India DPDP Act)</strong>, the <strong>General Data Protection Regulation (GDPR)</strong>, and student data protection standards.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              2. Ephemeral Processing of Textbook Page Photographs
            </h3>
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 space-y-2">
              <p className="font-bold">
                Strict Zero Permanent Image Storage Guarantee:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Uploaded textbook page photos are held solely in temporary server volatile memory (RAM) while performing optical character recognition (OCR) and question generation.</li>
                <li>Photos are immediately discarded once question synthesis is completed.</li>
                <li>We do NOT store textbook photos in permanent cloud buckets or databases.</li>
                <li>Your uploaded textbook page images are NEVER used to train public foundation models.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              3. Information We Collect
            </h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Educator Account Credentials:</strong> When you create an educator account, we store your email address, display name, and unique authentication identifier managed securely via Firebase Authentication.
              </li>
              <li>
                <strong>Examination Blueprint Metadata:</strong> Examination title, board selection (CBSE, PSEB, ICSE), grade/class level, subject, total marks, time limit, and optional school name.
              </li>
              <li>
                <strong>Generated Question Papers &amp; Answer Keys:</strong> The structured test sections, questions, and solutions generated for you, saved exclusively under your authenticated user ID.
              </li>
              <li>
                <strong>Technical Diagnostics:</strong> Standard HTTP request logs (IP address, user-agent, timestamp) maintained temporarily for DDoS defense and server stability.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              4. No Student PII (Personally Identifiable Information)
            </h3>
            <p>
              PaperGenius AI is strictly a teacher/authoring productivity tool. We do not require, collect, solicit, or store names, grades, roll numbers, or personal identifying information of minor students.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              5. Cloud Storage &amp; Sub-Processors
            </h3>
            <p>
              We utilize enterprise-grade sub-processors that meet ISO/IEC 27001, SOC 2 Type II, and GDPR compliance certifications:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-900 block">Google Cloud &amp; Firebase</span>
                <span className="text-slate-500">Provides secure database persistence (Firestore in asia-southeast1), Firebase Auth, and AES-256 encryption at rest.</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-900 block">Google Gemini Generative AI</span>
                <span className="text-slate-500">Multimodal model API used server-side to extract textbook syllabus topics and formulate standard questions.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              6. Your Legal Rights (DPDP Act 2023 &amp; GDPR)
            </h3>
            <p>
              Under applicable data protection legislation, you hold the following rights:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Right to Access:</strong> You can view all saved papers and account details directly in the &quot;My Papers&quot; dashboard.</li>
              <li><strong>Right to Data Portability:</strong> You can export your full data archive as a structured JSON file at any time from the &quot;Your Data Controls&quot; tab.</li>
              <li><strong>Right to Correction:</strong> You can edit questions, rubrics, and school titles directly in the Paper Preview editor.</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You can permanently delete any paper or your entire account with all associated database records.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              7. Cookies &amp; Local Storage
            </h3>
            <p>
              We do NOT use tracking cookies or third-party behavioral advertising trackers. Local Storage is used exclusively to store authentication tokens and offline cached drafts of your question papers so that you do not lose work during intermittent connectivity.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              8. Grievance Officer &amp; Contact
            </h3>
            <p>
              In accordance with the Information Technology Act 2000 and the DPDP Act 2023, for any privacy inquiries, data deletion requests, or security reports, please contact our Data Protection Team at: <code className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-mono">privacy@papergenius.ai</code>.
            </p>
          </section>
        </div>
      )}

      {/* TAB 2: SECURITY ARCHITECTURE */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Security Architecture &amp; Controls</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Defense-in-depth security engineered across browser, server, and cloud database
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Hardened
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-bold">
                <Server className="w-4 h-4" />
                <span>1. Server-Side API Shielding</span>
              </div>
              <p className="text-xs text-slate-600">
                Gemini AI API keys and Cloud credentials are never exposed in browser JavaScript bundles or mobile APK files. All requests are routed through verified server-side proxy routes with strict payload validation.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-bold">
                <Lock className="w-4 h-4" />
                <span>2. Transport &amp; Storage Encryption</span>
              </div>
              <p className="text-xs text-slate-600">
                Data in transit is strictly encrypted using TLS 1.3 / HTTPS. Cloud databases (Firestore) employ Google Cloud AES-256 encryption at rest with automated key rotation.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-bold">
                <KeyRound className="w-4 h-4" />
                <span>3. Firestore Fortress Rules</span>
              </div>
              <p className="text-xs text-slate-600">
                Our database security rules enforce a strict default-deny policy. All document paths under <code className="font-mono bg-white px-1 border border-slate-200 rounded">/users/{'{userId}'}</code> require matching authenticated JWT tokens and schema validation.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-bold">
                <Smartphone className="w-4 h-4" />
                <span>4. Android App Audit (Zero Over-Permissioning)</span>
              </div>
              <p className="text-xs text-slate-600">
                The native Android application has been audited to eliminate unnecessary storage or camera permissions, utilizing the scoped Android System Photo Picker (SAF) and secure restricted FileProvider paths.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
            <h4 className="text-sm font-bold flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> Active Firestore Security Specification
            </h4>
            <pre className="p-3 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed border border-slate-800">
{`// Production Deployed Rules Summary:
match /{document=**} { allow read, write: if false; } // Default Deny
match /users/{userId} {
  allow get, update, delete: if request.auth != null && request.auth.uid == userId;
  match /papers/{paperId} {
    allow read, write: if request.auth != null && request.auth.uid == userId
      && request.resource.data.userId == userId;
  }
}`}
            </pre>
          </div>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Responsible Vulnerability Disclosure
            </h3>
            <p className="text-xs text-slate-600">
              If you discover a security vulnerability, we welcome coordinated disclosure. Please email our security engineers at <code className="text-indigo-600 font-mono">security@papergenius.ai</code>. We investigate every report and deploy remedies within 24 hours.
            </p>
          </section>
        </div>
      )}

      {/* TAB 3: TERMS OF SERVICE & DISCLAIMER */}
      {activeTab === 'terms' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">Terms of Service &amp; Board Disclaimer</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Guidelines for using PaperGenius AI in educational institutions and tutoring
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              1. Permitted Educational Use
            </h3>
            <p>
              PaperGenius AI is intended for school teachers, academic departments, tuition teachers, and educational content creators. You are permitted to generate, customize, download, print, and distribute question papers for diagnostic tests, homework, mock drills, classroom unit tests, and terminal examinations.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              2. Intellectual Property &amp; Ownership
            </h3>
            <p>
              <strong>You retain 100% full ownership and copyright</strong> of all customized examination papers, school headers, rubrics, and answer keys generated via PaperGenius AI. We claim zero proprietary rights or licensing royalties over your generated examination papers.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              3. Educational Board Disclaimer (CBSE, PSEB, ICSE)
            </h3>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2 text-xs">
              <p className="font-bold flex items-center gap-1.5 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Notice Concerning Central and State Educational Boards:</span>
              </p>
              <p>
                PaperGenius AI is an independent educational tool. We are not affiliated with, endorsed by, or an official representative of the <strong>Central Board of Secondary Education (CBSE)</strong>, <strong>Punjab School Education Board (PSEB)</strong>, or the <strong>Council for the Indian School Certificate Examinations (ICSE/CISCE)</strong>.
              </p>
              <p>
                The terms CBSE, PSEB, and ICSE are used purely for descriptive purposes to indicate curriculum framework alignment. Generated papers are practice assessments, not official leaked or guaranteed board examination papers.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              4. Educator Review &amp; Academic Verification
            </h3>
            <p>
              While PaperGenius AI utilizes advanced artificial intelligence models trained on curricular pedagogy, the educator maintains final editorial responsibility to review marks allocation, question wording, and diagram accuracy prior to student administration.
            </p>
          </section>
        </div>
      )}

      {/* TAB 4: YOUR DATA CONTROLS (INTERACTIVE) */}
      {activeTab === 'controls' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">Your Data Sovereignty &amp; Privacy Controls</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Exercise your legal rights under DPDP Act 2023 &amp; GDPR: export or delete your data at any time
            </p>
          </div>

          <div className="space-y-5">
            {/* Action 1: Export Data */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Right to Data Portability: Export All My Data</span>
                </h4>
                <p className="text-xs text-slate-600 max-w-xl">
                  Download a machine-readable JSON archive containing your educator profile, saved question papers, question items, marks allocation, and answer keys.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExport}
                disabled={isExporting}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-xs disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Compiling JSON...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON Archive</span>
                  </>
                )}
              </button>
            </div>

            {/* Action 2: Clear Offline Browser Cache */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-slate-600" />
                  <span>Clear Offline Browser Cache</span>
                </h4>
                <p className="text-xs text-slate-600 max-w-xl">
                  Removes cached offline paper drafts stored in this browser's Local Storage. If you are signed in, your Firebase cloud papers will remain safe.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearCache}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors shrink-0"
              >
                Clear Local Cache
              </button>
            </div>

            {/* Action 3: Permanently Erase All Data */}
            <div className="p-5 rounded-2xl border border-red-200 bg-red-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-red-950 text-sm flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-red-600" />
                  <span>Right to Erasure: Permanently Delete Account &amp; Data</span>
                </h4>
                <p className="text-xs text-red-700 max-w-xl">
                  Irreversibly deletes your account profile, all cloud-synced question papers from Firestore, and clears all offline storage. This action cannot be undone.
                </p>
              </div>

              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-red-700 bg-white border border-red-300 hover:bg-red-50 transition-colors shrink-0"
                >
                  Request Permanent Deletion
                </button>
              ) : (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleDeleteAll}
                    disabled={isDeleting}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shrink-0 flex items-center justify-center gap-1.5"
                  >
                    {isDeleting ? 'Deleting...' : 'Confirm Erase Everything'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
