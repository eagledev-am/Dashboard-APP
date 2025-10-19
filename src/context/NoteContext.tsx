import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Note, NotePriority } from '../types';

interface NoteContextType {
  notes: Note[];
  addNote: (content: string, priority: NotePriority) => void;
  deleteNote: (id: string) => void;
  updateNotePriority: (id: string, priority: NotePriority) => void;
  getNotesByPriority: (priority: NotePriority) => Note[];
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (content: string, priority: NotePriority) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      content,
      priority,
      createdAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const updateNotePriority = (id: string, priority: NotePriority) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, priority } : note
      )
    );
  };

  const getNotesByPriority = (priority: NotePriority) => {
    return notes.filter((note) => note.priority === priority);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        updateNotePriority,
        getNotesByPriority,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};
