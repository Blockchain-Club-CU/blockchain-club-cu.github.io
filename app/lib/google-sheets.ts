import { google } from 'googleapis';

export async function appendToSheet(
  sheetId: string,
  range: string, // e.g., 'Sheet1!A:A'
  values: any[][] // Array of rows, where each row is an array of column values
) {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets'];
    
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    if (!clientEmail || !privateKey) {
      throw new Error("Missing Google Service Account credentials.");
    }

    const client = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: target,
    });

    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: range,
      valueInputOption: 'USER_ENTERED', // Interprets strings like "123" as numbers if appropriate
      requestBody: {
        values: values,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error in appendToSheet:', error);
    throw error;
  }
}
