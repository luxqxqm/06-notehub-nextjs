import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "@/lib/api";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess() {
      client.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <>
      <ul className={css.list}>
        {notes.map((note) => {
          return (
            <Link className={css.link} key={note.id} href={`notes/${note.id}`}>
              <li className={css.listItem}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                  <span className={css.tag}>{note.tag}</span>
                  <button
                    onClick={() => mutation.mutate(note.id)}
                    className={css.button}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </Link>
          );
        })}
        {/* Набір елементів списку нотаток */}
      </ul>
    </>
  );
}
