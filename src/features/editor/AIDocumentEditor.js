import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { generateStrategyDoc } from '../../services/aiService';
import { Download, Sparkles, FileText, Share2 } from 'lucide-react';
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const AIDocumentEditor = () => {
    const [content, setContent] = useState('<h2>New Strategy Document</h2><p>Start typing or use AI to generate a report...</p>');
    const [loadingAI, setLoadingAI] = useState(false);

    const handleAIGenerate = async () => {
        setLoadingAI(true);
        const data = { team: "16379", latestMatch: { score: 210, auto: 60 } }; // Reference mock
        const aiText = await generateStrategyDoc(data);
        setContent(prev => prev + `<br><h3>AI Generated Insights:</h3><p>${aiText}</p>`);
        setLoadingAI(false);
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        const plainText = content.replace(/<[^>]*>/g, '');
        doc.text(plainText, 10, 10);
        doc.save("robohub-report.pdf");
    };

    const exportWord = () => {
        const plainText = content.replace(/<[^>]*>/g, '');
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [new TextRun(plainText)],
                    }),
                ],
            }],
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, "robohub-strategy.docx");
        });
    };

    return (
        <div className="flex-1 p-8 bg-slate-50 flex flex-col overflow-hidden">
            <div className="max-w-4xl mx-auto w-full flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Document Hub</h1>
                        <p className="text-slate-500 text-sm">Collaborative AI-powered editor</p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={handleAIGenerate}
                            disabled={loadingAI}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 disabled:opacity-50"
                        >
                            <Sparkles size={18} /> {loadingAI ? 'Generating...' : 'Ask AI Writer'}
                        </button>
                        <button onClick={exportPDF} className="bg-white border border-slate-200 p-2 rounded-lg hover:bg-slate-50 shadow-sm" title="Export PDF"><Download size={20}/></button>
                        <button onClick={exportWord} className="bg-white border border-slate-200 p-2 rounded-lg hover:bg-slate-50 shadow-sm" title="Export DOCX"><FileText size={20}/></button>
                        <button className="bg-white border border-slate-200 p-2 rounded-lg hover:bg-slate-50 shadow-sm" title="Share with Team"><Share2 size={20}/></button>
                    </div>
                </div>

                <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <ReactQuill 
                        theme="snow" 
                        value={content} 
                        onChange={setContent}
                        className="flex-1 h-full overflow-y-auto"
                        modules={{
                            toolbar: [
                                [{ 'header': [1, 2, false] }],
                                ['bold', 'italic', 'underline','strike', 'blockquote'],
                                [{'list': 'ordered'}, {'list': 'bullet'}],
                                ['link', 'image'],
                                ['clean']
                            ],
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AIDocumentEditor;
