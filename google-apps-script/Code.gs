/**
 * =========================================================================
 * UPGRADE MATH QUIZ - GOOGLE APPS SCRIPT BACKEND (v5 Monetization & Access Controller)
 * Created for: Avinash Sir
 * Connected to Sheet: Upgrade_Digital_Quiz
 * =========================================================================
 * 
 * FEATURES:
 * - 100 Columns for Days 1 to 100 to track 'Attempted' vs 'Not Attempted'
 * - Single Attempt Enforcement: each quiz can only be attempted once
 * - Access Controller: Column D (ACTIVE, NO ACCESS, PENDING_APPROVAL, BLOCKED)
 * - Monetization: ₹200 for 100 Days. Shows UPI QR Code & Bank details for non-coaching students
 * - Instant Email Notifications to Avinash Sir on payment submission
 * - Admin Unlock Override dropdown per student (None, All Past Days, or Day N)
 * - Real-time student verification, quiz submission, and leaderboard ranking
 * =========================================================================
 */

const SHEET_STUDENTS = 'Students_Access';
const SHEET_SUBMISSIONS = 'Quiz_Submissions';

// Whitelist of Avinash Sir's Coaching Students (Always 100% Free Lifetime Access)
// Fully supports Indian (10-digit) and International (Australia +61, New Zealand +64, US, etc.) formats
const COACHING_STUDENTS = [
  '8979317487',      // Student 1 (India)
  '8582047578',      // Student 2 (India)
  '61469606997',     // Student 3 (Australia)
  '64221910852',     // Student 4 (New Zealand)
  '64211489307',     // Student 5 (New Zealand)
  '6195393482',      // Student 6 (International)
  '642041151177',    // Student 7 (New Zealand)
  '9179799355',      // Avinash Sir (Admin)
  '9999999999',      // Admin Passcode Demo
  '9876543210',      // Demo Student (Sara)
  '9876543211'       // Demo Student (Aarav)
];

function isCoachingStudent(phone) {
  if (!phone) return false;
  var clean = String(phone).replace(/\D/g, '');
  if (!clean || clean.length < 8) return false;

  for (var i = 0; i < COACHING_STUDENTS.length; i++) {
    var p = COACHING_STUDENTS[i].replace(/\D/g, '');
    if (clean === p) return true;
    if (clean.length >= 8 && p.length >= 8) {
      if (clean.indexOf(p) !== -1 || p.indexOf(clean) !== -1) return true;
      // Match without leading zeros (e.g. 0469606997 vs 61469606997)
      var localClean = clean.replace(/^0+/, '');
      var localP = p.replace(/^0+/, '');
      if (localClean.length >= 8 && localP.length >= 8) {
        if (p.slice(-localClean.length) === localClean || clean.slice(-localP.length) === localP) {
          return true;
        }
      }
    }
  }
  return false;
}

// Resilient Sheet Tab Getter (supports 'Students_Access', 'Students', or sheet 0)
function getStudentSheet(ss) {
  return ss.getSheetByName(SHEET_STUDENTS) 
      || ss.getSheetByName('Students') 
      || ss.getSheetByName('Students_Access') 
      || ss.getSheetByName('Sheet1') 
      || ss.getSheets()[0];
}

function getSubmissionsSheet(ss) {
  var s = ss.getSheetByName(SHEET_SUBMISSIONS) || ss.getSheetByName('Submissions') || ss.getSheetByName('Quiz_Submissions');
  if (!s) {
    try {
      s = ss.insertSheet(SHEET_SUBMISSIONS);
    } catch (e) {
      s = ss.getSheets()[0];
    }
  }
  return s;
}

/**
 * Setup function to initialize sheets and 100-day columns.
 * Run this function once from Extensions > Apps Script editor!
 */
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Setup Students_Access Sheet
  let studentSheet = getStudentSheet(ss);
  if (!studentSheet) {
    studentSheet = ss.insertSheet(SHEET_STUDENTS);
  }
  
  // Base columns
  const baseHeaders = [
    'Mobile_Number',
    'Student_Name',
    'Level',
    'Status',                // ACTIVE, NO ACCESS, PENDING_APPROVAL, BLOCKED
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

  // Add Data Validation dropdown for Column D (Status)
  try {
    const statusRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['ACTIVE', 'NO ACCESS', 'PENDING_APPROVAL', 'BLOCKED'], true)
      .setAllowInvalid(true)
      .build();
    studentSheet.getRange(2, 4, 500, 1).setDataValidation(statusRule);
  } catch (e) {
    Logger.log('Validation rule set: ' + e);
  }
  
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
  let subSheet = getSubmissionsSheet(ss);
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
 * Helper to check if a cell truly represents an attempted day
 * (Strictly prevents 'Not Attempted' from falsely matching 'attempted'!)
 */
function isDayAlreadyAttempted(cellValue) {
  const val = String(cellValue || '').trim().toLowerCase();
  return val.startsWith('attempted (') || (val.indexOf('attempted') !== -1 && val.indexOf('not') === -1);
}

/**
 * Handles HTTP GET requests (including redundant fallback support for submissions)
 */
function doGet(e) {
  const params = e.parameter || {};
  const action = params.action;
  
  try {
    if (action === 'verify') {
      return handleVerify(params.phone, params.autoRegister);
    } else if (action === 'leaderboard') {
      return handleLeaderboard(params.level);
    } else if (action === 'student_history') {
      return handleStudentHistory(params.phone);
    } else if (action === 'submit_quiz') {
      return handleSubmitQuiz(params);
    } else if (action === 'register') {
      return handleRegister(params);
    } else if (action === 'payment_submitted') {
      return handlePaymentSubmitted(params);
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
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }
    
    const action = payload.action;
    if (action === 'register') {
      return handleRegister(payload);
    } else if (action === 'submit_quiz') {
      return handleSubmitQuiz(payload);
    } else if (action === 'payment_submitted') {
      return handlePaymentSubmitted(payload);
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

function handleVerify(phone, autoRegister) {
  if (!phone) {
    return jsonResponse({ status: 'error', message: 'Phone number is required.' });
  }
  
  const cleanPhone = String(phone).trim().replace(/\D/g, '');
  if (cleanPhone.length < 8) {
    return jsonResponse({ status: 'error', message: 'Valid mobile number required.' });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = getStudentSheet(ss);
  if (!sheet) {
    setupSheets();
    sheet = getStudentSheet(ss);
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
        if (isDayAlreadyAttempted(cellVal)) {
          attemptedDays[d] = cellVal;
        }
      }
      
      const isCoaching = isCoachingStudent(cleanPhone);
      const rawStatus = String(data[i][3] || (isCoaching ? 'ACTIVE' : 'NO ACCESS')).trim().toUpperCase();
      let normalizedStatus = isCoaching ? 'ACTIVE' : 'NO_ACCESS';
      
      if (rawStatus === 'ACTIVE' || isCoaching) {
        normalizedStatus = 'ACTIVE';
      } else if (rawStatus === 'PENDING_APPROVAL') {
        normalizedStatus = 'PENDING_APPROVAL';
      } else if (rawStatus === 'BLOCKED') {
        normalizedStatus = 'BLOCKED';
      } else {
        normalizedStatus = 'NO_ACCESS';
      }

      return jsonResponse({
        status: 'success',
        found: true,
        student: {
          phone: cleanPhone,
          name: data[i][1],
          level: data[i][2],
          accessStatus: normalizedStatus, // ACTIVE, NO_ACCESS, PENDING_APPROVAL, BLOCKED
          rawStatus: data[i][3] || 'ACTIVE',
          adminUnlockOverride: data[i][4] || 'None',
          totalScore: Number(data[i][5]) || 0,
          currentStreak: Number(data[i][6]) || 0,
          quizzesCompleted: Number(data[i][7]) || 0,
          registrationDate: data[i][8] || new Date().toISOString(),
          attemptedDays: attemptedDays,
          lastActiveDate: data[i][9]
        }
      });
    }
  }

  // If new phone number and autoRegister is requested (or true by default):
  // Instantly create the student row in Google Sheet so Avinash Sir sees it right away!
  if (autoRegister === 'true' || autoRegister === true || autoRegister === '1' || autoRegister === undefined) {
    const regRes = handleRegister({
      phone: cleanPhone,
      name: 'Student (' + cleanPhone.slice(-4) + ')',
      level: 'Junior (Grade 1-4)'
    });
    // Add isNew flag so frontend knows to prompt student for their actual full name
    try {
      const regObj = JSON.parse(regRes.getContent());
      regObj.isNew = true;
      return jsonResponse(regObj);
    } catch(e) {
      return regRes;
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
  let name = String(data.name || '').trim();
  const level = data.level || 'Junior (Grade 1-4)';
  
  if (!phone || phone.length < 8) {
    return jsonResponse({ status: 'error', message: 'Valid mobile number required.' });
  }
  if (!name) {
    name = 'Student (' + phone.slice(-4) + ')';
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = getStudentSheet(ss);
  if (!sheet) {
    setupSheets();
    sheet = getStudentSheet(ss);
  }
  
  const existingData = sheet.getDataRange().getValues();
  for (let i = 1; i < existingData.length; i++) {
    const rowPhone = String(existingData[i][0]).trim().replace(/\D/g, '');
    if (rowPhone === phone || (rowPhone.length >= 8 && phone.length >= 8 && (rowPhone.slice(-8) === phone.slice(-8)))) {
      sheet.getRange(i + 1, 2).setValue(name);
      sheet.getRange(i + 1, 3).setValue(level);
      if (isCoachingStudent(phone)) {
        sheet.getRange(i + 1, 4).setValue('ACTIVE');
      }
      SpreadsheetApp.flush();
      return jsonResponse({
        status: 'success',
        message: 'Student record updated!',
        student: {
          phone: phone,
          name: name,
          level: level,
          accessStatus: existingData[i][3] || 'ACTIVE',
          adminUnlockOverride: existingData[i][4] || 'None',
          totalScore: Number(existingData[i][5]) || 0,
          currentStreak: Number(existingData[i][6]) || 0,
          quizzesCompleted: Number(existingData[i][7]) || 0,
          registrationDate: existingData[i][8] || new Date().toISOString(),
          attemptedDays: {}
        }
      });
    }
  }
  
  // New Student Registration
  // Pre-approved coaching students get instant ACTIVE; other self-registrations start as NO ACCESS until paid & approved
  const isCoaching = isCoachingStudent(phone);
  const initialStatus = isCoaching ? 'ACTIVE' : 'NO ACCESS';
  
  const now = new Date().toISOString();
  const newRow = [
    phone,
    name,
    level,
    initialStatus,
    'None',
    0, 0, 0,
    now,
    now
  ];
  
  for (let d = 1; d <= 100; d++) {
    newRow.push('Not Attempted');
  }
  
  sheet.appendRow(newRow);
  SpreadsheetApp.flush();
  
  return jsonResponse({
    status: 'success',
    message: 'Student registered successfully!',
    student: {
      phone: phone,
      name: name,
      level: level,
      accessStatus: initialStatus,
      adminUnlockOverride: 'None',
      totalScore: 0,
      currentStreak: 0,
      quizzesCompleted: 0,
      registrationDate: now,
      attemptedDays: {}
    }
  });
}

function handlePaymentSubmitted(data) {
  const phone = String(data.phone || '').trim().replace(/\D/g, '');
  const utr = String(data.utr || '').trim();
  const name = String(data.studentName || data.name || 'Student').trim();
  const level = data.level || 'Junior (Grade 1-4)';
  const amount = data.amount || '200';
  
  if (!phone) {
    return jsonResponse({ status: 'error', message: 'Phone number is required.' });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = getStudentSheet(ss);
  if (!sheet) {
    setupSheets();
    sheet = getStudentSheet(ss);
  }

  const dataRows = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < dataRows.length; i++) {
    const rowPhone = String(dataRows[i][0]).trim().replace(/\D/g, '');
    if (rowPhone === phone) {
      rowIndex = i + 1;
      break;
    }
  }

  const now = new Date();
  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 4).setValue('PENDING_APPROVAL');
    sheet.getRange(rowIndex, 5).setValue('UTR: ' + utr + ' (Rs ' + amount + ')');
    sheet.getRange(rowIndex, 10).setValue(now.toISOString());
  } else {
    const newRow = [
      phone,
      name,
      level,
      'PENDING_APPROVAL',
      'UTR: ' + utr + ' (Rs ' + amount + ')',
      0, 0, 0,
      now.toISOString(),
      now.toISOString()
    ];
    for (let d = 1; d <= 100; d++) newRow.push('Not Attempted');
    sheet.appendRow(newRow);
  }
  SpreadsheetApp.flush();

  // Send Instant Email Notification to Avinash Sir
  try {
    const adminEmail = Session.getEffectiveUser().getEmail();
    if (adminEmail) {
      const subject = "🔔 [Upgrade Math Quiz] New Rs " + amount + " Payment: " + name + " (" + phone + ")";
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #4f46e5; margin-top: 0;">🔔 New Payment Received for Upgrade Math Quiz!</h2>
          <p>Hello Avinash Sir,</p>
          <p>A student has submitted payment for the <strong>100-Day Upgrade Math Quiz</strong> program.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; color: #64748b;"><strong>Student Name:</strong></td><td style="padding: 8px; font-weight: bold;">${name}</td></tr>
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; color: #64748b;"><strong>Mobile Number:</strong></td><td style="padding: 8px; font-weight: bold;">${phone}</td></tr>
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; color: #64748b;"><strong>Level:</strong></td><td style="padding: 8px;">${level}</td></tr>
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; color: #64748b;"><strong>Amount Paid:</strong></td><td style="padding: 8px; font-weight: bold; color: #16a34a;">Rs ${amount}</td></tr>
            <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; color: #64748b;"><strong>UTR / Reference ID:</strong></td><td style="padding: 8px; font-family: monospace; background: #f8fafc;">${utr || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; color: #64748b;"><strong>Date:</strong></td><td style="padding: 8px;">${now.toLocaleString()}</td></tr>
          </table>
          <div style="background: #eef2ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #3730a3; font-weight: bold;">How to Activate this Student:</p>
            <ol style="margin: 8px 0 0 20px; color: #4338ca; padding: 0;">
              <li>Open your Google Sheet: <a href="https://docs.google.com/spreadsheets/d/1u_ITXVTH8Q-Du72M_uPwbYz15SMgHxIQxP5OUy6xIB4" target="_blank">Upgrade_Digital_Quiz</a></li>
              <li>Find the row for <strong>${phone}</strong></li>
              <li>In <strong>Column D (Status)</strong>, change <code>PENDING_APPROVAL</code> to <strong><code>ACTIVE</code></strong></li>
            </ol>
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 30px;">Upgrade Math Quiz automated notification engine</p>
        </div>
      `;
      MailApp.sendEmail({
        to: adminEmail,
        subject: subject,
        htmlBody: htmlBody
      });
    }
  } catch (mailErr) {
    Logger.log("Email notification error: " + mailErr);
  }

  return jsonResponse({
    status: 'success',
    message: 'Payment details submitted successfully! Avinash Sir has been notified.'
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
  let studentSheet = getStudentSheet(ss);
  let subSheet = getSubmissionsSheet(ss);
  if (!studentSheet || !subSheet) {
    setupSheets();
    studentSheet = getStudentSheet(ss);
    subSheet = getSubmissionsSheet(ss);
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
      if (isDayAlreadyAttempted(existingStatus)) {
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
  
  // 1. Mark Day_N as 'Attempted (score pts)' and update cumulative metrics FIRST
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
    SpreadsheetApp.flush();
  }
  
  // 2. Append to Quiz_Submissions log
  try {
    if (subSheet) {
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
    }
  } catch (subErr) {
    Logger.log("Submissions log append error: " + subErr);
  }
  
  return jsonResponse({
    status: 'success',
    message: 'Day ' + day + ' quiz recorded and marked as Attempted in Google Sheet!'
  });
}

function handleLeaderboard(level) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = getStudentSheet(ss);
  if (!sheet) {
    return jsonResponse({ status: 'success', leaderboard: [] });
  }
  
  const data = sheet.getDataRange().getValues();
  const students = [];
  
  for (let i = 1; i < data.length; i++) {
    const status = String(data[i][3] || 'ACTIVE').trim().toUpperCase();
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
  let subSheet = getSubmissionsSheet(ss);
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

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
