import { STORAGE_KEYS } from "../utils/constants";

function readList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function writeList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

export const storageService = {
  saveSubmission(submission) {
    const list = readList(STORAGE_KEYS.SUBMISSIONS);
    list.unshift(submission);
    writeList(STORAGE_KEYS.SUBMISSIONS, list);
  },

  getSubmissions() {
    return readList(STORAGE_KEYS.SUBMISSIONS);
  },

  getSubmissionById(id) {
    return readList(STORAGE_KEYS.SUBMISSIONS).find((s) => s.referenceId === id);
  },

  // offline queue — submissions made while offline, synced when back online
  queueSubmission(submission) {
    const queue = readList(STORAGE_KEYS.PENDING_QUEUE);
    queue.push(submission);
    writeList(STORAGE_KEYS.PENDING_QUEUE, queue);
  },

  getQueue() {
    return readList(STORAGE_KEYS.PENDING_QUEUE);
  },

  clearQueueItem(referenceId) {
    const queue = readList(STORAGE_KEYS.PENDING_QUEUE).filter(
      (s) => s.referenceId !== referenceId
    );
    writeList(STORAGE_KEYS.PENDING_QUEUE, queue);
  },

  // draft — autosaves in-progress form so slow/flaky connections never lose work
  saveDraft(draft) {
    localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(draft));
  },

  getDraft() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFT)) || null;
    } catch {
      return null;
    }
  },

  clearDraft() {
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
  },
};