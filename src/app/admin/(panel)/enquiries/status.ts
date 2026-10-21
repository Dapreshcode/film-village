export const STATUSES = ["NEW", "REVIEWING", "CONTACTED", "CLOSED"] as const;
export type EnquiryStatus = (typeof STATUSES)[number];

export const STATUS_LABEL: Record<EnquiryStatus, string> = {
  NEW: "New",
  REVIEWING: "Reviewing",
  CONTACTED: "Contacted",
  CLOSED: "Closed",
};