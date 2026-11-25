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
    { viewId: 'inView', name: 'Indonesia Server', pkGrid: 'inPkGrid', needEl: 'inNeed', buyBtn: 'inBuy', uidInp: 'inInp', poSel: '#inPo .po', balEl: 'inBal' },
    { viewId: 'gbView', name: 'Guild Glory Bot', pkGrid: 'gbPkGrid', needEl: 'gbNeed', buyBtn: 'gbBuy', uidInp: 'gbInp', poSel: '#gbPo .po', balEl: 'gbBal', isGuildId: true }
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
  var DEFAULT_SITE_SETTINGS = {
    siteName: 'Crazy_Top_Up (24)',
    logoUrl: 'Main logo.jpg',
    heroBanners: [
      { id: 'hb-1', imageUrl: 'Banner 1.jpg', alt: 'Banner 1', linkUrl: '', active: true },
      { id: 'hb-2', imageUrl: 'Banner 2.jpg', alt: 'Banner 2', linkUrl: '', active: true },
      { id: 'hb-3', imageUrl: 'Banner 3.jpg', alt: 'Banner 3', linkUrl: '', active: true }
    ],
    popupActive: true,
    popupImageUrl: 'Notification.jpg',
    popupText: 'সবথেকে কম দামে টপ করার জন্য সেরা ওয়েবসাইট\n১০০% বিশ্বস্ত ও দ্রুত ডেলিভারিতে\nঅর্ডার করুন নিশ্চিন্তে 🥰',
    telegramChannel: 'https://t.me/crazy_top_up_24',
    telegramGroup: 'https://t.me/crazy_top_up_24',
    youtubeChannel: '',
    helplineTitle: 'Telegram HelpLine',
    helplineHours: 'সকাল ৮টা থেকে রাত ১২টা',
    appDownloadMode: 'auto',
    appDownloadUrl: '',
    appStoreLabel: 'Google Play',
    footerNoticeTitle: 'নোটিশ:',
    footerNoticeText: 'যেকোনো অর্ডার-সংক্রান্ত সমস্যার জন্য Telegram-এ অর্ডারের স্ক্রিনশট এবং পেমেন্টের ট্রানজেকশন আইডি লিখে মেসেজ দিন।',
    footerAlertTitle: 'বিশেষ সতর্কতা:',
    footerAlertText: '১৮ বছরের নিচে অভিভাবকের অনুমতি ছাড়া অর্ডার করা সম্পূর্ণ নিষিদ্ধ।',
    productCards: [
      { id: 'ff-likes', title: 'FF Likes', imageUrl: 'FF LIKES.jpg' },
      { id: 'uid-topup', title: 'UID Topup (BD)', imageUrl: 'UID TOPUP (BD).jpg' },
      { id: 'weekly-monthly', title: 'Weekly/Monthly', imageUrl: 'WEEKLYMONTHLY.jpg' },
      { id: 'weekly-lite', title: 'Weekly Lite', imageUrl: 'WEEKLY LITE.jpg' },
      { id: 'level-up-pass', title: 'Level Up Pass', imageUrl: 'LEVEL UP PASS.jpg' },
      { id: 'indonesia-server', title: 'Indonesia Server', imageUrl: 'INDONESIA SERVER.jpg' },
      { id: 'guild-glory-bot', title: 'Guild Glory Bot', imageUrl: 'guild-glory-bot.png' },
      { id: 'uid-checker', title: 'UID Checker', imageUrl: 'uid checker.jpg' }
    ]
  };
  var siteSettings = Object.assign({}, DEFAULT_SITE_SETTINGS);
  var lastHeroBannerSig = '';

  function normalizeSiteUrl(raw, isTg) {
    var u = String(raw || '').trim();
    if (!u || u === '#') return '';
    if (isTg && u.charAt(0) === '@') return 'https://t.me/' + u.slice(1).trim();
    if (u.indexOf(' ') !== -1 && !/^https?:\/\//i.test(u)) return '';
    if (!/^https?:\/\//i.test(u) && !/^\//.test(u)) return 'https://' + u;
    return u;
  }

  function applySiteSettings() {
    var ss = Object.assign({}, DEFAULT_SITE_SETTINGS, siteSettings || {});
    siteSettings = ss;
    window.__SITE_SETTINGS__ = ss;

    if (typeof window.syncAccountLinks === 'function') window.syncAccountLinks();

    var nm = String(ss.siteName || 'Crazy_Top_Up (24)').trim();
    var logo = String(ss.logoUrl || '').trim();
    if (logo) {
      document.querySelectorAll('[data-site-logo], .am-gw-logo img, .eps-logo img, .ac2-f-brand img, .am-mfs-merchant img').forEach(function (imgEl) {
        if (imgEl && imgEl.getAttribute('src') !== logo) imgEl.src = logo;
        imgEl.alt = nm;
      });
    }

    document.querySelectorAll('.am-gw-brand h2, .am-mfs-merchant b, .eps-mname, .am-qr-rec, .ac2-f-brand span, .ac2-f-copy b, #amView .am-title span').forEach(function (el) {
      if (el) el.textContent = nm;
    });
    var acTag = document.querySelector('.ac2-f-tag');
    if (acTag) acTag.textContent = nm + ' | Trusted by Gamers, Loved by Everyone.';

    // Popup notification
    if (ss.popupActive === false && typeof window.__closeWelcomePop === 'function') {
      window.__closeWelcomePop();
    }
    var popImg = document.querySelector('#pop .pimg img');
    if (popImg && ss.popupImageUrl && popImg.getAttribute('src') !== ss.popupImageUrl) {
      popImg.src = ss.popupImageUrl;
    }

    // Hero Slider
    if (Array.isArray(ss.heroBanners)) {
      var sig = JSON.stringify(ss.heroBanners);
      if (sig !== lastHeroBannerSig) {
        lastHeroBannerSig = sig;
        if (typeof window.__rebuildHeroSlider === 'function') {
          window.__rebuildHeroSlider(ss.heroBanners);
        }
      }
    }

    // Footer Notice & Special Alert
    var fNotice = document.querySelector('#siteFooter .notes .note:not(.warn2)');
    if (fNotice) {
      var bEl = fNotice.querySelector('b');
      var pEl = fNotice.querySelector('p');
      if (bEl && ss.footerNoticeTitle) bEl.textContent = ss.footerNoticeTitle;
      if (pEl && ss.footerNoticeText) {
        var txt = String(ss.footerNoticeText);
        var m = /^(.*?)(\bTelegram\b)(.*)$/i.exec(txt);
        pEl.textContent = '';
        if (m) {
          pEl.appendChild(document.createTextNode(m[1]));
          var a = document.createElement('a');
          a.href = '#';
          a.setAttribute('data-link', 'telegram-channel');
          a.style.cssText = 'color:inherit;font-weight:700;text-decoration:none';
          a.textContent = m[2];
          pEl.appendChild(a);
          pEl.appendChild(document.createTextNode(m[3]));
        } else {
          pEl.textContent = txt;
        }
      }
    }
    var fAlert = document.querySelector('#siteFooter .notes .note.warn2');
    if (fAlert) {
      var ab = fAlert.querySelector('b');
      var ap = fAlert.querySelector('p');
      if (ab && ss.footerAlertTitle) ab.textContent = ss.footerAlertTitle;
      if (ap && ss.footerAlertText) ap.textContent = ss.footerAlertText;
    }

    var acNote = document.querySelector('.ac2-f-note');
    if (acNote && ss.footerNoticeText) {
      acNote.innerHTML = '<b>' + esc(ss.footerNoticeTitle || 'নোটিশ:') + '</b> ' + esc(ss.footerNoticeText);
    }

    // Contact Us HelpLine (Footer + Account Modal)
    var fHelpB = document.querySelector('#siteFooter a.help span b');
    if (fHelpB && ss.helplineTitle) {
      var vBadge = fHelpB.querySelector('.v-badge');
      fHelpB.textContent = ss.helplineTitle + ' ';
      if (vBadge) fHelpB.appendChild(vBadge);
    }
    var fHelpP = document.querySelector('#siteFooter a.help span p');
    if (fHelpP && ss.helplineHours) {
      var clkSvg = fHelpP.querySelector('svg');
      fHelpP.textContent = '';
      if (clkSvg) fHelpP.appendChild(clkSvg);
      fHelpP.appendChild(document.createTextNode(ss.helplineHours));
    }
    var acHelpB = document.querySelector('.ac2-tg-card b');
    if (acHelpB && ss.helplineTitle) {
      var chkI = acHelpB.querySelector('.ac2-tg-chk');
      acHelpB.textContent = ss.helplineTitle + ' ';
      if (chkI) acHelpB.appendChild(chkI);
    }
    var acHelpS = document.querySelector('.ac2-tg-card small');
    if (acHelpS && ss.helplineHours) acHelpS.textContent = ss.helplineHours;

    // App Download section in Footer + Promo Button
    var playBtn = document.querySelector('#siteFooter section.dl a.play');
    if (playBtn) {
      var playLbl = playBtn.querySelector('span b');
      if (playLbl && ss.appStoreLabel) playLbl.textContent = ss.appStoreLabel;
      var dlUrl = normalizeSiteUrl(ss.appDownloadUrl, false);
      if (dlUrl && (ss.appDownloadMode === 'play_store' || ss.appDownloadMode === 'direct_apk')) {
        playBtn.href = dlUrl;
        if (ss.appDownloadMode === 'direct_apk') {
          playBtn.setAttribute('download', '');
          playBtn.removeAttribute('target');
        } else {
          playBtn.removeAttribute('download');
          playBtn.target = '_blank';
          playBtn.rel = 'noopener noreferrer';
        }
      } else {
        playBtn.href = '#';
        playBtn.removeAttribute('target');
        playBtn.removeAttribute('download');
      }
      playBtn.onclick = handleMobileAppDownload;
    }
    var roApp = document.getElementById('roAppBtn');
    if (roApp) roApp.onclick = handleMobileAppDownload;
    var hdrPwa = document.getElementById('swHdrPwa');
    if (hdrPwa) hdrPwa.onclick = handleMobileAppDownload;

    // Game Product Cards
    if (Array.isArray(ss.productCards)) {
      ss.productCards.forEach(function (pc) {
        if (!pc || !pc.id) return;
        var card = document.querySelector('#homeView .grid a.card[data-open="' + pc.id + '"]');
        if (!card) return;
        var img = card.querySelector('.thumb img');
        var titleP = card.querySelector('p');
        if (img && pc.imageUrl) img.src = pc.imageUrl;
        if (img && pc.title) img.alt = pc.title;
        if (titleP && pc.title) titleP.textContent = pc.title;
      });
    }

    if (typeof window.syncAccountLinks === 'function') window.syncAccountLinks();
  }

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
  var deferredInstallPrompt = (typeof window !== 'undefined' && window.__crazyDeferredInstallPrompt) || null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredInstallPrompt = e;
    window.__crazyDeferredInstallPrompt = e;
    if (location.hash === '#spin-checkout') renderCheckoutView();
    injectSiteTriggers();
  });
  window.addEventListener('appinstalled', function () {
    deferredInstallPrompt = null;
    window.__crazyDeferredInstallPrompt = null;
    var pop = document.getElementById('crazyInstallPop');
    if (pop) pop.classList.add('hide');
  });
  function triggerExternalDownload(url, isDownload) {
    var a = document.createElement('a');
    a.href = url;
    if (isDownload) {
      a.setAttribute('download', '');
    } else {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  function triggerPwaInstall() {
    var promptObj = deferredInstallPrompt || (typeof window !== 'undefined' && window.__crazyDeferredInstallPrompt);
    if (promptObj && typeof promptObj.prompt === 'function') {
      promptObj.prompt();
      promptObj.userChoice.then(function (choice) {
        deferredInstallPrompt = null;
        window.__crazyDeferredInstallPrompt = null;
        if (choice && choice.outcome === 'accepted') {
          var pop = document.getElementById('crazyInstallPop');
          if (pop) pop.classList.add('hide');
        }
        if (location.hash === '#spin-checkout') renderCheckoutView();
      }).catch(function () {});
    } else {
      showSiteToast('অ্যাপ ইনস্টল করতে ব্রাউজার মেনু (⋮ / Share) থেকে "Install App" বা "Add to Home Screen" চাপুন।');
    }
  }
  function handleMobileAppDownload(ev) {
    var mode = (siteSettings && siteSettings.appDownloadMode) || 'auto';
    var url = normalizeSiteUrl(siteSettings && siteSettings.appDownloadUrl, false);
    if (mode === 'play_store' && url) {
      if (ev && ev.currentTarget && ev.currentTarget.tagName === 'A' && ev.currentTarget.getAttribute('href') === url) {
        return;
      }
      if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
      triggerExternalDownload(url, false);
      return;
    }
    if (mode === 'direct_apk' && url) {
      if (ev && ev.currentTarget && ev.currentTarget.tagName === 'A' && ev.currentTarget.getAttribute('href') === url) {
        return;
      }
      if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
      triggerExternalDownload(url, true);
      showSiteToast('অ্যাপ ডাউনলোড শুরু হয়েছে...');
      return;
    }
    if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
    if (url) {
      triggerExternalDownload(url, /\.apk(\?|$)/i.test(url));
      return;
    }
    var promptObj = deferredInstallPrompt || (typeof window !== 'undefined' && window.__crazyDeferredInstallPrompt);
    if (promptObj && typeof promptObj.prompt === 'function') {
      triggerPwaInstall();
    } else {
      triggerPwaInstall();
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
    if (gid === 'guild-glory-bot') {
      if (!/^[A-Za-z0-9-]+$/.test(uid) || uid.length < 5) {
        return { ok: false, error: 'সঠিক Guild ID দিন (ন্যূনতম ৫ অক্ষরের Guild ID)।' };
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
    if (data.siteSettings || (data.config && data.config.siteSettings)) {
      siteSettings = Object.assign({}, DEFAULT_SITE_SETTINGS, data.siteSettings || data.config.siteSettings);
      applySiteSettings();
    }
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
      syncOrdersAndTransactions();
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
      if (data.siteSettings || (data.config && data.config.siteSettings)) {
        siteSettings = Object.assign({}, DEFAULT_SITE_SETTINGS, data.siteSettings || data.config.siteSettings);
        applySiteSettings();
      }
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
    var isInstantMode = pendingProductOrder.payMode === 'instant';
    var readyToPay = !isInstantMode && curBal >= reqAmt;
    box.hidden = false;
    box.style.display = 'flex';
    box.innerHTML =
      '<div style="min-width:0;flex:1;">' +
        '<div style="font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.4px;color:' + (readyToPay ? '#15803d' : '#1558c0') + ';">' +
          (readyToPay ? '✅ ব্যালেন্স রেডি — অর্ডার সম্পন্ন করুন' : (isInstantMode ? '⚡ Instant Pay অর্ডার — নিচে পেমেন্ট মেথড বেছে নিন' : 'Wallet Pay অর্ডার পেন্ডিং')) +
        '</div>' +
        '<div style="font-size:13px;font-weight:800;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;">' +
          esc(pendingProductOrder.cfg.name) + ' · ' + esc(pendingProductOrder.pkgName) +
        '</div>' +
        '<div style="font-size:11px;color:#64748b;margin-top:2px;">UID: <b>' + esc(pendingProductOrder.uidVal) + '</b> · প্রয়োজন: <b>৳' + reqAmt + '</b>' + (isInstantMode ? '' : (' (ওয়ালেট: ৳' + curBal + ')')) + '</div>' +
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

  var secTransTimerId = null;
  function showSecurityTransition(opts, callback) {
    opts = opts || {};
    var ov = document.getElementById('amSecTransOv');
    if (!ov) {
      if (typeof callback === 'function') callback();
      return;
    }
    if (secTransTimerId) {
      clearTimeout(secTransTimerId);
      secTransTimerId = null;
    }
    var titleEl = document.getElementById('amSecTransTitle');
    var subEl = document.getElementById('amSecTransSub');
    var badgeEl = document.getElementById('amSecTransBadge');
    var progEl = document.getElementById('amSecTransProg');
    var cardEl = ov.querySelector('.am-sec-card');

    if (titleEl) titleEl.textContent = opts.title || 'নিরাপদ পেমেন্ট গেটওয়ে চালু হচ্ছে...';
    if (subEl) subEl.textContent = opts.subtitle || 'অনুগ্রহ করে অপেক্ষা করুন, এনক্রিপ্টেড কানেকশন যাচাই হচ্ছে।';
    if (badgeEl) {
      badgeEl.innerHTML = opts.badgeHtml || '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1565d8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/><polyline points="9 12 11 14 15 10"/></svg>';
    }
    var dur = Math.max(360, Number(opts.duration || 760));
    if (progEl) {
      progEl.style.animation = 'none';
      void progEl.offsetWidth;
      progEl.style.animation = 'amSecFill ' + (dur / 1000).toFixed(2) + 's cubic-bezier(0.22, 1, 0.36, 1) forwards';
    }
    if (cardEl) {
      cardEl.style.animation = 'none';
      void cardEl.offsetWidth;
      cardEl.style.animation = 'epsCardPop 0.28s cubic-bezier(0.2, 0.9, 0.3, 1)';
    }
    ov.style.display = 'flex';
    secTransTimerId = setTimeout(function () {
      secTransTimerId = null;
      ov.style.display = 'none';
      if (typeof callback === 'function') callback();
    }, dur);
  }

  function formatNowLabel() {
    try {
      var d = new Date();
      var pad = function (n) { return n < 10 ? '0' + n : String(n); };
      var hr = d.getHours();
      var ampm = hr >= 12 ? 'PM' : 'AM';
      hr = hr % 12 || 12;
      return pad(d.getDate()) + '-' + pad(d.getMonth() + 1) + '-' + d.getFullYear() + ' ' + pad(hr) + ':' + pad(d.getMinutes()) + ' ' + ampm;
    } catch (e) {
      return 'Just now';
    }
  }

  function submitProductOrderDirect(cfg, pkgName, uidVal, payMethod, pricing, usedOfferObj, triggerBtn, extraMeta) {
    extraMeta = extraMeta || {};
    var ordIdLocal = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    var ordObj = {
      id: ordIdLocal,
      gameName: cfg.name,
      packageLabel: pkgName,
      playerUid: uidVal,
      paymentMethod: payMethod,
      senderNumber: extraMeta.senderNumber || '',
      trxId: extraMeta.trxId || '',
      originalPrice: pricing.originalPrice,
      discountSaved: pricing.discountSaved,
      finalPrice: pricing.finalPrice,
      bonusPercent: pricing.bonusPercent,
      appliedOfferCode: usedOfferObj ? usedOfferObj.code : '',
      status: payMethod === 'Wallet Pay' ? 'Processing' : 'Pending',
      createdAt: formatNowLabel()
    };
    if (apiAvailable !== false && isUserSignedIn()) {
      var origBtnHtml = triggerBtn ? triggerBtn.innerHTML : '';
      if (triggerBtn) {
        triggerBtn.disabled = true;
        triggerBtn.classList.add('loading');
        triggerBtn.innerHTML = '<span class="am-btn-spin" aria-hidden="true"></span><span>অর্ডার প্রসেস হচ্ছে...</span>';
      }
      var startedAt = Date.now();
      apiPostJson('/api/orders', {
        identifier: getUserKey(),
        gameName: cfg.name,
        packageLabel: pkgName,
        playerUid: uidVal,
        paymentMethod: payMethod,
        senderNumber: extraMeta.senderNumber || undefined,
        trxId: extraMeta.trxId || undefined,
        originalPrice: pricing.originalPrice,
        appliedOfferId: usedOfferObj ? usedOfferObj.id : null
      }).then(function (data) {
        if (usedOfferObj) {
          usedOfferObj.used = true;
          state.activeOfferId = null;
        }
        var elapsed = Date.now() - startedAt;
        var extraWait = Math.max(320, 620 - elapsed);
        showSecurityTransition({
          title: 'অর্ডার কনফার্ম করা হচ্ছে...',
          subtitle: cfg.name + ' · ' + pkgName + ' (' + payMethod + ')',
          duration: extraWait
        }, function () {
          applyServerPayload(data, true);
          if (data.referralRewarded) showOfferToast('🤝 Referral Bonus: +1 Scratch Card & +1 Golden Spin!', '', 'scratcher');
          pendingProductOrder = null;
          amOpenedDirectlyToGateway = false;
          renderAmPendingCard();
          syncAllUI();
          showOrderSummary(data.order || ordObj);
        });
      }).catch(function (err) {
        if (payMethod === 'Wallet Pay' && err && /insufficient|পর্যাপ্ত ব্যালেন্স/i.test(String(err.message || ''))) {
          var needed = Math.max(20, pricing.finalPrice - Number(state.walletBalanceBdt || 0));
          showSecurityTransition({
            title: 'ওয়ালেট অ্যাড মানি চালু হচ্ছে...',
            subtitle: 'অর্ডারের জন্য আরও ৳' + needed + ' যোগ করতে হবে',
            duration: 680
          }, function () {
            openAddMoneyForOrder(needed, {
              cfg: cfg, pkgName: pkgName, uidVal: uidVal, pricing: pricing, usedOfferObj: usedOfferObj, payMode: 'wallet', returnHash: location.hash || ''
            }, 1);
          });
          return;
        }
        showOfferToast('❌ ' + ((err && err.message) || 'অর্ডার সাবমিট ব্যর্থ হয়েছে।'), '', '');
      }).finally(function () {
        if (triggerBtn) {
          triggerBtn.disabled = false;
          triggerBtn.classList.remove('loading');
          triggerBtn.innerHTML = origBtnHtml;
        }
      });
    } else {
      if (usedOfferObj) {
        usedOfferObj.used = true;
        state.activeOfferId = null;
      }
      if (payMethod === 'Wallet Pay') {
        state.walletBalanceBdt = Math.max(0, Number(state.walletBalanceBdt || 0) - Number(pricing.finalPrice || 0));
      }
      state.lifetimeSpendBdt = Number(state.lifetimeSpendBdt || 0) + Number(pricing.finalPrice || 0);
      state.spins += 1;
      state.goldenSpins += 1;
      state.orders = [ordObj].concat(state.orders || []).slice(0, 20);
      saveState();
      syncAllUI();
      showSecurityTransition({
        title: 'অর্ডার কনফার্ম করা হচ্ছে...',
        subtitle: cfg.name + ' · ' + pkgName,
        duration: 620
      }, function () {
        pendingProductOrder = null;
        amOpenedDirectlyToGateway = false;
        renderAmPendingCard();
        syncAllUI();
        showOrderSummary(ordObj);
      });
    }
  }

  function submitPendingProductOrder(btnEl, payMethodOverride, extraMeta) {
    if (!pendingProductOrder) return;
    var p = pendingProductOrder;
    submitProductOrderDirect(p.cfg, p.pkgName, p.uidVal, payMethodOverride || 'Wallet Pay', p.pricing, p.usedOfferObj, btnEl, extraMeta);
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
          var minIdLen = cfg.isGuildId ? 5 : 6;
          if (!activePk || uidVal.length < minIdLen) return;

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
            var origHtml1 = buyBtn.innerHTML;
            buyBtn.disabled = true;
            buyBtn.classList.add('loading');
            buyBtn.innerHTML = '<span class="am-btn-spin" aria-hidden="true"></span><span>ওয়ালেট খোলা হচ্ছে...</span>';
            showSecurityTransition({
              title: 'নিরাপদ অ্যাড মানি ওয়ালেট খুলছে...',
              subtitle: 'অর্ডারের জন্য আরও ৳' + neededAmt + ' যোগ করতে হবে',
              duration: 700
            }, function () {
              buyBtn.disabled = false;
              buyBtn.classList.remove('loading');
              buyBtn.innerHTML = origHtml1;
              openAddMoneyForOrder(neededAmt, {
                cfg: cfg,
                pkgName: pkgName,
                uidVal: uidVal,
                pricing: pricing,
                usedOfferObj: usedOfferObj,
                payMode: 'wallet',
                returnHash: location.hash || ''
              }, 1);
            });
            return;
          }

          if (payMethod === 'Instant Pay') {
            playClick();
            var origHtml2 = buyBtn.innerHTML;
            buyBtn.disabled = true;
            buyBtn.classList.add('loading');
            buyBtn.innerHTML = '<span class="am-btn-spin" aria-hidden="true"></span><span>গেটওয়ে চালু হচ্ছে...</span>';
            showSecurityTransition({
              title: 'নিরাপদ ইনস্ট্যান্ট পেমেন্ট চালু হচ্ছে...',
              subtitle: cfg.name + ' · ' + pkgName + ' (৳' + pricing.finalPrice + ')',
              duration: 700
            }, function () {
              buyBtn.disabled = false;
              buyBtn.classList.remove('loading');
              buyBtn.innerHTML = origHtml2;
              openAddMoneyForOrder(Math.max(20, pricing.finalPrice), {
                cfg: cfg,
                pkgName: pkgName,
                uidVal: uidVal,
                pricing: pricing,
                usedOfferObj: usedOfferObj,
                payMode: 'instant',
                returnHash: location.hash || ''
              }, 2);
            });
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
    },
    {
      id: 'guild-glory-bot',
      name: 'Guild Glory Bot',
      publisher: 'Special Product',
      currency: 'Glory Bot',
      uidLabel: 'Guild ID',
      uidPlaceholder: 'এখানে আপনার Guild ID লিখুন...',
      packages: [
        { id: 'gb-4', name: '4 Glory Bot', bonus: 'Auto Glory Squad', price: 145 },
        { id: 'gb-8', name: '8 Glory Bot', bonus: 'Auto Glory Squad', price: 290, popular: true },
        { id: 'gb-12', name: '12 Glory Bot', bonus: 'Auto Glory Squad', price: 430 },
        { id: 'gb-16', name: '16 Glory Bot', bonus: 'Auto Glory Squad', price: 560 }
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
    if (installAppBtn) installAppBtn.onclick = function (ev) { playClick(); handleMobileAppDownload(ev); };
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
      pwaBtn.onclick = function (ev) { playClick(); handleMobileAppDownload(ev); };
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
    injectInstallAppPopup();
  }
  function injectInstallAppPopup() {
    var isStandalone = false;
    try {
      isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    } catch (e) {}
    if (isStandalone) return;
    try {
      if (window.sessionStorage && window.sessionStorage.getItem('crazy_pwa_popup_dismissed_v1') === '1') return;
    } catch (e2) {}
    if (document.getElementById('crazyInstallPop')) return;
    var pop = document.createElement('div');
    pop.id = 'crazyInstallPop';
    pop.className = 'pwa-install-pop';
    pop.setAttribute('role', 'region');
    pop.setAttribute('aria-label', 'Install App');
    pop.innerHTML =
      '<div class="pwa-ip-ico" aria-hidden="true">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>' +
          '<polyline points="7 10 12 15 17 10"/>' +
          '<line x1="12" y1="15" x2="12" y2="3"/>' +
        '</svg>' +
      '</div>' +
      '<div class="pwa-ip-txt">' +
        '<b>Install App</b>' +
        '<small>Install the app for better experience!</small>' +
      '</div>' +
      '<button type="button" class="pwa-ip-btn" id="crazyInstallBtn">Install</button>' +
      '<button type="button" class="pwa-ip-close" id="crazyInstallClose" aria-label="Close">×</button>';
    document.body.appendChild(pop);
    var instBtn = document.getElementById('crazyInstallBtn');
    if (instBtn) {
      instBtn.onclick = function (ev) {
        playClick();
        handleMobileAppDownload(ev);
      };
    }
    var clsBtn = document.getElementById('crazyInstallClose');
    if (clsBtn) {
      clsBtn.onclick = function () {
        pop.classList.add('hide');
        try {
          if (window.sessionStorage) window.sessionStorage.setItem('crazy_pwa_popup_dismissed_v1', '1');
        } catch (e3) {}
      };
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

  function syncOrdersAndTransactions() {
    if (typeof window.renderOrders === 'function') {
      var mappedOrders = (state.orders || []).map(function (o) {
        var cleanId = String(o.id || '').replace(/^ORD-/, '');
        var pkgText = (o.gameName ? (o.gameName + ' — ') : '') + (o.packageLabel || 'Top-Up');
        if (o.paymentMethod) pkgText += ' (' + o.paymentMethod + (o.trxId ? ' · ' + o.trxId : '') + ')';
        return {
          id: cleanId || o.id || 'ORDER',
          status: o.status || 'Pending',
          date: o.createdAt || '',
          updated: o.updatedAt || o.createdAt || '',
          package: pkgText,
          price: Number(o.finalPrice != null ? o.finalPrice : (o.originalPrice || 0)),
          playerId: o.playerUid || ''
        };
      });
      window.renderOrders(mappedOrders);
    }
    if (typeof window.renderTransactions === 'function') {
      var mappedTx = (state.walletRequests || []).map(function (r) {
        return {
          number: (r.senderNumber || r.method || '') + (r.trxId ? ' (' + r.trxId + ')' : ''),
          amount: Number(r.amountBdt || 0),
          status: r.status || 'Pending'
        };
      });
      window.renderTransactions(mappedTx);
    }
  }

  window.__syncMyOrders = function () {
    syncOrdersAndTransactions();
    if (apiAvailable !== false && isUserSignedIn() && getUserKey() !== '__default__') {
      fetch('/api/user/state?identifier=' + encodeURIComponent(getUserKey()))
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
          if (data) { applyServerPayload(data, true); syncOrdersAndTransactions(); }
        })
        .catch(function () {});
    }
  };
  window.__syncMyTransactions = window.__syncMyOrders;

  function syncAllUI() {
    syncBadges();
    renderTickerDOM();
    syncAllProductViews();
    syncOrdersAndTransactions();
    renderMyAccountRankView();
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
    { level: 1, name: "Bronze", min: 0, max: 100, range: "0 - 100 Tk", sub: "Start your journey from Bronze.", grad: "radial-gradient(circle at 90% 88%, rgba(226, 152, 74, 0.56) 0%, rgba(196, 122, 52, 0.22) 38%, transparent 66%), radial-gradient(circle at 50% 20%, rgba(255, 206, 145, 0.14) 0%, transparent 46%), linear-gradient(148deg, #47250d 0%, #7a451c 52%, #b57034 100%)", fill: "#8c4a1b", rim: "#f2a86b", core: "#ffffff" },
    { level: 2, name: "Silver", min: 101, max: 1000, range: "101 - 1,000 Tk", sub: "Silver members unlock priority delivery.", grad: "linear-gradient(135deg,#334155 0%,#64748b 50%,#94a3b8 100%)", fill: "#64748b", rim: "#e2e8f0", core: "#f8fafc" },
    { level: 3, name: "Gold", min: 1001, max: 5000, range: "1,001 - 5,000 Tk", sub: "Gold tier boosts your spin luck and savings.", grad: "linear-gradient(135deg,#92400e 0%,#d97706 50%,#f59e0b 100%)", fill: "#d97706", rim: "#fde047", core: "#fef9c3" },
    { level: 4, name: "Platinum", min: 5001, max: 10000, range: "5,001 - 10,000 Tk", sub: "Platinum unlocks special top-up rates.", grad: "linear-gradient(135deg,#1e3a8a 0%,#0284c7 50%,#38bdf8 100%)", fill: "#1d4ed8", rim: "#7dd3fc", core: "#f0f9ff" },
    { level: 5, name: "Diamond", min: 10001, max: 25000, range: "10,001 - 25,000 Tk", sub: "Diamond members enjoy VIP discounts & perks.", grad: "linear-gradient(135deg,#4c1d95 0%,#7c3aed 50%,#a855f7 100%)", fill: "#7c3aed", rim: "#d8b4fe", core: "#faf5ff" },
    { level: 6, name: "Heroic", min: 25001, max: 50000, range: "25,001 - 50,000 Tk", sub: "Heroic champions get elite priority access.", grad: "linear-gradient(135deg,#7f1d1d 0%,#dc2626 50%,#ef4444 100%)", fill: "#dc2626", rim: "#fca5a5", core: "#fef2f2" },
    { level: 7, name: "Master", min: 50001, max: 100000, range: "50,001 - 100,000 Tk", sub: "Master rank commands top store privileges.", grad: "linear-gradient(135deg,#7c2d12 0%,#ea580c 50%,#f97316 100%)", fill: "#ea580c", rim: "#fdba74", core: "#fff7ed" },
    { level: 8, name: "Grand Master", min: 100001, max: null, range: "100,000+ Tk", sub: "Grand Master — supreme Crazy_Top_Up (24) legend!", grad: "linear-gradient(135deg,#78350f 0%,#dc2626 52%,#7e22ce 100%)", fill: "#b91c1c", rim: "#facc15", core: "#fef08a" }
  ];
  var RANK_ICON_URIS = {
    1: "data:image/png;base64,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" ,
    2: "data:image/png;base64,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" ,
    3: "data:image/png;base64,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" ,
    4: "data:image/png;base64,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" ,
    5: "data:image/png;base64,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" ,
    6: "data:image/png;base64,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" ,
    7: "data:image/png;base64,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" ,
    8: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAg90lEQVR42u27aYxlaXqQ+XzL2e9+b9zYIzIjszKzMquyqrrL1e225XYb2mAwm7EERmxGLVYJxGiE+AF4NIPQaEaWGRkzGiMBYjcgFhvjdrvbXe3GXZ1VlZWVVZVZlWvs242IG3e/Z/2++RFpS/zDyUx4pOlXOrq6P84533nOu33v+x74jnxHviPfkd8+Ef9PXejn/9HfxRSFqDQaLK29wKDXY9g7xHE0gP2eH/wR0CXR3b6jx+NemGVZZEzh5iYnKyyFlUipUVJhTIo1GVpKHOUaRzsTPwiTIChPujt3CjX3eVZXV8U/+Zm/w8s3buCXKgjHJy8MRZqAEPaVz3zh/zuA/vlP/Q2mk4GoNRdotGep1hviF778FfsT/+vfIxvuyzzpOfG46+dpvJZl2Rtpln8mK/LXrDXzhsIaK4QRGiFdlJSYIsUUiZUWoaSaaqXvacd9rJW65TjOu15U21c6yLygmr5z/9h2HnxdXLzyIl5Qstl0RN7fQflV+8rnf+S3F9De43ewFqG1Q5IJHn94S+xvb/LFP/zjaGmD05Ojajzt38jiwadNPl52NDellDetKUpQSK0FrqfRrof2QqQbIJTEpDHZZEg8jcnSgqLAWisNUp3kxt7OC/mJdqJNzyu/rZzwcXthdVgUeXrv9jepN1s0WrMWKbHGIISwK1c//dsDaPfRW4AVQijhhRXuvPUmN1/9rLuxvv5yt3vyhX7/5EaRx9+VTocrWTqMpChwHIXvOvi+Qxi4hKFPFIXUqhXK9Sba8xgP+px2Opz2BgyGE8ajmDjJyYwhLQSFUdZxooHjRQ9cN3iv3py9W280vhYF7rrnByYolTHGAMJmRthWkFO7+JnzA7Txya9R5Jnwq22qvuDWO3d46cYrqnuwvXy4u/O9W5ubP/7o4YNP7+3uhEk80nkWU+QJQlocV+O6Lr6ncR2FqwWRp5lrVlhdmqdcrbB/eMz65i6n/QnjSUqSGHIDmTFM05w0MwirUdonKlWzC2uX+teuv/jLqxcu/vOZueUPy82FwzwZ5Z6DIE/sJ+uHVEoBgH31c1/8LT2rfh5A9tmv5zgMxmPxAz/0x+0nt3/xhU/u3/1rH7777g/ubDyZPTrYU8edU6ZTg3bA8SDLLUkuQAi0BkcJPGWphjDf8Olu1IjCgKPeiPXdHsenGXFqQQisEMQ55MagpUVYyBKBdpTTP9ponRyu/+jm6tU3XnzplW9fvjL+6Rvf/QO3N979mk1kRCn0sNY+lwY9FyBpErA5WmlGo57befL1lcjJ/nA2Ovq9Tz5+f6Z3tE818nCrHt0sxvEUpZpDt58yGeYkxqIUuBpwIZUwHed0TyaMhymjOCGLc/LYgAErLXEC0wTCUDFT1QS6QFsIywFOmLL+0R3vaPf4hUsXFhZK/uXRo9vfwDrVp9Vq83S0vW6DIMKY4nwAZckUawr+zc/+hP2+3/1jF+LR8G/qfPD5+abTfOPVFU4PXWyccHrYx5kmlKsBtXYZbU8Z9nMKA1KCliAM5CkkmcaJ2jRadfKDPUwywZUQhQ6pgXiaIwpLI/K52A4p6QllD+aXWni1Cg82jxGex0JTRt2DzR876BWv1WaWf7ZUbvyrn/yf/0L81/+Xf4i15pwApRmmyClG9ymyuHWyv/3ZvSfvL8bDDqsLFV5/cZHu7gG3B+8zlpZmpGmUND1P4ivILWhX4GnQxuJISSkq88JLr3Lt5Rt8+Pavs7txBK6lXAuZpjDsjSgoKHmKZsmhBNQjWG27zK7NcuP1KwxTh87uA97/5TdrurL0yquf8a4trlxy/+kvfDR988v/QTyPkcnn8+wKITTX117G1U4Wj6fJRx/c563/8hYn3T2W19pcvb5Eq+ZS8Sxlz+I7BZ42BAoiJSg5UHIgcqEaCObqPpdXZ7l6fY3V5TbNkiZywREWh7PzfAWetHiywNcFUSAoh9CoOVx742Vmrlzkvfc/4sPb97G5GbmOs6uUm+mgJJqtWQLPPx8NGo0SAL77h/4ye0cnHdctPfXc0rUkTsRw2CWzI6p1h+UFn+mJoFwHvyTwXYGvQQqL54DngCOhGkE9yHAne5idj/CmHVoVg8kMcTzGphA6BaqAUEHoWSJXUq15lKse2i3ATBj1+vR7Ay5dupy/evPVL8/Nzv58cTCc3vnGLyGVplSpnQ+geqV0dvLip1HdN1PXDQfVat1Eoaey6Yjx8QGVckSr5tFvK6K6Qld8gkAReBBYQRhaXAWOA82KoOpnTE+esnf/iORkj2qUk6cQ55YslPiOZDiwBJ4hDKFacggjgdYGm6cc3r/Hx7e26B+PuPbyfDrTbL+3tHJp5+N3vkk4u0qcpM9lLs8FCGvxXJc//Ud+j/if/tpfQSsolSJCr0T/aMyTD57grbYpeZpaxaFUc3DrAeWK5OKFiEa1QjIZMRkOCQPJwlxAq+lgiwGDfh/FkJm6QALTVFKu1RA6YGuni1I51bKkPRNSCgxKZphpzM7OAZ+8u86wC0pqpZQuh7WWcqAIHMl4mhFqcT6AlJKA5R//3H+023ffDD3PaVZKoXRVyMlhl23/hIUgwBMGpQRhySNqBlRqkkajydryClvrGxxsj2jVNReWSlTrVaR2UdJg0oIoiHGdjMMjw0K7yuLKMr5X0OufMDPjM7/go8QUTELcH5MPMnQOngLflcLztZZKiVLo0Sr51APHzr/2+fMB5IYhYNm8+ys4btB0PGfV91whUAjjszh/mWq1yc76R4ynGfOhR1R2KUWKcX9Av7tLHo+olCyzbUGr7VJt1PBqbZzIIRtsMz5KcQODkDGBN4W8D0VKOfKZm6tTa2h63TGDXowiwHcatOoxwXEXqS2OJ62UgjDUuL7iOVKg/w4Tk2BMwea9X+LSp39Eo4SjXI2QmryQSFUhqF/AGUzIphMyNJ6jiVzFbueYUWeIqw2tFjRmJeWmS9CoES5cwGlViDs5jnNKUJYY2afX7bK1MeCkkzC30KBajpDKMhoL4iSk3lhmisMoPcAogesrHFcKIcF1DcoBIc8TkLAgwBY5YJFK4PpnO/KTbspbbz+g/cIVVr/3h8k/rFEUO5isIHQsvrLYwlCrCGbailo7pDRbxak0sNU5aNRQxR46L+GXBI1JynhwSjJNcCVUIo0UkukUDC3qi8u0l15h5/3HPN0fUQhNWPJSJU3PZuPCK4dCKWkFxfkBMoDFIoQCBFJJXN8jCEvEseSTB/u8dNDj6u95mRcrZYYP32Q82cB1JK2WgzSS+YUyjXlF1IzwZ1rIaA4TzoAuo8I6VCpYWeCUfKrNKkoZwiih0fQwxmE0Ffgz15i99l24ssZ4+phJnOOUPTxPd7HpRm/jnWLQ79G6+YeY7t46Rw1CgJAUJjuzOKXxA48odHGVIEsyeru7DA86tFfXCJyUo0dg3VNqM4ZGrcr8hTn8So4ODU6phaguYoIFhHJQwTymNE9RKIJ2iYVAkfRj1Mbu2aY1C3Bbq0QvvI7bWGDrW2/TWV+n5BrcUKOVzJQSibUGt1wHIFhYO8fNqhRYK2kuvwxS/GbdJPAErbok9wTJ8S7bt9+mXPsByqsvU0Vz3CuQapPmYo3G2hxOxVAUYwpdRbotVLhw5iuCRcg6iMylvBogE5/TJzvkW2PSVGKiJVovfQF/4Tqdp0+4e+tt9tY/oaRzXE8hhQVrgAKpK8/e6cw5mtizkNBYfgVr81FhzGmW5QS+YmWpxLSXI7Ixw4NN4oMdyq0mpYUbrN6UHD++zTQ/Isk1XqVOTspkrHHzgFBUEaLAyipW1imcDDeokQ0Eg+wEggUaiws0Xvwc/vxVekcDtu/eIxsOiHxJagpcLXC0DqXU1aC+IrKTfQtTzLj/vPHoeRLFAqxBJycCYzqe57/TmpnrttuzNvA1jjSUI0WoE0a7jxhsriPdMo0rbzBz/XtwW5eYxB6TkSQzIVaWQHiA8+zwsaqElSWy1GE8tuROg/aLn2X5jR+ivPoyZHDw0V32H35IqxYwN99AKYvnOoRBVNOOd9FvzGmKjM6ju2ysb4nNe98+p0RRumd0gxmh8rgblSr/l+NZexJV/sR4kJRMVjA/W6Y94zEZHyCO9whWX8Ipt6hdfBW/UWdy8oTR+BjfQhDWcfwqCHlWjBMBqAoFY4qpAOFSXW5Tal8hrC8jrSTvdzD9Q1Q+oNkMyeIIsSNQSuJqLbWUejoeuUSLdpKpPDfiuUpmzwUonkqE1CRxj0ePnyZf/J3XD44fdZzjwwMvnU6plzzm5xvMLtXoZxbpWCgKyAXKrRHOOOggIhlsIIsB2mmhdOmZQksgxJgyeT7EUS6lmRbCb6ODBaQMIZ0gZUGloliar9CsuAyHEQbJeDQmj0cZRVqM+6PrVjpdpf1Nzw0yyfR8AAWBCwgZepXy93z2Zp6lx9cmk5PP9I/3HIqEMAiI6hG6FpB1uohkABiEcjDWImQZr+KiHY90uE+cKtxU4zouQliM8SjyCCMaqKiOV10EVQHrAwqhLKYY4OkpjaZPOQpRnkduBdNhn25nK0xGJ5+p1GZ/9XDsXc1G8cWi6H1DSJJzATQcDBFCLdh8/Be0HPqNerLgiPEFTQoG4jgjk4YiUHTHXYoeVOY3CEyI9ss4fgDaQflzyFQyGY0RmYuDA9ZgCwdhy2jPRwYzoFtgBEWaYW1KOtin+/R9JidPqJYC3JJPjiTNLIVJGfcO5Xhw9IboHvzFSRJetCLsSe3dMXlxdD6ARhOU0muj/vFfKiY7kRlbxLSvtDIYIxgOEwbxGFnSVJsBuw/3ePzOr1Jb6NK+dJPq4hpCBaAkOpSEYop2ywgkWIEQAY7bRGmBcqoIIooiIel3yUYdjrbf48mdb1B1BsyvvIp0XdKiIE0tSisatQrK5rMPP77/Y4nTzFvza/+sEpXTJJmcTxSbJjlxZvLT/ijeWN9S24+fqml/iECRG0mSG9J8gnQzqi0HrQYMu48RxQmeZxAChJVgXZRbJSi3cfzK2XKEQqgA7dVx/DpKBVgrEFKiPY0rc3TcpZgeIrwY3dAYXZCmKRZLVPJoNutM44SHDx+rk6PjDWuKf3vl1c8Ofc85H0DKCXH88lM/qPx7xyuPDg969HtTfC/ACxyshtxkWDPCcSZUqwXtFtRqBY4bAzHWFs+AOKA9kBqLxCLPQr4MEMoHqc/SinQCxRib9QnEmOX5iNmFCO2kmGJCkqYIbQkjl95gzEHnlKjSpFJt/HqpXLnzz376J8yFi5fOx0m32vMsXrt5+Pjtr/79fLw7d9Bd/+HBMFVRuUy9VeLwYMRwmFCkI1wdM9NyiAcxew9vMR4VLN5wcZoKdIgQZ1CseFbMsgIrJEJYMAXWJIh8Snayxd6D2xxv3EFl6zTqGc16iLYjpllGVmRYKTBC8GRzh6gdsnT12v3mwsX/FJbbJ9/7O36Yn/u7f+t8NMiMHvAvvxTZ1SuXHrRn27+wcuFyzwsrZFbg+D5JLhkNE0w8QJoBpTDHd4Z0Nm6z/t6v0Ht8C3PyGNvbJD/dwcY9hEkR2LPDWsBi8jGTzhPSo0ek3cfsffQm2x/+KsV4i8if4KsRIuth8jFpkYFUSMfnpDemP0xGnh/+27XLV9+88OLNYrR3T1x+5bvOqSZdivjh/+FfIRvL6erSwq12xEd7T9Lv29jbEf1JyjSFLM6w0yEFXUya42gfRwzpdx6wd+9NZDxEBE0IapSXruC2XCwuWAk2QxCTDw/oPnwXOd6H7JRR5x6+7DI/M0voTcnjEVI5pCnEWcY0hTQDrxTihZVxbvigvHi9984v/iPRXLhsy2lyTpm0c5ZJ3/nKz/HGi0u9Ig73jXTMcJKo3mjKJD7rSDCdkhVDslGKtBbfsfTiUzpPbpP2T9ClFuHsCo4v0KUqIgzOllSMKcYHjPc+ZrT/IcPdeyTDffLhLq2mR+hZTDYmMymIMknik2SW036O4/S4MjPH0soF227P50II+/Bb/wGEROtzctLCFghb8G/+xz9OZqwtEEjHxfEDlONQGEGeGsw0Jx/lxMOMdJJhMosoCshPkfk+njiA+Am9gztMTjfAJgiRQnrCeP8+p5vv4NodykEXWexTClOiSJElCdNhTDJKSSYZRZojhEFKg8UQRCG1epWodNZ98X0fx3FwXPe8Sq5nLdz/49c/tpP+EdrzbFAuU65W8YIQayV5YrGxpUggmVgyaxgPLFkCYU3QbjlU2ppYToizfbL0BEt2Nm5ixuTTA0y8Qy0c4YcaVTgcHSZMpjnjUYLSGVJbhC7I0rPNs+cJymWfMHRRSpz1tQEh7G8e51MPUmeKl5sMhEU5iiD0cX2fwljyzGAyS5GeHVlsKLKC0dAyHUMSG4o8Q2IolyNKjTZOpfTsgQpwHPxahXqtjJ4cU8Rjsjihc5iiXYfAF/hOjlQg3Zwsy0gmOVlqUVrg+RolbRebn779L/4G2nVFEFVsel6JolACoQRpkWOERemzkqvUkjhJyHKDLcCkBpNY8tgSTw3TKUwmMOgZOp2Uk54gV3P4rSu4URtRWKyR4Jbxqov45SWmE4eDvREHO1MO9wzdrmEytiRTSzo1ZElBkeVQGLQE11W4nrZSFrsmmx69/rv+HFk6seHcNcLG8vlokHhWRUyLHIlFaIXneyhHkxcFRWGwBorMUGRQZGdalWdnkLqnBh1myIrEW5nBd5fIYoUZDfEqDiYHTBlVucDEfMzhbsbhXsFwAMqFJLFoQGvwzvoGaAW+J/A8dVZV1BRIU1gPgmpbANYtz5yTD3pmy0WWIzAoCa7v4noOCMFZzndmVkVmyVODzXM8dTb4NJ4Y+oME/3RCfWKpGZ9hb0IaZ7S8MtNulyIZEwY1EuvRPUkYDS1KCnzHIoyhSM+uZXJ75qB/Yx36rJ2tNUIpK2QuMWb4zPn0zgeQlb9Res2xwoIE5ShcT+N6EscBQUGR5xS5pUgMWmS0mwqMZTDKSeIJp8cdmgd7zHVPcJ02wo0QWNLhgNHBOkNzwtHOFsPRFMcRrLY8Wi2NLzOKtKBAkacFRhf4nqVcFviBRCmBlM/K5dUFbOfub3TMz69xCGAKAersv5QWrQWeczZep5TEcR2kcc78kc2pl32i0Od0mNEf5Yz7J+zc/4BaZZ75V79AeX4G4Wh8VdA/3mHr4dvsb9wHmbO4GDDX9vFcw2QcE2cGpEagcV2N74sz5+1rtJZCSFERWoWn67+CwgryI5v09s/JSYsCIQq0sEhhEBgsOUobfF/iakGSwjRx8KIKUSUCITAmo1pVXFqrcWmtSqUMne3H3P32r7K38THWxAg7ReV9kt42x7sPSCenzM9GXL5cp1qR5NmUPM+QWuGGJZRbJk0Vk4mhKASOq1HaIJRYUa678JWf+kEQ1g6PHpPE/fMBZK3BWoNWILAYk1MUKa6GVs2nXNZs7Y546/Yp3VFEa3GVWruJVRZrY6pluLBa5uaNGRYXNCedh3z4zV9k7/ZXSXc+Yv+Tt3ny0S2KpMPliyHXrtSo1wTCTkjjBIOg1KhTX5hnmPl8+/YxT9f7+IHCDxVG5FhSZcn1H/1pKOyEwiQYm55T26c4a/tIV2Jzg8kziizBcwXt2TLNGZcnj8e89d4p1vF47aUKUVQiEgmaKTAhDBTlcogfCPjklO31d7n7SzErq5dYf3Cfg92nXLvkcv1qgzCwDE57GJMRRR7kLqPU42TfsL7T5b27R4QVzaXL88zM1pFKYCgobH4WTEyOMfn5DXFaY56pn0NuBaYoKIqMIPCYX2pxsBRxcDTmuJ/yrdsHdE+7XLvgsjQXUKkEaC8lS8dYm9Jo+Fx/sYoRfba37rC38QmYhKVFhysv1KiUYTIekBc5blBBeiGdw5Q7DwY83e9y2i8wtuDmp9a4efNlwrpPPwVjoSjO1lkUBmPMs+HycwH0zD61g8gkxliKwhCVS6xcWubkeJ+nO30O+wl7Bwm9bsL2luL1VyLe+FSTerlMlnSZxkN8P2dmpsR1p4L1+3QO+yzNh9y4XKERFcTJkLwoCEoNcltjazPl7Q/6fPhgTKd/NmA+M6toztZYWFlG+4ppZ0BRCIpCPAMkKIzAmnMaoBLPBvQdqSgQYCBJUiajU1wyVi9f4Mphxu7BU0aDhMkYxuMCpUeUKg5eUKNeicCmZNkU15HMLdVwWj69wYRWTdMMLenpkCzPMNYnTSXH/YQPHw756MGY0+HZW/I9weJSleW1OYJKRK/fZzLN8HyNFM6zoOIgcM6qlecD6L+agkECWZLy6OETkt4R1y6t8fKNy2w+OSafdDG5RUtD98Twzrs9siTlxrUKjUqEFgKrNDr0mF1q0NISMe5ie8cIx0E4Pt2TjKebx2ztWZ7uFAhZ0GpKpqkhjDxefnmZlaUW/e4Jjx6vM85cluoK1/HOBr60h6MdjDknQPJZJh2nKdYalJY4ruLoaMr99zbIRoK1pSYvXZ2hVdJMRhNOT8Yc7udsbxRMhmO2NgyvvRzx4rUarhtgwhZucx7lC9L9HDOMEa5gFKc8fhJz5/2E3UNLBlSqgkbLQypFVA1pVgTbjx9y2O3SOR1Qm78EFtSzqSktFUpIhDyn3fxvfPcQxynKFmgBnuuCdTncj3mkt2mVFItzFSq+YW87wUw1zlzAYJRzfBRzejJBWYHWglnj0p6r4kTzIFKUN2VKSuewy/rjMY+fphzsWyYx1FqSWkXjSMHy8gwXLs2Q5BM+vPsxx70h5WYdR2mKLCfPzqJYnmZoz/xm9P1/HVBRnAGSjsAaS1YYsswS+JKFxYi5hQauHzEd9Djp9tndG5JMNGsXZ5DasL1zxGQ0pdebcvvdKSvDKa8tXKR0uYR0QNgJ3f0d7rxzxNaTCfFEML/scyFw8SPNYJTQ6STUmoIwqiBzQaVexq9UKDebBGFEluUk6Vnek6QZKjv7OuB88qBn9ynXPKZDRZIaxpOEaj3ks997ldX5eaaDmAd3H7G7dUxnN0cWkgsXc6680GTtUsTRYYe97R6jQcbR7pTjh0e0l4f47QbdrSmP3ztm4/6U0cSwvFrh2rUlytUaW1sn3Lq9yckg5/7jAwon5/LVeV59/XX8ckSnO+RoYEjzgvxZmM+LguI8w3z+LFwaHAojyQsh8kISlCp4nqEfxzx6ssMHj44ZdAtKQZla5NObDNnvGC6utrj56irLC3UefHzI8cmIzXu7NOofU1lYYOPOJg/eP2J0ali5XOW7vnuV+cU2+3sTBuMpRkImBSfjgid7YzL3CKdeZ7XWwitpmExIc0uan5lUmhvcwmKKc/JBhdU4bkDQuCmOnn7NZIVMJlPDfmdM53CX0XDEdKRsZf7FvD7vUA209uVITPvbPFw/IMunvP7aJa5cv4xQZW7desD+3inRnQ+JHq2zs3HKcJwwu1DiU6+vsnpxhv3DHh/c3+bgOCaolWjKOq2lK8XS6kLROXqsv3HroVzeHzE3t0AuAnLrkBt19kLRGBQF5wQoSSWFMXztX/9t/PLM4GDv4Mn6Zje/fWdLJUnCyvKV4uKVS/cCr/4rruNz0tn5/duP33/BrWWUdYnh+IT33nvMa28ELF2d42hwxP7OHt3eMZ3OMcOhZfFymZdeXmFxscrG+i4PHh+BLtNYaNLPAtovXe0tX7r5y7Pzsx/v7l/67Pr6w89tHuxWdju7zMwucbkZjbUTjb9bQlSZF6Vq26ZJfE7zQamDg8tHHzzgxhvWm6ZOczRRUrlzrCzMHl+/fuNbi0uLPxX4pTvSCf38nrdjpfpS1RlfEpMt/3T7HmmR8nRzj9mswqXrs6xcrNI7GjAcTln2XdrzdcoVn+3DPZ6unzBKXIJqlWZzlfn62m6l/cK/qM6s/uzsbGO/3GqtVJrLf2xzY/1Hjw721pRbdZQqb9rC3fvf/uXPEFUWaC1ceq6vDp/PSQuP3GgWVl8hSQsrdXQ0t/TCXrW5dFQpV39ubm7+59szrfWdzXXj+9lwYeXiP1lZbN9Tee/3dra8P2Itc+Ug5eR4l48ebPHS9VXWVlZZWhFkRYHWMOj1ePh4g73DAVLXKc3Ok6lmEcxcfrJ29ZW/F9WW/vXm4eRYHhwws7jwULrVnwyi5q/PL5z+PiHka6VK8x2pw+5hek/Mnt601WpBrzt67qT4tyR33voqWCuElNQac7J3ejRvTP4pKdRJuVS+e3y4OXEdTbkxb72gQn/vvvjgQNjPX1az3aPdPzHo7v+p0enmi+lwW45O90hHfa6szXLj09dwyxHHmzt88M6HrO/0KM+u4leXKXSrqLUvfnNm/sLPrF668pWtx49GjeYCKqjaOI3F6UmHmQuv2XRw1EySdBGhTrV29pJ4VFTqZWbmq0xGiZ2/8KnfWpP0eQD9+S/9ybPmhtIUJrONmbnhlRuvP5xburD94XvfyrKsEEp7NktjgnIL4lNKDMTc6kvjcrV6d5SYndzqtTCK5lylZP90gDFnAwjbW4dsPtlnf79PJupcePFztn3xUyeqvPStqLn0v7/yxu/4pYff/lpMPhXNZs16UZn+KCOMKuLkYFv85y9/efKjf+rPHzz+6K1BmsQWoYinCSedvr362vedjwbdvfV1XvnMF/jkg1tCCIEFsiQRQgjrhxFZlpFOJxRpTMuPLWlPbG+t01x6QdjBgWXmRU9ko+/Px50vDY83v9g/flLJpocMekccHp4grUulOkdj4Uq+cvX1e83FtX+c6fJXjVt91F1/Jy3X5sTweM++sLpMOLPKx08O0a7LXHuRyWTEeDxBuRGO53Gw9RDPjwDs69//u88HEMCj+7cBIYw1uF6AyXMq1QZpGpOmCY7jWGMsK2vX2Lj7FZJJX0jtIbXD6cG6mFu6oopkuHZyvP9n93Ye/ZnTg09qjphgDBwdx5SqK+bqjdffXFy5+JNhufpridCTJE44PNgliEpWSUGeTO3rX/xxAPYefoC1VgRBCaRiOI4pzuoydu3a9ed9zOf9FAFeuP5p4L8tsRhPJqQZhFoSeh6t9gX77q99q/gDf/FvPuy99Qv/IGyYEtr/g54at33Pp7as+oUtfd2rrfz99urNN++9/e/y9vJLInRdPEfa484+Ugq++KN/9TfvsXDl5n/zes5Fg36r0nn0TeIkE816ic7OPt/6+i1efO0y7SufU8Pu1mI67vxQng6/JISe9YPqv7Mi+j/daP6JOXovL7fXCByLqwuUczZXFa794Lms+9wAAWSd99COFltPNrj97n1Wr1xktPNtXvjsH7JgvNOTw6YxOOVqu7d64/sHgN25+1UhhMLTOYFrsWDLL/wuviPfke/Id+T/D/J/A/MTUWZITObPAAAAAElFTkSuQmCC"
  };
  var BRONZE_WHITE_SILHOUETTE_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAACqUlEQVRo3u2Zv08UQRiGn7k7ToInIuBFxCDERkz8ERsLCjprKtR/QBIqLW38A4wxFiZaUhg0JmhjKaEwRi3EAtDESCCY47iI5lA4hFv2tUAJhsiumeG4xHm7TXZ2nv3me2e/bxa8vLx2Vib6FkGSVjpIc5h9sZ+cZ2FjjhKfKLJIaOyBBFku000babLUxQb6zPeNOX5QIM8MH3nKXKwobANk1K2CXGhVBV0V2na+RAymWtIRT4mnFFnORcU4DlCAZZQ3pUcqasY4QCuVdFkcIBE6WbINl9gBiSleU3YCs8w4y9YvJHRarxy4LNBjtVq7zADMMOZgqZZ4wKyJ8Ecipj+SDjwmim6SOkYqurNQgiqTB/JAHmgnv2PxgeRgHxKGjDWQkAGaaXcQnzp6yVq/mYyO6ZFWnBSxJd1UnWyiLNSpIUc4kpRTn2plAVSve1pRKHf6oLOySOq9tJN26rQjNNi4LGCewEmJ/1slVm1zaMThkgW6qyYrpymhPi05QxrVGdtGMWSYN866jlEm7HfqSa4z5QTna3T/EqfIF+O8dAKU5zlOivzQwhl/Rmi2ur72ieju5T+vh0JCDxRREWWqC6iRtuoCSlLrXeaBPJAH8kBVDiSXQKoEceofD1SWydFEQ8zWUZQpsEYrSSDBN/KuIiTWCHhHPxe4Ri72mEEucok7v/5wLDLvKkKTDFFigBcETBDQz0lqIsYscp8bTAOT5OlhPzknTbnQHh1Vh+pltH6d1AkNamHbHnVBt9dHCBmldEAtalFGO2MVoRb1a+yvLfZbXdFBmYr6V0bn9UzlLVBfNKAupUTFtxQZdeqJyptgQk2rV43ri8suIKHjeqglSaFClTWiHtXsCswmpEO6pTkVVdSwTtmeIBsXUDTTRQbxnjECg5eXVzXrJzJbZOQsYuk+AAAAAElFTkSuQmCC";
  function rankShieldSvg(r, sz, isJourneyCurrent) {
    var lvl = r && r.level ? Number(r.level) : 1;
    if (lvl < 1 || lvl > 8 || !RANK_ICON_URIS[lvl]) lvl = 1;
    var sizePx = Number(sz) || 34;
    var src = (isJourneyCurrent && lvl === 1) ? BRONZE_WHITE_SILHOUETTE_URI : RANK_ICON_URIS[lvl];
    var extra = isJourneyCurrent
      ? "width:" + sizePx + "px;height:" + sizePx + "px;display:block;object-fit:contain;flex-shrink:0;pointer-events:none;user-select:none;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.2));"
      : "width:" + sizePx + "px;height:" + sizePx + "px;display:block;object-fit:contain;flex-shrink:0;pointer-events:none;user-select:none;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.22));";
    return "<img src=\"" + src + "\" width=\"" + sizePx + "\" height=\"" + sizePx + "\" alt=\"\" decoding=\"async\" style=\"" + extra + "\" />";
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
      appBtn.onclick = handleMobileAppDownload;
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
    if (chipShield) chipShield.innerHTML = rankShieldSvg(cur, 26);
    var chipTitle = document.getElementById("acChipTitle");
    if (chipTitle) chipTitle.textContent = cur.name + " Member";
    var chipSub = document.getElementById("acChipSub");
    if (chipSub) chipSub.textContent = "Level " + cur.level + " / Current Rank";

    var rh = document.getElementById("acRankHero");
    if (rh) rh.style.background = cur.grad;
    var hs = document.getElementById("acHeroShield");
    if (hs) hs.innerHTML = rankShieldSvg(cur, 62, false);
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
    if (hdot) hdot.style.left = pct <= 3 ? "0px" : ("calc(" + Math.min(96, pct) + "% - 5px)");
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
        var chkIco = "<svg width=\"11\" height=\"11\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:-1px;margin-right:2px;\"><polyline points=\"20 6 9 17 4 12\"/></svg>";
        var lockIco = "<svg width=\"11\" height=\"11\" viewBox=\"0 0 24 24\" fill=\"currentColor\" style=\"vertical-align:-1px;margin-right:2px;\"><path d=\"M18 8h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6z\"/></svg>";
        var badgeTxt = isCur ? (chkIco + "Current") : (isUnl ? (chkIco + "Unlocked") : (lockIco + "Locked"));
        return "<div class=\"ac2-j-item" + (isCur ? " is-cur" : "") + "\">" +
          "<div class=\"ac2-j-left\">" +
            "<div class=\"ac2-j-badge\">" + rankShieldSvg(r, isCur ? 26 : 36, isCur) + "</div>" +
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

    function triggerAmStepAnim(el) {
      if (!el || el.hidden) return;
      el.classList.remove('am-step-enter');
      void el.offsetWidth;
      el.classList.add('am-step-enter');
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
      if (!isGw) {
        triggerAmStepAnim(step1);
        renderAmPendingCard();
      } else {
        var pCard = document.getElementById('amPendingCard');
        if (pCard) { pCard.hidden = true; pCard.style.display = 'none'; }
        if (mode === 2) triggerAmStepAnim(step2);
        else if (mode === 'qr') triggerAmStepAnim(step3Qr);
        else if (mode === 'mfs') triggerAmStepAnim(step3Mfs);
        else if (mode === 'eps') triggerAmStepAnim(step3Eps);
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
          if (epsChannel && typeof startEpsConnecting === "function") {
            if (epsPickTimer) clearTimeout(epsPickTimer);
            epsPickTimer = setTimeout(function () {
              epsPickTimer = null;
              startEpsConnecting();
            }, 220);
          }
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
      var epsPickTimer = null;
      var epsEasyLang = "en";
      function getEpsChannelLogoHtml(ch) {
        var list = (EPS_CHANNELS.WALLET || []).concat(EPS_CHANNELS.BANK || []);
        for (var i = 0; i < list.length; i++) {
          if (list[i].id === ch && typeof list[i].render === "function") {
            return list[i].render(true);
          }
        }
        return "<b style=\"font-size:13px;color:#006a4e;\">" + esc(ch) + "</b>";
      }

      function startEpsConnecting() {
        var err = document.getElementById("epsErr");
        if (!epsChannel) {
          err.textContent = "দয়া করে আগে একটি ওয়ালেট বা ব্যাংক সিলেক্ট করুন।";
          err.style.display = "block";
          return;
        }
        if (epsPickTimer) { clearTimeout(epsPickTimer); epsPickTimer = null; }
        err.style.display = "none";
        var amt = Math.round(Number(amtInp.value)) || 50;
        var chLbl = epsChannel === "নগদ" ? "Nagad" : epsChannel;
        var connOv = document.getElementById("epsConnOv");
        var connLogo = document.getElementById("epsConnLogo");
        connLogo.innerHTML = getEpsChannelLogoHtml(epsChannel);
        document.getElementById("epsConnTitle").textContent = "Connecting to " + chLbl;
        var connCard = connOv ? connOv.querySelector(".eps-conn-card") : null;
        var connBar = connOv ? connOv.querySelector(".eps-conn-prog div") : null;
        if (connCard) {
          connCard.style.animation = "none";
          void connCard.offsetWidth;
          connCard.style.animation = "epsCardPop 0.28s cubic-bezier(0.2, 0.9, 0.3, 1)";
        }
        if (connBar) {
          connBar.style.animation = "none";
          void connBar.offsetWidth;
          connBar.style.animation = "epsBarFill 1.55s cubic-bezier(0.22, 1, 0.36, 1) forwards";
        }
        connOv.style.display = "flex";
        if (epsConnTimer) clearTimeout(epsConnTimer);
        epsConnTimer = setTimeout(function () {
          connOv.style.display = "none";
          var easyCard = document.getElementById("epsEasyCard");
          easyCard.style.background = getEasyBg(epsChannel);
          easyCard.style.animation = "none";
          void easyCard.offsetWidth;
          easyCard.style.animation = "epsCardPop 0.28s cubic-bezier(0.2, 0.9, 0.3, 1)";
          document.getElementById("epsEasyInv").textContent = "261120" + String(Date.now()).slice(-6) + "TW";
          document.getElementById("epsEasyAmt").textContent = "BDT " + amt + ".00";
          document.getElementById("epsEasyPhoneStep").style.display = "block";
          document.getElementById("epsEasyTrxStep").style.display = "none";
          document.getElementById("epsEasyErr").style.display = "none";
          buildEpsSegInputs();
          updateEasyTexts();
          document.getElementById("epsEasyFoot").innerHTML = epsChannel === "নগদ"
            ? "<svg width=\"26\" height=\"26\" viewBox=\"0 0 40 40\"><circle cx=\"20\" cy=\"20\" r=\"16\" fill=\"#ffffff\"/><path d=\"M12 24c3-7 9-12 16-11-3 2-5 5-5 8 2-2 4-3 6-3-2 4-6 8-12 9-2 0-4-1-5-3Z\" fill=\"#dc2626\"/></svg><div style=\"text-align:left;line-height:1;\"><div style=\"font-size:16px;font-weight:900;color:#ffffff;\">নগদ</div><div style=\"font-size:5.5px;color:rgba(255,255,255,0.85);\">ডাক বিভাগের ডিজিটাল লেনদেন</div></div>"
            : "<div style=\"text-align:center;line-height:1.15;\"><div style=\"font-size:15px;font-weight:900;color:#ffffff;\">" + esc(epsChannel) + "</div><div style=\"font-size:7px;letter-spacing:0.06em;color:rgba(255,255,255,0.82);text-transform:uppercase;\">Easy Payment System</div></div>";
          document.getElementById("epsEasyOv").style.display = "flex";
        }, 1600);
      }
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
      function submitGatewayPayment(gwOpts) {
        var btn = gwOpts.btn;
        var origLabel = gwOpts.origLabel;
        var err = gwOpts.errEl;
        var ok = gwOpts.okEl;
        var method = gwOpts.method;
        var amt = gwOpts.amountBdt;
        var sender = gwOpts.senderNumber;
        var trx = gwOpts.trxId;
        var epsOv = document.getElementById("epsEasyOv");

        if (pendingProductOrder && pendingProductOrder.payMode === 'instant') {
          var p = pendingProductOrder;
          var fallbackOrd = {
            id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
            gameName: p.cfg.name,
            packageLabel: p.pkgName,
            playerUid: p.uidVal,
            paymentMethod: method,
            senderNumber: sender,
            trxId: trx,
            originalPrice: p.pricing.originalPrice,
            discountSaved: p.pricing.discountSaved,
            finalPrice: p.pricing.finalPrice,
            bonusPercent: p.pricing.bonusPercent,
            appliedOfferCode: p.usedOfferObj ? p.usedOfferObj.code : '',
            status: 'Pending',
            createdAt: formatNowLabel()
          };
          if (apiAvailable !== false && isUserSignedIn()) {
            fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                identifier: getUserKey(),
                gameName: p.cfg.name,
                packageLabel: p.pkgName,
                playerUid: p.uidVal,
                paymentMethod: method,
                senderNumber: sender,
                trxId: trx,
                originalPrice: p.pricing.originalPrice,
                appliedOfferId: p.usedOfferObj ? p.usedOfferObj.id : null
              })
            }).then(function (r) { return r.json().then(function (res) { return { ok: r.ok, data: res }; }); })
              .then(function (res) {
                if (!res.ok) {
                  err.textContent = (res.data && res.data.error) || 'অর্ডার সাবমিট ব্যর্থ হয়েছে।';
                  err.style.display = 'block';
                  return;
                }
                if (p.usedOfferObj) { p.usedOfferObj.used = true; state.activeOfferId = null; }
                applyServerPayload(res.data, true);
                if (gwOpts.onResetInput) gwOpts.onResetInput();
                var createdOrd = res.data.order || fallbackOrd;
                pendingProductOrder = null;
                amOpenedDirectlyToGateway = false;
                renderAmPendingCard();
                syncAllUI();
                ok.textContent = '✅ অর্ডার সফল! Order #' + createdOrd.id + ' (' + method + ') — My Orders-এ যুক্ত হয়েছে।';
                ok.style.display = 'block';
                setTimeout(function () {
                  if (epsOv) epsOv.style.display = 'none';
                  showAmStep(1);
                  showOrderSummary(createdOrd);
                }, 420);
              }).catch(function () {
                err.textContent = 'নেটওয়ার্ক সমস্যা — আবার চেষ্টা করুন।';
                err.style.display = 'block';
              }).finally(function () {
                btn.disabled = false;
                btn.textContent = origLabel;
              });
          } else {
            if (p.usedOfferObj) { p.usedOfferObj.used = true; state.activeOfferId = null; }
            state.spins += 1;
            state.goldenSpins += 1;
            state.lifetimeSpendBdt = Number(state.lifetimeSpendBdt || 0) + Number(p.pricing.finalPrice || 0);
            state.orders = [fallbackOrd].concat(state.orders || []).slice(0, 20);
            saveState();
            if (gwOpts.onResetInput) gwOpts.onResetInput();
            pendingProductOrder = null;
            amOpenedDirectlyToGateway = false;
            renderAmPendingCard();
            syncAllUI();
            ok.textContent = '✅ অর্ডার সফল! Order #' + fallbackOrd.id + ' — My Orders-এ যুক্ত হয়েছে।';
            ok.style.display = 'block';
            btn.disabled = false;
            btn.textContent = origLabel;
            setTimeout(function () {
              if (epsOv) epsOv.style.display = 'none';
              showAmStep(1);
              showOrderSummary(fallbackOrd);
            }, 420);
          }
          return;
        }

        fetch('/api/wallet/deposit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: getUserKey(),
            method: method,
            amountBdt: amt,
            senderNumber: sender,
            trxId: trx
          })
        }).then(function (r) { return r.json().then(function (res) { return { ok: r.ok, data: res }; }); })
          .then(function (res) {
            if (!res.ok) {
              err.textContent = (res.data && res.data.error) || 'ভেরিফাই ব্যর্থ হয়েছে।';
              err.style.display = 'block';
              return;
            }
            applyServerPayload(res.data, true);
            syncAllUI();
            if (gwOpts.onResetInput) gwOpts.onResetInput();
            var isAuto = Boolean(res.data && res.data.autoApproved);
            ok.textContent = isAuto
              ? ('✅ অটো-ভেরিফাই সফল! ' + method + ' ৳' + amt + '.00 সাথে সাথে ওয়ালেটে যোগ হয়েছে!')
              : ('✅ ' + method + ' ৳' + amt + '.00 TrxID ' + trx + ' ভেরিফাইয়ের জন্য জমা হয়েছে!');
            ok.style.display = 'block';
            if (isAuto && pendingProductOrder && Number(state.walletBalanceBdt || 0) >= Number(pendingProductOrder.pricing.finalPrice || 0)) {
              setTimeout(function () {
                if (epsOv) epsOv.style.display = 'none';
                submitPendingProductOrder(null);
              }, 450);
            }
          }).catch(function () {
            err.textContent = 'নেটওয়ার্ক সমস্যা — আবার চেষ্টা করুন।';
            err.style.display = 'block';
          }).finally(function () {
            btn.disabled = false;
            btn.textContent = origLabel;
          });
      }

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
        submitGatewayPayment({
          btn: btn,
          origLabel: "Confirm",
          errEl: err,
          okEl: ok,
          method: "EPS (" + epsChannel + ")",
          amountBdt: amt,
          senderNumber: sender || ("EPS " + epsChannel),
          trxId: trx,
          onResetInput: function () { document.getElementById("epsEasyTrxInp").value = ""; }
        });
      };
      document.getElementById("epsPayBtn").onclick = function () {
        startEpsConnecting();
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
        submitGatewayPayment({
          btn: btn,
          origLabel: "Verify",
          errEl: err,
          okEl: ok,
          method: "EPS (" + epsChannel + ")",
          amountBdt: amt,
          senderNumber: "EPS " + epsChannel,
          trxId: trx,
          onResetInput: function () { document.getElementById("epsTrxInp").value = ""; }
        });
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

      var nextBtn = document.getElementById('amNextBtn');
      var origNextHtml = nextBtn ? nextBtn.innerHTML : '';
      if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.classList.add('loading');
        nextBtn.innerHTML = '<span class="am-btn-spin" aria-hidden="true"></span><span>নিরাপদ গেটওয়ে প্রস্তুত হচ্ছে...</span>';
      }
      showSecurityTransition({
        title: 'নিরাপদ পেমেন্ট গেটওয়ে চালু হচ্ছে...',
        subtitle: '৳' + amt + ' Add Money করার জন্য পেমেন্ট মেথড লোড হচ্ছে',
        duration: 820
      }, function () {
        if (nextBtn) {
          nextBtn.disabled = false;
          nextBtn.classList.remove('loading');
          nextBtn.innerHTML = origNextHtml;
        }
        showAmStep(2);
      });
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
        view.querySelectorAll('.am-gw-card').forEach(function (x) { x.classList.remove('picking'); });
        btn.classList.add('picking');
        var methodLbl = selectedMethod === 'EPS' ? 'PAY WITH ≡EPS' : selectedMethod;
        showSecurityTransition({
          title: methodLbl + ' গেটওয়ে চালু হচ্ছে...',
          subtitle: '৳' + amt + '.00 নিরাপদ পেমেন্ট স্ক্রিন খোলা হচ্ছে',
          badgeHtml: btn.innerHTML,
          duration: 540
        }, function () {
          btn.classList.remove('picking');
          if (selectedMethod === 'bKash') openQrStep(amt);
          else if (selectedMethod === 'EPS') openEpsStep(amt);
          else openMfsStep(selectedMethod, amt);
        });
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
      submitGatewayPayment({
        btn: btn,
        origLabel: 'Verify',
        errEl: err,
        okEl: ok,
        method: 'bKash (Bangla QR)',
        amountBdt: amt,
        senderNumber: 'Last4: ' + d,
        trxId: uniqueTrx,
        onResetInput: function () { document.getElementById('amQrDigits').value = ''; }
      });
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
      submitGatewayPayment({
        btn: btn,
        origLabel: 'ভেরিফাই',
        errEl: err,
        okEl: ok,
        method: selectedMethod,
        amountBdt: amt,
        senderNumber: selectedMethod + ' MFS',
        trxId: trx,
        onResetInput: function () { document.getElementById('amMfsTrxInp').value = ''; }
      });
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
