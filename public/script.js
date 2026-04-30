// ============================================================
// AERON CERTIFIED — Frontend Script
// ============================================================

// Auto-detect: local server vs Vercel (same path /api/order)
const API_ORDER = '/api/order';
let currentProduct = {};

// ── Location Data ─────────────────────────────────────────────
const locationData = {
  US: {
    label: 'United States',
    states: {
      'AL': { name: 'Alabama', cities: ['Birmingham', 'Montgomery', 'Huntsville', 'Mobile', 'Tuscaloosa'] },
      'AK': { name: 'Alaska', cities: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan'] },
      'AZ': { name: 'Arizona', cities: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Tempe', 'Gilbert'] },
      'AR': { name: 'Arkansas', cities: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro'] },
      'CA': { name: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento', 'Oakland', 'Fresno', 'Long Beach', 'Bakersfield', 'Anaheim'] },
      'CO': { name: 'Colorado', cities: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Boulder'] },
      'CT': { name: 'Connecticut', cities: ['Bridgeport', 'New Haven', 'Hartford', 'Stamford', 'Waterbury'] },
      'DE': { name: 'Delaware', cities: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna'] },
      'FL': { name: 'Florida', cities: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg', 'Hialeah', 'Fort Lauderdale', 'Tallahassee', 'Naples', 'Boca Raton'] },
      'GA': { name: 'Georgia', cities: ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah', 'Alpharetta', 'Sandy Springs'] },
      'HI': { name: 'Hawaii', cities: ['Honolulu', 'Pearl City', 'Hilo', 'Kailua', 'Waipahu'] },
      'ID': { name: 'Idaho', cities: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Pocatello'] },
      'IL': { name: 'Illinois', cities: ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford', 'Springfield', 'Peoria', 'Elgin'] },
      'IN': { name: 'Indiana', cities: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel', 'Fishers'] },
      'IA': { name: 'Iowa', cities: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'] },
      'KS': { name: 'Kansas', cities: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka', 'Lawrence'] },
      'KY': { name: 'Kentucky', cities: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'] },
      'LA': { name: 'Louisiana', cities: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles', 'Kenner'] },
      'ME': { name: 'Maine', cities: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn'] },
      'MD': { name: 'Maryland', cities: ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie', 'Annapolis'] },
      'MA': { name: 'Massachusetts', cities: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Newton', 'Quincy'] },
      'MI': { name: 'Michigan', cities: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Lansing', 'Ann Arbor', 'Flint'] },
      'MN': { name: 'Minnesota', cities: ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth', 'Bloomington', 'Brooklyn Park'] },
      'MS': { name: 'Mississippi', cities: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi'] },
      'MO': { name: 'Missouri', cities: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', "Lee's Summit", 'Independence'] },
      'MT': { name: 'Montana', cities: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte'] },
      'NE': { name: 'Nebraska', cities: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'] },
      'NV': { name: 'Nevada', cities: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks', 'Carson City'] },
      'NH': { name: 'New Hampshire', cities: ['Manchester', 'Nashua', 'Concord', 'Derry', 'Dover', 'Rochester'] },
      'NJ': { name: 'New Jersey', cities: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Trenton', 'Edison', 'Clifton'] },
      'NM': { name: 'New Mexico', cities: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell'] },
      'NY': { name: 'New York', cities: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'New Rochelle', 'Brooklyn', 'Queens', 'Staten Island'] },
      'NC': { name: 'North Carolina', cities: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary'] },
      'ND': { name: 'North Dakota', cities: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo'] },
      'OH': { name: 'Ohio', cities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton'] },
      'OK': { name: 'Oklahoma', cities: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton', 'Edmond'] },
      'OR': { name: 'Oregon', cities: ['Portland', 'Salem', 'Eugene', 'Gresham', 'Hillsboro', 'Beaverton', 'Bend'] },
      'PA': { name: 'Pennsylvania', cities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton', 'Lancaster'] },
      'RI': { name: 'Rhode Island', cities: ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence'] },
      'SC': { name: 'South Carolina', cities: ['Columbia', 'Charleston', 'North Charleston', 'Mount Pleasant', 'Rock Hill', 'Greenville'] },
      'SD': { name: 'South Dakota', cities: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown'] },
      'TN': { name: 'Tennessee', cities: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro'] },
      'TX': { name: 'Texas', cities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Lubbock', 'Irving', 'Laredo'] },
      'UT': { name: 'Utah', cities: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem', 'Sandy', 'St. George'] },
      'VT': { name: 'Vermont', cities: ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier'] },
      'VA': { name: 'Virginia', cities: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News', 'Alexandria', 'Hampton', 'Roanoke'] },
      'WA': { name: 'Washington', cities: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Kirkland', 'Renton', 'Olympia'] },
      'WV': { name: 'West Virginia', cities: ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling'] },
      'WI': { name: 'Wisconsin', cities: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine', 'Appleton'] },
      'WY': { name: 'Wyoming', cities: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs'] },
      'DC': { name: 'Washington D.C.', cities: ['Washington'] },
    }
  },
  CA: {
    label: 'Canada',
    states: {
      'AB': { name: 'Alberta', cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'St. Albert', 'Medicine Hat'] },
      'BC': { name: 'British Columbia', cities: ['Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Kelowna', 'Abbotsford', 'Victoria'] },
      'MB': { name: 'Manitoba', cities: ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie'] },
      'NB': { name: 'New Brunswick', cities: ['Moncton', 'Saint John', 'Fredericton', 'Dieppe', 'Riverview'] },
      'NL': { name: 'Newfoundland & Labrador', cities: ["St. John's", 'Mount Pearl', 'Corner Brook', "Conception Bay South", 'Grand Falls-Windsor'] },
      'NS': { name: 'Nova Scotia', cities: ['Halifax', 'Cape Breton', 'Truro', 'Amherst', 'New Glasgow'] },
      'NT': { name: 'Northwest Territories', cities: ['Yellowknife', 'Hay River', 'Inuvik', 'Fort Smith', 'Behchokǫ̀'] },
      'NU': { name: 'Nunavut', cities: ['Iqaluit', 'Rankin Inlet', 'Arviat', 'Baker Lake', 'Cambridge Bay'] },
      'ON': { name: 'Ontario', cities: ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'London', 'Markham', 'Vaughan', 'Kitchener', 'Windsor'] },
      'PE': { name: 'Prince Edward Island', cities: ['Charlottetown', 'Summerside', 'Stratford', 'Cornwall', 'Montague'] },
      'QC': { name: 'Quebec', cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke', 'Saguenay'] },
      'SK': { name: 'Saskatchewan', cities: ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current'] },
      'YT': { name: 'Yukon', cities: ['Whitehorse', 'Dawson City', 'Watson Lake', 'Haines Junction', 'Carmacks'] },
    }
  }
};

// ── Dropdown Handlers ─────────────────────────────────────────
function onCountryChange() {
  const countryCode = document.getElementById('country').value;
  const stateSelect = document.getElementById('state');
  const citySelect = document.getElementById('city');

  // Reset dependent dropdowns
  stateSelect.innerHTML = '<option value="">— Select State / Province —</option>';
  citySelect.innerHTML = '<option value="">— Select City —</option>';
  stateSelect.disabled = true;
  citySelect.disabled = true;

  if (!countryCode || !locationData[countryCode]) return;

  const states = locationData[countryCode].states;
  Object.entries(states).forEach(([code, info]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = info.name;
    stateSelect.appendChild(opt);
  });

  stateSelect.disabled = false;
}

function onStateChange() {
  const countryCode = document.getElementById('country').value;
  const stateCode = document.getElementById('state').value;
  const citySelect = document.getElementById('city');

  citySelect.innerHTML = '<option value="">— Select City —</option>';
  citySelect.disabled = true;

  if (!stateCode || !locationData[countryCode]) return;

  const cities = locationData[countryCode].states[stateCode]?.cities || [];
  cities.forEach(cityName => {
    const opt = document.createElement('option');
    opt.value = cityName;
    opt.textContent = cityName;
    citySelect.appendChild(opt);
  });

  citySelect.disabled = false;
}

// ── Open order modal ──────────────────────────────────────────
function openOrder(productId, productName, price) {
  currentProduct = { id: productId, name: productName, price: parseFloat(price) };

  document.getElementById('selected-product-id').value = productId;
  document.getElementById('modal-product-display').textContent = productName + ' — $' + price + ' USDT';
  updateTotal();

  // Reset to step 1 and reset form
  document.getElementById('modal-step-1').style.display = 'block';
  document.getElementById('modal-step-2').style.display = 'none';
  document.getElementById('order-form').reset();

  // Reset dropdowns
  document.getElementById('state').innerHTML = '<option value="">— Select Country First —</option>';
  document.getElementById('state').disabled = true;
  document.getElementById('city').innerHTML = '<option value="">— Select State First —</option>';
  document.getElementById('city').disabled = true;

  document.getElementById('order-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ── Update total when quantity changes ────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('quantity').addEventListener('change', updateTotal);
});

function updateTotal() {
  const qty = parseInt(document.getElementById('quantity').value) || 1;
  const total = (currentProduct.price * qty).toFixed(0);
  document.getElementById('order-total-display').textContent = total + ' USDT';
}

// ── Close modal ───────────────────────────────────────────────
function closeModal() {
  document.getElementById('order-modal').classList.remove('active');
  document.body.style.overflow = '';
  // Stop countdown timer
  if (paymentTimerInterval) { clearInterval(paymentTimerInterval); paymentTimerInterval = null; }
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('order-modal')) closeModal();
}

// ── Submit order ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('order-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const countryCode = document.getElementById('country').value;
    const countryLabel = countryCode === 'US' ? 'United States' : countryCode === 'CA' ? 'Canada' : countryCode;
    const stateCode = document.getElementById('state').value;
    const stateLabel = locationData[countryCode]?.states[stateCode]?.name || stateCode;

    const btn = document.getElementById('place-order-btn');
    btn.textContent = 'Processing...';
    btn.disabled = true;

    const payload = {
      productId: document.getElementById('selected-product-id').value,
      quantity: document.getElementById('quantity').value,
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      email: document.getElementById('email').value.trim(),
      address: document.getElementById('address').value.trim(),
      city: document.getElementById('city').value,
      state: stateLabel,
      zip: document.getElementById('zip').value.trim(),
      country: countryLabel,
    };

    try {
      const res = await fetch(API_ORDER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        document.getElementById('payment-order-id').textContent = data.orderId;
        document.getElementById('payment-amount').textContent = data.total + ' USDT';
        document.getElementById('wallet-address-display').textContent = data.walletAddress;

        // Generate QR code from wallet address
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.walletAddress)}&color=6c63ff&bgcolor=ffffff&margin=10`;
        document.getElementById('wallet-qr').src = qrUrl;

        document.getElementById('modal-step-1').style.display = 'none';
        document.getElementById('modal-step-2').style.display = 'block';
        startPaymentTimer(); // start 30-min countdown
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      alert('Connection error. Please try again.');
      console.error(err);
    } finally {
      btn.textContent = 'Proceed to Payment →';
      btn.disabled = false;
    }
  });
});

// ── Payment Timer ─────────────────────────────────────────────
let paymentTimerInterval = null;

function startPaymentTimer() {
  // Clear any existing timer
  if (paymentTimerInterval) clearInterval(paymentTimerInterval);

  const DURATION = 30 * 60; // 30 minutes in seconds
  let remaining = DURATION;
  const display = document.getElementById('timer-display');

  function update() {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    display.textContent = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

    // Last 5 minutes — turn urgent red + pulse
    if (remaining <= 300) {
      display.classList.add('urgent');
    }

    if (remaining <= 0) {
      clearInterval(paymentTimerInterval);
      display.textContent = '00:00';
      display.classList.add('urgent');

      // Update awaiting status to expired
      const awaiting = document.getElementById('awaiting-status');
      if (awaiting) {
        awaiting.querySelector('.pulse-dot').style.background = '#ff4d4d';
        awaiting.querySelector('.awaiting-text').textContent = 'Order expired — please place a new order.';
        awaiting.style.borderColor = 'rgba(255,77,77,0.3)';
        awaiting.style.background = 'rgba(255,77,77,0.07)';
        awaiting.querySelector('.awaiting-text').style.color = '#ff4d4d';
      }
      return;
    }
    remaining--;
  }

  update(); // run immediately
  paymentTimerInterval = setInterval(update, 1000);
}

// ── Copy wallet address ───────────────────────────────────────
function copyWallet() {
  const addr = document.getElementById('wallet-address-display').textContent;
  navigator.clipboard.writeText(addr).then(() => {
    const btn = document.querySelector('.btn-copy');
    btn.textContent = '✅ Copied!';
    setTimeout(() => { btn.textContent = '📋 Copy Address'; }, 2000);
  });
}

// ── FAQ accordion ─────────────────────────────────────────────
function toggleFaq(el) {
  const answer = el.nextElementSibling;
  const isOpen = el.classList.contains('open');

  document.querySelectorAll('.faq-q.open').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });

  if (!isOpen) {
    el.classList.add('open');
    answer.classList.add('open');
  }
}

// ── Header scroll effect ──────────────────────────────────────
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.style.background = window.scrollY > 50
    ? 'rgba(10,10,15,0.97)'
    : 'rgba(10,10,15,0.85)';
});
