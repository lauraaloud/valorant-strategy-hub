
/* ---------- PAGE NAVIGATION ---------- */

const pages = document.querySelectorAll('main > section');
const navLinks = document.querySelectorAll('nav a');

function showPage() {
  const pageId = window.location.hash.slice(1) || 'home';
  const selectedPage = document.getElementById(pageId);

  const activePage = [...pages].includes(selectedPage) ?
      selectedPage :
      document.getElementById('home');

  pages.forEach(page => {
    page.hidden = page !== activePage;
  });

  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${activePage.id}`;

    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', showPage);
showPage();


/* ---------- MAP TEAM COMPS ---------- */

// Strategy-based recommendations, not verified win-rate comps

const mapComps = {
  Abyss: {
    agents: ['Yoru', 'Sova', 'Omen', 'Harbor', 'Cypher'],
    description:
        'A double-controller comp focused on map control and information.',
    strengths:
        'Omen and Harbor cover long sightlines. Sova gathers information, Yoru creates pressure, and Cypher protects flanks.',
    counters:
        'Force the controllers to use utility early and rotate quickly to pressure less-defended areas.'
  },

  Ascent: {
    agents: ['Jett', 'Phoenix', 'Sova', 'Omen', 'Cypher'],
    description:
        'An aggressive comp with strong information gathering and site control.',
    strengths:
        'Jett and Phoenix create space, Sova gathers information, Omen provides smokes, and Cypher controls flanks.',
    counters:
        'Clear Cypher traps, pressure Omen utility, and use defensive abilities to slow down site entries.'
  },

  Bind: {
    agents: ['Raze', 'Fade', 'Brimstone', 'Viper', 'Cypher'],
    description:
        'A comp designed for clearing tight spaces and controlling sites.',
    strengths:
        'Raze and Fade clear corners together. Brimstone and Viper provide site control, while Cypher protects flanks.',
    counters:
        'Use teleporters to rotate quickly and avoid committing into heavy defensive utility.'
  },

  Breeze: {
    agents: ['Jett', 'Sova', 'Viper', 'Harbor', 'Cypher'],
    description:
        'A comp focused on long sightlines and controlling open areas.',
    strengths:
        'Jett can take long-range fights, Sova gathers information, Viper and Harbor block large sightlines, and Cypher protects flanks.',
    counters:
        'Pressure the controllers from multiple directions and clear Cypher utility before taking space.'
  },

  Corrode: {
    agents: ['Neon', 'Fade', 'Omen', 'Viper', 'Cypher'],
    description:
        'A fast-paced comp focused on taking space and controlling important areas.',
    strengths:
        'Neon creates space, Fade helps clear corners, Omen and Viper control sightlines, and Cypher watches flanks.',
    counters:
        'Use slows, traps, and coordinated crossfires to stop fast site entries.'
  },

  Fracture: {
    agents: ['Raze', 'Breach', 'Brimstone', 'Fade', 'Killjoy'],
    description:
        'A comp built around coordinated attacks from multiple directions.',
    strengths:
        'Breach and Fade help Raze enter sites. Brimstone provides smokes, and Killjoy helps secure territory after a push.',
    counters:
        'Gather early information, watch multiple entrances, and avoid being surrounded during site attacks.'
  },

  Haven: {
    agents: ['Neon', 'Phoenix', 'Sova', 'Omen', 'Chamber'],
    description: 'An aggressive comp that can pressure all three sites.',
    strengths:
        'Neon and Phoenix create space, Sova gathers information, Omen provides smokes, and Chamber holds long angles.',
    counters:
        'Slow down aggressive entries and pressure areas that Chamber is not watching.'
  },

  Icebox: {
    agents: ['Jett', 'Sova', 'Viper', 'Sage', 'Killjoy'],
    description:
        'A comp focused on vertical movement, site control, and safe plants.',
    strengths:
        'Jett can take elevated positions, Sova clears angles, Viper blocks sightlines, Sage supports plants, and Killjoy secures sites.',
    counters:
        'Use utility to clear elevated angles and prevent safe spike plants.'
  },

  Lotus: {
    agents: ['Raze', 'Skye', 'Omen', 'Viper', 'Vyse'],
    description:
        'A comp that combines strong site entries with defensive control.',
    strengths:
        'Raze and Skye clear sites, Omen and Viper control sightlines, and Vyse protects chokepoints.',
    counters:
        'Pressure multiple entrances at once to stretch defensive utility.'
  },

  Pearl: {
    agents: ['Jett', 'Fade', 'Astra', 'Harbor', 'Killjoy'],
    description: 'A comp focused on mid control and taking long-range fights.',
    strengths:
        'Jett takes space, Fade gathers information, Astra and Harbor control sightlines, and Killjoy protects flanks and sites.',
    counters:
        'Contest mid early and force the controllers to spend utility before committing to a site.'
  },

  Split: {
    agents: ['Neon', 'Yoru', 'Fade', 'Omen', 'Viper'],
    description:
        'An aggressive comp focused on fast entries and taking map control.',
    strengths:
        'Neon and Yoru create pressure, Fade clears angles, and Omen and Viper help control important areas.',
    counters:
        'Use defensive utility to delay entries and maintain control of mid.'
  },

  Summit: {
    agents: ['Neon', 'Fade', 'Omen', 'Chamber', 'Sage'],
    description: 'A comp combining fast entries with strong defensive utility.',
    strengths:
        'Neon and Fade take space, Omen provides smokes, Chamber holds angles, and Sage slows pushes.',
    counters:
        'Clear Sentinel utility and use coordinated flashes to challenge defended positions.'
  },

  Sunset: {
    agents: ['Neon', 'Fade', 'Omen', 'Chamber', 'Cypher'],
    description: 'A comp focused on mid control and defensive setups.',
    strengths:
        'Neon and Fade contest mid, Omen blocks sightlines, and Chamber and Cypher provide defensive coverage.',
    counters: 'Clear traps and contest mid before defenders establish control.'
  }
};


/* ---------- RESEARCH SOURCES ---------- */

const RESEARCH_SOURCES = [
  {
    name: 'VStats - Team Composition Statistics',
    url: 'https://www.vstats.gg/agents?table=comps&map=ALL'
  },
  {
    name: 'VLR.gg - Professional VALORANT Statistics',
    url: 'https://www.vlr.gg/'
  },
  {
    name: 'VALORANT Team Composition Guide',
    url: 'https://boostpirate.com/guides/valorant-team-comps-guide'
  }
];

/* ---------- VALORANT API ---------- */

const API_URL = 'https://valorant-api.com/v1';
let agents = [];

async function loadAgents() {
  try {
    const response = await fetch(`${API_URL}/agents?isPlayableCharacter=true`);

    if (!response.ok) {
      throw new Error('Could not load agents');
    }

    const result = await response.json();
    agents = result.data;
  } catch (error) {
    console.error('Error loading agents:', error);
  }
}


/* ---------- LOAD MAPS ---------- */

async function loadMaps() {
  const mapContainer = document.getElementById('map-container');

  if (!mapContainer) return;

  mapContainer.textContent = 'Loading maps...';

  try {
    const response = await fetch(`${API_URL}/maps`);

    if (!response.ok) {
      throw new Error('Could not load maps');
    }

    const result = await response.json();

    const maps =
        result.data.filter(map => mapComps[map.displayName] && map.splash);

    maps.sort((a, b) => a.displayName.localeCompare(b.displayName));

    mapContainer.replaceChildren();

    maps.forEach(map => {
      const card = document.createElement('article');
      card.className = 'card map-card';

      const image = document.createElement('img');
      image.src = map.splash;
      image.alt = `${map.displayName} map`;
      image.loading = 'lazy';

      const title = document.createElement('h3');
      title.textContent = map.displayName;

      const description = document.createElement('p');
      description.textContent = map.tacticalDescription || 'VALORANT map';

      const button = document.createElement('button');
      button.className = 'map-select';
      button.type = 'button';
      button.textContent = `View ${map.displayName} Comp`;

      button.addEventListener('click', () => {
        showMapDetails(map.displayName);
      });

      card.append(image, title, description, button);
      mapContainer.appendChild(card);
    });

  } catch (error) {
    mapContainer.textContent =
        'Couldn\'t load the maps. Please try again later.';

    console.error('Error loading maps:', error);
  }
}


/* ---------- SELECTED MAP ---------- */

function showMapDetails(mapName) {
  const details = document.getElementById('map-details');
  if (!details) return;

  const comp = mapComps[mapName];

  details.hidden = false;
  details.replaceChildren();

  const heading = document.createElement('h3');
  heading.textContent = `${mapName} Team Comp`;
  details.appendChild(heading);

  if (!comp) {
    const message = document.createElement('p');
    message.textContent = 'We haven\'t added a team comp for this map yet.';

    details.appendChild(message);
    scrollToDetails();
    return;
  }

  const label = document.createElement('p');
  label.className = 'comp-label';
  label.textContent = 'Suggested Team Composition';

  const description = document.createElement('p');
  description.textContent = comp.description;

  details.append(label, description);
  details.appendChild(createAgentCards(comp.agents));

  const strengthsHeading = document.createElement('h4');
  strengthsHeading.className = 'details-heading';
  strengthsHeading.textContent = 'Why This Comp Works';

  const strengthsText = document.createElement('p');
  strengthsText.textContent = comp.strengths;

  details.append(strengthsHeading, strengthsText);

  const countersHeading = document.createElement('h4');
  countersHeading.className = 'details-heading';
  countersHeading.textContent = 'Possible Counters';

  const countersText = document.createElement('p');
  countersText.textContent = comp.counters;

  details.append(countersHeading, countersText);

  const sourcesHeading = document.createElement('h4');
  sourcesHeading.className = 'details-heading';
  sourcesHeading.textContent = 'Research & Further Reading';

  const sourcesList = document.createElement('ul');
  sourcesList.className = 'source-list';

  RESEARCH_SOURCES.forEach(source => {
    const item = document.createElement('li');
    const link = document.createElement('a');

    link.href = source.url;
    link.textContent = source.name;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    item.appendChild(link);
    sourcesList.appendChild(item);
  });

  details.append(sourcesHeading, sourcesList);
  scrollToDetails();
}


/* ---------- AGENT CARDS ---------- */

function createAgentCards(agentNames) {
  const agentList = document.createElement('div');
  agentList.className = 'agent-list';

  agentNames.forEach(agentName => {
    const agent = agents.find(item => item.displayName === agentName);

    const card = document.createElement('article');
    card.className = 'agent-card';

    if (agent?.displayIcon) {
      const image = document.createElement('img');
      image.src = agent.displayIcon;
      image.alt = agentName;
      image.loading = 'lazy';

      card.appendChild(image);
    }

    const name = document.createElement('h4');
    name.textContent = agentName;

    const role = document.createElement('p');
    role.textContent = agent?.role?.displayName || 'Agent';

    card.append(name, role);
    agentList.appendChild(card);
  });

  return agentList;
}


/* ---------- SCROLL TO DETAILS ---------- */

function scrollToDetails() {
  const details = document.getElementById('map-details');
  if (!details) return;

  const reduceMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  details.scrollIntoView(
      {behavior: reduceMotion ? 'auto' : 'smooth', block: 'start'});
}

/* ---------- PLAYSTYLE COMPS ---------- */

const playstyleComps = {
  Abyss: {
    balanced: {
      agents: ['Yoru', 'Sova', 'Omen', 'Harbor', 'Cypher'],
      description:
          'A balanced comp focused on information and controlling long sightlines.',
      strengths:
          'Yoru creates pressure, Sova gathers information, Omen and Harbor control sightlines, and Cypher watches flanks.'
    },
    aggressive: {
      agents: ['Jett', 'Yoru', 'Sova', 'Omen', 'Cypher'],
      description: 'An aggressive comp focused on taking space quickly.',
      strengths:
          'Jett and Yoru pressure defenders, Sova reveals positions, Omen supports entries, and Cypher secures flanks.'
    },
    defensive: {
      agents: ['Cypher', 'Killjoy', 'Sova', 'Omen', 'Viper'],
      description: 'A defensive comp focused on holding important areas.',
      strengths:
          'Cypher and Killjoy watch entrances, Sova provides information, and Omen and Viper delay pushes.'
    }
  },

  Ascent: {
    balanced: {
      agents: ['Jett', 'Sova', 'Omen', 'KAY/O', 'Killjoy'],
      description:
          'A balanced comp with entry, information, flashes, smokes, and site control.',
      strengths:
          'Jett creates space, Sova gathers information, Omen provides smokes, KAY/O supports entries, and Killjoy holds sites.'
    },
    aggressive: {
      agents: ['Jett', 'Phoenix', 'Sova', 'Omen', 'Cypher'],
      description:
          'An aggressive comp focused on taking space and winning early fights.',
      strengths:
          'Jett and Phoenix lead entries, Sova finds enemies, Omen supports pushes, and Cypher watches flanks.'
    },
    defensive: {
      agents: ['Killjoy', 'Cypher', 'Sova', 'Omen', 'Sage'],
      description:
          'A defensive comp focused on slowing pushes and holding sites.',
      strengths:
          'Killjoy and Cypher watch important areas, Sage slows enemies, Sova gathers information, and Omen blocks sightlines.'
    }
  },

  Bind: {
    balanced: {
      agents: ['Raze', 'Fade', 'Brimstone', 'Viper', 'Cypher'],
      description:
          'A balanced comp for clearing tight spaces and controlling sites.',
      strengths:
          'Raze and Fade clear corners, Brimstone and Viper control sightlines, and Cypher watches flanks.'
    },
    aggressive: {
      agents: ['Raze', 'Gekko', 'Breach', 'Brimstone', 'Cypher'],
      description: 'An aggressive comp built for fast site entries.',
      strengths:
          'Raze and Breach pressure defenders, Gekko helps clear space and plant, Brimstone provides smokes, and Cypher watches flanks.'
    },
    defensive: {
      agents: ['Cypher', 'Killjoy', 'Viper', 'Brimstone', 'Fade'],
      description:
          'A defensive comp focused on delaying pushes through chokepoints.',
      strengths:
          'Cypher and Killjoy control entrances, Viper and Brimstone delay enemies, and Fade gathers information.'
    }
  },

  Breeze: {
    balanced: {
      agents: ['Jett', 'Sova', 'Viper', 'Harbor', 'Cypher'],
      description: 'A balanced comp for long sightlines and open areas.',
      strengths:
          'Jett takes space, Sova gathers information, Viper and Harbor block sightlines, and Cypher watches flanks.'
    },
    aggressive: {
      agents: ['Jett', 'Yoru', 'Sova', 'Viper', 'Cypher'],
      description: 'An aggressive comp focused on taking long-range space.',
      strengths:
          'Jett and Yoru pressure defenders, Sova reveals positions, Viper provides cover, and Cypher secures flanks.'
    },
    defensive: {
      agents: ['Chamber', 'Cypher', 'Sova', 'Viper', 'Harbor'],
      description: 'A defensive comp built around holding long angles.',
      strengths:
          'Chamber holds long sightlines, Cypher watches flanks, Sova gathers information, and Viper and Harbor control open areas.'
    }
  },

  Corrode: {
    balanced: {
      agents: ['Neon', 'Fade', 'Omen', 'Viper', 'Cypher'],
      description: 'A balanced comp combining fast entries and area control.',
      strengths:
          'Neon creates space, Fade clears corners, Omen and Viper control sightlines, and Cypher watches flanks.'
    },
    aggressive: {
      agents: ['Neon', 'Raze', 'Fade', 'Omen', 'Cypher'],
      description: 'An aggressive comp focused on overwhelming defenders.',
      strengths:
          'Neon and Raze push into sites, Fade gathers information, Omen provides smokes, and Cypher protects flanks.'
    },
    defensive: {
      agents: ['Cypher', 'Vyse', 'Fade', 'Omen', 'Viper'],
      description: 'A defensive comp focused on controlling entrances.',
      strengths:
          'Cypher and Vyse delay attackers, Fade reveals enemies, and Omen and Viper block sightlines.'
    }
  },

  Fracture: {
    balanced: {
      agents: ['Raze', 'Breach', 'Brimstone', 'Fade', 'Killjoy'],
      description:
          'A balanced comp for coordinated attacks from multiple directions.',
      strengths:
          'Raze and Breach create space, Fade gathers information, Brimstone provides smokes, and Killjoy secures territory.'
    },
    aggressive: {
      agents: ['Raze', 'Neon', 'Breach', 'Brimstone', 'Killjoy'],
      description:
          'An aggressive comp built for fast attacks from multiple entrances.',
      strengths:
          'Raze and Neon lead pushes, Breach supports with stuns, Brimstone provides smokes, and Killjoy watches flanks.'
    },
    defensive: {
      agents: ['Killjoy', 'Cypher', 'Breach', 'Brimstone', 'Fade'],
      description: 'A defensive comp focused on watching multiple entrances.',
      strengths:
          'Killjoy and Cypher provide coverage, Breach delays pushes, Brimstone controls sightlines, and Fade reveals enemies.'
    }
  },

  Haven: {
    balanced: {
      agents: ['Jett', 'Sova', 'Omen', 'Breach', 'Killjoy'],
      description: 'A balanced comp for controlling three sites.',
      strengths:
          'Jett creates space, Sova gathers information, Omen provides smokes, Breach supports entries, and Killjoy watches important areas.'
    },
    aggressive: {
      agents: ['Neon', 'Phoenix', 'Sova', 'Omen', 'Chamber'],
      description: 'An aggressive comp focused on pressuring all three sites.',
      strengths:
          'Neon and Phoenix create space, Sova reveals defenders, Omen provides smokes, and Chamber holds angles.'
    },
    defensive: {
      agents: ['Cypher', 'Killjoy', 'Sova', 'Omen', 'Breach'],
      description:
          'A defensive comp focused on gathering information and delaying attacks.',
      strengths:
          'Cypher and Killjoy watch sites, Sova gathers information, Omen blocks sightlines, and Breach slows pushes.'
    }
  },

  Icebox: {
    balanced: {
      agents: ['Jett', 'Sova', 'Viper', 'Sage', 'Killjoy'],
      description: 'A balanced comp for vertical movement and safe plants.',
      strengths:
          'Jett takes elevated positions, Sova clears angles, Viper provides cover, Sage supports plants, and Killjoy secures sites.'
    },
    aggressive: {
      agents: ['Jett', 'Raze', 'Sova', 'Viper', 'Killjoy'],
      description: 'An aggressive comp focused on taking elevated space.',
      strengths:
          'Jett and Raze pressure defenders, Sova reveals positions, Viper blocks sightlines, and Killjoy watches flanks.'
    },
    defensive: {
      agents: ['Killjoy', 'Sage', 'Sova', 'Viper', 'Chamber'],
      description: 'A defensive comp focused on controlling plant areas.',
      strengths:
          'Killjoy and Sage delay pushes, Sova gathers information, Viper controls sightlines, and Chamber holds angles.'
    }
  },

  Lotus: {
    balanced: {
      agents: ['Raze', 'Skye', 'Omen', 'Viper', 'Vyse'],
      description: 'A balanced comp combining strong entries and site defense.',
      strengths:
          'Raze and Skye clear sites, Omen and Viper provide cover, and Vyse controls chokepoints.'
    },
    aggressive: {
      agents: ['Raze', 'Neon', 'Fade', 'Omen', 'Cypher'],
      description:
          'An aggressive comp for quick attacks through multiple entrances.',
      strengths:
          'Raze and Neon create pressure, Fade gathers information, Omen provides smokes, and Cypher protects flanks.'
    },
    defensive: {
      agents: ['Killjoy', 'Vyse', 'Skye', 'Omen', 'Viper'],
      description: 'A defensive comp focused on controlling site entrances.',
      strengths:
          'Killjoy and Vyse delay attackers, Skye gathers information, and Omen and Viper control sightlines.'
    }
  },

  Pearl: {
    balanced: {
      agents: ['Jett', 'Fade', 'Astra', 'Harbor', 'Killjoy'],
      description:
          'A balanced comp focused on mid control and long sightlines.',
      strengths:
          'Jett takes space, Fade reveals defenders, Astra and Harbor control sightlines, and Killjoy secures territory.'
    },
    aggressive: {
      agents: ['Jett', 'Phoenix', 'Fade', 'Astra', 'Cypher'],
      description:
          'An aggressive comp focused on winning mid and entering sites.',
      strengths:
          'Jett and Phoenix lead pushes, Fade gathers information, Astra provides smokes, and Cypher watches flanks.'
    },
    defensive: {
      agents: ['Killjoy', 'Cypher', 'Fade', 'Astra', 'Viper'],
      description:
          'A defensive comp focused on holding mid and site entrances.',
      strengths:
          'Killjoy and Cypher cover important areas, Fade gathers information, and Astra and Viper delay pushes.'
    }
  },

  Split: {
    balanced: {
      agents: ['Raze', 'Fade', 'Omen', 'Viper', 'Cypher'],
      description:
          'A balanced comp focused on controlling mid and tight entrances.',
      strengths:
          'Raze and Fade clear space, Omen and Viper control sightlines, and Cypher protects flanks.'
    },
    aggressive: {
      agents: ['Neon', 'Yoru', 'Fade', 'Omen', 'Viper'],
      description: 'An aggressive comp for fast entries and map control.',
      strengths:
          'Neon and Yoru create pressure, Fade reveals enemies, and Omen and Viper help control important areas.'
    },
    defensive: {
      agents: ['Cypher', 'Sage', 'Fade', 'Omen', 'Viper'],
      description:
          'A defensive comp focused on slowing attacks through narrow areas.',
      strengths:
          'Cypher watches entrances, Sage slows pushes, Fade gathers information, and Omen and Viper block sightlines.'
    }
  },

  Summit: {
    balanced: {
      agents: ['Neon', 'Fade', 'Omen', 'Chamber', 'Sage'],
      description:
          'A balanced comp combining fast entries and defensive utility.',
      strengths:
          'Neon and Fade take space, Omen provides smokes, Chamber holds angles, and Sage slows enemies.'
    },
    aggressive: {
      agents: ['Neon', 'Raze', 'Fade', 'Omen', 'Chamber'],
      description: 'An aggressive comp focused on taking space quickly.',
      strengths:
          'Neon and Raze pressure defenders, Fade gathers information, Omen provides cover, and Chamber watches angles.'
    },
    defensive: {
      agents: ['Cypher', 'Sage', 'Fade', 'Omen', 'Chamber'],
      description:
          'A defensive comp focused on slowing attacks and holding positions.',
      strengths:
          'Cypher and Sage delay enemies, Fade provides information, Omen blocks sightlines, and Chamber holds angles.'
    }
  },

  Sunset: {
    balanced: {
      agents: ['Raze', 'Fade', 'Omen', 'Cypher', 'KAY/O'],
      description: 'A balanced comp focused on mid control and site entries.',
      strengths:
          'Raze creates space, Fade gathers information, Omen provides smokes, Cypher watches flanks, and KAY/O supports pushes.'
    },
    aggressive: {
      agents: ['Neon', 'Phoenix', 'Fade', 'Omen', 'Cypher'],
      description:
          'An aggressive comp focused on fast entries and mid pressure.',
      strengths:
          'Neon and Phoenix pressure defenders, Fade reveals enemies, Omen provides smokes, and Cypher protects flanks.'
    },
    defensive: {
      agents: ['Cypher', 'Killjoy', 'Fade', 'Omen', 'Sage'],
      description:
          'A defensive comp focused on holding mid and slowing site pushes.',
      strengths:
          'Cypher and Killjoy watch important areas, Fade gathers information, Omen provides smokes, and Sage slows attackers.'
    }
  }
};


/* ---------- TEAM COMPS PAGE ---------- */

function setupTeamComps() {
  const mapSelect = document.getElementById('comp-map');
  const styleSelect = document.getElementById('comp-style');

  if (!mapSelect || !styleSelect) return;

  Object.keys(mapComps).sort().forEach(mapName => {
    const option = document.createElement('option');
    option.value = mapName;
    option.textContent = mapName;
    mapSelect.appendChild(option);
  });

  mapSelect.addEventListener('change', showTeamComp);
  styleSelect.addEventListener('change', showTeamComp);
}


function showTeamComp() {
  const mapName = document.getElementById('comp-map').value;
  const playstyle = document.getElementById('comp-style').value;
  const container = document.getElementById('comps-container');

  if (!container) return;

  container.replaceChildren();

  if (!mapName) {
    container.textContent = 'Select a map to see a recommended team comp.';
    return;
  }

  const comp = playstyleComps[mapName]?.[playstyle] || mapComps[mapName];

  const heading = document.createElement('h3');
  heading.textContent = `${mapName} Team Comp`;

  const description = document.createElement('p');
  description.textContent = comp.description;

  const styleNote = document.createElement('p');
  styleNote.className = 'comp-label';

  const styleName = playstyle.charAt(0).toUpperCase() + playstyle.slice(1);

  styleNote.textContent = `Playstyle: ${styleName}`;

  const agentList = createAgentCards(comp.agents);

  const strengthsHeading = document.createElement('h4');
  strengthsHeading.className = 'details-heading';
  strengthsHeading.textContent = 'Why This Comp Works';

  const strengths = document.createElement('p');
  strengths.textContent = comp.strengths;

  container.append(
      heading, description, styleNote, agentList, strengthsHeading, strengths);
}

/* ---------- AGENT COUNTERS ---------- */

// Strategy-based recommendations for playable agents

const agentCounters = {
  Astra: [
    {
      name: 'KAY/O',
      reason:
          'Suppression can interrupt Astra’s ability use and make coordinated pushes harder.'
    },
    {
      name: 'Sova',
      reason:
          'Recon abilities help locate defenders playing around Astra’s utility.'
    },
    {
      name: 'Breach',
      reason:
          'Stuns and flashes can force enemies out of positions protected by Astra’s smokes.'
    }
  ],

  Breach: [
    {
      name: 'KAY/O',
      reason:
          'Suppression can stop Breach from using his utility while affected.'
    },
    {
      name: 'Jett',
      reason:
          'Her mobility helps her reposition quickly and avoid predictable utility.'
    },
    {
      name: 'Yoru',
      reason:
          'Teleportation can create unexpected angles and pressure Breach from another direction.'
    }
  ],

  Brimstone: [
    {
      name: 'KAY/O',
      reason:
          'Suppression can prevent Brimstone from using abilities while affected.'
    },
    {
      name: 'Sova',
      reason: 'Recon helps identify defenders playing around his smokes.'
    },
    {
      name: 'Yoru',
      reason:
          'Teleportation can create pressure away from areas Brimstone is controlling.'
    }
  ],

  Chamber: [
    {
      name: 'KAY/O',
      reason: 'Suppression can limit Chamber’s ability use during a fight.'
    },
    {name: 'Breach', reason: 'Stuns can force Chamber off strong angles.'}, {
      name: 'Fade',
      reason: 'Her information abilities can reveal where Chamber is holding.'
    }
  ],

  Clove: [
    {
      name: 'KAY/O',
      reason: 'Suppression can limit Clove’s abilities while affected.'
    },
    {
      name: 'Sova',
      reason: 'Recon helps locate enemies playing around Clove’s smokes.'
    },
    {
      name: 'Breach',
      reason: 'Stuns and flashes can pressure Clove before they take a fight.'
    }
  ],

  Cypher: [
    {
      name: 'Raze',
      reason: 'Explosive utility can destroy traps and clear defensive setups.'
    },
    {
      name: 'Sova',
      reason: 'Shock utility can help destroy Cypher’s equipment.'
    },
    {
      name: 'KAY/O',
      reason:
          'Suppression can prevent Cypher from activating abilities while affected.'
    }
  ],

  Deadlock: [
    {
      name: 'Raze',
      reason:
          'Explosive utility can pressure areas protected by Deadlock’s setup.'
    },
    {name: 'KAY/O', reason: 'Suppression can limit Deadlock’s ability use.'}, {
      name: 'Sova',
      reason: 'Recon helps identify defenders holding behind her utility.'
    }
  ],

  Fade: [
    {
      name: 'KAY/O',
      reason:
          'Suppression can prevent Fade from using information abilities while affected.'
    },
    {
      name: 'Yoru',
      reason:
          'Teleportation can create unexpected pressure and make tracking movements harder.'
    },
    {
      name: 'Jett',
      reason: 'Mobility helps Jett quickly reposition after being revealed.'
    }
  ],

  Gekko: [
    {name: 'KAY/O', reason: 'Suppression can limit Gekko’s ability use.'}, {
      name: 'Raze',
      reason:
          'Explosive utility can pressure Gekko and his teammates during coordinated pushes.'
    },
    {
      name: 'Breach',
      reason: 'Stuns and flashes can disrupt Gekko’s attempts to take space.'
    }
  ],

  Harbor: [
    {name: 'KAY/O', reason: 'Suppression can interrupt Harbor’s ability use.'},
    {
      name: 'Sova',
      reason: 'Recon helps reveal enemies hiding around Harbor’s walls.'
    },
    {
      name: 'Breach',
      reason: 'Stuns can pressure defenders behind Harbor’s cover.'
    }
  ],

  Iso: [
    {
      name: 'KAY/O',
      reason:
          'Suppression can stop Iso from activating abilities while affected.'
    },
    {
      name: 'Breach',
      reason: 'Stuns and flashes make it harder for Iso to win isolated fights.'
    },
    {
      name: 'Cypher',
      reason: 'Trapwires can catch Iso when he pushes into a site.'
    }
  ],

  Jett: [
    {
      name: 'KAY/O',
      reason:
          'Suppression can prevent Jett from using her movement abilities while affected.'
    },
    {
      name: 'Cypher',
      reason: 'Trapwires can catch Jett when she enters a site.'
    },
    {
      name: 'Breach',
      reason:
          'Stuns and flashes make it harder for Jett to take aggressive fights.'
    }
  ],

  'KAY/O': [
    {
      name: 'Sova',
      reason: 'Recon can reveal KAY/O’s position before he uses suppression.'
    },
    {
      name: 'Jett',
      reason:
          'Mobility can help Jett reposition before KAY/O’s utility reaches her.'
    },
    {
      name: 'Cypher',
      reason:
          'Passive information from traps can help track KAY/O without relying on active abilities.'
    }
  ],

  Killjoy: [
    {
      name: 'KAY/O',
      reason: 'Suppression can temporarily disable Killjoy’s utility.'
    },
    {
      name: 'Raze',
      reason: 'Explosive abilities can destroy defensive equipment.'
    },
    {name: 'Sova', reason: 'Shock utility can help clear Killjoy’s setups.'}
  ],

  Neon: [
    {name: 'Cypher', reason: 'Trapwires can stop or punish fast entries.'}, {
      name: 'Sage',
      reason:
          'Slow Orbs can make it harder for Neon to rush through chokepoints.'
    },
    {
      name: 'KAY/O',
      reason:
          'Suppression can prevent Neon from using movement abilities while affected.'
    }
  ],

  Omen: [
    {
      name: 'KAY/O',
      reason:
          'Suppression can prevent Omen from using his abilities while affected.'
    },
    {name: 'Sova', reason: 'Recon helps locate Omen after he repositions.'}, {
      name: 'Breach',
      reason: 'Stuns and flashes can pressure Omen when he plays around smokes.'
    }
  ],

  Phoenix: [
    {
      name: 'KAY/O',
      reason:
          'Suppression can prevent Phoenix from using flashes and other abilities while affected.'
    },
    {
      name: 'Cypher',
      reason: 'Trapwires can punish Phoenix when he pushes aggressively.'
    },
    {
      name: 'Breach',
      reason: 'Stuns can interrupt Phoenix’s attempts to take space.'
    }
  ],

  Raze: [
    {
      name: 'KAY/O',
      reason: 'Suppression can stop Raze from using abilities while affected.'
    },
    {
      name: 'Cypher',
      reason: 'Traps can punish Raze when she pushes into a site.'
    },
    {
      name: 'Sage',
      reason: 'Slow Orbs can make it harder for Raze to push quickly.'
    }
  ],

  Reyna: [
    {
      name: 'KAY/O',
      reason:
          'Suppression can prevent Reyna from using abilities while affected.'
    },
    {
      name: 'Breach',
      reason:
          'Flashes and stuns can make it harder for Reyna to win isolated fights.'
    },
    {name: 'Cypher', reason: 'Traps can reveal Reyna when she tries to push.'}
  ],

  Sage: [
    {
      name: 'Raze',
      reason: 'Explosive utility can damage Sage’s Barrier Orb wall.'
    },
    {
      name: 'KAY/O',
      reason:
          'Suppression can prevent Sage from using abilities while affected.'
    },
    {
      name: 'Sova',
      reason: 'Recon can reveal defenders holding behind Sage’s wall.'
    }
  ],

  Skye: [
    {
      name: 'KAY/O',
      reason:
          'Suppression can prevent Skye from using her abilities while affected.'
    },
    {
      name: 'Jett',
      reason:
          'Mobility can help Jett quickly reposition away from Skye’s utility.'
    },
    {
      name: 'Cypher',
      reason: 'Traps can provide information about Skye’s team as they push.'
    }
  ],

  Sova: [
    {
      name: 'KAY/O',
      reason:
          'Suppression can stop Sova from using information abilities while affected.'
    },
    {
      name: 'Yoru',
      reason: 'Teleportation can make it harder for Sova to track rotations.'
    },
    {
      name: 'Jett',
      reason: 'Mobility can help Jett reposition after being revealed.'
    }
  ],

  Tejo: [
    {name: 'KAY/O', reason: 'Suppression can interrupt Tejo’s ability use.'}, {
      name: 'Jett',
      reason: 'Mobility can help Jett escape areas targeted by Tejo’s utility.'
    },
    {
      name: 'Cypher',
      reason: 'Traps can help track Tejo’s team before they commit to a push.'
    }
  ],

  Viper: [
    {name: 'KAY/O', reason: 'Suppression can interrupt Viper’s ability use.'}, {
      name: 'Sova',
      reason: 'Recon can help locate enemies playing around Viper’s smoke.'
    },
    {
      name: 'Breach',
      reason: 'Stuns can pressure defenders holding behind Viper’s wall.'
    }
  ],

  Vyse: [
    {name: 'KAY/O', reason: 'Suppression can limit Vyse’s ability use.'}, {
      name: 'Raze',
      reason: 'Explosive utility can help pressure Vyse’s defensive positions.'
    },
    {name: 'Sova', reason: 'Recon helps identify where Vyse is holding.'}
  ],

  Waylay: [
    {
      name: 'Cypher',
      reason: 'Trapwires can punish Waylay when she enters a site.'
    },
    {
      name: 'KAY/O',
      reason:
          'Suppression can prevent Waylay from using mobility abilities while affected.'
    },
    {
      name: 'Sage',
      reason: 'Slow Orbs can make it harder for Waylay to push quickly.'
    }
  ],

  Yoru: [
    {name: 'Cypher', reason: 'Traps can reveal Yoru when he tries to flank.'},
    {name: 'KAY/O', reason: 'Suppression can limit Yoru’s ability use.'}, {
      name: 'Breach',
      reason:
          'Stuns and flashes can pressure Yoru when he appears from unexpected angles.'
    }
  ]
};


/* ---------- COUNTER DROPDOWN ---------- */

function setupAgentCounters() {
  const select = document.getElementById('counter-agent');

  if (!select) return;

  agents.slice()
      .sort((a, b) => a.displayName.localeCompare(b.displayName))
      .forEach(agent => {
        const option = document.createElement('option');
        option.value = agent.displayName;
        option.textContent = agent.displayName;
        select.appendChild(option);
      });

  select.addEventListener('change', showAgentCounters);
}


/* ---------- DISPLAY AGENT COUNTERS ---------- */

function showAgentCounters() {
  const agentName = document.getElementById('counter-agent').value;

  const container = document.getElementById('counters-container');

  if (!container) return;

  container.replaceChildren();

  if (!agentName) {
    container.textContent = 'Select an enemy agent to see their counters.';
    return;
  }

  const selectedAgent = agents.find(agent => agent.displayName === agentName);

  // Show selected enemy agent first
  const enemySection = document.createElement('div');
  enemySection.className = 'enemy-agent';

  const heading = document.createElement('h3');
  heading.textContent = `How to Counter ${agentName}`;
  enemySection.appendChild(heading);

  if (selectedAgent?.displayIcon) {
    const image = document.createElement('img');
    image.src = selectedAgent.displayIcon;
    image.alt = `${agentName} portrait`;
    image.loading = 'lazy';

    enemySection.appendChild(image);
  }

  const enemyName = document.createElement('h4');
  enemyName.textContent = agentName;

  enemySection.appendChild(enemyName);
  container.appendChild(enemySection);

  // Find counter recommendations
  const counters = agentCounters[agentName];

  if (!counters) {
    const message = document.createElement('p');
    message.textContent =
        'Counter recommendations for this agent are coming soon.';

    container.appendChild(message);
    return;
  }

  const counterHeading = document.createElement('h3');
  counterHeading.textContent = `Agents That Counter ${agentName}`;

  container.appendChild(counterHeading);

  // Display counter agent pictures and explanations
  const counterGrid = document.createElement('div');
  counterGrid.className = 'counter-grid';

  counters.forEach(counter => {
    const agent = agents.find(item => item.displayName === counter.name);

    const card = document.createElement('article');
    card.className = 'counter-card';

    if (agent?.displayIcon) {
      const image = document.createElement('img');
      image.src = agent.displayIcon;
      image.alt = `${counter.name} portrait`;
      image.loading = 'lazy';

      card.appendChild(image);
    }

    const name = document.createElement('h4');
    name.textContent = counter.name;

    const reason = document.createElement('p');
    reason.textContent = counter.reason;

    card.append(name, reason);
    counterGrid.appendChild(card);
  });

  container.appendChild(counterGrid);
}

/* ---------- PRO CROSSHAIRS ---------- */

// Sample crosshair presets.
// These are not verified current professional player settings.

const crosshairPresets = [
  {
    name: 'Cyan Dot',
    style: 'dot',
    color: '#00ffff',
    code: '0;P;c;5;h;0;d;1;z;2;f;0;0b;0;1b;0'
  },
  {
    name: 'Green Dot',
    style: 'dot',
    color: '#00ff00',
    code: '0;P;c;1;h;0;d;1;z;2;f;0;0b;0;1b;0'
  },
  {
    name: 'White Dot',
    style: 'dot',
    color: '#ffffff',
    code: '0;P;c;0;h;0;d;1;z;2;f;0;0b;0;1b;0'
  },
  {
    name: 'Cyan Small Cross',
    style: 'small',
    color: '#00ffff',
    code: '0;P;c;5;h;0;f;0;0l;2;0o;1;0a;1;0f;0;1b;0'
  },
  {
    name: 'Green Small Cross',
    style: 'small',
    color: '#00ff00',
    code: '0;P;c;1;h;0;f;0;0l;2;0o;1;0a;1;0f;0;1b;0'
  },
  {
    name: 'White Small Cross',
    style: 'small',
    color: '#ffffff',
    code: '0;P;c;0;h;0;f;0;0l;2;0o;1;0a;1;0f;0;1b;0'
  },
  {
    name: 'Cyan Classic Cross',
    style: 'classic',
    color: '#00ffff',
    code: '0;P;c;5;h;0;f;0;0l;5;0o;2;0a;1;0f;0;1b;0'
  },
  {
    name: 'Green Classic Cross',
    style: 'classic',
    color: '#00ff00',
    code: '0;P;c;1;h;0;f;0;0l;5;0o;2;0a;1;0f;0;1b;0'
  },
  {
    name: 'White Classic Cross',
    style: 'classic',
    color: '#ffffff',
    code: '0;P;c;0;h;0;f;0;0l;5;0o;2;0a;1;0f;0;1b;0'
  }
];


/* ---------- CROSSHAIR FILTER ---------- */

function setupCrosshairs() {
  const styleSelect = document.getElementById('crosshair-style');

  if (!styleSelect) return;

  styleSelect.addEventListener('change', showCrosshairs);

  showCrosshairs();
}


/* ---------- DISPLAY CROSSHAIRS ---------- */

function showCrosshairs() {
  const container = document.getElementById('crosshair-container');
  const styleSelect = document.getElementById('crosshair-style');

  if (!container || !styleSelect) return;

  const selectedStyle = styleSelect.value;

  container.replaceChildren();

  const filteredPresets = crosshairPresets.filter(
      preset => selectedStyle === 'all' || preset.style === selectedStyle);

  if (filteredPresets.length === 0) {
    container.textContent = 'No crosshairs found for this style.';
    return;
  }

  filteredPresets.forEach(preset => {
    const card = document.createElement('article');
    card.className = 'crosshair-card';

    const heading = document.createElement('h3');
    heading.textContent = preset.name;

    const style = document.createElement('p');

    const styleNames = {
      dot: 'Dot',
      small: 'Small Cross',
      classic: 'Classic Cross'
    };

    style.textContent = `Style: ${styleNames[preset.style]}`;

    const preview = document.createElement('div');
    preview.className = 'crosshair-preview';
    preview.setAttribute('aria-label', `${preset.name} preview`);

    preview.appendChild(createCrosshairPreview(preset));

    const code = document.createElement('code');
    code.className = 'crosshair-code';
    code.textContent = preset.code;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-crosshair';
    button.textContent = 'Copy Crosshair Code';

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(preset.code);
        button.textContent = 'Copied!';
      } catch (error) {
        // Fallback for browsers without clipboard access
        const textArea = document.createElement('textarea');

        textArea.value = preset.code;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);
        textArea.select();

        const copied = document.execCommand('copy');
        textArea.remove();

        button.textContent =
            copied ? 'Copied!' : 'Select and copy the code above';
      }
    });

    card.append(heading, style, preview, code, button);

    container.appendChild(card);
  });
}


/* ---------- CROSSHAIR PREVIEWS ---------- */

function createCrosshairPreview(preset) {
  const crosshair = document.createElement('div');

  crosshair.style.position = 'relative';
  crosshair.style.width = '50px';
  crosshair.style.height = '50px';
  crosshair.style.zIndex = '1';

  if (preset.style === 'dot') {
    const dot = document.createElement('div');

    dot.style.position = 'absolute';
    dot.style.width = '5px';
    dot.style.height = '5px';
    dot.style.backgroundColor = preset.color;
    dot.style.left = '50%';
    dot.style.top = '50%';
    dot.style.transform = 'translate(-50%, -50%)';

    crosshair.appendChild(dot);

  } else {
    const isSmall = preset.style === 'small';

    const length = isSmall ? 7 : 12;
    const gap = isSmall ? 3 : 5;
    const thickness = 2;

    const lines = [
      {
        left: 25 - thickness / 2,
        top: 25 - gap - length,
        width: thickness,
        height: length
      },
      {
        left: 25 - thickness / 2,
        top: 25 + gap,
        width: thickness,
        height: length
      },
      {
        left: 25 - gap - length,
        top: 25 - thickness / 2,
        width: length,
        height: thickness
      },
      {
        left: 25 + gap,
        top: 25 - thickness / 2,
        width: length,
        height: thickness
      }
    ];

    lines.forEach(line => {
      const segment = document.createElement('div');

      segment.style.position = 'absolute';
      segment.style.left = `${line.left}px`;
      segment.style.top = `${line.top}px`;
      segment.style.width = `${line.width}px`;
      segment.style.height = `${line.height}px`;
      segment.style.backgroundColor = preset.color;

      crosshair.appendChild(segment);
    });
  }

  return crosshair;
}


/* ---------- START APP ---------- */

async function startApp() {
  setupTeamComps();

  await loadAgents();

  setupAgentCounters();
  setupCrosshairs();

  await loadMaps();
}

startApp();
