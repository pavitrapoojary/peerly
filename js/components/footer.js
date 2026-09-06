// js/components/footer.js - App Footer Component

const Footer = {
  render() {
    return `
      <footer class="app-footer">
        <div class="footer-container">
          <div class="footer-top">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                ${Icons.logo(24)}
                <span style="font-family: var(--font-serif); font-size: 20px; font-weight: 700; color: var(--color-text-primary);">Peerly</span>
              </div>
              <p style="font-size: 13.5px; max-width: 400px; color: var(--color-text-secondary); line-height: 1.5;">
                A trusted peer-to-peer marketplace for residential MBA campuses. Borrow, sell, give away, or trade skills with verified batchmates.
              </p>
            </div>

            <div style="display: flex; gap: 28px; flex-wrap: wrap;">
              <div>
                <div style="font-size: 12px; font-weight: 700; color: var(--color-text-primary); text-transform: uppercase; margin-bottom: 10px;">Quick Links</div>
                <ul style="list-style: none; font-size: 13.5px; display: flex; flex-direction: column; gap: 8px;">
                  <li><a href="#/">Landing & Pitch</a></li>
                  <li><a href="#/feed">Browse Campus Feed</a></li>
                  <li><a href="#/new-listing">Post an Item</a></li>
                  <li><a href="#/profile">My Peerly Profile</a></li>
                </ul>
              </div>

              <div>
                <div style="font-size: 12px; font-weight: 700; color: var(--color-text-primary); text-transform: uppercase; margin-bottom: 10px;">Project & Specs</div>
                <ul style="list-style: none; font-size: 13.5px; display: flex; flex-direction: column; gap: 8px;">
                  <li><a href="javascript:void(0)" onclick="Modal.openRoadmapModal()">Product Roadmap</a></li>
                  <li><a href="#/onboarding">Test Onboarding Flow</a></li>
                  <li><a href="javascript:void(0)" onclick="Navbar.handleResetDemo()">Reset Demo Data</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div>
              Built for <strong>Innovation Sandbox</strong> · Great Lakes Institute of Management (GLIM Chennai)
            </div>
            <div style="font-size: 12px; color: var(--color-text-muted);">
              Clickable MVP Prototype · In-Memory Pure Front-End State
            </div>
          </div>
        </div>
      </footer>
    `;
  }
};
