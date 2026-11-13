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
    { viewId: 'ffView', name: 'FF Likes', pkGrid: 'pkGrid', needEl: 'needAmt', buyBtn: 'buyBtn', uidInp: 'uid', poSel: '#ffView .po' },
    { viewId: 'uidView', name: 'UID Topup (BD)', pkGrid: 'uidPkGrid', needEl: 'uidNeed', buyBtn: 'uidBuy', uidInp: 'uidInp', poSel: '#uidPo .po' },
    { viewId: 'wmView', name: 'Weekly/Monthly', pkGrid: 'wmPkGrid', needEl: 'wmNeed', buyBtn: 'wmBuy', uidInp: 'wmInp', poSel: '#wmPo .po' },
    { viewId: 'wlView', name: 'Weekly Lite', pkGrid: 'wlPkGrid', needEl: 'wlNeed', buyBtn: 'wlBuy', uidInp: 'wlInp', poSel: '#wlPo .po' },
    { viewId: 'luView', name: 'Level Up Pass', pkGrid: 'luPkGrid', needEl: 'luNeed', buyBtn: 'luBuy', uidInp: 'luInp', poSel: '#luPo .po' },
    { viewId: 'inView', name: 'Indonesia Server', pkGrid: 'inPkGrid', needEl: 'inNeed', buyBtn: 'inBuy', uidInp: 'inInp', poSel: '#inPo .po' }
  ];

  /* -------------------- State -------------------- */
  function defaultState() {
    return {
      spins: 1,
      goldenSpins: 0,
      scratchers: 0,
      vipMultiplier: 1,
      boxes: [],
      offers: [],
      activeOfferId: null,
      spinHistory: [],
      soundEnabled: true
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
    if (celeb.high) fireCelebration(celeb.jackpot);

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
      var offer = {
        id: 'off-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
        title: wedge.title,
        description: wedge.description,
        rewardType: wedge.rewardType,
        value: wedge.value,
        code: generateCode(isGolden ? 'GOLD' : 'SPIN'),
        source: sourceLabel,
        used: false
      };
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
      offer = { id: 'off-' + Date.now(), title: '70% Legendary Box Discount', description: 'Massive 70% off your next game top-up!', rewardType: 'percent_discount', value: 70, code: generateCode('LEGD'), source: 'Legendary Box', used: false };
    } else if (target.tier === 'Epic Box') {
      offer = { id: 'off-' + Date.now(), title: '৳250 Epic Cash Voucher', description: 'Flat ৳250 discount on any top-up order!', rewardType: 'flat_discount', value: 250, code: generateCode('EPIC'), source: 'Epic Box', used: false };
    } else {
      offer = { id: 'off-' + Date.now(), title: '+35% Rare Box Bonus', description: 'Get 35% extra diamonds / coins on checkout!', rewardType: 'bonus_percent', value: 35, code: generateCode('RARE'), source: 'Rare Box', used: false };
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
    if (state.scratchers <= 0) return;
    state.scratchers = Math.max(0, state.scratchers - 1);
    var offer = {
      id: 'off-' + Date.now(),
      title: reward.title,
      description: reward.description,
      rewardType: reward.rewardType,
      value: reward.value,
      code: generateCode('SCR'),
      source: 'Scratch Card',
      used: false
    };
    state.offers.unshift(offer);
    state.activeOfferId = offer.id;
    markOfferRecent(offer.id);
    saveState();

    playRewardCue(reward.value >= 45 ? 'epic' : 'rare');
    if (reward.value >= 30) fireCelebration(reward.value >= 45);
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
    var eligible = !isSpinning && spinsLeft > 0;

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
      '<g id="swSpinHub" class="sw-hub-btn' + (eligible ? ' eligible' : '') + '" role="button" tabindex="0" aria-label="Spin the wheel">' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="58" fill="url(#swHubChrome)" stroke="#0f172a" stroke-width="2.5"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="49" fill="#18181b" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="46" fill="url(#swSpinBg)"/>' +
        '<ellipse cx="' + cx + '" cy="' + (cy - 18) + '" rx="28" ry="13" fill="rgba(255,255,255,0.14)"/>' +
        '<text x="' + cx + '" y="' + (cy + 2) + '" text-anchor="middle" dominant-baseline="middle" fill="url(#swSpinGold)" font-size="24" font-weight="900" font-family="Montserrat, sans-serif" letter-spacing="0.04em" filter="url(#swTextShadow)">SPIN</text>' +
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

  function startSpinWheel(isGolden) {
    if (isSpinning) return;
    var spinsLeft = isGolden ? state.goldenSpins : state.spins;
    if (spinsLeft <= 0) {
      playClick();
      showNoSpinsModal = true;
      renderModal();
      return;
    }

    var wedges = isGolden ? GOLDEN_WHEEL_WEDGES : REGULAR_WHEEL_WEDGES;
    if (isGolden) state.goldenSpins = Math.max(0, state.goldenSpins - 1);
    else state.spins = Math.max(0, state.spins - 1);
    saveState();

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
    var winIdx = pickWeightedIndex(wedges);
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
        handleWheelWin(wonWedge, isGolden);
        renderModal();
      }
    }
    requestAnimationFrame(step);
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
    var activeOffers = state.offers.filter(function (o) { return !o.used; });
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
      if (state.scratchers > 0 || scratchState.revealed) {
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
            return '<div class="sw-offer-card' + (isNew ? ' pulse' : (isApp ? ' applied' : '')) + '">' +
              '<div class="sw-offer-meta">' +
                '<div class="sw-offer-name">' + esc(o.title) + (isNew ? ' <span style="color:#fcd34d;font-size:10px;">NEW</span>' : '') + '</div>' +
                '<div class="sw-offer-code-row"><span class="sw-code-txt sw-font-mono">' + esc(o.code) + '</span><span>·</span><span>' + esc(o.source) + '</span></div>' +
              '</div>' +
              '<button type="button" class="sw-copy-btn' + (isApp ? ' applied' : '') + '" data-offer-id="' + esc(o.id) + '">' + (isApp ? '✓ Applied' : 'Apply Code') + '</button>' +
            '</div>';
          }).join('') + '</div>';

      stageHTML = '<div class="sw-vault">' +
        '<div><div class="sw-vault-head"><div class="sw-vault-title">Mystery Boxes (' + unopenedBoxes.length + ')</div><span class="sw-vault-sub">Open boxes to unlock offers</span></div>' + boxesHTML + '</div>' +
        '<div><div class="sw-vault-head"><div class="sw-vault-title white">Offers (' + activeOffers.length + ')</div><span class="sw-vault-sub">Apply code to Top-Up checkout</span></div>' + offersHTML + '</div>' +
      '</div>';
    }

    var overlaysHTML = '';
    if (winResult) {
      var actBtn = '';
      if (winResult.wonOffer) actBtn = '<button type="button" class="sw-btn-gold" id="swWinUseBtn">Apply to Top-Up →</button>';
      else if (winResult.wonBox) actBtn = '<button type="button" class="sw-btn-gold" id="swWinBoxBtn">Open in Boxes</button>';
      else if (winResult.isScratcher) actBtn = '<button type="button" class="sw-btn-gold" id="swWinScratchBtn">Scratch Card Now →</button>';
      overlaysHTML += '<div class="sw-overlay"><div class="sw-overlay-card">' +
        '<div style="font-size:28px;margin-bottom:4px;">✨</div>' +
        '<div class="sw-win-kicker">Congratulations! You Won</div>' +
        '<div class="sw-win-title">' + esc(winResult.wedge.title) + '</div>' +
        '<div class="sw-win-desc">' + esc(winResult.wedge.description) + '</div>' +
        '<div class="sw-overlay-actions row">' + actBtn + '<button type="button" class="sw-btn-slate" id="swWinKeepBtn">Keep Spinning</button></div>' +
      '</div></div>';
    } else if (openedBoxReward) {
      overlaysHTML += '<div class="sw-overlay"><div class="sw-overlay-card emerald">' +
        '<div style="font-size:30px;margin-bottom:4px;">✅</div>' +
        '<div class="sw-win-kicker" style="color:#6ee7b7;">Mystery Box Unlocked!</div>' +
        '<div class="sw-win-title">' + esc(openedBoxReward.title) + '</div>' +
        '<div class="sw-win-desc">' + esc(openedBoxReward.description) + '</div>' +
        '<div class="sw-overlay-actions row"><button type="button" class="sw-btn-gold" id="swBoxUseBtn" style="background:#10b981;">Use on Top-Up</button><button type="button" class="sw-btn-slate" id="swBoxSaveBtn">Save</button></div>' +
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
    } else if (showNoSpinsModal) {
      overlaysHTML += '<div class="sw-overlay"><div class="sw-overlay-card">' +
        '<div style="font-size:28px;margin-bottom:4px;">🔄</div>' +
        '<div class="sw-win-title" style="font-size:24px;">NEED MORE SPINS?</div>' +
        '<div class="sw-win-desc">Claim free bonus spins right now, or complete a Top-Up order to earn <b style="color:#fcd34d;">+1 Spin &amp; +1 Golden Spin</b>!</div>' +
        '<div class="sw-overlay-actions">' +
          '<button type="button" class="sw-btn-gold" id="swClaimSpinsBtn">Claim +2 Free Spins &amp; +1 Golden</button>' +
          '<button type="button" class="sw-btn-slate" id="swGoBuyBtn">Order Top-Up Package</button>' +
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
        winResult = null;
        showHistoryPanel = false;
        showNoSpinsModal = false;
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

    var getSpinsBtn = document.getElementById('swGetSpinsBtn');
    if (getSpinsBtn) getSpinsBtn.onclick = function () {
      playClick();
      showNoSpinsModal = true;
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
        renderModal();
      };
    });

    var winUse = document.getElementById('swWinUseBtn');
    if (winUse) winUse.onclick = function () {
      if (winResult && winResult.wonOffer) state.activeOfferId = winResult.wonOffer.id;
      saveState();
      winResult = null;
      closeModal();
      syncAllUI();
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
    };
    var boxSave = document.getElementById('swBoxSaveBtn');
    if (boxSave) boxSave.onclick = function () { openedBoxReward = null; renderModal(); };

    var chx = document.getElementById('swCloseHistX');
    if (chx) chx.onclick = function () { showHistoryPanel = false; renderModal(); };
    var chb = document.getElementById('swCloseHistBtn');
    if (chb) chb.onclick = function () { showHistoryPanel = false; renderModal(); };

    var claimBtn = document.getElementById('swClaimSpinsBtn');
    if (claimBtn) claimBtn.onclick = function () {
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
      location.hash = 'uid-topup';
    };

    clearInterval(arrowIntervalId);
    if ((activeTab === 'spin' || activeTab === 'golden') && showTapArrow && !isSpinning) {
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
    if (tab) activeTab = tab;
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
          '<div class="sw-summary-kicker">Order Completed</div>' +
          '<div class="sw-summary-title">Transaction Summary</div>' +
          '<div class="sw-summary-sub">' + esc(oid) + ' · ' + esc(formatTime()) + '</div>' +
        '</div>' +
        '<div class="sw-summary-box">' +
          '<div class="sw-summary-row"><span class="k">Package</span><span class="v">' + esc(order.gameName || 'Top-Up') + ' · ' + esc(order.packageLabel || '') + esc(bonusTxt) + '</span></div>' +
          '<div class="sw-summary-row"><span class="k">Player UID</span><span class="v uid sw-font-mono">' + esc(order.playerUid || '-') + '</span></div>' +
          '<div class="sw-summary-row"><span class="k">Payment</span><span class="v">' + esc(order.paymentMethod || 'Wallet Pay') + '</span></div>' +
        '</div>' +
        '<div class="sw-price-box">' +
          '<div class="sw-price-row"><span>Original Price</span><span class="sw-font-mono" style="font-weight:700;color:#fff;">৳' + orig + '</span></div>' +
          '<div class="sw-price-row disc"><span>Discount Applied' + (order.appliedOfferCode ? '<span class="sw-code-pill">' + esc(order.appliedOfferCode) + '</span>' : '') + '</span><span class="sw-font-mono">' + (saved > 0 ? ('-৳' + saved) : '৳0') + '</span></div>' +
          '<div class="sw-price-final"><span class="lbl">Final Price Paid</span><span class="amt sw-font-mono">৳' + fin + '</span></div>' +
        '</div>' +
        '<div class="sw-summary-bonus">Bonus Earned: +1 Spin &amp; +1 Golden Spin added to your account!</div>' +
        '<div class="sw-summary-btns">' +
          '<button type="button" class="sw-btn-gold" id="swSumSpinBtn">Spin &amp; Win Now</button>' +
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
    var unused = state.offers.filter(function (o) { return !o.used; });
    if (!unused.length) return null;
    for (var i = 0; i < unused.length; i++) {
      if (unused[i].id === state.activeOfferId) return unused[i];
    }
    return null;
  }

  function computePricing(basePrice) {
    var offer = getActiveOffer();
    if (!offer || !basePrice) {
      return { originalPrice: basePrice, discountSaved: 0, finalPrice: basePrice, bonusPercent: 0, offer: null };
    }
    if (offer.rewardType === 'percent_discount') {
      var saved = Math.round((basePrice * offer.value) / 100);
      var fin = Math.max(1, basePrice - saved);
      return { originalPrice: basePrice, discountSaved: basePrice - fin, finalPrice: fin, bonusPercent: 0, offer: offer };
    }
    if (offer.rewardType === 'flat_discount') {
      var finFlat = Math.max(1, basePrice - offer.value);
      return { originalPrice: basePrice, discountSaved: basePrice - finFlat, finalPrice: finFlat, bonusPercent: 0, offer: offer };
    }
    return { originalPrice: basePrice, discountSaved: 0, finalPrice: basePrice, bonusPercent: offer.value, offer: offer };
  }

  function updateProductOfferStrip(cfg) {
    var strip = document.getElementById('swOfferStrip_' + cfg.viewId);
    if (!strip) return;
    var activeBtn = document.querySelector('#' + cfg.pkGrid + ' .pk.on');
    var rawPrice = activeBtn ? Number(activeBtn.getAttribute('data-price') || 0) : 0;
    var pricing = computePricing(rawPrice);
    var unusedOffers = state.offers.filter(function (o) { return !o.used; });

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

  function syncAllProductViews() {
    PRODUCT_VIEWS.forEach(updateProductOfferStrip);
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
          if (txt === 'login') return;
          var activePk = document.querySelector('#' + cfg.pkGrid + ' .pk.on');
          var uidInput = document.getElementById(cfg.uidInp);
          var uidVal = uidInput ? uidInput.value.trim() : '';
          if (!activePk || uidVal.length < 6) return;

          var pkgName = activePk.getAttribute('data-name') || 'Top-Up Package';
          var basePrice = Number(activePk.getAttribute('data-price') || 0);
          var activePay = document.querySelector(cfg.poSel + '.on');
          var payMethod = activePay ? (activePay.getAttribute('data-pay') || 'Wallet Pay') : 'Wallet Pay';
          var pricing = computePricing(basePrice);

          if (pricing.offer) {
            pricing.offer.used = true;
            state.activeOfferId = null;
          }
          state.spins += 1;
          state.goldenSpins += 1;
          saveState();
          syncAllUI();

          showOrderSummary({
            gameName: cfg.name,
            packageLabel: pkgName,
            playerUid: uidVal,
            paymentMethod: payMethod,
            originalPrice: pricing.originalPrice,
            discountSaved: pricing.discountSaved,
            finalPrice: pricing.finalPrice,
            bonusPercent: pricing.bonusPercent,
            appliedOfferCode: pricing.offer ? pricing.offer.code : ''
          });
        });
      }
    });
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
  }

  function syncBadges() {
    var total = getTotalBadgeCount();
    var hb = document.getElementById('swHdrBadge');
    if (hb) {
      hb.textContent = String(total);
      hb.style.display = total > 0 ? 'inline-flex' : 'none';
    }
    var sub = document.getElementById('swHomeSub');
    if (sub) {
      var unusedOffers = state.offers.filter(function (o) { return !o.used; }).length;
      sub.textContent = total > 0
        ? ('আপনার ' + state.spins + ' স্পিন' + (state.goldenSpins ? ', ' + state.goldenSpins + ' গোল্ডেন' : '') + ' ও ' + unusedOffers + 'টি অফার রয়েছে')
        : 'অর্ডার করে ফ্রি স্পিন জিতুন এবং ৯০% পর্যন্ত ছাড় পান!';
    }
  }

  function syncAllUI() {
    syncBadges();
    syncAllProductViews();
  }

  /* -------------------- Init -------------------- */
  function init() {
    buildRootShell();
    injectSiteTriggers();
    setupProductHooks();
    syncAllUI();

    window.SPIN_SYSTEM = {
      open: openModal,
      close: closeModal,
      getState: function () { return state; },
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
