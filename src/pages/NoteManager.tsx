import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NoteContext';
import type { NotePriority } from '../types';
import { AlertCircle, Clock, CheckCircle, Trash2, StickyNote, ArrowLeft, Plus } from 'lucide-react';

export const NoteManager = () => {
  const navigate = useNavigate();
  const { addNote, deleteNote, updateNotePriority, getNotesByPriority } = useNotes();
  
  const [noteContent, setNoteContent] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<NotePriority>('normal');

  const handleAddNote = () => {
    if (noteContent.trim()) {
      addNote(noteContent, selectedPriority);
      setNoteContent('');
      setSelectedPriority('normal');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const priorityConfig = {
    important: {
      label: 'Important',
      color: 'bg-red-50',
      borderColor: 'border-red-300',
      badgeColor: 'bg-red-500',
      icon: AlertCircle,
      iconColor: 'text-red-500',
    },
    normal: {
      label: 'Normal',
      color: 'bg-blue-50',
      borderColor: 'border-blue-300',
      badgeColor: 'bg-blue-500',
      icon: CheckCircle,
      iconColor: 'text-blue-500',
    },
    delayed: {
      label: 'Delayed',
      color: 'bg-yellow-50',
      borderColor: 'border-yellow-300',
      badgeColor: 'bg-yellow-500',
      icon: Clock,
      iconColor: 'text-yellow-500',
    },
  };

  const NoteSection = ({ priority }: { priority: NotePriority }) => {
    const notes = getNotesByPriority(priority);
    const config = priorityConfig[priority];
    const IconComponent = config.icon;

    return (
      <div className={`${config.color} rounded-lg p-4 border-2 ${config.borderColor}`}>
        <div className="flex items-center gap-2 mb-4">
          <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
          <h3 className="text-lg font-bold">{config.label}</h3>
          <span className={`${config.badgeColor} text-white text-xs px-2 py-1 rounded-full ml-auto`}>
            {notes.length}
          </span>
        </div>

        <div className="space-y-2">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No notes yet</p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start gap-2">
                  <p className="flex-1 text-gray-800 break-words">{note.content}</p>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString()}
                  </span>
                  
                  <select
                    value={note.priority}
                    onChange={(e) => updateNotePriority(note.id, e.target.value as NotePriority)}
                    className="text-xs px-2 py-1 border border-gray-300 rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="important">Important</option>
                    <option value="normal">Normal</option>
                    <option value="delayed">Delayed</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <StickyNote className="w-7 h-7 text-orange-500" />
          <h1 className="text-2xl font-bold">Note Manager</h1>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Add Note Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Note</h2>
          
          <div className="flex flex-col md:flex-row gap-3">
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your note here..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            
            <div className="flex flex-col gap-3">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value as NotePriority)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="important">⚠️ Important</option>
                <option value="normal">✓ Normal</option>
                <option value="delayed">⏰ Delayed</option>
              </select>
              
              <button
                onClick={handleAddNote}
                disabled={!noteContent.trim()}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Note
              </button>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NoteSection priority="important" />
          <NoteSection priority="normal" />
          <NoteSection priority="delayed" />
        </div>
      </div>
    </div>
  );
};
