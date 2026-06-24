const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

document.querySelectorAll('.learn-more').forEach(button => {
  button.addEventListener('click', () => {
    alert('Replace this popup with a linked section, modal, or deeper issue brief page.');
  });
});

function enhanceCards(selector, options = {}) {
  const cards = document.querySelectorAll(selector);

  cards.forEach(card => {
    card.classList.add('interactive-card');

    if (options.selectable) {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-pressed', 'false');
    }

    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--pointer-x', `${x}%`);
      card.style.setProperty('--pointer-y', `${y}%`);
    });

    card.addEventListener('pointerdown', () => {
      card.classList.add('is-pressed');
    });

    ['pointerup', 'pointercancel', 'pointerleave'].forEach(eventName => {
      card.addEventListener(eventName, () => {
        card.classList.remove('is-pressed');
      });
    });

    if (options.selectable) {
      const toggleSelected = () => {
        const isSelected = card.classList.toggle('is-selected');
        card.setAttribute('aria-pressed', String(isSelected));
      };

      card.addEventListener('click', toggleSelected);
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleSelected();
        }
      });
    }
  });
}

function updateActiveMunicipalityCards(activeHash = window.location.hash) {
  const activeId = activeHash;

  document.querySelectorAll('.dashboard-card').forEach(card => {
    const isActive = card.getAttribute('href') === activeId;
    card.classList.toggle('is-selected', isActive);
    card.setAttribute('aria-current', isActive ? 'location' : 'false');
  });
}

function setupScrollReveals() {
  const revealItems = document.querySelectorAll(
    '.dashboard-section .dashboard-hero, .dashboard-section .dashboard-layout, .dashboard-section .dashboard-lower, .dashboard-section .budget-detail'
  );

  revealItems.forEach(item => item.classList.add('reveal-on-scroll'));

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -8% 0px'
  });

  revealItems.forEach(item => observer.observe(item));
}

function setupGovernanceFlow() {
  const nodes = document.querySelectorAll('.governance-node');
  const stage = document.getElementById('governanceDetailStage');
  const title = document.getElementById('governanceDetailTitle');
  const text = document.getElementById('governanceDetailText');
  const moves = document.getElementById('governanceDetailMoves');

  if (!nodes.length || !stage || !title || !text || !moves) {
    return;
  }

  const selectNode = node => {
    nodes.forEach(item => {
      const isCurrent = item === node;
      item.classList.toggle('is-selected', isCurrent);
      item.setAttribute('aria-pressed', String(isCurrent));
    });

    stage.textContent = node.dataset.stage;
    title.textContent = node.dataset.title;
    text.textContent = node.dataset.detail;
    moves.textContent = node.dataset.moves;
  };

  nodes.forEach(node => {
    node.setAttribute('aria-pressed', 'false');
    node.addEventListener('click', () => selectNode(node));
  });

  selectNode(nodes[0]);
}

enhanceCards('.dashboard-card');
enhanceCards('.governance-node');
enhanceCards('.official-chip');
enhanceCards('.budget-summary-card');
enhanceCards('.budget-bar', { selectable: true });
enhanceCards('.issue-card');
enhanceCards('.transport-stat');
enhanceCards('.transport-flow-card');
enhanceCards('.transport-card');
enhanceCards('.agency-card');
enhanceCards('.water-stat');
enhanceCards('.water-flow-card');
enhanceCards('.water-flow-step', { selectable: true });
enhanceCards('.water-card', { selectable: true });
enhanceCards('.water-priority-card', { selectable: true });
enhanceCards('.stakeholder-card', { selectable: true });
enhanceCards('.housing-stat');
enhanceCards('.housing-flow-card');
enhanceCards('.housing-callout', { selectable: true });
enhanceCards('.housing-pressure-card', { selectable: true });
enhanceCards('.housing-flow-step', { selectable: true });
enhanceCards('.housing-card', { selectable: true });
enhanceCards('.housing-priority-card', { selectable: true });
enhanceCards('.housing-stakeholder-card', { selectable: true });
enhanceCards('.econ-stat');
enhanceCards('.econ-flow-card');
enhanceCards('.econ-callout', { selectable: true });
enhanceCards('.econ-position-card', { selectable: true });
enhanceCards('.econ-sector-card', { selectable: true });
enhanceCards('.econ-flow-step', { selectable: true });
enhanceCards('.econ-card', { selectable: true });
enhanceCards('.econ-priority-card', { selectable: true });
enhanceCards('.econ-stakeholder-card', { selectable: true });
enhanceCards('.education-stat');
enhanceCards('.education-flow-card');
enhanceCards('.education-card');
enhanceCards('.local-flow-card');
enhanceCards('.role-card');
enhanceCards('.elections-stat');
enhanceCards('.elections-flow-card');
enhanceCards('.elections-card', { selectable: true });
enhanceCards('.election-timeline-item', { selectable: true });
enhanceCards('.elections-panel', { selectable: true });
enhanceCards('.source-card');
enhanceCards('.exhibit-image-card');

window.addEventListener('hashchange', updateActiveMunicipalityCards);
updateActiveMunicipalityCards();
setupScrollReveals();
setupGovernanceFlow();

const acronyms = [
  { acronym: "ABA", name: "Arizona Builders Alliance", category: "business-orgs", note: "" },
  { acronym: "ABEC", name: "Arizona Business and Education Coalition", category: "education", note: "Pedicone sits on board; longtime alliance between SALC and ABEC" },
  { acronym: "ABOR", name: "Arizona Board of Regents", category: "education", note: "Ron was former regent; Executive Director of ABOR is member of SALC" },
  { acronym: "ACA", name: "Arizona Commerce Authority", category: "other", note: "" },
  { acronym: "ACT", name: "Alliance of Construction Trades", category: "business-orgs", note: "" },
  { acronym: "ACTEAZ", name: "Association for Career Tech Education of Arizona", category: "education", note: "" },
  { acronym: "ADHS", name: "Arizona Department of Health Services", category: "healthcare", note: "" },
  { acronym: "ADOT", name: "Arizona Department of Transportation", category: "infrastructure", note: "Ted sits on the ADOT board" },
  { acronym: "ADWR", name: "Arizona Department of Water Resources", category: "infrastructure", note: "" },
  { acronym: "AEL", name: "Aggregate Expenditure Limit", category: "other", note: "School district spending limit" },
  { acronym: "AHCCCS", name: "Arizona Healthcare Cost Containment System", category: "healthcare", note: "" },
  { acronym: "AzHHA", name: "Arizona Hospital and Healthcare Association", category: "healthcare", note: "" },
  { acronym: "AMHA", name: "Arizona Multi-Housing Association", category: "business-orgs", note: "" },
  { acronym: "ARS", name: "Americans for Responsible Solutions", category: "governance", note: "" },
  { acronym: "ASBA", name: "Arizona Small Business Association", category: "business-orgs", note: "" },
  { acronym: "ASTB", name: "Arizona State Transportation Board", category: "infrastructure", note: "" },
  { acronym: "ATA", name: "Arizona Trucking Association", category: "infrastructure", note: "" },
  { acronym: "ATBA", name: "Arizona Transportation Builders Association", category: "infrastructure", note: "" },
  { acronym: "ATRA", name: "Arizona Tax Research Association", category: "education governance", note: "Right-leaning nonprofit that often challenges legislation" },
  { acronym: "BIOSA", name: "Bioscience of Southern Arizona", category: "other", note: "" },
  { acronym: "BLCSA", name: "Bioscience Leadership Council of Southern Arizona", category: "innovation", note: "Now defunct" },
  { acronym: "BPTT", name: "Business Partners for Trade and Transportation", category: "business-orgs", note: "Unofficial SALC-convened group" },
  { acronym: "CABC", name: "Canada Arizona Business Council", category: "business-orgs innovation", note: "" },
  { acronym: "CAGRD", name: "Central Arizona Groundwater Replenishment District", category: "infrastructure", note: "" },
  { acronym: "CAP", name: "Central Arizona Project", category: "infrastructure", note: "Colorado River water" },
  { acronym: "CAVE People", name: "Citizens Against Virtually Everything", category: "other", note: "" },
  { acronym: "CAWCD", name: "Central Arizona Water Conservation District", category: "infrastructure", note: "" },
  { acronym: "CDP", name: "Census Designated Place", category: "governance infrastructure", note: "Unincorporated community" },
  { acronym: "CFA", name: "Center for the Future of Arizona", category: "education governance", note: "Strategic partner of SALC" },
  { acronym: "CFSA", name: "Community Foundation of Southern Arizona", category: "education governance", note: "" },
  { acronym: "COW", name: "Committee of the Whole", category: "governance", note: "Legislative procedure" },
  { acronym: "CRC", name: "Citizens' Redistricting Commission / Campus Research Corp", category: "governance innovation", note: "" },
  { acronym: "CRIT", name: "Colorado River Indian Tribes", category: "infrastructure", note: "" },
  { acronym: "CSI", name: "Common Sense Institute", category: "innovation", note: "Ted sits on CSI Arizona board" },
  { acronym: "EFA", name: "Education Forward Arizona", category: "education", note: "Statewide P-20 education advocacy org" },
  { acronym: "ESA", name: "Empowerment Scholarship Account", category: "education", note: "Voucher-style education funding" },
  { acronym: "FORGE", name: "Finding Opportunities and Resources to Grow Entrepreneurs", category: "innovation", note: "UA Eller" },
  { acronym: "GME", name: "Graduate Medical Education", category: "healthcare", note: "SALC-supported issue" },
  { acronym: "GPL", name: "Greater Phoenix Leadership", category: "business-orgs governance", note: "Sister CEO leadership organization" },
  { acronym: "GPLET", name: "Government Property Lease Excise Tax", category: "governance", note: "Development incentive" },
  { acronym: "GRIC", name: "Gila River Indian Community", category: "infrastructure", note: "" },
  { acronym: "H2K", name: "2,000 Acre for chip factory", category: "infrastructure innovation", note: "Houghton to Colossal Cave, north of I-10" },
  { acronym: "HSAAZ", name: "Health System Alliance of Arizona", category: "healthcare", note: "" },
  { acronym: "HURF", name: "Highway User Revenue Fund", category: "governance infrastructure", note: "" },
  { acronym: "IGA", name: "Intergovernmental Agreement", category: "governance infrastructure", note: "" },
  { acronym: "JTED", name: "Joint Technical Education District", category: "education innovation", note: "Pima" },
  { acronym: "LOLA", name: "Legislation On-Line Arizona", category: "governance", note: "SALC uses this to track legislation" },
  { acronym: "LRTP", name: "Long Range Transportation Plan", category: "infrastructure", note: "ADOT" },
  { acronym: "LSA", name: "Living Streets Alliance", category: "infrastructure", note: "" },
  { acronym: "MAG", name: "Maricopa Association of Governments", category: "governance", note: "PAG counterpart" },
  { acronym: "MAP Dashboard", name: "Making Action Possible", category: "governance innovation", note: "SALC co-founder/partner" },
  { acronym: "MPA", name: "Metropolitan Pima Alliance", category: "infrastructure", note: "" },
  { acronym: "NALA", name: "Northern Arizona Leadership Alliance", category: "other", note: "Sister CEO leadership org" },
  { acronym: "P3", name: "Public-Private Partnership", category: "innovation governance", note: "" },
  { acronym: "PAD", name: "Planned Area Development", category: "infrastructure", note: "Zoning category" },
  { acronym: "PAG", name: "Pima Association of Governments", category: "governance infrastructure", note: "" },
  { acronym: "PCHD", name: "Pima County Health Department", category: "healthcare", note: "" },
  { acronym: "PDAC", name: "Prospectors and Developers Association of Canada", category: "infrastructure", note: "Mining/South32" },
  { acronym: "PEEPS", name: "Pima Early Education Program Scholarships", category: "education", note: "SALC helped found" },
  { acronym: "PID", name: "Public Improvement District", category: "infrastructure governance", note: "" },
  { acronym: "RMAP", name: "Regional Mobility and Accessibility Plan", category: "infrastructure", note: "PAG" },
  { acronym: "RTA", name: "Regional Transportation Authority", category: "infrastructure", note: "Ted is current chair" },
  { acronym: "RTP", name: "Regional Transportation Plan", category: "infrastructure", note: "MAG" },
  { acronym: "SABC", name: "Southern Arizona Business Caucus", category: "business-orgs innovation", note: "" },
  { acronym: "SADA", name: "Southern Arizona Defense Alliance", category: "business-orgs", note: "" },
  { acronym: "SAHBA", name: "Southern Arizona Home Builders Association", category: "business-orgs", note: "TBA partner" },
  { acronym: "SC", name: "Sun Corridor", category: "business-orgs infrastructure", note: "Planned roadway" },
  { acronym: "SCI", name: "Sun Corridor, Inc.", category: "business-orgs", note: "TBA partner" },
  { acronym: "SECAP", name: "Sahuarita East Concept Area Plan", category: "infrastructure", note: "" },
  { acronym: "SHS", name: "State Highway System", category: "infrastructure", note: "ADOT" },
  { acronym: "SSWC", name: "Safe and Sensible Water Committee", category: "infrastructure", note: "" },
  { acronym: "TAA/TUS", name: "Tucson Airport Authority / Tucson International Airport", category: "infrastructure", note: "" },
  { acronym: "TAR", name: "Tucson Association of Realtors", category: "business-orgs", note: "TBA partner" },
  { acronym: "TBA", name: "Tucson Business Alliance", category: "business-orgs", note: "SALC member organization" },
  { acronym: "THCC", name: "Tucson Hispanic Chamber of Commerce", category: "business-orgs", note: "TBA partner" },
  { acronym: "TIP", name: "Tucson Innovation Partnership", category: "innovation", note: "Convened by StartUp Tucson" },
  { acronym: "TMCC", name: "Tucson Metro Chamber of Commerce", category: "business-orgs", note: "TBA partner" },
  { acronym: "TREO", name: "Tucson Regional Economic Opportunities", category: "business-orgs", note: "Defunct; now Sun Corridor" },
  { acronym: "TRWC", name: "Tucson Regional Water Coalition", category: "infrastructure", note: "SALC-convened water ecosystem group" },
  { acronym: "TTCA", name: "Trade and Transportation Corridor Alliance", category: "infrastructure", note: "" },
  { acronym: "TVT", name: "Tucson Values Teachers", category: "education", note: "SALC stood up TVT" },
  { acronym: "TYP", name: "Tucson Young Professionals", category: "innovation", note: "SALC helped stand up TYP" },
  { acronym: "VT", name: "Visit Tucson", category: "business-orgs", note: "TBA partner" },
  { acronym: "WIFA", name: "Water Infrastructure Finance Authority of Arizona", category: "infrastructure", note: "" }
];

const grid = document.getElementById("acronymGrid");
const tabs = document.querySelectorAll(".tab-button");
const search = document.getElementById("acronymSearch");

let activeFilter = "all";

function renderAcronyms() {
  const query = search.value.toLowerCase();

  grid.innerHTML = "";

  acronyms
    .filter(item => activeFilter === "all" || item.category.includes(activeFilter))
    .filter(item =>
      item.acronym.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.note.toLowerCase().includes(query)
    )
    .forEach(item => {
      const card = document.createElement("div");
      card.className = "acronym-card";
      card.innerHTML = `
        <strong>${item.acronym}</strong>
        <span>${item.name}</span>
        ${item.note ? `<small>${item.note}</small>` : ""}
      `;
      grid.appendChild(card);
    });

  enhanceCards(".acronym-card", { selectable: true });
}

if (grid && search && tabs.length > 0) {
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeFilter = tab.dataset.filter;
      renderAcronyms();
    });
  });

  search.addEventListener("input", renderAcronyms);

  renderAcronyms();
}
