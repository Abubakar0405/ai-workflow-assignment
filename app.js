// Tab Switching System
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(`tab-${tabName}`).classList.add('active');
  event.target.classList.add('active');
}

// Sample Applicants Data
const applicants = {
  sarah: {
    name: "Sarah Chen",
    gpa: "3.92 / 4.00",
    prereqs: "Calculus (A), Physics (A), English (A)",
    confidence: "98.4%",
    status: "APPROVED",
    notes: "High academic merit. Official university seal detected."
  },
  tariq: {
    name: "Tariq Khan",
    gpa: "2.85 / 4.00",
    prereqs: "Calculus (C-), Physics (B), English (B+)",
    confidence: "94.1%",
    status: "MANUAL_REVIEW",
    notes: "Calculus grade below required program threshold (Min: B)."
  },
  elena: {
    name: "Elena Rostova",
    gpa: "Unknown (Foreign Scale)",
    prereqs: "Partial detection due to scan glare",
    confidence: "61.2%",
    status: "MANUAL_REVIEW",
    notes: "Low OCR confidence (<90%). Edge-case routing to admissions officer."
  }
};

let currentApplicant = null;

function loadSample(key) {
  currentApplicant = applicants[key];
  const preview = document.getElementById('filePreview');
  preview.innerHTML = `
    <strong>Uploaded File:</strong> ${currentApplicant.name}_Transcript.pdf<br>
    <span style="font-size: 0.85rem; color: #64748b;">Ready to process multimodal document</span>
  `;
  document.getElementById('runBtn').disabled = false;

  const consoleBox = document.getElementById('aiConsole');
  consoleBox.innerHTML = `<div class="console-line text-muted">> Loaded file for: ${currentApplicant.name}. Click "Run AI Pipeline".</div>`;
  document.getElementById('decisionCard').classList.add('hidden');
}

function runAiPipeline() {
  if (!currentApplicant) return;

  const consoleBox = document.getElementById('aiConsole');
  const decisionCard = document.getElementById('decisionCard');

  consoleBox.innerHTML = `<div class="console-line">> [1/3] Parsing document bounding boxes with Multimodal Vision OCR...</div>`;

  setTimeout(() => {
    consoleBox.innerHTML += `<div class="console-line">> [2/3] Extracting course tables & validating seal. Confidence: <strong>${currentApplicant.confidence}</strong></div>`;
  }, 700);

  setTimeout(() => {
    consoleBox.innerHTML += `<div class="console-line text-success">> [3/3] Normalizing GPA to 4.0 scale & validating prerequisites...</div>`;

    decisionCard.classList.remove('hidden', 'approved', 'manual-review');

    if (currentApplicant.status === "APPROVED") {
      decisionCard.classList.add('approved');
      decisionCard.innerHTML = `
        ✅ <strong>AUTO-APPROVED</strong><br>
        Extracted GPA: ${currentApplicant.gpa}<br>
        Prerequisites Met: ${currentApplicant.prereqs}<br>
        <em>Conditional offer letter automatically dispatched to student.</em>
      `;
    } else {
      decisionCard.classList.add('manual-review');
      decisionCard.innerHTML = `
        ⚠️ <strong>ROUTED TO HUMAN REVIEW</strong><br>
        Confidence: ${currentApplicant.confidence} | GPA: ${currentApplicant.gpa}<br>
        <strong>Flag:</strong> ${currentApplicant.notes}
      `;
    }
  }, 1400);
}

// Interactive ROI Math
function updateROI() {
  const vol = parseInt(document.getElementById('volInput').value, 10);
  const wage = parseInt(document.getElementById('wageInput').value, 10);

  document.getElementById('volVal').innerText = vol.toLocaleString();
  document.getElementById('wageVal').innerText = `$${wage}`;

  const manualMinutesTotal = vol * 14;
  const aiMinutesTotal = vol * 0.5;
  const savedMinutes = manualMinutesTotal - aiMinutesTotal;
  const savedHours = Math.round(savedMinutes / 60);

  const savedDollars = Math.round(savedHours * wage);

  document.getElementById('hoursSaved').innerText = savedHours.toLocaleString();
  document.getElementById('dollarsSaved').innerText = `$${savedDollars.toLocaleString()}`;
}

// Initial calculation on page load
updateROI();
