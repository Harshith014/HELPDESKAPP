// src/components/TicketDetails.jsx
import { PaperClipIcon, UserIcon } from '@heroicons/react/24/solid';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { addNote, updateTicketStatus } from '../services/api';

export default function TicketDetails({ ticket, onUpdate }) {
  const { user } = useContext(AuthContext);
  const [noteContent, setNoteContent] = useState('');
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState(ticket.status);

  const handleAddNote = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', noteContent);
    files.forEach((file) => formData.append('attachments', file));

    await addNote(ticket._id, formData);
    setNoteContent('');
    setFiles([]);
    onUpdate();
  };

  const handleStatusChange = async () => {
    await updateTicketStatus(ticket._id, status);
    onUpdate();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">{ticket.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <p className="text-sm"><span className="font-medium">Status:</span> {ticket.status}</p>
          <p className="text-sm"><span className="font-medium">Customer:</span> {ticket.customer.name}</p>
          <p className="text-sm"><span className="font-medium">Last Updated:</span> {new Date(ticket.lastUpdated).toLocaleString()}</p>
        </div>
      </div>

      {(user.role === 'agent' || user.role === 'admin') && (
        <div className="bg-card p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
            <button
              onClick={handleStatusChange}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Update Status
            </button>
          </div>
        </div>
      )}

      <div className="bg-card p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold mb-4">Notes</h3>
        <div className="space-y-4">
          {ticket.notes.map((note) => (
            <div key={note._id} className="border-l-4 border-primary pl-4 py-2">
              <div className="flex items-start gap-2">
                <UserIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm">{note.content}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Added by {note.addedBy.name} on {new Date(note.createdAt).toLocaleString()}
                  </p>
                  {note.attachments.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-semibold">Attachments:</p>
                      {note.attachments.map((attachment) => (
                        <a
                          key={attachment._id}
                          href={attachment.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-xs flex items-center gap-1 mt-1"
                        >
                          <PaperClipIcon className="w-4 h-4" /> {attachment.fileName}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddNote} className="mt-6">
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            placeholder="Add a note..."
            rows="3"
          />
          <div className="flex items-center gap-3 mt-2">
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-blue-700"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}