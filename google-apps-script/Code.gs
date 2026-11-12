/**
 * =========================================================================
 * UPGRADE MATH QUIZ - GOOGLE APPS SCRIPT BACKEND
 * Created for: Avinash Sir
 * Connected to Sheet: Upgrade_Digital_Quiz
 * =========================================================================
 * 
 * FEATURES:
 * - 100 Columns for Days 1 to 100 to track 'Attempted' vs 'Not Attempted'
 * - Single Attempt Enforcement: each quiz can only be attempted once
 * - Admin Unlock Override dropdown per student (None, All Past Days, or Day N)
 * - Real-time student verification, quiz submission, and leaderboard ranking
 * =========================================================================
 */

const SHEET_STUDENTS = 'Students_Access';
const SHEET_SUBMISSIONS = 'Quiz_Submissions';

/**
 * Setup function to initialize sheets and 100-day columns.
 * Run this function once from Extensions > Apps Script editor!
 */
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Setup Students_Access Sheet
  let studentSheet = ss.getSheetByName(SHEET_STUDENTS);
  if (!studentSheet) {
    studentSheet = ss.insertSheet(SHEET_STUDENTS);
  }
  
  // Base columns
  const baseHeaders = [
    'Mobile_Number',
    'Student_Name',
    'Level',
    'Status',                // ACTIVE, PENDING, BLOCKED
    'Admin_Unlock_Override', // None, All Past Days, or comma-separated days e.g. "1,2,5"
    'Total_Score',
    'Current_Streak',
    'Quizzes_Completed',
    'Registration_Date',
    'Last_Active_Date'
  ];
  
  // Generate 100 day columns: Day_1 to Day_100
  const dayHeaders = [];
  for (let d = 1; d <= 100; d++) {
    dayHeaders.push('Day_' + d);
  }
  
  const allHeaders = baseHeaders.concat(dayHeaders);
  
  // Set headers if empty or update row 1
  studentSheet.getRange(1, 1, 1, allHeaders.length).setValues([allHeaders]);
  
  // Style base headers (dark blue)
  studentSheet.getRange(1, 1, 1, baseHeaders.length)
    .setBackground('#0f172a')
    .setFontColor('#ffffff')
    .setFontWeight('bold');
    
  // Style day columns (indigo/cyan)
  studentSheet.getRange(1, baseHeaders.length + 1, 1, dayHeaders.length)
    .setBackground('#1e1b4b')
    .setFontColor('#38bdf8')
    .setFontWeight('bold');
    
  studentSheet.setFrozenRows(1);
  studentSheet.setFrozenColumns(2); // Freeze Mobile & Name for easy horizontal scrolling!
  
  // Add sample students if table is empty
  if (studentSheet.getLastRow() === 1) {
    const sampleRow1 = [
      '9876543210',
      'Sara (Demo)',
      'Junior (Grade 1-4)',
      'ACTIVE',
      'None',
      420,
      1,
      1,
      new Date().toISOString(),
      new Date().toISOString()
    ];
    // All 100 days start as Not Attempted
    for (let d = 1; d <= 100; d++) sampleRow1.push('Not Attempted');
    studentSheet.appendRow(sampleRow1);
    
    const sampleRow2 = [
      '9876543211',
      'Aarav (Demo)',
      'Senior (Grade 4-10)',
      'ACTIVE',
      'All Past Days',
      0,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    ];
    for (let d = 1; d <= 100; d++) sampleRow2.push('Not Attempted');
    studentSheet.appendRow(sampleRow2);
  }
  
  // 2. Setup Quiz_Submissions Sheet
  let subSheet = ss.getSheetByName(SHEET_SUBMISSIONS);
  if (!subSheet) {
    subSheet = ss.insertSheet(SHEET_SUBMISSIONS);
  }
  const subHeaders = [
    'Timestamp',
    'Mobile_Number',
    'Student_Name',
    'Level',
    'Day_Number',
    'Score',
    'Accuracy',
    'Time_Taken_Sec',
    'Questions_Correct',
    'Timer_Mode'
  ];
  if (subSheet.getLastRow() === 0) {
    subSheet.appendRow(subHeaders);
    subSheet.getRange(1, 1, 1, subHeaders.length)
      .setBackground('#1e293b')
      .setFontColor('#38bdf8')
      .setFontWeight('bold');
    subSheet.setFrozenRows(1);
  }
  
  Logger.log('Upgrade Math Quiz 100-Day Sheet structure initialized successfully!');
}

/**
 * Handles HTTP GET requests
 */
function doGet(e) {
  const params = e.parameter || {};
  const action = params.action;
  
  try {
    if (action === 'verify') {
      return handleVerify(params.phone);
    } else if (action === 'leaderboard') {
      return handleLeaderboard(params.level);
    } else if (action === 'student_history') {
      return handleStudentHistory(params.phone);
    } else {
      return jsonResponse({
        status: 'success',
        message: 'Upgrade Math Quiz 100-Day API is online!',
        timestamp: new Date().toISOString()
      });
    }
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.toString() });
  }
}

/**
 * Handles HTTP POST requests
 */
function doPost(e) {
  try {
    let payload = {};
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else {
      payload = e.parameter || {};
    }
    
    const action = payload.action;
    if (action === 'register') {
      return handleRegister(payload);
    } else if (action === 'submit_quiz') {
      return handleSubmitQuiz(payload);
    } else {
      return jsonResponse({ status: 'error', message: 'Unknown action: ' + action });
    }
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.toString() });
  }
}

// -------------------------------------------------------------
// ACTION HANDLERS
// -------------------------------------------------------------

function handleVerify(phone) {
  if (!phone) {
    return jsonResponse({ status: 'error', message: 'Phone number is required.' });
  }
  
  const cleanPhone = String(phone).trim().replace(/\D/g, '');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_STUDENTS);
  if (!sheet) {
    setupSheets();
    sheet = ss.getSheetByName(SHEET_STUDENTS);
  }
  
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const rowPhone = String(data[i][0]).trim().replace(/\D/g, '');
    if (rowPhone === cleanPhone) {
      // Collect attempted days from columns 11 to 110 (Day_1 to Day_100)
      const attemptedDays = {};
      for (let d = 1; d <= 100; d++) {
        const colIdx = 9 + d; // Day 1 is col 10 (0-indexed)
        const cellVal = String(data[i][colIdx] || '').trim();
        if (cellVal.toLowerCase().indexOf('attempted') !== -1) {
          attemptedDays[d] = cellVal;
        }
      }
      
      return jsonResponse({
        status: 'success',
        found: true,
        student: {
          phone: cleanPhone,
          name: data[i][1],
          level: data[i][2],
          accessStatus: data[i][3] || 'ACTIVE',
          adminUnlockOverride: data[i][4] || 'None', // None, All Past Days, or custom day string
          totalScore: Number(data[i][5]) || 0,
          currentStreak: Number(data[i][6]) || 0,
          quizzesCompleted: Number(data[i][7]) || 0,
          attemptedDays: attemptedDays,
          lastActiveDate: data[i][9]
        }
      });
    }
  }
  
  return jsonResponse({
    status: 'success',
    found: false,
    message: 'Student not registered in sheet yet.'
  });
}

function handleRegister(data) {
  const phone = String(data.phone || '').trim().replace(/\D/g, '');
  const name = String(data.name || '').trim();
  const level = data.level || 'Junior (Grade 1-4)';
  
  if (!phone || phone.length < 10) {
    return jsonResponse({ status: 'error', message: 'Valid 10-digit mobile number required.' });
  }
  if (!name) {
    return jsonResponse({ status: 'error', message: 'Student name is required.' });
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_STUDENTS);
  if (!sheet) {
    setupSheets();
    sheet = ss.getSheetByName(SHEET_STUDENTS);
  }
  
  const existingData = sheet.getDataRange().getValues();
  for (let i = 1; i < existingData.length; i++) {
    const rowPhone = String(existingData[i][0]).trim().replace(/\D/g, '');
    if (rowPhone === phone) {
      sheet.getRange(i + 1, 2).setValue(name);
      sheet.getRange(i + 1, 3).setValue(level);
      return jsonResponse({
        status: 'success',
        message: 'Student record updated!',
        student: {
          phone: phone,
          name: name,
          level: level,
          accessStatus: existingData[i][3] || 'ACTIVE',
          adminUnlockOverride: existingData[i][4] || 'None',
          totalScore: existingData[i][5] || 0,
          currentStreak: existingData[i][6] || 0,
          quizzesCompleted: existingData[i][7] || 0,
          attemptedDays: {}
        }
      });
    }
  }
  
  // New Student Registration
  const now = new Date().toISOString();
  const newRow = [
    phone,
    name,
    level,
    'ACTIVE',  // Default Active for coaching students
    'None',    // Admin Unlock Override (Avinash Sir can change via dropdown)
    0,         // Score
    0,         // Streak
    0,         // Quizzes Completed
    now,
    now
  ];
  
  // Initialize all 100 days as 'Not Attempted'
  for (let d = 1; d <= 100; d++) {
    newRow.push('Not Attempted');
  }
  
  sheet.appendRow(newRow);
  
  return jsonResponse({
    status: 'success',
    message: 'Student registered successfully!',
    student: {
      phone: phone,
      name: name,
      level: level,
      accessStatus: 'ACTIVE',
      adminUnlockOverride: 'None',
      totalScore: 0,
      currentStreak: 0,
      quizzesCompleted: 0,
      attemptedDays: {}
    }
  });
}

function handleSubmitQuiz(data) {
  const phone = String(data.phone || '').trim().replace(/\D/g, '');
  const day = Number(data.dayNumber);
  const score = Number(data.score) || 0;
  const accuracy = data.accuracy || '100%';
  const timeTaken = Number(data.timeTakenSec) || 0;
  const correctCount = Number(data.questionsCorrect) || 0;
  const timerMode = data.timerMode ? 'ON' : 'OFF';
  
  if (day < 1 || day > 100) {
    return jsonResponse({ status: 'error', message: 'Invalid day number (must be 1 to 100).' });
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let subSheet = ss.getSheetByName(SHEET_SUBMISSIONS);
  let studentSheet = ss.getSheetByName(SHEET_STUDENTS);
  if (!subSheet || !studentSheet) {
    setupSheets();
    subSheet = ss.getSheetByName(SHEET_SUBMISSIONS);
    studentSheet = ss.getSheetByName(SHEET_STUDENTS);
  }
  
  const studentRows = studentSheet.getDataRange().getValues();
  let studentRowIndex = -1;
  
  for (let i = 1; i < studentRows.length; i++) {
    const rowPhone = String(studentRows[i][0]).trim().replace(/\D/g, '');
    if (rowPhone === phone) {
      studentRowIndex = i + 1; // 1-based sheet row
      
      // Enforce single attempt: check if Day_N was already attempted
      const dayColIndex = 10 + day; // 1-based column: Col 11 is Day 1
      const existingStatus = String(studentRows[i][dayColIndex - 1] || '').trim();
      if (existingStatus.toLowerCase().indexOf('attempted') !== -1) {
        return jsonResponse({
          status: 'error',
          alreadyAttempted: true,
          message: 'Day ' + day + ' has already been attempted. Quizzes can only be attempted once!'
        });
      }
      break;
    }
  }
  
  const now = new Date();
  
  // 1. Append to Quiz_Submissions log
  subSheet.appendRow([
    now.toISOString(),
    phone,
    data.studentName || 'Student',
    data.level || 'Junior (Grade 1-4)',
    day,
    score,
    accuracy,
    timeTaken,
    correctCount,
    timerMode
  ]);
  
  // 2. Mark Day_N as 'Attempted (score pts)' and update cumulative metrics
  if (studentRowIndex > 0) {
    const dayColIndex = 10 + day;
    studentSheet.getRange(studentRowIndex, dayColIndex).setValue('Attempted (' + score + ' pts)');
    
    // Update Score, Streak, Quizzes Count
    const curScore = Number(studentSheet.getRange(studentRowIndex, 6).getValue()) || 0;
    const curStreak = Number(studentSheet.getRange(studentRowIndex, 7).getValue()) || 0;
    const curCount = Number(studentSheet.getRange(studentRowIndex, 8).getValue()) || 0;
    
    studentSheet.getRange(studentRowIndex, 6).setValue(curScore + score);
    studentSheet.getRange(studentRowIndex, 7).setValue(curStreak + 1);
    studentSheet.getRange(studentRowIndex, 8).setValue(curCount + 1);
    studentSheet.getRange(studentRowIndex, 10).setValue(now.toISOString());
  }
  
  return jsonResponse({
    status: 'success',
    message: 'Day ' + day + ' quiz recorded and marked as Attempted in Google Sheet!'
  });
}

function handleLeaderboard(level) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_STUDENTS);
  if (!sheet) {
    return jsonResponse({ status: 'success', leaderboard: [] });
  }
  
  const data = sheet.getDataRange().getValues();
  const students = [];
  
  for (let i = 1; i < data.length; i++) {
    const status = data[i][3] || 'ACTIVE';
    if (status === 'BLOCKED') continue;
    
    const rowLevel = data[i][2];
    if (level && level !== 'all' && rowLevel !== level) {
      continue;
    }
    
    students.push({
      name: data[i][1],
      level: rowLevel,
      score: Number(data[i][5]) || 0,
      streak: Number(data[i][6]) || 0,
      quizzes: Number(data[i][7]) || 0
    });
  }
  
  students.sort((a, b) => b.score - a.score || b.streak - a.streak);
  
  return jsonResponse({
    status: 'success',
    leaderboard: students.slice(0, 50)
  });
}

function handleStudentHistory(phone) {
  const cleanPhone = String(phone).trim().replace(/\D/g, '');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let subSheet = ss.getSheetByName(SHEET_SUBMISSIONS);
  if (!subSheet) {
    return jsonResponse({ status: 'success', history: [] });
  }
  
  const data = subSheet.getDataRange().getValues();
  const history = [];
  for (let i = 1; i < data.length; i++) {
    const rowPhone = String(data[i][1]).trim().replace(/\D/g, '');
    if (rowPhone === cleanPhone) {
      history.push({
        timestamp: data[i][0],
        day: Number(data[i][4]),
        score: Number(data[i][5]),
        accuracy: data[i][6],
        timeTaken: Number(data[i][7]),
        correct: Number(data[i][8])
      });
    }
  }
  
  return jsonResponse({
    status: 'success',
    history: history
  });
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
