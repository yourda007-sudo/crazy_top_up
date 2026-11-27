// Crazy_top_up (24) — Full-Stack Server (Spin Lock, Wallet, TrxID Orders, Promo Codes, Flash Sale, VIP Tiers, Leaderboard, Telegram Alerts)
try { require('dotenv').config(); } catch (e) {}
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var express = require('express');

var app = express();
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

var DB_PATH = path.join(__dirname, 'spin-db.json');

var REGULAR_WEDGES = [
  { id: 'w-50-off', title: '50% Instant Top-Up Discount', description: 'Half price on your next game top-up package.', rewardType: 'percent_discount', value: 50, line1: '50% OFF', weight: 6 },
  { id: 'w-15-off', title: '15% Top-Up Discount', description: 'Save 15% on any game package at checkout.', rewardType: 'percent_discount', value: 15, line1: '15% OFF', weight: 14 },
  { id: 'w-20-bonus', title: '+20% Extra Diamonds / Coins', description: 'Receive 20% extra in-game currency on your next top-up.', rewardType: 'bonus_percent', value: 20, line1: '+20% Bonus', weight: 12 },
  { id: 'w-200-off', title: '৳200 Flat Cash Discount', description: 'Instant ৳200 off any top-up order.', rewardType: 'flat_discount', value: 200, line1: '৳200 OFF', weight: 7 },
  { id: 'w-10-off', title: '10% Instant Discount', description: 'Enjoy 10% off your next top-up checkout.', rewardType: 'percent_discount', value: 10, line1: '10% OFF', weight: 16 },
  { id: 'w-epic-box', title: 'Epic Mystery Box', description: 'Open in Boxes vault for a high-value discount or bonus offer!', rewardType: 'mystery_box', value: 2, line1: 'Epic Box', weight: 7 },
  { id: 'w-scratcher', title: 'Bonus Scratch Offer Card', description: 'Reveals a hidden top-up promo code in the Scratch tab!', rewardType: 'scratcher', value: 1, line1: 'Scratcher', weight: 10 },
  { id: 'w-25-off', title: '25% Flash Discount', description: 'Quarter off your next diamond, UC, or coin bundle.', rewardType: 'percent_discount', value: 25, line1: '25% OFF', weight: 10 },
  { id: 'w-rare-box', title: 'Rare Mystery Box', description: 'Crack it open in the Boxes tab for a surprise top-up deal!', rewardType: 'mystery_box', value: 1, line1: 'Rare Box', weight: 9 },
  { id: 'w-100-off', title: '৳100 Top-Up Voucher', description: 'Instant ৳100 price reduction on any package.', rewardType: 'flat_discount', value: 100, line1: '৳100 Voucher', weight: 9 },
  { id: 'w-75-jackpot', title: '75% JACKPOT Top-Up Deal', description: 'Mega jackpot discount — 75% off your selected top-up!', rewardType: 'percent_discount', value: 75, line1: '75% OFF', weight: 3 },
  { id: 'w-5-off', title: '5% Instant Discount', description: 'Quick 5% savings on your next top-up.', rewardType: 'percent_discount', value: 5, line1: '5% OFF', weight: 18 },
  { id: 'w-35-bonus', title: '+35% Bonus Top-Up', description: 'Get 35% extra bonus currency delivered with your order.', rewardType: 'bonus_percent', value: 35, line1: '+35% Bonus', weight: 8 },
  { id: 'w-50-flat', title: '৳50 Instant Discount', description: 'Flat ৳50 off any top-up package.', rewardType: 'flat_discount', value: 50, line1: '৳50 OFF', weight: 14 }
];

var GOLDEN_WEDGES = [
  { id: 'g-80-off', title: '80% Golden VIP Discount', description: 'Massive 80% off any top-up package!', rewardType: 'percent_discount', value: 80, line1: '80% OFF', weight: 6 },
  { id: 'g-30-off', title: '30% Golden Discount', description: 'Instant 30% discount at checkout.', rewardType: 'percent_discount', value: 30, line1: '30% OFF', weight: 14 },
  { id: 'g-50-bonus', title: '+50% Bonus Credits', description: '50% extra Diamonds / Coins on your order.', rewardType: 'bonus_percent', value: 50, line1: '+50% Bonus', weight: 12 },
  { id: 'g-500-off', title: '৳500 Golden Voucher', description: 'Flat ৳500 off any major top-up bundle.', rewardType: 'flat_discount', value: 500, line1: '৳500 OFF', weight: 7 },
  { id: 'g-25-off', title: '25% VIP Discount', description: '25% off any game top-up.', rewardType: 'percent_discount', value: 25, line1: '25% OFF', weight: 15 },
  { id: 'g-legend-box', title: 'Legendary Mystery Box', description: 'Guaranteed high-tier voucher inside!', rewardType: 'mystery_box', value: 3, line1: 'Legend Box', weight: 8 },
  { id: 'g-2x-scratch', title: '2x Bonus Scratch Cards', description: 'Unlocks two Golden Scratch offer cards!', rewardType: 'scratcher', value: 2, line1: '2x Scratch', weight: 10 },
  { id: 'g-40-off', title: '40% Super Saver', description: '40% off your next top-up checkout.', rewardType: 'percent_discount', value: 40, line1: '40% OFF', weight: 10 },
  { id: 'g-epic-box', title: 'Epic Mystery Box', description: 'Open in Boxes vault for a premium offer!', rewardType: 'mystery_box', value: 2, line1: 'Epic Box', weight: 10 },
  { id: 'g-300-off', title: '৳300 Golden Cashback', description: 'Flat ৳300 discount applied instantly.', rewardType: 'flat_discount', value: 300, line1: '৳300 Voucher', weight: 9 },
  { id: 'g-90-jackpot', title: '90% MEGA JACKPOT', description: 'Pay only 10% for your next top-up package!', rewardType: 'percent_discount', value: 90, line1: '90% JACKPOT', weight: 3 },
  { id: 'g-20-off', title: '20% Instant Discount', description: 'Save 20% on any order.', rewardType: 'percent_discount', value: 20, line1: '20% OFF', weight: 16 },
  { id: 'g-100-bonus', title: '2X Double Top-Up Bonus', description: 'Double your diamonds / top-up bonus on one order!', rewardType: 'bonus_percent', value: 100, line1: '2X Bonus', weight: 5 },
  { id: 'g-150-off', title: '৳150 Instant Off', description: 'Flat ৳150 discount on your top-up.', rewardType: 'flat_discount', value: 150, line1: '৳150 OFF', weight: 12 }
];


var DEFAULT_CATALOG = {
  games: [
    { id: 'uid-bd', name: 'UID Topup (BD)', publisher: 'Garena Free Fire', currencyName: 'Diamonds', uidLabel: 'Player UID', uidPlaceholder: 'e.g. 2149083712', active: true },
    { id: 'wm', name: 'Weekly / Monthly', publisher: 'Free Fire Membership', currencyName: 'Membership', uidLabel: 'Player UID', uidPlaceholder: 'e.g. 2149083712', active: true },
    { id: 'wl', name: 'Weekly Lite', publisher: 'Free Fire Lite', currencyName: 'Weekly Lite', uidLabel: 'Player UID', uidPlaceholder: 'e.g. 2149083712', active: true },
    { id: 'lu', name: 'Level Up Pass', publisher: 'Free Fire Pass', currencyName: 'Level Up Pass', uidLabel: 'Player UID', uidPlaceholder: 'e.g. 2149083712', active: true },
    { id: 'likes', name: 'FF Likes', publisher: 'Profile Boost', currencyName: 'FF Likes', uidLabel: 'Player UID', uidPlaceholder: 'e.g. 2149083712', active: true },
    { id: 'indo', name: 'Indonesia Server', publisher: 'FF Indo Region', currencyName: 'Indo Diamonds', uidLabel: 'Indonesia UID', uidPlaceholder: 'e.g. 2149083712', active: true },
    { id: 'guild-glory-bot', name: 'Guild Glory Bot', publisher: 'Special Product', currencyName: 'Glory Bot', uidLabel: 'Guild ID', uidPlaceholder: 'এখানে আপনার Guild ID লিখুন...', active: true }
  ],
  packages: [
    { id: 'bd-25', gameId: 'uid-bd', amountLabel: '25 Diamond', bonusLabel: 'Instant UID Delivery', priceBdt: 22, popular: false, inStock: true },
    { id: 'bd-115', gameId: 'uid-bd', amountLabel: '115 Diamond', bonusLabel: 'Instant UID Delivery', priceBdt: 79, popular: true, inStock: true },
    { id: 'bd-240', gameId: 'uid-bd', amountLabel: '240 Diamond', bonusLabel: 'Fast Top-Up', priceBdt: 158, popular: false, inStock: true },
    { id: 'bd-355', gameId: 'uid-bd', amountLabel: '355 Diamond', bonusLabel: 'Popular Pack', priceBdt: 237, popular: false, inStock: true },
    { id: 'bd-610', gameId: 'uid-bd', amountLabel: '610 Diamond', bonusLabel: 'Bonus Included', priceBdt: 400, popular: false, inStock: true },
    { id: 'bd-1240', gameId: 'uid-bd', amountLabel: '1240 Diamond', bonusLabel: 'Mega Bundle', priceBdt: 800, popular: false, inStock: true },

    { id: 'wm-w1', gameId: 'wm', amountLabel: 'WEEKLY', bonusLabel: '450 Total Diamonds', priceBdt: 155, popular: true, inStock: true },
    { id: 'wm-w2', gameId: 'wm', amountLabel: '2X WEEKLY', bonusLabel: '900 Total Diamonds', priceBdt: 310, popular: false, inStock: true },
    { id: 'wm-m1', gameId: 'wm', amountLabel: 'MONTHLY', bonusLabel: '2600 Total Diamonds', priceBdt: 770, popular: false, inStock: true },
    { id: 'wm-wm', gameId: 'wm', amountLabel: '1X WEEKLY + 1X MONTHLY', bonusLabel: 'Combo Membership', priceBdt: 925, popular: false, inStock: true },

    { id: 'wl-1', gameId: 'wl', amountLabel: '1X Weekly Lite', bonusLabel: 'Daily Claim', priceBdt: 40, popular: true, inStock: true },
    { id: 'wl-2', gameId: 'wl', amountLabel: '2X Weekly Lite', bonusLabel: 'Double Lite', priceBdt: 80, popular: false, inStock: true },
    { id: 'wl-3', gameId: 'wl', amountLabel: '3X Weekly Lite', bonusLabel: 'Triple Lite', priceBdt: 120, popular: false, inStock: true },
    { id: 'wl-5', gameId: 'wl', amountLabel: '5X Weekly Lite', bonusLabel: 'Max Lite', priceBdt: 200, popular: false, inStock: true },

    { id: 'lu-6', gameId: 'lu', amountLabel: 'Level Up - Level 6', bonusLabel: '120 Diamonds', priceBdt: 43, popular: false, inStock: true },
    { id: 'lu-10', gameId: 'lu', amountLabel: 'Level Up - Level 10', bonusLabel: '200 Diamonds', priceBdt: 75, popular: false, inStock: true },
    { id: 'lu-30', gameId: 'lu', amountLabel: 'Level Up - Level 30', bonusLabel: '300 Diamonds', priceBdt: 105, popular: false, inStock: true },
    { id: 'lu-full', gameId: 'lu', amountLabel: 'Full Level Up (1270D)', bonusLabel: 'All Levels Included', priceBdt: 448, popular: true, inStock: true },

    { id: 'lk-200', gameId: 'likes', amountLabel: '200 FF LIKE', bonusLabel: 'Daily 1x / ID', priceBdt: 30, popular: true, inStock: true },
    { id: 'lk-3k', gameId: 'likes', amountLabel: '3000 FF LIKE', bonusLabel: '15 Days Plan', priceBdt: 450, popular: false, inStock: true },
    { id: 'lk-6k', gameId: 'likes', amountLabel: '6000 FF LIKE', bonusLabel: '30 Days Plan', priceBdt: 900, popular: false, inStock: true },
    { id: 'lk-12k', gameId: 'likes', amountLabel: '12000 FF LIKE', bonusLabel: '60 Days Plan', priceBdt: 1800, popular: false, inStock: true },

    { id: 'in-50', gameId: 'indo', amountLabel: '50 Diamond (Indo)', bonusLabel: 'Indo Server', priceBdt: 65, popular: false, inStock: true },
    { id: 'in-140', gameId: 'indo', amountLabel: '140 Diamond (Indo)', bonusLabel: 'Indo Server', priceBdt: 180, popular: true, inStock: true },
    { id: 'in-355', gameId: 'indo', amountLabel: '355 Diamond (Indo)', bonusLabel: 'Indo Server', priceBdt: 445, popular: false, inStock: true },
    { id: 'in-720', gameId: 'indo', amountLabel: '720 Diamond (Indo)', bonusLabel: 'Indo Server', priceBdt: 890, popular: false, inStock: true },

    { id: 'gb-4', gameId: 'guild-glory-bot', amountLabel: '4 Glory Bot', bonusLabel: 'Auto Glory Squad', priceBdt: 145, popular: false, inStock: true },
    { id: 'gb-8', gameId: 'guild-glory-bot', amountLabel: '8 Glory Bot', bonusLabel: 'Auto Glory Squad', priceBdt: 290, popular: true, inStock: true },
    { id: 'gb-12', gameId: 'guild-glory-bot', amountLabel: '12 Glory Bot', bonusLabel: 'Auto Glory Squad', priceBdt: 430, popular: false, inStock: true },
    { id: 'gb-16', gameId: 'guild-glory-bot', amountLabel: '16 Glory Bot', bonusLabel: 'Auto Glory Squad', priceBdt: 560, popular: false, inStock: true }
  ]
};

var DEFAULT_SITE_SETTINGS = {
  siteName: 'Crazy_Top_Up (24)',
  logoUrl: 'Main logo.jpg',
  themeColor: '#d97706',
  themeAccent: '#f59e0b',
  heroBanners: [
    { id: 'hb-1', imageUrl: 'Banner 1.jpg', linkUrl: '', alt: 'Banner 1', active: true },
    { id: 'hb-2', imageUrl: 'Banner 2.jpg', linkUrl: '', alt: 'Banner 2', active: true },
    { id: 'hb-3', imageUrl: 'Banner 3.jpg', linkUrl: '', alt: 'Banner 3', active: true }
  ],
  popupActive: true,
  popupImageUrl: 'Notification.jpg',
  popupText: 'সবথেকে কম দামে টপ করার জন্য সেরা ওয়েবসাইট\n১০০% বিশ্বস্ত ও দ্রুত ডেলিভারিতে\nঅর্ডার করুন নিশ্চিন্তে 🥰',
  telegramChannel: 'https://t.me/crazy_top_up_24',
  telegramGroup: '',
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

function validatePlayerUid(gameId, rawUid) {
  var uid = String(rawUid || '').trim();
  if (!uid) return { ok: false, error: 'অনুগ্রহ করে Player UID দিন।' };
  var gid = String(gameId || '').toLowerCase();
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

var VIP_RANKS = [
  { rank: 'Bronze', minSpendBdt: 0, discountPercent: 0 },
  { rank: 'Silver', minSpendBdt: 1000, discountPercent: 2 },
  { rank: 'Gold', minSpendBdt: 3000, discountPercent: 4 },
  { rank: 'Diamond', minSpendBdt: 8000, discountPercent: 7 }
];

function getVipSpendStatus(spendRaw) {
  var spend = Math.max(0, Number(spendRaw) || 0);
  var idx = 0;
  for (var i = 0; i < VIP_RANKS.length; i++) {
    if (spend >= VIP_RANKS[i].minSpendBdt) idx = i;
  }
  var current = VIP_RANKS[idx];
  var next = idx < VIP_RANKS.length - 1 ? VIP_RANKS[idx + 1] : null;
  if (!next) {
    return {
      rank: current.rank,
      lifetimeSpendBdt: spend,
      discountPercent: current.discountPercent,
      nextRank: null,
      nextThresholdBdt: current.minSpendBdt,
      progressPercent: 100
    };
  }
  var span = Math.max(1, next.minSpendBdt - current.minSpendBdt);
  var pct = Math.min(100, Math.round(((spend - current.minSpendBdt) / span) * 100));
  return {
    rank: current.rank,
    lifetimeSpendBdt: spend,
    discountPercent: current.discountPercent,
    nextRank: next.rank,
    nextThresholdBdt: next.minSpendBdt,
    progressPercent: pct
  };
}

function getTodayBD() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(new Date());
}

function getYesterdayBD() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(new Date(Date.now() - 86400000));
}

function formatTimeBD() {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit' }).format(new Date());
}

function formatDateTimeBD() {
  var d = getTodayBD().split('-');
  var dateStr = d.length === 3 ? (d[2] + '-' + d[1] + '-' + d[0]) : getTodayBD();
  return dateStr + ' ' + formatTimeBD();
}

var DEFAULT_ANNOUNCEMENT = {
  active: true,
  tagLabel: 'NOTICE',
  text: 'Instant UID Delivery Active 24/7 — Spin daily for up to 90% OFF & upload payment screenshot for faster approval!'
};

var DEFAULT_BANNERS = [
  {
    id: 'ban-1',
    badge: 'MEGA OFFER',
    title: 'Spin & Win Up to 90% Instant Discount',
    subtitle: 'Get 1 Free Daily Spin + Bonus Spins on every top-up order.',
    ctaLabel: 'Spin Now',
    ctaTarget: 'spin',
    accent: 'gold',
    active: true
  },
  {
    id: 'ban-2',
    badge: 'WALLET PERK',
    title: '3% Instant Cashback on Crazy Wallet Pay',
    subtitle: 'Add money via bKash, Nagad, or Rocket and enjoy instant checkout.',
    ctaLabel: 'Add Money',
    ctaTarget: 'wallet',
    accent: 'emerald',
    active: true
  },
  {
    id: 'ban-3',
    badge: 'PROMO DEAL',
    title: 'Use Code CRAZY10 for Extra 10% Savings',
    subtitle: 'Stack Promo Codes with VIP Rank discounts at checkout.',
    ctaLabel: 'Apply CRAZY10',
    ctaTarget: 'promo:CRAZY10',
    accent: 'sky',
    active: true
  }
];

function normalizeTrxId(raw) {
  return String(raw || '').trim().toUpperCase().replace(/\s+/g, '');
}

function sanitizeScreenshot(raw) {
  var s = String(raw || '').trim();
  if (!s) return undefined;
  if (s.indexOf('data:image/') === 0 && s.length <= 2800000) return s;
  return undefined;
}

function findDuplicateTrxId(d, trxRaw) {
  var clean = normalizeTrxId(trxRaw);
  if (!clean) return null;
  var orders = d.ordersLog || [];
  for (var i = 0; i < orders.length; i++) {
    var o = orders[i];
    if (o.status !== 'Rejected' && normalizeTrxId(o.trxId) === clean) {
      return { type: 'order', refId: o.id, userIdentifier: o.userIdentifier };
    }
  }
  var deps = d.walletDeposits || [];
  for (var j = 0; j < deps.length; j++) {
    var dep = deps[j];
    if (dep.status !== 'Rejected' && normalizeTrxId(dep.trxId) === clean) {
      return { type: 'deposit', refId: dep.id, userIdentifier: dep.userIdentifier };
    }
  }
  return null;
}


function getSmsWebhookSecret(d) {
  var envSec = String(process.env.SMS_WEBHOOK_SECRET || '').trim();
  if (envSec.length >= 8) return envSec;
  return String((d && d.config && d.config.smsWebhookSecret) || '').trim();
}

function timingSafeEqualsStr(a, b) {
  if (!a || !b) return false;
  var ha = crypto.createHash('sha256').update(String(a)).digest();
  var hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function verifySmsWebhookSecret(req, d) {
  var expected = getSmsWebhookSecret(d);
  if (!expected) return false;
  var authHdr = String((req.headers && req.headers.authorization) || '');
  var bearer = authHdr.toLowerCase().indexOf('bearer ') === 0 ? authHdr.slice(7).trim() : '';
  var bodySecret = (req.body && typeof req.body.secret === 'string') ? req.body.secret.trim() : '';
  var hdrKey = String((req.headers && req.headers['x-webhook-key']) || '').trim();
  var candidate = (hdrKey || bearer || bodySecret || '').trim();
  return timingSafeEqualsStr(candidate, expected);
}

function isDisallowedPrivateHost(hostname) {
  var h = String(hostname || '').trim().toLowerCase().replace(/^\[|\]$/g, '');
  if (!h) return true;
  if (h === 'localhost' || h.slice(-6) === '.local' || h.slice(-9) === '.internal') return true;
  if (h === '::1' || h === '::' || h.indexOf('fe80:') === 0 || h.indexOf('fc') === 0 || h.indexOf('fd') === 0) return true;
  var m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    var a = Number(m[1]);
    var b = Number(m[2]);
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
  }
  return false;
}

function validateUddoktaBaseUrl(rawUrl) {
  var s = String(rawUrl || '').trim();
  if (!s) return '';
  try {
    var u = new URL(s);
    if (u.protocol !== 'https:') return '';
    if (u.username || u.password) return '';
    if (isDisallowedPrivateHost(u.hostname)) return '';
    var cleaned = u.origin + u.pathname.replace(/\/+$/, '');
    cleaned = cleaned.replace(/\/api(?:\/(?:checkout-v2|verify-payment))?$/i, '');
    return cleaned.slice(0, 200);
  } catch (e) {
    return '';
  }
}

function getUddoktaCredentials(d) {
  var envKey = String(process.env.UDDOKTAPAY_API_KEY || '').trim();
  var envBase = validateUddoktaBaseUrl(process.env.UDDOKTAPAY_BASE_URL || '');
  var cfg = (d && d.config && d.config.uddoktapay) || { enabled: false, explicitlyDisabled: false, baseUrl: '', apiKey: '' };
  var dbBase = validateUddoktaBaseUrl(cfg.baseUrl || '');
  var dbKey = String(cfg.apiKey || '').trim();
  var apiKey = envKey || dbKey;
  var baseUrl = envBase || dbBase;
  var envManaged = Boolean(envKey && envBase);
  var enabled = envManaged
    ? !cfg.explicitlyDisabled
    : Boolean(cfg.enabled && apiKey && baseUrl);
  return {
    enabled: enabled,
    baseUrl: baseUrl,
    apiKey: apiKey,
    envManaged: envManaged
  };
}

function isUddoktaReady(d) {
  var c = getUddoktaCredentials(d);
  return Boolean(c.enabled && c.baseUrl && c.apiKey);
}

function sanitizeReturnHash(raw) {
  var s = String(raw || '').trim();
  if (!s) return '';
  if (s === '#spin-checkout' || s === '#add-money' || s === '#orders' || s === '#wallet') {
    return s;
  }
  return '';
}

function getSafeRequestOrigin(req) {
  var envOrigin = String(process.env.APP_URL || '').trim().replace(/\/+$/, '');
  if (envOrigin) {
    try {
      var parsed = new URL(envOrigin);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') return parsed.origin;
    } catch (e) {}
  }
  var xfProto = String((req.headers && req.headers['x-forwarded-proto']) || req.protocol || 'https').split(',')[0].trim();
  var proto = xfProto === 'http' ? 'http' : 'https';
  var host = String((req.headers && (req.headers['x-forwarded-host'] || req.get('host'))) || 'localhost:3000').split(',')[0].trim();
  return proto + '://' + host;
}

function parseMobileBankingSms(payload) {
  payload = payload || {};
  var rawSender = String(payload.sender != null ? payload.sender : (payload.from != null ? payload.from : (payload.phone != null ? payload.phone : (payload.address != null ? payload.address : '')))).trim().slice(0, 64);
  var txtCand = payload.text != null ? payload.text : (payload.msg != null ? payload.msg : (payload.message != null ? payload.message : (payload.body != null ? payload.body : (payload.sms != null ? payload.sms : payload.content))));
  var rawText = String(txtCand != null ? txtCand : '').trim().slice(0, 1000);
  var combined = (rawSender + ' ' + rawText).toLowerCase();
  var explicitProv = String(payload.provider || '').trim().toLowerCase();
  var provider = 'Unknown';
  if (explicitProv.indexOf('bkash') >= 0 || combined.indexOf('bkash') >= 0 || combined.indexOf('b-kash') >= 0 || combined.indexOf('বিকাশ') >= 0) {
    provider = 'bKash';
  } else if (explicitProv.indexOf('nagad') >= 0 || combined.indexOf('nagad') >= 0 || combined.indexOf('নগদ') >= 0) {
    provider = 'Nagad';
  } else if (explicitProv.indexOf('rocket') >= 0 || combined.indexOf('rocket') >= 0 || combined.indexOf('16216') >= 0 || combined.indexOf('dbbl') >= 0 || combined.indexOf('রকেট') >= 0) {
    provider = 'Rocket';
  } else if (explicitProv.indexOf('upay') >= 0 || combined.indexOf('upay') >= 0 || combined.indexOf('উপায়') >= 0 || combined.indexOf('উপায়') >= 0) {
    provider = 'Upay';
  }

  var trxId = normalizeTrxId(typeof payload.trxId === 'string' ? payload.trxId : '');
  if (!trxId && rawText) {
    var trxMatch = rawText.match(/(?:TrxID|TxnID|TxnId|Transaction\s*ID|Trans\s*ID|Ref)\s*[:#\-]?\s*([A-Z0-9]{5,20})/i);
    if (trxMatch && trxMatch[1]) trxId = normalizeTrxId(trxMatch[1]);
  }

  var amountNum = Number(payload.amount);
  if (!Number.isFinite(amountNum) || amountNum <= 0) {
    var primaryAmt =
      rawText.match(/(?:received|cash\s*in|payment(?:\s*of)?|send\s*money|amount\s*[:\-]?)\s*(?:tk\.?|bdt|৳)?\s*([\d,]{1,10}(?:\.\d{1,2})?)/i) ||
      rawText.match(/(?:tk\.?|bdt|৳)\s*([\d,]{1,10}(?:\.\d{1,2})?)/i) ||
      rawText.match(/([\d,]{1,10}(?:\.\d{1,2})?)\s*(?:tk|bdt|টাকা)/i);
    if (primaryAmt && primaryAmt[1]) amountNum = Number(primaryAmt[1].replace(/,/g, ''));
  }
  var amountBdt = (Number.isFinite(amountNum) && amountNum > 0) ? Math.round(amountNum) : 0;

  var senderPhone = rawSender;
  var phoneMatch = rawText.match(/(?:from|sender|a\/c)\s*[:\-]?\s*(01\d{9}|\+?8801\d{9})/i);
  if (phoneMatch && phoneMatch[1]) senderPhone = phoneMatch[1];

  if (!trxId || trxId.length < 4) {
    return { ok: false, error: 'Could not extract a valid TrxID from SMS payload.' };
  }
  if (amountBdt < 10) {
    return { ok: false, error: 'Could not extract a valid payment amount (>= ৳10) from SMS.' };
  }
  return {
    ok: true,
    provider: provider,
    amountBdt: amountBdt,
    trxId: trxId,
    sender: senderPhone || provider,
    rawText: rawText || (provider + ' Tk ' + amountBdt + ' TrxID ' + trxId)
  };
}

function tryAutoMatchSmsWithPending(d, sms) {
  if (!sms || sms.status !== 'Unused') return null;
  var pendingDep = (d.walletDeposits || []).find(function (dep) {
    return dep.status === 'Pending' &&
      normalizeTrxId(dep.trxId) === sms.trxId &&
      Math.round(Number(dep.amountBdt)) === Math.round(sms.amountBdt);
  });
  if (pendingDep) {
    pendingDep.status = 'Approved';
    pendingDep.autoMatched = true;
    var depOwner = d.users[String(pendingDep.userIdentifier || '').toLowerCase()];
    if (depOwner) {
      depOwner.walletBalanceBdt = (depOwner.walletBalanceBdt || 0) + pendingDep.amountBdt;
      var rItem = (depOwner.walletRequests || []).find(function (r) { return r.id === pendingDep.id; });
      if (rItem) { rItem.status = 'Approved'; rItem.autoMatched = true; }
    }
    sms.status = 'Matched';
    sms.matchedRefId = pendingDep.id;
    logActivity(d, 'Auto-Approved via SMS', pendingDep.id + ' · ৳' + pendingDep.amountBdt + ' (' + sms.provider + ', TrxID: ' + sms.trxId + ') credited automatically to ' + pendingDep.userName, 'success', 'SMS Auto-Matcher');
    return { matchedType: 'deposit', refId: pendingDep.id, userName: pendingDep.userName, amountBdt: pendingDep.amountBdt };
  }

  var pendingOrd = (d.ordersLog || []).find(function (ord) {
    return ord.status === 'Pending' &&
      ord.trxId &&
      normalizeTrxId(ord.trxId) === sms.trxId &&
      Math.round(Number(ord.finalPrice)) === Math.round(sms.amountBdt);
  });
  if (pendingOrd) {
    pendingOrd.status = 'Processing';
    pendingOrd.autoMatched = true;
    var ordOwner = d.users[String(pendingOrd.userIdentifier || '').toLowerCase()];
    if (ordOwner) {
      var uOrd = (ordOwner.orders || []).find(function (o) { return o.id === pendingOrd.id; });
      if (uOrd) { uOrd.status = 'Processing'; uOrd.autoMatched = true; }
    }
    sms.status = 'Matched';
    sms.matchedRefId = pendingOrd.id;
    logActivity(d, 'Order Verified via SMS', pendingOrd.id + ' · ৳' + pendingOrd.finalPrice + ' (' + sms.provider + ', TrxID: ' + sms.trxId + ') moved to Processing automatically', 'success', 'SMS Auto-Matcher');
    return { matchedType: 'order', refId: pendingOrd.id, userName: pendingOrd.userName, amountBdt: pendingOrd.finalPrice, matchedOrder: pendingOrd };
  }
  return null;
}

var UCBOT_API_BASE = 'https://ffapi.ucbot.net';

function maskVoucherCode(code) {
  var clean = String(code || '').trim();
  if (clean.length <= 8) return '••••' + clean.slice(-3);
  return clean.slice(0, 5) + '••••' + clean.slice(-4);
}

function getUcbotCredentials(d) {
  var envToken = String(process.env.UCBOT_API_TOKEN || '').trim();
  var cfg = (d && d.config && d.config.ucbot) || {
    enabled: false,
    explicitlyDisabled: false,
    apiToken: '',
    shellCode: 'shell',
    shellUsername: '',
    shellPassword: '',
    shellAutocode: '',
    packageRules: {}
  };
  var apiToken = envToken || String(cfg.apiToken || '').trim();
  var envManaged = Boolean(envToken);
  var configured = Boolean(apiToken);
  var enabled = configured && (envManaged ? cfg.explicitlyDisabled !== true : Boolean(cfg.enabled));
  return {
    enabled: enabled,
    apiToken: apiToken,
    envManaged: envManaged,
    shellCode: cfg.shellCode === 'sgshell' ? 'sgshell' : 'shell',
    shellUsername: String(cfg.shellUsername || '').trim(),
    shellPassword: String(cfg.shellPassword || ''),
    shellAutocode: String(cfg.shellAutocode || '').trim(),
    packageRules: (cfg.packageRules && typeof cfg.packageRules === 'object') ? cfg.packageRules : {}
  };
}

function sanitizeUcbotForAdmin(d) {
  var c = getUcbotCredentials(d);
  return {
    enabled: c.enabled,
    hasApiToken: Boolean(c.apiToken),
    envManaged: c.envManaged,
    shellCode: c.shellCode,
    shellUsername: c.shellUsername,
    hasShellPassword: Boolean(c.shellPassword),
    hasShellAutocode: Boolean(c.shellAutocode),
    packageRules: c.packageRules
  };
}

function sanitizeVaultForAdmin(d) {
  var vault = Array.isArray(d.unipinVault) ? d.unipinVault : [];
  var stockByPackage = {};
  vault.forEach(function (item) {
    if (item && item.status === 'Unused' && item.packageId) {
      stockByPackage[item.packageId] = (stockByPackage[item.packageId] || 0) + 1;
    }
  });
  return {
    stockByPackage: stockByPackage,
    items: vault.slice(0, 120).map(function (item) {
      return {
        id: item.id,
        packageId: item.packageId,
        maskedCode: maskVoucherCode(item.code),
        status: item.status,
        addedAt: item.addedAt,
        usedByOrderId: item.usedByOrderId,
        detail: item.detail
      };
    })
  };
}

function buildSafeAdminConfig(d) {
  var udpCreds = getUddoktaCredentials(d);
  var clone = Object.assign({}, d.config);
  var hasTgWebhook = Boolean(clone.telegramWebhookSecret);
  delete clone.telegramWebhookSecret;
  delete clone.ucbot;
  clone.smsWebhookSecret = getSmsWebhookSecret(d);
  clone.smsSecretFromEnv = Boolean(String(process.env.SMS_WEBHOOK_SECRET || '').trim().length >= 8);
  clone.telegramWebhookConfigured = hasTgWebhook;
  clone.uddoktapay = {
    enabled: udpCreds.enabled,
    baseUrl: udpCreds.baseUrl,
    hasApiKey: Boolean(udpCreds.apiKey),
    envManaged: udpCreds.envManaged
  };
  clone.ucbot = sanitizeUcbotForAdmin(d);
  return clone;
}

function resolveOrderPackageRule(d, ord) {
  var c = getUcbotCredentials(d);
  var pkgId = String(ord.packageId || '').trim();
  if (!pkgId) {
    var cleanLbl = String(ord.packageLabel || '').trim();
    var pkgs = (d.config.catalog && d.config.catalog.packages) || [];
    var matchedPkg = pkgs.find(function (pk) {
      return pk && pk.amountLabel && cleanLbl.indexOf(pk.amountLabel) === 0;
    });
    if (matchedPkg) pkgId = matchedPkg.id;
  }
  if (!pkgId) return null;
  var rule = c.packageRules[pkgId];
  if (!rule || rule.mode === 'manual') return null;
  return { packageId: pkgId, rule: rule };
}

function syncOrderFieldsToOwner(d, ord) {
  var owner = d.users[String(ord.userIdentifier || '').toLowerCase()];
  if (!owner) return;
  var uOrd = (owner.orders || []).find(function (o) { return o.id === ord.id; });
  if (uOrd) {
    uOrd.status = ord.status;
    uOrd.autoMatched = ord.autoMatched;
    uOrd.autoDeliveryStatus = ord.autoDeliveryStatus;
    uOrd.autoDeliveryNote = ord.autoDeliveryNote;
    uOrd.deliveredNickname = ord.deliveredNickname;
    if (ord.packageId) uOrd.packageId = ord.packageId;
  }
}

async function tryAutoDeliverOrder(d, ord, actor) {
  actor = actor || 'UcBot Auto-Delivery';
  var creds = getUcbotCredentials(d);
  if (!creds.enabled || !creds.apiToken) {
    return { attempted: false, delivered: false, error: 'UCBOT_DISABLED' };
  }
  if (ord.autoDeliveryStatus === 'InProgress' || ord.autoDeliveryStatus === 'Delivered') {
    return { attempted: false, delivered: ord.autoDeliveryStatus === 'Delivered', error: 'ALREADY_HANDLED' };
  }
  var resolved = resolveOrderPackageRule(d, ord);
  if (!resolved) {
    return { attempted: false, delivered: false, error: 'NO_AUTO_RULE' };
  }
  var cleanUid = String(ord.playerUid || '').trim();
  if (!/^\d{5,15}$/.test(cleanUid)) {
    ord.autoDeliveryStatus = 'Failed';
    ord.autoDeliveryNote = 'Invalid FF UID format for auto-delivery';
    syncOrderFieldsToOwner(d, ord);
    saveDb(d);
    return { attempted: true, delivered: false, error: ord.autoDeliveryNote };
  }

  var packageId = resolved.packageId;
  var rule = resolved.rule;
  ord.packageId = packageId;

  if (rule.mode === 'unipin') {
    if (!Array.isArray(d.unipinVault)) d.unipinVault = [];
    var needed = Math.max(1, Math.min(5, Math.round(Number(rule.unipinCount) || 1)));
    var unused = d.unipinVault.filter(function (v) { return v.packageId === packageId && v.status === 'Unused'; });
    if (unused.length < needed) {
      ord.autoDeliveryStatus = 'Failed';
      ord.autoDeliveryNote = 'UniPin Stock Low (Need ' + needed + ', Available ' + unused.length + ')';
      syncOrderFieldsToOwner(d, ord);
      logActivity(d, 'Auto-Delivery Stock Empty', ord.id + ' (' + ord.packageLabel + ') paused — ' + ord.autoDeliveryNote, 'warning', actor);
      saveDb(d);
      return { attempted: true, delivered: false, error: ord.autoDeliveryNote };
    }

    var claimed = unused.slice(0, needed);
    claimed.forEach(function (item) {
      item.status = 'InProgress';
      item.usedByOrderId = ord.id;
    });
    ord.autoDeliveryStatus = 'InProgress';
    ord.autoDeliveryNote = 'Redeeming ' + needed + ' UniPin code(s)...';
    syncOrderFieldsToOwner(d, ord);
    saveDb(d);

    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 20000);
    var data = {};
    var httpOk = false;
    var httpStatus = 0;
    try {
      var resp = await fetch(UCBOT_API_BASE + '/topup-sync', {
        method: 'POST',
        signal: ctrl ? ctrl.signal : undefined,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: creds.apiToken
        },
        body: JSON.stringify({
          orderid: ord.id,
          playerid: cleanUid,
          code: claimed.map(function (c) { return c.code; }).join(',')
        })
      });
      httpOk = resp.ok;
      httpStatus = resp.status;
      data = await resp.json().catch(function () { return {}; });
    } catch (err) {
      claimed.forEach(function (item) {
        item.status = 'Unused';
        delete item.usedByOrderId;
      });
      ord.autoDeliveryStatus = 'Failed';
      ord.autoDeliveryNote = (err && err.message) ? ('Network Error: ' + err.message) : 'Network Error';
      syncOrderFieldsToOwner(d, ord);
      logActivity(d, 'Auto-Delivery Failed', ord.id + ': ' + ord.autoDeliveryNote, 'danger', actor);
      saveDb(d);
      return { attempted: true, delivered: false, error: ord.autoDeliveryNote };
    } finally {
      clearTimeout(timer);
    }

    var errText = String(data.error || data.message || '').trim();
    var batch = Array.isArray(data.batch) ? data.batch : [];
    if (!httpOk || data.status === 'error' || (errText && batch.length === 0)) {
      claimed.forEach(function (item) {
        item.status = 'Unused';
        delete item.usedByOrderId;
      });
      ord.autoDeliveryStatus = 'Failed';
      ord.autoDeliveryNote = errText || ('UcBot HTTP ' + httpStatus);
      syncOrderFieldsToOwner(d, ord);
      logActivity(d, 'Auto-Delivery Rejected', ord.id + ': ' + ord.autoDeliveryNote, 'warning', actor);
      saveDb(d);
      return { attempted: true, delivered: false, error: ord.autoDeliveryNote };
    }

    var okCount = 0;
    var failDetails = [];
    if (batch.length > 0) {
      claimed.forEach(function (item, idx) {
        var bItem = batch[idx];
        if (bItem && bItem.ok) {
          item.status = 'Used';
          item.detail = String(bItem.detail || 'Success');
          okCount += 1;
        } else {
          var det = String((bItem && bItem.detail) || 'Failed');
          if (/invalid player|bd region/i.test(det)) {
            item.status = 'Unused';
            delete item.usedByOrderId;
          } else {
            item.status = 'Failed';
            item.detail = det;
          }
          failDetails.push(det);
        }
      });
    } else if (data.status === 'success') {
      claimed.forEach(function (item) {
        item.status = 'Used';
        item.detail = 'Success';
        okCount += 1;
      });
    }

    var nick = String(data.username || '').trim().slice(0, 48);
    if (okCount === claimed.length && failDetails.length === 0) {
      ord.status = 'Completed';
      ord.autoDeliveryStatus = 'Delivered';
      if (nick) ord.deliveredNickname = nick;
      ord.autoDeliveryNote = 'Auto-Delivered via UniPin' + (nick ? (' (' + nick + ')') : '');
      syncOrderFieldsToOwner(d, ord);
      logActivity(d, 'Auto-Delivered Diamonds', ord.id + ' · ' + ord.packageLabel + ' → UID ' + ord.playerUid + (nick ? (' (' + nick + ')') : ''), 'success', actor);
      saveDb(d);
      await sendTelegram(
        '🚀 <b>Auto-Delivered Complete!</b>\n🆔 Order: <code>' + ord.id + '</code>\n🎮 Player: <b>' + (nick || ord.playerUid) + '</b> (<code>' + ord.playerUid + '</code>)\n📦 Package: ' + ord.packageLabel + '\n💰 Paid: <b>৳' + ord.finalPrice + '</b> (' + ord.paymentMethod + ')'
      );
      return { attempted: true, delivered: true };
    }

    ord.autoDeliveryStatus = 'Failed';
    ord.autoDeliveryNote = 'Partial/Failed (' + okCount + '/' + claimed.length + ' OK): ' + (failDetails.join(', ') || 'Check batch');
    syncOrderFieldsToOwner(d, ord);
    logActivity(d, 'Auto-Delivery Partial', ord.id + ': ' + ord.autoDeliveryNote, 'danger', actor);
    saveDb(d);
    return { attempted: true, delivered: false, error: ord.autoDeliveryNote };
  }

  var shellPkg = String(rule.shellPackage || '').trim();
  if (!shellPkg || !creds.shellUsername || !creds.shellPassword || !creds.shellAutocode) {
    ord.autoDeliveryStatus = 'Failed';
    ord.autoDeliveryNote = 'Shell credentials or shell package code missing in Admin Panel';
    syncOrderFieldsToOwner(d, ord);
    saveDb(d);
    return { attempted: true, delivered: false, error: ord.autoDeliveryNote };
  }

  ord.autoDeliveryStatus = 'InProgress';
  ord.autoDeliveryNote = 'Sending ' + (creds.shellCode === 'sgshell' ? 'SG' : 'MY') + ' Shell (' + shellPkg + ')...';
  syncOrderFieldsToOwner(d, ord);
  saveDb(d);

  var sCtrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  var sTimer = setTimeout(function () { if (sCtrl) sCtrl.abort(); }, 20000);
  var sData = {};
  var sOk = false;
  var sStatus = 0;
  try {
    var sResp = await fetch(UCBOT_API_BASE + '/topup-sync', {
      method: 'POST',
      signal: sCtrl ? sCtrl.signal : undefined,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: creds.apiToken
      },
      body: JSON.stringify({
        orderid: ord.id,
        playerid: cleanUid,
        code: creds.shellCode,
        package: shellPkg,
        username: creds.shellUsername,
        password: creds.shellPassword,
        autocode: creds.shellAutocode
      })
    });
    sOk = sResp.ok;
    sStatus = sResp.status;
    sData = await sResp.json().catch(function () { return {}; });
  } catch (err) {
    ord.autoDeliveryStatus = 'Failed';
    ord.autoDeliveryNote = (err && err.message) ? ('Network Error: ' + err.message) : 'Network Error';
    syncOrderFieldsToOwner(d, ord);
    logActivity(d, 'Shell Auto-Delivery Failed', ord.id + ': ' + ord.autoDeliveryNote, 'danger', actor);
    saveDb(d);
    return { attempted: true, delivered: false, error: ord.autoDeliveryNote };
  } finally {
    clearTimeout(sTimer);
  }

  if (sOk && sData.status === 'success' && !sData.error) {
    var sNick = String(sData.username || '').trim().slice(0, 48);
    ord.status = 'Completed';
    ord.autoDeliveryStatus = 'Delivered';
    if (sNick) ord.deliveredNickname = sNick;
    ord.autoDeliveryNote = 'Auto-Delivered via ' + (creds.shellCode === 'sgshell' ? 'SG' : 'MY') + ' Shell (' + shellPkg + ')' + (sNick ? (' · ' + sNick) : '');
    syncOrderFieldsToOwner(d, ord);
    logActivity(d, 'Auto-Delivered Diamonds', ord.id + ' · ' + ord.packageLabel + ' (' + shellPkg + ') → UID ' + ord.playerUid, 'success', actor);
    saveDb(d);
    await sendTelegram(
      '🚀 <b>Shell Auto-Delivered Complete!</b>\n🆔 Order: <code>' + ord.id + '</code>\n🎮 Player: <b>' + (sNick || ord.playerUid) + '</b> (<code>' + ord.playerUid + '</code>)\n📦 Package: ' + ord.packageLabel + ' (' + shellPkg + ')\n💰 Paid: <b>৳' + ord.finalPrice + '</b> (' + ord.paymentMethod + ')'
    );
    return { attempted: true, delivered: true };
  }

  ord.autoDeliveryStatus = 'Failed';
  ord.autoDeliveryNote = String(sData.error || sData.message || ('Shell HTTP ' + sStatus));
  syncOrderFieldsToOwner(d, ord);
  logActivity(d, 'Shell Auto-Delivery Failed', ord.id + ': ' + ord.autoDeliveryNote, 'warning', actor);
  saveDb(d);
  return { attempted: true, delivered: false, error: ord.autoDeliveryNote };
}

async function ingestSmsPayment(d, parsed, actor) {
  if (!Array.isArray(d.smsPayments)) d.smsPayments = [];
  var existing = d.smsPayments.find(function (s) { return s.trxId === parsed.trxId; });
  if (existing) return { duplicate: true, sms: existing, matched: null };

  var smsRecord = {
    id: 'SMS-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 5).toUpperCase(),
    provider: parsed.provider,
    amountBdt: parsed.amountBdt,
    trxId: parsed.trxId,
    sender: parsed.sender,
    rawText: parsed.rawText,
    status: 'Unused',
    receivedAt: getTodayBD() + ' ' + formatTimeBD(),
    createdAtMs: Date.now()
  };
  d.smsPayments.unshift(smsRecord);
  d.smsPayments = d.smsPayments.slice(0, 200);

  var matched = tryAutoMatchSmsWithPending(d, smsRecord);
  if (!matched) {
    logActivity(d, 'SMS Received', smsRecord.provider + ' ৳' + smsRecord.amountBdt + ' · TrxID ' + smsRecord.trxId + ' stored (waiting for user checkout)', 'info', actor || 'Android SMS Forwarder');
  }
  saveDb(d);

  if (matched) {
    if (matched.matchedType === 'order' && matched.matchedOrder) {
      var autoRes = await tryAutoDeliverOrder(d, matched.matchedOrder, 'SMS + Auto-Delivery');
      if (!autoRes.delivered) {
        await sendTelegram(
          '🤖 <b>Order Payment Verified via SMS!</b>\n🆔 Order: <code>' + matched.refId + '</code> → ' + matched.matchedOrder.status + '\n👤 User: ' + matched.userName + '\n📦 Package: ' + matched.matchedOrder.packageLabel + '\n🎯 UID: <code>' + matched.matchedOrder.playerUid + '</code>\n💰 Amount: <b>৳' + matched.amountBdt + '</b> (' + smsRecord.provider + ')\n🧾 TrxID: <code>' + smsRecord.trxId + '</code>' +
          ((autoRes.error && matched.matchedOrder.autoDeliveryStatus === 'Failed') ? ('\n⚠️ Auto-Delivery: ' + autoRes.error) : ''),
          orderInlineMarkup(matched.refId)
        );
      }
    } else {
      await sendTelegram(
        '🤖 <b>Auto-Approved Wallet Deposit via SMS!</b>\n🆔 ID: <code>' + matched.refId + '</code>\n👤 User: ' + matched.userName + '\n💰 Amount: <b>৳' + matched.amountBdt + '</b> (' + smsRecord.provider + ')\n🧾 TrxID: <code>' + smsRecord.trxId + '</code>'
      );
    }
  }
  return { duplicate: false, sms: smsRecord, matched: matched };
}

function logActivity(d, action, detail, level, actor) {
  if (!Array.isArray(d.activityLog)) d.activityLog = [];
  if (action === 'Duplicate TrxID Blocked') {
    d.duplicateTrxBlockedCount = (d.duplicateTrxBlockedCount || 0) + 1;
  }
  d.activityLog.unshift({
    id: 'ACT-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    action: action,
    detail: detail,
    level: level || 'info',
    actor: actor || 'Admin',
    createdAt: getTodayBD() + ' ' + formatTimeBD()
  });
  d.activityLog = d.activityLog.slice(0, 120);
}

function defaultDb() {
  var rw = {};
  REGULAR_WEDGES.forEach(function (w) { rw[w.id] = w.weight; });
  var gw = {};
  GOLDEN_WEDGES.forEach(function (w) { gw[w.id] = w.weight; });
  return {
    config: {
      regularWeights: rw,
      goldenWeights: gw,
      rules: { expiryHours: 24, bigPercentThreshold: 40, bigFlatThreshold: 200, minOrderBdt: 300, maxDiscountBdt: 150 },
      paymentNumbers: { bkash: '01700-000024', nagad: '01800-000024', rocket: '01900-000024' },
      support: { whatsapp: '8801700000024', telegram: 'https://t.me/crazy_top_up_24' },
      walletCashbackPercent: 3,
      flashSale: {
        active: true,
        title: 'Happy Hour Flash Sale · Extra 5% OFF',
        extraPercent: 5,
        endsAt: Date.now() + 24 * 3600000
      },
      promoCodes: [
        { code: 'CRAZY10', discountType: 'percent', value: 10, minOrderBdt: 100, maxDiscountBdt: 120, maxUses: 100, usedCount: 0, active: true },
        { code: 'VIP50', discountType: 'flat', value: 50, minOrderBdt: 250, maxDiscountBdt: 50, maxUses: 50, usedCount: 0, active: true }
      ],
      catalog: JSON.parse(JSON.stringify(DEFAULT_CATALOG)),
      announcement: Object.assign({}, DEFAULT_ANNOUNCEMENT),
      banners: JSON.parse(JSON.stringify(DEFAULT_BANNERS)),
      siteSettings: JSON.parse(JSON.stringify(DEFAULT_SITE_SETTINGS)),
      telegramBotToken: '',
      telegramChatId: '',
      telegramWebhookSecret: crypto.randomBytes(16).toString('hex'),
      smsWebhookSecret: crypto.randomBytes(16).toString('hex'),
      uddoktapay: {
        enabled: false,
        explicitlyDisabled: false,
        baseUrl: '',
        apiKey: ''
      },
      ucbot: {
        enabled: false,
        explicitlyDisabled: false,
        apiToken: '',
        shellCode: 'shell',
        shellUsername: '',
        shellPassword: '',
        shellAutocode: '',
        packageRules: {}
      }
    },
    users: {},
    recentWinners: [
      { id: 'seed-1', userName: 'Sakib', rewardTitle: '৳50 ভাউচার', timeLabel: '2m ago' },
      { id: 'seed-2', userName: 'Nabil', rewardTitle: '25% OFF', timeLabel: '5m ago' },
      { id: 'seed-3', userName: 'Tanvir', rewardTitle: '+35% Bonus', timeLabel: '9m ago' },
      { id: 'seed-4', userName: 'Rafi', rewardTitle: '৳100 Voucher', timeLabel: '14m ago' }
    ],
    spinsLog: [],
    ordersLog: [],
    walletDeposits: [],
    smsPayments: [],
    uddoktaPayments: [],
    unipinVault: [],
    activityLog: [],
    duplicateTrxBlockedCount: 0
  };
}

function loadDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      var d = defaultDb();
      fs.writeFileSync(DB_PATH, JSON.stringify(d, null, 2));
      return d;
    }
    var p = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    var def = defaultDb();
    p.config = Object.assign({}, def.config, p.config || {});
    p.config.regularWeights = Object.assign({}, def.config.regularWeights, p.config.regularWeights || {});
    p.config.goldenWeights = Object.assign({}, def.config.goldenWeights, p.config.goldenWeights || {});
    p.config.rules = Object.assign({}, def.config.rules, p.config.rules || {});
    p.config.paymentNumbers = Object.assign({}, def.config.paymentNumbers, p.config.paymentNumbers || {});
    p.config.support = Object.assign({}, def.config.support, p.config.support || {});
    if (typeof p.config.walletCashbackPercent !== 'number') p.config.walletCashbackPercent = def.config.walletCashbackPercent;
    if (!p.config.flashSale) p.config.flashSale = def.config.flashSale;
    if (!Array.isArray(p.config.promoCodes)) p.config.promoCodes = def.config.promoCodes;
    if (!p.config.catalog || !Array.isArray(p.config.catalog.games) || !Array.isArray(p.config.catalog.packages)) {
      p.config.catalog = def.config.catalog;
    } else {
      if (!p.config.catalog.games.some(function (g) { return g && g.id === 'guild-glory-bot'; })) {
        p.config.catalog.games.push(JSON.parse(JSON.stringify(DEFAULT_CATALOG.games.find(function (g) { return g.id === 'guild-glory-bot'; }))));
      }
      DEFAULT_CATALOG.packages.filter(function (pk) { return pk.gameId === 'guild-glory-bot'; }).forEach(function (pk) {
        if (!p.config.catalog.packages.some(function (ep) { return ep && ep.id === pk.id; })) {
          p.config.catalog.packages.push(JSON.parse(JSON.stringify(pk)));
        }
      });
    }
    p.users = p.users || {};
    Object.keys(p.users).forEach(function (k) {
      var u = p.users[k];
      if (typeof u.walletBalanceBdt !== 'number') u.walletBalanceBdt = 0;
      if (typeof u.lifetimeSpendBdt !== 'number') u.lifetimeSpendBdt = 0;
      if (!Array.isArray(u.walletRequests)) u.walletRequests = [];
      if (!Array.isArray(u.savedProfiles)) u.savedProfiles = [];
    });
    if (!Array.isArray(p.recentWinners) || !p.recentWinners.length) p.recentWinners = def.recentWinners;
    p.spinsLog = Array.isArray(p.spinsLog) ? p.spinsLog : [];
    p.ordersLog = Array.isArray(p.ordersLog) ? p.ordersLog : [];
    p.walletDeposits = Array.isArray(p.walletDeposits) ? p.walletDeposits : [];
    p.smsPayments = Array.isArray(p.smsPayments) ? p.smsPayments : [];
    p.uddoktaPayments = Array.isArray(p.uddoktaPayments) ? p.uddoktaPayments : [];
    p.unipinVault = Array.isArray(p.unipinVault) ? p.unipinVault : [];
    p.config.uddoktapay = Object.assign({ enabled: false, explicitlyDisabled: false, baseUrl: '', apiKey: '' }, p.config.uddoktapay || {});
    p.config.ucbot = Object.assign({
      enabled: false,
      explicitlyDisabled: false,
      apiToken: '',
      shellCode: 'shell',
      shellUsername: '',
      shellPassword: '',
      shellAutocode: '',
      packageRules: {}
    }, p.config.ucbot || {});
    if (typeof p.config.telegramWebhookSecret !== 'string' || p.config.telegramWebhookSecret.trim().length < 16) p.config.telegramWebhookSecret = def.config.telegramWebhookSecret;
    if (typeof p.config.smsWebhookSecret !== 'string' || p.config.smsWebhookSecret.trim().length < 8) p.config.smsWebhookSecret = def.config.smsWebhookSecret;
    p.activityLog = Array.isArray(p.activityLog) ? p.activityLog : [];
    p.duplicateTrxBlockedCount = Number(p.duplicateTrxBlockedCount || 0);
    p.config.announcement = Object.assign({}, DEFAULT_ANNOUNCEMENT, p.config.announcement || {});
    p.config.banners = (Array.isArray(p.config.banners) && p.config.banners.length) ? p.config.banners : JSON.parse(JSON.stringify(DEFAULT_BANNERS));
    var rawSs = (p.config.siteSettings && typeof p.config.siteSettings === 'object') ? p.config.siteSettings : {};
    p.config.siteSettings = Object.assign({}, DEFAULT_SITE_SETTINGS, rawSs);
    p.config.siteSettings.heroBanners = (Array.isArray(rawSs.heroBanners) && rawSs.heroBanners.length) ? rawSs.heroBanners : JSON.parse(JSON.stringify(DEFAULT_SITE_SETTINGS.heroBanners));
    p.config.siteSettings.productCards = (Array.isArray(rawSs.productCards) && rawSs.productCards.length) ? rawSs.productCards : JSON.parse(JSON.stringify(DEFAULT_SITE_SETTINGS.productCards));
    if (!p.config.siteSettings.productCards.some(function (pc) { return pc && pc.id === 'guild-glory-bot'; })) {
      p.config.siteSettings.productCards.splice(Math.max(0, p.config.siteSettings.productCards.length - 1), 0, { id: 'guild-glory-bot', title: 'Guild Glory Bot', imageUrl: 'guild-glory-bot.png' });
    }
    return p;
  } catch (e) {
    return defaultDb();
  }
}

var db = loadDb();

function saveDb(d) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(d, null, 2));
  } catch (e) {}
}

function genCode(prefix) {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var out = '';
  for (var i = 0; i < 5; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return (prefix || 'SPIN') + '-' + out;
}

function makeRefCode(name) {
  var clean = (name || 'CRZ').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 4) || 'CRZ';
  return clean + Math.floor(1000 + Math.random() * 9000);
}

function getOrCreateUser(identRaw, nameRaw, refBy) {
  var key = String(identRaw || '').trim().toLowerCase();
  var today = getTodayBD();
  var u = db.users[key];
  if (!u) {
    var validRef = null;
    if (refBy) {
      var target = String(refBy).trim().toUpperCase();
      Object.keys(db.users).forEach(function (k) {
        if (db.users[k].referralCode && db.users[k].referralCode.toUpperCase() === target && k !== key) {
          validRef = k;
        }
      });
    }
    var nm = (nameRaw || key.split('@')[0] || 'Player').trim();
    u = {
      identifier: key,
      name: nm,
      spins: 1,
      goldenSpins: 0,
      scratchers: 0,
      vipMultiplier: 1,
      totalSpinsPerformed: 0,
      walletBalanceBdt: 0,
      lifetimeSpendBdt: 0,
      lastSpinDate: null,
      lastDailyResetDate: today,
      streakCount: 0,
      streakLastDate: null,
      streakUnlockedDate: null,
      referralCode: makeRefCode(nm),
      referredBy: validRef,
      referredCount: 0,
      referralBonusEarned: 0,
      firstOrderCompleted: false,
      boxes: [],
      offers: [],
      orders: [],
      walletRequests: [],
      savedProfiles: [],
      spinHistory: [],
      stockWatchlist: []
    };
    db.users[key] = u;
  } else {
    if (nameRaw && nameRaw.trim()) u.name = nameRaw.trim();
    if (u.lastDailyResetDate !== today) {
      if (u.lastSpinDate !== today) u.spins = Math.max(1, u.spins);
      u.lastDailyResetDate = today;
    }
  }
  return u;
}

function buildOffer(params) {
  var rules = db.config.rules;
  var isBig = (params.rewardType === 'percent_discount' && params.value >= rules.bigPercentThreshold) ||
              (params.rewardType === 'flat_discount' && params.value >= rules.bigFlatThreshold);
  return {
    id: 'off-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    code: params.code,
    title: params.title,
    description: params.description,
    rewardType: params.rewardType,
    value: params.value,
    wonAt: formatTimeBD(),
    source: params.source,
    used: false,
    minOrderBdt: isBig ? rules.minOrderBdt : 0,
    maxDiscountBdt: (isBig && params.rewardType !== 'bonus_percent') ? rules.maxDiscountBdt : 0,
    expiresAt: Date.now() + Math.max(1, rules.expiryHours) * 3600000
  };
}

function buildLeaderboard() {
  var realUsers = Object.keys(db.users).map(function (k) { return db.users[k]; });
  var seedBuyers = [
    { name: 'Sakib', vipRank: 'Gold', metricValue: 6450 },
    { name: 'Nabil', vipRank: 'Gold', metricValue: 3820 },
    { name: 'Tanvir', vipRank: 'Silver', metricValue: 1940 },
    { name: 'Rafi', vipRank: 'Silver', metricValue: 1250 }
  ];
  var seedRefs = [
    { name: 'Rafi', vipRank: 'Gold', metricValue: 9 },
    { name: 'Arif', vipRank: 'Silver', metricValue: 6 },
    { name: 'Fahim', vipRank: 'Silver', metricValue: 4 },
    { name: 'Siam', vipRank: 'Bronze', metricValue: 3 }
  ];

  var userBuyers = realUsers
    .filter(function (u) { return (u.lifetimeSpendBdt || 0) > 0; })
    .map(function (u) {
      return {
        name: u.name.split(' ')[0] || u.name,
        vipRank: getVipSpendStatus(u.lifetimeSpendBdt || 0).rank,
        metricValue: u.lifetimeSpendBdt || 0
      };
    });

  var userRefs = realUsers
    .filter(function (u) { return (u.referredCount || 0) > 0; })
    .map(function (u) {
      return {
        name: u.name.split(' ')[0] || u.name,
        vipRank: getVipSpendStatus(u.lifetimeSpendBdt || 0).rank,
        metricValue: u.referredCount || 0
      };
    });

  return {
    topBuyers: userBuyers.concat(seedBuyers).sort(function (a, b) { return b.metricValue - a.metricValue; }).slice(0, 5),
    topReferrers: userRefs.concat(seedRefs).sort(function (a, b) { return b.metricValue - a.metricValue; }).slice(0, 5)
  };
}


var SEED_PUBLIC_ORDERS = [
  { id: "ro-seed-1", customerName: "Shsbj", packageLabel: "115 Diamond", finalPrice: 79, status: "Done" },
  { id: "ro-seed-2", customerName: "asadul islam", packageLabel: "Weekly", finalPrice: 158, status: "Done" },
  { id: "ro-seed-3", customerName: "MR RADUWAN FF RX", packageLabel: "25 Diamond", finalPrice: 22, status: "Done" },
  { id: "ro-seed-4", customerName: "Sp Ff", packageLabel: "505 Diamond", finalPrice: 336, status: "Done" },
  { id: "ro-seed-5", customerName: "Md Sohel Rana", packageLabel: "50 Diamond", finalPrice: 37, status: "Done" },
  { id: "ro-seed-6", customerName: "nayeem Ahmed", packageLabel: "Level Up Package - Level 6", finalPrice: 40, status: "In Progress" },
  { id: "ro-seed-7", customerName: "Shamim Khan", packageLabel: "850 Diamond", finalPrice: 558, status: "Done" },
  { id: "ro-seed-8", customerName: "Bdudu Hdudud", packageLabel: "115 Diamond", finalPrice: 79, status: "Done" },
  { id: "ro-seed-9", customerName: "Borno Hasan", packageLabel: "Level Up Package - Level 25", finalPrice: 75, status: "In Progress" },
  { id: "ro-seed-10", customerName: "Sajjad Vai", packageLabel: "240 Diamond", finalPrice: 158, status: "Done" }
];
function buildRecentPublicOrders() {
  var real = [];
  Object.keys(db.users).forEach(function (k) {
    var u = db.users[k];
    (u.orders || []).forEach(function (o) {
      if (!o || o.status === "Rejected") return;
      real.push({
        id: o.id,
        customerName: u.name || "Player",
        packageLabel: o.packageLabel,
        finalPrice: o.finalPrice,
        status: o.status === "Completed" ? "Done" : "In Progress",
        createdAt: o.createdAt
      });
    });
  });
  real.sort(function (a, b) {
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });
  return real.concat(SEED_PUBLIC_ORDERS).slice(0, 10);
}

function evaluatePromoCode(codeRaw, basePrice) {
  var clean = String(codeRaw || '').trim().toUpperCase();
  if (!clean) return { ok: false, discount: 0, error: 'প্রোমো কোড লিখুন।' };
  var promo = (db.config.promoCodes || []).find(function (p) { return p.code.toUpperCase() === clean; });
  if (!promo || !promo.active) return { ok: false, discount: 0, error: 'ভুল বা নিষ্ক্রিয় প্রোমো কোড!' };
  if (promo.maxUses > 0 && promo.usedCount >= promo.maxUses) {
    return { ok: false, discount: 0, error: 'এই প্রোমো কোডের ব্যবহার সীমা শেষ হয়ে গেছে।' };
  }
  if (promo.minOrderBdt > 0 && basePrice < promo.minOrderBdt) {
    return { ok: false, discount: 0, error: 'এই কোডের জন্য ন্যূনতম ৳' + promo.minOrderBdt + ' অর্ডার প্রয়োজন।' };
  }
  var disc = promo.discountType === 'percent' ? Math.round((basePrice * promo.value) / 100) : promo.value;
  if (promo.maxDiscountBdt > 0) disc = Math.min(disc, promo.maxDiscountBdt);
  disc = Math.min(disc, Math.max(0, basePrice - 10));
  return { ok: true, discount: disc, promo: promo };
}

function serializeUser(u) {
  var today = getTodayBD();
  return {
    todayDate: today,
    hasSpunToday: u.lastSpinDate === today,
    user: { name: u.name, identifier: u.identifier },
    state: {
      spins: u.spins,
      goldenSpins: u.goldenSpins,
      scratchers: u.scratchers,
      vipMultiplier: u.vipMultiplier,
      totalSpinsPerformed: u.totalSpinsPerformed,
      walletBalanceBdt: u.walletBalanceBdt || 0,
      lifetimeSpendBdt: u.lifetimeSpendBdt || 0,
      boxes: u.boxes,
      offers: u.offers,
      orders: u.orders,
      walletRequests: (u.walletRequests || []).slice(0, 10),
      savedProfiles: (u.savedProfiles || []).slice(0, 15),
      spinHistory: u.spinHistory,
      lastSpinDate: u.lastSpinDate,
      lastDailyResetDate: u.lastDailyResetDate,
      stockWatchlist: Array.isArray(u.stockWatchlist) ? u.stockWatchlist : []
    },
    vipStatus: getVipSpendStatus(u.lifetimeSpendBdt || 0),
    streak: {
      streakCount: u.streakCount,
      streakLastDate: u.streakLastDate,
      streakUnlockedToday: u.streakUnlockedDate === today
    },
    referral: {
      referralCode: u.referralCode,
      referredBy: u.referredBy,
      referredCount: u.referredCount,
      referralBonusEarned: u.referralBonusEarned,
      firstOrderBonusPending: Boolean(u.referredBy && !u.firstOrderCompleted)
    },
    recentWinners: db.recentWinners.slice(0, 12),
    recentOrders: buildRecentPublicOrders(),
    rules: db.config.rules,
    paymentNumbers: db.config.paymentNumbers,
    support: db.config.support,
    walletCashbackPercent: db.config.walletCashbackPercent,
    flashSale: db.config.flashSale,
    catalog: db.config.catalog || DEFAULT_CATALOG,
    announcement: db.config.announcement || DEFAULT_ANNOUNCEMENT,
    banners: db.config.banners || DEFAULT_BANNERS,
    siteSettings: db.config.siteSettings || DEFAULT_SITE_SETTINGS,
    uddoktapayEnabled: isUddoktaReady(db),
    leaderboard: buildLeaderboard()
  };
}

function orderInlineMarkup(orderId) {
  return {
    inline_keyboard: [[
      { text: '✅ Complete', callback_data: 'ord:complete:' + orderId },
      { text: '❌ Reject', callback_data: 'ord:reject:' + orderId }
    ]]
  };
}

function depositInlineMarkup(depositId) {
  return {
    inline_keyboard: [[
      { text: '✅ Approve', callback_data: 'dep:approve:' + depositId },
      { text: '❌ Reject', callback_data: 'dep:reject:' + depositId }
    ]]
  };
}

function getTelegramCreds(d) {
  return {
    token: String((d && d.config && d.config.telegramBotToken) || process.env.TELEGRAM_BOT_TOKEN || '').trim(),
    chatId: String((d && d.config && d.config.telegramChatId) || process.env.TELEGRAM_CHAT_ID || '').trim()
  };
}

async function sendTelegram(text, replyMarkup) {
  var creds = getTelegramCreds(db);
  if (!creds.token || !creds.chatId) return { ok: false, error: 'Telegram Bot Token বা Chat ID সেট করা নেই।' };
  try {
    var payload = { chat_id: creds.chatId, text: text, parse_mode: 'HTML' };
    if (replyMarkup) payload.reply_markup = replyMarkup;
    var r = await fetch('https://api.telegram.org/bot' + creds.token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    var j = await r.json();
    if (!r.ok || !j.ok) return { ok: false, error: j.description || ('HTTP ' + r.status) };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

function applyOrderStatusUpdate(d, orderId, status, actor) {
  var logOrd = d.ordersLog.find(function (o) { return o.id === orderId; });
  if (!logOrd) return { ok: false, error: 'ORDER_NOT_FOUND' };
  var prevStatus = logOrd.status || 'Pending';
  logOrd.status = status;
  var owner = d.users[String(logOrd.userIdentifier || '').toLowerCase()];
  if (owner) {
    var uOrd = (owner.orders || []).find(function (o) { return o.id === orderId; });
    if (uOrd) uOrd.status = status;
  }
  logActivity(d, 'Order ' + status, 'Order ' + logOrd.id + ' (' + prevStatus + ' → ' + status + ')', status === 'Rejected' ? 'warning' : 'success', actor || 'Admin');
  saveDb(d);
  return { ok: true, order: logOrd };
}

function applyDepositActionUpdate(d, depositId, action, actor) {
  var dep = d.walletDeposits.find(function (x) { return x.id === depositId; });
  if (!dep) return { ok: false, error: 'DEPOSIT_NOT_FOUND' };
  if (dep.status !== 'Pending') return { ok: false, error: 'ALREADY_PROCESSED', deposit: dep };
  dep.status = action;
  var owner = d.users[String(dep.userIdentifier || '').toLowerCase()];
  if (owner) {
    if (action === 'Approved') {
      owner.walletBalanceBdt = (owner.walletBalanceBdt || 0) + dep.amountBdt;
    }
    var rItem = (owner.walletRequests || []).find(function (r) { return r.id === depositId; });
    if (rItem) rItem.status = action;
  }
  logActivity(d, 'Wallet ' + action, 'Deposit ' + dep.id + ' (৳' + dep.amountBdt + ' · TrxID ' + dep.trxId + ') ' + action, action === 'Rejected' ? 'warning' : 'success', actor || 'Admin');
  saveDb(d);
  return { ok: true, deposit: dep };
}

function adminKey() {
  return (process.env.ADMIN_PASSKEY || 'crazy24admin').trim();
}

function isAdmin(req) {
  return (req.header('x-admin-key') || '').trim() === adminKey();
}

app.get('/api/health', function (req, res) {
  res.json({ ok: true, todayDate: getTodayBD() });
});

app.get('/api/public/feed', function (req, res) {
  res.json({
    recentWinners: db.recentWinners.slice(0, 12),
    recentOrders: buildRecentPublicOrders(),
    config: {
      regularWeights: db.config.regularWeights,
      goldenWeights: db.config.goldenWeights,
      rules: db.config.rules
    },
    paymentNumbers: db.config.paymentNumbers,
    support: db.config.support,
    walletCashbackPercent: db.config.walletCashbackPercent,
    flashSale: db.config.flashSale,
    catalog: db.config.catalog || DEFAULT_CATALOG,
    announcement: db.config.announcement || DEFAULT_ANNOUNCEMENT,
    banners: db.config.banners || DEFAULT_BANNERS,
    siteSettings: db.config.siteSettings || DEFAULT_SITE_SETTINGS,
    uddoktapayEnabled: isUddoktaReady(db),
    leaderboard: buildLeaderboard()
  });
});

app.post('/api/promo/validate', function (req, res) {
  var b = req.body || {};
  var result = evaluatePromoCode(b.code || '', Math.max(10, Number(b.basePrice || 0)));
  if (!result.ok || !result.promo) {
    return res.status(400).json({ ok: false, error: result.error || 'INVALID_PROMO' });
  }
  res.json({
    ok: true,
    code: result.promo.code,
    discountType: result.promo.discountType,
    value: result.promo.value,
    minOrderBdt: result.promo.minOrderBdt,
    maxDiscountBdt: result.promo.maxDiscountBdt,
    discountSaved: result.discount
  });
});

app.post('/api/auth/session', function (req, res) {
  var b = req.body || {};
  if (!b.identifier || !String(b.identifier).trim()) {
    return res.status(400).json({ error: 'IDENTIFIER_REQUIRED' });
  }
  var u = getOrCreateUser(b.identifier, b.name, b.referredBy);
  saveDb(db);
  res.json(serializeUser(u));
});

app.get('/api/user/state', function (req, res) {
  var ident = String(req.query.identifier || '').trim();
  if (!ident) return res.status(400).json({ error: 'IDENTIFIER_REQUIRED' });
  var u = getOrCreateUser(ident);
  saveDb(db);
  res.json(serializeUser(u));
});

app.post('/api/wallet/deposit', async function (req, res) {
  var b = req.body || {};
  if (!b.identifier || !b.senderNumber || !String(b.senderNumber).trim() || !b.trxId || !String(b.trxId).trim()) {
    return res.status(400).json({ error: 'Please provide Sender Number and TrxID.' });
  }
  var trxClean = normalizeTrxId(b.trxId);
  var dup = findDuplicateTrxId(db, trxClean);
  if (dup) {
    logActivity(
      db,
      'Duplicate TrxID Blocked',
      'Wallet deposit by ' + b.identifier + ' rejected — TrxID ' + trxClean + ' already used in ' + (dup.type === 'order' ? 'Order' : 'Deposit') + ' ' + dup.refId,
      'danger',
      'Security Guard'
    );
    saveDb(db);
    return res.status(409).json({
      error: 'Duplicate TrxID! "' + trxClean + '" has already been used in ' + (dup.type === 'order' ? 'Order' : 'Deposit') + ' ' + dup.refId + '.'
    });
  }
  var amount = Math.max(20, Math.round(Number(b.amountBdt || 0)));
  var u = getOrCreateUser(b.identifier);
  var cleanProof = sanitizeScreenshot(b.screenshotUrl);
  if (!Array.isArray(db.smsPayments)) db.smsPayments = [];
  var matchingSms = db.smsPayments.find(function (s) { return s.status === 'Unused' && s.trxId === trxClean; });
  var exactSmsMatch = Boolean(matchingSms) && Math.round(Number(matchingSms.amountBdt)) === Math.round(amount);

  var dep = {
    id: 'DEP-' + Math.floor(100000 + Math.random() * 900000),
    userIdentifier: u.identifier,
    userName: u.name,
    method: b.method || 'bKash',
    amountBdt: amount,
    senderNumber: String(b.senderNumber).trim(),
    trxId: trxClean,
    screenshotUrl: cleanProof,
    status: exactSmsMatch ? 'Approved' : 'Pending',
    autoMatched: exactSmsMatch ? true : undefined,
    createdAt: getTodayBD() + ' ' + formatTimeBD()
  };
  if (exactSmsMatch && matchingSms) {
    u.walletBalanceBdt = (u.walletBalanceBdt || 0) + amount;
    matchingSms.status = 'Matched';
    matchingSms.matchedRefId = dep.id;
    logActivity(db, 'Auto-Approved via SMS', dep.id + ' · ৳' + dep.amountBdt + ' (' + matchingSms.provider + ', TrxID: ' + trxClean + ') instantly matched & credited to ' + u.name, 'success', 'SMS Auto-Matcher');
  } else if (matchingSms && !exactSmsMatch) {
    logActivity(db, 'SMS Amount Mismatch', dep.id + ' claimed ৳' + amount + ' for TrxID ' + trxClean + ', but SMS recorded ৳' + matchingSms.amountBdt + '. Held as Pending.', 'warning', 'Security Guard');
  }

  u.walletRequests = [dep].concat(u.walletRequests || []).slice(0, 15);
  db.walletDeposits.unshift(dep);
  db.walletDeposits = db.walletDeposits.slice(0, 100);
  saveDb(db);
  await sendTelegram(
    exactSmsMatch
      ? ('🤖 <b>Instant Auto-Approved Wallet Deposit!</b>\n🆔 ID: <code>' + dep.id + '</code>\n👤 User: ' + u.name + ' (' + u.identifier + ')\n💰 Amount: <b>৳' + dep.amountBdt + '</b> (' + dep.method + ')\n🧾 TrxID: <code>' + dep.trxId + '</code>')
      : ('💳 <b>New Wallet Add-Money Request!</b>\n' +
        '🆔 ID: <code>' + dep.id + '</code>\n' +
        '👤 User: ' + u.name + ' (' + u.identifier + ')\n' +
        '💰 Amount: <b>৳' + dep.amountBdt + '</b> (' + dep.method + ')\n' +
        '📱 Sender: <code>' + dep.senderNumber + '</code>\n' +
        '🧾 TrxID: <code>' + dep.trxId + '</code>' + (cleanProof ? '\n📸 Screenshot Proof Attached' : '') + '\n' +
        '⏳ Status: Pending Admin Approval'),
    exactSmsMatch ? undefined : depositInlineMarkup(dep.id)
  );
  res.json(Object.assign({ autoApproved: exactSmsMatch, deposit: dep }, serializeUser(u)));
});

app.post('/api/watchlist/toggle', function (req, res) {
  var b = req.body || {};
  if (!b.identifier || !b.packageId) return res.status(400).json({ error: 'INVALID_REQUEST' });
  var u = getOrCreateUser(b.identifier);
  var list = Array.isArray(u.stockWatchlist) ? u.stockWatchlist.slice() : [];
  var idx = list.indexOf(b.packageId);
  if (idx >= 0) list.splice(idx, 1);
  else list.push(b.packageId);
  u.stockWatchlist = list;
  saveDb(db);
  res.json(Object.assign({ stockWatchlist: u.stockWatchlist }, serializeUser(u)));
});

app.post('/api/orders/support', async function (req, res) {
  var b = req.body || {};
  var cleanMsg = String(b.message || '').trim().slice(0, 600);
  if (!b.identifier || !b.orderId || !cleanMsg) {
    return res.status(400).json({ error: 'Please enter a message.' });
  }
  var u = getOrCreateUser(b.identifier);
  var uOrd = (u.orders || []).find(function (o) { return o.id === b.orderId; });
  var logOrd = db.ordersLog.find(function (o) { return o.id === b.orderId && o.userIdentifier === u.identifier; });
  if (!uOrd && !logOrd) return res.status(404).json({ error: 'Order not found.' });
  var msgObj = {
    id: 'MSG-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
    sender: 'user',
    text: cleanMsg,
    createdAt: formatTimeBD()
  };
  if (uOrd) {
    uOrd.supportMessages = (uOrd.supportMessages || []).concat([msgObj]).slice(-30);
  }
  if (logOrd) {
    logOrd.supportMessages = (logOrd.supportMessages || []).concat([msgObj]).slice(-30);
  }
  saveDb(db);
  await sendTelegram(
    '💬 <b>Order Support Message!</b>\n' +
    '🆔 Order: <code>' + b.orderId + '</code>\n' +
    '👤 User: ' + u.name + ' (' + u.identifier + ')\n' +
    '📩 Message: ' + cleanMsg
  );
  res.json(Object.assign({ message: msgObj }, serializeUser(u)));
});

app.post('/api/spin', function (req, res) {
  var b = req.body || {};
  if (!b.identifier) return res.status(401).json({ error: 'SIGN_IN_REQUIRED' });
  var u = getOrCreateUser(b.identifier);
  var today = getTodayBD();
  var yest = getYesterdayBD();

  if (u.lastSpinDate === today) {
    return res.status(403).json(Object.assign({ error: 'DAILY_LIMIT_REACHED' }, serializeUser(u)));
  }

  var useGold = Boolean(b.isGolden);
  if (useGold ? u.goldenSpins <= 0 : u.spins <= 0) {
    return res.status(400).json({ error: 'NO_SPINS_AVAILABLE' });
  }

  var wedges = useGold ? GOLDEN_WEDGES : REGULAR_WEDGES;
  var wMap = useGold ? db.config.goldenWeights : db.config.regularWeights;
  var weights = wedges.map(function (w) {
    var val = Number(wMap[w.id]);
    return (isFinite(val) && val >= 0) ? val : w.weight;
  });
  var totalW = weights.reduce(function (a, c) { return a + c; }, 0);
  var winIdx = 0;
  if (totalW > 0) {
    var r = Math.random() * totalW;
    for (var i = 0; i < weights.length; i++) {
      r -= weights[i];
      if (r <= 0) { winIdx = i; break; }
    }
  }
  var wedge = wedges[winIdx];

  if (useGold) u.goldenSpins = Math.max(0, u.goldenSpins - 1);
  else u.spins = Math.max(0, u.spins - 1);

  u.totalSpinsPerformed += 1;
  u.lastSpinDate = today;
  u.lastDailyResetDate = today;

  if (u.streakLastDate === yest) u.streakCount = u.streakCount >= 7 ? 1 : u.streakCount + 1;
  else if (u.streakLastDate !== today) u.streakCount = 1;
  u.streakLastDate = today;

  var streakUnlocked = false;
  if (u.streakCount === 7 && u.streakUnlockedDate !== today) {
    u.streakUnlockedDate = today;
    u.goldenSpins += 1;
    u.boxes.unshift({ id: 'box-streak-' + Date.now(), tier: 'Legendary Box', wonAt: formatTimeBD(), opened: false });
    streakUnlocked = true;
  }

  var src = useGold ? 'Golden Spin' : 'Spin Wheel';
  u.spinHistory = [{ id: 'h-' + Date.now(), timestamp: formatTimeBD(), rewardTitle: wedge.title, rewardType: wedge.rewardType, source: src }].concat(u.spinHistory).slice(0, 5);

  var offer = null;
  var box = null;
  var scratchGranted = false;
  if (wedge.rewardType === 'scratcher') {
    u.scratchers += wedge.value;
    scratchGranted = true;
  } else if (wedge.rewardType === 'mystery_box') {
    var tier = wedge.value >= 3 ? 'Legendary Box' : (wedge.value === 2 ? 'Epic Box' : 'Rare Box');
    box = { id: 'box-' + Date.now(), tier: tier, wonAt: formatTimeBD(), opened: false };
    u.boxes.unshift(box);
  } else {
    offer = buildOffer({
      code: genCode(useGold ? 'GOLD' : 'SPIN'),
      title: wedge.title,
      description: wedge.description,
      rewardType: wedge.rewardType,
      value: wedge.value,
      source: src
    });
    u.offers.unshift(offer);
  }

  db.recentWinners.unshift({ id: 'win-' + Date.now(), userName: u.name.split(' ')[0] || u.name, rewardTitle: wedge.title, timeLabel: 'Just now' });
  db.recentWinners = db.recentWinners.slice(0, 14);
  db.spinsLog.unshift({ id: 'slog-' + Date.now(), userName: u.name, userIdentifier: u.identifier, rewardTitle: wedge.title, code: offer ? offer.code : '', source: src, createdAt: today + ' ' + formatTimeBD() });
  db.spinsLog = db.spinsLog.slice(0, 100);
  saveDb(db);

  res.json(Object.assign({ winningIndex: winIdx, wedge: wedge, offer: offer, box: box, scratcherGranted: scratchGranted, streakUnlocked: streakUnlocked }, serializeUser(u)));
});

app.post('/api/scratch', function (req, res) {
  var b = req.body || {};
  if (!b.identifier || !b.reward) return res.status(400).json({ error: 'INVALID_REQUEST' });
  var u = getOrCreateUser(b.identifier);
  if (u.scratchers <= 0) return res.status(400).json({ error: 'NO_SCRATCHERS' });
  u.scratchers -= 1;
  var offer = buildOffer({
    code: genCode('SCRATCH'),
    title: b.reward.title,
    description: b.reward.description,
    rewardType: b.reward.rewardType,
    value: b.reward.value,
    source: 'Scratch Card'
  });
  u.offers.unshift(offer);
  db.recentWinners.unshift({ id: 'win-' + Date.now(), userName: u.name.split(' ')[0] || u.name, rewardTitle: offer.title, timeLabel: 'Just now' });
  db.recentWinners = db.recentWinners.slice(0, 14);
  db.spinsLog.unshift({ id: 'slog-' + Date.now(), userName: u.name, userIdentifier: u.identifier, rewardTitle: offer.title, code: offer.code, source: 'Scratch Card', createdAt: getTodayBD() + ' ' + formatTimeBD() });
  saveDb(db);
  res.json(Object.assign({ offer: offer }, serializeUser(u)));
});

app.post('/api/box/open', function (req, res) {
  var b = req.body || {};
  if (!b.identifier || !b.boxId) return res.status(400).json({ error: 'INVALID_REQUEST' });
  var u = getOrCreateUser(b.identifier);
  var box = u.boxes.find(function (x) { return x.id === b.boxId && !x.opened; });
  if (!box) return res.status(404).json({ error: 'BOX_NOT_FOUND' });

  var pool = box.tier === 'Legendary Box'
    ? [{ title: '75% Legendary Box Discount', description: 'Unlocked from Legendary Mystery Box!', rewardType: 'percent_discount', value: 75 },
       { title: '৳400 Mega Cash Voucher', description: 'Flat ৳400 off any Top-Up package!', rewardType: 'flat_discount', value: 400 }]
    : box.tier === 'Epic Box'
    ? [{ title: '45% Epic Box Discount', description: 'Unlocked from Epic Mystery Box!', rewardType: 'percent_discount', value: 45 },
       { title: '৳250 Epic Cash Voucher', description: 'Flat ৳250 off your next Top-Up!', rewardType: 'flat_discount', value: 250 }]
    : [{ title: '25% Rare Box Discount', description: 'Unlocked from Rare Mystery Box!', rewardType: 'percent_discount', value: 25 },
       { title: '+30% Bonus Top-Up', description: '30% extra currency unlocked from Rare Box!', rewardType: 'bonus_percent', value: 30 }];

  var picked = pool[Math.floor(Math.random() * pool.length)];
  var offer = buildOffer({ code: genCode('BOX'), title: picked.title, description: picked.description, rewardType: picked.rewardType, value: picked.value, source: 'Mystery Box' });
  box.opened = true;
  box.rewardTitle = offer.title;
  u.offers.unshift(offer);
  db.recentWinners.unshift({ id: 'win-' + Date.now(), userName: u.name.split(' ')[0] || u.name, rewardTitle: offer.title, timeLabel: 'Just now' });
  db.recentWinners = db.recentWinners.slice(0, 14);
  db.spinsLog.unshift({ id: 'slog-' + Date.now(), userName: u.name, userIdentifier: u.identifier, rewardTitle: offer.title, code: offer.code, source: box.tier, createdAt: getTodayBD() + ' ' + formatTimeBD() });
  saveDb(db);
  res.json(Object.assign({ offer: offer }, serializeUser(u)));
});


app.post('/api/user/profiles', function (req, res) {
  var b = req.body || {};
  if (!b.identifier || !b.gameId || !b.playerUid) {
    return res.status(400).json({ error: 'অসম্পূর্ণ প্রোফাইল তথ্য।' });
  }
  var chk = validatePlayerUid(b.gameId, b.playerUid);
  if (!chk.ok) return res.status(400).json({ error: chk.error });

  var u = getOrCreateUser(b.identifier);
  if (!Array.isArray(u.savedProfiles)) u.savedProfiles = [];
  var nick = String(b.nickname || '').trim().slice(0, 28) || 'Main ID';
  var existingIdx = u.savedProfiles.findIndex(function (p) {
    return p.gameId === b.gameId && p.playerUid === chk.uid;
  });
  var prof = {
    id: existingIdx >= 0 ? u.savedProfiles[existingIdx].id : ('uid-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5)),
    gameId: String(b.gameId),
    playerUid: chk.uid,
    nickname: nick,
    savedAt: formatTimeBD()
  };
  if (existingIdx >= 0) u.savedProfiles.splice(existingIdx, 1);
  u.savedProfiles.unshift(prof);
  u.savedProfiles = u.savedProfiles.slice(0, 15);
  saveDb(db);
  res.json(Object.assign({ profile: prof }, serializeUser(u)));
});

app.post('/api/user/profiles/delete', function (req, res) {
  var b = req.body || {};
  if (!b.identifier || !b.profileId) return res.status(400).json({ error: 'INVALID_REQUEST' });
  var u = getOrCreateUser(b.identifier);
  u.savedProfiles = (u.savedProfiles || []).filter(function (p) { return p.id !== b.profileId; });
  saveDb(db);
  res.json(serializeUser(u));
});

app.post('/api/orders', async function (req, res) {
  var b = req.body || {};
  if (!b.identifier || !b.playerUid || !b.originalPrice) return res.status(400).json({ error: 'INVALID_ORDER' });
  var method = b.paymentMethod || 'bKash';
  var isWallet = method === 'Wallet Pay';
  var trxClean = isWallet ? '' : normalizeTrxId(b.trxId);
  if (!isWallet && (!b.senderNumber || !String(b.senderNumber).trim() || !trxClean)) {
    return res.status(400).json({ error: 'Please enter Sender Number and TrxID.' });
  }
  if (!isWallet) {
    var dupOrd = findDuplicateTrxId(db, trxClean);
    if (dupOrd) {
      logActivity(
        db,
        'Duplicate TrxID Blocked',
        'Checkout order by ' + b.identifier + ' rejected — TrxID ' + trxClean + ' already used in ' + (dupOrd.type === 'order' ? 'Order' : 'Deposit') + ' ' + dupOrd.refId,
        'danger',
        'Security Guard'
      );
      saveDb(db);
      return res.status(409).json({
        error: 'Duplicate TrxID! "' + trxClean + '" has already been used in ' + (dupOrd.type === 'order' ? 'Order' : 'Deposit') + ' ' + dupOrd.refId + '.'
      });
    }
  }

  var cat = db.config.catalog || DEFAULT_CATALOG;
  var matchedPkg = b.packageId ? cat.packages.find(function (p) { return p.id === b.packageId; }) : null;
  var matchedGame = matchedPkg
    ? cat.games.find(function (g) { return g.id === matchedPkg.gameId; })
    : (b.gameId ? cat.games.find(function (g) { return g.id === b.gameId; }) : null);

  if (matchedGame && matchedGame.active === false) {
    return res.status(400).json({ error: matchedGame.name + ' বর্তমানে মেইনটেন্যান্সে আছে।' });
  }
  if (matchedPkg && matchedPkg.inStock === false) {
    return res.status(400).json({ error: matchedPkg.amountLabel + ' প্যাকেজটি বর্তমানে Out of Stock!' });
  }

  var uidCheck = validatePlayerUid((matchedGame && matchedGame.id) || b.gameId || 'uid-bd', b.playerUid);
  if (!uidCheck.ok) {
    return res.status(400).json({ error: uidCheck.error });
  }

  var u = getOrCreateUser(b.identifier);
  var basePrice = matchedPkg ? Math.max(10, Number(matchedPkg.priceBdt)) : Math.max(10, Number(b.originalPrice));
  var offerSaved = 0;
  var codeUsed = '';
  var bonusExtra = '';

  if (b.appliedOfferId) {
    var offer = u.offers.find(function (o) { return o.id === b.appliedOfferId && !o.used; });
    if (offer && (!offer.expiresAt || Date.now() < offer.expiresAt) && (!offer.minOrderBdt || basePrice >= offer.minOrderBdt)) {
      if (offer.rewardType === 'percent_discount') {
        offerSaved = Math.round((basePrice * offer.value) / 100);
        if (offer.maxDiscountBdt > 0) offerSaved = Math.min(offerSaved, offer.maxDiscountBdt);
      } else if (offer.rewardType === 'flat_discount') {
        offerSaved = offer.value;
        if (offer.maxDiscountBdt > 0) offerSaved = Math.min(offerSaved, offer.maxDiscountBdt);
      } else {
        bonusExtra = ' (+' + offer.value + '% Spin Bonus)';
      }
      offer.used = true;
      codeUsed = offer.code;
    }
  }

  var flashSaved = 0;
  var fsCfg = db.config.flashSale;
  if (fsCfg && fsCfg.active && fsCfg.extraPercent > 0 && (!fsCfg.endsAt || Date.now() < fsCfg.endsAt)) {
    flashSaved = Math.round((basePrice * fsCfg.extraPercent) / 100);
  }

  var vipStatus = getVipSpendStatus(u.lifetimeSpendBdt || 0);
  var vipSaved = vipStatus.discountPercent > 0 ? Math.round((basePrice * vipStatus.discountPercent) / 100) : 0;

  var promoSaved = 0;
  var promoCodeUsed = '';
  if (b.promoCode && String(b.promoCode).trim()) {
    var pEval = evaluatePromoCode(b.promoCode, basePrice);
    if (pEval.ok && pEval.promo) {
      promoSaved = pEval.discount;
      pEval.promo.usedCount += 1;
      promoCodeUsed = pEval.promo.code;
    }
  }

  var totalRaw = offerSaved + flashSaved + vipSaved + promoSaved;
  var saved = Math.min(Math.max(0, basePrice - 10), totalRaw);
  var finalPrice = Math.max(10, basePrice - saved);

  var cashbackEarned = 0;
  if (isWallet) {
    if ((u.walletBalanceBdt || 0) < finalPrice) {
      return res.status(400).json({ error: 'ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই! অনুগ্রহ করে Add Money করুন।' });
    }
    u.walletBalanceBdt = (u.walletBalanceBdt || 0) - finalPrice;
    var cbPct = Math.max(0, db.config.walletCashbackPercent || 0);
    cashbackEarned = Math.round((finalPrice * cbPct) / 100);
    u.walletBalanceBdt += cashbackEarned;
  }

  u.lifetimeSpendBdt = (u.lifetimeSpendBdt || 0) + finalPrice;
  u.spins += 1;
  u.goldenSpins += 1;

  if (!Array.isArray(db.smsPayments)) db.smsPayments = [];
  var matchingOrderSms = (!isWallet && trxClean) ? db.smsPayments.find(function (s) { return s.status === 'Unused' && s.trxId === trxClean; }) : null;
  var exactOrderSmsMatch = Boolean(matchingOrderSms) && Math.round(Number(matchingOrderSms.amountBdt)) === Math.round(finalPrice);

  var ord = {
    id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    packageId: (matchedPkg && matchedPkg.id) || b.packageId || undefined,
    userIdentifier: u.identifier,
    userName: u.name,
    gameName: b.gameName || 'Top-Up',
    packageLabel: (b.packageLabel || 'Bundle') + bonusExtra,
    playerUid: String(b.playerUid).trim(),
    originalPrice: basePrice,
    discountSaved: saved,
    vipDiscountSaved: vipSaved,
    promoDiscountSaved: promoSaved,
    flashDiscountSaved: flashSaved,
    finalPrice: finalPrice,
    appliedOfferCode: codeUsed || undefined,
    promoCodeUsed: promoCodeUsed || undefined,
    paymentMethod: method,
    senderNumber: isWallet ? undefined : String(b.senderNumber).trim(),
    trxId: isWallet ? undefined : trxClean,
    screenshotUrl: isWallet ? undefined : sanitizeScreenshot(b.screenshotUrl),
    status: (isWallet || exactOrderSmsMatch) ? 'Processing' : 'Pending',
    autoMatched: exactOrderSmsMatch ? true : undefined,
    cashbackEarned: cashbackEarned,
    supportMessages: [],
    createdAt: formatDateTimeBD()
  };
  if (exactOrderSmsMatch && matchingOrderSms) {
    matchingOrderSms.status = 'Matched';
    matchingOrderSms.matchedRefId = ord.id;
    logActivity(db, 'Order Verified via SMS', ord.id + ' · ৳' + ord.finalPrice + ' (' + matchingOrderSms.provider + ', TrxID: ' + trxClean + ') verified automatically via SMS', 'success', 'SMS Auto-Matcher');
  }

  if (b.saveProfile && matchedGame) {
    if (!Array.isArray(u.savedProfiles)) u.savedProfiles = [];
    var pNick = String(b.profileNickname || '').trim().slice(0, 28) || (matchedGame.name + ' ID');
    var eIdx = u.savedProfiles.findIndex(function (p) { return p.gameId === matchedGame.id && p.playerUid === uidCheck.uid; });
    var profObj = {
      id: eIdx >= 0 ? u.savedProfiles[eIdx].id : ('uid-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5)),
      gameId: matchedGame.id,
      playerUid: uidCheck.uid,
      nickname: pNick,
      savedAt: formatTimeBD()
    };
    if (eIdx >= 0) u.savedProfiles.splice(eIdx, 1);
    u.savedProfiles.unshift(profObj);
    u.savedProfiles = u.savedProfiles.slice(0, 15);
  }

  u.orders.unshift(ord);
  u.orders = u.orders.slice(0, 20);

  var refRewarded = false;
  if (!u.firstOrderCompleted) {
    u.firstOrderCompleted = true;
    if (u.referredBy && db.users[u.referredBy]) {
      var ref = db.users[u.referredBy];
      ref.scratchers += 1; ref.goldenSpins += 1; ref.referredCount += 1; ref.referralBonusEarned += 1;
      u.scratchers += 1; u.goldenSpins += 1; u.referralBonusEarned += 1;
      refRewarded = true;
    }
  }

  db.ordersLog.unshift(ord);
  db.ordersLog = db.ordersLog.slice(0, 100);
  saveDb(db);

  var autoDelivered = false;
  var autoErr = '';
  if (ord.status === 'Processing') {
    var autoRes = await tryAutoDeliverOrder(db, ord, 'Order Auto-Delivery');
    autoDelivered = Boolean(autoRes.delivered);
    autoErr = autoRes.error || '';
  }

  var tgOk = true;
  if (!autoDelivered) {
    var tg = await sendTelegram(
      '💎 <b>New Crazy_top_up (24) Order!</b>' + (exactOrderSmsMatch ? ' 🤖 <b>[SMS Verified]</b>' : '') + '\n' +
      '🆔 Order: <code>' + ord.id + '</code> (' + ord.status + ')\n' +
      '👤 User: ' + u.name + ' (' + u.identifier + ')\n' +
      '🎮 Game: ' + ord.gameName + '\n' +
      '📦 Package: ' + ord.packageLabel + '\n' +
      '🎯 UID: <code>' + ord.playerUid + '</code>\n' +
      '💰 Base: ৳' + ord.originalPrice + '\n' +
      (codeUsed ? '🎟 Spin Offer: <code>' + codeUsed + '</code>\n' : '') +
      (promoCodeUsed ? '🏷 Promo Code: <code>' + promoCodeUsed + '</code> (-৳' + promoSaved + ')\n' : '') +
      (vipSaved > 0 ? '👑 VIP Discount: -৳' + vipSaved + '\n' : '') +
      '📉 Total Saved: -৳' + ord.discountSaved + '\n' +
      '✅ <b>Payable: ৳' + ord.finalPrice + '</b>\n' +
      '💳 Payment: ' + ord.paymentMethod +
      (ord.trxId ? '\n📱 Sender: <code>' + ord.senderNumber + '</code> | TrxID: <code>' + ord.trxId + '</code>' : '') +
      (cashbackEarned > 0 ? '\n💸 Wallet Cashback: +৳' + cashbackEarned : '') +
      ((autoErr && ord.autoDeliveryStatus === 'Failed') ? '\n⚠️ Auto-Delivery: ' + autoErr : ''),
      orderInlineMarkup(ord.id)
    );
    tgOk = tg.ok;
  }

  res.json(Object.assign({ order: ord, referralRewarded: refRewarded, telegramSent: tgOk }, serializeUser(u)));
});

app.post('/api/sms-webhook', async function (req, res) {
  if (!verifySmsWebhookSecret(req, db)) {
    logActivity(db, 'Unauthorized SMS Webhook', 'Rejected /api/sms-webhook call due to missing or invalid webhook secret.', 'warning', 'Security Guard');
    saveDb(db);
    return res.status(401).json({ ok: false, error: 'INVALID_WEBHOOK_SECRET' });
  }
  var parsed = parseMobileBankingSms(req.body || {});
  if (!parsed.ok) return res.status(400).json({ ok: false, error: parsed.error });
  var result = await ingestSmsPayment(db, parsed, 'Android SMS Forwarder');
  res.json({
    ok: true,
    duplicate: result.duplicate,
    matched: Boolean(result.matched),
    matchedRefId: result.matched ? result.matched.refId : null,
    sms: result.sms
  });
});

async function verifyAndFulfillUddoktaIntent(txRef, invoiceId, actor) {
  if (!Array.isArray(db.uddoktaPayments)) db.uddoktaPayments = [];
  var intent = db.uddoktaPayments.find(function (p) { return p.txRef === txRef; });
  if (!intent) return { ok: false, error: 'PAYMENT_SESSION_NOT_FOUND' };
  if (intent.status === 'Completed') {
    var owner = db.users[String(intent.userIdentifier || '').toLowerCase()];
    var existingOrd = (intent.kind === 'order' && intent.fulfilledRefId)
      ? ((owner && (owner.orders || []).find(function (o) { return o.id === intent.fulfilledRefId; })) ||
         db.ordersLog.find(function (o) { return o.id === intent.fulfilledRefId; }) || null)
      : null;
    var existingDep = (intent.kind === 'wallet' && intent.fulfilledRefId)
      ? (db.walletDeposits.find(function (d) { return d.id === intent.fulfilledRefId; }) || null)
      : null;
    return { ok: true, alreadyCompleted: true, intent: intent, order: existingOrd, deposit: existingDep };
  }
  if (intent.status !== 'Pending') {
    return { ok: false, error: 'PAYMENT_' + String(intent.status || 'ERROR').toUpperCase() };
  }

  var creds = getUddoktaCredentials(db);
  if (!creds.enabled || !creds.baseUrl || !creds.apiKey) {
    return { ok: false, error: 'UDDOKTAPAY_NOT_CONFIGURED' };
  }

  var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
  var verifyData = {};
  try {
    var resp = await fetch(creds.baseUrl + '/api/verify-payment', {
      method: 'POST',
      signal: ctrl ? ctrl.signal : undefined,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'RT-UDDOKTAPAY-API-KEY': creds.apiKey
      },
      body: JSON.stringify({ invoice_id: invoiceId })
    });
    verifyData = await resp.json().catch(function () { return {}; });
    if (!resp.ok) {
      return { ok: false, error: String(verifyData.message || ('VERIFY_HTTP_' + resp.status)) };
    }
  } catch (err) {
    return { ok: false, error: (err && err.message) ? err.message : 'UDDOKTAPAY_VERIFY_FAILED' };
  } finally {
    clearTimeout(timer);
  }

  var remoteStatus = String(verifyData.status || '').toUpperCase();
  if (remoteStatus === 'PENDING') {
    return { ok: false, pending: true, error: 'PAYMENT_STILL_PENDING', intent: intent };
  }
  if (remoteStatus !== 'COMPLETED') {
    intent.status = 'Failed';
    saveDb(db);
    return { ok: false, error: 'GATEWAY_STATUS_' + (remoteStatus || 'ERROR'), intent: intent };
  }

  var meta = (verifyData.metadata && typeof verifyData.metadata === 'object') ? verifyData.metadata : {};
  if (meta.tx_ref && String(meta.tx_ref) !== intent.txRef) {
    logActivity(db, 'UddoktaPay Metadata Mismatch', 'Rejected txRef ' + intent.txRef + ' — gateway returned ' + String(meta.tx_ref), 'danger', 'Security Guard');
    saveDb(db);
    return { ok: false, error: 'METADATA_MISMATCH' };
  }

  var paidAmt = Math.round(Number(verifyData.amount || 0));
  if (!isFinite(paidAmt) || paidAmt < Math.round(intent.amountBdt)) {
    logActivity(db, 'UddoktaPay Amount Mismatch', 'Rejected ' + intent.txRef + ' — expected ৳' + intent.amountBdt + ', verified ৳' + paidAmt, 'danger', 'Security Guard');
    saveDb(db);
    return { ok: false, error: 'AMOUNT_MISMATCH' };
  }

  var gatewayMethod = String(verifyData.payment_method || 'MFS').trim().slice(0, 40);
  var senderNum = String(verifyData.sender_number || '').trim().slice(0, 40);
  var trxClean = normalizeTrxId(String(verifyData.transaction_id || invoiceId || intent.txRef));
  if (trxClean) {
    var dup = findDuplicateTrxId(db, trxClean);
    if (dup) {
      logActivity(db, 'Duplicate TrxID Blocked', 'UddoktaPay ' + intent.txRef + ' blocked — TrxID ' + trxClean + ' already used in ' + dup.refId, 'danger', 'Security Guard');
      saveDb(db);
      return { ok: false, error: 'DUPLICATE_TRXID_' + dup.refId };
    }
  }

  // Atomic state transition before crediting wallet or creating order
  intent.status = 'Completed';
  intent.invoiceId = invoiceId;
  intent.paymentMethod = gatewayMethod;
  intent.senderNumber = senderNum;
  intent.transactionId = trxClean;
  intent.completedAt = getTodayBD() + ' ' + formatTimeBD();

  var u = getOrCreateUser(intent.userIdentifier, intent.userName);

  if (intent.kind === 'wallet') {
    u.walletBalanceBdt = (u.walletBalanceBdt || 0) + intent.amountBdt;
    var dep = {
      id: 'DEP-' + Math.floor(100000 + Math.random() * 900000),
      userIdentifier: u.identifier,
      userName: u.name,
      method: 'UddoktaPay (' + gatewayMethod + ')',
      amountBdt: intent.amountBdt,
      senderNumber: senderNum || gatewayMethod,
      trxId: trxClean,
      status: 'Approved',
      autoMatched: true,
      createdAt: getTodayBD() + ' ' + formatTimeBD()
    };
    intent.fulfilledRefId = dep.id;
    u.walletRequests = [dep].concat(u.walletRequests || []).slice(0, 15);
    db.walletDeposits.unshift(dep);
    db.walletDeposits = db.walletDeposits.slice(0, 100);
    logActivity(db, 'UddoktaPay Auto-Verified', 'Wallet ' + dep.id + ' · ৳' + dep.amountBdt + ' (' + gatewayMethod + ', TrxID: ' + trxClean + ') credited automatically to ' + u.name, 'success', actor);
    saveDb(db);
    await sendTelegram(
      '⚡ <b>UddoktaPay Instant Wallet Deposit!</b>\n🆔 ID: <code>' + dep.id + '</code>\n👤 User: ' + u.name + ' (' + u.identifier + ')\n💰 Amount: <b>৳' + dep.amountBdt + '</b> (' + gatewayMethod + ')\n📱 Sender: <code>' + dep.senderNumber + '</code>\n🧾 TrxID: <code>' + dep.trxId + '</code>'
    );
    return { ok: true, intent: intent, deposit: dep };
  }

  var draft = intent.orderDraft;
  if (!draft) {
    saveDb(db);
    return { ok: false, error: 'ORDER_DRAFT_MISSING' };
  }

  if (draft.appliedOfferId) {
    var offer = (u.offers || []).find(function (o) { return o.id === draft.appliedOfferId && !o.used; });
    if (offer) offer.used = true;
  }
  if (draft.promoCodeUsed) {
    var promo = (db.config.promoCodes || []).find(function (p) { return p.code.toUpperCase() === draft.promoCodeUsed.toUpperCase(); });
    if (promo) promo.usedCount = (promo.usedCount || 0) + 1;
  }

  u.lifetimeSpendBdt = (u.lifetimeSpendBdt || 0) + draft.finalPrice;
  u.spins += 1;
  u.goldenSpins += 1;

  var ord = {
    id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    packageId: draft.packageId,
    userIdentifier: u.identifier,
    userName: u.name,
    gameName: draft.gameName,
    packageLabel: draft.packageLabel + (draft.bonusExtra || ''),
    playerUid: draft.playerUid,
    originalPrice: draft.originalPrice,
    discountSaved: draft.discountSaved,
    vipDiscountSaved: draft.vipDiscountSaved || 0,
    promoDiscountSaved: draft.promoDiscountSaved || 0,
    flashDiscountSaved: draft.flashDiscountSaved || 0,
    finalPrice: draft.finalPrice,
    appliedOfferCode: draft.appliedOfferCode || undefined,
    promoCodeUsed: draft.promoCodeUsed || undefined,
    paymentMethod: 'UddoktaPay (' + gatewayMethod + ')',
    senderNumber: senderNum || gatewayMethod,
    trxId: trxClean,
    status: 'Processing',
    autoMatched: true,
    cashbackEarned: 0,
    supportMessages: [],
    createdAt: formatDateTimeBD()
  };
  intent.fulfilledRefId = ord.id;

  if (draft.saveProfile && draft.gameId) {
    if (!Array.isArray(u.savedProfiles)) u.savedProfiles = [];
    var pNick = String((draft.saveProfile && draft.saveProfile.nickname) || '').trim().slice(0, 28) || 'Main ID';
    var eIdx = u.savedProfiles.findIndex(function (p) { return p.gameId === draft.gameId && p.playerUid === ord.playerUid; });
    var profObj = {
      id: eIdx >= 0 ? u.savedProfiles[eIdx].id : ('uid-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5)),
      gameId: draft.gameId,
      playerUid: ord.playerUid,
      nickname: pNick,
      savedAt: formatTimeBD()
    };
    if (eIdx >= 0) u.savedProfiles.splice(eIdx, 1);
    u.savedProfiles.unshift(profObj);
    u.savedProfiles = u.savedProfiles.slice(0, 15);
  }

  u.orders.unshift(ord);
  u.orders = u.orders.slice(0, 20);

  if (!u.firstOrderCompleted) {
    u.firstOrderCompleted = true;
    if (u.referredBy && db.users[u.referredBy]) {
      var ref = db.users[u.referredBy];
      ref.scratchers += 1; ref.goldenSpins += 1; ref.referredCount += 1; ref.referralBonusEarned += 1;
      u.scratchers += 1; u.goldenSpins += 1; u.referralBonusEarned += 1;
    }
  }

  db.ordersLog.unshift(ord);
  db.ordersLog = db.ordersLog.slice(0, 100);
  logActivity(db, 'UddoktaPay Auto-Verified', 'Order ' + ord.id + ' · ৳' + ord.finalPrice + ' (' + gatewayMethod + ', TrxID: ' + trxClean + ') verified automatically for ' + u.name, 'success', actor);
  saveDb(db);

  var autoRes = await tryAutoDeliverOrder(db, ord, 'UddoktaPay + Auto-Delivery');
  if (!autoRes.delivered) {
    await sendTelegram(
      '⚡ <b>UddoktaPay Instant Verified Order!</b>\n🆔 Order: <code>' + ord.id + '</code> (' + ord.status + ')\n👤 User: ' + u.name + ' (' + u.identifier + ')\n🎮 Game: ' + ord.gameName + '\n📦 Package: ' + ord.packageLabel + '\n🎯 UID: <code>' + ord.playerUid + '</code>\n✅ <b>Paid: ৳' + ord.finalPrice + '</b> (' + gatewayMethod + ')\n📱 Sender: <code>' + ord.senderNumber + '</code> | TrxID: <code>' + ord.trxId + '</code>' +
      ((autoRes.error && ord.autoDeliveryStatus === 'Failed') ? ('\n⚠️ Auto-Delivery: ' + autoRes.error) : ''),
      orderInlineMarkup(ord.id)
    );
  }

  return { ok: true, intent: intent, order: ord };
}

app.post('/api/uddoktapay/create-charge', async function (req, res) {
  var creds = getUddoktaCredentials(db);
  if (!creds.enabled || !creds.baseUrl || !creds.apiKey) {
    return res.status(400).json({
      error: 'UddoktaPay গেটওয়ে এখনও সেটআপ করা হয়নি। Admin Panel → UddoktaPay Auto Gateway থেকে Base URL ও API Key সেট করুন।'
    });
  }

  var b = req.body || {};
  if (!b.identifier || !String(b.identifier).trim()) {
    return res.status(401).json({ error: 'অনুগ্রহ করে আগে Sign In করুন।' });
  }

  var kind = b.kind === 'wallet' ? 'wallet' : 'order';
  var u = getOrCreateUser(b.identifier);
  var returnHash = sanitizeReturnHash(b.returnHash);
  var chargeAmount = 0;
  var orderDraft;

  if (kind === 'wallet') {
    var amt = Math.round(Number(b.amountBdt || 0));
    if (!isFinite(amt) || amt < 20 || amt > 100000) {
      return res.status(400).json({ error: 'সর্বনিম্ন ৳২০ থেকে সর্বোচ্চ ৳১,০০,০০০ টাকা Add Money করা যাবে।' });
    }
    chargeAmount = amt;
  } else {
    if (!b.playerUid || !b.originalPrice) {
      return res.status(400).json({ error: 'অর্ডারের তথ্য সম্পূর্ণ নয়।' });
    }
    var cat = db.config.catalog || DEFAULT_CATALOG;
    var matchedPkg = b.packageId ? cat.packages.find(function (p) { return p.id === b.packageId; }) : null;
    var matchedGame = matchedPkg
      ? cat.games.find(function (g) { return g.id === matchedPkg.gameId; })
      : (b.gameId ? cat.games.find(function (g) { return g.id === b.gameId; }) : cat.games.find(function (g) { return g.name === b.gameName; }));

    if (matchedGame && matchedGame.active === false) {
      return res.status(400).json({ error: matchedGame.name + ' বর্তমানে মেইনটেন্যান্সে আছে।' });
    }
    if (matchedPkg && matchedPkg.inStock === false) {
      return res.status(400).json({ error: matchedPkg.amountLabel + ' প্যাকেজটি বর্তমানে Out of Stock!' });
    }
    var uidCheck = validatePlayerUid((matchedGame && matchedGame.id) || b.gameId || 'uid-bd', b.playerUid);
    if (!uidCheck.ok) {
      return res.status(400).json({ error: uidCheck.error });
    }

    var basePrice = matchedPkg ? Math.max(10, Number(matchedPkg.priceBdt)) : Math.max(10, Number(b.originalPrice));
    var offerSaved = 0;
    var codeUsed = '';
    var appliedOfferId = '';
    var bonusExtra = '';
    if (b.appliedOfferId) {
      var offer = (u.offers || []).find(function (o) { return o.id === b.appliedOfferId && !o.used; });
      if (offer && (!offer.expiresAt || Date.now() < offer.expiresAt) && (!offer.minOrderBdt || basePrice >= offer.minOrderBdt)) {
        if (offer.rewardType === 'percent_discount') {
          offerSaved = Math.round((basePrice * offer.value) / 100);
          if (offer.maxDiscountBdt > 0) offerSaved = Math.min(offerSaved, offer.maxDiscountBdt);
        } else if (offer.rewardType === 'flat_discount') {
          offerSaved = offer.value;
          if (offer.maxDiscountBdt > 0) offerSaved = Math.min(offerSaved, offer.maxDiscountBdt);
        } else {
          bonusExtra = ' (+' + offer.value + '% Spin Bonus)';
        }
        appliedOfferId = offer.id;
        codeUsed = offer.code;
      }
    }

    var flashSaved = 0;
    var fsCfg = db.config.flashSale;
    if (fsCfg && fsCfg.active && fsCfg.extraPercent > 0 && (!fsCfg.endsAt || Date.now() < fsCfg.endsAt)) {
      flashSaved = Math.round((basePrice * fsCfg.extraPercent) / 100);
    }

    var vipStatus = getVipSpendStatus(u.lifetimeSpendBdt || 0);
    var vipSaved = vipStatus.discountPercent > 0 ? Math.round((basePrice * vipStatus.discountPercent) / 100) : 0;

    var promoSaved = 0;
    var promoCodeUsed = '';
    if (b.promoCode && String(b.promoCode).trim()) {
      var pEval = evaluatePromoCode(b.promoCode, basePrice);
      if (pEval.ok && pEval.promo) {
        promoSaved = pEval.discount;
        promoCodeUsed = pEval.promo.code;
      }
    }

    var totalDiscount = Math.min(Math.max(0, basePrice - 10), offerSaved + flashSaved + vipSaved + promoSaved);
    var finalPrice = Math.max(10, basePrice - totalDiscount);
    chargeAmount = finalPrice;

    var saveProfObj = b.saveProfile === true
      ? { nickname: String(b.profileNickname || 'Main ID') }
      : (b.saveProfile && typeof b.saveProfile === 'object' ? b.saveProfile : undefined);

    orderDraft = {
      gameId: (matchedGame && matchedGame.id) || b.gameId,
      gameName: String((matchedGame && matchedGame.name) || b.gameName || 'Game Top-Up').trim(),
      packageId: (matchedPkg && matchedPkg.id) || b.packageId,
      packageLabel: String((matchedPkg && matchedPkg.amountLabel) || b.packageLabel || 'Package').trim(),
      playerUid: String(b.playerUid).trim(),
      originalPrice: basePrice,
      discountSaved: totalDiscount,
      vipDiscountSaved: vipSaved,
      promoDiscountSaved: promoSaved,
      flashDiscountSaved: flashSaved,
      finalPrice: finalPrice,
      bonusExtra: bonusExtra,
      appliedOfferId: appliedOfferId || undefined,
      appliedOfferCode: codeUsed || undefined,
      promoCodeUsed: promoCodeUsed || undefined,
      saveProfile: saveProfObj
    };
  }

  var txRef = 'UDP-' + crypto.randomBytes(6).toString('hex').toUpperCase();
  var origin = getSafeRequestOrigin(req);
  var custEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.identifier) ? u.identifier : 'player@crazytopup24.local';

  var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
  try {
    var resp = await fetch(creds.baseUrl + '/api/checkout-v2', {
      method: 'POST',
      signal: ctrl ? ctrl.signal : undefined,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'RT-UDDOKTAPAY-API-KEY': creds.apiKey
      },
      body: JSON.stringify({
        full_name: String(u.name || 'Player').slice(0, 60),
        email: custEmail,
        amount: String(chargeAmount),
        metadata: {
          tx_ref: txRef,
          kind: kind,
          identifier: u.identifier
        },
        redirect_url: origin + '/api/uddoktapay/callback/' + txRef,
        return_type: 'GET',
        cancel_url: origin + '/api/uddoktapay/cancel/' + txRef,
        webhook_url: origin + '/api/uddoktapay/webhook'
      })
    });
    var data = await resp.json().catch(function () { return {}; });
    if (!resp.ok || !data.payment_url) {
      logActivity(db, 'UddoktaPay Charge Failed', 'Checkout-v2 error for ' + u.identifier + ' (৳' + chargeAmount + '): ' + (data.message || ('HTTP ' + resp.status)), 'warning', 'UddoktaPay Gateway');
      saveDb(db);
      return res.status(502).json({
        error: data.message || 'UddoktaPay পেমেন্ট লিংক তৈরি করতে পারেনি। Base URL ও API Key যাচাই করুন।'
      });
    }

    if (!Array.isArray(db.uddoktaPayments)) db.uddoktaPayments = [];
    db.uddoktaPayments.unshift({
      txRef: txRef,
      kind: kind,
      userIdentifier: u.identifier,
      userName: u.name,
      amountBdt: chargeAmount,
      status: 'Pending',
      returnHash: returnHash,
      createdAtMs: Date.now(),
      orderDraft: orderDraft
    });
    db.uddoktaPayments = db.uddoktaPayments.slice(0, 300);
    saveDb(db);

    res.json({ ok: true, paymentUrl: data.payment_url, txRef: txRef, amountBdt: chargeAmount });
  } catch (err) {
    res.status(502).json({ error: 'UddoktaPay সংযোগ ব্যর্থ: ' + ((err && err.message) || 'Network error') });
  } finally {
    clearTimeout(timer);
  }
});

app.get('/api/uddoktapay/callback/:txRef', async function (req, res) {
  var txRef = String((req.params && req.params.txRef) || '').trim();
  var invoiceId = String((req.query && req.query.invoice_id) || '').trim();
  var intent = (db.uddoktaPayments || []).find(function (p) { return p.txRef === txRef; });
  var safeHash = sanitizeReturnHash(intent && intent.returnHash);

  if (!txRef || !invoiceId || !intent) {
    return res.redirect('/?uddokta=failed' + safeHash);
  }

  var result = await verifyAndFulfillUddoktaIntent(txRef, invoiceId, 'UddoktaPay Redirect');
  if (result.ok) {
    var refId = encodeURIComponent((result.intent && result.intent.fulfilledRefId) || '');
    return res.redirect('/?uddokta=success&kind=' + encodeURIComponent(intent.kind) + '&txRef=' + encodeURIComponent(txRef) + '&refId=' + refId + safeHash);
  }
  if (result.pending) {
    return res.redirect('/?uddokta=pending&txRef=' + encodeURIComponent(txRef) + safeHash);
  }
  return res.redirect('/?uddokta=failed&txRef=' + encodeURIComponent(txRef) + safeHash);
});

app.get('/api/uddoktapay/cancel/:txRef', function (req, res) {
  var txRef = String((req.params && req.params.txRef) || '').trim();
  var intent = (db.uddoktaPayments || []).find(function (p) { return p.txRef === txRef; });
  var safeHash = sanitizeReturnHash(intent && intent.returnHash);
  if (intent && intent.status === 'Pending') {
    intent.status = 'Cancelled';
    saveDb(db);
  }
  res.redirect('/?uddokta=cancelled' + safeHash);
});

app.post('/api/uddoktapay/webhook', async function (req, res) {
  var creds = getUddoktaCredentials(db);
  var hdrKey = String((req.headers && req.headers['rt-uddoktapay-api-key']) || '').trim();
  if (!creds.apiKey || !timingSafeEqualsStr(hdrKey, creds.apiKey)) {
    logActivity(db, 'Unauthorized UddoktaPay Webhook', 'Rejected /api/uddoktapay/webhook due to invalid RT-UDDOKTAPAY-API-KEY header.', 'warning', 'Security Guard');
    saveDb(db);
    return res.status(401).json({ ok: false, error: 'INVALID_API_KEY' });
  }

  var body = req.body || {};
  var invoiceId = String(body.invoice_id || '').trim();
  var txRef = String((body.metadata && body.metadata.tx_ref) || '').trim();
  if (!invoiceId || !txRef) {
    return res.status(400).json({ ok: false, error: 'MISSING_INVOICE_OR_TX_REF' });
  }

  var result = await verifyAndFulfillUddoktaIntent(txRef, invoiceId, 'UddoktaPay IPN Webhook');
  if (!result.ok && !result.pending) {
    return res.status(400).json({ ok: false, error: result.error || 'VERIFY_FAILED' });
  }
  res.json({
    ok: true,
    status: (result.intent && result.intent.status) || 'Pending',
    fulfilledRefId: (result.intent && result.intent.fulfilledRefId) || null
  });
});

app.get('/api/uddoktapay/status/:txRef', function (req, res) {
  var txRef = String((req.params && req.params.txRef) || '').trim();
  var intent = (db.uddoktaPayments || []).find(function (p) { return p.txRef === txRef; });
  if (!intent) return res.status(404).json({ error: 'NOT_FOUND' });
  var owner = db.users[String(intent.userIdentifier || '').toLowerCase()];
  var order = (intent.kind === 'order' && intent.fulfilledRefId)
    ? ((owner && (owner.orders || []).find(function (o) { return o.id === intent.fulfilledRefId; })) ||
       db.ordersLog.find(function (o) { return o.id === intent.fulfilledRefId; }) || null)
    : null;
  var deposit = (intent.kind === 'wallet' && intent.fulfilledRefId)
    ? (db.walletDeposits.find(function (d) { return d.id === intent.fulfilledRefId; }) || null)
    : null;
  res.json({
    txRef: intent.txRef,
    kind: intent.kind,
    status: intent.status,
    amountBdt: intent.amountBdt,
    fulfilledRefId: intent.fulfilledRefId || null,
    order: order,
    deposit: deposit
  });
});

app.post('/api/admin/login', function (req, res) {
  if (((req.body || {}).passkey || '').trim() === adminKey()) return res.json({ ok: true });
  res.status(401).json({ error: 'INVALID_PASSKEY' });
});

app.get('/api/admin/dashboard', function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var usersList = Object.keys(db.users).map(function (k) {
    var u = db.users[k];
    return {
      name: u.name,
      identifier: u.identifier,
      totalSpinsPerformed: u.totalSpinsPerformed,
      walletBalanceBdt: u.walletBalanceBdt || 0,
      lifetimeSpendBdt: u.lifetimeSpendBdt || 0,
      vipRank: getVipSpendStatus(u.lifetimeSpendBdt || 0).rank,
      lastSpinDate: u.lastSpinDate,
      streakCount: u.streakCount,
      referralCode: u.referralCode,
      referredCount: u.referredCount,
      offersCount: u.offers.length,
      usedOffersCount: u.offers.filter(function (o) { return o.used; }).length,
      ordersCount: u.orders.length
    };
  });
  res.json({
    config: buildSafeAdminConfig(db),
    unipinVault: sanitizeVaultForAdmin(db),
    regularWedges: REGULAR_WEDGES.map(function (w) { return { id: w.id, title: w.title, line1: w.line1, weight: db.config.regularWeights[w.id] != null ? db.config.regularWeights[w.id] : w.weight }; }),
    goldenWedges: GOLDEN_WEDGES.map(function (w) { return { id: w.id, title: w.title, line1: w.line1, weight: db.config.goldenWeights[w.id] != null ? db.config.goldenWeights[w.id] : w.weight }; }),
    stats: {
      totalUsers: usersList.length,
      totalSpins: db.spinsLog.length,
      totalOrders: db.ordersLog.length,
      totalDiscountGiven: db.ordersLog.reduce(function (a, o) { return a + (o.discountSaved || 0); }, 0),
      pendingDeposits: db.walletDeposits.filter(function (d) { return d.status === 'Pending'; }).length,
      blockedDuplicates: db.duplicateTrxBlockedCount || 0,
      smsReceivedCount: (db.smsPayments || []).length,
      smsMatchedCount: (db.smsPayments || []).filter(function (s) { return s.status === 'Matched'; }).length,
      uddoktapayCompletedCount: (db.uddoktaPayments || []).filter(function (p) { return p.status === 'Completed'; }).length,
      ucbotAutoDeliveredCount: db.ordersLog.filter(function (o) { return o.autoDeliveryStatus === 'Delivered'; }).length
    },
    users: usersList,
    spinsLog: db.spinsLog.slice(0, 40),
    ordersLog: db.ordersLog.slice(0, 50),
    walletDeposits: db.walletDeposits.slice(0, 50),
    smsPayments: (db.smsPayments || []).slice(0, 60),
    activityLog: (db.activityLog || []).slice(0, 60)
  });
});

app.post('/api/admin/config', function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var b = req.body || {};
  if (b.regularWeights) db.config.regularWeights = Object.assign({}, db.config.regularWeights, b.regularWeights);
  if (b.goldenWeights) db.config.goldenWeights = Object.assign({}, db.config.goldenWeights, b.goldenWeights);
  if (b.rules) db.config.rules = Object.assign({}, db.config.rules, b.rules);
  if (b.paymentNumbers) db.config.paymentNumbers = Object.assign({}, db.config.paymentNumbers, b.paymentNumbers);
  if (b.support) db.config.support = Object.assign({}, db.config.support, b.support);
  if (typeof b.walletCashbackPercent === 'number') {
    db.config.walletCashbackPercent = Math.max(0, Math.min(25, b.walletCashbackPercent));
  }
  if (b.flashSale) db.config.flashSale = Object.assign({}, db.config.flashSale, b.flashSale);
  if (Array.isArray(b.promoCodes)) db.config.promoCodes = b.promoCodes;
  if (b.catalog && Array.isArray(b.catalog.games) && Array.isArray(b.catalog.packages)) {
    db.config.catalog = {
      games: b.catalog.games.map(function (g) {
        return {
          id: String(g.id || '').trim() || ('game-' + Date.now()),
          name: String(g.name || 'Game').trim(),
          publisher: String(g.publisher || 'Official').trim(),
          currencyName: String(g.currencyName || 'Credits').trim(),
          uidLabel: String(g.uidLabel || 'Player UID').trim(),
          uidPlaceholder: String(g.uidPlaceholder || 'Enter UID').trim(),
          accentColor: g.accentColor || '#38bdf8',
          active: g.active !== false
        };
      }),
      packages: b.catalog.packages.map(function (pk) {
        return {
          id: String(pk.id || '').trim() || ('pkg-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5)),
          gameId: String(pk.gameId || ''),
          amountLabel: String(pk.amountLabel || 'Package').trim(),
          bonusLabel: pk.bonusLabel ? String(pk.bonusLabel).trim() : '',
          priceBdt: Math.max(10, Math.round(Number(pk.priceBdt) || 100)),
          popular: Boolean(pk.popular),
          inStock: pk.inStock !== false
        };
      })
    };
  }
  if (b.announcement && typeof b.announcement === 'object') {
    db.config.announcement = {
      active: Boolean(b.announcement.active),
      tagLabel: String(b.announcement.tagLabel || 'NOTICE').trim().slice(0, 20) || 'NOTICE',
      text: String(b.announcement.text || '').trim().slice(0, 260)
    };
  }
  if (Array.isArray(b.banners)) {
    db.config.banners = b.banners.slice(0, 8).map(function (sl, idx) {
      var acc = (sl.accent === 'emerald' || sl.accent === 'sky') ? sl.accent : 'gold';
      return {
        id: String(sl.id || '').trim() || ('ban-' + Date.now() + '-' + idx),
        badge: String(sl.badge || 'OFFER').trim().slice(0, 24),
        title: String(sl.title || 'Special Offer').trim().slice(0, 90),
        subtitle: String(sl.subtitle || '').trim().slice(0, 140),
        ctaLabel: String(sl.ctaLabel || 'Open').trim().slice(0, 24),
        ctaTarget: String(sl.ctaTarget || 'spin').trim().slice(0, 40),
        accent: acc,
        active: sl.active !== false
      };
    });
  }
  if (b.siteSettings && typeof b.siteSettings === 'object') {
    var s = b.siteSettings;
    var curSs = db.config.siteSettings || DEFAULT_SITE_SETTINGS;
    var cleanStr = function (v, max, fb) { return typeof v === 'string' ? v.trim().slice(0, max) : fb; };
    var cleanHex = function (v, fb) { return (typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v.trim())) ? v.trim().toLowerCase() : fb; };
    db.config.siteSettings = {
      siteName: cleanStr(s.siteName, 80, curSs.siteName) || DEFAULT_SITE_SETTINGS.siteName,
      logoUrl: (typeof s.logoUrl === 'string' && s.logoUrl.trim()) ? s.logoUrl.trim().slice(0, 1500000) : curSs.logoUrl,
      themeColor: cleanHex(s.themeColor, curSs.themeColor || '#d97706'),
      themeAccent: cleanHex(s.themeAccent, curSs.themeAccent || '#f59e0b'),
      heroBanners: Array.isArray(s.heroBanners)
        ? s.heroBanners.filter(function (hb) { return hb && typeof hb.imageUrl === 'string' && hb.imageUrl.trim(); }).slice(0, 12).map(function (hb, idx) {
            return {
              id: String(hb.id || ('hb-' + Date.now() + '-' + idx)),
              imageUrl: String(hb.imageUrl).trim().slice(0, 2500000),
              linkUrl: typeof hb.linkUrl === 'string' ? hb.linkUrl.trim().slice(0, 500) : '',
              alt: typeof hb.alt === 'string' ? hb.alt.trim().slice(0, 80) : ('Banner ' + (idx + 1)),
              active: hb.active !== false
            };
          })
        : curSs.heroBanners,
      popupActive: typeof s.popupActive === 'boolean' ? s.popupActive : curSs.popupActive,
      popupImageUrl: (typeof s.popupImageUrl === 'string' && s.popupImageUrl.trim()) ? s.popupImageUrl.trim().slice(0, 2000000) : curSs.popupImageUrl,
      popupText: typeof s.popupText === 'string' ? s.popupText.slice(0, 1000) : curSs.popupText,
      telegramChannel: cleanStr(s.telegramChannel, 300, curSs.telegramChannel),
      telegramGroup: cleanStr(s.telegramGroup, 300, curSs.telegramGroup),
      youtubeChannel: cleanStr(s.youtubeChannel, 300, curSs.youtubeChannel),
      helplineTitle: cleanStr(s.helplineTitle, 80, curSs.helplineTitle) || DEFAULT_SITE_SETTINGS.helplineTitle,
      helplineHours: cleanStr(s.helplineHours, 80, curSs.helplineHours) || DEFAULT_SITE_SETTINGS.helplineHours,
      appDownloadMode: (s.appDownloadMode === 'play_store' || s.appDownloadMode === 'direct_apk') ? s.appDownloadMode : 'auto',
      appDownloadUrl: cleanStr(s.appDownloadUrl, 500, curSs.appDownloadUrl),
      appStoreLabel: cleanStr(s.appStoreLabel, 40, curSs.appStoreLabel) || 'Google Play',
      footerNoticeTitle: cleanStr(s.footerNoticeTitle, 40, curSs.footerNoticeTitle) || 'নোটিশ:',
      footerNoticeText: cleanStr(s.footerNoticeText, 400, curSs.footerNoticeText),
      footerAlertTitle: cleanStr(s.footerAlertTitle, 40, curSs.footerAlertTitle) || 'বিশেষ সতর্কতা:',
      footerAlertText: cleanStr(s.footerAlertText, 400, curSs.footerAlertText),
      productCards: Array.isArray(s.productCards)
        ? s.productCards.filter(function (pc) { return pc && typeof pc.id === 'string'; }).slice(0, 20).map(function (pc) {
            return {
              id: String(pc.id).trim().slice(0, 50),
              title: String(pc.title || '').trim().slice(0, 60),
              imageUrl: String(pc.imageUrl || '').trim().slice(0, 1500000)
            };
          })
        : curSs.productCards
    };
    if (db.config.siteSettings.telegramChannel) {
      db.config.support.telegram = db.config.siteSettings.telegramChannel;
    }
  }
  if (typeof b.telegramBotToken === 'string') db.config.telegramBotToken = b.telegramBotToken.trim();
  if (typeof b.telegramChatId === 'string') db.config.telegramChatId = b.telegramChatId.trim();
  if (typeof b.smsWebhookSecret === 'string' && b.smsWebhookSecret.trim().length >= 8) db.config.smsWebhookSecret = b.smsWebhookSecret.trim().slice(0, 128);
  if (b.uddoktapay && typeof b.uddoktapay === 'object') {
    var curUdp = db.config.uddoktapay || { enabled: false, explicitlyDisabled: false, baseUrl: '', apiKey: '' };
    var nextEnabled = typeof b.uddoktapay.enabled === 'boolean' ? b.uddoktapay.enabled : curUdp.enabled;
    var incomingBase = typeof b.uddoktapay.baseUrl === 'string' ? b.uddoktapay.baseUrl.trim() : curUdp.baseUrl;
    var validatedBase = incomingBase ? validateUddoktaBaseUrl(incomingBase) : '';
    if (incomingBase && !validatedBase) {
      return res.status(400).json({
        error: 'Invalid UddoktaPay Base URL. Must be a public https:// URL (e.g. https://sandbox.uddoktapay.com).'
      });
    }
    var nextKey = (typeof b.uddoktapay.apiKey === 'string' && b.uddoktapay.apiKey.trim().length >= 8)
      ? b.uddoktapay.apiKey.trim().slice(0, 256)
      : curUdp.apiKey;
    db.config.uddoktapay = {
      enabled: nextEnabled,
      explicitlyDisabled: !nextEnabled,
      baseUrl: validatedBase,
      apiKey: nextKey
    };
  }
  if (b.ucbot && typeof b.ucbot === 'object') {
    var curUc = db.config.ucbot || {
      enabled: false,
      explicitlyDisabled: false,
      apiToken: '',
      shellCode: 'shell',
      shellUsername: '',
      shellPassword: '',
      shellAutocode: '',
      packageRules: {}
    };
    var ucIn = b.ucbot;
    var ucEnabled = typeof ucIn.enabled === 'boolean' ? ucIn.enabled : curUc.enabled;
    var nextTok = (typeof ucIn.apiToken === 'string' && ucIn.apiToken.trim().length >= 8) ? ucIn.apiToken.trim().slice(0, 128) : curUc.apiToken;
    var nextPass = (typeof ucIn.shellPassword === 'string' && ucIn.shellPassword.length >= 1) ? ucIn.shellPassword.slice(0, 200) : curUc.shellPassword;
    var nextAuto = (typeof ucIn.shellAutocode === 'string' && ucIn.shellAutocode.trim().length >= 4) ? ucIn.shellAutocode.trim().slice(0, 128) : curUc.shellAutocode;
    var cleanRules = {};
    if (ucIn.packageRules && typeof ucIn.packageRules === 'object') {
      Object.keys(ucIn.packageRules).forEach(function (k) {
        var rawR = ucIn.packageRules[k];
        if (!rawR || typeof rawR !== 'object') return;
        var mode = (rawR.mode === 'unipin' || rawR.mode === 'shell') ? rawR.mode : 'manual';
        if (mode === 'manual') return;
        cleanRules[String(k).slice(0, 60)] = {
          mode: mode,
          unipinCount: mode === 'unipin' ? Math.max(1, Math.min(5, Math.round(Number(rawR.unipinCount) || 1))) : undefined,
          shellPackage: mode === 'shell' ? String(rawR.shellPackage || 'LITE').trim().slice(0, 40) : undefined
        };
      });
    }
    db.config.ucbot = {
      enabled: ucEnabled,
      explicitlyDisabled: !ucEnabled,
      apiToken: nextTok,
      shellCode: ucIn.shellCode === 'sgshell' ? 'sgshell' : 'shell',
      shellUsername: typeof ucIn.shellUsername === 'string' ? ucIn.shellUsername.trim().slice(0, 80) : curUc.shellUsername,
      shellPassword: nextPass,
      shellAutocode: nextAuto,
      packageRules: (ucIn.packageRules && typeof ucIn.packageRules === 'object') ? cleanRules : curUc.packageRules
    };
  }
  logActivity(db, 'Config Updated', 'Admin updated store settings / gateway / auto-delivery / branding / banners / notice / catalog', 'info', 'Admin');
  saveDb(db);
  res.json({
    ok: true,
    config: buildSafeAdminConfig(db),
    unipinVault: sanitizeVaultForAdmin(db)
  });
});

app.post('/api/admin/uddoktapay/test', async function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var creds = getUddoktaCredentials(db);
  if (!creds.baseUrl || !creds.apiKey) {
    return res.status(400).json({ ok: false, error: 'Please enter & save a valid HTTPS Base URL and API Key first.' });
  }
  var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);
  try {
    var resp = await fetch(creds.baseUrl + '/api/verify-payment', {
      method: 'POST',
      signal: ctrl ? ctrl.signal : undefined,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'RT-UDDOKTAPAY-API-KEY': creds.apiKey
      },
      body: JSON.stringify({ invoice_id: 'CONNECTION_PROBE_TEST' })
    });
    var body = await resp.json().catch(function () { return {}; });
    var msg = String(body.message || '');
    if (resp.status === 401 || resp.status === 403 || /unauthorized|invalid api key/i.test(msg)) {
      return res.status(400).json({ ok: false, error: 'API Key rejected by UddoktaPay (Unauthorized). Check your RT-UDDOKTAPAY-API-KEY.' });
    }
    res.json({ ok: true, message: 'Connected to ' + creds.baseUrl + ' cleanly (' + (msg || ('HTTP ' + resp.status)) + ').' });
  } catch (err) {
    res.status(502).json({ ok: false, error: (err && err.message) ? err.message : 'Failed to connect to UddoktaPay server' });
  } finally {
    clearTimeout(timer);
  }
});

app.post('/api/admin/orders/status', function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var b = req.body || {};
  var allowed = ['Pending', 'Processing', 'Completed', 'Rejected'];
  if (!b.orderId || allowed.indexOf(b.status) === -1) return res.status(400).json({ error: 'INVALID_STATUS' });
  var r = applyOrderStatusUpdate(db, b.orderId, b.status, 'Admin');
  if (!r.ok) return res.status(404).json({ error: r.error });
  res.json({ ok: true, order: r.order });
});

app.post('/api/admin/orders/auto-deliver', async function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var b = req.body || {};
  var logOrd = db.ordersLog.find(function (o) { return o.id === b.orderId; });
  if (!logOrd) return res.status(404).json({ error: 'ORDER_NOT_FOUND' });
  if (logOrd.status === 'Rejected' || logOrd.status === 'Completed') {
    return res.status(400).json({ error: 'Order is already ' + logOrd.status });
  }
  if (logOrd.autoDeliveryStatus === 'Failed') {
    logOrd.autoDeliveryStatus = 'Pending';
  }
  var resAuto = await tryAutoDeliverOrder(db, logOrd, 'Admin Retry');
  if (!resAuto.attempted) {
    return res.status(400).json({ ok: false, error: resAuto.error || 'Auto-delivery rule or token not configured.' });
  }
  res.json({ ok: resAuto.delivered, order: logOrd, error: resAuto.error });
});

app.post('/api/admin/ucbot/status', async function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var creds = getUcbotCredentials(db);
  if (!creds.apiToken) return res.status(400).json({ ok: false, error: 'Please paste & save your UcBot UUID API Token first.' });
  var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);
  try {
    var resp = await fetch(UCBOT_API_BASE + '/status/' + encodeURIComponent(creds.apiToken), {
      signal: ctrl ? ctrl.signal : undefined,
      headers: { Accept: 'application/json' }
    });
    var data = await resp.json().catch(function () { return {}; });
    if (!resp.ok || data.status !== 'success' || !data.data) {
      return res.status(400).json({ ok: false, error: data.error || data.message || ('UcBot returned HTTP ' + resp.status) });
    }
    res.json({ ok: true, statusData: data.data });
  } catch (err) {
    res.status(502).json({ ok: false, error: (err && err.message) ? err.message : 'Failed to reach ffapi.ucbot.net' });
  } finally {
    clearTimeout(timer);
  }
});

app.post('/api/admin/ucbot/vault/add', function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var b = req.body || {};
  var cleanPkgId = String(b.packageId || '').trim();
  if (!cleanPkgId) return res.status(400).json({ error: 'Please select a package.' });
  var lines = String(b.codesText || '').split(/[\r\n,]+/).map(function (s) { return s.trim(); }).filter(function (s) { return s.length >= 8 && s.length <= 80; });
  if (!lines.length) return res.status(400).json({ error: 'Paste at least 1 valid UniPin code (BDMB-... / UPBD-...).' });
  if (!Array.isArray(db.unipinVault)) db.unipinVault = [];
  var existingSet = {};
  db.unipinVault.forEach(function (v) { existingSet[v.code] = true; });
  var added = 0;
  var skipped = 0;
  lines.forEach(function (c) {
    if (existingSet[c]) { skipped += 1; return; }
    existingSet[c] = true;
    db.unipinVault.unshift({
      id: 'UP-' + Date.now().toString(36).toUpperCase() + '-' + crypto.randomBytes(2).toString('hex').toUpperCase(),
      packageId: cleanPkgId,
      code: c,
      status: 'Unused',
      addedAt: getTodayBD() + ' ' + formatTimeBD()
    });
    added += 1;
  });
  db.unipinVault = db.unipinVault.slice(0, 800);
  logActivity(db, 'UniPin Stock Added', 'Added ' + added + ' UniPin code(s) for package ' + cleanPkgId + (skipped ? (' (' + skipped + ' duplicates skipped)') : ''), 'info', 'Admin');
  saveDb(db);
  res.json({ ok: true, added: added, skipped: skipped, unipinVault: sanitizeVaultForAdmin(db) });
});

app.post('/api/admin/ucbot/vault/delete', function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var b = req.body || {};
  if (!Array.isArray(db.unipinVault)) db.unipinVault = [];
  var idx = db.unipinVault.findIndex(function (v) { return v.id === b.id; });
  if (idx < 0) return res.status(404).json({ error: 'CODE_NOT_FOUND' });
  if (db.unipinVault[idx].status === 'InProgress') return res.status(400).json({ error: 'Code is currently in progress.' });
  db.unipinVault.splice(idx, 1);
  saveDb(db);
  res.json({ ok: true, unipinVault: sanitizeVaultForAdmin(db) });
});

app.post('/api/admin/wallet/action', function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var b = req.body || {};
  if (!b.depositId || (b.action !== 'Approved' && b.action !== 'Rejected')) {
    return res.status(400).json({ error: 'INVALID_ACTION' });
  }
  var r = applyDepositActionUpdate(db, b.depositId, b.action, 'Admin');
  if (!r.ok) return res.status(r.error === 'DEPOSIT_NOT_FOUND' ? 404 : 400).json({ error: r.error });
  res.json({ ok: true, deposit: r.deposit });
});

app.post('/api/admin/orders/reply', function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var b = req.body || {};
  var cleanMsg = String(b.message || '').trim().slice(0, 600);
  if (!b.orderId || !cleanMsg) return res.status(400).json({ error: 'INVALID_REPLY' });
  var logOrd = db.ordersLog.find(function (o) { return o.id === b.orderId; });
  if (!logOrd) return res.status(404).json({ error: 'ORDER_NOT_FOUND' });
  var msgObj = {
    id: 'MSG-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
    sender: 'admin',
    text: cleanMsg,
    createdAt: formatTimeBD()
  };
  logOrd.supportMessages = (logOrd.supportMessages || []).concat([msgObj]).slice(-30);
  var owner = db.users[logOrd.userIdentifier];
  if (owner) {
    var uOrd = (owner.orders || []).find(function (o) { return o.id === b.orderId; });
    if (uOrd) uOrd.supportMessages = (uOrd.supportMessages || []).concat([msgObj]).slice(-30);
  }
  logActivity(db, 'Support Reply Sent', 'Admin replied on Order ' + b.orderId, 'info', 'Admin');
  saveDb(db);
  res.json({ ok: true, order: logOrd });
});

app.post('/api/admin/sms/test', async function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var parsed = parseMobileBankingSms(req.body || {});
  if (!parsed.ok) return res.status(400).json({ ok: false, error: parsed.error });
  var result = await ingestSmsPayment(db, parsed, 'Admin SMS Test');
  res.json({
    ok: true,
    duplicate: result.duplicate,
    matched: Boolean(result.matched),
    matchedRefId: result.matched ? result.matched.refId : null,
    sms: result.sms
  });
});

app.post('/api/admin/telegram/test', async function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var r = await sendTelegram('✅ <b>Crazy_top_up (24) Test Alert</b>\nTelegram Order & Wallet Notification সঠিকভাবে কাজ করছে!');
  if (!r.ok) return res.status(400).json(r);
  res.json({ ok: true });
});

app.post('/api/admin/telegram/register-webhook', async function (req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'UNAUTHORIZED' });
  var creds = getTelegramCreds(db);
  if (!creds.token || !creds.chatId) {
    return res.status(400).json({ ok: false, error: 'Please save Telegram Bot Token & Chat ID first.' });
  }
  if (!db.config.telegramWebhookSecret || db.config.telegramWebhookSecret.length < 16) {
    db.config.telegramWebhookSecret = crypto.randomBytes(16).toString('hex');
    saveDb(db);
  }
  var origin = getSafeRequestOrigin(req);
  var webhookUrl = origin + '/api/telegram/webhook';
  if (webhookUrl.indexOf('https://') !== 0) {
    return res.status(400).json({
      ok: false,
      error: 'Telegram requires an HTTPS public URL for 1-Tap buttons (current origin: ' + origin + '). Deploy to HTTPS / set APP_URL first.'
    });
  }
  try {
    var resp = await fetch('https://api.telegram.org/bot' + creds.token + '/setWebhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        secret_token: db.config.telegramWebhookSecret,
        allowed_updates: ['callback_query']
      })
    });
    var data = await resp.json().catch(function () { return {}; });
    if (!resp.ok || !data.ok) {
      return res.status(400).json({ ok: false, error: data.description || ('HTTP ' + resp.status) });
    }
    logActivity(db, 'Telegram 1-Tap Enabled', 'Registered Telegram webhook on ' + webhookUrl, 'success', 'Admin');
    saveDb(db);
    res.json({ ok: true, webhookUrl: webhookUrl });
  } catch (err) {
    res.status(502).json({ ok: false, error: (err && err.message) ? err.message : 'Telegram setWebhook failed' });
  }
});

app.post('/api/telegram/webhook', async function (req, res) {
  var expectedSec = String(db.config.telegramWebhookSecret || '').trim();
  var hdrSec = String((req.headers && req.headers['x-telegram-bot-api-secret-token']) || '').trim();
  if (!expectedSec || !timingSafeEqualsStr(hdrSec, expectedSec)) {
    return res.status(401).json({ ok: false });
  }
  var creds = getTelegramCreds(db);
  var body = req.body || {};
  var cb = body.callback_query;
  if (!cb || !cb.id || !cb.data) return res.json({ ok: true });
  var incomingChatId = String((cb.message && cb.message.chat && cb.message.chat.id) != null ? cb.message.chat.id : '');
  if (!creds.chatId || incomingChatId !== creds.chatId) return res.json({ ok: true });

  var parts = String(cb.data).split(':');
  var actor = (cb.from && cb.from.username) ? ('@' + cb.from.username) : ((cb.from && cb.from.first_name) || 'Telegram Admin');
  var toastText = 'Action noted';

  if (parts[0] === 'ord' && parts[2]) {
    var nextStatus = parts[1] === 'complete' ? 'Completed' : (parts[1] === 'reject' ? 'Rejected' : null);
    if (nextStatus) {
      var rOrd = applyOrderStatusUpdate(db, parts[2], nextStatus, 'Telegram (' + actor + ')');
      toastText = rOrd.ok ? ('Order ' + parts[2] + ' → ' + nextStatus) : ('Order error: ' + rOrd.error);
    }
  } else if (parts[0] === 'dep' && parts[2]) {
    var nextAct = parts[1] === 'approve' ? 'Approved' : (parts[1] === 'reject' ? 'Rejected' : null);
    if (nextAct) {
      var rDep = applyDepositActionUpdate(db, parts[2], nextAct, 'Telegram (' + actor + ')');
      toastText = rDep.ok ? ('Deposit ' + parts[2] + ' → ' + nextAct) : ('Deposit: ' + rDep.error);
    }
  }

  if (creds.token) {
    await fetch('https://api.telegram.org/bot' + creds.token + '/answerCallbackQuery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callback_query_id: cb.id, text: toastText })
    }).catch(function () {});
    if (cb.message && cb.message.message_id) {
      await fetch('https://api.telegram.org/bot' + creds.token + '/editMessageReplyMarkup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: incomingChatId,
          message_id: cb.message.message_id,
          reply_markup: { inline_keyboard: [] }
        })
      }).catch(function () {});
    }
  }
  res.json({ ok: true });
});


app.get('/api/ff-player', async function (req, res) {
  var uid = String((req.query && req.query.uid) || '').replace(/\D/g, '');
  if (!uid || uid.length < 6 || uid.length > 15) {
    return res.status(400).json({ error: 'সঠিক প্লেয়ার আইডি দিন' });
  }
  var targetUrl = 'https://auraffxserverinfocheckerapi.onrender.com/api/player?uid=' + encodeURIComponent(uid);
  try {
    if (typeof fetch === 'function') {
      var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var tm = setTimeout(function () { if (ctrl) ctrl.abort(); }, 20000);
      var r = await fetch(targetUrl, {
        headers: { Accept: 'application/json' },
        signal: ctrl ? ctrl.signal : undefined
      });
      clearTimeout(tm);
      var txt = await r.text();
      res.status(r.status);
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.send(txt);
    }
    var https = require('https');
    https.get(targetUrl, { timeout: 20000 }, function (up) {
      var chunks = [];
      up.on('data', function (c) { chunks.push(c); });
      up.on('end', function () {
        res.status(up.statusCode || 200);
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.send(Buffer.concat(chunks).toString('utf8'));
      });
    }).on('error', function () {
      res.status(502).json({ error: 'প্লেয়ার ইনফো সার্ভার পাওয়া যায়নি' });
    });
  } catch (e) {
    return res.status(502).json({ error: 'প্লেয়ার ইনফো আনা যায়নি' });
  }
});

app.get('/.well-known/assetlinks.json', function (req, res) {
  var rawJson = String(process.env.TWA_ASSETLINKS_JSON || '').trim();
  res.setHeader('Cache-Control', 'no-cache');
  if (rawJson) {
    try { return res.json(JSON.parse(rawJson)); } catch (e) {}
  }
  var pkg = String(process.env.ANDROID_PACKAGE_NAME || 'com.crazytopup24.app').trim();
  var fps = String(process.env.ANDROID_SHA256 || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  if (fps.length > 0) {
    return res.json([{
      relation: ['delegate_permission/common.handle_all_urls'],
      target: { namespace: 'android_app', package_name: pkg, sha256_cert_fingerprints: fps }
    }]);
  }
  var staticPath = path.join(__dirname, 'assetlinks.json');
  if (fs.existsSync(staticPath)) {
    try { return res.sendFile(staticPath); } catch (e) {}
  }
  return res.json([]);
});

app.use(express.static(__dirname, {
  setHeaders: function (res, filePath) {
    if (/\.(html|js|css|json)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));
app.get('/', function (req, res) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, 'FFX.html'));
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Crazy_top_up (24) server running on port ' + PORT);
});
