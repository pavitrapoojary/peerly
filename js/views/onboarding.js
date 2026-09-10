// js/views/onboarding.js - 5-Step Enriched Onboarding Wizard for v2

const OnboardingView = {
  render() {
    const step = appState.onboardingStep || 1;
    const data = appState.onboardingData;

    return `
      <div class="main-container">
        <div class="onboarding-wrapper">
          <!-- Stepper Header -->
          <div class="stepper-header">
            <div class="stepper-track"></div>
            <div class="stepper-progress" style="width: ${((step - 1) / 4) * 100}%;"></div>

            <div class="stepper-step ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}">
              <div class="stepper-circle">${step > 1 ? Icons.check(14) : '1'}</div>
              <span class="stepper-label">Campus</span>
            </div>

            <div class="stepper-step ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}">
              <div class="stepper-circle">${step > 2 ? Icons.check(14) : '2'}</div>
              <span class="stepper-label">Email</span>
            </div>

            <div class="stepper-step ${step >= 3 ? (step > 3 ? 'completed' : 'active') : ''}">
              <div class="stepper-circle">${step > 3 ? Icons.check(14) : '3'}</div>
              <span class="stepper-label">Profile</span>
            </div>

            <div class="stepper-step ${step >= 4 ? (step > 4 ? 'completed' : 'active') : ''}">
              <div class="stepper-circle">${step > 4 ? Icons.check(14) : '4'}</div>
              <span class="stepper-label">ID Badge</span>
            </div>

            <div class="stepper-step ${step === 5 ? 'completed' : ''}">
              <div class="stepper-circle">${step === 5 ? Icons.check(14) : '5'}</div>
              <span class="stepper-label">Complete</span>
            </div>
          </div>

          <!-- Step Content Container -->
          <div id="onboarding-step-body">
            ${this.renderStepContent(step, data)}
          </div>
        </div>
      </div>
    `;
  },

  renderStepContent(step, data) {
    switch (step) {
      case 1:
        return `
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="font-size: 24px; margin-bottom: 8px;">Select Your Campus</h2>
            <p style="font-size: 14px;">Peerly is a trusted closed campus network restricted to verified students at enrolled colleges and universities.</p>
          </div>

          <div style="margin-bottom: 24px;">
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${MOCK_CAMPUSES.map(campus => `
                <div class="card card-hover campus-select-card ${data.campus?.id === campus.id ? 'selected' : ''}" 
                     data-id="${campus.id}"
                     style="padding: 16px; cursor: pointer; border-color: ${data.campus?.id === campus.id ? 'var(--color-primary)' : 'var(--color-border)'}; background: ${data.campus?.id === campus.id ? 'var(--color-primary-light)' : '#FFFFFF'};">
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--color-surface-alt); display: flex; align-items: center; justify-content: center; color: var(--color-primary);">
                        ${Icons.mapPin(18)}
                      </div>
                      <div>
                        <div style="font-weight: 700; font-size: 14.5px; color: var(--color-text-primary);">${campus.name}</div>
                        <div style="font-size: 12px; color: var(--color-text-secondary);">${campus.studentsCount} · @${campus.domain}</div>
                      </div>
                    </div>
                    ${data.campus?.id === campus.id ? `<span style="color: var(--color-primary);">${Icons.checkCircle(20)}</span>` : ''}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <button id="btn-step1-next" class="btn btn-primary btn-full btn-lg">
            Continue to Email Verification ${Icons.arrowRight(16)}
          </button>
        `;

      case 2:
        return `
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="font-size: 24px; margin-bottom: 8px;">Verify .edu Email</h2>
            <p style="font-size: 14px;">We'll send a 4-digit OTP to confirm you're currently enrolled at <strong>${data.campus?.name?.split('(')[0] || 'GLIM'}</strong>.</p>
          </div>

          <div class="form-group">
            <label class="form-label">Campus Email Address</label>
            <div style="display: flex; gap: 10px;">
              <input type="email" id="onboarding-email" class="form-input" value="${data.email || 'haripriya.m@greatlakes.edu.in'}" placeholder="your.name@greatlakes.edu.in" />
              <button id="btn-send-otp" class="btn btn-secondary btn-sm" style="white-space: nowrap;">
                Send OTP
              </button>
            </div>
            <div class="form-hint">Must end in @${data.campus?.domain || 'greatlakes.edu.in'}</div>
          </div>

          <div id="otp-section" style="margin-top: 24px; text-align: center;">
            <label class="form-label" style="margin-bottom: 12px;">Enter 4-Digit OTP Code</label>
            <div class="otp-boxes">
              <input type="text" maxlength="1" class="otp-digit" id="otp-1" value="4" />
              <input type="text" maxlength="1" class="otp-digit" id="otp-2" value="8" />
              <input type="text" maxlength="1" class="otp-digit" id="otp-3" value="2" />
              <input type="text" maxlength="1" class="otp-digit" id="otp-4" value="9" />
            </div>
            <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 24px;">
              ${Icons.sparkles(13, '#2DBFA0')} Simulated Demo: Code 4829 auto-filled!
            </div>
          </div>

          <div style="display: flex; gap: 12px;">
            <button id="btn-step2-back" class="btn btn-ghost btn-lg" style="flex: 1;">
              Back
            </button>
            <button id="btn-step2-verify" class="btn btn-primary btn-lg" style="flex: 2;">
              Verify & Continue
            </button>
          </div>
        `;

      case 3:
        // New in v2: Profile & Radar Preferences
        const allBg = ["Marketing", "Strategy", "Consulting", "Finance", "Operations", "Analytics", "Engineering", "Design"];
        const allInterests = ["Finance", "Consulting", "Product Management", "Analytics", "Venture Capital", "Strategy", "Marketing", "AI Tools"];

        return `
          <div style="text-align: center; margin-bottom: 24px;">
            <div class="badge" style="background: var(--color-primary-light); color: var(--color-primary); font-size: 11px; margin-bottom: 6px;">
              Personalized Radar & Connect
            </div>
            <h2 style="font-size: 24px; margin-bottom: 6px;">Your Domain & Radar Interests</h2>
            <p style="font-size: 14px;">Powers peer-pairing matches, skill swaps, and daily curated opportunities.</p>
          </div>

          <div class="form-group">
            <label class="form-label">Cohort Batch Year</label>
            <select id="onboarding-batch-select" class="form-select">
              <option value="PGP 2026" selected>PGP 2026 (1st Year)</option>
              <option value="PGP 2025">PGP 2025 (Graduating)</option>
              <option value="PGP 2027">PGP 2027 (Incoming)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Your Background / Specialization</label>
            <div class="tag-selector-grid" id="onb-bg-tags">
              ${allBg.map(bg => `
                <button type="button" class="tag-toggle-btn ${(data.background || ["Marketing", "Strategy"]).includes(bg) ? 'active' : ''}" data-val="${bg}">
                  ${bg}
                </button>
              `).join("")}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Interests You Want to Learn / Opportunities Target</label>
            <div class="tag-selector-grid" id="onb-interest-tags">
              ${allInterests.map(int => `
                <button type="button" class="tag-toggle-btn ${(data.interests || ["Finance", "Consulting", "Product Management"]).includes(int) ? 'active' : ''}" data-val="${int}">
                  ${int}
                </button>
              `).join("")}
            </div>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 24px;">
            <button id="btn-step3-back" class="btn btn-ghost btn-lg" style="flex: 1;">
              Back
            </button>
            <button id="btn-step3-next" class="btn btn-primary btn-lg" style="flex: 2;">
              Save & Continue ${Icons.arrowRight(16)}
            </button>
          </div>
        `;

      case 4:
        return `
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="font-size: 24px; margin-bottom: 8px;">Upload Student ID (Optional)</h2>
            <p style="font-size: 14px;">Uploading your campus ID card unlocks the <strong>Verified Seller</strong> badge and enables bulk/resale listings.</p>
          </div>

          <div class="dropzone" id="id-dropzone">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
              ${Icons.upload(24)}
            </div>
            <div style="font-weight: 700; font-size: 15px; margin-bottom: 4px;" id="dropzone-title">Click to upload or drag student ID card</div>
            <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 12px;">PNG, JPG up to 5MB (Simulated Demo)</div>
            <span class="badge badge-verified" id="id-badge-preview" style="display: none;">
              ${Icons.shieldCheck(14)} Campus ID Attached
            </span>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 24px;">
            <button id="btn-step4-skip" class="btn btn-secondary btn-lg" style="flex: 1;">
              Skip for now
            </button>
            <button id="btn-step4-upload" class="btn btn-teal btn-lg" style="flex: 1.5;">
              Upload & Get Badge ${Icons.arrowRight(16)}
            </button>
          </div>
        `;

      case 5:
        return `
          <div style="text-align: center; padding: 20px 0;">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: var(--color-secondary-light); color: var(--color-secondary); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; animation: pulse 1.5s infinite;">
              ${Icons.checkCircle(40)}
            </div>

            <h2 style="font-size: 28px; margin-bottom: 10px;">You're In!</h2>
            <p style="font-size: 15px; color: var(--color-text-secondary); max-width: 440px; margin: 0 auto 20px auto;">
              Welcome to the <strong>${data.campus?.name?.split('(')[0] || 'Great Lakes Chennai'}</strong> campus network.
            </p>

            <div style="display: inline-flex; align-items: center; gap: 8px; background: #FFFFFF; border: 1.5px solid var(--color-secondary); padding: 8px 18px; border-radius: var(--radius-full); margin-bottom: 28px; box-shadow: var(--shadow-sm);">
              <span style="color: var(--color-secondary);">${Icons.shieldCheck(18)}</span>
              <span style="font-weight: 700; font-size: 14px; color: var(--color-text-primary);">
                Verified Student · ${data.batch || 'PGP 2026'}
              </span>
            </div>

            <div style="background: var(--color-surface-alt); padding: 18px; border-radius: var(--radius-lg); text-align: left; margin-bottom: 28px; font-size: 13.5px;">
              <div style="font-weight: 700; color: var(--color-text-primary); margin-bottom: 8px;">What's unlocked in your Campus OS:</div>
              <ul style="padding-left: 20px; line-height: 1.7; color: var(--color-text-secondary);">
                <li><strong>Marketplace & Needs:</strong> Borrow formal wear, gear, or post reverse requests</li>
                <li><strong>Connect:</strong> Meet batchmates & automatic biweekly coffee pairing</li>
                <li><strong>Community:</strong> Post hackathon team-ups and informal favors</li>
                <li><strong>Opportunities Radar:</strong> Personalized deadline alerts tailored to you</li>
              </ul>
            </div>

            <button id="btn-step5-feed" class="btn btn-primary btn-full btn-lg">
              Open Campus Operating System ${Icons.arrowRight(16)}
            </button>
          </div>
        `;
    }
  },

  afterRender() {
    const step = appState.onboardingStep || 1;

    if (step === 1) {
      document.querySelectorAll(".campus-select-card").forEach(card => {
        card.addEventListener("click", () => {
          const cid = card.dataset.id;
          const campus = MOCK_CAMPUSES.find(c => c.id === cid);
          appState.updateOnboardingData({ campus: campus });
          appState.setCampus(cid);
          document.querySelectorAll(".campus-select-card").forEach(c => {
            c.style.borderColor = "var(--color-border)";
            c.style.background = "#FFFFFF";
          });
          card.style.borderColor = "var(--color-primary)";
          card.style.background = "var(--color-primary-light)";
        });
      });

      document.getElementById("btn-step1-next")?.addEventListener("click", () => {
        appState.setOnboardingStep(2);
        Router.renderCurrentRoute();
      });
    }

    if (step === 2) {
      document.getElementById("btn-step2-back")?.addEventListener("click", () => {
        appState.setOnboardingStep(1);
        Router.renderCurrentRoute();
      });

      document.getElementById("btn-send-otp")?.addEventListener("click", () => {
        Toast.success("OTP sent to your campus email! (Code: 4829)");
      });

      document.getElementById("btn-step2-verify")?.addEventListener("click", (e) => {
        const btn = e.currentTarget;
        btn.disabled = true;
        btn.innerHTML = `Verifying...`;

        setTimeout(() => {
          const email = document.getElementById("onboarding-email")?.value || "haripriya.m@greatlakes.edu.in";
          appState.updateOnboardingData({ email: email });
          appState.setOnboardingStep(3);
          Router.renderCurrentRoute();
          Toast.success("Email verified! 🎉");
        }, 500);
      });
    }

    if (step === 3) {
      document.getElementById("btn-step3-back")?.addEventListener("click", () => {
        appState.setOnboardingStep(2);
        Router.renderCurrentRoute();
      });

      let selectedBg = appState.onboardingData.background || ["Marketing", "Strategy"];
      let selectedInt = appState.onboardingData.interests || ["Finance", "Consulting", "Product Management"];

      document.querySelectorAll("#onb-bg-tags .tag-toggle-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const val = btn.dataset.val;
          if (selectedBg.includes(val)) selectedBg = selectedBg.filter(x => x !== val);
          else selectedBg.push(val);
          btn.classList.toggle("active");
        });
      });

      document.querySelectorAll("#onb-interest-tags .tag-toggle-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const val = btn.dataset.val;
          if (selectedInt.includes(val)) selectedInt = selectedInt.filter(x => x !== val);
          else selectedInt.push(val);
          btn.classList.toggle("active");
        });
      });

      document.getElementById("btn-step3-next")?.addEventListener("click", () => {
        const batch = document.getElementById("onboarding-batch-select")?.value || "PGP 2026";
        appState.updateOnboardingData({
          batch: batch,
          background: selectedBg,
          interests: selectedInt
        });
        appState.setOnboardingStep(4);
        Router.renderCurrentRoute();
      });
    }

    if (step === 4) {
      let isUploaded = false;
      const dropzone = document.getElementById("id-dropzone");
      const badgePreview = document.getElementById("id-badge-preview");
      const dropzoneTitle = document.getElementById("dropzone-title");

      dropzone?.addEventListener("click", () => {
        isUploaded = true;
        dropzone.style.background = "var(--color-secondary-light)";
        dropzone.style.borderColor = "var(--color-secondary)";
        if (dropzoneTitle) dropzoneTitle.innerText = "glim_student_id_card.png (Attached)";
        if (badgePreview) badgePreview.style.display = "inline-flex";
        Toast.success("Student ID verified! Unlocked Verified Seller badge.");
      });

      document.getElementById("btn-step4-skip")?.addEventListener("click", () => {
        appState.updateOnboardingData({ idUploaded: false });
        appState.setOnboardingStep(5);
        Router.renderCurrentRoute();
      });

      document.getElementById("btn-step4-upload")?.addEventListener("click", (e) => {
        const btn = e.currentTarget;
        btn.disabled = true;
        btn.innerHTML = `Validating ID...`;
        setTimeout(() => {
          appState.updateOnboardingData({ idUploaded: true });
          appState.setOnboardingStep(5);
          Router.renderCurrentRoute();
        }, 500);
      });
    }

    if (step === 5) {
      document.getElementById("btn-step5-feed")?.addEventListener("click", () => {
        appState.completeOnboarding();
        appState.setOnboardingStep(1);
        Toast.success("Welcome to Peerly v2! Campus fully connected. 🎉");
        Router.navigate("#/feed");
      });
    }
  }
};
