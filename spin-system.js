/* =========================================================
   CRAZY TOP UP — COMPLETE SPIN & WIN SYSTEM (Vanilla JS)
   Matches 8 Ball Pool Spin & Win design + Full FFX.html hooks
   ========================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'crazy_topup_spin_v1';

  var WEDGE_GRADIENTS = {
    pink:   { inner: '#fbcfe8', light: '#f472b6', mid: '#db2777', dark: '#831843' },
    blue:   { inner: '#bae6fd', light: '#0ea5e9', mid: '#0369a1', dark: '#082f49' },
    green:  { inner: '#ecfccb', light: '#84cc16', mid: '#4d7c0f', dark: '#274408' },
    purple: { inner: '#f5d0fe', light: '#c026d3', mid: '#7e22ce', dark: '#3b0764' },
    yellow: { inner: '#fef9c3', light: '#facc15', mid: '#ca8a04', dark: '#713f12' },
    red:    { inner: '#fecaca', light: '#ef4444', mid: '#b91c1c', dark: '#5c0a0a' },
    gold:   { inner: '#fef9c3', light: '#facc15', mid: '#d97706', dark: '#78350f' }
  };

  var REGULAR_WHEEL_WEDGES = [
    { id: 'w-50-off', line1: '50%', line2: 'OFF', color: 'pink', rewardType: 'percent_discount', value: 50, title: '50% Instant Top-Up Discount', description: 'Half price on your next game top-up package.', weight: 6 },
    { id: 'w-15-off', line1: '15%', line2: 'OFF', color: 'blue', rewardType: 'percent_discount', value: 15, title: '15% Top-Up Discount', description: 'Save 15% on any game package at checkout.', weight: 14 },
    { id: 'w-20-bonus', line1: '+20%', line2: 'Bonus', color: 'green', rewardType: 'bonus_percent', value: 20, title: '+20% Extra Diamonds / Bonus', description: 'Receive 20% extra in-game bonus on your next top-up.', weight: 12 },
    { id: 'w-200-off', line1: '৳200', line2: 'OFF', color: 'pink', rewardType: 'flat_discount', value: 200, title: '৳200 Flat Cash Discount', description: 'Instant ৳200 off any top-up order.', weight: 7 },
    { id: 'w-10-off', line1: '10%', line2: 'OFF', color: 'blue', rewardType: 'percent_discount', value: 10, title: '10% Instant Discount', description: 'Enjoy 10% off your next top-up checkout.', weight: 16 },
    { id: 'w-epic-box', line1: 'Epic Box', line2: '', color: 'purple', rewardType: 'mystery_box', value: 2, title: 'Epic Mystery Box', description: 'Open in Boxes vault for a high-value discount or bonus offer!', weight: 7 },
    { id: 'w-scratcher', line1: 'Scratcher', line2: '', color: 'yellow', rewardType: 'scratcher', value: 1, title: 'Bonus Scratch Offer Card', description: 'Reveals a hidden top-up promo code in the Scratch tab!', weight: 10 },
    { id: 'w-25-off', line1: '25%', line2: 'OFF', color: 'blue', rewardType: 'percent_discount', value: 25, title: '25% Flash Discount', description: 'Quarter off your next top-up bundle.', weight: 10 },
    { id: 'w-rare-box', line1: 'Rare Box', line2: '', color: 'green', rewardType: 'mystery_box', value: 1, title: 'Rare Mystery Box', description: 'Crack it open in the Boxes tab for a surprise top-up deal!', weight: 9 },
    { id: 'w-100-off', line1: '৳100', line2: 'Voucher', color: 'purple', rewardType: 'flat_discount', value: 100, title: '৳100 Top-Up Voucher', description: 'Instant ৳100 price reduction on any package.', weight: 9 },
    { id: 'w-75-jackpot', line1: '75%', line2: 'OFF', color: 'red', rewardType: 'percent_discount', value: 75, title: '75% JACKPOT Top-Up Deal', description: 'Mega jackpot discount — 75% off your selected top-up!', weight: 3 },
    { id: 'w-5-off', line1: '5%', line2: 'OFF', color: 'blue', rewardType: 'percent_discount', value: 5, title: '5% Instant Discount', description: 'Quick 5% savings on your next top-up.', weight: 18 },
    { id: 'w-35-bonus', line1: '+35%', line2: 'Bonus', color: 'green', rewardType: 'bonus_percent', value: 35, title: '+35% Bonus Top-Up', description: 'Get 35% extra bonus delivered with your order.', weight: 8 },
    { id: 'w-50-flat', line1: '৳50', line2: 'OFF', color: 'blue', rewardType: 'flat_discount', value: 50, title: '৳50 Instant Discount', description: 'Flat ৳50 off any top-up package.', weight: 14 }
  ];

  var GOLDEN_WHEEL_WEDGES = [
    { id: 'g-80-off', line1: '80%', line2: 'OFF', color: 'pink', rewardType: 'percent_discount', value: 80, title: '80% Golden VIP Discount', description: 'Massive 80% off any top-up package!', weight: 6 },
    { id: 'g-30-off', line1: '30%', line2: 'OFF', color: 'blue', rewardType: 'percent_discount', value: 30, title: '30% Golden Discount', description: 'Instant 30% discount at checkout.', weight: 14 },
    { id: 'g-50-bonus', line1: '+50%', line2: 'Bonus', color: 'green', rewardType: 'bonus_percent', value: 50, title: '+50% Bonus Credits', description: '50% extra Diamonds / Bonus on your order.', weight: 12 },
    { id: 'g-500-off', line1: '৳500', line2: 'OFF', color: 'pink', rewardType: 'flat_discount', value: 500, title: '৳500 Golden Voucher', description: 'Flat ৳500 off any major top-up bundle.', weight: 7 },
    { id: 'g-25-off', line1: '25%', line2: 'OFF', color: 'blue', rewardType: 'percent_discount', value: 25, title: '25% VIP Discount', description: '25% off any game top-up.', weight: 15 },
    { id: 'g-legend-box', line1: 'Legend Box', line2: '', color: 'purple', rewardType: 'mystery_box', value: 3, title: 'Legendary Mystery Box', description: 'Guaranteed high-tier voucher inside!', weight: 8 },
    { id: 'g-2x-scratch', line1: '2x', line2: 'Scratch', color: 'yellow', rewardType: 'scratcher', value: 2, title: '2x Bonus Scratch Cards', description: 'Unlocks two Golden Scratch offer cards!', weight: 10 },
    { id: 'g-40-off', line1: '40%', line2: 'OFF', color: 'blue', rewardType: 'percent_discount', value: 40, title: '40% Super Saver', description: '40% off your next top-up checkout.', weight: 10 },
    { id: 'g-epic-box', line1: 'Epic Box', line2: '', color: 'green', rewardType: 'mystery_box', value: 2, title: 'Epic Mystery Box', description: 'Open in Boxes vault for a premium offer!', weight: 10 },
    { id: 'g-300-off', line1: '৳300', line2: 'Voucher', color: 'purple', rewardType: 'flat_discount', value: 300, title: '৳300 Golden Cashback', description: 'Flat ৳300 discount applied instantly.', weight: 9 },
    { id: 'g-90-jackpot', line1: '90%', line2: 'JACKPOT', color: 'red', rewardType: 'percent_discount', value: 90, title: '90% MEGA JACKPOT', description: 'Pay only 10% for your next top-up package!', weight: 3 },
    { id: 'g-20-off', line1: '20%', line2: 'OFF', color: 'blue', rewardType: 'percent_discount', value: 20, title: '20% Instant Discount', description: 'Save 20% on any order.', weight: 16 },
    { id: 'g-100-bonus', line1: '2X', line2: 'Bonus', color: 'green', rewardType: 'bonus_percent', value: 100, title: '2X Double Top-Up Bonus', description: 'Double your diamonds / top-up bonus on one order!', weight: 5 },
    { id: 'g-150-off', line1: '৳150', line2: 'OFF', color: 'blue', rewardType: 'flat_discount', value: 150, title: '৳150 Instant Off', description: 'Flat ৳150 discount on your top-up.', weight: 12 }
  ];

  var SCRATCH_REWARDS = [
    { title: '30% Scratch Winner Discount', description: 'Exclusive 30% discount unlocked via Scratch Card.', rewardType: 'percent_discount', value: 30, badgeText: '30% OFF' },
    { title: '৳150 Instant Cash Voucher', description: 'Flat ৳150 off any package in the Top-Up Store.', rewardType: 'flat_discount', value: 150, badgeText: '৳150 OFF' },
    { title: '+40% Extra Top-Up Bonus', description: 'Receive 40% extra currency with your next order.', rewardType: 'bonus_percent', value: 40, badgeText: '+40% BONUS' },
    { title: '45% VIP Scratch Jackpot', description: 'Rare scratch jackpot — 45% off your next top-up!', rewardType: 'percent_discount', value: 45, badgeText: '45% OFF' }
  ];

  var PRODUCT_VIEWS = [
    { viewId: 'ffView', name: 'FF Likes', pkGrid: 'pkGrid', needEl: 'needAmt', buyBtn: 'buyBtn', uidInp: 'uid', poSel: '#ffView .po', balEl: '' },
    { viewId: 'uidView', name: 'UID Topup (BD)', pkGrid: 'uidPkGrid', needEl: 'uidNeed', buyBtn: 'uidBuy', uidInp: 'uidInp', poSel: '#uidPo .po', balEl: 'uidBal' },
    { viewId: 'wmView', name: 'Weekly/Monthly', pkGrid: 'wmPkGrid', needEl: 'wmNeed', buyBtn: 'wmBuy', uidInp: 'wmInp', poSel: '#wmPo .po', balEl: 'wmBal' },
    { viewId: 'wlView', name: 'Weekly Lite', pkGrid: 'wlPkGrid', needEl: 'wlNeed', buyBtn: 'wlBuy', uidInp: 'wlInp', poSel: '#wlPo .po', balEl: 'wlBal' },
    { viewId: 'luView', name: 'Level Up Pass', pkGrid: 'luPkGrid', needEl: 'luNeed', buyBtn: 'luBuy', uidInp: 'luInp', poSel: '#luPo .po', balEl: 'luBal' },
    { viewId: 'inView', name: 'Indonesia Server', pkGrid: 'inPkGrid', needEl: 'inNeed', buyBtn: 'inBuy', uidInp: 'inInp', poSel: '#inPo .po', balEl: 'inBal' }
  ];
  var pendingProductOrder = null;
  var amOpenedDirectlyToGateway = false;

  /* -------------------- State -------------------- */
  function defaultState() {
    return {
      spins: 1,
      goldenSpins: 0,
      scratchers: 0,
      vipMultiplier: 1,
      walletBalanceBdt: 0,
      lifetimeSpendBdt: 0,
      walletRequests: [],
      boxes: [],
      offers: [],
      activeOfferId: null,
      spinHistory: [],
      savedProfiles: [],
      orders: [],
      soundEnabled: true,
      lastSpinDate: null,
      lastDailyResetDate: null,
      dailySpinByUser: {}
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      return Object.assign(defaultState(), parsed || {});
    } catch (e) {
      return defaultState();
    }
  }

  var state = loadState();
  var activeTab = 'spin';
  var isModalOpen = false;
  var isSpinning = false;
  var wheelRotation = 0;
  var showTapArrow = true;
  var arrowBlinkPhase = 0;
  var arrowIntervalId = null;
  var blinkTimerIds = [];
  var recentOfferIds = [];
  var winResult = null;
  var openedBoxReward = null;
  var showHistoryPanel = false;
  var showNoSpinsModal = false;
  var scratchState = { drawing: false, revealed: false, samples: 0, reward: SCRATCH_REWARDS[0] };
  var confettiInstance = null;
  var confettiTimers = [];
  var guardNeedMutation = false;
  var showAuthRequiredModal = false;
  var showDailyLimitModal = false;
  var countdownIntervalId = null;
  var forceLoggedIn = null;
  var REF_STORAGE_KEY = 'sw_pending_ref_v1';
  var apiAvailable = null; // null = untested, true = server.js active, false = static fallback
  var serverHasSpunToday = false;
  var lastSyncedUserKey = '';
  var streakState = { streakCount: 0, streakLastDate: null, streakUnlockedToday: false };
  var referralState = { referralCode: '', referredBy: null, referredCount: 0, referralBonusEarned: 0, firstOrderBonusPending: false };
  var offerRules = { expiryHours: 24, bigPercentThreshold: 40, bigFlatThreshold: 200, minOrderBdt: 300, maxDiscountBdt: 150 };
  var paymentNumbers = { bkash: '01700-000024', nagad: '01800-000024', rocket: '01900-000024' };
  var supportConfig = { whatsapp: '8801700000024', telegram: 'https://t.me/crazy_top_up_24' };
  var walletCashbackPercent = 3;
  var flashSaleConfig = null;
  var announcementConfig = { active: false, tagLabel: 'NOTICE', text: '' };
  var promoBanners = [];
  var activeBannerIdx = 0;
  var bannerTimerStarted = false;

  function compressProofImage(file, cb) {
    if (!file) { cb(''); return; }
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        try {
          var maxW = 900;
          var w = img.width;
          var h = img.height;
          if (w > maxW) {
            h = Math.round((h * maxW) / w);
            w = maxW;
          }
          var canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          cb(canvas.toDataURL('image/jpeg', 0.78));
        } catch (err) {
          cb(String(reader.result || ''));
        }
      };
      img.onerror = function () { cb(String(reader.result || '')); };
      img.src = String(reader.result || '');
    };
    reader.onerror = function () { cb(''); };
    reader.readAsDataURL(file);
  }
  var leaderboardData = {
    topBuyers: [
      { name: 'Sakib', vipRank: 'Gold', metricValue: 6450 },
      { name: 'Nabil', vipRank: 'Gold', metricValue: 3820 },
      { name: 'Tanvir', vipRank: 'Silver', metricValue: 1940 },
      { name: 'Rafi', vipRank: 'Silver', metricValue: 1250 }
    ],
    topReferrers: [
      { name: 'Rafi', vipRank: 'Gold', metricValue: 9 },
      { name: 'Arif', vipRank: 'Silver', metricValue: 6 },
      { name: 'Fahim', vipRank: 'Silver', metricValue: 4 },
      { name: 'Siam', vipRank: 'Bronze', metricValue: 3 }
    ]
  };
  var deferredInstallPrompt = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (location.hash === '#spin-checkout') renderCheckoutView();
    injectSiteTriggers();
  });
  function triggerPwaInstall() {
    if (deferredInstallPrompt && typeof deferredInstallPrompt.prompt === 'function') {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then(function () {
        deferredInstallPrompt = null;
        if (location.hash === '#spin-checkout') renderCheckoutView();
      }).catch(function () {});
    } else {
      alert('অ্যাপ ইনস্টল করতে ব্রাউজার মেনু (⋮ / Share) থেকে "Add to Home Screen" বা "Install App" চাপুন।');
    }
  }
  function getVipSpendStatusLocal(spendRaw) {
    var spend = Math.max(0, Number(spendRaw) || 0);
    var ranks = [
      { rank: 'Bronze', min: 0, pct: 0 },
      { rank: 'Silver', min: 1000, pct: 2 },
      { rank: 'Gold', min: 3000, pct: 4 },
      { rank: 'Diamond', min: 8000, pct: 7 }
    ];
    var idx = 0;
    for (var i = 0; i < ranks.length; i++) {
      if (spend >= ranks[i].min) idx = i;
    }
    var cur = ranks[idx];
    var nxt = idx < ranks.length - 1 ? ranks[idx + 1] : null;
    if (!nxt) {
      return { rank: cur.rank, lifetimeSpendBdt: spend, discountPercent: cur.pct, nextRank: null, nextThresholdBdt: cur.min, progressPercent: 100 };
    }
    var span = Math.max(1, nxt.min - cur.min);
    var pct = Math.min(100, Math.round(((spend - cur.min) / span) * 100));
    return { rank: cur.rank, lifetimeSpendBdt: spend, discountPercent: cur.pct, nextRank: nxt.rank, nextThresholdBdt: nxt.min, progressPercent: pct };
  }
  var recentWinners = [
    { id: 'seed-1', userName: 'Sakib', rewardTitle: '৳50 ভাউচার', timeLabel: '2m ago' },
    { id: 'seed-2', userName: 'Nabil', rewardTitle: '25% OFF', timeLabel: '5m ago' },
    { id: 'seed-3', userName: 'Tanvir', rewardTitle: '+35% Bonus', timeLabel: '9m ago' },
    { id: 'seed-4', userName: 'Rafi', rewardTitle: '৳100 Voucher', timeLabel: '14m ago' }
  ];

  // Capture ?ref=CODE on landing
  try {
    var urlParams = new URLSearchParams(window.location.search);
    var refQ = (urlParams.get('ref') || '').trim().toUpperCase();
    if (refQ) localStorage.setItem(REF_STORAGE_KEY, refQ);
  } catch (e) {}

  function getUserDisplayName() {
    var accName = document.getElementById('accName');
    var raw = accName && accName.textContent ? accName.textContent.replace(/^hi,\s*/i, '').trim() : '';
    if (raw && !/^guest$/i.test(raw)) return raw;
    var k = getUserKey();
    if (k && k !== '__default__') return k.split('@')[0];
    return 'Player';
  }

  function applyOfferRulesMeta(offer) {
    if (!offer) return offer;
    var r = offerRules || {};
    var isBig = (offer.rewardType === 'percent_discount' && offer.value >= (r.bigPercentThreshold || 40)) ||
                (offer.rewardType === 'flat_discount' && offer.value >= (r.bigFlatThreshold || 200));
    if (offer.minOrderBdt == null) offer.minOrderBdt = isBig ? (r.minOrderBdt || 300) : 0;
    if (offer.maxDiscountBdt == null) offer.maxDiscountBdt = (isBig && offer.rewardType !== 'bonus_percent') ? (r.maxDiscountBdt || 150) : 0;
    if (!offer.expiresAt) offer.expiresAt = Date.now() + Math.max(1, r.expiryHours || 24) * 3600000;
    return offer;
  }

  function isOfferExpired(o) {
    return Boolean(o && o.expiresAt && Date.now() >= o.expiresAt);
  }

  function formatOfferExpiry(expiresAt) {
    if (!expiresAt) return '24h';
    var diff = expiresAt - Date.now();
    if (diff <= 0) return 'Expired';
    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    if (h > 0) return h + 'h ' + m + 'm বাকি';
    return m + 'm ' + s + 's বাকি';
  }

  function getActiveOffersList() {
    return state.offers.filter(function (o) { return !o.used && !isOfferExpired(o); });
  }

  function getShareReferralUrl() {
    var code = referralState.referralCode || ('CTU' + (getUserKey() !== '__default__' ? getUserKey().replace(/[^a-z0-9]/gi, '').slice(0, 5).toUpperCase() : 'GUEST'));
    return window.location.origin + window.location.pathname + '?ref=' + encodeURIComponent(code);
  }


  function validateDropinUid(catId, rawUid) {
    var uid = String(rawUid || '').trim();
    if (!uid) return { ok: false, error: 'অনুগ্রহ করে Player UID দিন।' };
    var gid = String(catId || '').toLowerCase();
    if (gid === 'uid-bd' || gid === 'wm' || gid === 'wl' || gid === 'lu' || gid === 'likes' || gid === 'indo' || gid === 'freefire') {
      if (!/^\d{6,15}$/.test(uid)) {
        return { ok: false, error: 'সঠিক Free Fire UID দিন (৬-১৫ সংখ্যার নম্বর, কোনো স্পেস বা অক্ষর নয়)।' };
      }
      return { ok: true, uid: uid };
    }
    if (gid === 'pubg') {
      if (!/^\d{8,14}$/.test(uid)) return { ok: false, error: 'PUBG Player ID ৮-১৪ সংখ্যার হতে হবে।' };
      return { ok: true, uid: uid };
    }
    if (gid === 'mlbb') {
      if (!/^\d{5,12}\s*[\(\s-]?\d{3,6}\)?$/.test(uid)) {
        return { ok: false, error: 'MLBB ID ফরম্যাট: UserID (ZoneID), যেমন 123456789 (1234)।' };
      }
      return { ok: true, uid: uid };
    }
    if (uid.length < 4) return { ok: false, error: 'সঠিক Player UID দিন (ন্যূনতম ৪ অক্ষর)।' };
    return { ok: true, uid: uid };
  }

  function applyCatalogData(catData) {
    if (!catData || !Array.isArray(catData.games) || !Array.isArray(catData.packages)) return;
    if (!catData.games.length) return;
    CO_CATEGORIES = catData.games.map(function (g) {
      var pkgs = catData.packages.filter(function (p) { return p.gameId === g.id; }).map(function (p) {
        return {
          id: p.id,
          name: p.amountLabel || p.name || 'Package',
          bonus: p.bonusLabel || p.bonus || '',
          price: Number(p.priceBdt != null ? p.priceBdt : (p.price || 100)),
          popular: Boolean(p.popular),
          inStock: p.inStock !== false
        };
      });
      return {
        id: g.id,
        name: g.name,
        publisher: g.publisher || 'Official',
        currency: g.currencyName || g.currency || 'Credits',
        uidLabel: g.uidLabel || 'Player UID',
        uidPlaceholder: g.uidPlaceholder || 'Enter UID',
        active: g.active !== false,
        packages: pkgs
      };
    });
  }

  function applyServerPayload(data, markAvailable) {
    if (!data) return;
    if (markAvailable) apiAvailable = true;
    if (Array.isArray(data.recentOrders) && data.recentOrders.length) {
      liveRecentOrders = data.recentOrders;
    }
    if (Array.isArray(data.recentWinners) && data.recentWinners.length) {
      recentWinners = data.recentWinners;
    }
    if (data.rules) offerRules = Object.assign({}, offerRules, data.rules);
    if (typeof data.hasSpunToday === 'boolean') serverHasSpunToday = data.hasSpunToday;
    if (data.streak) streakState = Object.assign({}, streakState, data.streak);
    if (data.referral) referralState = Object.assign({}, referralState, data.referral);
    if (data.paymentNumbers) paymentNumbers = Object.assign({}, paymentNumbers, data.paymentNumbers);
    if (data.support) supportConfig = Object.assign({}, supportConfig, data.support);
    if (typeof data.walletCashbackPercent === 'number') walletCashbackPercent = data.walletCashbackPercent;
    if (data.flashSale) flashSaleConfig = data.flashSale;
    if (data.leaderboard) leaderboardData = data.leaderboard;
    if (data.announcement) announcementConfig = data.announcement;
    if (Array.isArray(data.banners)) promoBanners = data.banners.filter(function (b) { return b && b.active !== false; });
    if (data.catalog) applyCatalogData(data.catalog);
    if (data.state) {
      state.spins = typeof data.state.spins === 'number' ? data.state.spins : state.spins;
      state.goldenSpins = typeof data.state.goldenSpins === 'number' ? data.state.goldenSpins : state.goldenSpins;
      state.scratchers = typeof data.state.scratchers === 'number' ? data.state.scratchers : state.scratchers;
      if (typeof data.state.walletBalanceBdt === 'number') state.walletBalanceBdt = data.state.walletBalanceBdt;
      if (typeof data.state.lifetimeSpendBdt === 'number') state.lifetimeSpendBdt = data.state.lifetimeSpendBdt;
      if (Array.isArray(data.state.walletRequests)) state.walletRequests = data.state.walletRequests;
      if (Array.isArray(data.state.boxes)) state.boxes = data.state.boxes;
      if (Array.isArray(data.state.offers)) state.offers = data.state.offers;
      if (Array.isArray(data.state.orders)) state.orders = data.state.orders;
      if (Array.isArray(data.state.savedProfiles)) state.savedProfiles = data.state.savedProfiles;
      if (Array.isArray(data.state.spinHistory)) state.spinHistory = data.state.spinHistory;
      if (data.state.lastSpinDate) state.lastSpinDate = data.state.lastSpinDate;
      if (Array.isArray(data.state.stockWatchlist)) state.stockWatchlist = data.state.stockWatchlist;
      saveState();
    }
  }

  async function apiPostJson(url, payload) {
    if (apiAvailable === false) throw new Error('STATIC_MODE');
    var res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload || {})
    });
    var ct = (res.headers.get('content-type') || '').toLowerCase();
    if (ct.indexOf('application/json') === -1) {
      apiAvailable = false;
      throw new Error('STATIC_MODE');
    }
    var data = await res.json();
    apiAvailable = true;
    if (!res.ok) {
      var err = new Error(data.error || ('HTTP_' + res.status));
      err.data = data;
      err.status = res.status;
      throw err;
    }
    return data;
  }

  async function fetchPublicFeed() {
    try {
      var res = await fetch('/api/public/feed');
      var ct = (res.headers.get('content-type') || '').toLowerCase();
      if (!res.ok || ct.indexOf('application/json') === -1) { apiAvailable = false; return; }
      var data = await res.json();
      apiAvailable = true;
      if (Array.isArray(data.recentWinners) && data.recentWinners.length) recentWinners = data.recentWinners;
      if (data.paymentNumbers) paymentNumbers = Object.assign({}, paymentNumbers, data.paymentNumbers);
      if (data.support) supportConfig = Object.assign({}, supportConfig, data.support);
      if (typeof data.walletCashbackPercent === 'number') walletCashbackPercent = data.walletCashbackPercent;
      if (data.flashSale) flashSaleConfig = data.flashSale;
      if (data.leaderboard) leaderboardData = data.leaderboard;
    if (data.catalog) applyCatalogData(data.catalog);
      if (data.config) {
        if (data.config.rules) offerRules = Object.assign({}, offerRules, data.config.rules);
        if (data.config.regularWeights) {
          REGULAR_WHEEL_WEDGES.forEach(function (w) {
            var nw = Number(data.config.regularWeights[w.id]);
            if (isFinite(nw) && nw >= 0) w.weight = nw;
          });
        }
        if (data.config.goldenWeights) {
          GOLDEN_WHEEL_WEDGES.forEach(function (w) {
            var nw = Number(data.config.goldenWeights[w.id]);
            if (isFinite(nw) && nw >= 0) w.weight = nw;
          });
        }
      }
      renderTickerDOM();
    renderMyAccountRankView();
    renderRecentOrdersLive();
      if (location.hash === '#spin-checkout') renderCheckoutView();
      if (isModalOpen) renderModal();
    } catch (e) {
      apiAvailable = false;
    }
  }

  async function syncSessionWithServer() {
    if (!isUserSignedIn()) {
      serverHasSpunToday = false;
      lastSyncedUserKey = '';
      return;
    }
    var uk = getUserKey();
    if (!uk || uk === '__default__' || uk === lastSyncedUserKey) return;
    lastSyncedUserKey = uk;
    try {
      var pendingRef = '';
      try { pendingRef = (localStorage.getItem(REF_STORAGE_KEY) || '').trim(); } catch (e) {}
      var data = await apiPostJson('/api/auth/session', {
        identifier: uk,
        name: getUserDisplayName(),
        referredBy: pendingRef || undefined
      });
      try { if (pendingRef) localStorage.removeItem(REF_STORAGE_KEY); } catch (e) {}
      applyServerPayload(data, true);
      syncAllUI();
      if (isModalOpen) renderModal();
    } catch (e) {
      if (!referralState.referralCode) {
        referralState.referralCode = 'CTU' + uk.replace(/[^a-z0-9]/gi, '').slice(0, 5).toUpperCase();
      }
    }
  }

  function getTodayDateKey() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }

  function getUserKey() {
    var acMail = document.getElementById('acMail');
    var accMail = document.getElementById('accMail');
    var accName = document.getElementById('accName');
    var raw = '';
    if (acMail && acMail.textContent && acMail.textContent.indexOf('লগইন') === -1) raw = acMail.textContent;
    else if (accMail && accMail.textContent && accMail.textContent.indexOf('লগইন') === -1) raw = accMail.textContent;
    else if (accName && accName.textContent && !/^(hi,\s*)?guest$/i.test(accName.textContent.trim())) raw = accName.textContent;
    raw = (raw || '').trim().toLowerCase();
    return raw || '__default__';
  }

  function ensureDailyRefresh() {
    var today = getTodayDateKey();
    if (state.lastDailyResetDate !== today) {
      state.lastDailyResetDate = today;
      if (state.spins < 1) {
        state.spins = 1;
      }
      saveState();
    }
  }

  function hasSpunToday() {
    ensureDailyRefresh();
    if (isUserSignedIn() && serverHasSpunToday) return true;
    var today = getTodayDateKey();
    if (state.lastSpinDate === today) return true;
    var key = getUserKey();
    if (state.dailySpinByUser && state.dailySpinByUser[key] === today) return true;
    return false;
  }

  function formatCountdownNextDay() {
    var now = new Date();
    var nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    var diff = Math.max(0, Math.floor((nextMidnight.getTime() - now.getTime()) / 1000));
    var h = String(Math.floor(diff / 3600)).padStart(2, '0');
    var m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    var s = String(diff % 60).padStart(2, '0');
    return h + 'h : ' + m + 'm : ' + s + 's';
  }

  ensureDailyRefresh();

  function isUserSignedIn() {
    if (typeof window.SPIN_USER_LOGGED_IN === 'boolean') return window.SPIN_USER_LOGGED_IN;
    if (typeof forceLoggedIn === 'boolean') return forceLoggedIn;
    var acLoTx = document.getElementById('acLoTx');
    if (acLoTx && /logout|log\s*out|sign\s*out|লগআউট/i.test((acLoTx.textContent || '').trim())) return true;
    var accLo = document.getElementById('accLo');
    if (accLo && /logout|log\s*out|sign\s*out|লগআউট/i.test((accLo.textContent || '').trim())) return true;
    var accName = document.getElementById('accName');
    if (accName) {
      var nm = (accName.textContent || '').trim();
      if (nm && !/^(hi,\s*)?guest$/i.test(nm)) return true;
    }
    var buyIds = ['buyBtn', 'uidBuy', 'wmBuy', 'wlBuy', 'luBuy', 'inBuy'];
    for (var i = 0; i < buyIds.length; i++) {
      var b = document.getElementById(buyIds[i]);
      if (b && /buy\s*now|অর্ডার/i.test((b.textContent || '').trim())) return true;
    }
    return false;
  }

  function triggerSiteLogin() {
    if (typeof window.openGoogleLoginModal === 'function') {
      showAuthRequiredModal = false;
      closeModal();
      window.openGoogleLoginModal();
      return;
    }
    if (typeof window.SPIN_LOGIN_URL === 'string' && window.SPIN_LOGIN_URL && window.SPIN_LOGIN_URL !== '#') {
      window.location.href = window.SPIN_LOGIN_URL;
      return;
    }
    if (typeof window.onSpinLoginClick === 'function') {
      window.onSpinLoginClick();
      return;
    }
    showAuthRequiredModal = false;
    closeModal();
    var accLo = document.getElementById('accLo');
    if (accLo) {
      accLo.click();
    }
    setTimeout(function () {
      var panel = document.getElementById('accPanel');
      if (panel && !panel.classList.contains('show')) {
        var avBtn = document.getElementById('avBtn');
        if (avBtn) avBtn.click();
      }
      var toastEl = document.getElementById('toast');
      if (toastEl) {
        toastEl.textContent = 'স্পিন করতে দয়া করে আগে Sign In / Login করুন';
        toastEl.classList.add('show');
        setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
      }
    }, 60);
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function generateCode(prefix) {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var out = '';
    for (var i = 0; i < 5; i++) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    return (prefix || 'SPIN') + '-' + out;
  }

  function formatTime() {
    try {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return 'Now';
    }
  }

  function pickWeightedIndex(wedges) {
    var total = 0;
    for (var i = 0; i < wedges.length; i++) total += wedges[i].weight;
    var r = Math.random() * total;
    for (var j = 0; j < wedges.length; j++) {
      r -= wedges[j].weight;
      if (r <= 0) return j;
    }
    return 0;
  }

  /* -------------------- Web Audio Sound Engine -------------------- */
  var audioCtx = null;
  function getAudioCtx() {
    if (!state.soundEnabled) return null;
    if (!audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(function () {});
    }
    return audioCtx;
  }

  function playClick() {
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var now = ctx.currentTime;
      var osc = ctx.createOscillator();
      var g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.04);
      g.gain.setValueAtTime(0.08, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(now); osc.stop(now + 0.05);
    } catch (e) {}
  }

  function playPegTick(speedFactor) {
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var now = ctx.currentTime;
      var osc = ctx.createOscillator();
      var g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520 + Math.min(1, speedFactor || 0.5) * 320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.032);
      g.gain.setValueAtTime(0.11, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(now); osc.stop(now + 0.038);
    } catch (e) {}
  }

  function getWedgeTier(w, isGolden) {
    if (w.color === 'red' || (w.rewardType === 'mystery_box' && w.value >= 3) || (w.rewardType === 'percent_discount' && w.value >= 75) || (w.rewardType === 'flat_discount' && w.value >= 500) || (w.rewardType === 'bonus_percent' && w.value >= 100)) return 'legendary';
    if ((w.rewardType === 'mystery_box' && w.value === 2) || (w.rewardType === 'percent_discount' && w.value >= 40) || (w.rewardType === 'flat_discount' && w.value >= 200) || (w.rewardType === 'bonus_percent' && w.value >= 50)) return 'epic';
    if (isGolden || w.rewardType === 'mystery_box' || (w.rewardType === 'percent_discount' && w.value >= 20) || (w.rewardType === 'flat_discount' && w.value >= 100) || (w.rewardType === 'bonus_percent' && w.value >= 20) || (w.rewardType === 'scratcher' && w.value >= 2)) return 'rare';
    return 'common';
  }

  function playRewardCue(tier) {
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var now = ctx.currentTime;
      function tone(freq, offset, dur, type, peak) {
        var osc = ctx.createOscillator();
        var g = ctx.createGain();
        var st = now + offset;
        osc.type = type;
        osc.frequency.setValueAtTime(freq, st);
        g.gain.setValueAtTime(0.001, st);
        g.gain.linearRampToValueAtTime(peak, st + 0.018);
        g.gain.exponentialRampToValueAtTime(0.001, st + dur);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(st); osc.stop(st + dur + 0.02);
      }
      if (tier === 'common') {
        [523.25, 659.25, 783.99].forEach(function (f, i) { tone(f, i * 0.075, 0.28, 'sine', 0.12); });
      } else if (tier === 'rare') {
        [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) { tone(f, i * 0.08, 0.36, i === 3 ? 'triangle' : 'sine', 0.14); });
        tone(1567.98, 0.26, 0.34, 'sine', 0.07);
      } else if (tier === 'epic') {
        [392.0, 493.88, 587.33, 783.99, 987.77].forEach(function (f, i) {
          tone(f, i * 0.07, 0.42, 'triangle', 0.13);
          tone(f * 2, i * 0.07 + 0.015, 0.3, 'sine', 0.05);
        });
        [783.99, 987.77, 1174.66].forEach(function (f) { tone(f, 0.34, 0.55, 'sine', 0.08); });
      } else {
        [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98].forEach(function (f, i) {
          tone(f, i * 0.065, 0.46, 'triangle', 0.15);
          tone(f * 0.5, i * 0.065, 0.35, 'sine', 0.08);
        });
        [261.63, 523.25, 659.25, 783.99, 1046.5, 1567.98].forEach(function (f, i) {
          tone(f, 0.42, 0.72, i === 0 ? 'triangle' : 'sine', i === 0 ? 0.14 : 0.09);
        });
      }
    } catch (e) {}
  }

  /* -------------------- Confetti & Fireworks -------------------- */
  function clearConfetti() {
    confettiTimers.forEach(function (id) { clearTimeout(id); });
    confettiTimers = [];
  }

  function ensureConfetti() {
    var canvas = document.getElementById('swConfettiCanvas');
    if (canvas && typeof window.confetti === 'function' && window.confetti.create) {
      if (!confettiInstance) {
        confettiInstance = window.confetti.create(canvas, { resize: true, useWorker: false });
      }
    }
    return confettiInstance;
  }

  function fireCelebration(isJackpot) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var fire = ensureConfetti();
    if (!fire) return;
    clearInterval(countdownIntervalId);
    countdownIntervalId = null;
    clearConfetti();
    var goldPalette = ['#facc15', '#fde047', '#f59e0b', '#ffffff', '#38bdf8'];
    var jackpotPalette = ['#facc15', '#ef4444', '#ec4899', '#38bdf8', '#a855f7', '#ffffff'];

    if (isJackpot) {
      [0, 260, 540, 880, 1220].forEach(function (delay, idx) {
        confettiTimers.push(setTimeout(function () {
          var ox = idx === 0 ? 0.5 : (idx % 2 === 1 ? 0.25 + Math.random() * 0.12 : 0.63 + Math.random() * 0.12);
          var oy = idx === 0 ? 0.48 : 0.24 + Math.random() * 0.2;
          fire({ particleCount: idx === 0 ? 80 : 52, spread: idx === 0 ? 95 : 75, startVelocity: idx === 0 ? 44 : 36, ticks: 120, gravity: 0.85, origin: { x: ox, y: oy }, colors: jackpotPalette });
        }, delay));
      });
    } else {
      fire({ particleCount: 52, angle: 60, spread: 60, startVelocity: 44, origin: { x: 0.12, y: 0.65 }, colors: goldPalette });
      fire({ particleCount: 52, angle: 120, spread: 60, startVelocity: 44, origin: { x: 0.88, y: 0.65 }, colors: goldPalette });
      confettiTimers.push(setTimeout(function () {
        fire({ particleCount: 42, spread: 80, startVelocity: 32, origin: { x: 0.5, y: 0.45 }, colors: goldPalette });
      }, 180));
    }
  }

  function isHighValueWedge(w, isGolden) {
    if (w.color === 'red') return { high: true, jackpot: true };
    if (w.rewardType === 'percent_discount' && w.value >= 25) return { high: true, jackpot: w.value >= 75 };
    if (w.rewardType === 'flat_discount' && w.value >= 150) return { high: true, jackpot: w.value >= 300 };
    if (w.rewardType === 'bonus_percent' && w.value >= 35) return { high: true, jackpot: w.value >= 100 };
    if (w.rewardType === 'mystery_box' && w.value >= 2) return { high: true, jackpot: w.value >= 3 };
    if (isGolden) return { high: true, jackpot: false };
    return { high: false, jackpot: false };
  }

  /* -------------------- Toasts -------------------- */
  function showOfferToast(title, code, rewardType) {
    var stack = document.getElementById('swToastStack');
    if (!stack) return;
    var el = document.createElement('div');
    el.className = 'sw-toast';
    el.innerHTML =
      '<div class="sw-toast-ico">🎁</div>' +
      '<div class="sw-toast-body">' +
        '<div class="sw-toast-kicker">Added to Offers Inventory</div>' +
        '<div class="sw-toast-title">' + esc(title) + '</div>' +
        '<div class="sw-toast-code">' + (code ? 'Code: <b>' + esc(code) + '</b>' : (rewardType === 'mystery_box' ? 'Open in Boxes Tab' : 'Ready in Scratch Tab')) + '</div>' +
      '</div>' +
      '<button type="button" class="sw-toast-view">View</button>' +
      '<button type="button" class="sw-toast-x" aria-label="Dismiss">✕</button>';

    function remove() {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }
    el.querySelector('.sw-toast-x').onclick = remove;
    el.querySelector('.sw-toast-view').onclick = function () {
      remove();
      openModal(rewardType === 'scratcher' ? 'scratch' : 'boxes');
    };
    stack.appendChild(el);
    setTimeout(remove, 4200);
  }

  function markOfferRecent(offerId) {
    if (!offerId) return;
    if (recentOfferIds.indexOf(offerId) === -1) recentOfferIds.push(offerId);
    setTimeout(function () {
      recentOfferIds = recentOfferIds.filter(function (id) { return id !== offerId; });
      if (isModalOpen) renderModal();
    }, 6000);
  }

  /* -------------------- Reward Actions -------------------- */
  function recordHistory(title, rewardType, source) {
    state.spinHistory.unshift({
      id: 'h-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
      rewardTitle: title,
      rewardType: rewardType,
      source: source,
      timestamp: formatTime()
    });
    if (state.spinHistory.length > 5) state.spinHistory = state.spinHistory.slice(0, 5);
  }

  function handleWheelWin(wedge, isGolden) {
    var sourceLabel = isGolden ? 'Golden Spin' : 'Spin Wheel';
    recordHistory(wedge.title, wedge.rewardType, sourceLabel);

    var celeb = isHighValueWedge(wedge, isGolden);
    fireCelebration(celeb.jackpot);

    if (wedge.rewardType === 'scratcher') {
      state.scratchers += wedge.value;
      saveState();
      showOfferToast(wedge.title, '', 'scratcher');
      winResult = { wedge: wedge, isScratcher: true };
    } else if (wedge.rewardType === 'mystery_box') {
      var tier = wedge.value >= 3 ? 'Legendary Box' : (wedge.value === 2 ? 'Epic Box' : 'Rare Box');
      var box = { id: 'box-' + Date.now(), tier: tier, opened: false };
      state.boxes.unshift(box);
      saveState();
      showOfferToast(tier + ' Won!', '', 'mystery_box');
      winResult = { wedge: wedge, wonBox: box };
    } else {
      var offer = applyOfferRulesMeta({
        id: 'off-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
        title: wedge.title,
        description: wedge.description,
        rewardType: wedge.rewardType,
        value: wedge.value,
        code: generateCode(isGolden ? 'GOLD' : 'SPIN'),
        source: sourceLabel,
        used: false
      });
      state.offers.unshift(offer);
      state.activeOfferId = offer.id;
      markOfferRecent(offer.id);
      saveState();
      showOfferToast(offer.title, offer.code, offer.rewardType);
      winResult = { wedge: wedge, wonOffer: offer };
    }

    syncAllUI();
  }

  function handleOpenBox(boxId) {
    if (!isUserSignedIn()) {
      playClick();
      showAuthRequiredModal = true;
      renderModal();
      return;
    }
    var target = null;
    for (var i = 0; i < state.boxes.length; i++) {
      if (state.boxes[i].id === boxId && !state.boxes[i].opened) {
        target = state.boxes[i];
        break;
      }
    }
    if (!target) return;
    target.opened = true;

    var offer;
    if (target.tier === 'Legendary Box') {
      offer = applyOfferRulesMeta({ id: 'off-' + Date.now(), title: '70% Legendary Box Discount', description: 'Massive 70% off your next game top-up!', rewardType: 'percent_discount', value: 70, code: generateCode('LEGD'), source: 'Legendary Box', used: false });
    } else if (target.tier === 'Epic Box') {
      offer = applyOfferRulesMeta({ id: 'off-' + Date.now(), title: '৳250 Epic Cash Voucher', description: 'Flat ৳250 discount on any top-up order!', rewardType: 'flat_discount', value: 250, code: generateCode('EPIC'), source: 'Epic Box', used: false });
    } else {
      offer = applyOfferRulesMeta({ id: 'off-' + Date.now(), title: '+35% Rare Box Bonus', description: 'Get 35% extra diamonds / coins on checkout!', rewardType: 'bonus_percent', value: 35, code: generateCode('RARE'), source: 'Rare Box', used: false });
    }
    if (apiAvailable !== false) {
      apiPostJson('/api/box/open', { identifier: getUserKey(), boxId: boxId }).then(function (data) {
        applyServerPayload(data, true);
        if (data.offer) openedBoxReward = data.offer;
        saveState();
        syncAllUI();
        if (isModalOpen) renderModal();
      }).catch(function () {});
    }

    state.offers.unshift(offer);
    state.activeOfferId = offer.id;
    markOfferRecent(offer.id);
    saveState();

    playRewardCue(target.tier === 'Legendary Box' ? 'legendary' : (target.tier === 'Epic Box' ? 'epic' : 'rare'));
    fireCelebration(target.tier === 'Legendary Box');
    openedBoxReward = offer;
    showOfferToast(offer.title, offer.code, offer.rewardType);
    syncAllUI();
  }

  function handleScratchWin(reward) {
    if (!isUserSignedIn()) {
      playClick();
      showAuthRequiredModal = true;
      renderModal();
      return;
    }
    if (state.scratchers <= 0) return;
    state.scratchers = Math.max(0, state.scratchers - 1);
    var offer = applyOfferRulesMeta({
      id: 'off-' + Date.now(),
      title: reward.title,
      description: reward.description,
      rewardType: reward.rewardType,
      value: reward.value,
      code: generateCode('SCR'),
      source: 'Scratch Card',
      used: false
    });
    if (apiAvailable !== false) {
      apiPostJson('/api/scratch', { identifier: getUserKey(), reward: reward }).then(function (data) {
        applyServerPayload(data, true);
        saveState();
        syncAllUI();
        if (isModalOpen) renderModal();
      }).catch(function () {});
    }
    state.offers.unshift(offer);
    state.activeOfferId = offer.id;
    markOfferRecent(offer.id);
    saveState();

    playRewardCue(reward.value >= 45 ? 'epic' : 'rare');
    fireCelebration(reward.value >= 45);
    showOfferToast(offer.title, offer.code, offer.rewardType);
    syncAllUI();
  }

  /* -------------------- SVG Wheel Builder -------------------- */
  function describeWedge(index, sliceAngle, radius, cx, cy) {
    var startDeg = index * sliceAngle - sliceAngle / 2 - 90;
    var endDeg = startDeg + sliceAngle;
    var sr = (startDeg * Math.PI) / 180;
    var er = (endDeg * Math.PI) / 180;
    var x1 = cx + radius * Math.cos(sr);
    var y1 = cy + radius * Math.sin(sr);
    var x2 = cx + radius * Math.cos(er);
    var y2 = cy + radius * Math.sin(er);
    var largeArc = sliceAngle > 180 ? 1 : 0;
    return 'M ' + cx + ' ' + cy + ' L ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + ' A ' + radius + ' ' + radius + ' 0 ' + largeArc + ' 1 ' + x2.toFixed(2) + ' ' + y2.toFixed(2) + ' Z';
  }

  function buildWheelHTML(wedges, spinsLeft, isGolden) {
    var cx = 220, cy = 220, r = 186;
    var n = wedges.length;
    var sliceAngle = 360 / n;
    var signedIn = isUserSignedIn();
    var spunToday = hasSpunToday();
    var eligible = signedIn && !spunToday && !isSpinning && spinsLeft > 0;

    var defsGrads = '';
    for (var key in WEDGE_GRADIENTS) {
      if (Object.prototype.hasOwnProperty.call(WEDGE_GRADIENTS, key)) {
        var g = WEDGE_GRADIENTS[key];
        defsGrads += '<radialGradient id="sw-w-' + key + '" gradientUnits="userSpaceOnUse" cx="' + cx + '" cy="' + cy + '" r="' + r + '">' +
          '<stop offset="28%" stop-color="' + g.inner + '"/>' +
          '<stop offset="46%" stop-color="' + g.light + '"/>' +
          '<stop offset="78%" stop-color="' + g.mid + '"/>' +
          '<stop offset="100%" stop-color="' + g.dark + '"/>' +
          '</radialGradient>';
      }
    }

    var wedgesMarkup = '';
    var pegsMarkup = '';
    for (var i = 0; i < n; i++) {
      var w = wedges[i];
      var midDeg = i * sliceAngle;
      var pathD = describeWedge(i, sliceAngle, r, cx, cy);
      var txt = w.line2
        ? '<text x="' + cx + '" y="' + (cy - 133) + '" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-size="13.5" font-weight="800" font-family="Montserrat, sans-serif">' + esc(w.line1) + '</text>' +
          '<text x="' + cx + '" y="' + (cy - 118) + '" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-size="12" font-weight="700" font-family="Montserrat, sans-serif">' + esc(w.line2) + '</text>'
        : '<text x="' + cx + '" y="' + (cy - 126) + '" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-size="14.5" font-weight="800" font-family="Montserrat, sans-serif">' + esc(w.line1) + '</text>';

      wedgesMarkup += '<g><path d="' + pathD + '" fill="url(#sw-w-' + w.color + ')" stroke="rgba(15,23,42,0.55)" stroke-width="1.2"/>' +
        '<g transform="rotate(' + midDeg + ' ' + cx + ' ' + cy + ')" filter="url(#swTextShadow)"><g transform="rotate(90 ' + cx + ' ' + (cy - 126) + ')">' + txt + '</g></g></g>';

      var pegRad = ((i * sliceAngle - sliceAngle / 2 - 90) * Math.PI) / 180;
      var px = cx + 189 * Math.cos(pegRad);
      var py = cy + 189 * Math.sin(pegRad);
      pegsMarkup += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="4.2" fill="url(#swPegGold)" stroke="#451a03" stroke-width="0.9"/>';
    }

    var arrowCoords = [
      [11,37],[18,31.5],[25,26],[32,20.5],[39,15],[39,25],[48,25],[57,25],[66,25],[75,25],[84,25],[93,25],
      [102,25],[111,25],[120,25],[129,25],[138,25],[147,25],[156,25],[160,31],[160,37],[160,43],[156,49],
      [147,49],[138,49],[129,49],[120,49],[111,49],[102,49],[93,49],[84,49],[75,49],[66,49],[57,49],
      [48,49],[39,49],[39,59],[32,53.5],[25,48],[18,42.5]
    ];
    var arrowDots = '';
    for (var d = 0; d < arrowCoords.length; d++) {
      var lit = (d % 2) === arrowBlinkPhase;
      arrowDots += '<circle class="sw-arrow-dot" data-idx="' + d + '" cx="' + arrowCoords[d][0] + '" cy="' + arrowCoords[d][1] + '" r="' + (lit ? 2.1 : 1.5) + '" fill="' + (lit ? '#ffffff' : '#1e3a8a') + '" fill-opacity="' + (lit ? '1' : '0.35') + '"' + (lit ? ' filter="url(#swBulbGlow)"' : '') + '/>';
    }

    var tapArrowHTML = (showTapArrow && eligible)
      ? '<button type="button" class="sw-tap-arrow-btn" id="swTapArrowBtn" aria-label="Tap to spin"><div class="sw-arrow-poke-wrap"><svg viewBox="0 0 172 74" class="sw-tap-arrow-svg">' +
        '<defs><linearGradient id="swTapFill" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#67e8f9"/><stop offset="35%" stop-color="#38bdf8"/><stop offset="75%" stop-color="#0284c7"/><stop offset="100%" stop-color="#1d4ed8"/></linearGradient>' +
        '<filter id="swBulbGlow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="1.8" flood-color="#ffffff" flood-opacity="0.95"/></filter></defs>' +
        '<path d="M 4 37 L 42 8 L 42 22 L 160 22 Q 166 22 166 28 L 166 46 Q 166 52 160 52 L 42 52 L 42 66 Z" fill="url(#swTapFill)" stroke="#e0f2fe" stroke-width="3" stroke-linejoin="round"/>' +
        arrowDots +
        '<text x="102" y="38.5" text-anchor="middle" dominant-baseline="middle" fill="#09090b" stroke="#ffffff" stroke-width="3.2" paint-order="stroke" font-size="13.5" font-weight="900" font-family="Montserrat, sans-serif" letter-spacing="0.02em">TAP TO SPIN</text>' +
        '</svg></div></button>'
      : '';

    return '<div class="sw-wheel-wrap">' +
      '<div class="sw-wheel-halo' + (isGolden ? ' golden' : '') + '"></div>' +
      '<div class="sw-wheel-box">' +
      '<svg viewBox="0 0 440 440" class="sw-wheel-svg">' +
      '<defs>' +
      '<linearGradient id="swChromeOuter" x1="15%" y1="0%" x2="85%" y2="100%">' +
        '<stop offset="0%" stop-color="' + (isGolden ? '#fef9c3' : '#ffffff') + '"/><stop offset="18%" stop-color="' + (isGolden ? '#f59e0b' : '#cbd5e1') + '"/>' +
        '<stop offset="42%" stop-color="' + (isGolden ? '#fef08a' : '#f8fafc') + '"/><stop offset="68%" stop-color="' + (isGolden ? '#b45309' : '#475569') + '"/>' +
        '<stop offset="88%" stop-color="' + (isGolden ? '#fde047' : '#e2e8f0') + '"/><stop offset="100%" stop-color="' + (isGolden ? '#92400e' : '#64748b') + '"/>' +
      '</linearGradient>' +
      '<linearGradient id="swChromeInner" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#334155"/><stop offset="50%" stop-color="#e2e8f0"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>' +
      '<linearGradient id="swHubChrome" x1="15%" y1="0%" x2="85%" y2="100%">' +
        '<stop offset="0%" stop-color="' + (isGolden ? '#fef9c3' : '#ffffff') + '"/><stop offset="28%" stop-color="' + (isGolden ? '#f59e0b' : '#94a3b8') + '"/>' +
        '<stop offset="52%" stop-color="#ffffff"/><stop offset="80%" stop-color="' + (isGolden ? '#b45309' : '#334155') + '"/><stop offset="100%" stop-color="' + (isGolden ? '#fde047' : '#e2e8f0') + '"/>' +
      '</linearGradient>' +
      '<radialGradient id="swSpinBg" cx="50%" cy="30%" r="70%"><stop offset="0%" stop-color="#4b5060"/><stop offset="46%" stop-color="#171920"/><stop offset="100%" stop-color="#050608"/></radialGradient>' +
      '<linearGradient id="swSpinGold" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fef9c3"/><stop offset="45%" stop-color="#fde047"/><stop offset="100%" stop-color="#eab308"/></linearGradient>' +
      '<radialGradient id="swPegGold" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="#fef9c3"/><stop offset="55%" stop-color="#facc15"/><stop offset="100%" stop-color="#854d0e"/></radialGradient>' +
      '<radialGradient id="swRimFlare" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255,255,255,0.95)"/><stop offset="35%" stop-color="rgba(255,255,255,0.45)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient>' +
      '<radialGradient id="swEdgeVig" cx="50%" cy="50%" r="50%"><stop offset="72%" stop-color="rgba(0,0,0,0)"/><stop offset="91%" stop-color="rgba(0,0,0,0.18)"/><stop offset="100%" stop-color="rgba(0,0,0,0.46)"/></radialGradient>' +
      '<radialGradient id="swHubHalo" cx="50%" cy="50%" r="50%"><stop offset="52%" stop-color="rgba(255,255,255,0)"/><stop offset="68%" stop-color="rgba(255,255,255,0.88)"/><stop offset="86%" stop-color="rgba(255,255,255,0.34)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient>' +
      defsGrads +
      '<filter id="swTextShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="1.4" stdDeviation="1.1" flood-color="#000000" flood-opacity="0.92"/></filter>' +
      '</defs>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="206" fill="url(#swChromeOuter)"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="195" fill="url(#swChromeInner)"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="189" fill="#111827"/>' +
      '<g id="swWheelGroup" transform="rotate(' + wheelRotation + ' ' + cx + ' ' + cy + ')">' +
        wedgesMarkup +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#swEdgeVig)" pointer-events="none"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="3.5"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="92" fill="url(#swHubHalo)" pointer-events="none"/>' +
        pegsMarkup +
      '</g>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="201" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-dasharray="190 900" stroke-dashoffset="-40"/>' +
      '<circle cx="' + (cx + 58) + '" cy="' + (cy - 190) + '" r="28" fill="url(#swRimFlare)" pointer-events="none"/>' +
      '<circle cx="' + (cx - 48) + '" cy="' + (cy + 192) + '" r="28" fill="url(#swRimFlare)" pointer-events="none"/>' +
      '<g id="swSpinHub" class="sw-hub-btn' + (eligible ? ' eligible' : ((!signedIn || spunToday) ? ' locked' : '')) + '" role="button" tabindex="0" aria-label="' + (!signedIn ? 'Sign in to spin' : (spunToday ? 'Daily spin used' : 'Spin the wheel')) + '">' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="58" fill="url(#swHubChrome)" stroke="#0f172a" stroke-width="2.5"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="49" fill="#18181b" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="46" fill="url(#swSpinBg)"/>' +
        '<ellipse cx="' + cx + '" cy="' + (cy - 18) + '" rx="28" ry="13" fill="rgba(255,255,255,0.14)"/>' +
        '<text x="' + cx + '" y="' + ((signedIn && !spunToday) ? (cy + 2) : (cy - 4)) + '" text-anchor="middle" dominant-baseline="middle" fill="url(#swSpinGold)" font-size="' + ((signedIn && !spunToday) ? '24' : '20') + '" font-weight="900" font-family="Montserrat, sans-serif" letter-spacing="0.04em" filter="url(#swTextShadow)">SPIN</text>' +
        (!signedIn ? '<text x="' + cx + '" y="' + (cy + 19) + '" text-anchor="middle" dominant-baseline="middle" fill="#fde68a" font-size="9.5" font-weight="800" font-family="Montserrat, sans-serif" letter-spacing="0.06em">🔒 SIGN IN</text>' : (spunToday ? '<text x="' + cx + '" y="' + (cy + 19) + '" text-anchor="middle" dominant-baseline="middle" fill="#7dd3fc" font-size="9.5" font-weight="800" font-family="Montserrat, sans-serif" letter-spacing="0.06em">⏳ 1/DAY DONE</text>' : '')) +
      '</g>' +
      '<g id="swPointer" transform="rotate(0 ' + cx + ' 24)" style="transition: transform 65ms ease-out">' +
        '<polygon points="' + (cx - 8) + ',30 ' + (cx + 8) + ',30 ' + cx + ',52" fill="url(#swSpinGold)" stroke="#451a03" stroke-width="1.4"/>' +
        '<circle cx="' + cx + '" cy="21" r="14.5" fill="url(#swSpinGold)" stroke="#451a03" stroke-width="1.4"/>' +
        '<circle cx="' + cx + '" cy="21" r="11.5" fill="#090b10"/>' +
        '<circle cx="' + cx + '" cy="21" r="6" fill="#ffffff"/>' +
        '<text x="' + cx + '" y="21.8" text-anchor="middle" dominant-baseline="middle" fill="#09090b" font-size="9" font-weight="900" font-family="Montserrat, sans-serif">8</text>' +
      '</g>' +
      '</svg>' +
      tapArrowHTML +
      '</div></div>';
  }

  var spinRequestPending = false;
  function runWheelAnimation(isGolden, winIdx, serverData) {
    var wedges = isGolden ? GOLDEN_WHEEL_WEDGES : REGULAR_WHEEL_WEDGES;
    showTapArrow = false;
    isSpinning = true;
    winResult = null;
    syncBadges();

    var tapBtn = document.getElementById('swTapArrowBtn');
    if (tapBtn) tapBtn.style.display = 'none';
    var hubEl = document.getElementById('swSpinHub');
    if (hubEl) hubEl.classList.remove('eligible');
    var cntEl = document.getElementById('swCounterText');
    if (cntEl) cntEl.textContent = isGolden ? ('Golden: ' + state.goldenSpins) : ('Spins: ' + state.spins);

    var n = wedges.length;
    var sliceAngle = 360 / n;
    var jitter = (Math.random() - 0.5) * (sliceAngle * 0.42);
    var targetMod = (((-winIdx * sliceAngle + jitter) % 360) + 360) % 360;
    var startRot = wheelRotation;
    var currentMod = ((startRot % 360) + 360) % 360;
    var delta = targetMod - currentMod;
    if (delta <= 0) delta += 360;

    var fullSpins = (6 + Math.floor(Math.random() * 3)) * 360;
    var finalRot = startRot + fullSpins + delta;
    var duration = 5000;
    var startTime = performance.now();
    var lastPeg = Math.floor((startRot + sliceAngle / 2) / sliceAngle);

    function step(now) {
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 4.2);
      var nextRot = startRot + (finalRot - startRot) * eased;
      wheelRotation = nextRot;

      var wg = document.getElementById('swWheelGroup');
      if (wg) wg.setAttribute('transform', 'rotate(' + nextRot.toFixed(2) + ' 220 220)');

      var pegIdx = Math.floor((nextRot + sliceAngle / 2) / sliceAngle);
      if (pegIdx !== lastPeg) {
        lastPeg = pegIdx;
        playPegTick(1 - progress);
        var ptr = document.getElementById('swPointer');
        if (ptr) {
          ptr.setAttribute('transform', 'rotate(-18 220 24)');
          setTimeout(function () {
            var p2 = document.getElementById('swPointer');
            if (p2) p2.setAttribute('transform', 'rotate(0 220 24)');
          }, 65);
        }
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isSpinning = false;
        var wonWedge = wedges[winIdx];
        playRewardCue(getWedgeTier(wonWedge, isGolden));
        if (serverData) {
          applyServerPayload(serverData, true);
          var celeb = isHighValueWedge(wonWedge, isGolden);
          fireCelebration(celeb.jackpot);
          if (serverData.offer) {
            state.activeOfferId = serverData.offer.id;
            markOfferRecent(serverData.offer.id);
            saveState();
            showOfferToast(serverData.offer.title, serverData.offer.code, serverData.offer.rewardType);
            winResult = { wedge: wonWedge, wonOffer: serverData.offer, streakUnlocked: Boolean(serverData.streakUnlocked) };
          } else if (serverData.box) {
            showOfferToast(serverData.box.tier + ' Won!', '', 'mystery_box');
            winResult = { wedge: wonWedge, wonBox: serverData.box, streakUnlocked: Boolean(serverData.streakUnlocked) };
          } else {
            showOfferToast(wonWedge.title, '', wonWedge.rewardType);
            winResult = { wedge: wonWedge, isScratcher: wonWedge.rewardType === 'scratcher', streakUnlocked: Boolean(serverData.streakUnlocked) };
          }
          if (serverData.streakUnlocked) {
            showOfferToast('🔥 7-Day Streak Bonus: +1 Golden Spin & Legendary Box!', '', 'mystery_box');
          }
          syncAllUI();
        } else {
          handleWheelWin(wonWedge, isGolden);
        }
        renderModal();
      }
    }
    requestAnimationFrame(step);
  }

  function startSpinWheel(isGolden) {
    if (isSpinning || spinRequestPending) return;
    if (!isUserSignedIn()) {
      playClick();
      showAuthRequiredModal = true;
      renderModal();
      return;
    }
    if (hasSpunToday()) {
      playClick();
      showDailyLimitModal = true;
      renderModal();
      return;
    }
    var spinsLeft = isGolden ? state.goldenSpins : state.spins;
    if (spinsLeft <= 0) {
      playClick();
      showNoSpinsModal = true;
      renderModal();
      return;
    }

    var wedges = isGolden ? GOLDEN_WHEEL_WEDGES : REGULAR_WHEEL_WEDGES;
    if (apiAvailable !== false) {
      spinRequestPending = true;
      apiPostJson('/api/spin', { identifier: getUserKey(), isGolden: Boolean(isGolden) }).then(function (data) {
        spinRequestPending = false;
        serverHasSpunToday = true;
        var todayKey = getTodayDateKey();
        state.lastSpinDate = todayKey;
        if (!state.dailySpinByUser || typeof state.dailySpinByUser !== 'object') state.dailySpinByUser = {};
        state.dailySpinByUser[getUserKey()] = todayKey;
        saveState();
        runWheelAnimation(isGolden, Number(data.winningIndex) || 0, data);
      }).catch(function (err) {
        spinRequestPending = false;
        if (err && err.status === 403) {
          serverHasSpunToday = true;
          if (err.data) applyServerPayload(err.data, true);
          showDailyLimitModal = true;
          syncAllUI();
          renderModal();
          return;
        }
        var todayKey = getTodayDateKey();
        state.lastSpinDate = todayKey;
        if (!state.dailySpinByUser || typeof state.dailySpinByUser !== 'object') state.dailySpinByUser = {};
        state.dailySpinByUser[getUserKey()] = todayKey;
        if (isGolden) state.goldenSpins = Math.max(0, state.goldenSpins - 1);
        else state.spins = Math.max(0, state.spins - 1);
        streakState.streakCount = Math.min(7, (streakState.streakCount || 0) + 1);
        streakState.streakLastDate = todayKey;
        saveState();
        var winIdx = pickWeightedIndex(wedges);
        recentWinners.unshift({ id: 'loc-' + Date.now(), userName: getUserDisplayName(), rewardTitle: wedges[winIdx].title, timeLabel: 'Just now' });
        recentWinners = recentWinners.slice(0, 12);
        runWheelAnimation(isGolden, winIdx, null);
      });
      return;
    }

    var todayKey = getTodayDateKey();
    state.lastSpinDate = todayKey;
    if (!state.dailySpinByUser || typeof state.dailySpinByUser !== 'object') state.dailySpinByUser = {};
    state.dailySpinByUser[getUserKey()] = todayKey;
    if (isGolden) state.goldenSpins = Math.max(0, state.goldenSpins - 1);
    else state.spins = Math.max(0, state.spins - 1);
    streakState.streakCount = Math.min(7, (streakState.streakCount || 0) + 1);
    streakState.streakLastDate = todayKey;
    saveState();
    var winIdx = pickWeightedIndex(wedges);
    recentWinners.unshift({ id: 'loc-' + Date.now(), userName: getUserDisplayName(), rewardTitle: wedges[winIdx].title, timeLabel: 'Just now' });
    recentWinners = recentWinners.slice(0, 12);
    runWheelAnimation(isGolden, winIdx, null);
  }

  /* -------------------- Live Ticker, 7-Day Streak & Referral Builders -------------------- */
  function buildTickerHTML(modalCompact) {
    var list = (recentWinners && recentWinners.length) ? recentWinners : [];
    var items = list.map(function (w) {
      return '<span class="sw-ticker-item">🎉 <b>' + esc(w.userName) + '</b> মাত্র <span class="rw">' + esc(w.rewardTitle) + '</span> জিতেছেন <span style="opacity:.45;margin-left:4px;">·</span></span>';
    }).join('');
    var grp = '<div class="sw-ticker-group">' + items + '</div>';
    return '<div class="sw-ticker-bar' + (modalCompact ? ' modal-sm' : '') + '"><div class="sw-ticker-track">' + grp + grp + grp + grp + '</div></div>';
  }

  function renderTickerDOM() {
    var homeTick = document.getElementById('swHomeTicker');
    if (homeTick) homeTick.innerHTML = buildTickerHTML(false);
  }

  function buildStreakHTML(compact) {
    var sc = Number(streakState.streakCount || 0);
    var days = '';
    for (var d = 1; d <= 7; d++) {
      var done = sc >= d;
      var cls = 'sw-streak-day' + (done ? ' done' : '') + (d === 7 ? ' day7' : '');
      days += '<div class="' + cls + '">' + (d === 7 ? '🎁D7' : ('D' + d)) + '</div>';
    }
    return '<div class="sw-streak-card' + (compact ? ' modal-sm' : '') + '">' +
      '<div class="sw-streak-hd"><span>🔥 7-Day Login Streak (' + sc + '/7)</span><span style="color:#34d399;font-size:10.5px;">Day 7: Golden Spin + Legend Box</span></div>' +
      '<div class="sw-streak-days">' + days + '</div>' +
    '</div>';
  }

  function buildReferralHTML() {
    var link = getShareReferralUrl();
    return '<div class="sw-ref-card">' +
      '<div class="sw-streak-hd" style="color:#7dd3fc;"><span>🤝 Invite &amp; Earn (রেফারেল বোনাস)</span><span style="color:#fcd34d;font-size:10.5px;">Referred: ' + Number(referralState.referredCount || 0) + '</span></div>' +
      '<div style="font-size:11.5px;color:#cbd5e1;">বন্ধু আপনার লিংকে সাইন-ইন করে ১ম অর্ডার করলে <b>দুইজনেই +1 Scratch Card &amp; +1 Golden Spin</b> পাবেন!</div>' +
      '<div class="sw-ref-link-row">' +
        '<input type="text" readonly class="sw-ref-inp" id="swRefLinkInp" value="' + esc(link) + '" />' +
        '<button type="button" class="sw-ref-copy" id="swRefCopyBtn">Copy Link</button>' +
      '</div>' +
    '</div>';
  }

  /* -------------------- VIP Medal & Marquee Helpers -------------------- */
  function buildVipMedalHTML() {
    var leaves = '';
    var leftDegs = [-145, -122, -98, -74, -50, -28];
    var rightDegs = [145, 122, 98, 74, 50, 28];
    leftDegs.concat(rightDegs).forEach(function (deg) {
      var rad = ((deg - 90) * Math.PI) / 180;
      var lx = (32 + 18 * Math.cos(rad)).toFixed(1);
      var ly = (30 + 18 * Math.sin(rad)).toFixed(1);
      leaves += '<ellipse cx="' + lx + '" cy="' + ly + '" rx="3.2" ry="1.5" fill="url(#swVipBronze)" transform="rotate(' + deg + ' ' + lx + ' ' + ly + ')"/>';
    });
    return '<div class="sw-vip-wrap">' +
      '<div class="sw-vip-medal">' +
      '<div class="sw-vip-ribbons"><div class="sw-vip-ribbon left"></div><div class="sw-vip-ribbon right"></div></div>' +
      '<svg viewBox="0 0 64 64" style="width:100%;height:100%;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.8))">' +
        '<defs>' +
          '<linearGradient id="swVipBronze" x1="15%" y1="0%" x2="85%" y2="100%"><stop offset="0%" stop-color="#fff7ed"/><stop offset="30%" stop-color="#fed7aa"/><stop offset="65%" stop-color="#ea8c55"/><stop offset="100%" stop-color="#9a3412"/></linearGradient>' +
          '<radialGradient id="swVipInner" cx="50%" cy="35%" r="65%"><stop offset="0%" stop-color="#3a2012"/><stop offset="65%" stop-color="#1b0e08"/><stop offset="100%" stop-color="#0f0704"/></radialGradient>' +
        '</defs>' +
        '<circle cx="32" cy="30" r="25" fill="url(#swVipInner)" stroke="url(#swVipBronze)" stroke-width="3.2"/>' +
        '<circle cx="32" cy="30" r="21.5" fill="none" stroke="rgba(255,237,213,0.35)" stroke-width="0.8"/>' +
        '<path d="M27 17 L29 13 L32 15.5 L35 13 L37 17 Z" fill="#fde68a" stroke="#78350f" stroke-width="0.6"/>' +
        leaves +
        '<text x="32" y="32" text-anchor="middle" dominant-baseline="middle" fill="#fff7dc" font-size="14.5" font-weight="900" font-family="Cinzel, Georgia, serif" letter-spacing="0.04em">VIP</text>' +
      '</svg></div>' +
      '<span class="sw-vip-mult">x' + state.vipMultiplier + '</span></div>';
  }

  function buildBulbsHTML() {
    var top = '', bot = '', left = '', right = '';
    for (var i = 0; i < 30; i++) {
      top += '<span class="sw-bulb ' + (i % 2 === 0 ? 'even' : 'odd') + '"></span>';
      bot += '<span class="sw-bulb ' + (i % 2 === 1 ? 'even' : 'odd') + '"></span>';
    }
    for (var j = 0; j < 16; j++) {
      left += '<span class="sw-bulb ' + (j % 2 === 0 ? 'even' : 'odd') + '"></span>';
      right += '<span class="sw-bulb ' + (j % 2 === 1 ? 'even' : 'odd') + '"></span>';
    }
    return '<div class="sw-bulbs">' +
      '<div class="sw-bulbs-row sw-bulbs-top">' + top + '</div>' +
      '<div class="sw-bulbs-row sw-bulbs-bottom">' + bot + '</div>' +
      '<div class="sw-bulbs-col sw-bulbs-left">' + left + '</div>' +
      '<div class="sw-bulbs-col sw-bulbs-right">' + right + '</div>' +
    '</div>';
  }

  /* -------------------- Scratch Canvas Logic -------------------- */
  function initScratchCanvas() {
    var canvas = document.getElementById('swScratchCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';
    var grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#fde047');
    grad.addColorStop(0.35, '#eab308');
    grad.addColorStop(0.7, '#fef08a');
    grad.addColorStop(1, '#ca8a04');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 8;
    for (var i = -canvas.height; i < canvas.width + canvas.height; i += 28) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + canvas.height, canvas.height);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(15,23,42,0.85)';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 - 14, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 20px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('8', canvas.width / 2, canvas.height / 2 - 13);

    ctx.fillStyle = '#422006';
    ctx.font = '800 17px Montserrat, sans-serif';
    ctx.fillText('SCRATCH HERE TO WIN', canvas.width / 2, canvas.height / 2 + 28);

    function revealNow() {
      if (!isUserSignedIn()) {
        playClick();
        showAuthRequiredModal = true;
        renderModal();
        return;
      }
      if (scratchState.revealed || state.scratchers <= 0) return;
      scratchState.revealed = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleScratchWin(scratchState.reward);
      renderModal();
    }

    function scratchAt(clientX, clientY) {
      if (!scratchState.drawing || scratchState.revealed || state.scratchers <= 0) return;
      var rect = canvas.getBoundingClientRect();
      var x = (clientX - rect.left) * (canvas.width / rect.width);
      var y = (clientY - rect.top) * (canvas.height / rect.height);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      scratchState.samples += 1;
      if (scratchState.samples % 6 === 0) playPegTick(0.4);
      if (scratchState.samples >= 24) revealNow();
    }

    canvas.onmousedown = function (e) { scratchState.drawing = true; scratchAt(e.clientX, e.clientY); };
    canvas.onmousemove = function (e) { scratchAt(e.clientX, e.clientY); };
    canvas.onmouseup = function () { scratchState.drawing = false; };
    canvas.onmouseleave = function () { scratchState.drawing = false; };
    canvas.ontouchstart = function (e) { scratchState.drawing = true; if (e.touches[0]) scratchAt(e.touches[0].clientX, e.touches[0].clientY); };
    canvas.ontouchmove = function (e) { if (e.touches[0]) scratchAt(e.touches[0].clientX, e.touches[0].clientY); };
    canvas.ontouchend = function () { scratchState.drawing = false; };

    var quickBtn = document.getElementById('swQuickRevealBtn');
    if (quickBtn) quickBtn.onclick = revealNow;
  }

  /* -------------------- Modal Rendering -------------------- */
  function buildRootShell() {
    if (!document.getElementById('swToastStack')) {
      var ts = document.createElement('div');
      ts.id = 'swToastStack';
      document.body.appendChild(ts);
    }
    if (!document.getElementById('swSummaryRoot')) {
      var sr = document.createElement('div');
      sr.id = 'swSummaryRoot';
      document.body.appendChild(sr);
    }
    if (!document.getElementById('swRoot')) {
      var root = document.createElement('div');
      root.id = 'swRoot';
      root.setAttribute('role', 'dialog');
      root.setAttribute('aria-modal', 'true');
      root.setAttribute('aria-label', 'Spin and Win');
      document.body.appendChild(root);
    }
    if (!document.getElementById('swCheckoutView')) {
      var cov = document.createElement('div');
      cov.id = 'swCheckoutView';
      var foot = document.getElementById('siteFooter');
      if (foot && foot.parentNode) foot.parentNode.insertBefore(cov, foot);
      else document.body.appendChild(cov);
    }
  }

  function renderModal() {
    var root = document.getElementById('swRoot');
    if (!root) return;
    if (!isModalOpen) {
      root.classList.remove('sw-open');
      clearInterval(arrowIntervalId);
      arrowIntervalId = null;
      return;
    }

    root.classList.add('sw-open');

    var unopenedBoxes = state.boxes.filter(function (b) { return !b.opened; });
    var activeOffers = getActiveOffersList();
    var topTitle = activeTab === 'boxes' ? 'OFFER' : (activeTab === 'scratch' ? 'SCRATCH' : 'SPIN');
    var counterText = activeTab === 'golden'
      ? ('Golden: ' + state.goldenSpins)
      : (activeTab === 'scratch'
        ? ('Cards: ' + state.scratchers)
        : (activeTab === 'boxes'
          ? ('Boxes: ' + unopenedBoxes.length)
          : ('Spins: ' + state.spins)));

    var stageHTML = '';
    if (activeTab === 'spin') {
      stageHTML = buildWheelHTML(REGULAR_WHEEL_WEDGES, state.spins, false);
    } else if (activeTab === 'golden') {
      stageHTML = buildWheelHTML(GOLDEN_WHEEL_WEDGES, state.goldenSpins, true);
    } else if (activeTab === 'scratch') {
      if (!isUserSignedIn()) {
        stageHTML = '<div class="sw-panel">' +
          '<div class="sw-panel-h">Golden Offer Scratcher</div>' +
          '<p class="sw-panel-sub">স্ক্র্যাচ কার্ড ব্যবহার করতে আগে আপনার অ্যাকাউন্টে Sign In করুন</p>' +
          '<div class="sw-empty-card">' +
            '<div style="font-size:28px;margin-bottom:6px;">🔒</div>' +
            '<div style="font-size:14px;font-weight:800;color:#fff;">Sign In Required</div>' +
            '<p style="font-size:12px;color:#94a3b8;margin:4px 0 12px;">সাইন ইন না করলে স্ক্র্যাচ কার্ড ও স্পিন ব্যবহার করা যাবে না।</p>' +
            '<button type="button" class="sw-btn-gold" id="swScratchLoginBtn">Sign In / Login করুন</button>' +
          '</div></div>';
      } else if (state.scratchers > 0 || scratchState.revealed) {
        stageHTML = '<div class="sw-panel">' +
          '<div class="sw-panel-h">Golden Offer Scratcher</div>' +
          '<p class="sw-panel-sub">Rub the golden foil to reveal an instant Top-Up discount or bonus voucher</p>' +
          '<div class="sw-scratch-box">' +
            '<div class="sw-scratch-under">' +
              '<div class="sw-scratch-badge">' + esc(scratchState.reward.badgeText) + '</div>' +
              '<div class="sw-scratch-title">' + esc(scratchState.reward.title) + '</div>' +
              '<div class="sw-scratch-desc">' + esc(scratchState.reward.description) + '</div>' +
              (scratchState.revealed ? '<div class="sw-scratch-saved">✓ Saved to Offers Vault</div>' : '') +
            '</div>' +
            (scratchState.revealed ? '' : '<canvas id="swScratchCanvas" class="sw-scratch-canvas" width="340" height="190"></canvas>') +
          '</div>' +
          '<div style="margin-top:14px;display:flex;gap:8px;justify-content:center;">' +
            (!scratchState.revealed && state.scratchers > 0 ? '<button type="button" class="sw-btn-slate" id="swQuickRevealBtn">Quick Reveal</button>' : '') +
            (scratchState.revealed && state.scratchers > 0 ? '<button type="button" class="sw-btn-gold" id="swNextScratchBtn">Scratch Next (' + state.scratchers + ' left)</button>' : '') +
          '</div></div>';
      } else {
        stageHTML = '<div class="sw-panel">' +
          '<div class="sw-panel-h">Golden Offer Scratcher</div>' +
          '<p class="sw-panel-sub">Rub the golden foil to reveal an instant Top-Up discount or bonus voucher</p>' +
          '<div class="sw-empty-card">' +
            '<div style="font-size:26px;margin-bottom:6px;">✨</div>' +
            '<div style="font-size:14px;font-weight:800;color:#fff;">No Scratch Cards Left</div>' +
            '<p style="font-size:12px;color:#94a3b8;margin:4px 0 12px;">Land on the yellow Scratcher wedge on the wheel to win free cards!</p>' +
            '<button type="button" class="sw-btn-gold" id="swBackToSpinBtn">Back to Spin Wheel</button>' +
          '</div></div>';
      }
    } else if (activeTab === 'boxes') {
      var boxesHTML = unopenedBoxes.length === 0
        ? '<div class="sw-vault-empty">No unopened boxes yet. Land on <b style="color:#a3e635">Rare Box</b> or <b style="color:#c084fc">Epic Box</b> on the wheel!</div>'
        : '<div class="sw-boxes-grid">' + unopenedBoxes.map(function (b) {
            return '<div class="sw-box-card">' +
              '<div style="min-width:0;"><div style="font-size:13px;font-weight:800;color:#fff;">🎁 ' + esc(b.tier) + '</div><div style="font-size:11px;color:#94a3b8;">Tap to crack open</div></div>' +
              '<button type="button" class="sw-btn-gold sw-open-box-btn" data-box-id="' + esc(b.id) + '" style="padding:6px 12px;">Open</button>' +
            '</div>';
          }).join('') + '</div>';

      var offersHTML = activeOffers.length === 0
        ? '<div class="sw-vault-empty" style="text-align:center;">Spin the wheel or scratch a card to collect reward codes!</div>'
        : '<div class="sw-offer-list">' + activeOffers.map(function (o) {
            var isApp = o.id === state.activeOfferId;
            var isNew = recentOfferIds.indexOf(o.id) !== -1;
            var condParts = [];
            if (o.minOrderBdt > 0) condParts.push('ন্যূনতম ৳' + o.minOrderBdt + ' অর্ডার');
            if (o.maxDiscountBdt > 0) condParts.push('সর্বোচ্চ ছাড় ৳' + o.maxDiscountBdt);
            return '<div class="sw-offer-card' + (isNew ? ' pulse' : (isApp ? ' applied' : '')) + '">' +
              '<div class="sw-offer-meta">' +
                '<div class="sw-offer-name">' + esc(o.title) + (isNew ? ' <span style="color:#fcd34d;font-size:10px;">NEW</span>' : '') + '</div>' +
                '<div class="sw-offer-code-row"><span class="sw-code-txt sw-font-mono">' + esc(o.code) + '</span><span>·</span><span>' + esc(o.source) + '</span></div>' +
                '<div class="sw-offer-cond"><span class="exp">⏳ ' + esc(formatOfferExpiry(o.expiresAt)) + '</span>' + (condParts.length ? ('<span>' + esc(condParts.join(' · ')) + '</span>') : '') + '</div>' +
              '</div>' +
              '<button type="button" class="sw-copy-btn' + (isApp ? ' applied' : '') + '" data-offer-id="' + esc(o.id) + '">' + (isApp ? '✓ Applied' : 'Apply Code') + '</button>' +
            '</div>';
          }).join('') + '</div>';

      stageHTML = '<div class="sw-vault">' +
        '<div><div class="sw-vault-head"><div class="sw-vault-title">Mystery Boxes (' + unopenedBoxes.length + ')</div><span class="sw-vault-sub">Open boxes to unlock offers</span></div>' + boxesHTML + '</div>' +
        '<div><div class="sw-vault-head"><div class="sw-vault-title white">Offers (' + activeOffers.length + ')</div><span class="sw-vault-sub">Apply code to Top-Up checkout</span></div>' + offersHTML + '</div>' +
      '</div>';
    }

    var signedIn = isUserSignedIn();
    var spunToday = hasSpunToday();
    var overlaysHTML = '';
    if (winResult) {
      var actBtn = '';
      if (winResult.wonOffer) actBtn = '<button type="button" class="sw-btn-gold" id="swWinUseBtn">Apply to Top-Up →</button>';
      else if (winResult.wonBox) actBtn = '<button type="button" class="sw-btn-gold" id="swWinBoxBtn">Open in Boxes</button>';
      else if (winResult.isScratcher) actBtn = '<button type="button" class="sw-btn-gold" id="swWinScratchBtn">Scratch Card Now →</button>';
      var winConds = [];
      if (winResult.wonOffer) {
        if (winResult.wonOffer.minOrderBdt > 0) winConds.push('ন্যূনতম ৳' + winResult.wonOffer.minOrderBdt + ' অর্ডারে প্রযোজ্য');
        if (winResult.wonOffer.maxDiscountBdt > 0) winConds.push('সর্বোচ্চ ডিসকাউন্ট ৳' + winResult.wonOffer.maxDiscountBdt);
      }
      var winCodeHTML = (winResult.wonOffer
        ? '<div class="sw-win-code-pill"><span class="lbl">Voucher Code</span><span class="code">' + esc(winResult.wonOffer.code) + '</span><span style="color:#7dd3fc;font-size:10px;">· ' + esc(formatOfferExpiry(winResult.wonOffer.expiresAt)) + '</span></div>'
        : '') +
        (winConds.length ? '<div style="margin-top:6px;font-size:11px;color:#fde68a;">📌 ' + esc(winConds.join(' · ')) + '</div>' : '') +
        (winResult.streakUnlocked ? '<div style="margin-top:6px;font-size:11.5px;font-weight:800;color:#6ee7b7;">🔥 7-Day Streak Bonus: +1 Golden Spin &amp; Legendary Box!</div>' : '');
      overlaysHTML += '<div class="sw-overlay" style="overflow:hidden;"><div class="sw-win-sunburst"></div><div class="sw-overlay-card sw-win-anim">' +
        '<div class="sw-win-trophy-wrap"><span class="sw-twinkle t1">✦</span><span class="sw-twinkle t2">★</span><span class="sw-twinkle t3">✦</span><div class="sw-win-trophy">🏆</div></div>' +
        '<div class="sw-win-kicker">🎉 Discount Unlocked! 🎉</div>' +
        '<div class="sw-win-title" style="background:linear-gradient(180deg,#ffffff 0%,#fef08a 55%,#f59e0b 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">' + esc(winResult.wedge.title) + '</div>' +
        '<div class="sw-win-desc">' + esc(winResult.wedge.description) + '</div>' +
        winCodeHTML +
        '<div class="sw-overlay-actions row">' + actBtn + '<button type="button" class="sw-btn-slate" id="swWinKeepBtn">' + (spunToday ? 'Done (1/Day)' : 'Keep Spinning') + '</button></div>' +
      '</div></div>';
    } else if (openedBoxReward) {
      overlaysHTML += '<div class="sw-overlay" style="overflow:hidden;"><div class="sw-win-sunburst emerald"></div><div class="sw-overlay-card emerald sw-win-anim">' +
        '<div class="sw-win-trophy-wrap"><span class="sw-twinkle t1">✦</span><span class="sw-twinkle t2">★</span><div class="sw-win-trophy emerald">🎁</div></div>' +
        '<div class="sw-win-kicker" style="color:#6ee7b7;">🎁 Mystery Box Unlocked!</div>' +
        '<div class="sw-win-title" style="background:linear-gradient(180deg,#ffffff 0%,#a7f3d0 55%,#10b981 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">' + esc(openedBoxReward.title) + '</div>' +
        '<div class="sw-win-desc">' + esc(openedBoxReward.description) + '</div>' +
        '<div class="sw-win-code-pill" style="border-color:rgba(52,211,153,0.45);"><span class="lbl">Code</span><span class="code">' + esc(openedBoxReward.code) + '</span></div>' +
        '<div class="sw-overlay-actions row"><button type="button" class="sw-btn-gold" id="swBoxUseBtn" style="background:#10b981;">Use on Top-Up →</button><button type="button" class="sw-btn-slate" id="swBoxSaveBtn">Save</button></div>' +
      '</div></div>';
    } else if (showHistoryPanel) {
      var histBody = state.spinHistory.length === 0
        ? '<div class="sw-vault-empty" style="text-align:center;padding:24px;">No Spins Recorded Yet<br><span style="font-size:11px;">Spin the wheel to track your last 5 rewards here.</span></div>'
        : '<div class="sw-hist-list">' + state.spinHistory.slice(0, 5).map(function (h, idx) {
            var bcls = h.rewardType === 'flat_discount' ? ' flat' : (h.rewardType === 'bonus_percent' ? ' bonus' : (h.rewardType === 'mystery_box' ? ' box' : (h.rewardType === 'scratcher' ? ' scratch' : '')));
            var blbl = h.rewardType === 'flat_discount' ? 'Cash Voucher' : (h.rewardType === 'bonus_percent' ? 'Bonus' : (h.rewardType === 'mystery_box' ? 'Mystery Box' : (h.rewardType === 'scratcher' ? 'Scratcher' : '% Discount')));
            return '<div class="sw-hist-row">' +
              '<div style="min-width:0;"><div style="font-size:12.5px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><span style="color:#64748b;margin-right:6px;">#' + (idx + 1) + '</span>' + esc(h.rewardTitle) + '</div>' +
              '<div style="font-size:11px;color:#94a3b8;margin-top:2px;padding-left:20px;">' + esc(h.timestamp) + ' · ' + esc(h.source) + '</div></div>' +
              '<span class="sw-hist-badge' + bcls + '">' + blbl + '</span>' +
            '</div>';
          }).join('') + '</div>';
      overlaysHTML += '<div class="sw-overlay"><div class="sw-overlay-card history">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:10px;margin-bottom:12px;">' +
          '<div style="font-family:Montserrat,sans-serif;font-size:15px;font-weight:800;color:#fff;">🕒 SPIN HISTORY <span style="font-size:11px;color:#94a3b8;font-weight:600;">(Last 5)</span></div>' +
          '<button type="button" class="sw-icon-btn" id="swCloseHistX" style="width:28px;height:28px;">✕</button>' +
        '</div>' + histBody +
        '<button type="button" class="sw-btn-gold" id="swCloseHistBtn" style="width:100%;margin-top:12px;">Back to Wheel</button>' +
      '</div></div>';
    } else if (showAuthRequiredModal) {
      overlaysHTML += '<div class="sw-overlay"><div class="sw-overlay-card">' +
        '<div class="sw-auth-icon">🔒</div>' +
        '<div class="sw-win-kicker">Sign In Required</div>' +
        '<div class="sw-win-title" style="font-size:24px;">লগইন ছাড়া স্পিন করা যাবে না</div>' +
        '<div class="sw-win-desc">Spin Wheel ঘোরাতে এবং ডিসকাউন্ট অফার জিততে আগে আপনার অ্যাকাউন্টে <b style="color:#fcd34d;">Sign In / Login</b> করুন।</div>' +
        '<div class="sw-overlay-actions">' +
          '<button type="button" class="sw-btn-gold" id="swAuthLoginBtn">Sign In / Login করুন</button>' +
          '<button type="button" class="sw-btn-slate" id="swAuthCancelBtn">বন্ধ করুন</button>' +
        '</div>' +
      '</div></div>';
    } else if (showDailyLimitModal) {
      overlaysHTML += '<div class="sw-overlay"><div class="sw-overlay-card">' +
        '<div class="sw-auth-icon" style="border-color:rgba(56,189,248,0.55);background:rgba(56,189,248,0.12);">⏳</div>' +
        '<div class="sw-win-kicker" style="color:#7dd3fc;">Daily Limit: 1 Spin / Day</div>' +
        '<div class="sw-win-title" style="font-size:24px;">আজকের ১টি স্পিন শেষ হয়েছে!</div>' +
        '<div class="sw-win-desc">প্রতিদিন কেবল <b style="color:#fcd34d;">১ বার</b> স্পিন করা যাবে। আগামীকাল রাত ১২টার পর আপনার নতুন স্পিন আনলক হবে।</div>' +
        '<div class="sw-countdown-box">পরবর্তী স্পিন: <span class="sw-countdown-val">' + esc(formatCountdownNextDay()) + '</span></div>' +
        '<div class="sw-overlay-actions">' +
          '<button type="button" class="sw-btn-gold" id="swDailyOffersBtn">My Offers / Boxes দেখুন</button>' +
          '<button type="button" class="sw-btn-slate" id="swDailyCloseBtn">বন্ধ করুন</button>' +
        '</div>' +
      '</div></div>';
    } else if (showNoSpinsModal) {
      overlaysHTML += '<div class="sw-overlay"><div class="sw-overlay-card">' +
        '<div style="font-size:28px;margin-bottom:4px;">🔄</div>' +
        '<div class="sw-win-title" style="font-size:24px;">NO SPINS AVAILABLE</div>' +
        '<div class="sw-win-desc">প্রতিদিন ১টি ফ্রি স্পিন পাবেন। অথবা টপ-আপ অর্ডার করে আগামী দিনের জন্য বোনাস স্পিন জমা রাখুন।</div>' +
        '<div class="sw-overlay-actions">' +
          '<button type="button" class="sw-btn-gold" id="swGoBuyBtn">Order Top-Up Package</button>' +
          '<button type="button" class="sw-btn-slate" id="swNoSpinCloseBtn">বন্ধ করুন</button>' +
        '</div>' +
      '</div></div>';
    }

    root.innerHTML =
      '<canvas id="swConfettiCanvas" aria-hidden="true"></canvas>' +
      '<div class="sw-backdrop" id="swBackdrop"></div>' +
      '<div class="sw-sunbeam"></div>' +
      '<div class="sw-shell">' +
        '<div class="sw-tabs">' +
          '<button type="button" class="sw-tab' + (activeTab === 'boxes' ? ' active' : '') + '" data-sw-tab="boxes">' +
            (unopenedBoxes.length > 0 ? '<span class="sw-tab-badge">' + unopenedBoxes.length + '</span>' : '') +
            '<div class="sw-tab-ico sw-tab-ico--box"><svg viewBox="0 0 32 32" style="width:22px;height:22px"><circle cx="16" cy="16" r="12" fill="none" stroke="#eab308" stroke-width="2.5"/><circle cx="16" cy="13" r="3.5" fill="#fde047"/><path d="M14 15 L18 15 L19 22 L13 22 Z" fill="#fde047"/></svg></div>' +
            '<span class="sw-tab-lbl">Boxes</span>' +
          '</button>' +
          '<button type="button" class="sw-tab' + (activeTab === 'golden' ? ' active' : '') + '" data-sw-tab="golden">' +
            (state.goldenSpins > 0 ? '<span class="sw-tab-badge">' + state.goldenSpins + '</span>' : '') +
            '<div class="sw-tab-ico sw-tab-ico--golden"><svg viewBox="0 0 36 36" style="width:28px;height:28px"><circle cx="18" cy="18" r="15" fill="#1e293b"/><path d="M18,18 L18,3 A15,15 0 0,1 31,11 Z" fill="#facc15"/><path d="M18,18 L31,11 A15,15 0 0,1 31,25 Z" fill="#ec4899"/><path d="M18,18 L31,25 A15,15 0 0,1 18,33 Z" fill="#38bdf8"/><path d="M18,18 L18,33 A15,15 0 0,1 5,25 Z" fill="#84cc16"/><path d="M18,18 L5,25 A15,15 0 0,1 5,11 Z" fill="#a855f7"/><path d="M18,18 L5,11 A15,15 0 0,1 18,3 Z" fill="#ef4444"/><circle cx="18" cy="18" r="6" fill="#0f172a" stroke="#fff" stroke-width="1"/><text x="18" y="20.5" text-anchor="middle" fill="#fff" font-size="7.5" font-weight="900">8</text></svg></div>' +
            '<span class="sw-tab-lbl">Golden Spin</span>' +
          '</button>' +
          '<button type="button" class="sw-tab' + (activeTab === 'spin' ? ' active' : '') + '" data-sw-tab="spin">' +
            (state.spins > 0 ? '<span class="sw-tab-badge">' + state.spins + '</span>' : '') +
            '<div class="sw-tab-ico sw-tab-ico--spin"><div style="width:22px;height:22px;border-radius:50%;background:#090d14;border:1px solid rgba(255,255,255,0.75);display:grid;place-items:center;font-size:10px;font-weight:900;color:#fff;">8</div></div>' +
            '<span class="sw-tab-lbl">Spin</span>' +
          '</button>' +
          '<button type="button" class="sw-tab' + (activeTab === 'scratch' ? ' active' : '') + '" data-sw-tab="scratch">' +
            (state.scratchers > 0 ? '<span class="sw-tab-badge">' + state.scratchers + '</span>' : '') +
            '<div class="sw-tab-ico sw-tab-ico--scratch"><div style="width:22px;height:22px;border-radius:50%;background:rgba(120,53,15,0.5);border:1px solid rgba(254,240,138,0.8);display:grid;place-items:center;font-size:10px;font-weight:900;color:#fef9c3;">8</div></div>' +
            '<span class="sw-tab-lbl">Scratch</span>' +
          '</button>' +
        '</div>' +
        '<div class="sw-frame">' +
          '<button type="button" class="sw-close" id="swCloseBtn" aria-label="Close Spin and Win">✕</button>' +
          '<div class="sw-inner-panel"></div>' +
          buildBulbsHTML() +
          '<div class="sw-content">' +
            '<div class="sw-top-row">' +
              '<div class="sw-title-wrap">' +
                (activeTab === 'golden' ? '<div class="sw-title-sub">GOLDEN</div>' : '') +
                '<div class="sw-title-main">' + topTitle + '</div>' +
                '<div class="sw-title-and">AND</div>' +
                '<div class="sw-title-main">WIN</div>' +
              '</div>' +
              buildVipMedalHTML() +
            '</div>' +
            buildTickerHTML(true) +
            (signedIn ? buildStreakHTML(true) : '') +
            (!signedIn ? '<div class="sw-auth-banner"><div class="sw-auth-banner-left"><span>🔒</span><span>স্পিন করতে আগে আপনার অ্যাকাউন্টে <b>Login</b> করুন</span></div><button type="button" class="sw-auth-banner-btn" id="swAuthBannerBtn">Login করুন</button></div>' : (spunToday ? '<div class="sw-auth-banner daily-done"><div class="sw-auth-banner-left"><span>⏳</span><span>আজকের ১টি স্পিন শেষ · পরবর্তী স্পিন: <b class="sw-countdown-val">' + esc(formatCountdownNextDay()) + '</b></span></div></div>' : '')) +
            '<div class="sw-stage">' + stageHTML + '</div>' +
            '<div class="sw-bottom-bar">' +
              '<div class="sw-bottom-left">' +
                '<button type="button" class="sw-icon-btn" id="swSoundBtn" aria-label="Toggle Sound">' + (state.soundEnabled ? '🔊' : '🔇') + '</button>' +
                '<button type="button" class="sw-pill-btn" id="swHistoryBtn">🕒 History' + (state.spinHistory.length ? ' (' + state.spinHistory.length + ')' : '') + '</button>' +
                (activeOffers.length > 0 && activeTab !== 'boxes' ? '<button type="button" class="sw-pill-btn offers' + (recentOfferIds.length ? ' pulse' : '') + '" id="swOffersBtn">🎟 Offers (' + activeOffers.length + ')</button>' : '') +
              '</div>' +
              '<div class="sw-bottom-right">' +
                (((activeTab === 'spin' && state.spins === 0) || (activeTab === 'golden' && state.goldenSpins === 0)) ? '<button type="button" class="sw-get-spins-btn" id="swGetSpinsBtn">+ Get Spins</button>' : '') +
                '<div class="sw-counter-box"><span class="sw-counter-text" id="swCounterText">' + counterText + '</span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          overlaysHTML +
        '</div>' +
      '</div>';

    bindModalEvents();
  }

  function bindModalEvents() {
    var backdrop = document.getElementById('swBackdrop');
    if (backdrop) backdrop.onclick = closeModal;
    var closeBtn = document.getElementById('swCloseBtn');
    if (closeBtn) closeBtn.onclick = function () { playClick(); closeModal(); };

    document.querySelectorAll('#swRoot [data-sw-tab]').forEach(function (btn) {
      btn.onclick = function () {
        if (isSpinning) return;
        playClick();
        activeTab = btn.getAttribute('data-sw-tab');
        showTapArrow = true;
        winResult = null;
        showHistoryPanel = false;
        showNoSpinsModal = false;
    showAuthRequiredModal = false;
    showDailyLimitModal = false;
        renderModal();
      };
    });

    var soundBtn = document.getElementById('swSoundBtn');
    if (soundBtn) soundBtn.onclick = function () {
      state.soundEnabled = !state.soundEnabled;
      saveState();
      if (state.soundEnabled) playClick();
      renderModal();
    };

    var histBtn = document.getElementById('swHistoryBtn');
    if (histBtn) histBtn.onclick = function () {
      playClick();
      showHistoryPanel = !showHistoryPanel;
      renderModal();
    };

    var offersBtn = document.getElementById('swOffersBtn');
    if (offersBtn) offersBtn.onclick = function () {
      playClick();
      activeTab = 'boxes';
      renderModal();
    };

    var authBannerBtn = document.getElementById('swAuthBannerBtn');
    if (authBannerBtn) authBannerBtn.onclick = function () {
      playClick();
      showAuthRequiredModal = true;
      renderModal();
    };
    var scratchLoginBtn = document.getElementById('swScratchLoginBtn');
    if (scratchLoginBtn) scratchLoginBtn.onclick = function () {
      playClick();
      triggerSiteLogin();
    };
    var authLoginBtn = document.getElementById('swAuthLoginBtn');
    if (authLoginBtn) authLoginBtn.onclick = function () {
      playClick();
      triggerSiteLogin();
    };
    var authCancelBtn = document.getElementById('swAuthCancelBtn');
    if (authCancelBtn) authCancelBtn.onclick = function () {
      playClick();
      showAuthRequiredModal = false;
      renderModal();
    };

    var dailyOffersBtn = document.getElementById('swDailyOffersBtn');
    if (dailyOffersBtn) dailyOffersBtn.onclick = function () {
      playClick();
      showDailyLimitModal = false;
      activeTab = 'boxes';
      renderModal();
    };
    var dailyCloseBtn = document.getElementById('swDailyCloseBtn');
    if (dailyCloseBtn) dailyCloseBtn.onclick = function () {
      playClick();
      showDailyLimitModal = false;
      renderModal();
    };
    var noSpinCloseBtn = document.getElementById('swNoSpinCloseBtn');
    if (noSpinCloseBtn) noSpinCloseBtn.onclick = function () {
      playClick();
      showNoSpinsModal = false;
      renderModal();
    };

    var getSpinsBtn = document.getElementById('swGetSpinsBtn');
    if (getSpinsBtn) getSpinsBtn.onclick = function () {
      playClick();
      if (!isUserSignedIn()) {
        showAuthRequiredModal = true;
      } else if (hasSpunToday()) {
        showDailyLimitModal = true;
      } else {
        showNoSpinsModal = true;
      }
      renderModal();
    };

    var hub = document.getElementById('swSpinHub');
    if (hub) hub.onclick = function () { startSpinWheel(activeTab === 'golden'); };
    var tapArrow = document.getElementById('swTapArrowBtn');
    if (tapArrow) tapArrow.onclick = function () { startSpinWheel(activeTab === 'golden'); };

    if (activeTab === 'scratch') {
      initScratchCanvas();
      var nextBtn = document.getElementById('swNextScratchBtn');
      if (nextBtn) nextBtn.onclick = function () {
        scratchState.revealed = false;
        scratchState.samples = 0;
        scratchState.reward = SCRATCH_REWARDS[Math.floor(Math.random() * SCRATCH_REWARDS.length)];
        renderModal();
      };
      var backBtn = document.getElementById('swBackToSpinBtn');
      if (backBtn) backBtn.onclick = function () { activeTab = 'spin'; renderModal(); };
    }

    document.querySelectorAll('.sw-open-box-btn').forEach(function (b) {
      b.onclick = function () { handleOpenBox(b.getAttribute('data-box-id')); renderModal(); };
    });

    document.querySelectorAll('.sw-copy-btn').forEach(function (b) {
      b.onclick = function () {
        var oid = b.getAttribute('data-offer-id');
        state.activeOfferId = oid;
        saveState();
        var offer = state.offers.filter(function (x) { return x.id === oid; })[0];
        if (offer && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(offer.code).catch(function () {});
        }
        syncAllUI();
        closeModal();
        openCheckoutPage();
      };
    });

    var winUse = document.getElementById('swWinUseBtn');
    if (winUse) winUse.onclick = function () {
      if (winResult && winResult.wonOffer) state.activeOfferId = winResult.wonOffer.id;
      saveState();
      winResult = null;
      closeModal();
      syncAllUI();
      openCheckoutPage();
    };
    var winBox = document.getElementById('swWinBoxBtn');
    if (winBox) winBox.onclick = function () { winResult = null; activeTab = 'boxes'; renderModal(); };
    var winScr = document.getElementById('swWinScratchBtn');
    if (winScr) winScr.onclick = function () { winResult = null; activeTab = 'scratch'; renderModal(); };
    var winKeep = document.getElementById('swWinKeepBtn');
    if (winKeep) winKeep.onclick = function () { winResult = null; renderModal(); };

    var boxUse = document.getElementById('swBoxUseBtn');
    if (boxUse) boxUse.onclick = function () {
      if (openedBoxReward) state.activeOfferId = openedBoxReward.id;
      saveState();
      openedBoxReward = null;
      closeModal();
      syncAllUI();
      openCheckoutPage();
    };
    var boxSave = document.getElementById('swBoxSaveBtn');
    if (boxSave) boxSave.onclick = function () { openedBoxReward = null; renderModal(); };

    var chx = document.getElementById('swCloseHistX');
    if (chx) chx.onclick = function () { showHistoryPanel = false; renderModal(); };
    var chb = document.getElementById('swCloseHistBtn');
    if (chb) chb.onclick = function () { showHistoryPanel = false; renderModal(); };

    var claimBtn = document.getElementById('swClaimSpinsBtn');
    if (claimBtn) claimBtn.onclick = function () {
      if (!isUserSignedIn()) {
        showNoSpinsModal = false;
        showAuthRequiredModal = true;
        renderModal();
        return;
      }
      state.spins += 2;
      state.goldenSpins += 1;
      saveState();
      showNoSpinsModal = false;
      syncAllUI();
      renderModal();
    };
    var goBuyBtn = document.getElementById('swGoBuyBtn');
    if (goBuyBtn) goBuyBtn.onclick = function () {
      showNoSpinsModal = false;
      closeModal();
      openCheckoutPage();
    };

    clearInterval(arrowIntervalId);
    clearInterval(countdownIntervalId);
    if (isModalOpen && isUserSignedIn() && hasSpunToday()) {
      countdownIntervalId = setInterval(function () {
        if (!hasSpunToday()) {
          clearInterval(countdownIntervalId);
          syncAllUI();
          renderModal();
          return;
        }
        var formatted = formatCountdownNextDay();
        document.querySelectorAll('#swRoot .sw-countdown-val').forEach(function (el) {
          el.textContent = formatted;
        });
      }, 1000);
    }

    if ((activeTab === 'spin' || activeTab === 'golden') && showTapArrow && !isSpinning && isUserSignedIn() && !hasSpunToday()) {
      var left = activeTab === 'golden' ? state.goldenSpins : state.spins;
      if (left > 0) {
        arrowIntervalId = setInterval(function () {
          arrowBlinkPhase = (arrowBlinkPhase + 1) % 2;
          document.querySelectorAll('#swRoot .sw-arrow-dot').forEach(function (dot) {
            var idx = parseInt(dot.getAttribute('data-idx'), 10);
            var lit = (idx % 2) === arrowBlinkPhase;
            dot.setAttribute('r', lit ? '2.1' : '1.5');
            dot.setAttribute('fill', lit ? '#ffffff' : '#1e3a8a');
            dot.setAttribute('fill-opacity', lit ? '1' : '0.35');
            if (lit) dot.setAttribute('filter', 'url(#swBulbGlow)');
            else dot.removeAttribute('filter');
          });
        }, 360);
      }
    }
  }

  function openModal(tab) {
    if (tab) {
      activeTab = tab;
    } else if (state.spins <= 0 && state.goldenSpins > 0) {
      activeTab = 'golden';
    } else {
      activeTab = 'spin';
    }
    isModalOpen = true;
    showTapArrow = true;
    winResult = null;
    openedBoxReward = null;
    showHistoryPanel = false;
    showNoSpinsModal = false;
    renderModal();
  }

  function closeModal() {
    isModalOpen = false;
    clearConfetti();
    if (confettiInstance && confettiInstance.reset) confettiInstance.reset();
    renderModal();
  }

  /* -------------------- Order Summary Modal -------------------- */
  function showOrderSummary(order) {
    var root = document.getElementById('swSummaryRoot');
    if (!root) return;
    root.classList.add('sw-open');

    var orig = Number(order.originalPrice || 0);
    var saved = Number(order.discountSaved || 0);
    var fin = Number(order.finalPrice != null ? order.finalPrice : Math.max(1, orig - saved));
    var oid = order.id || ('ORD-' + Math.floor(100000 + Math.random() * 900000));
    var bonusTxt = order.bonusPercent > 0 ? (' (+' + order.bonusPercent + '% Bonus)') : '';

    root.innerHTML =
      '<div class="sw-summary-backdrop" id="swSumBd"></div>' +
      '<div class="sw-summary-card">' +
        '<button type="button" class="sw-summary-x" id="swSumX" aria-label="Close">✕</button>' +
        '<div class="sw-summary-hdr">' +
          '<div class="sw-summary-chk">✓</div>' +
          '<div class="sw-summary-kicker">Status: ' + esc(order.status || 'Pending') + '</div>' +
          '<div class="sw-summary-title">Transaction Summary</div>' +
          '<div class="sw-summary-sub">' + esc(oid) + ' · ' + esc(formatTime()) + '</div>' +
        '</div>' +
        '<div class="sw-summary-box">' +
          '<div class="sw-summary-row"><span class="k">Package</span><span class="v">' + esc(order.gameName || 'Top-Up') + ' · ' + esc(order.packageLabel || '') + esc(bonusTxt) + '</span></div>' +
          '<div class="sw-summary-row"><span class="k">Player UID</span><span class="v uid sw-font-mono">' + esc(order.playerUid || '-') + '</span></div>' +
          '<div class="sw-summary-row"><span class="k">Payment</span><span class="v">' + esc(order.paymentMethod || 'Wallet Pay') + (order.trxId ? (' · TrxID: ' + esc(order.trxId)) : '') + '</span></div>' +
        '</div>' +
        '<div class="sw-price-box">' +
          '<div class="sw-price-row"><span>Original Price</span><span class="sw-font-mono" style="font-weight:700;color:#fff;">৳' + orig + '</span></div>' +
          '<div class="sw-price-row disc"><span>Total Savings' + (order.appliedOfferCode ? '<span class="sw-code-pill">' + esc(order.appliedOfferCode) + '</span>' : '') + (order.promoCodeUsed ? '<span class="sw-code-pill">' + esc(order.promoCodeUsed) + '</span>' : '') + '</span><span class="sw-font-mono">' + (saved > 0 ? ('-৳' + saved) : '৳0') + '</span></div>' +
          '<div class="sw-price-final"><span class="lbl">Final Price Paid</span><span class="amt sw-font-mono">৳' + fin + '</span></div>' +
          (order.cashbackEarned > 0 ? '<div style="text-align:right;font-size:11px;font-weight:800;color:#34d399;margin-top:4px;">+৳' + order.cashbackEarned + ' Wallet Cashback Credited!</div>' : '') +
        '</div>' +
        '<div class="sw-summary-bonus">Bonus Earned: +1 Spin &amp; +1 Golden Spin added to your account!</div>' +
        '<div class="sw-summary-btns">' +
          '<button type="button" class="sw-btn-gold" id="swSumSpinBtn">Spin &amp; Win Now</button>' +
          '<a class="sw-btn-slate" style="text-decoration:none;background:#059669;color:#fff;" target="_blank" rel="noopener noreferrer" href="https://wa.me/' + esc((supportConfig.whatsapp || '8801700000024').replace(/[^0-9]/g, '')) + '?text=' + encodeURIComponent('হ্যালো Crazy_top_up (24) সাপোর্ট,\nঅর্ডার আইডি: ' + oid + '\nগেম: ' + (order.gameName || '') + ' (' + (order.packageLabel || '') + ')\nUID: ' + (order.playerUid || '') + '\nটাকা: ৳' + fin + (order.trxId ? ', TrxID: ' + order.trxId : '')) + '">WhatsApp Support</a>' +
          '<button type="button" class="sw-btn-slate" id="swSumDoneBtn">Done</button>' +
        '</div>' +
      '</div>';

    function closeSum() { root.classList.remove('sw-open'); root.innerHTML = ''; }
    document.getElementById('swSumBd').onclick = closeSum;
    document.getElementById('swSumX').onclick = closeSum;
    document.getElementById('swSumDoneBtn').onclick = closeSum;
    document.getElementById('swSumSpinBtn').onclick = function () {
      closeSum();
      openModal('spin');
    };
  }

  /* -------------------- Discount Calculation & FFX.html Hooks -------------------- */
  function getActiveOffer() {
    var unused = getActiveOffersList();
    if (!unused.length) return null;
    for (var i = 0; i < unused.length; i++) {
      if (unused[i].id === state.activeOfferId) return unused[i];
    }
    return null;
  }

  function computePricing(basePrice) {
    var offer = getActiveOffer();
    if (!offer || !basePrice) {
      return { originalPrice: basePrice, discountSaved: 0, finalPrice: basePrice, bonusPercent: 0, offer: null, conditionWarning: '', cappedAtMax: false };
    }
    if (isOfferExpired(offer)) {
      return { originalPrice: basePrice, discountSaved: 0, finalPrice: basePrice, bonusPercent: 0, offer: offer, conditionWarning: 'এই অফারটির ২৪ ঘণ্টার মেয়াদ শেষ হয়ে গেছে।', cappedAtMax: false };
    }
    if (offer.minOrderBdt && basePrice < offer.minOrderBdt) {
      return { originalPrice: basePrice, discountSaved: 0, finalPrice: basePrice, bonusPercent: 0, offer: offer, conditionWarning: 'ন্যূনতম ৳' + offer.minOrderBdt + ' অর্ডারে এই অফারটি প্রযোজ্য', cappedAtMax: false };
    }
    var minFloor = Math.min(basePrice, 10);
    if (offer.rewardType === 'percent_discount') {
      var saved = Math.round((basePrice * offer.value) / 100);
      var capped = false;
      if (offer.maxDiscountBdt && offer.maxDiscountBdt > 0 && saved > offer.maxDiscountBdt) {
        saved = offer.maxDiscountBdt;
        capped = true;
      }
      var maxAllowed = Math.max(0, basePrice - minFloor);
      saved = Math.min(saved, maxAllowed);
      return { originalPrice: basePrice, discountSaved: saved, finalPrice: basePrice - saved, bonusPercent: 0, offer: offer, conditionWarning: '', cappedAtMax: capped };
    }
    if (offer.rewardType === 'flat_discount') {
      var savedF = offer.value;
      var cappedF = false;
      if (offer.maxDiscountBdt && offer.maxDiscountBdt > 0 && savedF > offer.maxDiscountBdt) {
        savedF = offer.maxDiscountBdt;
        cappedF = true;
      }
      var maxAllowedF = Math.max(0, basePrice - minFloor);
      savedF = Math.min(savedF, maxAllowedF);
      return { originalPrice: basePrice, discountSaved: savedF, finalPrice: basePrice - savedF, bonusPercent: 0, offer: offer, conditionWarning: '', cappedAtMax: cappedF };
    }
    return { originalPrice: basePrice, discountSaved: 0, finalPrice: basePrice, bonusPercent: offer.value, offer: offer, conditionWarning: '', cappedAtMax: false };
  }

  function updateProductOfferStrip(cfg) {
    var strip = document.getElementById('swOfferStrip_' + cfg.viewId);
    if (!strip) return;
    var activeBtn = document.querySelector('#' + cfg.pkGrid + ' .pk.on');
    var rawPrice = activeBtn ? Number(activeBtn.getAttribute('data-price') || 0) : 0;
    var pricing = computePricing(rawPrice);
    var unusedOffers = getActiveOffersList();

    strip.className = 'sw-pv-offer' + (pricing.offer ? ' has-active' : '');
    var optionsHTML = '<option value="">-- কোনো অফার সিলেক্ট নেই (' + unusedOffers.length + 'টি অফার আছে) --</option>' +
      unusedOffers.map(function (o) {
        return '<option value="' + esc(o.id) + '"' + (pricing.offer && pricing.offer.id === o.id ? ' selected' : '') + '>' +
          esc(o.title) + ' (' + esc(o.code) + ')</option>';
      }).join('');

    var breakdownHTML = '';
    if (pricing.offer && rawPrice > 0) {
      if (pricing.discountSaved > 0) {
        breakdownHTML = '<div class="sw-pv-breakdown">' +
          '<span>ডিসকাউন্ট: <s>৳' + rawPrice + '</s> → <b style="font-size:14px;">৳' + pricing.finalPrice + '</b></span>' +
          '<span>সাশ্রয়: -৳' + pricing.discountSaved + '</span>' +
        '</div>';
      } else if (pricing.bonusPercent > 0) {
        breakdownHTML = '<div class="sw-pv-breakdown">' +
          '<span>বোনাস অফার: +' + pricing.bonusPercent + '% Extra Bonus</span>' +
          '<span>মোট: ৳' + rawPrice + '</span>' +
        '</div>';
      } else if (pricing.conditionWarning) {
        breakdownHTML = '<div class="sw-rule-warn">⚠️ ' + esc(pricing.conditionWarning) + '</div>';
      }
    }

    strip.innerHTML =
      '<div class="sw-pv-top">' +
        '<span class="sw-pill-tag sw-pv-label">🎡 Spin &amp; Win Offer</span>' +
        '<button type="button" class="sw-pv-spin-link" data-sw-open="spin">' + (unusedOffers.length > 0 ? 'Spin / Offers' : 'Spin Now') + '</button>' +
      '</div>' +
      (unusedOffers.length > 0
        ? '<div class="sw-pv-select-row"><select class="sw-pv-select" id="swSel_' + cfg.viewId + '">' + optionsHTML + '</select></div>'
        : '<div style="margin-top:6px;font-size:11.5px;color:#475569;">ডিসকাউন্ট বা বোনাস পেতে উপরের <b>Spin Now</b> বাটনে ক্লিক করে চাকা ঘোরান!</div>') +
      breakdownHTML;

    var selEl = document.getElementById('swSel_' + cfg.viewId);
    if (selEl) {
      selEl.onchange = function () {
        state.activeOfferId = selEl.value || null;
        saveState();
        syncAllProductViews();
      };
    }
    var spinLink = strip.querySelector('[data-sw-open]');
    if (spinLink) spinLink.onclick = function () { openModal('spin'); };

    var needEl = document.getElementById(cfg.needEl);
    if (needEl && rawPrice > 0) {
      guardNeedMutation = true;
      needEl.textContent = String(pricing.finalPrice);
      setTimeout(function () { guardNeedMutation = false; }, 0);
    }
  }

  function renderAmPendingCard() {
    var box = document.getElementById('amPendingCard');
    if (!box) return;
    if (!pendingProductOrder) {
      box.hidden = true;
      box.style.display = 'none';
      box.innerHTML = '';
      return;
    }
    var curBal = Number(state.walletBalanceBdt || 0);
    var reqAmt = Number(pendingProductOrder.pricing.finalPrice || 0);
    var readyToPay = curBal >= reqAmt;
    box.hidden = false;
    box.style.display = 'flex';
    box.innerHTML =
      '<div style="min-width:0;flex:1;">' +
        '<div style="font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.4px;color:' + (readyToPay ? '#15803d' : '#1558c0') + ';">' +
          (readyToPay ? '✅ ব্যালেন্স রেডি — অর্ডার সম্পন্ন করুন' : 'Wallet Pay অর্ডার পেন্ডিং') +
        '</div>' +
        '<div style="font-size:13px;font-weight:800;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;">' +
          esc(pendingProductOrder.cfg.name) + ' · ' + esc(pendingProductOrder.pkgName) +
        '</div>' +
        '<div style="font-size:11px;color:#64748b;margin-top:2px;">UID: <b>' + esc(pendingProductOrder.uidVal) + '</b> · প্রয়োজন: <b>৳' + reqAmt + '</b> (ওয়ালেট: ৳' + curBal + ')</div>' +
      '</div>' +
      (readyToPay
        ? '<button type="button" id="amCompletePendingBtn" style="padding:8px 12px;border:0;border-radius:10px;background:#16a34a;color:#fff;font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap;flex-shrink:0;">Pay ৳' + reqAmt + '</button>'
        : '<button type="button" id="amCancelPendingBtn" style="padding:7px 10px;border:0;border-radius:9px;background:#f1f5f9;color:#475569;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;flex-shrink:0;">Back</button>');

    var payNowBtn = document.getElementById('amCompletePendingBtn');
    if (payNowBtn) {
      payNowBtn.onclick = function () {
        submitPendingProductOrder(payNowBtn);
      };
    }
    var backBtn = document.getElementById('amCancelPendingBtn');
    if (backBtn) {
      backBtn.onclick = function () {
        var ret = (pendingProductOrder && pendingProductOrder.returnHash) || '';
        pendingProductOrder = null;
        renderAmPendingCard();
        location.hash = ret ? ret.replace(/^#/, '') : '';
      };
    }
  }

  function submitProductOrderDirect(cfg, pkgName, uidVal, payMethod, pricing, usedOfferObj, triggerBtn) {
    if (usedOfferObj) {
      usedOfferObj.used = true;
      state.activeOfferId = null;
    }
    state.spins += 1;
    state.goldenSpins += 1;
    saveState();
    syncAllUI();

    var ordObj = {
      gameName: cfg.name,
      packageLabel: pkgName,
      playerUid: uidVal,
      paymentMethod: payMethod,
      originalPrice: pricing.originalPrice,
      discountSaved: pricing.discountSaved,
      finalPrice: pricing.finalPrice,
      bonusPercent: pricing.bonusPercent,
      appliedOfferCode: usedOfferObj ? usedOfferObj.code : ''
    };
    if (apiAvailable !== false && isUserSignedIn()) {
      if (triggerBtn) triggerBtn.disabled = true;
      apiPostJson('/api/orders', {
        identifier: getUserKey(),
        gameName: cfg.name,
        packageLabel: pkgName,
        playerUid: uidVal,
        paymentMethod: payMethod,
        originalPrice: pricing.originalPrice,
        appliedOfferId: usedOfferObj ? usedOfferObj.id : null
      }).then(function (data) {
        applyServerPayload(data, true);
        if (data.referralRewarded) showOfferToast('🤝 Referral Bonus: +1 Scratch Card & +1 Golden Spin!', '', 'scratcher');
        pendingProductOrder = null;
        renderAmPendingCard();
        syncAllUI();
        showOrderSummary(data.order || ordObj);
      }).catch(function (err) {
        if (payMethod === 'Wallet Pay' && err && /insufficient wallet/i.test(String(err.message || ''))) {
          var needed = Math.max(20, pricing.finalPrice - Number(state.walletBalanceBdt || 0));
          openAddMoneyForOrder(needed, {
            cfg: cfg, pkgName: pkgName, uidVal: uidVal, pricing: pricing, usedOfferObj: usedOfferObj, returnHash: location.hash || ''
          }, 1);
          return;
        }
        showOfferToast('❌ ' + ((err && err.message) || 'অর্ডার সাবমিট ব্যর্থ হয়েছে।'), '', '');
      }).finally(function () {
        if (triggerBtn) triggerBtn.disabled = false;
      });
    } else {
      pendingProductOrder = null;
      renderAmPendingCard();
      showOrderSummary(ordObj);
    }
  }

  function submitPendingProductOrder(btnEl) {
    if (!pendingProductOrder) return;
    var p = pendingProductOrder;
    submitProductOrderDirect(p.cfg, p.pkgName, p.uidVal, 'Wallet Pay', p.pricing, p.usedOfferObj, btnEl);
  }

  function openAddMoneyForOrder(amountBdt, pendingObj, startStep) {
    pendingProductOrder = pendingObj || null;
    var targetStep = startStep === 2 ? 2 : 1;
    amOpenedDirectlyToGateway = (targetStep === 2);
    var amt = Math.max(20, Math.round(Number(amountBdt) || 20));
    var inp = document.getElementById('amAmtInput');
    var ch = document.getElementById('amChosenAmt');
    var payBar = document.getElementById('amGwPayBar');
    if (targetStep === 2) {
      if (inp) inp.value = String(amt);
      if (ch) ch.textContent = 'Amount: ৳' + amt;
      if (payBar) payBar.textContent = 'Pay ' + amt + '.00';
    } else {
      if (inp) inp.value = '';
      if (ch) ch.textContent = 'Amount: ৳0';
      if (payBar) payBar.textContent = 'Pay 0.00';
    }
    var err1 = document.getElementById('amErr1');
    if (err1) err1.style.display = 'none';
    renderAmPendingCard();
    if (typeof window.__amShowStep === 'function') {
      window.__amShowStep(targetStep);
    }
    location.hash = 'add-money';
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
  }

  function syncAllProductViews() {
    var balNum = Number(state.walletBalanceBdt || 0);
    PRODUCT_VIEWS.forEach(function (cfg) {
      updateProductOfferStrip(cfg);
      if (cfg.balEl) {
        var bEl = document.getElementById(cfg.balEl);
        if (bEl) bEl.textContent = balNum.toFixed(2);
      }
    });
    var walTop = document.querySelector('a.wallet');
    if (walTop) {
      walTop.innerHTML = '<svg class="i"><use href="#wal"/></svg>' + Math.round(balNum) + '৳';
    }
    renderAmPendingCard();
  }

  function setupProductHooks() {
    PRODUCT_VIEWS.forEach(function (cfg) {
      var view = document.getElementById(cfg.viewId);
      var needEl = document.getElementById(cfg.needEl);
      var buyBtn = document.getElementById(cfg.buyBtn);
      var pkGrid = document.getElementById(cfg.pkGrid);
      if (!view || !needEl) return;

      var hintP = needEl.closest('.hint');
      if (hintP && !document.getElementById('swOfferStrip_' + cfg.viewId)) {
        var strip = document.createElement('div');
        strip.id = 'swOfferStrip_' + cfg.viewId;
        strip.className = 'sw-pv-offer';
        hintP.parentNode.insertBefore(strip, hintP);
      }

      if (pkGrid) {
        pkGrid.addEventListener('click', function () {
          setTimeout(function () { updateProductOfferStrip(cfg); }, 0);
        });
        pkGrid.addEventListener('pointerup', function () {
          setTimeout(function () { updateProductOfferStrip(cfg); }, 10);
        });
      }

      var obs = new MutationObserver(function () {
        if (!guardNeedMutation) updateProductOfferStrip(cfg);
      });
      obs.observe(needEl, { childList: true, characterData: true, subtree: true });

      if (buyBtn) {
        buyBtn.addEventListener('click', function () {
          var txt = (buyBtn.textContent || '').trim().toLowerCase();
          if (txt === 'login' || !isUserSignedIn()) return;
          var activePk = document.querySelector('#' + cfg.pkGrid + ' .pk.on');
          var uidInput = document.getElementById(cfg.uidInp);
          var uidVal = uidInput ? uidInput.value.trim() : '';
          if (!activePk || uidVal.length < 6) return;

          var pkgName = activePk.getAttribute('data-name') || 'Top-Up Package';
          var basePrice = Number(activePk.getAttribute('data-price') || 0);
          var activePay = document.querySelector(cfg.poSel + '.on');
          var payMethod = activePay ? (activePay.getAttribute('data-pay') || 'Wallet Pay') : 'Wallet Pay';
          var pricing = computePricing(basePrice);
          var usedOfferObj = (pricing.offer && !pricing.conditionWarning) ? pricing.offer : null;
          var curBal = Number(state.walletBalanceBdt || 0);

          if (payMethod === 'Wallet Pay' && curBal < pricing.finalPrice) {
            var neededAmt = Math.max(20, pricing.finalPrice - curBal);
            playClick();
            openAddMoneyForOrder(neededAmt, {
              cfg: cfg,
              pkgName: pkgName,
              uidVal: uidVal,
              pricing: pricing,
              usedOfferObj: usedOfferObj,
              returnHash: location.hash || ''
            }, 1);
            return;
          }

          if (payMethod === 'Instant Pay') {
            playClick();
            openAddMoneyForOrder(Math.max(20, pricing.finalPrice), {
              cfg: cfg,
              pkgName: pkgName,
              uidVal: uidVal,
              pricing: pricing,
              usedOfferObj: usedOfferObj,
              returnHash: location.hash || ''
            }, 2);
            return;
          }

          submitProductOrderDirect(cfg, pkgName, uidVal, payMethod, pricing, usedOfferObj, buyBtn);
        });
      }
    });
  }


  /* -------------------- Crazy_top_up (24) Discount Checkout Page -------------------- */
  var CO_CATEGORIES = [
    {
      id: 'uid-bd',
      name: 'UID Topup (BD)',
      publisher: 'Garena Free Fire',
      currency: 'Diamonds',
      uidLabel: 'Player UID',
      uidPlaceholder: 'e.g. 2149083712',
      packages: [
        { id: 'bd-25', name: '25 Diamond', bonus: 'Instant UID Delivery', price: 22 },
        { id: 'bd-115', name: '115 Diamond', bonus: 'Instant UID Delivery', price: 79, popular: true },
        { id: 'bd-240', name: '240 Diamond', bonus: 'Fast Top-Up', price: 158 },
        { id: 'bd-355', name: '355 Diamond', bonus: 'Popular Pack', price: 237 },
        { id: 'bd-610', name: '610 Diamond', bonus: 'Bonus Included', price: 400 },
        { id: 'bd-1240', name: '1240 Diamond', bonus: 'Mega Bundle', price: 800 }
      ]
    },
    {
      id: 'wm',
      name: 'Weekly / Monthly',
      publisher: 'Free Fire Membership',
      currency: 'Membership',
      uidLabel: 'Player UID',
      uidPlaceholder: 'e.g. 2149083712',
      packages: [
        { id: 'wm-w1', name: 'WEEKLY', bonus: '450 Total Diamonds', price: 155, popular: true },
        { id: 'wm-w2', name: '2X WEEKLY', bonus: '900 Total Diamonds', price: 310 },
        { id: 'wm-m1', name: 'MONTHLY', bonus: '2600 Total Diamonds', price: 770 },
        { id: 'wm-wm', name: '1X WEEKLY + 1X MONTHLY', bonus: 'Combo Membership', price: 925 }
      ]
    },
    {
      id: 'wl',
      name: 'Weekly Lite',
      publisher: 'Free Fire Lite',
      currency: 'Weekly Lite',
      uidLabel: 'Player UID',
      uidPlaceholder: 'e.g. 2149083712',
      packages: [
        { id: 'wl-1', name: '1X Weekly Lite', bonus: 'Daily Claim', price: 40, popular: true },
        { id: 'wl-2', name: '2X Weekly Lite', bonus: 'Double Lite', price: 80 },
        { id: 'wl-3', name: '3X Weekly Lite', bonus: 'Triple Lite', price: 120 },
        { id: 'wl-5', name: '5X Weekly Lite', bonus: 'Max Lite', price: 200 }
      ]
    },
    {
      id: 'lu',
      name: 'Level Up Pass',
      publisher: 'Free Fire Pass',
      currency: 'Level Up Pass',
      uidLabel: 'Player UID',
      uidPlaceholder: 'e.g. 2149083712',
      packages: [
        { id: 'lu-6', name: 'Level Up - Level 6', bonus: '120 Diamonds', price: 43 },
        { id: 'lu-10', name: 'Level Up - Level 10', bonus: '200 Diamonds', price: 75 },
        { id: 'lu-30', name: 'Level Up - Level 30', bonus: '300 Diamonds', price: 105 },
        { id: 'lu-full', name: 'Full Level Up (1270D)', bonus: 'All Levels Included', price: 448, popular: true }
      ]
    },
    {
      id: 'likes',
      name: 'FF Likes',
      publisher: 'Profile Boost',
      currency: 'FF Likes',
      uidLabel: 'Player UID',
      uidPlaceholder: 'e.g. 2149083712',
      packages: [
        { id: 'lk-200', name: '200 FF LIKE', bonus: 'Daily 1x / ID', price: 30, popular: true },
        { id: 'lk-3k', name: '3000 FF LIKE', bonus: '15 Days Plan', price: 450 },
        { id: 'lk-6k', name: '6000 FF LIKE', bonus: '30 Days Plan', price: 900 },
        { id: 'lk-12k', name: '12000 FF LIKE', bonus: '60 Days Plan', price: 1800 }
      ]
    },
    {
      id: 'indo',
      name: 'Indonesia Server',
      publisher: 'FF Indo Region',
      currency: 'Indo Diamonds',
      uidLabel: 'Indonesia UID',
      uidPlaceholder: 'e.g. 2149083712',
      packages: [
        { id: 'in-50', name: '50 Diamond (Indo)', bonus: 'Indo Server', price: 65 },
        { id: 'in-140', name: '140 Diamond (Indo)', bonus: 'Indo Server', price: 180, popular: true },
        { id: 'in-355', name: '355 Diamond (Indo)', bonus: 'Indo Server', price: 445 },
        { id: 'in-720', name: '720 Diamond (Indo)', bonus: 'Indo Server', price: 890 }
      ]
    }
  ];

  var coState = {
    catId: 'uid-bd',
    pkgId: 'bd-115',
    uid: '',
    payMethod: 'bKash',
    senderNumber: '',
    trxId: '',
    paymentProof: '',
    promoInput: '',
    appliedPromo: null,
    promoMsg: '',
    uidErr: '',
    checkoutErr: '',
    lbTab: 'buyers',
    showWalletModal: false,
    walletMethod: 'bKash',
    walletAmt: '500',
    walletSender: '',
    walletTrx: '',
    walletProof: '',
    walletMsg: '',
    supportOrderId: '',
    supportInput: '',
    supportErr: '',
    showSaveProfile: false,
    profileNick: '',
    autoSaveUid: true,
    celebrateUntil: 0
  };
  function computeStackedCheckoutPricing(basePrice) {
    var offerPr = computePricing(basePrice);
    var vip = getVipSpendStatusLocal(state.lifetimeSpendBdt || 0);
    var flashLive = Boolean(flashSaleConfig && flashSaleConfig.active && flashSaleConfig.extraPercent > 0 && (!flashSaleConfig.endsAt || Date.now() < flashSaleConfig.endsAt));
    var flashDisc = flashLive ? Math.round((basePrice * flashSaleConfig.extraPercent) / 100) : 0;
    var vipDisc = vip.discountPercent > 0 ? Math.round((basePrice * vip.discountPercent) / 100) : 0;
    var promoDisc = 0;
    var promoWarn = '';
    if (coState.appliedPromo) {
      if (coState.appliedPromo.minOrderBdt > 0 && basePrice < coState.appliedPromo.minOrderBdt) {
        promoWarn = 'প্রোমো ' + coState.appliedPromo.code + ': ন্যূনতম ৳' + coState.appliedPromo.minOrderBdt + ' প্রয়োজন।';
      } else {
        promoDisc = coState.appliedPromo.discountType === 'percent'
          ? Math.round((basePrice * coState.appliedPromo.value) / 100)
          : coState.appliedPromo.value;
        if (coState.appliedPromo.maxDiscountBdt > 0) promoDisc = Math.min(promoDisc, coState.appliedPromo.maxDiscountBdt);
      }
    }
    var rawTot = offerPr.discountSaved + flashDisc + vipDisc + promoDisc;
    var totalSaved = Math.min(Math.max(0, basePrice - 10), rawTot);
    var fin = Math.max(10, basePrice - totalSaved);
    var estCb = (coState.payMethod === 'Wallet Pay' && walletCashbackPercent > 0)
      ? Math.round((fin * walletCashbackPercent) / 100)
      : 0;
    return {
      originalPrice: basePrice,
      offerDiscount: offerPr.discountSaved,
      flashDiscount: flashDisc,
      vipDiscount: vipDisc,
      promoDiscount: promoDisc,
      discountSaved: totalSaved,
      finalPrice: fin,
      bonusPercent: offerPr.bonusPercent,
      offer: offerPr.offer,
      conditionWarning: offerPr.conditionWarning,
      promoWarn: promoWarn,
      estCashback: estCb,
      vip: vip,
      flashLive: flashLive
    };
  }

  function fireCheckoutConfetti() {
    if (typeof window.confetti === 'function') {
      try {
        window.confetti({
          particleCount: 65,
          spread: 85,
          startVelocity: 38,
          origin: { x: 0.5, y: 0.22 },
          colors: ['#34d399', '#facc15', '#38bdf8', '#ffffff'],
          disableForReducedMotion: true
        });
      } catch (e) {}
    }
  }

  function openCheckoutPage(withCelebrate) {
    if (withCelebrate !== false && getActiveOffer()) {
      coState.celebrateUntil = Date.now() + 2600;
      setTimeout(fireCheckoutConfetti, 80);
    }
    if (location.hash !== '#spin-checkout') {
      location.hash = 'spin-checkout';
    } else {
      syncCheckoutRoute();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderCheckoutView() {
    var view = document.getElementById('swCheckoutView');
    if (!view) return;
    if (location.hash !== '#spin-checkout') {
      view.classList.remove('sw-active');
      return;
    }
    view.classList.add('sw-active');

    var cat = CO_CATEGORIES[0];
    for (var i = 0; i < CO_CATEGORIES.length; i++) {
      if (CO_CATEGORIES[i].id === coState.catId) { cat = CO_CATEGORIES[i]; break; }
    }
    coState.catId = cat.id;
    var pkgList = Array.isArray(cat.packages) && cat.packages.length ? cat.packages : [{ id: 'empty', name: 'No Package', bonus: '', price: 100, inStock: false }];
    var pkg = pkgList.find(function (p) { return p.id === coState.pkgId; }) || pkgList.find(function (p) { return p.inStock !== false; }) || pkgList[0];
    coState.pkgId = pkg.id;
    var isGameMaint = cat.active === false;
    var isPkgOos = pkg.inStock === false;

    var unusedOffers = getActiveOffersList();
    var activeOffer = getActiveOffer();
    var selPricing = computeStackedCheckoutPricing(pkg.price);
    var vipStatus = selPricing.vip;
    var totalSpins = state.spins + state.goldenSpins;

    var isCelebrating = Date.now() < coState.celebrateUntil;
    var appliedMeta = activeOffer
      ? (' <span style="font-size:11px;color:#7dd3fc;font-family:JetBrains Mono,monospace;">[' + esc(formatOfferExpiry(activeOffer.expiresAt)) + ']</span>' +
         (activeOffer.minOrderBdt ? ' <span style="font-size:11px;color:#fde68a;">· ন্যূনতম ৳' + activeOffer.minOrderBdt + '</span>' : '') +
         (activeOffer.maxDiscountBdt ? ' <span style="font-size:11px;color:#fde68a;">· সর্বোচ্চ ছাড় ৳' + activeOffer.maxDiscountBdt + '</span>' : ''))
      : '';
    var appliedBarHTML = activeOffer
      ? '<div class="sw-co-applied' + (isCelebrating ? ' sw-celebrate' : '') + '">' +
          '<div class="sw-co-applied-txt">' + (isCelebrating ? '🎉' : '✓') + ' <b>' + (isCelebrating ? 'Discount Applied:' : 'Offer Applied:') + '</b> ' + esc(activeOffer.title) + ' <span class="sw-co-applied-code">(' + esc(activeOffer.code) + ')</span>' + appliedMeta + '</div>' +
          '<button type="button" class="sw-co-remove" id="swCoRemoveOffer">✕ Remove</button>' +
        '</div>'
      : '';

    var gamesHTML = CO_CATEGORIES.map(function (g) {
      return '<button type="button" class="sw-co-game-btn' + (g.id === cat.id ? ' on' : '') + '" data-co-cat="' + esc(g.id) + '">' + esc(g.name) + (g.active === false ? '<span class="sw-co-game-off">Off</span>' : '') + '</button>';
    }).join('');

    var watchlistArr = Array.isArray(state.stockWatchlist) ? state.stockWatchlist : [];
    var restockedNames = [];
    CO_CATEGORIES.forEach(function (cg) {
      cg.packages.forEach(function (pk) {
        if (pk.inStock !== false && watchlistArr.indexOf(pk.id) !== -1) {
          restockedNames.push(cg.name + ' · ' + pk.name);
        }
      });
    });
    var restockBannerHTML = restockedNames.length > 0
      ? '<div class="sw-restock-banner"><span>🔔 <b>Back in Stock:</b> ' + esc(restockedNames.join(', ')) + '</span><span style="color:#34d399;font-weight:800;">Ready to Order!</span></div>'
      : '';
    var pkgsHTML = pkgList.map(function (p) {
      var oos = p.inStock === false;
      var pr = computeStackedCheckoutPricing(p.price);
      var on = p.id === pkg.id && !oos;
      var watched = watchlistArr.indexOf(p.id) !== -1;
      return '<div style="display:flex;flex-direction:column;">' +
        '<button type="button" class="sw-co-pkg' + (on ? ' on' : '') + (oos ? ' oos' : '') + '" data-co-pkg="' + esc(p.id) + '"' + (oos ? ' disabled' : '') + '>' +
          '<div class="sw-co-pkg-top">' +
            '<div><div class="sw-co-pkg-name">' + esc(p.name) + '</div><div class="sw-co-pkg-bonus">' + esc(p.bonus) + (!oos && pr.bonusPercent > 0 ? (' · +' + pr.bonusPercent + '% Spin Bonus') : '') + '</div></div>' +
            (oos ? '<span class="sw-co-pkg-oos">Out of Stock</span>' : (p.popular ? '<span class="sw-co-pkg-pop">Popular</span>' : '')) +
          '</div>' +
          '<div class="sw-co-pkg-price"><span class="sw-co-pkg-final' + (!oos && isCelebrating && (pr.discountSaved > 0 || pr.bonusPercent > 0) ? ' sw-price-pop' : '') + '">৳' + pr.finalPrice + '</span>' + (!oos && pr.discountSaved > 0 ? '<span class="sw-co-pkg-orig">৳' + pr.originalPrice + '</span>' : '') + '</div>' +
        '</button>' +
        (oos ? '<button type="button" class="sw-watch-btn' + (watched ? ' on' : '') + '" data-watch-pkg="' + esc(p.id) + '">' + (watched ? '🔔 Alert Active (Tap to Remove)' : '🔔 Notify Me When Back') + '</button>' : '') +
      '</div>';
    }).join('');

    var gameProfiles = (Array.isArray(state.savedProfiles) ? state.savedProfiles : []).filter(function (sp) { return sp.gameId === cat.id; });
    var savedUidChipsHTML = gameProfiles.length > 0
      ? '<div class="sw-uid-chips">' + gameProfiles.map(function (sp) {
          var isMatch = (coState.uid || '').trim() === sp.playerUid;
          return '<div class="sw-uid-chip' + (isMatch ? ' on' : '') + '">' +
            '<button type="button" class="sw-uid-chip-btn" data-use-prof="' + esc(sp.playerUid) + '"><span>' + esc(sp.nickname) + '</span><span class="mono">' + esc(sp.playerUid) + '</span></button>' +
            '<button type="button" class="sw-uid-chip-del" data-del-prof="' + esc(sp.id) + '" title="Delete">✕</button>' +
          '</div>';
        }).join('') + '</div>'
      : '';

    var offersHTML = unusedOffers.length === 0
      ? '<div style="border:1px dashed #334155;border-radius:11px;padding:12px;display:flex;align-items:center;justify-content:space-between;gap:10px;background:#0d131b;">' +
          '<span style="font-size:12px;color:#94a3b8;">Spin the wheel to win instant discounts</span>' +
          '<button type="button" id="swCoEmptySpin" style="background:none;border:none;color:#fcd34d;font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap;">Spin Now →</button>' +
        '</div>'
      : '<div class="sw-co-offer-list">' + unusedOffers.map(function (o) {
          var isOn = activeOffer && o.id === activeOffer.id;
          var cond = (o.minOrderBdt ? (' · ন্যূনতম ৳' + o.minOrderBdt) : '') + (o.maxDiscountBdt ? (' · সর্বোচ্চ ৳' + o.maxDiscountBdt) : '');
          return '<button type="button" class="sw-co-offer-item' + (isOn ? ' on' : '') + '" data-co-offer="' + esc(o.id) + '">' +
            '<div style="min-width:0;"><div class="sw-co-offer-title">' + esc(o.title) + '</div><div class="sw-co-offer-code">' + esc(o.code) + ' · ⏳ ' + esc(formatOfferExpiry(o.expiresAt)) + esc(cond) + '</div></div>' +
            '<span class="sw-co-offer-tag">' + (isOn ? 'Applied' : 'Apply') + '</span>' +
          '</button>';
        }).join('') + '</div>';

    var pays = [
      { name: 'bKash', dt: 'Send Money · TrxID' },
      { name: 'Nagad', dt: 'Send Money · TrxID' },
      { name: 'Rocket', dt: 'DBBL · TrxID' },
      { name: 'Wallet Pay', dt: '৳' + (state.walletBalanceBdt || 0) + ' + ' + walletCashbackPercent + '% CB' }
    ];
    var paysHTML = pays.map(function (pm) {
      return '<button type="button" class="sw-co-pay' + (coState.payMethod === pm.name ? ' on' : '') + '" data-co-pay="' + esc(pm.name) + '">' +
        '<div class="sw-co-pay-nm">' + esc(pm.name) + '</div><div class="sw-co-pay-dt">' + esc(pm.dt) + '</div>' +
      '</button>';
    }).join('');
    var activePayNum = coState.payMethod === 'bKash' ? paymentNumbers.bkash : (coState.payMethod === 'Nagad' ? paymentNumbers.nagad : (coState.payMethod === 'Rocket' ? paymentNumbers.rocket : ''));
    var payExtraHTML = coState.payMethod !== 'Wallet Pay'
      ? '<div class="sw-co-paybox">' +
          '<div class="sw-co-paynum">' +
            '<div><div style="font-size:11px;color:#94a3b8;">নিচের ' + esc(coState.payMethod) + ' (Personal) নম্বরে ৳' + selPricing.finalPrice + ' Send Money করুন:</div><strong>' + esc(activePayNum) + '</strong></div>' +
            '<button type="button" class="sw-co-copy-mini" id="swCoCopyPayNum">Copy</button>' +
          '</div>' +
          '<div class="sw-co-paygrid">' +
            '<div><label class="sw-co-lbl" for="swCoSenderInp">Sender Number</label><input type="text" class="sw-co-input" id="swCoSenderInp" value="' + esc(coState.senderNumber) + '" placeholder="017XXXXXXXX"/></div>' +
            '<div><label class="sw-co-lbl" for="swCoTrxInp">TrxID</label><input type="text" class="sw-co-input" style="text-transform:uppercase;" id="swCoTrxInp" value="' + esc(coState.trxId) + '" placeholder="e.g. BL78K291M"/></div>' +
          '</div>' +
          '<div class="sw-proof-box">' +
            '<label class="sw-proof-lbl" for="swCoProofInp"><span>📸 Payment Screenshot (Optional)</span><span class="sw-proof-btn">' + (coState.paymentProof ? 'Change Image' : 'Upload Proof') + '</span></label>' +
            '<input type="file" accept="image/*" id="swCoProofInp" style="display:none;"/>' +
            (coState.paymentProof ? '<div class="sw-proof-prev"><img src="' + esc(coState.paymentProof) + '" alt="Payment Proof"/><button type="button" id="swCoProofRem" style="background:none;border:0;color:#f87171;font-size:11px;font-weight:800;cursor:pointer;">✕ Remove</button></div>' : '') +
          '</div>' +
        '</div>'
      : '<div class="sw-co-wallet-box">' +
          '<div><div style="font-weight:800;color:#34d399;">Wallet Balance: ৳' + (state.walletBalanceBdt || 0) + '</div><div style="font-size:11px;color:#cbd5e1;">ওয়ালেটে পে করলে +' + walletCashbackPercent + '% (৳' + selPricing.estCashback + ') Cashback পাবেন!</div></div>' +
          '<button type="button" class="sw-co-promo-btn" style="background:#10b981;color:#020617;border:0;padding:7px 11px;" id="swCoOpenWallet">+ Add Money</button>' +
        '</div>';

    var promoHTML = '<div class="sw-co-promo">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;"><label class="sw-co-lbl" for="swCoPromoInp" style="margin:0;">Promo Code (e.g. CRAZY10, VIP50)</label>' +
      (coState.appliedPromo ? '<button type="button" id="swCoRemovePromo" style="background:none;border:none;color:#f87171;font-size:11px;font-weight:800;cursor:pointer;">Remove ' + esc(coState.appliedPromo.code) + '</button>' : '') +
      '</div>' +
      '<div class="sw-co-promo-row"><input type="text" class="sw-co-input" style="text-transform:uppercase;padding:8px 10px;font-size:12px;" id="swCoPromoInp" value="' + esc(coState.promoInput) + '" placeholder="Enter promo code"/><button type="button" class="sw-co-promo-btn" id="swCoApplyPromoBtn">Apply</button></div>' +
      (coState.promoMsg ? '<div style="font-size:11px;font-weight:700;margin-top:5px;color:' + (coState.promoMsg.indexOf('✅') === 0 ? '#34d399' : '#fcd34d') + ';">' + esc(coState.promoMsg) + '</div>' : '') +
      '</div>';

    var flashHTML = (selPricing.flashLive && flashSaleConfig)
      ? '<div class="sw-co-flash"><span>⚡ ' + esc(flashSaleConfig.title) + ' (Auto +' + flashSaleConfig.extraPercent + '% OFF)</span><span class="tm">Ends: ' + esc(formatOfferExpiry(flashSaleConfig.endsAt)) + '</span></div>'
      : '';

    var vipCardHTML = '<div class="sw-vip-card">' +
      '<div class="sw-vip-top"><span>👑 ' + esc(vipStatus.rank) + ' VIP Tier</span><span style="color:#34d399;font-family:JetBrains Mono,monospace;">' + (vipStatus.discountPercent > 0 ? (vipStatus.discountPercent + '% Auto OFF') : 'Spend ৳1000 → 2%') + '</span></div>' +
      '<div class="sw-vip-bar"><div class="sw-vip-fill" style="width:' + vipStatus.progressPercent + '%;"></div></div>' +
      '<div class="sw-vip-sub">' + (vipStatus.nextRank ? ('৳' + vipStatus.lifetimeSpendBdt + ' / ৳' + vipStatus.nextThresholdBdt + ' → ' + vipStatus.nextRank) : ('সর্বোচ্চ Diamond VIP (৳' + vipStatus.lifetimeSpendBdt + ')')) + '</div>' +
      '</div>';

    var lbEntries = coState.lbTab === 'buyers' ? (leaderboardData.topBuyers || []) : (leaderboardData.topReferrers || []);
    var lbHTML = '<div class="sw-co-card">' +
      '<div class="sw-co-card-hd"><h2>🏆 Monthly Leaderboard</h2><div class="sw-lb-tabs">' +
      '<button type="button" class="sw-lb-tab' + (coState.lbTab === 'buyers' ? ' on' : '') + '" data-lb-tab="buyers">Top Buyers</button>' +
      '<button type="button" class="sw-lb-tab' + (coState.lbTab === 'referrers' ? ' on' : '') + '" data-lb-tab="referrers">Top Referrers</button>' +
      '</div></div>' +
      lbEntries.map(function (ent, idx) {
        return '<div class="sw-lb-row"><span><b style="color:#fcd34d;margin-right:6px;">#' + (idx + 1) + '</b><b style="color:#fff;">' + esc(ent.name) + '</b> <span style="font-size:10px;color:#c084fc;">(' + esc(ent.vipRank) + ')</span></span><span style="font-family:JetBrains Mono,monospace;font-weight:800;color:#34d399;">' + (coState.lbTab === 'buyers' ? ('৳' + ent.metricValue) : (ent.metricValue + ' Invites')) + '</span></div>';
      }).join('') +
      '</div>';

    var waNumClean = (supportConfig.whatsapp || '8801700000024').replace(/[^0-9]/g, '');
    var ordersList = Array.isArray(state.orders) ? state.orders : [];
    var recentOrdersHTML = ordersList.length > 0
      ? '<div class="sw-co-card"><div class="sw-co-card-hd"><h3>Recent Purchases &amp; Live Status</h3></div>' +
          ordersList.slice(0, 4).map(function (ord) {
            var st = ord.status || 'Pending';
            var ordWaHref = 'https://wa.me/' + waNumClean + '?text=' + encodeURIComponent('হ্যালো Crazy_top_up (24) সাপোর্ট,\nঅর্ডার আইডি: ' + ord.id + ' (' + st + ')\nUID: ' + ord.playerUid + (ord.trxId ? ', TrxID: ' + ord.trxId : ''));
            return '<div class="sw-co-ord-row">' +
              '<div style="min-width:0;"><div style="font-weight:700;color:#fff;">' + esc(ord.gameName) + ' · ' + esc(ord.packageLabel) + '</div>' +
              '<div style="color:#94a3b8;font-family:JetBrains Mono,monospace;font-size:11px;">' + esc(ord.id) + ' · UID ' + esc(ord.playerUid) + (ord.trxId ? (' · ' + esc(ord.trxId)) : '') + '</div></div>' +
              '<div style="text-align:right;flex-shrink:0;"><div><span class="sw-st-badge sw-st-' + esc(st) + '">' + esc(st) + '</span> <span style="font-weight:800;color:#fcd34d;font-family:JetBrains Mono,monospace;">৳' + ord.finalPrice + '</span></div>' +
              '<div style="display:flex;gap:8px;justify-content:flex-end;align-items:center;margin-top:3px;">' +
                '<button type="button" data-ord-chat="' + esc(ord.id) + '" style="background:none;border:0;padding:0;font-size:10.5px;color:#7dd3fc;font-weight:800;cursor:pointer;">💬 Support Chat' + ((ord.supportMessages && ord.supportMessages.length) ? (' (' + ord.supportMessages.length + ')') : '') + '</button>' +
                '<a href="' + ordWaHref + '" target="_blank" rel="noopener noreferrer" style="font-size:10.5px;color:#34d399;text-decoration:none;font-weight:700;">WhatsApp</a>' +
              '</div>' +
              '</div></div>';
          }).join('') +
        '</div>'
      : '';

    var walletModalHTML = coState.showWalletModal
      ? '<div class="sw-summary-root sw-open" style="z-index:2147483000;">' +
          '<div class="sw-summary-backdrop" id="swWalBd"></div>' +
          '<div class="sw-summary-card">' +
            '<button type="button" class="sw-summary-x" id="swWalClose">✕</button>' +
            '<h3 style="margin:0 0 4px;color:#fff;font-size:18px;font-weight:900;">Crazy Wallet · ৳' + (state.walletBalanceBdt || 0) + '</h3>' +
            '<div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px;">ওয়ালেট পেমেন্টে প্রতি অর্ডারে ' + walletCashbackPercent + '% Cashback</div>' +
            '<form id="swWalForm">' +
              '<div class="sw-co-pays" style="grid-template-columns:repeat(3,1fr);margin-bottom:10px;">' +
                ['bKash', 'Nagad', 'Rocket'].map(function (wm) {
                  return '<button type="button" class="sw-co-pay' + (coState.walletMethod === wm ? ' on' : '') + '" data-wal-m="' + wm + '" style="text-align:center;padding:7px;"><div class="sw-co-pay-nm">' + wm + '</div></button>';
                }).join('') +
              '</div>' +
              '<div class="sw-co-paynum" style="background:#0b1017;padding:8px 10px;border-radius:8px;border:1px solid #1e293b;"><span>' + esc(coState.walletMethod) + ' Number:</span><strong>' + esc(coState.walletMethod === 'bKash' ? paymentNumbers.bkash : (coState.walletMethod === 'Nagad' ? paymentNumbers.nagad : paymentNumbers.rocket)) + '</strong></div>' +
              '<div class="sw-co-paygrid" style="margin-bottom:8px;">' +
                '<div><label class="sw-co-lbl">Amount (৳)</label><input type="number" min="20" class="sw-co-input" id="swWalAmt" value="' + esc(coState.walletAmt) + '"/></div>' +
                '<div><label class="sw-co-lbl">Sender Number</label><input type="text" class="sw-co-input" id="swWalSender" value="' + esc(coState.walletSender) + '" placeholder="017XXXXXXXX"/></div>' +
              '</div>' +
              '<div style="margin-bottom:8px;"><label class="sw-co-lbl">Transaction ID (TrxID)</label><input type="text" class="sw-co-input" style="text-transform:uppercase;" id="swWalTrx" value="' + esc(coState.walletTrx) + '" placeholder="e.g. BL78K291M"/></div>' +
              '<div class="sw-proof-box" style="margin-bottom:10px;">' +
                '<label class="sw-proof-lbl" for="swWalProofInp"><span>📸 Payment Screenshot</span><span class="sw-proof-btn">' + (coState.walletProof ? 'Change' : 'Upload') + '</span></label>' +
                '<input type="file" accept="image/*" id="swWalProofInp" style="display:none;"/>' +
                (coState.walletProof ? '<div class="sw-proof-prev"><img src="' + esc(coState.walletProof) + '" alt="Wallet Proof"/><button type="button" id="swWalProofRem" style="background:none;border:0;color:#f87171;font-size:11px;font-weight:800;cursor:pointer;">✕ Remove</button></div>' : '') +
              '</div>' +
              (coState.walletMsg ? '<div style="font-size:11.5px;font-weight:700;margin-bottom:8px;color:' + (coState.walletMsg.indexOf('✅') === 0 ? '#34d399' : '#f87171') + ';">' + esc(coState.walletMsg) + '</div>' : '') +
              '<button type="submit" class="sw-co-submit" style="margin-top:0;">Submit Add-Money Request</button>' +
            '</form>' +
          '</div>' +
        '</div>'
      : '';

    view.innerHTML =
      '<header class="sw-co-hdr"><div class="sw-co-hdr-in">' +
        '<a href="#" class="sw-co-brand" id="swCoBrandHome">Crazy_top_up (24)</a>' +
        '<div class="sw-co-hdr-acts">' +
          '<button type="button" class="sw-co-wallet-chip" id="swCoHdrWallet">💳 ৳' + (state.walletBalanceBdt || 0) + '</button>' +
          '<button type="button" class="sw-pwa-btn" id="swCoInstallApp">📲 App</button>' +
          '<a href="admin.html" class="sw-co-admin-btn">⚙ Admin</a>' +
          '<button type="button" class="sw-co-home-btn" id="swCoBackHome">← Main Site</button>' +
          '<button type="button" class="sw-co-spin-btn" id="swCoHdrSpin"><span>🎡 Spin &amp; Win</span>' + (totalSpins > 0 ? '<span class="sw-co-spin-cnt">' + totalSpins + '</span>' : '') + '</button>' +
        '</div>' +
      '</div></header>' +
      '<main class="sw-co-main">' +
        buildTickerHTML(false) +
        (function () {
          if (!announcementConfig || !announcementConfig.active || !String(announcementConfig.text || '').trim()) return '';
          var copies = [0, 1, 2, 3].map(function () {
            return '<span class="sw-notice-copy"><span>' + esc(announcementConfig.text) + '</span><span style="opacity:.5;">•</span></span>';
          }).join('');
          return '<div class="sw-notice-bar"><span class="sw-notice-tag">📢 ' + esc(announcementConfig.tagLabel || 'NOTICE') + '</span><div class="sw-notice-mask"><div class="sw-notice-track">' + copies + '</div></div></div>';
        })() +
        flashHTML +
        (function () {
          if (!promoBanners || !promoBanners.length) return '';
          if (activeBannerIdx >= promoBanners.length) activeBannerIdx = 0;
          var sl = promoBanners[activeBannerIdx];
          var dots = promoBanners.length > 1
            ? '<div class="sw-banner-dots">' + promoBanners.map(function (_b, bi) {
                return '<button type="button" class="sw-banner-dot' + (bi === activeBannerIdx ? ' on' : '') + '" data-ban-dot="' + bi + '" aria-label="Slide ' + (bi + 1) + '"></button>';
              }).join('') + '</div>'
            : '';
          return '<div class="sw-banner-slider accent-' + esc(sl.accent || 'gold') + '">' +
            '<div style="min-width:0;flex:1;">' +
              (sl.badge ? '<span class="sw-banner-badge">' + esc(sl.badge) + '</span>' : '') +
              '<div style="font-size:16px;font-weight:900;color:#fff;line-height:1.25;">' + esc(sl.title) + '</div>' +
              (sl.subtitle ? '<div style="font-size:12px;color:#cbd5e1;margin-top:3px;">' + esc(sl.subtitle) + '</div>' : '') +
              dots +
            '</div>' +
            (sl.ctaLabel ? '<button type="button" class="sw-co-btn-amber" data-ban-cta="' + esc(sl.ctaTarget || 'spin') + '">' + esc(sl.ctaLabel) + ' →</button>' : '') +
          '</div>';
        })() +
        restockBannerHTML +
        '<section class="sw-co-hero">' +
          '<div class="sw-co-hero-kicker">Instant Discounts · ' + walletCashbackPercent + '% Wallet Cashback · VIP Perks</div>' +
          '<h1 class="sw-co-hero-title">Game Top-Up Store &amp; Spin Discount Wheel</h1>' +
          '<p class="sw-co-hero-sub">স্পিন করে পাওয়া ডিসকাউন্ট, Promo Code, VIP র‍্যাংক ডিসকাউন্ট ও Crazy Wallet দিয়ে টপ-আপ অর্ডার করুন।</p>' +
          '<div class="sw-co-hero-btns">' +
            '<button type="button" class="sw-co-btn-amber" id="swCoHeroSpin">✨ Open Spin Wheel (' + totalSpins + ')</button>' +
            '<button type="button" class="sw-co-btn-slate" id="swCoHeroOffers">🏷 My Offers (' + unusedOffers.length + ')</button>' +
            '<button type="button" class="sw-co-btn-slate" style="border-color:rgba(52,211,153,0.45);color:#6ee7b7;" id="swCoHeroWallet">💳 Add Money (৳' + (state.walletBalanceBdt || 0) + ')</button>' +
          '</div>' +
        '</section>' +
        appliedBarHTML +
        (selPricing.conditionWarning ? '<div class="sw-rule-warn" style="margin-bottom:12px;">⚠️ ' + esc(selPricing.conditionWarning) + ' — এই অফার নিতে আরও বড় প্যাকেজ সিলেক্ট করুন।</div>' : '') +
        (selPricing.promoWarn ? '<div class="sw-rule-warn" style="margin-bottom:12px;">⚠️ ' + esc(selPricing.promoWarn) + '</div>' : '') +
        '<div class="sw-features-3col">' + vipCardHTML + buildStreakHTML(false) + buildReferralHTML() + '</div>' +
        '<div class="sw-co-games">' + gamesHTML + '</div>' +
        '<div class="sw-co-grid">' +
          '<div class="sw-co-col">' +
            (isGameMaint ? '<div class="sw-maint-banner">⛔ ' + esc(cat.name) + ' বর্তমানে মেইনটেন্যান্সে আছে — সাময়িকভাবে নতুন অর্ডার বন্ধ।</div>' : '') +
            '<div class="sw-co-card">' +
              '<div class="sw-co-card-hd"><h2>1. Enter ' + esc(cat.name) + ' Account</h2><button type="button" class="sw-uid-save-btn" id="swCoToggleSaveUid">+ Save UID</button></div>' +
              savedUidChipsHTML +
              (coState.showSaveProfile ? '<div class="sw-uid-save-box"><input type="text" class="sw-co-input" style="padding:7px 10px;font-size:12px;" id="swCoProfNick" value="' + esc(coState.profileNick) + '" placeholder="Nickname (e.g. Main ID, Vaiya ID)"/><button type="button" class="sw-co-promo-btn" id="swCoSaveProfBtn">Save</button></div>' : '') +
              '<label class="sw-co-lbl" for="swCoUidInput">' + esc(cat.uidLabel) + '</label>' +
              '<input type="text" class="sw-co-input" id="swCoUidInput" value="' + esc(coState.uid) + '" placeholder="' + esc(cat.uidPlaceholder) + '"/>' +
              '<label style="display:flex;align-items:center;gap:6px;margin-top:8px;font-size:11px;color:#94a3b8;cursor:pointer;"><input type="checkbox" id="swCoAutoSaveUid"' + (coState.autoSaveUid ? ' checked' : '') + '/> অর্ডার করলে এই UID অটো-সেভ রাখুন</label>' +
              (coState.uidErr ? '<div class="sw-co-err">' + esc(coState.uidErr) + '</div>' : '') +
            '</div>' +
            '<div class="sw-co-card">' +
              '<div class="sw-co-card-hd"><h2>2. Select ' + esc(cat.currency) + ' Package</h2><span class="sw-co-card-sub">' + (activeOffer || selPricing.flashLive || coState.appliedPromo ? 'Discounts active' : 'Select a bundle') + '</span></div>' +
              '<div class="sw-co-pkgs">' + pkgsHTML + '</div>' +
            '</div>' +
            lbHTML +
          '</div>' +
          '<div class="sw-co-col">' +
            '<form class="sw-co-card" id="swCoForm">' +
              '<div class="sw-co-card-hd"><h2>3. Apply Won Spin Offer (' + unusedOffers.length + ' available)</h2></div>' +
              offersHTML +
              promoHTML +
              '<div class="sw-co-card-hd" style="margin-top:16px;"><h2>4. Payment Method</h2></div>' +
              '<div class="sw-co-pays">' + paysHTML + '</div>' +
              payExtraHTML +
              '<div class="sw-co-sum">' +
                '<div class="sw-co-sum-row"><span>Package</span><b style="color:#fff;">' + esc(pkg.name) + '</b></div>' +
                '<div class="sw-co-sum-row"><span>Base Price</span><span style="font-family:JetBrains Mono,monospace;">৳' + selPricing.originalPrice + '</span></div>' +
                (selPricing.offerDiscount > 0 ? '<div class="sw-co-sum-row sav"><span>Spin Offer</span><span style="font-family:JetBrains Mono,monospace;">-৳' + selPricing.offerDiscount + '</span></div>' : '') +
                (selPricing.flashDiscount > 0 ? '<div class="sw-co-sum-row" style="color:#fcd34d;"><span>Flash Sale</span><span style="font-family:JetBrains Mono,monospace;">-৳' + selPricing.flashDiscount + '</span></div>' : '') +
                (selPricing.vipDiscount > 0 ? '<div class="sw-co-sum-row" style="color:#d8b4fe;"><span>' + esc(vipStatus.rank) + ' VIP</span><span style="font-family:JetBrains Mono,monospace;">-৳' + selPricing.vipDiscount + '</span></div>' : '') +
                (selPricing.promoDiscount > 0 && coState.appliedPromo ? '<div class="sw-co-sum-row" style="color:#7dd3fc;"><span>Promo (' + esc(coState.appliedPromo.code) + ')</span><span style="font-family:JetBrains Mono,monospace;">-৳' + selPricing.promoDiscount + '</span></div>' : '') +
                (selPricing.bonusPercent > 0 ? '<div class="sw-co-sum-row bon"><span>Bonus Top-Up</span><span style="font-family:JetBrains Mono,monospace;">+' + selPricing.bonusPercent + '%</span></div>' : '') +
                '<div class="sw-co-total"><span class="sw-co-total-lbl">Total Payable</span><span class="sw-co-total-amt' + (isCelebrating ? ' sw-price-pop' : '') + '">৳' + selPricing.finalPrice + '</span></div>' +
              '</div>' +
              (coState.checkoutErr ? '<div class="sw-co-err" style="margin-top:8px;">❌ ' + esc(coState.checkoutErr) + '</div>' : '') +
              '<button type="submit" class="sw-co-submit"' + ((isGameMaint || isPkgOos) ? ' disabled' : '') + '>' + (isGameMaint ? 'Game in Maintenance' : (isPkgOos ? 'Package Out of Stock' : ('Complete Purchase · ৳' + selPricing.finalPrice))) + '</button>' +
              '<div class="sw-co-foot-note">🛡 TrxID Verified · Crazy_top_up (24)</div>' +
            '</form>' +
            recentOrdersHTML +
          '</div>' +
        '</div>' +
        '<div class="sw-co-support-foot">' +
          '<span><strong>Crazy_top_up (24)</strong> · Instant Top-Up Support</span>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
            '<a href="https://wa.me/' + waNumClean + '" target="_blank" rel="noopener noreferrer" class="sw-sup-btn sw-sup-wa">💬 WhatsApp Support</a>' +
            '<a href="' + esc(supportConfig.telegram || 'https://t.me/crazy_top_up_24') + '" target="_blank" rel="noopener noreferrer" class="sw-sup-btn sw-sup-tg">✈ Telegram Support</a>' +
          '</div>' +
        '</div>' +
      '</main>' +
      walletModalHTML +
      (function () {
        if (!coState.supportOrderId) return '';
        var targetOrd = ordersList.find(function (o) { return o.id === coState.supportOrderId; });
        if (!targetOrd) return '';
        var msgs = Array.isArray(targetOrd.supportMessages) ? targetOrd.supportMessages : [];
        var msgsHTML = msgs.length === 0
          ? '<div style="text-align:center;color:#64748b;font-size:12px;padding:18px 0;">No messages yet. Ask admin anything about this order!</div>'
          : msgs.map(function (m) {
              return '<div class="sw-chat-msg ' + (m.sender === 'admin' ? 'admin' : 'user') + '">' +
                '<div style="font-size:10px;opacity:.75;margin-bottom:2px;">' + (m.sender === 'admin' ? '🛡 Admin Support' : 'You') + ' · ' + esc(m.createdAt || '') + '</div>' +
                '<div>' + esc(m.text) + '</div>' +
              '</div>';
            }).join('');
        return '<div class="sw-summary-root sw-open" style="z-index:2147483005;">' +
          '<div class="sw-summary-backdrop" id="swSupBd"></div>' +
          '<div class="sw-summary-card">' +
            '<button type="button" class="sw-summary-x" id="swSupClose">✕</button>' +
            '<h3 style="margin:0 0 4px;color:#fff;font-size:16px;font-weight:900;">Order Support Chat · ' + esc(targetOrd.id) + '</h3>' +
            '<div style="font-size:11px;color:#94a3b8;">' + esc(targetOrd.gameName) + ' · ' + esc(targetOrd.packageLabel) + '</div>' +
            '<div class="sw-chat-log">' + msgsHTML + '</div>' +
            (coState.supportErr ? '<div style="color:#f87171;font-size:11px;font-weight:700;margin-bottom:6px;">' + esc(coState.supportErr) + '</div>' : '') +
            '<form id="swSupForm" style="display:flex;gap:8px;">' +
              '<input type="text" class="sw-co-input" id="swSupInp" value="' + esc(coState.supportInput) + '" placeholder="Type message to admin..." style="flex:1;padding:8px 10px;font-size:12px;"/>' +
              '<button type="submit" class="sw-co-promo-btn" style="background:#0ea5e9;color:#05202e;border:0;">Send</button>' +
            '</form>' +
          '</div>' +
        '</div>';
      })();

    var brandHome = document.getElementById('swCoBrandHome');
    if (brandHome) brandHome.onclick = function (e) { e.preventDefault(); location.hash = ''; };
    var backHome = document.getElementById('swCoBackHome');
    if (backHome) backHome.onclick = function () { playClick(); location.hash = ''; };
    var hdrSpin = document.getElementById('swCoHdrSpin');
    if (hdrSpin) hdrSpin.onclick = function () { playClick(); openModal('spin'); };
    var heroSpin = document.getElementById('swCoHeroSpin');
    if (heroSpin) heroSpin.onclick = function () { playClick(); openModal('spin'); };
    var heroOffers = document.getElementById('swCoHeroOffers');
    if (heroOffers) heroOffers.onclick = function () { playClick(); openModal('boxes'); };
    var emptySpin = document.getElementById('swCoEmptySpin');
    if (emptySpin) emptySpin.onclick = function () { playClick(); openModal('spin'); };
    var remBtn = document.getElementById('swCoRemoveOffer');
    if (remBtn) remBtn.onclick = function () {
      state.activeOfferId = null;
      saveState();
      syncAllUI();
      renderCheckoutView();
    };

    view.querySelectorAll('[data-co-cat]').forEach(function (btn) {
      btn.onclick = function () {
        playClick();
        coState.catId = btn.getAttribute('data-co-cat');
        for (var k = 0; k < CO_CATEGORIES.length; k++) {
          if (CO_CATEGORIES[k].id === coState.catId) {
            coState.pkgId = CO_CATEGORIES[k].packages[0].id;
            break;
          }
        }
        coState.uidErr = '';
        renderCheckoutView();
      };
    });

    view.querySelectorAll('[data-co-pkg]').forEach(function (btn) {
      btn.onclick = function () {
        playClick();
        coState.pkgId = btn.getAttribute('data-co-pkg');
        renderCheckoutView();
      };
    });

    view.querySelectorAll('[data-co-offer]').forEach(function (btn) {
      btn.onclick = function () {
        playClick();
        var oid = btn.getAttribute('data-co-offer');
        var nextId = (state.activeOfferId === oid) ? null : oid;
        state.activeOfferId = nextId;
        if (nextId) {
          coState.celebrateUntil = Date.now() + 2600;
          fireCheckoutConfetti();
        }
        saveState();
        syncAllUI();
        renderCheckoutView();
      };
    });

    view.querySelectorAll('[data-co-pay]').forEach(function (btn) {
      btn.onclick = function () {
        playClick();
        coState.payMethod = btn.getAttribute('data-co-pay');
        renderCheckoutView();
      };
    });

    var installAppBtn = document.getElementById('swCoInstallApp');
    if (installAppBtn) installAppBtn.onclick = function () { playClick(); triggerPwaInstall(); };
    var hdrWallet = document.getElementById('swCoHdrWallet');
    if (hdrWallet) hdrWallet.onclick = function () { playClick(); coState.showWalletModal = true; renderCheckoutView(); };
    var heroWallet = document.getElementById('swCoHeroWallet');
    if (heroWallet) heroWallet.onclick = function () { playClick(); coState.showWalletModal = true; renderCheckoutView(); };
    var openWalBtn = document.getElementById('swCoOpenWallet');
    if (openWalBtn) openWalBtn.onclick = function () { playClick(); coState.showWalletModal = true; renderCheckoutView(); };

    var copyPayBtn = document.getElementById('swCoCopyPayNum');
    if (copyPayBtn) copyPayBtn.onclick = function () {
      try { navigator.clipboard.writeText(activePayNum); } catch (e) {}
      copyPayBtn.textContent = '✓ Copied';
      setTimeout(function () { copyPayBtn.textContent = 'Copy'; }, 1800);
    };
    var senderEl = document.getElementById('swCoSenderInp');
    if (senderEl) senderEl.oninput = function () { coState.senderNumber = senderEl.value; coState.checkoutErr = ''; };
    var trxEl = document.getElementById('swCoTrxInp');
    if (trxEl) trxEl.oninput = function () { coState.trxId = trxEl.value.toUpperCase(); coState.checkoutErr = ''; };
    var cProof = document.getElementById('swCoProofInp');
    if (cProof) cProof.onchange = function (ev) {
      var f = ev.target.files && ev.target.files[0];
      if (f) compressProofImage(f, function (b64) { coState.paymentProof = b64; renderCheckoutView(); });
    };
    var cProofRem = document.getElementById('swCoProofRem');
    if (cProofRem) cProofRem.onclick = function () { coState.paymentProof = ''; renderCheckoutView(); };
    view.querySelectorAll('[data-ban-dot]').forEach(function (dot) {
      dot.onclick = function () {
        activeBannerIdx = Number(dot.getAttribute('data-ban-dot') || 0);
        renderCheckoutView();
      };
    });
    view.querySelectorAll('[data-ban-cta]').forEach(function (btn) {
      btn.onclick = function () {
        var tgt = btn.getAttribute('data-ban-cta') || 'spin';
        if (tgt === 'wallet') { coState.showWalletModal = true; renderCheckoutView(); }
        else if (tgt.indexOf('promo:') === 0) {
          coState.promoInput = tgt.slice(6).toUpperCase();
          var apBtn = document.getElementById('swCoApplyPromoBtn');
          if (apBtn) apBtn.click();
          else renderCheckoutView();
        } else {
          openModal('spin');
        }
      };
    });
    view.querySelectorAll('[data-watch-pkg]').forEach(function (wBtn) {
      wBtn.onclick = function () {
        var pid = wBtn.getAttribute('data-watch-pkg');
        if (!pid) return;
        if (!isUserSignedIn()) { showAuthRequiredModal = true; openModal('spin'); return; }
        apiPostJson('/api/watchlist/toggle', { identifier: getUserKey(), packageId: pid })
          .then(function (data) { applyServerPayload(data, true); renderCheckoutView(); })
          .catch(function () {});
      };
    });
    view.querySelectorAll('[data-ord-chat]').forEach(function (cBtn) {
      cBtn.onclick = function () {
        coState.supportOrderId = cBtn.getAttribute('data-ord-chat') || '';
        coState.supportErr = '';
        renderCheckoutView();
      };
    });
    var supBd = document.getElementById('swSupBd');
    var supCl = document.getElementById('swSupClose');
    if (supBd) supBd.onclick = function () { coState.supportOrderId = ''; renderCheckoutView(); };
    if (supCl) supCl.onclick = function () { coState.supportOrderId = ''; renderCheckoutView(); };
    var supInp = document.getElementById('swSupInp');
    if (supInp) supInp.oninput = function () { coState.supportInput = supInp.value; coState.supportErr = ''; };
    var supForm = document.getElementById('swSupForm');
    if (supForm) supForm.onsubmit = function (ev) {
      ev.preventDefault();
      var txt = (coState.supportInput || '').trim();
      if (!txt) { coState.supportErr = 'Please write a message.'; renderCheckoutView(); return; }
      apiPostJson('/api/orders/support', {
        identifier: getUserKey(),
        orderId: coState.supportOrderId,
        message: txt
      }).then(function (data) {
        coState.supportInput = '';
        coState.supportErr = '';
        applyServerPayload(data, true);
        renderCheckoutView();
      }).catch(function (err) {
        coState.supportErr = (err.data && err.data.error) || err.message || 'Failed to send.';
        renderCheckoutView();
      });
    };

    var promoInp = document.getElementById('swCoPromoInp');
    if (promoInp) promoInp.oninput = function () { coState.promoInput = promoInp.value.toUpperCase(); };
    var applyPromoBtn = document.getElementById('swCoApplyPromoBtn');
    if (applyPromoBtn) applyPromoBtn.onclick = function () {
      var code = (coState.promoInput || '').trim().toUpperCase();
      if (!code) { coState.promoMsg = 'প্রোমো কোড লিখুন।'; renderCheckoutView(); return; }
      fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, basePrice: pkg.price })
      }).then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          if (!res.ok || !res.d.ok) {
            coState.appliedPromo = null;
            coState.promoMsg = '❌ ' + (res.d.error || 'অকার্যকর কোড');
          } else {
            coState.appliedPromo = res.d;
            coState.promoMsg = '✅ ' + res.d.code + ' অ্যাপ্লাই হয়েছে (-৳' + res.d.discountSaved + ')!';
          }
          renderCheckoutView();
        }).catch(function () {
          coState.promoMsg = 'সার্ভারের সাথে সংযোগ হয়নি।';
          renderCheckoutView();
        });
    };
    var remPromoBtn = document.getElementById('swCoRemovePromo');
    if (remPromoBtn) remPromoBtn.onclick = function () {
      coState.appliedPromo = null; coState.promoInput = ''; coState.promoMsg = ''; renderCheckoutView();
    };

    view.querySelectorAll('[data-lb-tab]').forEach(function (btn) {
      btn.onclick = function () { playClick(); coState.lbTab = btn.getAttribute('data-lb-tab'); renderCheckoutView(); };
    });

    if (coState.showWalletModal) {
      var wb = document.getElementById('swWalBd');
      var wc = document.getElementById('swWalClose');
      if (wb) wb.onclick = function () { coState.showWalletModal = false; renderCheckoutView(); };
      if (wc) wc.onclick = function () { coState.showWalletModal = false; renderCheckoutView(); };
      view.querySelectorAll('[data-wal-m]').forEach(function (btn) {
        btn.onclick = function () { coState.walletMethod = btn.getAttribute('data-wal-m'); renderCheckoutView(); };
      });
      var wAmt = document.getElementById('swWalAmt'); if (wAmt) wAmt.oninput = function () { coState.walletAmt = wAmt.value; };
      var wSnd = document.getElementById('swWalSender'); if (wSnd) wSnd.oninput = function () { coState.walletSender = wSnd.value; };
      var wTrx = document.getElementById('swWalTrx'); if (wTrx) wTrx.oninput = function () { coState.walletTrx = wTrx.value.toUpperCase(); };
      var wProof = document.getElementById('swWalProofInp');
      if (wProof) wProof.onchange = function (ev) {
        var f = ev.target.files && ev.target.files[0];
        if (f) compressProofImage(f, function (b64) { coState.walletProof = b64; renderCheckoutView(); });
      };
      var wProofRem = document.getElementById('swWalProofRem');
      if (wProofRem) wProofRem.onclick = function () { coState.walletProof = ''; renderCheckoutView(); };
      var wForm = document.getElementById('swWalForm');
      if (wForm) wForm.onsubmit = function (ev) {
        ev.preventDefault();
        if (!isUserSignedIn()) { showAuthRequiredModal = true; openModal('spin'); return; }
        var amtN = Math.round(Number(coState.walletAmt || 0));
        if (amtN < 20 || (coState.walletSender || '').trim().length < 6 || (coState.walletTrx || '').trim().length < 4) {
          coState.walletMsg = 'ন্যূনতম ৳২০, সঠিক Sender Number ও TrxID দিন।';
          renderCheckoutView();
          return;
        }
        apiPostJson('/api/wallet/deposit', {
          identifier: getUserKey(),
          method: coState.walletMethod,
          amountBdt: amtN,
          senderNumber: coState.walletSender.trim(),
          trxId: coState.walletTrx.trim().toUpperCase(),
          screenshotUrl: coState.walletProof || undefined
        }).then(function (data) {
          applyServerPayload(data, true);
          coState.walletSender = ''; coState.walletTrx = ''; coState.walletProof = '';
          coState.walletMsg = '✅ Request submitted! Balance will be credited after admin approval.';
          renderCheckoutView();
        }).catch(function (err) {
          coState.walletMsg = '❌ ' + (err.message || 'সাবমিট ব্যর্থ হয়েছে।');
          renderCheckoutView();
        });
      };
    }

    var uidEl = document.getElementById('swCoUidInput');
    if (uidEl) {
      uidEl.oninput = function () {
        coState.uid = uidEl.value;
        coState.uidErr = '';
      };
    }
    var autoSaveCb = document.getElementById('swCoAutoSaveUid');
    if (autoSaveCb) {
      autoSaveCb.onchange = function () { coState.autoSaveUid = autoSaveCb.checked; };
    }
    var togSaveBtn = document.getElementById('swCoToggleSaveUid');
    if (togSaveBtn) {
      togSaveBtn.onclick = function () {
        coState.showSaveProfile = !coState.showSaveProfile;
        coState.uidErr = '';
        renderCheckoutView();
      };
    }
    var nickInp = document.getElementById('swCoProfNick');
    if (nickInp) nickInp.oninput = function () { coState.profileNick = nickInp.value; };
    var saveProfBtn = document.getElementById('swCoSaveProfBtn');
    if (saveProfBtn) {
      saveProfBtn.onclick = function () {
        var chk = validateDropinUid(cat.id, coState.uid);
        if (!chk.ok) { coState.uidErr = chk.error; renderCheckoutView(); return; }
        var nick = (coState.profileNick || '').trim() || (cat.name + ' ID');
        if (apiAvailable !== false && isUserSignedIn()) {
          apiPostJson('/api/user/profiles', {
            identifier: getUserKey(),
            gameId: cat.id,
            playerUid: chk.uid,
            nickname: nick
          }).then(function (data) {
            applyServerPayload(data, true);
            coState.showSaveProfile = false;
            coState.profileNick = '';
            coState.uidErr = '';
            renderCheckoutView();
          }).catch(function (err) {
            coState.uidErr = (err.data && err.data.error) || err.message || 'সেভ ব্যর্থ হয়েছে।';
            renderCheckoutView();
          });
        } else {
          if (!Array.isArray(state.savedProfiles)) state.savedProfiles = [];
          state.savedProfiles = state.savedProfiles.filter(function (p) { return !(p.gameId === cat.id && p.playerUid === chk.uid); });
          state.savedProfiles.unshift({ id: 'uid-' + Date.now(), gameId: cat.id, playerUid: chk.uid, nickname: nick, savedAt: formatTime() });
          state.savedProfiles = state.savedProfiles.slice(0, 15);
          saveState();
          coState.showSaveProfile = false;
          coState.profileNick = '';
          renderCheckoutView();
        }
      };
    }
    view.querySelectorAll('[data-use-prof]').forEach(function (btn) {
      btn.onclick = function () {
        playClick();
        coState.uid = btn.getAttribute('data-use-prof');
        coState.uidErr = '';
        renderCheckoutView();
      };
    });
    view.querySelectorAll('[data-del-prof]').forEach(function (btn) {
      btn.onclick = function () {
        var pid = btn.getAttribute('data-del-prof');
        if (apiAvailable !== false && isUserSignedIn()) {
          apiPostJson('/api/user/profiles/delete', { identifier: getUserKey(), profileId: pid }).then(function (data) {
            applyServerPayload(data, true);
            renderCheckoutView();
          }).catch(function () {});
        } else {
          state.savedProfiles = (state.savedProfiles || []).filter(function (p) { return p.id !== pid; });
          saveState();
          renderCheckoutView();
        }
      };
    });

    var copyRefBtn = document.getElementById('swRefCopyBtn');
    if (copyRefBtn) {
      copyRefBtn.onclick = function () {
        var link = getShareReferralUrl();
        try { navigator.clipboard.writeText(link); } catch (e) {
          var inp = document.getElementById('swRefLinkInp');
          if (inp) { inp.select(); document.execCommand('copy'); }
        }
        copyRefBtn.textContent = '✓ Copied!';
        setTimeout(function () { copyRefBtn.textContent = 'Copy Link'; }, 2000);
      };
    }

    var formEl = document.getElementById('swCoForm');
    if (formEl) {
      formEl.onsubmit = function (e) {
        e.preventDefault();
        if (isGameMaint) {
          coState.checkoutErr = cat.name + ' বর্তমানে মেইনটেন্যান্সে আছে।';
          renderCheckoutView();
          return;
        }
        if (isPkgOos) {
          coState.checkoutErr = pkg.name + ' বর্তমানে Out of Stock!';
          renderCheckoutView();
          return;
        }
        var uidChk = validateDropinUid(cat.id, coState.uid);
        coState.checkoutErr = '';
        if (!uidChk.ok) {
          coState.uidErr = uidChk.error;
          renderCheckoutView();
          return;
        }
        var cleanUid = uidChk.uid;
        var isWal = coState.payMethod === 'Wallet Pay';
        if (!isWal && ((coState.senderNumber || '').trim().length < 6 || (coState.trxId || '').trim().length < 4)) {
          coState.checkoutErr = coState.payMethod + ' পেমেন্টের জন্য সঠিক Sender Number এবং TrxID দিন।';
          renderCheckoutView();
          return;
        }
        var appliedObj = (selPricing.offer && !selPricing.conditionWarning) ? selPricing.offer : null;
        if (apiAvailable !== false && isUserSignedIn()) {
          apiPostJson('/api/orders', {
            identifier: getUserKey(),
            gameId: cat.id,
            packageId: pkg.id,
            gameName: cat.name,
            packageLabel: pkg.name,
            playerUid: cleanUid,
            saveProfile: coState.autoSaveUid,
            profileNickname: cat.name + ' ID',
            paymentMethod: coState.payMethod,
            senderNumber: isWal ? undefined : coState.senderNumber.trim(),
            trxId: isWal ? undefined : coState.trxId.trim().toUpperCase(),
            promoCode: coState.appliedPromo ? coState.appliedPromo.code : undefined,
            screenshotUrl: isWal ? undefined : (coState.paymentProof || undefined),
            originalPrice: selPricing.originalPrice,
            appliedOfferId: appliedObj ? appliedObj.id : null
          }).then(function (data) {
            playRewardCue('rare');
            if (appliedObj) state.activeOfferId = null;
            coState.trxId = '';
            coState.paymentProof = '';
            coState.appliedPromo = null;
            coState.promoInput = '';
            coState.promoMsg = '';
            applyServerPayload(data, true);
            if (data.referralRewarded) showOfferToast('🤝 Referral Bonus: +1 Scratch Card & +1 Golden Spin!', '', 'scratcher');
            syncAllUI();
            renderCheckoutView();
            showOrderSummary(data.order);
          }).catch(function (err) {
            coState.checkoutErr = (err.data && err.data.error) || err.message || 'অর্ডার সম্পন্ন করা যায়নি।';
            renderCheckoutView();
          });
        } else {
          playRewardCue('rare');
          var ord = {
            id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
            gameName: cat.name,
            packageLabel: pkg.name + (selPricing.bonusPercent > 0 ? (' (+' + selPricing.bonusPercent + '% Spin Bonus)') : ''),
            playerUid: cleanUid,
            paymentMethod: coState.payMethod,
            senderNumber: isWal ? '' : coState.senderNumber.trim(),
            trxId: isWal ? '' : coState.trxId.trim().toUpperCase(),
            status: 'Pending',
            originalPrice: selPricing.originalPrice,
            discountSaved: selPricing.discountSaved,
            finalPrice: selPricing.finalPrice,
            bonusPercent: selPricing.bonusPercent,
            appliedOfferCode: appliedObj ? appliedObj.code : '',
            promoCodeUsed: coState.appliedPromo ? coState.appliedPromo.code : '',
            createdAt: formatTime()
          };
          if (appliedObj) {
            appliedObj.used = true;
            state.activeOfferId = null;
          }
          if (coState.autoSaveUid) {
            if (!Array.isArray(state.savedProfiles)) state.savedProfiles = [];
            state.savedProfiles = state.savedProfiles.filter(function (p) { return !(p.gameId === cat.id && p.playerUid === cleanUid); });
            state.savedProfiles.unshift({ id: 'uid-' + Date.now(), gameId: cat.id, playerUid: cleanUid, nickname: cat.name + ' ID', savedAt: formatTime() });
            state.savedProfiles = state.savedProfiles.slice(0, 15);
          }
          if (!Array.isArray(state.orders)) state.orders = [];
          state.orders.unshift(ord);
          coState.trxId = '';
          coState.appliedPromo = null;
          coState.promoInput = '';
          coState.promoMsg = '';
          saveState();
          syncAllUI();
          renderCheckoutView();
          showOrderSummary(ord);
        }
      };
    }
  }

  function syncCheckoutRoute() {
    var onCheckout = location.hash === '#spin-checkout';
    document.body.classList.toggle('sw-on-checkout', onCheckout);
    var home = document.getElementById('homeView');
    var foot = document.getElementById('siteFooter');
    if (onCheckout) {
      if (home) home.hidden = true;
      if (foot) foot.hidden = true;
      renderCheckoutView();
      setTimeout(function () {
        if (location.hash === '#spin-checkout') {
          document.body.classList.add('sw-on-checkout');
          var h = document.getElementById('homeView');
          var ft = document.getElementById('siteFooter');
          if (h) h.hidden = true;
          if (ft) ft.hidden = true;
        }
      }, 0);
    } else {
      var v = document.getElementById('swCheckoutView');
      if (v) v.classList.remove('sw-active');
      if (!location.hash || location.hash === '#') {
        if (home) home.hidden = false;
        if (foot) foot.hidden = false;
      }
    }
  }

  /* -------------------- Header & Home Triggers -------------------- */
  function getTotalBadgeCount() {
    var unopened = state.boxes.filter(function (b) { return !b.opened; }).length;
    return state.spins + state.goldenSpins + state.scratchers + unopened;
  }

  function injectSiteTriggers() {
    var hr = document.querySelector('header .hr');
    if (hr && !document.getElementById('swHdrBtn')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'swHdrBtn';
      btn.className = 'sw-hdr-btn';
      btn.innerHTML = '<span class="sw-hdr-icon">8</span><span>Spin</span><span class="sw-hdr-badge" id="swHdrBadge">0</span>';
      btn.onclick = function () { playClick(); openModal('spin'); };
      var avBtn = document.getElementById('avBtn');
      if (avBtn) hr.insertBefore(btn, avBtn);
      else hr.appendChild(btn);
    }

    var quick = document.querySelector('#homeView .quick');
    if (quick && !document.getElementById('swHomeBanner')) {
      var banner = document.createElement('div');
      banner.id = 'swHomeBanner';
      banner.className = 'sw-home-banner';
      banner.setAttribute('role', 'button');
      banner.setAttribute('tabindex', '0');
      banner.innerHTML =
        '<div class="sw-hb-left">' +
          '<div class="sw-hb-wheel"><div class="sw-hb-wheel-core">8</div></div>' +
          '<div class="sw-hb-text">' +
            '<div class="sw-hb-title">SPIN AND WIN</div>' +
            '<div class="sw-hb-sub" id="swHomeSub">৯০% পর্যন্ত ডিসকাউন্ট ও ফ্রি বোনাস জিতুন!</div>' +
          '</div>' +
        '</div>' +
        '<span class="sw-hb-cta" id="swHomeCta">Spin Now</span>';
      banner.onclick = function () { playClick(); openModal('spin'); };
      quick.parentNode.insertBefore(banner, quick.nextSibling);
    }
    if (quick && !document.getElementById('swHomeTicker')) {
      var tick = document.createElement('div');
      tick.id = 'swHomeTicker';
      tick.style.margin = '10px 0 6px';
      tick.innerHTML = buildTickerHTML(false);
      var hbEl = document.getElementById('swHomeBanner');
      if (hbEl && hbEl.parentNode) hbEl.parentNode.insertBefore(tick, hbEl.nextSibling);
      else quick.parentNode.insertBefore(tick, quick.nextSibling);
    }
    if (hr && !document.getElementById('swHdrPwa')) {
      var pwaBtn = document.createElement('button');
      pwaBtn.type = 'button';
      pwaBtn.id = 'swHdrPwa';
      pwaBtn.className = 'sw-pwa-btn';
      pwaBtn.style.marginRight = '6px';
      pwaBtn.textContent = '📲 App';
      pwaBtn.onclick = function () { playClick(); triggerPwaInstall(); };
      var spinHdrP = document.getElementById('swHdrBtn');
      if (spinHdrP) hr.insertBefore(pwaBtn, spinHdrP);
      else hr.appendChild(pwaBtn);
    }
    if (hr && !document.getElementById('swHdrAdmin')) {
      var admLink = document.createElement('a');
      admLink.id = 'swHdrAdmin';
      admLink.href = 'admin.html';
      admLink.className = 'sw-co-admin-btn';
      admLink.style.marginRight = '6px';
      admLink.textContent = '⚙ Admin';
      var spinHdr = document.getElementById('swHdrBtn');
      if (spinHdr) hr.insertBefore(admLink, spinHdr);
      else hr.appendChild(admLink);
    }
  }

  function syncBadges() {
    var total = getTotalBadgeCount();
    var hb = document.getElementById('swHdrBadge');
    if (hb) {
      hb.textContent = String(total);
      hb.style.display = total > 0 ? 'inline-flex' : 'none';
    }
    var sub = document.getElementById('swHomeSub');
    var cta = document.getElementById('swHomeCta');
    var signedIn = isUserSignedIn();
    var spunToday = hasSpunToday();
    if (sub) {
      if (!signedIn) {
        sub.textContent = '🔒 স্পিন করতে আগে Sign In / Login করুন — প্রতিদিন ১ বার স্পিন!';
      } else if (spunToday) {
        sub.textContent = '⏳ আজকের ১টি স্পিন শেষ হয়েছে — আগামীকাল আবার স্পিন করতে পারবেন!';
      } else {
        var unusedOffers = state.offers.filter(function (o) { return !o.used; }).length;
        sub.textContent = total > 0
          ? ('🎁 আজকের ১টি স্পিন রেডি আছে! (' + unusedOffers + 'টি অফার সংরক্ষিত)')
          : 'অর্ডার করে ফ্রি স্পিন জিতুন এবং ৯০% পর্যন্ত ছাড় পান!';
      }
    }
    if (cta) {
      cta.textContent = !signedIn ? 'Login to Spin' : (spunToday ? 'View Offers' : 'Spin Now');
    }
  }

  function syncAllUI() {
    syncBadges();
    renderTickerDOM();
    syncAllProductViews();
    if (location.hash === '#spin-checkout') renderCheckoutView();
    var amBalEl = document.getElementById('amBalVal');
    if (amBalEl) amBalEl.textContent = '৳' + Number(state.walletBalanceBdt || 0);
    if (isUserSignedIn() && getUserKey() !== '__default__' && getUserKey() !== lastSyncedUserKey) {
      syncSessionWithServer();
    }
  }

  /* -------------------- Init -------------------- */
  function hookAuthWatchers() {
    if (typeof window.setProfile === 'function' && !window.setProfile.__swWrapped) {
      var origSetProfile = window.setProfile;
      var wrapped = function (p) {
        var res = origSetProfile.apply(this, arguments);
        if (p && typeof p.loggedIn === 'boolean') {
          forceLoggedIn = p.loggedIn;
          if (forceLoggedIn) showAuthRequiredModal = false;
        }
        syncAllUI();
        if (isModalOpen) renderModal();
        return res;
      };
      wrapped.__swWrapped = true;
      window.setProfile = wrapped;
    }

    ['acLoTx', 'accLo', 'accName', 'buyBtn'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && typeof MutationObserver !== 'undefined') {
        var authObs = new MutationObserver(function () {
          syncAllUI();
          if (isModalOpen) renderModal();
        });
        authObs.observe(el, { childList: true, characterData: true, subtree: true });
      }
    });
  }

  function setupOfflineIndicator() {
    var pill = null;
    function showPill(online) {
      if (!pill) {
        pill = document.createElement('div');
        document.body.appendChild(pill);
      }
      pill.className = 'sw-offline-pill' + (online ? ' online' : '');
      pill.innerHTML = online
        ? '<span>📶</span><span>Back Online — Live store synced</span>'
        : '<span>📡</span><span>Offline Mode — Cached store view active</span>';
      pill.style.display = 'inline-flex';
      if (online) {
        setTimeout(function () { if (pill) pill.style.display = 'none'; }, 3000);
      }
    }
    if (typeof navigator !== 'undefined' && navigator.onLine === false) showPill(false);
    window.addEventListener('offline', function () { showPill(false); });
    window.addEventListener('online', function () { showPill(true); });
  }


  var jsMarqueeStarted = false;
  function startJsMarqueeLoop() {
    if (jsMarqueeStarted) return;
    jsMarqueeStarted = true;
    var hoveredTracks = new WeakMap();
    document.addEventListener('pointerover', function (e) {
      if (e.pointerType !== 'mouse') return;
      var t = e.target && e.target.closest ? e.target.closest('.sw-ticker-track, .sw-notice-track') : null;
      if (t) hoveredTracks.set(t, true);
    }, { passive: true });
    document.addEventListener('pointerout', function (e) {
      if (e.pointerType !== 'mouse') return;
      var t = e.target && e.target.closest ? e.target.closest('.sw-ticker-track, .sw-notice-track') : null;
      if (t && (!e.relatedTarget || !t.contains(e.relatedTarget))) hoveredTracks.set(t, false);
    }, { passive: true });

    var trackOffsets = new WeakMap();
    var lastTs = 0;
    var lastBulbToggle = 0;
    var bulbFlip = false;

    function tick(now) {
      if (!lastTs) lastTs = now;
      var dt = Math.min((now - lastTs) / 1000, 0.08);
      lastTs = now;

      if (!lastBulbToggle || now - lastBulbToggle >= 450) {
        lastBulbToggle = now;
        bulbFlip = !bulbFlip;
        var bulbContainers = document.querySelectorAll('.sw-bulbs');
        for (var b = 0; b < bulbContainers.length; b++) {
          bulbContainers[b].classList.toggle('sw-bulbs-flip', bulbFlip);
        }
      }

      var arrows = document.querySelectorAll('.sw-arrow-poke-wrap');
      if (arrows.length) {
        var arrowX = (-5.5 + Math.sin(now * 0.006) * 5.5).toFixed(2);
        for (var a = 0; a < arrows.length; a++) {
          arrows[a].style.transform = 'translate3d(' + arrowX + 'px, 0, 0)';
        }
      }

      var tracks = document.querySelectorAll('.sw-ticker-track, .sw-notice-track');
      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (hoveredTracks.get(track)) continue;
        var firstChild = track.firstElementChild;
        if (!firstChild) continue;
        var loopWidth = firstChild.getBoundingClientRect().width || firstChild.offsetWidth || 0;
        if (loopWidth <= 10) continue;
        var speed = track.classList.contains('sw-notice-track') ? 38 : 42;
        var prev = trackOffsets.get(track) || 0;
        var next = (prev + speed * dt) % loopWidth;
        trackOffsets.set(track, next);
        track.style.transform = 'translate3d(' + (-next.toFixed(2)) + 'px, 0, 0)';
      }

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }


  /* -------------------- V13: Google / Gmail Auth Engine -------------------- */
  var AUTH_STORAGE_KEY = 'crazy_topup_auth_v1';
  var fbSdkPromise = null;

  function loadScriptOnce(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        if (existing.dataset.loaded === '1') { resolve(); return; }
        existing.addEventListener('load', resolve);
        existing.addEventListener('error', reject);
        return;
      }
      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = function () { s.dataset.loaded = '1'; resolve(); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function ensureFirebaseAuth() {
    if (fbSdkPromise) return fbSdkPromise;
    fbSdkPromise = Promise.all([
      loadScriptOnce('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js')
    ]).then(function () {
      return loadScriptOnce('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js');
    }).then(function () {
      var cfg = window.__CRAZY_FIREBASE_CONFIG__;
      if (!cfg || !cfg.apiKey) throw new Error('Missing Firebase config');
      if (!window.firebase.apps || !window.firebase.apps.length) {
        window.firebase.initializeApp(cfg);
      }
      return window.firebase.auth();
    });
    return fbSdkPromise;
  }

  function makeSupportPin(seed) {
    var hash = 0;
    var str = String(seed || 'guest');
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return String(1000000 + (Math.abs(hash) % 8999999));
  }

  function applyCrazyAuthUser(userObj, skipPersist) {
    var clean = userObj && userObj.loggedIn && userObj.email ? {
      loggedIn: true,
      name: String(userObj.name || userObj.email.split('@')[0] || 'Player').trim(),
      email: String(userObj.email).trim(),
      avatar: userObj.avatar ? String(userObj.avatar) : '',
      uid: userObj.uid ? String(userObj.uid) : '',
      supportPin: userObj.supportPin || makeSupportPin(userObj.email),
      provider: userObj.provider || 'google'
    } : {
      loggedIn: false,
      name: '',
      email: '',
      avatar: '',
      uid: '',
      supportPin: '',
      provider: ''
    };

    if (!skipPersist) {
      try {
        if (clean.loggedIn) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(clean));
        else localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch (e) {}
    }

    window.__CRAZY_USER__ = clean;
    window.SPIN_USER_LOGGED_IN = clean.loggedIn;
    window.SPIN_USER_NAME = clean.loggedIn ? clean.name : '';
    window.SPIN_USER_ID = clean.loggedIn ? clean.email : '';
    forceLoggedIn = clean.loggedIn;
    if (clean.loggedIn) showAuthRequiredModal = false;

    if (typeof window.setProfile === 'function') {
      window.setProfile({
        loggedIn: clean.loggedIn,
        name: clean.loggedIn ? clean.name : 'Guest',
        email: clean.loggedIn ? clean.email : '',
        avatar: clean.avatar || '',
        verified: clean.loggedIn,
        supportPin: clean.supportPin || '',
        balance: Number(state.walletBalanceBdt || 0),
        orders: Array.isArray(state.orders) ? state.orders.length : 0,
        codes: Array.isArray(state.offers) ? state.offers.filter(function (o) { return !o.used; }).length : 0
      });
    }
    if (typeof window.__renderDrawerUser === 'function') {
      window.__renderDrawerUser();
    }
    try {
      window.dispatchEvent(new CustomEvent('crazy-auth-change', { detail: clean }));
    } catch (e) {}

    syncAllUI();
    if (isModalOpen) renderModal();
    if (clean.loggedIn) {
      lastSyncedUserKey = '';
      syncSessionWithServer();
    }
  }

  function showSiteToast(msg) {
    var t = document.getElementById('toast');
    if (t) {
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(function () { t.classList.remove('show'); }, 2600);
    }
  }

  window.crazyLogout = function () {
    applyCrazyAuthUser({ loggedIn: false });
    if (window.firebase && window.firebase.auth) {
      try { window.firebase.auth().signOut(); } catch (e) {}
    }
    var small = document.querySelector('#avBtn .av-inner');
    if (small) small.innerHTML = '<svg class="i"><use href="#user"/></svg>';
    var acAv = document.getElementById('acAvatar');
    if (acAv) acAv.innerHTML = '<svg class="i"><use href="#user"/></svg>';
    showSiteToast('লগআউট সম্পন্ন হয়েছে');
  };

  window.openGoogleLoginModal = function () {
    var accPanel = document.getElementById('accPanel');
    if (accPanel && accPanel.classList.contains('show')) {
      accPanel.classList.remove('show');
      accPanel.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    var overlay = document.getElementById('swGoogleAuthOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'swGoogleAuthOverlay';
      overlay.className = 'sw-gauth-overlay';
      overlay.innerHTML =
        '<div class="sw-gauth-card" role="dialog" aria-modal="true" aria-labelledby="swGAuthTitle">' +
          '<button type="button" class="sw-gauth-close" id="swGAuthClose" aria-label="Close">×</button>' +
          '<div class="sw-gauth-hd">' +
            '<div class="sw-gauth-badge">🎮</div>' +
            '<div>' +
              '<h3 class="sw-gauth-title" id="swGAuthTitle">Crazy_top_up (24) Login</h3>' +
              '<p class="sw-gauth-sub">আপনার Gmail দিয়ে ১ ক্লিকে লগইন করুন — অর্ডার, ওয়ালেট ও স্পিন সুরক্ষিত থাকবে।</p>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="sw-gauth-google-btn" id="swGAuthGoogleBtn">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">' +
              '<path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>' +
              '<path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"/>' +
              '<path fill="#FBBC05" d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"/>' +
              '<path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"/>' +
            '</svg>' +
            '<span id="swGAuthBtnTxt">Continue with Google (Gmail)</span>' +
          '</button>' +
          '<div class="sw-gauth-div"><span>অথবা Gmail ও নাম দিন</span></div>' +
          '<form id="swGAuthForm">' +
            '<label class="sw-gauth-lbl" for="swGAuthName">আপনার নাম</label>' +
            '<input class="sw-gauth-inp" id="swGAuthName" type="text" placeholder="যেমন: Sakib Ahmed" autocomplete="name" />' +
            '<label class="sw-gauth-lbl" for="swGAuthMail">আপনার Gmail / মোবাইল নম্বর</label>' +
            '<input class="sw-gauth-inp" id="swGAuthMail" type="text" placeholder="example@gmail.com বা 017XXXXXXXX" autocomplete="email" />' +
            '<div class="sw-gauth-err" id="swGAuthErr" style="display:none;"></div>' +
            '<button type="submit" class="sw-gauth-submit">লগইন সম্পন্ন করুন</button>' +
          '</form>' +
          '<div class="sw-gauth-note">🔒 আপনার Gmail অ্যাকাউন্টের সাথে ব্যালেন্স ও স্পিন সিঙ্ক থাকবে</div>' +
        '</div>';
      document.body.appendChild(overlay);

      var closeFn = function () { overlay.classList.remove('show'); };
      overlay.addEventListener('click', function (e) { if (e.target === overlay) closeFn(); });
      document.getElementById('swGAuthClose').onclick = closeFn;

      var errBox = document.getElementById('swGAuthErr');
      var gBtn = document.getElementById('swGAuthGoogleBtn');
      var gTxt = document.getElementById('swGAuthBtnTxt');

      gBtn.onclick = function () {
        errBox.style.display = 'none';
        gBtn.disabled = true;
        gTxt.textContent = 'Google কানেক্ট হচ্ছে...';
        ensureFirebaseAuth().then(function (fbAuth) {
          var provider = new window.firebase.auth.GoogleAuthProvider();
          provider.setCustomParameters({ prompt: 'select_account' });
          return fbAuth.signInWithPopup(provider);
        }).then(function (res) {
          var u = res && res.user;
          if (!u || !u.email) throw new Error('Gmail পাওয়া যায়নি');
          applyCrazyAuthUser({
            loggedIn: true,
            name: u.displayName || u.email.split('@')[0],
            email: u.email,
            avatar: u.photoURL || '',
            uid: u.uid || '',
            provider: 'google'
          });
          closeFn();
          showSiteToast('স্বাগতম, ' + (u.displayName || u.email) + '!');
        }).catch(function (err) {
          var code = (err && err.code) || '';
          if (code === 'auth/popup-blocked') {
            errBox.textContent = 'ব্রাউজার পপ-আপ ব্লক করেছে। পপ-আপ Allow করুন অথবা নিচে Gmail দিয়ে লগইন করুন।';
          } else if (code === 'auth/unauthorized-domain') {
            errBox.innerHTML = 'এই ডোমেইনটি (<b>' + esc(location.hostname) + '</b>) Firebase Console → Authentication → Settings → Authorized domains-এ Add করতে হবে। আপাতত নিচে নাম ও Gmail দিয়ে লগইন করুন।';
          } else if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
            errBox.textContent = 'Google পপ-আপ বন্ধ হয়ে গেছে। আবার চেষ্টা করুন।';
          } else {
            errBox.textContent = 'Google লগইন ব্যর্থ হয়েছে (' + (code || 'error') + ')। নিচে Gmail দিয়ে লগইন করতে পারেন।';
          }
          errBox.style.display = 'block';
        }).finally(function () {
          gBtn.disabled = false;
          gTxt.textContent = 'Continue with Google (Gmail)';
        });
      };

      document.getElementById('swGAuthForm').onsubmit = function (e) {
        e.preventDefault();
        var nm = (document.getElementById('swGAuthName').value || '').trim();
        var em = (document.getElementById('swGAuthMail').value || '').trim();
        if (nm.length < 2) {
          errBox.textContent = 'দয়া করে কমপক্ষে ২ অক্ষরের নাম লিখুন।';
          errBox.style.display = 'block';
          return;
        }
        if (em.length < 5) {
          errBox.textContent = 'সঠিক Gmail (যেমন: name@gmail.com) অথবা মোবাইল নম্বর দিন।';
          errBox.style.display = 'block';
          return;
        }
        errBox.style.display = 'none';
        applyCrazyAuthUser({
          loggedIn: true,
          name: nm,
          email: em,
          avatar: '',
          provider: 'manual'
        });
        closeFn();
        showSiteToast('লগইন সফল হয়েছে, ' + nm + '!');
      };
    }
    var errEl = document.getElementById('swGAuthErr');
    if (errEl) errEl.style.display = 'none';
    overlay.classList.add('show');
  };

  function initGoogleAuthSession() {
    try {
      var raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.loggedIn && parsed.email) {
          applyCrazyAuthUser(parsed, true);
        }
      }
    } catch (e) {}

    if (window.__CRAZY_FIREBASE_CONFIG__ && window.__CRAZY_FIREBASE_CONFIG__.apiKey) {
      ensureFirebaseAuth().then(function (fbAuth) {
        fbAuth.onAuthStateChanged(function (fbUser) {
          if (fbUser && fbUser.email) {
            applyCrazyAuthUser({
              loggedIn: true,
              name: fbUser.displayName || fbUser.email.split('@')[0],
              email: fbUser.email,
              avatar: fbUser.photoURL || '',
              uid: fbUser.uid || '',
              provider: 'google'
            });
          }
        });
      }).catch(function () {});
    }
  }


  /* -------------------- V17: Add Money + Payment Gateway + Bangla QR + MFS -------------------- */
  function drawBanglaQrCanvas(canvas, seedText) {
    if (!canvas || !canvas.getContext) return;
    var size = 25;
    var grid = [];
    for (var r = 0; r < size; r++) {
      grid[r] = [];
      for (var c = 0; c < size; c++) grid[r][c] = false;
    }
    function finder(r0, c0) {
      for (var r = 0; r < 7; r++) {
        for (var c = 0; c < 7; c++) {
          grid[r0 + r][c0 + c] = (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
        }
      }
    }
    finder(0, 0); finder(0, size - 7); finder(size - 7, 0);
    var h = 2166136261;
    for (var i = 0; i < seedText.length; i++) {
      h ^= seedText.charCodeAt(i);
      h = Math.imul ? Math.imul(h, 16777619) : ((h * 16777619) | 0);
    }
    for (var rr = 0; rr < size; rr++) {
      for (var cc = 0; cc < size; cc++) {
        if ((rr < 8 && cc < 8) || (rr < 8 && cc >= size - 8) || (rr >= size - 8 && cc < 8)) continue;
        if (rr === 6 || cc === 6) { grid[rr][cc] = (rr + cc) % 2 === 0; continue; }
        h ^= ((rr * 31 + cc * 17) & 255);
        h = Math.imul ? Math.imul(h, 16777619) : ((h * 16777619) | 0);
        grid[rr][cc] = ((h >>> 16) & 1) === 1;
      }
    }
    var ctx = canvas.getContext('2d');
    var pad = 8;
    var cell = Math.floor((canvas.width - pad * 2) / size);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f172a';
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        if (grid[y][x]) ctx.fillRect(pad + x * cell, pad + y * cell, cell, cell);
      }
    }
  }


  var ACCOUNT_RANKS = [
    { level: 1, name: "Bronze", min: 0, max: 100, range: "0 - 100 Tk", sub: "Start your journey from Bronze.", grad: "linear-gradient(135deg,#8e5627 0%,#a86c39 48%,#734016 100%)", fill: "#9a5b25", rim: "#f6ad55", core: "#fff7ed" },
    { level: 2, name: "Silver", min: 101, max: 1000, range: "101 - 1,000 Tk", sub: "Silver members unlock priority delivery.", grad: "linear-gradient(135deg,#475569 0%,#64748b 50%,#334155 100%)", fill: "#64748b", rim: "#e2e8f0", core: "#f8fafc" },
    { level: 3, name: "Gold", min: 1001, max: 5000, range: "1,001 - 5,000 Tk", sub: "Gold tier boosts your spin luck and savings.", grad: "linear-gradient(135deg,#b45309 0%,#d97706 50%,#78350f 100%)", fill: "#d97706", rim: "#fde047", core: "#fef9c3" },
    { level: 4, name: "Platinum", min: 5001, max: 10000, range: "5,001 - 10,000 Tk", sub: "Platinum unlocks special top-up rates.", grad: "linear-gradient(135deg,#0369a1 0%,#0284c7 50%,#1e3a8a 100%)", fill: "#0284c7", rim: "#7dd3fc", core: "#f0f9ff" },
    { level: 5, name: "Diamond", min: 10001, max: 25000, range: "10,001 - 25,000 Tk", sub: "Diamond members enjoy VIP discounts & perks.", grad: "linear-gradient(135deg,#6d28d9 0%,#9333ea 50%,#4c1d95 100%)", fill: "#7c3aed", rim: "#d8b4fe", core: "#faf5ff" },
    { level: 6, name: "Heroic", min: 25001, max: 50000, range: "25,001 - 50,000 Tk", sub: "Heroic champions get elite priority access.", grad: "linear-gradient(135deg,#b91c1c 0%,#dc2626 50%,#7f1d1d 100%)", fill: "#dc2626", rim: "#fca5a5", core: "#fef2f2" },
    { level: 7, name: "Master", min: 50001, max: 100000, range: "50,001 - 100,000 Tk", sub: "Master rank commands top store privileges.", grad: "linear-gradient(135deg,#c2410c 0%,#ea580c 50%,#7c2d12 100%)", fill: "#ea580c", rim: "#fdba74", core: "#fff7ed" },
    { level: 8, name: "Grand Master", min: 100001, max: null, range: "100,000+ Tk", sub: "Grand Master — supreme Crazy_Top_Up (24) legend!", grad: "linear-gradient(135deg,#b45309 0%,#dc2626 52%,#581c87 100%)", fill: "#b91c1c", rim: "#facc15", core: "#fef08a" }
  ];
  function rankShieldSvg(r, sz) {
    return "<svg width=\"" + sz + "\" height=\"" + sz + "\" viewBox=\"0 0 44 44\" aria-hidden=\"true\">" +
      "<path d=\"M22 4l13 5.2v10.6c0 9.4-5.7 16.5-13 19.7-7.3-3.2-13-10.3-13-19.7V9.2L22 4z\" fill=\"" + r.fill + "\" stroke=\"" + r.rim + "\" stroke-width=\"2.4\" stroke-linejoin=\"round\"/>" +
      "<path d=\"M22 13l2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L22 13z\" fill=\"" + r.core + "\"/>" +
    "</svg>";
  }
  function computePin6(seed) {
    var s = String(seed || "guest").toLowerCase();
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return String(100000 + (Math.abs(h) % 899999));
  }

  var RECENT_ORDERS_SEED = [
    { id: "ro-1", customerName: "Shsbj", packageLabel: "115 Diamond", finalPrice: 79, status: "Done" },
    { id: "ro-2", customerName: "asadul islam", packageLabel: "Weekly", finalPrice: 158, status: "Done" },
    { id: "ro-3", customerName: "MR RADUWAN FF RX", packageLabel: "25 Diamond", finalPrice: 22, status: "Done" },
    { id: "ro-4", customerName: "Sp Ff", packageLabel: "505 Diamond", finalPrice: 336, status: "Done" },
    { id: "ro-5", customerName: "Md Sohel Rana", packageLabel: "50 Diamond", finalPrice: 37, status: "Done" },
    { id: "ro-6", customerName: "nayeem Ahmed", packageLabel: "Level Up Package - Level 6", finalPrice: 40, status: "In Progress" },
    { id: "ro-7", customerName: "Shamim Khan", packageLabel: "850 Diamond", finalPrice: 558, status: "Done" },
    { id: "ro-8", customerName: "Bdudu Hdudud", packageLabel: "115 Diamond", finalPrice: 79, status: "Done" },
    { id: "ro-9", customerName: "Borno Hasan", packageLabel: "Level Up Package - Level 25", finalPrice: 75, status: "In Progress" },
    { id: "ro-10", customerName: "Sajjad Vai", packageLabel: "240 Diamond", finalPrice: 158, status: "Done" }
  ];
  var liveRecentOrders = RECENT_ORDERS_SEED.slice();
  var RO_COLORS = ["#e11d74", "#4f46e5", "#0f766e", "#0284c7", "#854d0e", "#7c3aed", "#16a34a", "#d97706"];
  function renderRecentOrdersLive() {
    var box = document.getElementById("roList");
    if (!box) return;
    box.innerHTML = liveRecentOrders.map(function (o, i) {
      var nm = String(o.customerName || "Player");
      var ini = (nm.trim().charAt(0) || "P").toUpperCase();
      var col = RO_COLORS[i % RO_COLORS.length];
      var isDone = o.status === "Done" || o.status === "Completed";
      var pill = isDone
        ? "<span class=\"ro-pill done\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\" fill=\"#16a34a\"/><polyline points=\"8 12.5 11 15.5 16.5 9.5\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg><span>Done</span></span>"
        : "<span class=\"ro-pill prog\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#d97706\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 22h14M5 2h14M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2\"/></svg><span>In Progress</span></span>";
      return "<div class=\"ro-item\">" +
        "<div class=\"ro-left\">" +
          "<div class=\"ro-av\" style=\"background:" + col + ";\">" + esc(ini) + "</div>" +
          "<div class=\"ro-txt\"><b>" + esc(nm) + "</b><small>" + esc(o.packageLabel || "") + " - ৳" + Number(o.finalPrice || 0) + "</small></div>" +
        "</div>" +
        pill +
      "</div>";
    }).join("");
  }
  function initRecentOrdersSection() {
    renderRecentOrdersLive();
    var rf = document.getElementById("roRefreshBtn");
    if (rf && !rf.dataset.wired) {
      rf.dataset.wired = "1";
      rf.onclick = function () {
        rf.classList.remove("spin");
        void rf.offsetWidth;
        rf.classList.add("spin");
        fetchPublicFeed();
      };
    }
    var appBtn = document.getElementById("roAppBtn");
    if (appBtn && !appBtn.dataset.wired) {
      appBtn.dataset.wired = "1";
      appBtn.onclick = function () {
        var topPwa = document.getElementById("pwaInstallBtn") || document.querySelector("[data-pwa-install]");
        if (topPwa) topPwa.click();
        else showSiteToast("Browser মেনু থেকে Add to Home screen চাপুন অ্যাপ ইনস্টল করতে!");
      };
    }
  }

  function renderMyAccountRankView() {
    var acView = document.getElementById("acView");
    if (!acView) return;
    var ordersArr = Array.isArray(state.orders) ? state.orders : [];
    var orderSum = ordersArr.reduce(function (acc, o) {
      return (o && o.status !== "Rejected") ? acc + Number(o.finalPrice || 0) : acc;
    }, 0);
    var totalSpend = Math.max(Math.round(Number(state.lifetimeSpendBdt || 0)), Math.round(orderSum));
    var weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    var weeklySpend = ordersArr.reduce(function (acc, o) {
      if (!o || o.status === "Rejected") return acc;
      var t = new Date(o.createdAt || 0).getTime();
      return t >= weekAgo ? acc + Number(o.finalPrice || 0) : acc;
    }, 0);
    var cur = ACCOUNT_RANKS[0];
    for (var i = ACCOUNT_RANKS.length - 1; i >= 0; i--) {
      if (totalSpend >= ACCOUNT_RANKS[i].min) { cur = ACCOUNT_RANKS[i]; break; }
    }
    var next = null;
    for (var j = 0; j < ACCOUNT_RANKS.length; j++) {
      if (ACCOUNT_RANKS[j].level === cur.level + 1) { next = ACCOUNT_RANKS[j]; break; }
    }
    var pct = 100, need = 0;
    if (next) {
      var span = Math.max(1, next.min - cur.min);
      pct = Math.max(1, Math.min(99, Math.round((Math.max(0, totalSpend - cur.min) / span) * 100)));
      if (totalSpend === 0) pct = 1;
      need = Math.max(0, next.min - totalSpend);
    }
    var nameEl = document.getElementById("acName");
    var nm = (nameEl && nameEl.textContent) || "Guest";
    var mailEl = document.getElementById("acMail");
    var mailTxt = (mailEl && mailEl.textContent) || "";
    var avEl = document.getElementById("acAvatar");
    if (avEl && !avEl.querySelector("img")) {
      avEl.textContent = (nm.trim().charAt(0) || "G").toUpperCase();
    }
    var pin = computePin6(mailTxt && mailTxt.indexOf("লগইন") === -1 ? mailTxt : nm);
    var pinEl = document.getElementById("acPin");
    if (pinEl && !pinEl.textContent.trim()) pinEl.textContent = pin;
    var infoUid = document.getElementById("acInfoUid");
    if (infoUid) infoUid.textContent = (pinEl && pinEl.textContent) || pin;
    var infoNm = document.getElementById("acInfoName");
    if (infoNm) infoNm.textContent = nm;
    var infoPh = document.getElementById("acInfoPhone");
    if (infoPh) infoPh.textContent = /^\+?\d{7,15}$/.test(mailTxt.trim()) ? mailTxt.trim() : "Not added";
    var accBadge = document.getElementById("acAccBadge");
    if (accBadge) accBadge.innerHTML = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"#94a3b8\" aria-hidden=\"true\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><span>" + (isUserSignedIn() ? "Verified Account" : "Guest Session") + "</span>";

    var chipShield = document.getElementById("acChipShield");
    if (chipShield) chipShield.innerHTML = rankShieldSvg(cur, 22);
    var chipTitle = document.getElementById("acChipTitle");
    if (chipTitle) chipTitle.textContent = cur.name + " Member";
    var chipSub = document.getElementById("acChipSub");
    if (chipSub) chipSub.textContent = "Level " + cur.level + " / Current Rank";

    var rh = document.getElementById("acRankHero");
    if (rh) rh.style.background = cur.grad;
    var hs = document.getElementById("acHeroShield");
    if (hs) hs.innerHTML = rankShieldSvg(cur, 38);
    var hl = document.getElementById("acHeroLvl");
    if (hl) hl.textContent = "Level " + cur.level;
    var hn = document.getElementById("acHeroName");
    if (hn) hn.textContent = cur.name;
    var hsub = document.getElementById("acHeroSub");
    if (hsub) hsub.textContent = cur.sub;
    var hr = document.getElementById("acHeroRange");
    if (hr) hr.textContent = cur.range;
    var hp = document.getElementById("acHeroPct");
    if (hp) hp.textContent = pct + "%";
    var hf = document.getElementById("acHeroFill");
    if (hf) hf.style.width = pct + "%";
    var hdot = document.getElementById("acHeroDot");
    if (hdot) hdot.style.left = "calc(" + Math.min(96, Math.max(2, pct)) + "% - 6px)";
    var hneed = document.getElementById("acHeroNeed");
    if (hneed) hneed.innerHTML = next ? ("Need only <b>" + need + " Tk</b> to unlock <b>" + next.name + "</b>") : "<b>Grand Master maximum rank unlocked!</b>";

    var ordEl = document.getElementById("acOrders");
    if (ordEl) ordEl.textContent = String(ordersArr.length || Number(ordEl.textContent || 0));
    var ordMini = document.getElementById("acOrdersMini");
    if (ordMini && ordEl) ordMini.textContent = ordEl.textContent;
    var tsEl = document.getElementById("acTotalSpend");
    if (tsEl) tsEl.textContent = totalSpend + " Tk";
    var wsEl = document.getElementById("acWeeklySpend");
    if (wsEl) wsEl.textContent = Math.round(weeklySpend) + " Tk";
    var srEl = document.getElementById("acStatRank");
    if (srEl) srEl.textContent = cur.name;
    var pcEl = document.getElementById("acPathCount");
    if (pcEl) pcEl.textContent = cur.level + "/8";

    var listEl = document.getElementById("acRankList");
    if (listEl) {
      listEl.innerHTML = ACCOUNT_RANKS.map(function (r) {
        var isCur = r.level === cur.level;
        var isUnl = r.level < cur.level;
        var badgeCls = isCur ? "cur" : (isUnl ? "unl" : "");
        var chkIco = "<svg width=\"11\" height=\"11\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:-1px;margin-right:3px;\"><polyline points=\"20 6 9 17 4 12\"/></svg>";
        var lockIco = "<svg width=\"11\" height=\"11\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:-1px;margin-right:3px;\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/></svg>";
        var badgeTxt = isCur ? (chkIco + "Current") : (isUnl ? (chkIco + "Unlocked") : (lockIco + "Locked"));
        return "<div class=\"ac2-j-item" + (isCur ? " is-cur" : "") + "\">" +
          "<div class=\"ac2-j-left\">" +
            "<div class=\"ac2-j-badge\">" + rankShieldSvg(r, 24) + "</div>" +
            "<div><b>" + r.name + "</b><small>" + r.range + "</small></div>" +
          "</div>" +
          "<span class=\"ac2-j-pill " + badgeCls + "\">" + badgeTxt + "</span>" +
        "</div>";
      }).join("");
    }
  }

  function initAddMoneyPage() {
    var view = document.getElementById('amView');
    if (!view || view.dataset.wired === '1') return;
    view.dataset.wired = '1';

    var step1 = document.getElementById('amStep1');
    var step2 = document.getElementById('amStep2');
    var step3Qr = document.getElementById('amStep3Qr');
    var step3Mfs = document.getElementById('amStep3Mfs');
    var step3Eps = document.getElementById('amStep3Eps');
    var hero = view.querySelector('.am-hero');
    var amtInp = document.getElementById('amAmtInput');
    var err1 = document.getElementById('amErr1');
    var chosenAmt = document.getElementById('amChosenAmt');

    var selectedMethod = 'bKash';
    var qrTimerId = null;
    var qrSecs = 900;

    function stopQrTimer() {
      if (qrTimerId) { clearInterval(qrTimerId); qrTimerId = null; }
    }

    function showAmStep(mode) {
      stopQrTimer();
      var isGw = (mode !== 1);
      document.body.classList.toggle('am-gateway-mode', isGw);
      if (hero) hero.hidden = isGw;
      step1.hidden = isGw;
      step2.hidden = (mode !== 2);
      if (step3Qr) step3Qr.hidden = (mode !== 'qr');
      if (step3Mfs) step3Mfs.hidden = (mode !== 'mfs');
      if (step3Eps) step3Eps.hidden = (mode !== 'eps');
      if (isGw) {
        var pCard = document.getElementById('amPendingCard');
        if (pCard) { pCard.hidden = true; pCard.style.display = 'none'; }
      } else {
        renderAmPendingCard();
      }
    }
    window.__amShowStep = showAmStep;

    function getActiveNumber(m) {
      var bkNum = (paymentNumbers && paymentNumbers.bkash) || '01700-000000';
      var ngNum = (paymentNumbers && paymentNumbers.nagad) || '01800-000000';
      var rkNum = (paymentNumbers && paymentNumbers.rocket) || '01900-000000';
      if (m === 'Nagad') return ngNum;
      if (m === 'Rocket') return rkNum;
      return bkNum;
    }

    function openQrStep(amt) {
      var bkNum = getActiveNumber('bKash');
      document.getElementById('amQrTotal').textContent = amt + '.00 BDT';
      document.getElementById('amQrExactAmt').textContent = amt + '.00 BDT';
      document.getElementById('amQrNumLbl').textContent = 'Number: ' + bkNum;
      document.getElementById('amQrErr').style.display = 'none';
      document.getElementById('amQrOk').style.display = 'none';
      drawBanglaQrCanvas(document.getElementById('amQrCanvas'), 'CRAZY_TOP_UP_24|' + bkNum + '|' + amt);
      showAmStep('qr');
      qrSecs = 15 * 60;
      var clock = document.getElementById('amQrClock');
      function updateClock() {
        var m = Math.floor(qrSecs / 60);
        var s = String(qrSecs % 60).padStart(2, '0');
        if (clock) clock.textContent = m + 'm ' + s + 's বাকি';
      }
      updateClock();
      qrTimerId = setInterval(function () {
        if (qrSecs > 0) qrSecs--;
        updateClock();
      }, 1000);
    }


    var epsTab = "WALLET";
    var epsChannel = "";
    var EPS_CHANNELS = {
      WALLET: [
        {
          id: "bKash",
          render: function (on) {
            var c = on ? "#e2136e" : "#475569";
            return "<div style=\"display:flex;align-items:center;gap:4px;color:" + c + ";\">" +
              "<span style=\"font-size:12.5px;font-weight:700;letter-spacing:-0.02em;\">bKash</span>" +
              "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"" + c + "\"><path d=\"M3 10l9-6 3 6 6 2-7 5-5 4-1-6-5-5Z\"/></svg></div>";
          }
        },
        {
          id: "নগদ",
          render: function (on) {
            var ring = on ? "#f59e0b" : "#64748b";
            var flame = on ? "#dc2626" : "#64748b";
            var bg = on ? "#fef3c7" : "none";
            var sub = on ? "<div style=\"font-size:5.5px;font-weight:700;color:#dc2626;margin-top:1px;white-space:nowrap;\">ডাক বিভাগের ডিজিটাল লেনদেন</div>" : "";
            return "<div style=\"display:flex;align-items:center;gap:5px;\">" +
              "<svg width=\"22\" height=\"22\" viewBox=\"0 0 40 40\"><circle cx=\"20\" cy=\"20\" r=\"16\" fill=\"" + bg + "\" stroke=\"" + ring + "\" stroke-width=\"2.8\"/><path d=\"M12 24c3-7 9-12 16-11-3 2-5 5-5 8 2-2 4-3 6-3-2 4-6 8-12 9-2 0-4-1-5-3Z\" fill=\"" + flame + "\"/></svg>" +
              "<div style=\"text-align:left;line-height:1;\"><div style=\"font-size:13.5px;font-weight:900;color:" + flame + ";\">নগদ</div>" + sub + "</div></div>";
          }
        },
        {
          id: "উপায়",
          render: function (on) {
            var bowl = on ? "#facc15" : "#94a3b8";
            var dot = on ? "#1e3a8a" : "#475569";
            return "<div style=\"display:flex;flex-direction:column;align-items:center;line-height:1;color:" + dot + ";\">" +
              "<svg width=\"24\" height=\"16\" viewBox=\"0 0 48 32\"><path d=\"M8 6c0 12 6 20 16 20s16-8 16-20h-7c0 8-3.5 13-9 13s-9-5-9-13H8Z\" fill=\"" + bowl + "\"/><circle cx=\"15\" cy=\"6\" r=\"3.5\" fill=\"" + dot + "\"/><circle cx=\"33\" cy=\"6\" r=\"3.5\" fill=\"" + dot + "\"/></svg>" +
              "<span style=\"font-size:10px;font-weight:900;margin-top:2px;\">উপায়</span></div>";
          }
        },
        {
          id: "OK Wallet",
          render: function (on) {
            var c = on ? "#d97706" : "#334155";
            return "<div style=\"display:flex;align-items:center;gap:3px;color:" + c + ";font-weight:900;font-size:13px;\">" +
              "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.1\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9.5\"/><circle cx=\"9\" cy=\"10\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"15\" cy=\"10\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M8.5 14.5c1 1.6 2.2 2.2 3.5 2.2s2.5-.6 3.5-2.2\"/></svg><span>OK</span></div>";
          }
        },
        {
          id: "mCash",
          render: function (on) {
            var c = on ? "#007b40" : "#475569";
            return "<div style=\"display:flex;align-items:center;gap:4px;color:" + c + ";\">" +
              "<span style=\"width:19px;height:22px;background:" + c + ";color:#fff;font-size:9px;font-weight:900;display:flex;align-items:center;justify-content:center;border-radius:2px;\">M</span>" +
              "<div style=\"text-align:left;line-height:1;\"><div style=\"font-size:10px;font-weight:900;\">এম</div><div style=\"font-size:9px;font-weight:700;\">ক্যাশ</div></div></div>";
          }
        },
        {
          id: "Islamic Wallet",
          render: function (on) {
            var c1 = on ? "#00875a" : "#475569";
            var c2 = on ? "#059669" : "#94a3b8";
            return "<div style=\"text-align:center;line-height:1;\"><div style=\"font-size:11.5px;font-weight:900;font-style:italic;color:" + c1 + ";\">Islamic</div><div style=\"font-size:9px;font-weight:700;color:" + c2 + ";\">Wallet</div></div>";
          }
        },
        {
          id: "Meghna Pay",
          render: function (on) {
            var c1 = on ? "#0284c7" : "#475569";
            var c2 = on ? "#0369a1" : "#475569";
            return "<div style=\"text-align:left;line-height:1;\"><div style=\"font-size:9px;font-weight:700;font-style:italic;color:" + c1 + ";\">meghna</div><div style=\"font-size:14px;font-weight:900;font-style:italic;margin-top:-1px;color:" + c2 + ";\">pay</div></div>";
          }
        }
      ],
      BANK: [
        {
          id: "Islami Bank Bangladesh",
          render: function (on) {
            var ring = on ? "#007b40" : "#475569";
            var core = on ? "#007b40" : "#64748b";
            return "<div style=\"display:flex;flex-direction:column;align-items:center;line-height:1;\">" +
              "<svg width=\"54\" height=\"36\" viewBox=\"0 0 80 46\"><ellipse cx=\"40\" cy=\"23\" rx=\"32\" ry=\"17\" fill=\"none\" stroke=\"" + ring + "\" stroke-width=\"2.4\" stroke-dasharray=\"4 2\"/><circle cx=\"40\" cy=\"23\" r=\"11\" fill=\"" + core + "\"/><path d=\"M35 27v-7l5-4 5 4v7h-10Z\" fill=\"#ffffff\"/></svg></div>";
          }
        },
        {
          id: "Southeast Bank PLC",
          render: function (on) {
            var sCol = on ? "#1e3a8a" : "#475569";
            var bCol = on ? "#dc2626" : "#475569";
            var tCol = on ? "#0f172a" : "#475569";
            return "<div style=\"display:flex;flex-direction:column;align-items:center;line-height:1;\">" +
              "<div style=\"font-size:18px;font-weight:900;letter-spacing:-0.04em;\"><span style=\"color:" + sCol + ";\">S</span><span style=\"color:" + bCol + ";\">B</span></div>" +
              "<div style=\"font-size:7.5px;font-weight:800;margin-top:2px;white-space:nowrap;color:" + tCol + ";\">Southeast Bank PLC</div></div>";
          }
        },
        {
          id: "Citytouch",
          render: function (on) {
            var c1 = on ? "#dc2626" : "#475569";
            var c2 = on ? "#b91c1c" : "#94a3b8";
            return "<div style=\"text-align:center;line-height:1.1;\"><div style=\"font-size:11.5px;font-weight:900;color:" + c1 + ";\">Citytouch</div><div style=\"font-size:8px;font-weight:700;color:" + c2 + ";\">City Bank</div></div>";
          }
        }
      ]
    };
    var CHK_BADGE_HTML = "<span class=\"eps-ch-chk\"><svg width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"3.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span>";
    function renderEpsGrid() {
      var grid = document.getElementById("epsGrid");
      if (!grid) return;
      if (epsTab === "CARD") {
        grid.className = "eps-card-form";
        grid.innerHTML =
          "<div class=\"eps-card-top\"><span class=\"eps-visa\">VISA</span><span class=\"eps-mc\"><i></i><i></i></span><span class=\"eps-other-cards\">Other Cards</span></div>" +
          "<input class=\"eps-card-inp\" type=\"text\" placeholder=\"Enter Card Number\">" +
          "<div class=\"eps-card-row2\"><input class=\"eps-card-inp\" type=\"text\" placeholder=\"MM/YY\"><input class=\"eps-card-inp\" type=\"text\" placeholder=\"CVC/CVV\"></div>" +
          "<input class=\"eps-card-inp\" type=\"text\" placeholder=\"Card Holder Name\">" +
          "<label class=\"eps-card-save\"><input type=\"checkbox\" style=\"accent-color:#006a4e;\"><span>Save &amp; remember me</span></label>";
        return;
      }
      grid.className = "eps-grid";
      var items = EPS_CHANNELS[epsTab] || EPS_CHANNELS.WALLET;
      grid.innerHTML = items.map(function (it) {
        var isOn = epsChannel === it.id;
        return "<button type=\"button\" class=\"eps-ch" + (isOn ? " on" : "") + "\" data-ch=\"" + esc(it.id) + "\">" +
          (isOn ? CHK_BADGE_HTML : "") +
          it.render(isOn) +
        "</button>";
      }).join("");
      grid.querySelectorAll(".eps-ch").forEach(function (b) {
        b.onclick = function () {
          epsChannel = b.getAttribute("data-ch") || "";
          document.getElementById("epsErr").style.display = "none";
          document.getElementById("epsChLbl").textContent = epsChannel;
          document.getElementById("epsNumLbl").textContent = epsChannel === "নগদ" ? getActiveNumber("Nagad") : getActiveNumber("bKash");
          renderEpsGrid();
        };
      });
    }
    function openEpsStep(amt) {
      epsTab = "WALLET"; epsChannel = "";
      document.getElementById("epsPayAmt").textContent = amt + ".00";
      document.getElementById("epsTrxBox").style.display = "none";
      document.getElementById("epsErr").style.display = "none";
      document.getElementById("epsOk").style.display = "none";
      document.getElementById("epsChLbl").textContent = "bKash";
      document.getElementById("epsNumLbl").textContent = getActiveNumber("bKash");
      document.querySelectorAll("#amStep3Eps .eps-tabs button").forEach(function (tb) {
        tb.classList.toggle("on", tb.getAttribute("data-epstab") === "WALLET");
      });
      renderEpsGrid();
      showAmStep("eps");
    }
    if (step3Eps) {
      step3Eps.querySelectorAll(".eps-tabs button").forEach(function (tb) {
        tb.onclick = function () {
          epsTab = tb.getAttribute("data-epstab") || "WALLET";
          step3Eps.querySelectorAll(".eps-tabs button").forEach(function (x) { x.classList.toggle("on", x === tb); });
          epsChannel = epsTab === "CARD" ? "VISA/Mastercard" : "";
          document.getElementById("epsTrxBox").style.display = "none";
          document.getElementById("epsErr").style.display = "none";
          renderEpsGrid();
        };
      });
      step3Eps.querySelectorAll(".eps-lang button").forEach(function (lb) {
        lb.onclick = function () {
          step3Eps.querySelectorAll(".eps-lang button").forEach(function (x) { x.classList.toggle("on", x === lb); });
        };
      });
      document.getElementById("epsCloseBtn").onclick = function () { showAmStep(2); };
      document.getElementById("epsLogBtn").onclick = function () { showAmStep(2); };
      document.getElementById("epsSupBtn").onclick = function () {
        var ok = document.getElementById("epsOk");
        ok.textContent = "হেল্পলাইন: " + getActiveNumber("bKash") + " (bKash) / " + getActiveNumber("Nagad") + " (Nagad)";
        ok.style.display = "block";
      };
      document.getElementById("epsFaqBtn").onclick = function () {
        var ok = document.getElementById("epsOk");
        ok.textContent = "ওয়ালেট সিলেক্ট করে PAY বাটনে চাপুন, টাকা পাঠিয়ে TrxID দিয়ে Verify করুন।";
        ok.style.display = "block";
      };
      document.getElementById("epsOffBtn").onclick = function () {
        var ok = document.getElementById("epsOk");
        ok.textContent = "Crazy_Top_Up (24) অ্যাড মানিতে ৩% ক্যাশব্যাক ও স্পিন অফার চালু আছে!";
        ok.style.display = "block";
      };
      var epsConnTimer = null;
      var epsEasyLang = "en";
      function buildEpsSegInputs() {
        var row = document.getElementById("epsSegRow");
        if (!row) return;
        var out = "";
        for (var k = 0; k < 11; k++) {
          if (k === 3 || k === 7) out += "<span>-</span>";
          out += "<input type=\"text\" inputmode=\"numeric\" maxlength=\"1\" class=\"eps-seg-inp\" data-sidx=\"" + k + "\">";
        }
        row.innerHTML = out;
        var inputs = row.querySelectorAll(".eps-seg-inp");
        inputs.forEach(function (inp, idx) {
          inp.oninput = function () {
            inp.value = inp.value.replace(/\D/g, "").slice(-1);
            document.getElementById("epsEasyErr").style.display = "none";
            if (inp.value && idx < inputs.length - 1) inputs[idx + 1].focus();
          };
          inp.onkeydown = function (e) {
            if (e.key === "Backspace" && !inp.value && idx > 0) inputs[idx - 1].focus();
          };
          inp.onpaste = function (e) {
            var txt = (e.clipboardData && e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 11);
            if (!txt) return;
            e.preventDefault();
            for (var p = 0; p < inputs.length; p++) inputs[p].value = txt[p] || "";
          };
        });
      }
      function getEasyBg(ch) {
        if (ch === "bKash") return "radial-gradient(circle at 50% 45%, #e11d74 0%, #9b0b48 75%, #750735 100%)";
        if (ch === "উপায়" || ch === "Meghna Pay") return "radial-gradient(circle at 50% 45%, #1d4ed8 0%, #1e3a8a 75%, #172554 100%)";
        if (String(ch).indexOf("Bank") !== -1 || ch === "mCash" || ch === "Islamic Wallet") return "radial-gradient(circle at 50% 45%, #007b40 0%, #00553e 75%, #003828 100%)";
        return "radial-gradient(circle at 50% 45%, #dc2626 0%, #991b1b 72%, #780f0f 100%)";
      }
      function updateEasyTexts() {
        var chLbl = epsChannel === "নগদ" ? "Nagad" : epsChannel;
        document.getElementById("epsEasyHeadTitle").textContent = epsEasyLang === "bn" ? "ইজি পেমেন্ট সিস্টেম" : "Easy Payment System";
        document.getElementById("epsEasyAccLbl").textContent = epsEasyLang === "bn"
          ? ("আপনার " + epsChannel + " অ্যাকাউন্ট নম্বর")
          : ("Your " + chLbl + " Account Number");
      }
      document.querySelectorAll("#epsEasyOv .eps-easy-lang button").forEach(function (lb) {
        lb.onclick = function () {
          epsEasyLang = lb.getAttribute("data-elang") || "en";
          document.querySelectorAll("#epsEasyOv .eps-easy-lang button").forEach(function (x) { x.classList.toggle("on", x === lb); });
          updateEasyTexts();
        };
      });
      document.getElementById("epsEasyClose").onclick = function () {
        document.getElementById("epsEasyOv").style.display = "none";
      };
      document.getElementById("epsEasyProceed").onclick = function () {
        var num = "";
        document.querySelectorAll("#epsSegRow .eps-seg-inp").forEach(function (i) { num += i.value; });
        var err = document.getElementById("epsEasyErr");
        if (num.length < 11) {
          err.textContent = "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।";
          err.style.display = "block";
          return;
        }
        err.style.display = "none";
        document.getElementById("epsEasyChTxt").textContent = epsChannel;
        document.getElementById("epsEasyNumTxt").textContent = epsChannel === "নগদ" ? getActiveNumber("Nagad") : getActiveNumber("bKash");
        document.getElementById("epsEasyTrxErr").style.display = "none";
        document.getElementById("epsEasyTrxOk").style.display = "none";
        document.getElementById("epsEasyPhoneStep").style.display = "none";
        document.getElementById("epsEasyTrxStep").style.display = "block";
      };
      document.getElementById("epsEasyBack").onclick = function () {
        document.getElementById("epsEasyTrxStep").style.display = "none";
        document.getElementById("epsEasyPhoneStep").style.display = "block";
      };
      document.getElementById("epsEasyCopyBtn").onclick = function () {
        var t = document.getElementById("epsEasyNumTxt").textContent;
        if (navigator.clipboard && t) navigator.clipboard.writeText(t).then(function () { showSiteToast("কপি হয়েছে: " + t); }).catch(function () {});
      };
      document.getElementById("epsEasyConfirm").onclick = function () {
        var trx = (document.getElementById("epsEasyTrxInp").value || "").trim().toUpperCase();
        var err = document.getElementById("epsEasyTrxErr");
        var ok = document.getElementById("epsEasyTrxOk");
        if (trx.length < 4) { err.textContent = "সঠিক ট্রানজেকশন আইডি দিন।"; err.style.display = "block"; return; }
        err.style.display = "none"; ok.style.display = "none";
        var sender = "";
        document.querySelectorAll("#epsSegRow .eps-seg-inp").forEach(function (i) { sender += i.value; });
        var btn = document.getElementById("epsEasyConfirm");
        btn.disabled = true; btn.textContent = "...";
        var amt = Math.round(Number(amtInp.value)) || 50;
        fetch("/api/wallet/deposit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: getUserKey(),
            method: "EPS (" + epsChannel + ")",
            amountBdt: amt,
            senderNumber: sender || ("EPS " + epsChannel),
            trxId: trx
          })
        }).then(function (r) { return r.json().then(function (res) { return { ok: r.ok, data: res }; }); })
          .then(function (res) {
            if (!res.ok) { err.textContent = (res.data && res.data.error) || "ভেরিফাই ব্যর্থ হয়েছে।"; err.style.display = "block"; return; }
            applyServerPayload(res.data, true);
            document.getElementById("epsEasyTrxInp").value = "";
            ok.textContent = (res.data && res.data.autoApproved) ? ("✅ অটো-ভেরিফাই সফল! EPS (" + epsChannel + ") ৳" + amt + ".00 সাথে সাথে ওয়ালেটে যোগ হয়েছে!") : ("✅ EPS (" + epsChannel + ") ৳" + amt + ".00 TrxID " + trx + " সফলভাবে জমা হয়েছে!");
            ok.style.display = "block";
          }).catch(function () {
            err.textContent = "নেটওয়ার্ক সমস্যা — আবার চেষ্টা করুন।"; err.style.display = "block";
          }).finally(function () { btn.disabled = false; btn.textContent = "Confirm"; });
      };
      document.getElementById("epsPayBtn").onclick = function () {
        var err = document.getElementById("epsErr");
        if (!epsChannel) {
          err.textContent = "দয়া করে আগে একটি ওয়ালেট বা ব্যাংক সিলেক্ট করুন।";
          err.style.display = "block";
          return;
        }
        err.style.display = "none";
        var amt = Math.round(Number(amtInp.value)) || 50;
        var chLbl = epsChannel === "নগদ" ? "Nagad" : epsChannel;
        var connLogo = document.getElementById("epsConnLogo");
        connLogo.innerHTML = epsChannel === "নগদ"
          ? "<div style=\"display:flex;align-items:center;gap:5px;\"><svg width=\"26\" height=\"26\" viewBox=\"0 0 40 40\"><circle cx=\"20\" cy=\"20\" r=\"16\" fill=\"#fef3c7\" stroke=\"#f59e0b\" stroke-width=\"2.8\"/><path d=\"M12 24c3-7 9-12 16-11-3 2-5 5-5 8 2-2 4-3 6-3-2 4-6 8-12 9-2 0-4-1-5-3Z\" fill=\"#dc2626\"/></svg><div style=\"text-align:left;line-height:1;\"><div style=\"font-size:15px;font-weight:900;color:#dc2626;\">নগদ</div><div style=\"font-size:5.5px;font-weight:700;color:#dc2626;\">ডাক বিভাগের ডিজিটাল লেনদেন</div></div></div>"
          : ("<b style=\"font-size:13px;color:#006a4e;\">" + esc(epsChannel) + "</b>");
        document.getElementById("epsConnTitle").textContent = "Connecting to " + chLbl;
        document.getElementById("epsConnOv").style.display = "flex";
        if (epsConnTimer) clearTimeout(epsConnTimer);
        epsConnTimer = setTimeout(function () {
          document.getElementById("epsConnOv").style.display = "none";
          document.getElementById("epsEasyCard").style.background = getEasyBg(epsChannel);
          document.getElementById("epsEasyInv").textContent = "261120" + String(Date.now()).slice(-6) + "TW";
          document.getElementById("epsEasyAmt").textContent = "BDT " + amt + ".00";
          document.getElementById("epsEasyPhoneStep").style.display = "block";
          document.getElementById("epsEasyTrxStep").style.display = "none";
          document.getElementById("epsEasyErr").style.display = "none";
          buildEpsSegInputs();
          updateEasyTexts();
          document.getElementById("epsEasyFoot").innerHTML =
            "<svg width=\"26\" height=\"26\" viewBox=\"0 0 40 40\"><circle cx=\"20\" cy=\"20\" r=\"16\" fill=\"#ffffff\"/><path d=\"M12 24c3-7 9-12 16-11-3 2-5 5-5 8 2-2 4-3 6-3-2 4-6 8-12 9-2 0-4-1-5-3Z\" fill=\"#dc2626\"/></svg>" +
            "<div style=\"text-align:left;line-height:1;\"><div style=\"font-size:16px;font-weight:900;color:#ffffff;\">" + esc(epsChannel) + "</div><div style=\"font-size:5.5px;color:rgba(255,255,255,0.85);\">ডাক বিভাগের ডিজিটাল লেনদেন</div></div>";
          document.getElementById("epsEasyOv").style.display = "flex";
        }, 1600);
      };
      document.getElementById("epsCopyBtn").onclick = function () {
        var num = document.getElementById("epsNumLbl").textContent;
        if (navigator.clipboard && num) navigator.clipboard.writeText(num).then(function () { showSiteToast("কপি হয়েছে: " + num); }).catch(function () {});
      };
      document.getElementById("epsVerifyBtn").onclick = function () {
        var trx = (document.getElementById("epsTrxInp").value || "").trim().toUpperCase();
        var err = document.getElementById("epsErr");
        var ok = document.getElementById("epsOk");
        if (trx.length < 4) { err.textContent = "সঠিক ট্রানজেকশন আইডি দিন।"; err.style.display = "block"; return; }
        err.style.display = "none"; ok.style.display = "none";
        var btn = document.getElementById("epsVerifyBtn");
        btn.disabled = true; btn.textContent = "...";
        var amt = Math.round(Number(amtInp.value)) || 50;
        fetch("/api/wallet/deposit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: getUserKey(),
            method: "EPS (" + epsChannel + ")",
            amountBdt: amt,
            senderNumber: "EPS " + epsChannel,
            trxId: trx
          })
        }).then(function (r) { return r.json().then(function (res) { return { ok: r.ok, data: res }; }); })
          .then(function (res) {
            if (!res.ok) { err.textContent = (res.data && res.data.error) || "ভেরিফাই ব্যর্থ হয়েছে।"; err.style.display = "block"; return; }
            applyServerPayload(res.data, true);
            document.getElementById("epsTrxInp").value = "";
            ok.textContent = (res.data && res.data.autoApproved) ? ("✅ অটো-ভেরিফাই সফল! EPS (" + epsChannel + ") ৳" + amt + ".00 সাথে সাথে ওয়ালেটে যোগ হয়েছে!") : ("✅ EPS (" + epsChannel + ") ৳" + amt + ".00 TrxID " + trx + " ভেরিফাইয়ের জন্য জমা হয়েছে!");
            ok.style.display = "block";
          }).catch(function () {
            err.textContent = "নেটওয়ার্ক সমস্যা — আবার চেষ্টা করুন।"; err.style.display = "block";
          }).finally(function () { btn.disabled = false; btn.textContent = "Verify"; });
      };
    }

    function openMfsStep(m, amt) {
      var num = getActiveNumber(m);
      var cfg = {
        Nagad: { ussd: '*167#', app: 'NAGAD', bg: '#d81b27', btn: '#b90e1c', logo: '<div class="am-m-nagad"><svg width="28" height="28" viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="#FFF7ED" stroke="#EA580C" stroke-width="2.4"/><path d="M12 24c3-7 9-12 16-11-3 2-5 5-5 8 2-2 4-3 6-3-2 4-6 8-12 9-2 0-4-1-5-3Z" fill="#DC2626"/></svg><span>নগদ</span></div>' },
        Rocket: { ussd: '*322#', app: 'ROCKET', bg: '#7c3aed', btn: '#5b21b6', logo: '<div class="am-m-rocket"><small style="display:inline-flex;align-items:center;gap:3px;">ROCKET <svg width="13" height="13" viewBox="0 0 24 24" fill="#7C3AED"><path d="M14 2c3.5 0 6.5 1 8 2.5-1.5 1.5-3 4.5-3 8l-5 5-4-4 4-11.5ZM7 13l4 4-3 3H4v-4l3-3Z"/></svg></small><b>রকেট</b></div>' },
        Upay: { ussd: '*268#', app: 'UPAY', bg: '#0f4eb8', btn: '#0b3a8c', logo: '<div class="am-m-upay"><b style="color:#1E3A8A;font-size:15px;">উপায় (Upay)</b></div>' },
        EPS: { ussd: '*247# / *167#', app: 'MFS', bg: '#1d4ed8', btn: '#1e3a8a', logo: '<div class="am-m-eps"><div class="am-m-eps-top"><small>PAY WITH</small> <b>≡EPS</b></div></div>' }
      }[m] || { ussd: '*167#', app: 'MFS', bg: '#1d4ed8', btn: '#1e3a8a', logo: '<b>' + esc(m) + '</b>' };

      document.getElementById('amMfsMethodLogo').innerHTML = cfg.logo;
      document.getElementById('amMfsAmtVal').textContent = '৳ ' + amt;
      document.getElementById('amMfsPanel').style.background = cfg.bg;
      document.getElementById('amMfsVerifyBtn').style.background = cfg.btn;
      document.getElementById('amMfsErr').style.display = 'none';
      document.getElementById('amMfsOk').style.display = 'none';
      document.getElementById('amMfsList').innerHTML =
        '<li>• ' + cfg.ussd + ' ডায়াল করে আপনার ' + cfg.app + ' মোবাইল মেনুতে যান অথবা ' + cfg.app + ' অ্যাপে যান।</li>' +
        '<li>• Send Money -এ ক্লিক করুন।</li>' +
        '<li>• এই নম্বরে টাকা পাঠান <b style="color:#fde047;">' + esc(num) + '</b> <button type="button" class="am-mfs-copy" id="amMfsCopyBtn" style="display:inline-flex;align-items:center;gap:4px;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>কপি</span></button></li>' +
        '<li>• টাকার পরিমাণঃ <b style="color:#fde047;">' + amt + '</b></li>' +
        '<li>• নিশ্চিত করে এখন আপনার ' + cfg.app + ' মোবাইল মেনু PIN লিখুন।</li>' +
        '<li>• টাকা পাঠান এবং ট্রানজ্যাকশন আইডি কপি করুন।</li>' +
        '<li>• ট্রানজ্যাকশন আইডি লিখে ভেরিফাই চাপুন।</li>';

      var cp = document.getElementById('amMfsCopyBtn');
      if (cp) cp.onclick = function () {
        if (navigator.clipboard && num) {
          navigator.clipboard.writeText(num).then(function () { showSiteToast('নম্বর কপি হয়েছে: ' + num); }).catch(function () {});
        }
      };
      showAmStep('mfs');
    }

    document.getElementById('amClearAmt').onclick = function () {
      amtInp.value = ''; amtInp.focus(); err1.style.display = 'none';
    };

    document.getElementById('amNextBtn').onclick = function () {
      var amt = Math.round(Number(amtInp.value));
      if (!isFinite(amt) || amt < 20) {
        err1.textContent = 'সর্বনিম্ন ৳২০ টাকা Add Money করতে পারবেন।';
        err1.style.display = 'block';
        return;
      }
      if (!isUserSignedIn()) {
        if (typeof window.openGoogleLoginModal === 'function') window.openGoogleLoginModal();
        return;
      }
      err1.style.display = 'none';
      amOpenedDirectlyToGateway = false;
      if (chosenAmt) chosenAmt.textContent = 'Amount: ৳' + amt;
      var payBar = document.getElementById('amGwPayBar');
      if (payBar) payBar.textContent = 'Pay ' + amt + '.00';
      showAmStep(2);
    };

    function exitGatewayToOrigin(forceHome) {
      if (amOpenedDirectlyToGateway && pendingProductOrder) {
        var ret = (!forceHome && pendingProductOrder.returnHash) ? pendingProductOrder.returnHash.replace(/^#/, '') : '';
        pendingProductOrder = null;
        amOpenedDirectlyToGateway = false;
        showAmStep(1);
        location.hash = ret;
        return;
      }
      amOpenedDirectlyToGateway = false;
      if (forceHome) {
        showAmStep(1);
      } else {
        showAmStep(1);
        location.hash = '';
      }
    }

    var gwHome = document.getElementById('amGwHome');
    if (gwHome) gwHome.onclick = function () { exitGatewayToOrigin(true); };
    var gwClose = document.getElementById('amGwClose');
    if (gwClose) gwClose.onclick = function () { exitGatewayToOrigin(false); };

    view.querySelectorAll('.am-gw-card').forEach(function (btn) {
      btn.onclick = function () {
        selectedMethod = btn.getAttribute('data-method') || 'bKash';
        var amt = Math.round(Number(amtInp.value)) || 50;
        if (selectedMethod === 'bKash') openQrStep(amt);
        else if (selectedMethod === 'EPS') openEpsStep(amt);
        else openMfsStep(selectedMethod, amt);
      };
    });

    document.getElementById('amQrBack').onclick = function () { showAmStep(2); };
    document.getElementById('amMfsBack').onclick = function () { showAmStep(2); };
    document.getElementById('amMfsClose').onclick = function () { exitGatewayToOrigin(false); };

    document.getElementById('amQrDlBtn').onclick = function () {
      var c = document.getElementById('amQrCanvas');
      if (!c) return;
      var a = document.createElement('a');
      a.href = c.toDataURL('image/png');
      a.download = 'Crazy_Top_Up_24_QR.png';
      a.click();
    };

    document.getElementById('amQrVerifyBtn').onclick = function () {
      var d = (document.getElementById('amQrDigits').value || '').replace(/\D/g, '');
      var err = document.getElementById('amQrErr');
      var ok = document.getElementById('amQrOk');
      if (d.length !== 4) {
        err.textContent = 'আপনার নম্বরের শেষ ৪টি সংখ্যা (4 digits) লিখুন।';
        err.style.display = 'block';
        return;
      }
      err.style.display = 'none'; ok.style.display = 'none';
      var btn = document.getElementById('amQrVerifyBtn');
      btn.disabled = true; btn.textContent = '...';
      var amt = Math.round(Number(amtInp.value)) || 50;
      var uniqueTrx = 'QR-' + d + '-' + Date.now().toString(36).slice(-4).toUpperCase();
      fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: getUserKey(),
          method: 'bKash (Bangla QR)',
          amountBdt: amt,
          senderNumber: 'Last4: ' + d,
          trxId: uniqueTrx
        })
      }).then(function (r) { return r.json().then(function (res) { return { ok: r.ok, data: res }; }); })
        .then(function (res) {
          if (!res.ok) { err.textContent = (res.data && res.data.error) || 'ভেরিফাই ব্যর্থ হয়েছে।'; err.style.display = 'block'; return; }
          applyServerPayload(res.data, true);
          document.getElementById('amQrDigits').value = '';
          ok.textContent = (res.data && res.data.autoApproved) ? ('✅ অটো-ভেরিফাই সফল! ৳' + amt + '.00 BDT সাথে সাথে ওয়ালেটে যোগ হয়েছে!') : ('✅ ৳' + amt + '.00 BDT ভেরিফাই রিকোয়েস্ট পাঠানো হয়েছে (' + uniqueTrx + ')!');
          ok.style.display = 'block';
        }).catch(function () {
          err.textContent = 'নেটওয়ার্ক সমস্যা — আবার চেষ্টা করুন।'; err.style.display = 'block';
        }).finally(function () { btn.disabled = false; btn.textContent = 'Verify'; });
    };

    document.getElementById('amMfsVerifyBtn').onclick = function () {
      var trx = (document.getElementById('amMfsTrxInp').value || '').trim().toUpperCase();
      var err = document.getElementById('amMfsErr');
      var ok = document.getElementById('amMfsOk');
      if (trx.length < 4) {
        err.textContent = 'সঠিক ট্রানজেকশন আইডি (Transaction ID) দিন।';
        err.style.display = 'block';
        return;
      }
      err.style.display = 'none'; ok.style.display = 'none';
      var btn = document.getElementById('amMfsVerifyBtn');
      btn.disabled = true; btn.textContent = 'ভেরিফাই হচ্ছে...';
      var amt = Math.round(Number(amtInp.value)) || 50;
      fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: getUserKey(),
          method: selectedMethod,
          amountBdt: amt,
          senderNumber: selectedMethod + ' MFS',
          trxId: trx
        })
      }).then(function (r) { return r.json().then(function (res) { return { ok: r.ok, data: res }; }); })
        .then(function (res) {
          if (!res.ok) { err.textContent = (res.data && res.data.error) || 'ভেরিফাই ব্যর্থ হয়েছে।'; err.style.display = 'block'; return; }
          applyServerPayload(res.data, true);
          document.getElementById('amMfsTrxInp').value = '';
          ok.textContent = (res.data && res.data.autoApproved) ? ('✅ অটো-ভেরিফাই সফল! ৳' + amt + ' (' + selectedMethod + ') TrxID ' + trx + ' সাথে সাথে ওয়ালেটে যোগ হয়েছে!') : ('✅ ৳' + amt + ' (' + selectedMethod + ') TrxID ' + trx + ' ভেরিফাইয়ের জন্য জমা হয়েছে!');
          ok.style.display = 'block';
        }).catch(function () {
          err.textContent = 'নেটওয়ার্ক সমস্যা — আবার চেষ্টা করুন।'; err.style.display = 'block';
        }).finally(function () { btn.disabled = false; btn.textContent = 'ভেরিফাই'; });
    };
  }

  function init() {
    setupOfflineIndicator();
    startJsMarqueeLoop();
    initGoogleAuthSession();
    initAddMoneyPage();
    initRecentOrdersSection();
    renderMyAccountRankView();
    if (!bannerTimerStarted) {
      bannerTimerStarted = true;
      setInterval(function () {
        if (promoBanners.length > 1 && location.hash === '#spin-checkout') {
          activeBannerIdx = (activeBannerIdx + 1) % promoBanners.length;
          renderCheckoutView();
        }
      }, 5000);
    }
    buildRootShell();
    injectSiteTriggers();
    setupProductHooks();
    hookAuthWatchers();
    window.addEventListener('hashchange', syncCheckoutRoute);
    syncCheckoutRoute();
    syncAllUI();
    fetchPublicFeed();
    syncSessionWithServer();
    setInterval(function () {
      if (apiAvailable !== false && isUserSignedIn() && location.hash === '#spin-checkout') {
        var uk = getUserKey();
        if (uk && uk !== '__default__') {
          fetch('/api/user/state?identifier=' + encodeURIComponent(uk))
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (data) { if (data) { applyServerPayload(data, true); renderCheckoutView(); } })
            .catch(function () {});
        }
      }
    }, 15000);

    window.SPIN_SYSTEM = {
      open: openModal,
      close: closeModal,
      getState: function () { return state; },
      isLoggedIn: isUserSignedIn,
      setLoggedIn: function (loggedIn) {
        forceLoggedIn = Boolean(loggedIn);
        if (forceLoggedIn) showAuthRequiredModal = false;
        syncAllUI();
        if (isModalOpen) renderModal();
      },
      grantSpinsAfterOrder: function (spinsCount, goldenCount) {
        state.spins += Number(spinsCount || 1);
        state.goldenSpins += Number(goldenCount || 1);
        saveState();
        syncAllUI();
      },
      showOrderSummary: showOrderSummary
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
