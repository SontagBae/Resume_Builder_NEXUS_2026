# NEXUS-RESUME (v2026) - User Guide

This guide explains how to start and operate the Nexus-Resume application in your local environment.

## 1. Starting the Application

To run the app, execute the following command in your terminal:

```bash
npm run dev
```

The application will be available at: **[http://localhost:3000](http://localhost:3000)**

---

## 2. Navigating the App

### Landing Page
When you open the app, you will see two main options:
- **Create New Resume**: Starts a fresh resume from a blank canvas.
- **Import & Optimize**: Allows you to upload an existing PDF to get started quickly.

---

## 3. The Editor Canvas

### Adding Sections
Use the **Blocks** sidebar on the left to add new sections:
- **Experience**: Work history items.
- **Education**: School and degree information.
- **Skills**: Skill tags and lists.

### Editing Content
Click directly on any text in the center canvas to edit it. Changes are **automatically saved** to your browser's local storage instantly.

### Reordering Sections
Hover over any section and use the **drag handle** (6-dot icon) on the left to move sections up or down.

---

## 4. AI Intelligence (Import & Optimize)

### Importing an Existing Resume
1. In the editor sidebar, find the **Import PDF Resume** zone.
2. Drag and drop your existing PDF resume or click to upload.
3. The AI will parse your PDF and automatically populate the editor sections.

### AI Assistant Panel
The right sidebar provides real-time feedback:
- **ATS Score**: Shows how well your resume is optimized for screening systems.
- **Analyze Resume**: Click this button to refresh the AI analysis and get a list of specific improvements.

---

## 5. Exporting Your Resume

When your resume is ready, use the **Export** section in the sidebar:
- **Export PDF**: Generates a professional PDF file of your current resume.
- **Export Docx**: Generates a Microsoft Word document for further manual editing if needed.

---

## Troubleshooting

- **Port in Use**: If port 3000 is occupied, the app will automatically try 3001. Check the terminal output for the exact URL.
- **Hydration Errors**: Some browser extensions (like Jetski or dark mode toggles) can cause console warnings. These do not affect the app's functionality.
