"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_PREFIX = "shadow-prd-edit:";

function getStorageKey(contentKey: string) {
  return `${STORAGE_PREFIX}${contentKey}`;
}

export function useEditable(contentKey: string, original: string) {
  const [value, setValue] = useState(original);
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(getStorageKey(contentKey));
      if (saved !== null && saved !== original) {
        setValue(saved);
        setIsModified(true);
      }
    } catch {
      // localStorage unavailable
    }
  }, [contentKey, original]);

  const save = useCallback(
    (newValue: string) => {
      setValue(newValue);
      const modified = newValue !== original;
      setIsModified(modified);
      try {
        if (modified) {
          localStorage.setItem(getStorageKey(contentKey), newValue);
        } else {
          localStorage.removeItem(getStorageKey(contentKey));
        }
      } catch {
        // localStorage unavailable
      }
      setIsEditing(false);
    },
    [contentKey, original],
  );

  const reset = useCallback(() => {
    setValue(original);
    setIsModified(false);
    setIsEditing(false);
    try {
      localStorage.removeItem(getStorageKey(contentKey));
    } catch {
      // localStorage unavailable
    }
  }, [contentKey, original]);

  const startEditing = useCallback(() => setIsEditing(true), []);
  const cancelEditing = useCallback(() => setIsEditing(false), []);

  return { value, isEditing, isModified, save, reset, startEditing, cancelEditing };
}

export function useEditableArray(contentKey: string, original: string[]) {
  const joined = original.join("\n---PARAGRAPH---\n");
  const { value, isEditing, isModified, save, reset, startEditing, cancelEditing } =
    useEditable(contentKey, joined);

  const paragraphs = value.split("\n---PARAGRAPH---\n");

  const saveParagraphs = useCallback(
    (newParagraphs: string[]) => {
      save(newParagraphs.join("\n---PARAGRAPH---\n"));
    },
    [save],
  );

  return {
    paragraphs,
    isEditing,
    isModified,
    save: saveParagraphs,
    saveRaw: save,
    reset,
    startEditing,
    cancelEditing,
  };
}

export function getAllModifiedKeys(): string[] {
  const keys: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) {
        keys.push(key.slice(STORAGE_PREFIX.length));
      }
    }
  } catch {
    // localStorage unavailable
  }
  return keys;
}

export function resetAllEdits() {
  try {
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) {
        toRemove.push(key);
      }
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // localStorage unavailable
  }
}
