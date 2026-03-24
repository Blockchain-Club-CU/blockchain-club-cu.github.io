export interface FormField {
  name: string; // The label shown to the user (e.g., "Full Name", "Roll No")
  type: string; // "text", "email", "number", "UID" etc.
  required: boolean;
}

export interface EventItem {
  id: number;
  title: string;
  imageURL: string;
  imageDarkURL: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: string; // keeping as string for backwards compatibility, could be 'Upcoming' | 'Past'
  link: string; // existing link field
  
  // NEW FIELDS for Registration Popup
  googleSheetId?: string; // The ID of the Google Sheet from its URL
  formFields?: FormField[]; // Used by frontend to dynamically build the form
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
