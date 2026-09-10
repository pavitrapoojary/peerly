// js/components/footer.js - App Footer Component for Peerly v2

const Footer = {
  render() {
    return `
      <footer class="app-footer">
        <div class="footer-container">
          <div class="footer-top">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                ${Icons.logo(24)}
                <span style="font-family: var(--font-serif); font-size: 20px; font-weight: 700; color: var(--color-text-primary);">Peerly v2</span>
              </div>
              <p style="font-size: 13.5px; max-width: 420px; color: var(--color-text-secondary); line-height: 1.5;">
                The complete Campus Operating System for colleges, universities, and student communities. Trade what you have, meet who you should know, ask for help, and track high-impact opportunities.
              </p>
            </div>

            <div style="display: flex; gap: 28px; flex-wrap: wrap;">
              <div>
                <div style="font-size: 12px; font-weight: 700; color: var(--color-text-primary); text-transform: uppercase; margin-bottom: 10px;">The 4 Pillars</div>
                <ul style="list-style: none; font-size: 13.5px; display: flex; flex-direction: column; gap: 8px;">
                  <li><a href="#/feed">🛍️ Things (Marketplace & Needs)</a></li>
                  <li><a href="#/connect">👥 Skills (Connect & Peer Pairing)</a></li>
                  <li><a href="#/community">💬 Help (Community Board)</a></li>
                  <li><a href="#/opportunities">🎯 Knowledge (Opportunities Radar)</a></li>
                </ul>
              </div>

              <div>
                <div style="font-size: 12px; font-weight: 700; color: var(--color-text-primary); text-transform: uppercase; margin-bottom: 10px;">Quick Actions</div>
                <ul style="list-style: none; font-size: 13.5px; display: flex; flex-direction: column; gap: 8px;">
                  <li><a href="#/profile">My Peerly Profile</a></li>
                  <li><a href="#/onboarding">Test Onboarding Flow</a></li>
                  <li><a href="javascript:void(0)" onclick="Modal.openRoadmapModal()">Product Roadmap</a></li>
                  <li><a href="javascript:void(0)" onclick="Navbar.handleResetDemo()">Reset Demo Data</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div>
              <strong>Peerly v2</strong> · Multi-Campus Operating System for Higher Education Institutions
            </div>
            <div style="font-size: 12px; color: var(--color-text-muted);">
              v2 Campus Operating System · 100% Front-End Prototype · In-Memory State
            </div>
          </div>
        </div>
      </footer>
    `;
  }
};
