import { useState, useEffect } from "react";

/* ---------- Tiny hash router: #/  #/review  #/review/day  #/glossary  #/glossary/stock  #/tables  #/order/:tableId ---------- */
const useRoute = () => {
  const get = () => window.location.hash.replace(/^#/, "") || "/";
  const [path, setPath] = useState(get);
  useEffect(() => {
    const on = () => setPath(get());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return [path, (p) => { window.location.hash = p; }];
};

/* ---------- Data ---------- */
const MN = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const MF = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const ITEMS = [["Cappuccino",120],["Veg Sandwich",150],["Cold Coffee",180],["Marble Cake",90],["Chocolate Muffin",110],["Paneer Pizza",320],["French Fries",130],["Iced Tea",100],["Latte",150],["Burger",220],["Maggie",90],["Choco Shake",160],["Samosa",60],["Lemon Tea",50],["Chicken Burger",250]];
const TODAY = [[89.99,"Coffee Maker"],[120,"Sandwich"],[150,"Cold Coffee"],[90,"Marble Cake"],[110,"Chocolate Muffin"],[320,"Paneer Pizza"],[130,"French Fries"],[100,"Iced Tea"],[150,"Latte"],[220,"Burger"],[90,"Maggie"],[160,"Choco Shake"]];
const TT = ["08:15 AM","08:32 AM","09:05 AM","09:28 AM","10:12 AM","10:45 AM","11:20 AM","12:05 PM","12:40 PM","01:15 PM","01:50 PM","02:30 PM"];

/* ---------- Rich Menu with Categories & Descriptions for QR Ordering ---------- */
const MENU_ITEMS = [
  { id: "M1", name: "Cappuccino", price: 120, cat: "Hot Coffee", desc: "Rich double espresso with silky steamed milk & thick frothy foam", icon: "☕", badge: "Bestseller" },
  { id: "M2", name: "Latte", price: 150, cat: "Hot Coffee", desc: "Smooth espresso blended with steamed whole milk and light microfoam", icon: "🥛", badge: "Popular" },
  { id: "M3", name: "Espresso", price: 90, cat: "Hot Coffee", desc: "Bold, intense single-origin dark roast double shot", icon: "☕", badge: "Classic" },
  { id: "M4", name: "Cold Coffee", price: 180, cat: "Cold Beverages", desc: "Chilled espresso brewed over fresh milk, ice & premium vanilla ice cream", icon: "🧊", badge: "Must Try" },
  { id: "M5", name: "Iced Tea", price: 100, cat: "Cold Beverages", desc: "Crisp brewed black tea infused with lemon zest and fresh garden mint", icon: "🍹", badge: "Refreshing" },
  { id: "M6", name: "Choco Shake", price: 160, cat: "Cold Beverages", desc: "Decadent dark chocolate shake topped with whipped cream and choco chips", icon: "🍫", badge: "Sweet Tooth" },
  { id: "M7", name: "Veg Sandwich", price: 150, cat: "Snacks & Bites", desc: "Grilled multigrain bread loaded with cucumber, tomatoes, cheese & basil pesto", icon: "🥪", badge: "Chef's Special" },
  { id: "M8", name: "Paneer Pizza", price: 320, cat: "Snacks & Bites", desc: "Hand-stretched thin crust with smoky marinated paneer, capsicum & mozzarella", icon: "🍕", badge: "Sharing" },
  { id: "M9", name: "French Fries", price: 130, cat: "Snacks & Bites", desc: "Golden crinkle-cut fries tossed with peri-peri herbs & garlic dip", icon: "🍟", badge: "Crunchy" },
  { id: "M10", name: "Burger", price: 220, cat: "Snacks & Bites", desc: "Herb grilled patty with melted cheddar, pickled gherkins & house sauce", icon: "🍔", badge: "Signature" },
  { id: "M11", name: "Chocolate Muffin", price: 110, cat: "Bakery & Desserts", desc: "Fresh oven-baked double chocolate muffin with a warm gooey center", icon: "🧁", badge: "Fresh Daily" },
  { id: "M12", name: "Marble Cake", price: 90, cat: "Bakery & Desserts", desc: "Traditional vanilla-cocoa swirl slice baked with real butter", icon: "🍰", badge: "Cafe Favorite" },
  { id: "M13", name: "Blueberry Cheesecake", price: 180, cat: "Bakery & Desserts", desc: "Creamy baked New York cheesecake topped with lush wild blueberry glaze", icon: "🫐", badge: "Gourmet" }
];

const VEN0 = [
  ["FreshFoods Pvt Ltd","Ramesh Kumar","9876543210","ramesh@freshfoods.in","Chennai","Active","Chennai, Tamil Nadu","No. 123, Food Street, Chennai - 600001","Fruits, Vegetables, Fresh Produce","30 Days","Reliable supplier with good quality products."],
  ["DairyLand Suppliers","Suresh Babu","9123456780","suresh@dairyland.in","Madurai","Active","Madurai, Tamil Nadu","Plot 45, Industrial Estate, Madurai","Milk, Cream, Butter, Cheese","15 Days","Prompt deliveries, high fat fresh milk."],
  ["GrainMart Traders","Anand Raj","9345678901","anand@grainmart.in","Coimbatore","Active","Coimbatore, Tamil Nadu","22 Mill Road, Coimbatore","Flour, Sugar, Arabica Coffee Beans","30 Days","Certified Grade-A coffee beans."],
  ["Beverage Distributors","Vijay Kumar","9988776655","vijay@beverage.co.in","Chennai","Active","Chennai, Tamil Nadu","8 Anna Salai, Chennai","Syrups, Crushes, Gourmet Teas","45 Days","Bulk discount eligible supplier."],
  ["Snacks World","Karthik","9876123456","karthik@snacksworld.in","Tirunelveli","Inactive","Tirunelveli, Tamil Nadu","19 Market Lane, Tirunelveli","Chips, Cookies, Bakery Savories","Immediate","Paused for contract renewal."],
  ["Organic Farms","Manoj","9001122334","manoj@organicfarms.in","Salem","Active","Salem, Tamil Nadu","12 Green Hills, Salem","Honey, Organic Brown Sugar, Green Tea","15 Days","100% certified pesticide-free."],
  ["Bakery Supplies","Prakash","9345123456","prakash@bakerysup.in","Trichy","Active","Trichy, Tamil Nadu","56 Baker's Ave, Trichy","Yeast, Baking Powder, Chocolate Chips","30 Days","Standard cafe baking supplies."],
  ["Spice Hub","Arun Kumar","9123786450","arun@spicehub.in","Erode","Active","Erode, Tamil Nadu","84 Spice Complex, Erode","Cinnamon, Nutmeg, Cardamom, Cloves","30 Days","High aroma premium spices."],
  ["Cleaning Essentials","Senthil","9867543210","senthil@cleanplus.in","Chennai","Inactive","Chennai, Tamil Nadu","7 Harbour Rd, Chennai","Sanitizers, Detergents, Food-safe wipes","Immediate","Awaiting renewal."],
  ["Packaging Solutions","Dinesh","9888654321","dinesh@packsolutions.in","Coimbatore","Active","Coimbatore, Tamil Nadu","91 Pack City, Coimbatore","Paper Cups, Bio Straws, Takeaway Bags","30 Days","Eco-friendly recyclable packaging."],
  ["RoastMasters Co","Kiran Rao","9711223344","kiran@roastmasters.in","Bengaluru","Active","Bengaluru, Karnataka","10 Coffee Board Layout, Bengaluru","Single Origin Roast Coffee Beans","15 Days","Specialty micro-batch roasts."],
  ["DairyFresh Milk Co","Pooja Verma","9822334455","pooja@dairyfresh.in","Chennai","Active","Chennai, Tamil Nadu","33 Guindy Ind Estate, Chennai","Toned, Almond & Oat Milk","7 Days","Daily morning chilled dispatch."]
];

const STK0 = [
  ["Cappuccino","Beverages","BEV001",50,120,"FreshFoods Pvt Ltd",10,"Chennai - Main Store","14 Oct 2026, 09:10 AM"],
  ["Cold Coffee","Beverages","BEV002",30,150,"Beverage Distributors",10,"Chennai - Main Store","14 Oct 2026, 09:10 AM"],
  ["Iced Tea","Beverages","BEV003",12,100,"Beverage Distributors",10,"Chennai - Main Store","14 Oct 2026, 09:10 AM"],
  ["Veg Sandwich","Snacks","SNK001",25,80,"FreshFoods Pvt Ltd",15,"Chennai - Counter 1","14 Oct 2026, 09:10 AM"],
  ["Paneer Pizza","Snacks","SNK002",8,200,"DairyLand Suppliers",10,"Chennai - Kitchen","14 Oct 2026, 09:10 AM"],
  ["Chocolate Muffin","Bakery","BAK001",0,90,"Bakery Supplies",10,"Chennai - Bakery Rack","14 Oct 2026, 09:10 AM"],
  ["Marble Cake","Bakery","BAK002",15,110,"Bakery Supplies",10,"Chennai - Bakery Rack","14 Oct 2026, 09:10 AM"],
  ["French Fries","Snacks","SNK003",40,130,"FreshFoods Pvt Ltd",15,"Chennai - Freezer","14 Oct 2026, 09:10 AM"],
  ["Burger","Snacks","SNK004",20,180,"FreshFoods Pvt Ltd",10,"Chennai - Kitchen","14 Oct 2026, 09:10 AM"],
  ["Chicken Burger","Snacks","SNK005",0,220,"FreshFoods Pvt Ltd",8,"Chennai - Kitchen","14 Oct 2026, 09:10 AM"],
  ["Espresso","Beverages","BEV004",60,90,"RoastMasters Co",15,"Chennai - Espresso Bar","14 Oct 2026, 09:10 AM"],
  ["Caramel Macchiato","Beverages","BEV005",22,190,"Beverage Distributors",10,"Chennai - Main Store","14 Oct 2026, 09:10 AM"],
  ["Garlic Bread","Snacks","SNK006",18,110,"Bakery Supplies",10,"Chennai - Kitchen","14 Oct 2026, 09:10 AM"],
  ["Blueberry Cheesecake","Bakery","BAK003",6,180,"Bakery Supplies",8,"Chennai - Chiller","14 Oct 2026, 09:10 AM"],
  ["Hot Chocolate","Beverages","BEV006",35,140,"DairyFresh Milk Co",10,"Chennai - Main Store","14 Oct 2026, 09:10 AM"]
];

/* ---------- Default Dine-in Tables Data (Table Revenue & Income) ---------- */
const TABLES0 = [
  { id: "T1", name: "Table 1", seats: 2, status: "Occupied", guests: 2, seatedAt: "10:15 AM", order: [["Cappuccino", 2, 120, "Staff"], ["Veg Sandwich", 1, 150, "Staff"]], waiter: "Karthik", qrCount: 0, settledIncome: 850 },
  { id: "T2", name: "Table 2", seats: 4, status: "Available", guests: 0, seatedAt: "—", order: [], waiter: "—", qrCount: 0, settledIncome: 620 },
  { id: "T3", name: "Table 3", seats: 2, status: "Occupied", guests: 1, seatedAt: "10:35 AM", order: [["Cold Coffee", 1, 180, "QR"], ["Chocolate Muffin", 1, 110, "QR"]], waiter: "Priya", qrCount: 2, settledIncome: 1150 },
  { id: "T4", name: "Table 4", seats: 6, status: "Reserved", guests: 5, seatedAt: "11:30 AM", customer: "Dr. Arvind (Birthday)", order: [], waiter: "Ramesh", qrCount: 0, settledIncome: 980 },
  { id: "T5", name: "Table 5", seats: 4, status: "Occupied", guests: 3, seatedAt: "09:50 AM", order: [["Paneer Pizza", 1, 320, "Staff"], ["French Fries", 1, 130, "Staff"], ["Iced Tea", 2, 100, "QR"]], waiter: "Karthik", qrCount: 1, settledIncome: 1420 },
  { id: "T6", name: "Table 6", seats: 4, status: "Available", guests: 0, seatedAt: "—", order: [], waiter: "—", qrCount: 0, settledIncome: 750 },
  { id: "T7", name: "Table 7", seats: 2, status: "Available", guests: 0, seatedAt: "—", order: [], waiter: "—", qrCount: 0, settledIncome: 480 },
  { id: "T8", name: "Table 8", seats: 8, status: "Available", guests: 0, seatedAt: "—", order: [], waiter: "—", qrCount: 0, settledIncome: 1290 }
];

/* ---------- Initial Kitchen Order Tickets (KDS) ---------- */
const INITIAL_KITCHEN_ORDERS = [
  {
    id: "KOT-1041",
    tableId: "T1",
    tableName: "Table 1",
    time: "10:15 AM",
    timestamp: Date.now() - 4 * 60 * 1000,
    source: "Staff",
    items: [
      { name: "Cappuccino", qty: 2, price: 120, icon: "☕", done: true },
      { name: "Veg Sandwich", qty: 1, price: 150, icon: "🥪", done: false }
    ],
    specialNotes: "Extra crisp toast, brown bread preferred",
    status: "preparing"
  },
  {
    id: "KOT-1042",
    tableId: "T3",
    tableName: "Table 3",
    time: "10:35 AM",
    timestamp: Date.now() - 1 * 60 * 1000,
    source: "QR Code",
    items: [
      { name: "Cold Coffee", qty: 1, price: 180, icon: "🧊", done: false },
      { name: "Chocolate Muffin", qty: 1, price: 110, icon: "🧁", done: false }
    ],
    specialNotes: "Chilled cold coffee with extra chocolate syrup",
    status: "new"
  },
  {
    id: "KOT-1040",
    tableId: "T5",
    tableName: "Table 5",
    time: "09:55 AM",
    timestamp: Date.now() - 14 * 60 * 1000,
    source: "QR Code",
    items: [
      { name: "Paneer Pizza", qty: 1, price: 320, icon: "🍕", done: true },
      { name: "French Fries", qty: 1, price: 130, icon: "🍟", done: true },
      { name: "Iced Tea", qty: 2, price: 100, icon: "🍹", done: true }
    ],
    specialNotes: "Peri-peri fries with extra garlic mayo dip",
    status: "ready"
  }
];

/* ---------- Cafe Kitchen Sound Ding (Web Audio API) ---------- */
function playKitchenDing() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.09); // A5
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.7);
  } catch (e) {
    // Ignore audio permission restrictions
  }
}

const SALES_START = "01 Jan 2026";
const TOTAL_INCOME = 418650;
const pad = (n, l = 2) => String(n).padStart(l, "0");
const money = (a) => "₹" + Number(a).toFixed(2);
const hourly = (d) => {
  let b = [90,170,230,340,580,360,280,350,150,470,450,270,170,150];
  if (d === "today") return [110,250,410,560,790,590,480,410,560,410,330,250,180];
  if (d !== 14) b = b.map((v, i) => Math.round((v * (0.6 + ((d * 7 + i * 13) % 10) / 14)) / 10) * 10);
  return b;
};
const dayStats = (d) => {
  if (d === 14) return [2850, 48];
  const s = hourly(d).reduce((a, b) => a + b, 0);
  return [Math.round(s / 50) * 50, Math.round(s / 59)];
};
const dayRev = (m, d) => (m === 9 && d === 14 ? 2850 : dayStats(d + m * 31 + 100)[0]);
const dayItems = (m, d) => (m === 9 && d === 14 ? 48 : Math.round(dayRev(m, d) / 59));
const monthTotal = (y, m) => {
  const start = new Date(2026, 0, 1), today = new Date(), dim = new Date(y, m + 1, 0).getDate();
  let rev = 0, items = 0, days = 0;
  for (let d = 1; d <= dim; d++) {
    const dt = new Date(y, m, d);
    if (dt < start || dt > today) continue;
    rev += dayRev(m, d); items += dayItems(m, d); days++;
  }
  return { rev, items, days };
};
const inr = (n) => "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });
const txs = (m, d, n) => Array.from({ length: n }, (_, i) => {
  const t = 540 + i * 8 + (i % 3), h = Math.floor(t / 60), it = ITEMS[i % 15];
  return { t: `${pad(h > 12 ? h - 12 : h)}:${pad(t % 60)} ${h >= 12 ? "PM" : "AM"}`, id: `TXN_25${pad(m + 1)}${pad(d)}${pad(i + 1, 3)}`, i: it[0], a: it[1] };
});
const stockStatus = (s) => {
  if (!s) return ["In Stock", "p-in"];
  const stock = Number(s[3]) || 0;
  return stock === 0 ? ["Out of Stock", "p-out"] : stock <= 12 ? ["Low Stock", "p-low"] : ["In Stock", "p-in"];
};

/* ---------- Realistic SVG QR Code Component ---------- */
function QRCodeSVG({ value, size = 180 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 140 140" style={{ background: "#fff", padding: 8, borderRadius: 10, border: "2px solid #cbd5e1" }}>
      {/* 3 Corner Position Detection Squares */}
      <rect x="8" y="8" width="36" height="36" rx="4" fill="#0f172a" />
      <rect x="14" y="14" width="24" height="24" rx="2" fill="#fff" />
      <rect x="19" y="19" width="14" height="14" rx="2" fill="#0f172a" />

      <rect x="96" y="8" width="36" height="36" rx="4" fill="#0f172a" />
      <rect x="102" y="14" width="24" height="24" rx="2" fill="#fff" />
      <rect x="107" y="19" width="14" height="14" rx="2" fill="#0f172a" />

      <rect x="8" y="96" width="36" height="36" rx="4" fill="#0f172a" />
      <rect x="14" y="102" width="24" height="24" rx="2" fill="#fff" />
      <rect x="19" y="107" width="14" height="14" rx="2" fill="#0f172a" />

      {/* Timing Patterns */}
      <rect x="48" y="22" width="6" height="6" fill="#0f172a" />
      <rect x="60" y="22" width="6" height="6" fill="#0f172a" />
      <rect x="72" y="22" width="6" height="6" fill="#0f172a" />
      <rect x="84" y="22" width="6" height="6" fill="#0f172a" />
      <rect x="22" y="48" width="6" height="6" fill="#0f172a" />
      <rect x="22" y="60" width="6" height="6" fill="#0f172a" />
      <rect x="22" y="72" width="6" height="6" fill="#0f172a" />
      <rect x="22" y="84" width="6" height="6" fill="#0f172a" />

      {/* Data Blocks */}
      <rect x="48" y="48" width="8" height="8" rx="1" fill="#1e293b" />
      <rect x="60" y="48" width="8" height="8" rx="1" fill="#1e293b" />
      <rect x="72" y="48" width="8" height="8" rx="1" fill="#1e293b" />
      <rect x="84" y="48" width="8" height="8" rx="1" fill="#1e293b" />
      <rect x="48" y="60" width="8" height="8" rx="1" fill="#1e293b" />
      <rect x="84" y="60" width="8" height="8" rx="1" fill="#1e293b" />
      <rect x="48" y="72" width="8" height="8" rx="1" fill="#1e293b" />
      <rect x="60" y="72" width="8" height="8" rx="1" fill="#1e293b" />
      <rect x="72" y="72" width="8" height="8" rx="1" fill="#1e293b" />
      <rect x="84" y="72" width="8" height="8" rx="1" fill="#1e293b" />
      <rect x="48" y="88" width="6" height="6" fill="#1e293b" />
      <rect x="62" y="88" width="6" height="6" fill="#1e293b" />
      <rect x="76" y="88" width="6" height="6" fill="#1e293b" />
      <rect x="96" y="60" width="6" height="6" fill="#1e293b" />
      <rect x="110" y="60" width="6" height="6" fill="#1e293b" />
      <rect x="122" y="72" width="6" height="6" fill="#1e293b" />
      <rect x="100" y="96" width="8" height="8" fill="#1e293b" />
      <rect x="116" y="96" width="8" height="8" fill="#1e293b" />
      <rect x="100" y="112" width="8" height="8" fill="#1e293b" />
      <rect x="116" y="112" width="8" height="8" fill="#1e293b" />
      <rect x="52" y="116" width="6" height="6" fill="#1e293b" />
      <rect x="68" y="116" width="6" height="6" fill="#1e293b" />
      <rect x="84" y="116" width="6" height="6" fill="#1e293b" />

      {/* Center Branding Circle with Coffee Logo */}
      <circle cx="70" cy="70" r="15" fill="#1a73e8" stroke="#fff" strokeWidth="2" />
      <text x="70" y="75" fontSize="13" textAnchor="middle" fill="#fff">☕</text>
    </svg>
  );
}

/* ---------- Shared UI ---------- */
function Window({ children, back, currentUser, onLogout }) {
  return (
    <div className="sd-wood"><style>{CSS}</style>
      <div className="win">
        <div className="bar">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {back ? <button className="bk" onClick={back}>‹ Back</button> : null}
            <span className="cafe-window-title">
              <span style={{ fontSize: 16 }}>☕</span>
              <b>ESPRESSO & CO. CAFE</b>
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {currentUser && (
              <div className="user-top-profile">
                <span className={`user-role-badge ${currentUser.role}`}>
                  {currentUser.role === "admin" && "👑 Admin"}
                  {currentUser.role === "supplier" && "🚚 Supplier"}
                  {currentUser.role === "kitchen" && "👨‍🍳 Kitchen"}
                </span>
                <span className="user-display-name">{currentUser.name || currentUser.username}</span>
                <button
                  type="button"
                  className="user-logout-btn"
                  onClick={onLogout}
                  title="Sign out or switch login"
                >
                  🚪 Switch / Logout
                </button>
              </div>
            )}
            <div className="wc"><span>–</span><span>❐</span><span className="x">✕</span></div>
          </div>
        </div>
        <div className="in">{children}</div>
      </div>
    </div>
  );
}

const Chart = ({ v }) => {
  const H = ["9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM"];
  return (
    <>
      <div className="chart">
        {[["-6px",800],["22%",600],["48%",400],["74%",200]].map(([t, l]) => <u key={l} style={{ top: t }}>{l}</u>)}
        {v.map((x, i) => <i key={i} style={{ height: Math.min(100, x / 8) + "%" }} data-h={H[i]} />)}
      </div>
      <div style={{ height: 20 }} />
    </>
  );
};

const KP = ({ rev, n }) => (
  <div className="kp">
    <div><span className="ic">₹</span><span><small>Total Revenue</small><b>{money(rev)}</b></span></div>
    <div className="i"><span className="ic b">🛍</span><span><small>Items Sold</small><b>{n} Items</b></span></div>
  </div>
);

function Calendar({ y, m, d, onPick, onMonth }) {
  const f = new Date(y, m, 1).getDay(), dim = new Date(y, m + 1, 0).getDate(), pd = new Date(y, m, 0).getDate();
  const cells = [];
  for (let i = f - 1; i >= 0; i--) cells.push(<span key={"p" + i} className="o">{pd - i}</span>);
  for (let k = 1; k <= dim; k++) cells.push(<span key={k} className={k === d ? "sel" : ""} onClick={() => onPick(k)}>{k}</span>);
  const rem = (7 - cells.length % 7) % 7;
  for (let i = 1; i <= rem; i++) cells.push(<span key={"n" + i} className="o">{i}</span>);
  return (
    <div className="cal">
      <div className="cn"><button onClick={() => onMonth(-1)}>‹</button>{MN[m]} {y}<button onClick={() => onMonth(1)}>›</button></div>
      <div className="cg">{["SUN","MON","TUE","WED","THU","FRI","SAT"].map((x) => <b key={x}>{x}</b>)}{cells}</div>
    </div>
  );
}

/* ---------- Table QR Stand & Sticker Card Modal ---------- */
function TableQRModal({ table, tables, onClose, onOpenMobileView, onOpenAllModal }) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState("tent"); // "tent" | "sticker"
  if (!table) return null;

  const orderUrl = `${window.location.origin}${window.location.pathname}#/order/${table.id}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(orderUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span>📱 {table.name} QR Code for Self-Ordering</span>
          <button type="button" className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* View Mode Toggle: Tent Stand vs Table Paste Sticker */}
        <div style={{ display: "flex", background: "#f1f5f9", padding: "6px 12px", gap: 8, borderBottom: "1px solid #e2e8f0" }}>
          <button
            type="button"
            className={`sub-tab-btn ${viewMode === "tent" ? "on" : ""}`}
            onClick={() => setViewMode("tent")}
            style={{ flex: 1, padding: "6px", borderRadius: 6, border: 0, fontWeight: 700, cursor: "pointer", background: viewMode === "tent" ? "#0f172a" : "#fff", color: viewMode === "tent" ? "#fff" : "#475569" }}
          >
            🪑 Acrylic Tent Stand
          </button>
          <button
            type="button"
            className={`sub-tab-btn ${viewMode === "sticker" ? "on" : ""}`}
            onClick={() => setViewMode("sticker")}
            style={{ flex: 1, padding: "6px", borderRadius: 6, border: 0, fontWeight: 700, cursor: "pointer", background: viewMode === "sticker" ? "#0f172a" : "#fff", color: viewMode === "sticker" ? "#fff" : "#475569" }}
          >
            🏷️ Table Paste Sticker
          </button>
        </div>

        <div className="modal-body" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 20px" }}>
          {viewMode === "tent" ? (
            /* Authentic Cafe Acrylic Table Tent Card */
            <div className="qr-tent-stand">
              <div className="tent-header">
                <span className="tent-icon">☕</span>
                <h3>ARTISAN COFFEE HOUSE</h3>
                <p>Specialty Roasters & Cafe</p>
              </div>

              <div className="tent-table-pill">
                {table.name}
              </div>

              <div className="tent-qr-wrapper">
                <QRCodeSVG value={orderUrl} size={190} />
              </div>

              <div className="tent-instructions">
                <b>📷 SCAN TO ORDER & PAY</b>
                <span>Point phone camera to browse menu & send order straight to kitchen!</span>
              </div>

              <div className="tent-wifi-box">
                <span>📶 Guest WiFi: <b>ArtisanCafe_Free</b></span>
                <span>🔑 Password: <b>espresso2026</b></span>
              </div>
            </div>
          ) : (
            /* Table Paste Sticker (Square Sticker with Cut Line) */
            <div className="table-sticker-preview">
              <div className="sticker-cut-border">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 20 }}>☕</span>
                    <b style={{ fontSize: 13, color: "#0f172a", letterSpacing: "0.5px" }}>ARTISAN COFFEE</b>
                  </div>
                  <span className="sticker-badge">STICKER</span>
                </div>

                <div className="sticker-table-title">
                  🪑 {table.name}
                </div>

                <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
                  <QRCodeSVG value={orderUrl} size={170} />
                </div>

                <div className="sticker-instructions">
                  <b>📷 SCAN WITH PHONE CAMERA</b>
                  <p>Browse menu, select items & tap send. Your order goes direct to kitchen!</p>
                </div>

                <div className="sticker-footer-info">
                  <span>📶 Free WiFi: <b>ArtisanCafe_Free</b></span>
                  <span>📍 Paste on {table.name}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick link & simulator buttons */}
          <div style={{ width: "100%", marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", background: "#f8fafc", padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0" }}>
              <input
                readOnly
                value={orderUrl}
                style={{ flex: 1, border: "none", background: "transparent", fontSize: 12, color: "var(--ink)", outline: "none" }}
              />
              <button
                type="button"
                onClick={handleCopy}
                style={{ padding: "5px 12px", background: copied ? "#16a34a" : "var(--blue)", color: "#fff", border: 0, borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
              >
                {copied ? "✓ Copied!" : "Copy Link"}
              </button>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                type="button"
                className="btn-save"
                style={{ flex: "1 1 200px", padding: "10px", fontSize: 13, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}
                onClick={() => { onClose(); onOpenMobileView(table.id); }}
              >
                <span>📱</span>
                <span>Open Customer Mobile View Now</span>
              </button>

              <button
                type="button"
                className="btn-cancel"
                style={{ padding: "10px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
                onClick={handlePrint}
              >
                <span>🖨️</span>
                <span>Print {viewMode === "tent" ? "Stand" : "Sticker"}</span>
              </button>

              {onOpenAllModal && (
                <button
                  type="button"
                  style={{ background: "#4338ca", color: "#fff", border: 0, borderRadius: 6, padding: "10px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                  onClick={() => { onClose(); onOpenAllModal(); }}
                >
                  <span>📑</span>
                  <span>Print All Table Stickers</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- All Tables QR Code Stickers Modal (To Print & Paste on All Tables) ---------- */
function AllTablesQRModal({ tables, onClose, onOpenMobileView }) {
  if (!tables) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 900, maxHeight: "90vh", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ background: "linear-gradient(135deg, #3730a3, #4f46e5)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🏷️</span>
            <div>
              <span style={{ fontSize: 16, fontWeight: 800 }}>Print All Table QR Stickers (Cut & Paste Sheet)</span>
              <small style={{ display: "block", fontSize: 11, color: "#e0e7ff" }}>
                Print on paper or sticker sheet, cut along dotted lines, and paste one on each cafe table
              </small>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div style={{ background: "#eef2ff", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #c7d2fe" }}>
          <span style={{ fontSize: 13, color: "#312e81" }}>
            💡 <b>Easy 3-Step Setup:</b> 1. Print sheet ➔ 2. Cut along scissors line ➔ 3. Paste on tables. Customers scan to order direct to kitchen!
          </span>
          <button
            type="button"
            className="btn-save"
            style={{ padding: "8px 18px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
            onClick={() => window.print()}
          >
            <span>🖨️</span>
            <span>Print All Stickers Sheet</span>
          </button>
        </div>

        <div className="modal-body all-stickers-sheet" style={{ flex: 1, overflowY: "auto", padding: 20, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {tables.map((t) => {
            const tableOrderUrl = `${window.location.origin}${window.location.pathname}#/order/${t.id}`;
            return (
              <div key={t.id} className="table-sticker-card">
                <div className="sticker-cut-border">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 18 }}>☕</span>
                      <b style={{ fontSize: 12, color: "#0f172a" }}>ARTISAN COFFEE</b>
                    </div>
                    <span style={{ fontSize: 10, background: "#f1f5f9", padding: "1px 6px", borderRadius: 4, fontWeight: 700, color: "#64748b" }}>
                      ✂️ CUT HERE
                    </span>
                  </div>

                  <div className="sticker-table-title">
                    🪑 {t.name}
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", margin: "6px 0" }}>
                    <QRCodeSVG value={tableOrderUrl} size={135} />
                  </div>

                  <div className="sticker-instructions">
                    <b>📷 SCAN WITH CAMERA TO ORDER</b>
                    <p>Select cafe items & send straight to kitchen!</p>
                  </div>

                  <div className="sticker-footer-info">
                    <span>WiFi: <b>ArtisanCafe_Free</b></span>
                    <span>Direct Kitchen Order</span>
                  </div>

                  <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                    <button
                      type="button"
                      className="add-btn"
                      style={{ flex: 1, padding: "5px 8px", fontSize: 11 }}
                      onClick={() => { onClose(); onOpenMobileView(t.id); }}
                    >
                      📱 Test Order View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Customer Mobile Self-Ordering View (#/order/:tableId) ---------- */
function CustomerOrderView({ tableId = "T1", go, tables, setTables, kitchenOrders = [], onSendKitchenOrder }) {
  const currentTable = tables.find((t) => t.id === tableId) || tables[0] || { id: "T1", name: "Table 1" };
  const [selectedCat, setSelectedCat] = useState("All");
  const [cart, setCart] = useState({});
  const [specialNotes, setSpecialNotes] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastSubmittedTicket, setLastSubmittedTicket] = useState(null);

  const categories = ["All", "Hot Coffee", "Cold Beverages", "Snacks & Bites", "Bakery & Desserts"];
  const filteredMenu = MENU_ITEMS.filter((it) => selectedCat === "All" || it.cat === selectedCat);

  // Cart operations
  const addToCart = (item) => {
    const cur = cart[item.id] || 0;
    setCart({ ...cart, [item.id]: cur + 1 });
  };

  const removeFromCart = (item) => {
    const cur = cart[item.id] || 0;
    if (cur <= 1) {
      const next = { ...cart };
      delete next[item.id];
      setCart(next);
    } else {
      setCart({ ...cart, [item.id]: cur - 1 });
    }
  };

  const cartItemsArray = Object.entries(cart).map(([itemId, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === itemId);
    return { ...item, qty };
  });

  const cartCount = cartItemsArray.reduce((acc, it) => acc + it.qty, 0);
  const cartSubtotal = cartItemsArray.reduce((acc, it) => acc + (it.qty * it.price), 0);
  const cartTax = Math.round(cartSubtotal * 0.05);
  const cartGrandTotal = cartSubtotal + cartTax;

  // Real-time sync with Kitchen Ticket
  const activeTicket = (kitchenOrders && orderNumber)
    ? kitchenOrders.find((o) => o.id === orderNumber) || lastSubmittedTicket
    : lastSubmittedTicket;
  const currentStatus = activeTicket ? activeTicket.status : "new";

  const handleSendOrder = () => {
    if (cartItemsArray.length === 0) return;

    const ordNo = "KOT-" + Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(ordNo);

    const now = new Date();
    const timeStr = `${pad(now.getHours() > 12 ? now.getHours() - 12 : now.getHours() || 12)}:${pad(now.getMinutes())} ${now.getHours() >= 12 ? "PM" : "AM"}`;

    const newTicket = {
      id: ordNo,
      tableId: currentTable.id,
      tableName: currentTable.name,
      time: timeStr,
      timestamp: Date.now(),
      source: "QR Code",
      items: cartItemsArray.map((it) => ({
        name: it.name,
        qty: it.qty,
        price: it.price,
        icon: it.icon || "☕",
        done: false
      })),
      specialNotes: specialNotes.trim(),
      status: "new"
    };

    setLastSubmittedTicket(newTicket);

    // Send ticket to Kitchen Display System & trigger sound
    if (onSendKitchenOrder) {
      onSendKitchenOrder(newTicket, cartItemsArray);
    } else {
      playKitchenDing();
    }

    // Update table running tab & occupied status
    setTables(tables.map((t) => {
      if (t.id === currentTable.id) {
        const existingOrder = [...(t.order || [])];

        cartItemsArray.forEach((it) => {
          const exIdx = existingOrder.findIndex((x) => x[0] === it.name);
          if (exIdx >= 0) {
            existingOrder[exIdx] = [existingOrder[exIdx][0], existingOrder[exIdx][1] + it.qty, existingOrder[exIdx][2], "QR"];
          } else {
            existingOrder.push([it.name, it.qty, it.price, "QR"]);
          }
        });

        return {
          ...t,
          status: "Occupied",
          seatedAt: t.status === "Occupied" ? t.seatedAt : timeStr,
          guests: t.guests > 0 ? t.guests : 2,
          order: existingOrder,
          qrCount: (t.qrCount || 0) + 1
        };
      }
      return t;
    }));

    setOrderPlaced(true);
    setIsCartOpen(false);
  };

  return (
    <div className="mobile-view-container">
      {/* Smartphone frame */}
      <div className="mobile-shell">
        <div className="mobile-notch">
          <span className="notch-speaker"></span>
          <span className="notch-cam"></span>
        </div>

        {/* Cafe App Header */}
        <div className="mobile-top-bar">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>☕</span>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, color: "#fff", fontWeight: 800 }}>Artisan Coffee House</h2>
              <span className="mobile-table-tag">🪑 You are at: {currentTable.name} (QR Menu)</span>
            </div>
          </div>
          <button
            type="button"
            className="mobile-exit-btn"
            onClick={() => go("/tables")}
            title="Return to Staff Floor"
          >
            ✕ Exit
          </button>
        </div>

        {/* If Order is Placed: Show Live Status Ticker (Live sync with Kitchen) */}
        {orderPlaced ? (
          <div className="mobile-success-card">
            <div className="success-anim-icon">
              {currentStatus === "ready" ? "🔔" : currentStatus === "preparing" ? "👨‍🍳" : "🎉"}
            </div>

            <h3 style={{ margin: "4px 0", fontSize: 20, color: currentStatus === "ready" ? "#16a34a" : "#0f172a", fontWeight: 900 }}>
              {currentStatus === "ready"
                ? "Your Order is Ready to Serve!"
                : currentStatus === "preparing"
                ? "Chef is Brewing & Cooking!"
                : "Order Sent to Kitchen!"}
            </h3>

            <p style={{ margin: 0, fontSize: 13, color: "var(--mut)", textAlign: "center" }}>
              Ticket <b>#{orderNumber}</b> sent to Kitchen for <b>{currentTable.name}</b>.
            </p>

            {/* Live Kitchen Status Alert Pill */}
            <div className={`kitchen-status-pill ${currentStatus}`}>
              {currentStatus === "new" && (
                <span>⏱️ <b>Status:</b> Order received at kitchen station. Chef will start shortly.</span>
              )}
              {currentStatus === "preparing" && (
                <span>🔥 <b>Status:</b> Barista & Chef are preparing your fresh food & drinks right now!</span>
              )}
              {currentStatus === "ready" && (
                <span>🔔 <b>Status:</b> Food is freshly ready! Server is bringing it to your table now!</span>
              )}
              {currentStatus === "served" && (
                <span>✅ <b>Status:</b> Order delivered to your table. Enjoy your visit!</span>
              )}
            </div>

            {/* Live 3-Stage Order Tracker */}
            <div className="order-live-tracker">
              <div className="tracker-step done">
                <span className="step-dot">✓</span>
                <span>Sent to Kitchen</span>
              </div>
              <div className={`tracker-line ${currentStatus === "preparing" || currentStatus === "ready" || currentStatus === "served" ? "done" : ""}`}></div>

              <div className={`tracker-step ${currentStatus === "ready" || currentStatus === "served" ? "done" : currentStatus === "preparing" ? "active pulsing" : ""}`}>
                <span className="step-dot">
                  {currentStatus === "ready" || currentStatus === "served" ? "✓" : "☕"}
                </span>
                <span>{currentStatus === "preparing" ? "Cooking / Brewing" : currentStatus === "ready" || currentStatus === "served" ? "Cooked" : "Kitchen Queue"}</span>
              </div>
              <div className={`tracker-line ${currentStatus === "ready" || currentStatus === "served" ? "done" : ""}`}></div>

              <div className={`tracker-step ${currentStatus === "served" ? "done" : currentStatus === "ready" ? "active pulsing" : ""}`}>
                <span className="step-dot">
                  {currentStatus === "served" ? "✓" : "🚶"}
                </span>
                <span>{currentStatus === "served" ? "Delivered" : currentStatus === "ready" ? "Serving to Table" : "Deliver"}</span>
              </div>
            </div>

            {/* If Customer Added Special Chef Instructions */}
            {specialNotes && (
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "8px 12px", width: "100%", fontSize: 12, color: "#92400e", textAlign: "left", marginBottom: 10 }}>
                <b>📝 Note sent to Kitchen:</b> "{specialNotes}"
              </div>
            )}

            {/* Order Items Receipt Box */}
            <div className="success-items-list">
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6, color: "var(--dk)" }}>Your Items in Kitchen:</div>
              {cartItemsArray.map((it) => (
                <div key={it.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "3px 0" }}>
                  <span>{it.qty}x {it.name}</span>
                  <b>₹{(it.qty * it.price).toFixed(2)}</b>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 800, marginTop: 8, borderTop: "1px dashed #cbd5e1", paddingTop: 6, color: "#0d8a2f" }}>
                <span>Total Added to {currentTable.name} Bill:</span>
                <span>₹{cartGrandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", marginTop: 14 }}>
              <button
                type="button"
                className="btn-save"
                style={{ width: "100%", padding: "11px", fontSize: 13, fontWeight: 700 }}
                onClick={() => { setCart({}); setOrderPlaced(false); }}
              >
                + Order More Drinks or Food
              </button>

              <button
                type="button"
                style={{ width: "100%", padding: "9px", fontSize: 12, background: "#ea580c", color: "#fff", border: 0, borderRadius: 6, fontWeight: 700, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}
                onClick={() => go("/kitchen")}
              >
                <span>👨‍🍳</span>
                <span>Demo: View this in Kitchen Display (KDS)</span>
              </button>

              <button
                type="button"
                className="btn-cancel"
                style={{ width: "100%", padding: "8px", fontSize: 12 }}
                onClick={() => go("/tables")}
              >
                Return to Table Floor
              </button>
            </div>
          </div>
        ) : (
          /* Normal Menu View */
          <div className="mobile-menu-scroll">
            {/* Banner Greeting */}
            <div className="mobile-promo-banner">
              <div>
                <b>Instant Table Ordering ✨</b>
                <p>Pick your items & tap send. Your order goes directly to the kitchen for {currentTable.name}!</p>
              </div>
              <span style={{ fontSize: 36 }}>🥐</span>
            </div>

            {/* Category filter pills */}
            <div className="mobile-cat-pills">
              {categories.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={selectedCat === c ? "on" : ""}
                  onClick={() => setSelectedCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Menu Items List */}
            <div className="mobile-items-list">
              {filteredMenu.map((item) => {
                const qtyInCart = cart[item.id] || 0;
                return (
                  <div key={item.id} className="mobile-item-card">
                    <div className="item-icon-col">
                      <span className="item-emoji">{item.icon}</span>
                    </div>

                    <div className="item-details-col">
                      <div className="item-title-row">
                        <h4>{item.name}</h4>
                        {item.badge && <span className="item-badge">{item.badge}</span>}
                      </div>
                      <p className="item-desc">{item.desc}</p>
                      <div className="item-bottom-row">
                        <span className="item-price">₹{item.price.toFixed(2)}</span>

                        {qtyInCart > 0 ? (
                          <div className="qty-stepper">
                            <button type="button" onClick={() => removeFromCart(item)}>–</button>
                            <span>{qtyInCart}</span>
                            <button type="button" onClick={() => addToCart(item)}>+</button>
                          </div>
                        ) : (
                          <button type="button" className="add-btn" onClick={() => addToCart(item)}>
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Floating Cart Pill at Bottom */}
        {!orderPlaced && cartCount > 0 && (
          <div className="mobile-floating-cart" onClick={() => setIsCartOpen(true)}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="cart-badge-icon">🛒 {cartCount}</span>
              <div>
                <b style={{ color: "#fff", fontSize: 15 }}>₹{cartGrandTotal.toFixed(2)}</b>
                <small style={{ color: "#cbd5e1", display: "block", fontSize: 11 }}>Ready to send to Kitchen</small>
              </div>
            </div>
            <button type="button" className="cart-cta-btn">
              Send Order ➔
            </button>
          </div>
        )}

        {/* Cart Review Slide-up Sheet */}
        {isCartOpen && (
          <div className="cart-sheet-overlay" onClick={() => setIsCartOpen(false)}>
            <div className="cart-sheet" onClick={(e) => e.stopPropagation()}>
              <div className="cart-sheet-header">
                <div>
                  <h3 style={{ margin: 0, fontSize: 17, color: "var(--ink)" }}>Confirm Order for Kitchen</h3>
                  <small style={{ color: "var(--mut)" }}>Delivery to: <b>{currentTable.name}</b></small>
                </div>
                <button type="button" className="sheet-close" onClick={() => setIsCartOpen(false)}>✕</button>
              </div>

              <div className="cart-sheet-body">
                {cartItemsArray.map((it) => (
                  <div key={it.id} className="cart-sheet-item">
                    <span style={{ fontSize: 20 }}>{it.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{it.name}</div>
                      <div style={{ color: "var(--mut)", fontSize: 12 }}>₹{it.price} each</div>
                    </div>
                    <div className="qty-stepper" style={{ marginRight: 10 }}>
                      <button type="button" onClick={() => removeFromCart(it)}>–</button>
                      <span>{it.qty}</span>
                      <button type="button" onClick={() => addToCart(it)}>+</button>
                    </div>
                    <b style={{ fontSize: 14, minWidth: 55, textAlign: "right" }}>₹{(it.qty * it.price).toFixed(2)}</b>
                  </div>
                ))}

                {/* Special Instructions Input */}
                <div style={{ marginTop: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--mut)", display: "block", marginBottom: 5 }}>
                    📝 Special Instructions for Kitchen / Barista:
                  </label>
                  <input
                    placeholder="e.g. Extra hot milk, less sugar, crisp sandwich..."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 13 }}
                  />
                </div>

                {/* Bill Breakdown */}
                <div className="bill-summary" style={{ marginTop: 14 }}>
                  <div className="bill-line">
                    <span>Items Subtotal:</span>
                    <span>₹{cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="bill-line">
                    <span>Cafe GST (5%):</span>
                    <span>₹{cartTax.toFixed(2)}</span>
                  </div>
                  <div className="bill-line total">
                    <span>Total Added to {currentTable.name}:</span>
                    <span>₹{cartGrandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-save"
                  style={{ width: "100%", padding: "13px", fontSize: 15, fontWeight: 800, marginTop: 10, display: "flex", justifyContent: "center", alignItems: "center", gap: 10, background: "linear-gradient(135deg, #16a34a, #15803d)" }}
                  onClick={handleSendOrder}
                >
                  <span>🚀</span>
                  <span>SEND ORDER TO KITCHEN (₹{cartGrandTotal.toFixed(2)})</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Kitchen Order Ticket (KOT) Print Modal ---------- */
function KitchenTicketPrintModal({ order, onClose }) {
  if (!order) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 380, background: "#fff" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ background: "#0f172a" }}>
          <span>🖨️ Kitchen Order Ticket (KOT)</span>
          <button type="button" className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div style={{ padding: "20px" }}>
          <div className="kot-receipt">
            <div style={{ textAlign: "center", borderBottom: "2px dashed #000", paddingBottom: 8 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, letterSpacing: "1px" }}>ARTISAN COFFEE HOUSE</h3>
              <p style={{ margin: "2px 0", fontSize: 12, fontWeight: 700 }}>KITCHEN ORDER TICKET (KOT)</p>
            </div>

            <div style={{ margin: "10px 0", fontSize: 13, display: "flex", justifyContent: "space-between" }}>
              <span>TABLE: <b style={{ fontSize: 16 }}>{order.tableName}</b></span>
              <span>KOT #: <b>#{order.id}</b></span>
            </div>
            <div style={{ fontSize: 12, color: "#475569", marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
              <span>Time: <b>{order.time}</b></span>
              <span>Source: <b>{order.source}</b></span>
            </div>

            <table style={{ width: "100%", borderTop: "1px solid #000", borderBottom: "1px solid #000", margin: "10px 0", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px dashed #666" }}>
                  <th style={{ textAlign: "left", padding: "6px 0" }}>QTY</th>
                  <th style={{ textAlign: "left", padding: "6px 0" }}>ITEM DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px dotted #ccc" }}>
                    <td style={{ fontWeight: 800, padding: "6px 0", fontSize: 14 }}>{it.qty}x</td>
                    <td style={{ padding: "6px 0", fontSize: 13 }}>{it.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {order.specialNotes && (
              <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", padding: 8, borderRadius: 4, margin: "10px 0", fontSize: 12 }}>
                <b style={{ color: "#c2410c" }}>⚠️ CHEF INSTRUCTIONS:</b>
                <p style={{ margin: "3px 0 0", fontStyle: "italic" }}>"{order.specialNotes}"</p>
              </div>
            )}

            <div style={{ textAlign: "center", fontSize: 11, color: "#64748b", marginTop: 12, borderTop: "1px dashed #cbd5e1", paddingTop: 8 }}>
              * Placed via Table QR Self-Ordering *
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button
              type="button"
              className="btn-save"
              style={{ flex: 1, padding: 10, fontSize: 13 }}
              onClick={() => window.print()}
            >
              🖨️ Print Slip Now
            </button>
            <button
              type="button"
              className="btn-cancel"
              style={{ padding: "10px 16px", fontSize: 13 }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Kitchen Display System (KDS / #/kitchen) ---------- */
function KitchenDisplay({ go, orders, setOrders, tables, setTables }) {
  const [filterTab, setFilterTab] = useState("all-active"); // "all-active" | "new" | "preparing" | "ready" | "served" | "all"
  const [search, setSearch] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const [printOrder, setPrintOrder] = useState(null);
  const [clock, setClock] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const t = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  // Filter orders
  const activeOrders = orders.filter((o) => o.status !== "served");
  const newCount = orders.filter((o) => o.status === "new").length;
  const prepCount = orders.filter((o) => o.status === "preparing").length;
  const readyCount = orders.filter((o) => o.status === "ready").length;
  const servedCount = orders.filter((o) => o.status === "served").length;

  const filteredOrders = orders.filter((o) => {
    if (filterTab === "all-active") {
      if (o.status === "served") return false;
    } else if (filterTab !== "all" && o.status !== filterTab) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTable = o.tableName.toLowerCase().includes(q);
      const matchId = o.id.toLowerCase().includes(q);
      const matchItem = o.items.some((it) => it.name.toLowerCase().includes(q));
      if (!matchTable && !matchId && !matchItem) return false;
    }
    return true;
  });

  const handleUpdateStatus = (orderId, newStatus) => {
    if (soundOn && (newStatus === "ready" || newStatus === "preparing")) {
      playKitchenDing();
    }
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  const handleToggleItem = (orderId, itemIdx) => {
    setOrders(orders.map((o) => {
      if (o.id === orderId) {
        const nextItems = [...o.items];
        nextItems[itemIdx] = { ...nextItems[itemIdx], done: !nextItems[itemIdx].done };
        return { ...o, items: nextItems };
      }
      return o;
    }));
  };

  const handleVoidOrder = (orderId) => {
    if (window.confirm(`Void and remove ticket #${orderId} from Kitchen?`)) {
      setOrders(orders.filter((o) => o.id !== orderId));
    }
  };

  return (
    <div className="kds-screen">
      {/* KDS Header Bar */}
      <div className="kds-header">
        <div className="kds-title-col">
          <div className="kds-logo-row">
            <span className="kds-chef-hat">👨‍🍳</span>
            <div>
              <h2 className="kds-main-title">KITCHEN DISPLAY SYSTEM (KDS)</h2>
              <span className="kds-subtitle">Live Table QR Orders & Barista Station</span>
            </div>
          </div>
        </div>

        {/* Live Counters */}
        <div className="kds-stat-pills">
          <div className={`kds-pill new ${newCount > 0 ? "pulse" : ""}`}>
            <span className="pill-dot"></span>
            <b>{newCount}</b>
            <small>New Orders</small>
          </div>
          <div className="kds-pill prep">
            <b>{prepCount}</b>
            <small>Cooking</small>
          </div>
          <div className="kds-pill ready">
            <b>{readyCount}</b>
            <small>Ready</small>
          </div>
        </div>

        {/* Clock & Action buttons */}
        <div className="kds-controls-col">
          <div className="kds-live-clock">🕒 {clock}</div>
          <div className="kds-actions-row">
            <button
              type="button"
              className={`kds-btn-tool ${soundOn ? "active" : ""}`}
              onClick={() => setSoundOn(!soundOn)}
              title="Toggle Kitchen Buzzer Sound"
            >
              {soundOn ? "🔔 Buzzer ON" : "🔕 Muted"}
            </button>
            <button
              type="button"
              className="kds-btn-tool"
              onClick={() => go("/tables")}
              title="Return to Table Floor"
            >
              🪑 Tables Floor
            </button>
            <button
              type="button"
              className="kds-btn-tool primary"
              onClick={() => window.print()}
              title="Print All Active KOTs"
            >
              🖨️ Print Active
            </button>
          </div>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="kds-filter-bar">
        <div className="kds-tabs">
          {[
            ["all-active", `🔥 All Active (${activeOrders.length})`],
            ["new", `🔔 Incoming (${newCount})`],
            ["preparing", `🍳 Cooking (${prepCount})`],
            ["ready", `✅ Ready to Serve (${readyCount})`],
            ["served", `📦 History (${servedCount})`],
            ["all", `All Tickets (${orders.length})`]
          ].map(([tabKey, label]) => (
            <button
              type="button"
              key={tabKey}
              className={`kds-tab-btn ${filterTab === tabKey ? "on" : ""}`}
              onClick={() => setFilterTab(tabKey)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="kds-search-box">
          <input
            placeholder="🔍 Filter by table, item, KOT #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <button type="button" onClick={() => setSearch("")}>✕</button>}
        </div>
      </div>

      {/* Ticket Cards Grid */}
      <div className="kds-tickets-grid">
        {filteredOrders.length === 0 ? (
          <div className="kds-empty-msg">
            <span style={{ fontSize: 44 }}>✨</span>
            <h3>No orders in this station!</h3>
            <p>Customer orders scanned from table QR codes will instantly ring here.</p>
            <button type="button" className="btn-save" onClick={() => go("/tables")} style={{ marginTop: 12 }}>
              Go to Tables & Scan QR Code
            </button>
          </div>
        ) : (
          filteredOrders.map((ord) => {
            const isNew = ord.status === "new";
            const isPrep = ord.status === "preparing";
            const isReady = ord.status === "ready";
            const isServed = ord.status === "served";

            const elapsedMins = Math.max(0, Math.floor((Date.now() - (ord.timestamp || Date.now())) / 60000));
            const timerColor = elapsedMins >= 10 ? "#ef4444" : elapsedMins >= 5 ? "#f59e0b" : "#22c55e";

            return (
              <div
                key={ord.id}
                className={`kot-ticket-card ${ord.status} ${isNew ? "new-pulse" : ""}`}
              >
                {/* Header of Ticket */}
                <div className="kot-header">
                  <div className="kot-header-top">
                    <span className="kot-table-badge">🪑 {ord.tableName}</span>
                    <span className={`kot-status-badge ${ord.status}`}>
                      {isNew ? "🔔 NEW ORDER" : isPrep ? "🍳 IN KITCHEN" : isReady ? "✅ READY" : "📦 SERVED"}
                    </span>
                  </div>

                  <div className="kot-meta-row">
                    <span className="kot-id">#{ord.id}</span>
                    <span className="kot-source">{ord.source === "QR Code" ? "📱 Table QR" : "🧑‍💼 Staff"}</span>
                    <span className="kot-timer" style={{ color: timerColor }}>
                      ⏱️ {elapsedMins === 0 ? "Just now" : `${elapsedMins}m ago`} ({ord.time})
                    </span>
                  </div>
                </div>

                {/* Chef Special Notes Alert */}
                {ord.specialNotes && (
                  <div className="kot-chef-note">
                    <span className="note-icon">⚠️</span>
                    <div>
                      <b>CHEF NOTE:</b>
                      <p>"{ord.specialNotes}"</p>
                    </div>
                  </div>
                )}

                {/* Items List with interactive checkboxes */}
                <div className="kot-items-list">
                  {ord.items.map((it, idx) => (
                    <div
                      key={idx}
                      className={`kot-item-row ${it.done ? "done" : ""}`}
                      onClick={() => handleToggleItem(ord.id, idx)}
                      title="Click to check off item as cooked"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(it.done)}
                        onChange={() => {}}
                        style={{ cursor: "pointer", width: 16, height: 16 }}
                      />
                      <span className="kot-item-qty">{it.qty}x</span>
                      <span className="kot-item-icon">{it.icon || "☕"}</span>
                      <span className="kot-item-name">{it.name}</span>
                    </div>
                  ))}
                </div>

                {/* Ticket Actions */}
                <div className="kot-footer-actions">
                  {isNew && (
                    <button
                      type="button"
                      className="kot-btn start"
                      onClick={() => handleUpdateStatus(ord.id, "preparing")}
                    >
                      👨‍🍳 Start Cooking
                    </button>
                  )}

                  {isPrep && (
                    <button
                      type="button"
                      className="kot-btn ready"
                      onClick={() => handleUpdateStatus(ord.id, "ready")}
                    >
                      ✅ Mark Ready / Done
                    </button>
                  )}

                  {isReady && (
                    <button
                      type="button"
                      className="kot-btn serve"
                      onClick={() => handleUpdateStatus(ord.id, "served")}
                    >
                      🚶 Mark Served to Table
                    </button>
                  )}

                  {isServed && (
                    <button
                      type="button"
                      className="kot-btn reopen"
                      onClick={() => handleUpdateStatus(ord.id, "preparing")}
                    >
                      ↩️ Re-open Ticket
                    </button>
                  )}

                  <button
                    type="button"
                    className="kot-btn print"
                    onClick={() => setPrintOrder(ord)}
                    title="Print KOT Thermal Slip"
                  >
                    🖨️
                  </button>

                  <button
                    type="button"
                    className="kot-btn void"
                    onClick={() => handleVoidOrder(ord.id)}
                    title="Void Ticket"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* KOT Print Modal */}
      {printOrder && (
        <KitchenTicketPrintModal
          order={printOrder}
          onClose={() => setPrintOrder(null)}
        />
      )}
    </div>
  );
}

/* ---------- Modal Component for Editing / Adding Vendors & Stock ---------- */
function EditModal({ modal, onClose, onSave }) {
  if (!modal) return null;
  const isVendor = modal.type === "vendor";
  const isAdd = modal.mode === "add";
  const [formData, setFormData] = useState([...modal.data]);

  const update = (idx, val) => {
    const next = [...formData];
    next[idx] = val;
    setFormData(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isVendor) {
      if (!formData[0]?.trim()) {
        alert("Please enter a vendor name");
        return;
      }
    } else {
      if (!formData[0]?.trim()) {
        alert("Please enter an item name");
        return;
      }
      formData[3] = Math.max(0, parseInt(formData[3], 10) || 0);
      formData[4] = Math.max(0, parseFloat(formData[4]) || 0);
      if (formData[6] !== undefined) {
        formData[6] = Math.max(0, parseInt(formData[6], 10) || 10);
      }
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span>{isAdd ? (isVendor ? "➕ Add New Vendor" : "➕ Add New Stock Item") : (isVendor ? `✏️ Edit Vendor: ${formData[0] || ""}` : `✏️ Edit Stock Item: ${formData[0] || ""}`)}</span>
          <button type="button" className="close-btn" onClick={onClose} title="Close">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {isVendor ? (
              <>
                <div className="modal-field full-span">
                  <label>Vendor Name *</label>
                  <input
                    required
                    value={formData[0] || ""}
                    onChange={(e) => update(0, e.target.value)}
                    placeholder="e.g. FreshFoods Pvt Ltd"
                  />
                </div>
                <div className="modal-field">
                  <label>Contact Person</label>
                  <input
                    value={formData[1] || ""}
                    onChange={(e) => update(1, e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                  />
                </div>
                <div className="modal-field">
                  <label>Phone Number</label>
                  <input
                    value={formData[2] || ""}
                    onChange={(e) => update(2, e.target.value)}
                    placeholder="e.g. 9876543210"
                  />
                </div>
                <div className="modal-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formData[3] || ""}
                    onChange={(e) => update(3, e.target.value)}
                    placeholder="e.g. ramesh@freshfoods.in"
                  />
                </div>
                <div className="modal-field">
                  <label>City / Region</label>
                  <input
                    value={formData[4] || ""}
                    onChange={(e) => update(4, e.target.value)}
                    placeholder="e.g. Chennai"
                  />
                </div>
                <div className="modal-field">
                  <label>Status</label>
                  <select
                    value={formData[5] || "Active"}
                    onChange={(e) => update(5, e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="modal-field">
                  <label>Payment Terms</label>
                  <input
                    value={formData[9] || ""}
                    onChange={(e) => update(9, e.target.value)}
                    placeholder="e.g. 30 Days"
                  />
                </div>
                <div className="modal-field full-span">
                  <label>Full Address</label>
                  <input
                    value={formData[7] || ""}
                    onChange={(e) => update(7, e.target.value)}
                    placeholder="e.g. No. 123, Food Street, Chennai - 600001"
                  />
                </div>
                <div className="modal-field full-span">
                  <label>Products Supplied</label>
                  <input
                    value={formData[8] || ""}
                    onChange={(e) => update(8, e.target.value)}
                    placeholder="e.g. Fruits, Vegetables, Fresh Produce"
                  />
                </div>
                <div className="modal-field full-span">
                  <label>Remarks / Notes</label>
                  <input
                    value={formData[10] || ""}
                    onChange={(e) => update(10, e.target.value)}
                    placeholder="e.g. Reliable supplier with high quality produce."
                  />
                </div>
              </>
            ) : (
              <>
                <div className="modal-field full-span">
                  <label>Item Name *</label>
                  <input
                    required
                    value={formData[0] || ""}
                    onChange={(e) => update(0, e.target.value)}
                    placeholder="e.g. Cappuccino"
                  />
                </div>
                <div className="modal-field">
                  <label>Category</label>
                  <select
                    value={formData[1] || "Beverages"}
                    onChange={(e) => update(1, e.target.value)}
                  >
                    <option value="Beverages">Beverages</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
                <div className="modal-field">
                  <label>SKU Code</label>
                  <input
                    value={formData[2] || ""}
                    onChange={(e) => update(2, e.target.value)}
                    placeholder="e.g. BEV001"
                  />
                </div>
                <div className="modal-field">
                  <label>Current Stock (Units)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData[3] !== undefined ? formData[3] : 0}
                    onChange={(e) => update(3, e.target.value)}
                  />
                </div>
                <div className="modal-field">
                  <label>Unit Price (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData[4] !== undefined ? formData[4] : 0}
                    onChange={(e) => update(4, e.target.value)}
                  />
                </div>
                <div className="modal-field">
                  <label>Supplier</label>
                  <input
                    value={formData[5] || "FreshFoods Pvt Ltd"}
                    onChange={(e) => update(5, e.target.value)}
                    placeholder="e.g. FreshFoods Pvt Ltd"
                  />
                </div>
                <div className="modal-field">
                  <label>Reorder Level (Units)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData[6] !== undefined ? formData[6] : 10}
                    onChange={(e) => update(6, e.target.value)}
                  />
                </div>
                <div className="modal-field full-span">
                  <label>Storage / Store Location</label>
                  <input
                    value={formData[7] || "Chennai - Main Store"}
                    onChange={(e) => update(7, e.target.value)}
                    placeholder="e.g. Chennai - Main Store"
                  />
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">{isAdd ? "Add Record" : "Save Changes"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Modal Component for Adding/Editing Tables ---------- */
function TableModal({ table, onClose, onSave }) {
  if (!table) return null;
  const isEdit = Boolean(table.id);
  const [formData, setFormData] = useState({
    name: table.name || "",
    seats: table.seats || 4,
    status: table.status || "Available",
    waiter: table.waiter && table.waiter !== "—" ? table.waiter : "Karthik"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a table name");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span>{isEdit ? `✏️ Edit Table: ${table.name}` : "➕ Add New Table"}</span>
          <button type="button" className="close-btn" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="modal-field full-span">
              <label>Table Name / Number *</label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Table 9"
              />
            </div>
            <div className="modal-field">
              <label>Capacity (Seats)</label>
              <input
                type="number"
                min="1"
                max="24"
                value={formData.seats}
                onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value, 10) || 1 })}
              />
            </div>
            <div className="modal-field">
              <label>Initial Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
            <div className="modal-field full-span">
              <label>Assigned Staff / Waiter</label>
              <select
                value={formData.waiter}
                onChange={(e) => setFormData({ ...formData, waiter: e.target.value })}
              >
                <option value="Karthik">Karthik</option>
                <option value="Priya">Priya</option>
                <option value="Ramesh">Ramesh</option>
                <option value="Pooja">Pooja</option>
                <option value="—">Unassigned</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">{isEdit ? "Update Table" : "Create Table"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Multi-Role Login Portal (Admin, Supplier, Kitchen) ---------- */
function LoginView({ onLogin }) {
  const [activeRole, setActiveRole] = useState("admin"); // 'admin' | 'supplier' | 'kitchen'
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const ROLES = [
    {
      id: "admin",
      title: "Admin",
      badge: "👑 Cafe Management",
      tagline: "Cafe Financials, Sales & Floor POS",
      desc: "Full administrative access to cafe operations, daily sales review, revenue charts, and dining table management.",
      color: "#1d4ed8",
      accent: "#3b82f6",
      gradient: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
      icon: "👑",
      defaultUser: "admin",
      defaultPass: "admin123",
      landingRoute: "/",
      landingName: "Cafe Home Dashboard",
      highlights: [
        "Daily & Hourly Sales Analytics",
        "Dining Table Floor & POS Billing",
        "Table QR Sticker Code Generator",
        "Complete Management Authority"
      ]
    },
    {
      id: "supplier",
      title: "Supplier (Suplyer)",
      badge: "🚚 Supply & Inventory",
      tagline: "Raw Ingredients & Vendor Logistics",
      desc: "Vendor logistics hub for managing inventory stock levels, low-stock warnings, supplier contacts, and replenishment.",
      color: "#059669",
      accent: "#10b981",
      gradient: "linear-gradient(135deg, #047857 0%, #10b981 100%)",
      icon: "🚚",
      defaultUser: "supplier",
      defaultPass: "supplier123",
      landingRoute: "/glossary",
      landingName: "Supplier Stock & Vendor Hub",
      highlights: [
        "Live Inventory Stock & Unit Balances",
        "Low Stock & Out-of-Stock Warnings",
        "Direct Vendor Supply Directory",
        "Raw Ingredient Restocking Controls"
      ]
    },
    {
      id: "kitchen",
      title: "Kitchen",
      badge: "👨‍🍳 Chef & Prep Station",
      tagline: "Kitchen Display System (KDS)",
      desc: "Live order screen for line chefs & baristas. Real-time food prep queue, KOT receipts, sound ding, and order status updates.",
      color: "#ea580c",
      accent: "#f97316",
      gradient: "linear-gradient(135deg, #c2410c 0%, #f97316 100%)",
      icon: "👨‍🍳",
      defaultUser: "kitchen",
      defaultPass: "kitchen123",
      landingRoute: "/kitchen",
      landingName: "Kitchen Display System (KDS)",
      highlights: [
        "Real-Time Kitchen Display Screen",
        "Order Queue: Cooking, Ready & Served",
        "Thermal KOT Print Ticket Generation",
        "Audible Kitchen Ding & Sound Buzzer"
      ]
    }
  ];

  const handleSelectRole = (roleId) => {
    setActiveRole(roleId);
    setError("");
    const r = ROLES.find((x) => x.id === roleId);
    if (r) {
      setUsername(r.defaultUser);
      setPassword(r.defaultPass);
    }
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    const u = (username || "").trim().toLowerCase();
    const p = (password || "").trim();
    const current = ROLES.find((r) => r.id === activeRole);

    if (!u) {
      setError("Please enter a username.");
      return;
    }

    let valid = false;
    let displayName = "";

    if (activeRole === "admin") {
      if (u === "admin" || u === "owner" || u === "manager") {
        valid = true;
        displayName = "Admin Manager";
      } else {
        valid = p.length > 0;
        displayName = username;
      }
    } else if (activeRole === "supplier") {
      if (u === "supplier" || u === "suplyer" || u === "vendor") {
        valid = true;
        displayName = "Supplier Partner";
      } else {
        valid = p.length > 0;
        displayName = username;
      }
    } else if (activeRole === "kitchen") {
      if (u === "kitchen" || u === "chef" || u === "cook") {
        valid = true;
        displayName = "Kitchen Head Chef";
      } else {
        valid = p.length > 0;
        displayName = username;
      }
    }

    if (!valid && p.length < 3) {
      setError(`Invalid credentials for ${current.title}. You can click "⚡ 1-Click Login" or use demo credentials.`);
      return;
    }

    setError("");
    onLogin({
      role: activeRole,
      name: displayName || current.title,
      username: u,
      landingRoute: current.landingRoute
    });
  };

  const handleInstantLogin = (roleId) => {
    const r = ROLES.find((x) => x.id === roleId);
    if (!r) return;
    onLogin({
      role: r.id,
      name: r.id === "admin" ? "Admin Manager" : r.id === "supplier" ? "Supplier Partner" : "Kitchen Head Chef",
      username: r.defaultUser,
      landingRoute: r.landingRoute
    });
  };

  const currentRole = ROLES.find((r) => r.id === activeRole) || ROLES[0];

  return (
    <div className="login-wrapper">
      {/* Brand Header */}
      <div className="login-brand-header">
        <div className="brand-logo-pill">
          <span className="brand-icon">☕</span>
          <span className="brand-name">ESPRESSO & CO.</span>
          <span className="brand-sub">PORTAL</span>
        </div>
        <h1 className="login-main-title">Select Login Role</h1>
        <p className="login-sub-title">
          Sign in to your dedicated portal: <b>Admin</b>, <b>Supplier</b> (suplyer), or <b>Kitchen</b>.
        </p>
      </div>

      {/* 3 Role Selection Cards */}
      <div className="login-roles-grid">
        {ROLES.map((role) => {
          const isSelected = activeRole === role.id;
          return (
            <div
              key={role.id}
              className={`login-role-card ${isSelected ? "selected" : ""}`}
              onClick={() => handleSelectRole(role.id)}
            >
              <div className="role-card-top">
                <div className="role-avatar" style={{ background: role.gradient }}>
                  <span>{role.icon}</span>
                </div>
                <div className="role-header-text">
                  <span className="role-badge" style={{ color: role.color }}>{role.badge}</span>
                  <h3 className="role-name">{role.title}</h3>
                </div>
              </div>

              <div className="role-tagline">{role.tagline}</div>
              <p className="role-desc">{role.desc}</p>

              <div className="role-features">
                {role.highlights.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="role-feat-item">
                    <span className="feat-check">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="role-actions">
                <button
                  type="button"
                  className="btn-select-role"
                  style={{
                    background: isSelected ? role.gradient : "#f1f5f9",
                    color: isSelected ? "#fff" : "#334155"
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectRole(role.id);
                  }}
                >
                  {isSelected ? `● Selected (${role.title})` : `Select ${role.title}`}
                </button>

                <button
                  type="button"
                  className="btn-instant-login"
                  style={{ borderColor: role.color, color: role.color }}
                  title={`Directly login as ${role.title} with 1 click`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInstantLogin(role.id);
                  }}
                >
                  ⚡ 1-Click Login
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Form for the Selected Role */}
      <div className="login-form-panel">
        <div className="form-panel-header" style={{ borderLeft: `5px solid ${currentRole.color}` }}>
          <div className="form-header-badge" style={{ background: currentRole.gradient }}>
            <span>{currentRole.icon}</span>
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, color: "var(--ink)" }}>
              Sign In to {currentRole.title} Portal
            </h3>
            <small style={{ color: "var(--mut)", fontSize: 13 }}>
              Destination after login: <b>{currentRole.landingName}</b> ({currentRole.landingRoute})
            </small>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="login-form-body">
          {error && <div className="login-error-alert">⚠️ {error}</div>}

          <div className="form-row-inputs">
            <div className="form-group">
              <label>Username / ID</label>
              <input
                type="text"
                className="login-input"
                placeholder={`e.g. ${currentRole.defaultUser}`}
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="login-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                required
              />
            </div>
          </div>

          <div className="quick-credentials-hint">
            <span>🔑 Demo Login Hint:</span>
            <button
              type="button"
              className="cred-pill"
              onClick={() => { setUsername(currentRole.defaultUser); setPassword(currentRole.defaultPass); setError(""); }}
            >
              Fill <b>{currentRole.defaultUser}</b> / <b>{currentRole.defaultPass}</b>
            </button>
            {activeRole === "supplier" && (
              <button
                type="button"
                className="cred-pill"
                onClick={() => { setUsername("suplyer"); setPassword("supplier123"); setError(""); }}
              >
                Fill <b>suplyer</b> / <b>supplier123</b>
              </button>
            )}
          </div>

          <div className="form-submit-row">
            <button
              type="submit"
              className="btn-main-login"
              style={{ background: currentRole.gradient }}
            >
              <span>{currentRole.icon}</span>
              <span>Sign In as {currentRole.title} ➔</span>
            </button>

            <button
              type="button"
              className="btn-instant-alt"
              onClick={() => handleInstantLogin(activeRole)}
            >
              ⚡ Fast 1-Click Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Home (Kitchen removed - 3 Main Modules: Review, Glossary, Tables) ---------- */
function Home({ go, currentUser }) {
  return (
    <div className="admin-home-container">
      {/* Admin Header Banner */}
      <div className="admin-home-hero">
        <div className="admin-hero-left">
          <div className="admin-role-badge">
            <span className="admin-badge-dot"></span>
            <span>👑 CAFE ADMINISTRATOR PORTAL</span>
          </div>
          <h2 className="admin-hero-title">Espresso & Co. Operations Dashboard</h2>
          <p className="admin-hero-desc">
            Monitor real-time sales transactions, manage dining table floor layouts, print table QR stickers, and track inventory logistics.
          </p>
        </div>
        <div className="admin-hero-right">
          <div className="admin-stat-chip">
            <span className="chip-icon">☕</span>
            <div>
              <b>Cafe Active</b>
              <small>POS & Billing Online</small>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Main Action Cards (Kitchen removed) */}
      <div className="admin-cards-grid">
        {/* Card 1: Review */}
        <div className="admin-dash-card review-card" onClick={() => go("/review")}>
          <div className="dash-card-icon-wrap" style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}>
            <span>📄</span>
          </div>
          <div className="dash-card-content">
            <div className="dash-card-tag">FINANCIALS & SALES</div>
            <h3 className="dash-card-title">REVIEW</h3>
            <p className="dash-card-desc">Daily sales summaries, hourly transaction graphs, revenue breakdowns and historical reports.</p>
            <div className="dash-card-btn" style={{ color: "#1d4ed8" }}>
              <span>Open Sales Review</span>
              <span className="arrow">➔</span>
            </div>
          </div>
        </div>

        {/* Card 2: Glossary */}
        <div className="admin-dash-card glossary-card" onClick={() => go("/glossary")}>
          <div className="dash-card-icon-wrap" style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}>
            <span>📖</span>
          </div>
          <div className="dash-card-content">
            <div className="dash-card-tag">SUPPLY CHAIN & STOCKS</div>
            <h3 className="dash-card-title">GLOSSARY</h3>
            <p className="dash-card-desc">Suppliers & vendor directories, stock levels, raw ingredients replenishment and item catalogs.</p>
            <div className="dash-card-btn" style={{ color: "#059669" }}>
              <span>Manage Vendors & Stock</span>
              <span className="arrow">➔</span>
            </div>
          </div>
        </div>

        {/* Card 3: Tables */}
        <div className="admin-dash-card tables-card" onClick={() => go("/tables")}>
          <div className="dash-card-icon-wrap" style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}>
            <span>💰</span>
          </div>
          <div className="dash-card-content">
            <div className="dash-card-tag">TABLE INCOME & REVENUE</div>
            <h3 className="dash-card-title">TABLES</h3>
            <p className="dash-card-desc">Track how many rupees come from each dining table, running active bills, and total table income.</p>
            <div className="dash-card-btn" style={{ color: "#059669" }}>
              <span>View Table Income</span>
              <span className="arrow">➔</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Review({ go, sub }) {
  const [cal, setCal] = useState({ y: 2026, m: 9, d: 14 });
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pick = (d) => { setCal({ ...cal, d }); setPage(1); setQ(""); go("/review/day"); };
  const month = (n) => { let m = cal.m + n, y = cal.y; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } setCal({ y, m, d: 1 }); };
  const calCard = <div className="card"><div className="ch">📅 Specific Day Sales</div><div className="cb"><Calendar {...cal} onPick={pick} onMonth={month} /></div></div>;
  const todayCard = <div className="card g"><div className="ch">📈 Today's Sales Summary</div><div className="cb"><KP rev={4150} n={73} /><div className="hl">Hourly Sales</div><Chart v={hourly("today")} />
    <div className="inc"><span className="ic">💰</span><span><small>Total Income Since Sales Started</small><b>₹{TOTAL_INCOME.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</b><em>{SALES_START} – Today</em></span></div></div></div>;
  const detail = (
    <div className="card"><div className="ch">📋 Sales Detail Report</div>
      <div className="tw"><table><thead><tr><th>#</th><th>Time</th><th>Transaction ID</th><th>Item</th><th className="a">Amount</th></tr></thead>
        <tbody>{TODAY.map((x, i) => <tr key={i}><td>{i + 1}</td><td>{TT[i]}</td><td>TXN_{101 + i}</td><td>{x[1]}</td><td className="a">{money(x[0])}</td></tr>)}</tbody></table></div></div>
  );
  const dl = `${cal.d} ${MF[cal.m]} ${cal.y}`;
  const all = txs(cal.m, cal.d, 75).filter((x) => !q || (x.id + x.i + x.t).toLowerCase().includes(q.toLowerCase()));
  const pages = Math.max(1, Math.ceil(all.length / 15)), pg = Math.min(page, pages), [rev, n] = [dayRev(cal.m, cal.d), dayItems(cal.m, cal.d)], mt = monthTotal(cal.y, cal.m);

  return (
    <>
      {!sub && (
        <div className="home">
          <button className="big" onClick={() => go("/review/today")}><i>📈</i>TODAY'S SALES</button>
          <button className="big" onClick={() => go("/review/day")}><i>📅</i>SPECIFIC DAY SALES</button>
        </div>
      )}
      {sub === "today" && <div style={{ display: "grid", gap: 14 }}>{todayCard}{detail}</div>}
      {sub === "day" && <>
        <div className="grid g5">
          <div style={{ display: "grid", gap: 12 }}>{calCard}
            <div className="card g"><div className="cb"><div className="sel-t">Selected Date: {dl}</div><KP rev={rev} n={n} /><div className="hl">Hourly Sales ({dl})</div><Chart v={hourly(cal.d)} />
              <div className="inc"><span className="ic">🗓</span><span><small>Total Sales in {MN[cal.m]} {cal.y}</small><b>{inr(mt.rev)}</b><em>{mt.items} items sold · {mt.days} sales days</em></span></div></div></div></div>
          <div className="card"><div className="ch">📋 Sales Detail Report ({dl})<input className="srch" placeholder="🔍 Search transactions..." value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} /></div>
            <div className="tw tall"><table><thead><tr><th>#</th><th>Time</th><th>Transaction ID</th><th>Item</th><th className="a">Amount</th></tr></thead>
              <tbody>{all.slice((pg - 1) * 15, pg * 15).map((x, i) => <tr key={x.id}><td>{(pg - 1) * 15 + i + 1}</td><td>{x.t}</td><td>{x.id}</td><td>{x.i}</td><td className="a">{money(x.a)}</td></tr>)}</tbody></table></div>
            <div className="pg">
              <button disabled={pg <= 1} onClick={() => setPage(Math.max(1, pg - 1))}>‹</button>
              {Array.from({ length: Math.min(pages, 5) }, (_, i) => <button key={i} className={pg === i + 1 ? "on" : ""} onClick={() => setPage(i + 1)}>{i + 1}</button>)}
              <button disabled={pg >= pages} onClick={() => setPage(Math.min(pages, pg + 1))}>›</button>
            </div>
          </div>
        </div></>}
    </>
  );
}

function Glossary({ go, sub, currentUser }) {
  const [ven, setVen] = useState(VEN0), [stk, setStk] = useState(STK0);
  const [vi, setVi] = useState(0), [si, setSi] = useState(0);
  const [vq, setVq] = useState(""), [sq, setSq] = useState("");
  const [vPage, setVPage] = useState(1), [sPage, setSPage] = useState(1);
  const [editModal, setEditModal] = useState(null);

  const PAGE_SIZE = 5;

  const match = (arr, q) => arr.map((r, i) => [r, i]).filter(([r]) => !q || r.join(" ").toLowerCase().includes(q.toLowerCase()));

  const filteredVen = match(ven, vq);
  const vTotalPages = Math.max(1, Math.ceil(filteredVen.length / PAGE_SIZE));
  const currentVPage = Math.min(vPage, vTotalPages);
  const pagedVen = filteredVen.slice((currentVPage - 1) * PAGE_SIZE, currentVPage * PAGE_SIZE);

  const filteredStk = match(stk, sq);
  const sTotalPages = Math.max(1, Math.ceil(filteredStk.length / PAGE_SIZE));
  const currentSPage = Math.min(sPage, sTotalPages);
  const pagedStk = filteredStk.slice((currentSPage - 1) * PAGE_SIZE, currentSPage * PAGE_SIZE);

  const v = ven[vi] || ven[0] || null;
  const s = stk[si] || stk[0] || null;
  const st = stockStatus(s);

  // Stock KPI Calculations
  const totalStockCount = stk.length;
  const totalStockValue = stk.reduce((acc, curr) => acc + (Number(curr[3]) || 0) * (Number(curr[4]) || 0), 0);
  const lowStockCount = stk.filter((x) => { const n = Number(x[3]) || 0; return n > 0 && n <= 12; }).length;
  const outOfStockCount = stk.filter((x) => (Number(x[3]) || 0) === 0).length;

  const handleSaveModal = (savedData) => {
    if (editModal.type === "vendor") {
      if (editModal.mode === "add") {
        setVen([savedData, ...ven]);
        setVi(0);
        setVPage(1);
      } else {
        const next = [...ven];
        next[editModal.index] = savedData;
        setVen(next);
      }
    } else {
      if (editModal.mode === "add") {
        setStk([savedData, ...stk]);
        setSi(0);
        setSPage(1);
      } else {
        const next = [...stk];
        next[editModal.index] = savedData;
        setStk(next);
      }
    }
    setEditModal(null);
  };

  const Details = ({ rows }) => (
    <div className="dt">
      {rows.map(([a, b]) => (
        <span key={a} style={{ display: "contents" }}>
          <span>{a}</span>
          <span>{b}</span>
        </span>
      ))}
    </div>
  );

  return (
    <>
      {currentUser?.role === "supplier" && (
        <div className="supplier-portal-banner">
          <div className="supplier-banner-content">
            <span className="supplier-banner-icon">🚚</span>
            <div>
              <h3>SUPPLIER & INVENTORY LOGISTICS PORTAL</h3>
              <p>Welcome, {currentUser.name || "Supplier Partner"}. Monitor raw material stock levels, low-stock reorder warnings, and supplier contacts.</p>
            </div>
          </div>
        </div>
      )}

      <div className="sub">
        <button className={sub !== "stock" ? "on" : ""} onClick={() => go("/glossary")}>👥 Vendors</button>
        <button className={sub === "stock" ? "on" : ""} onClick={() => go("/glossary/stock")}>📦 Stock</button>
      </div>

      {sub !== "stock" ? (
        <div className="grid" style={{ gridTemplateColumns: "2fr 1fr" }}>
          <div className="card">
            <div className="ch">
              👥 Vendors
              <span>
                <input
                  className="srch"
                  style={{ width: 190 }}
                  placeholder="🔍 Search vendors..."
                  value={vq}
                  onChange={(e) => { setVq(e.target.value); setVPage(1); }}
                />
                <button
                  className="ab"
                  onClick={() => setEditModal({
                    type: "vendor",
                    mode: "add",
                    index: -1,
                    data: ["", "", "", "", "Chennai", "Active", "Chennai, Tamil Nadu", "", "Fresh Produce", "30 Days", ""]
                  })}
                >
                  + Add Vendor
                </button>
              </span>
            </div>
            <div className="tw tall">
              <table className="wide">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vendor Name</th>
                    <th>Contact Person</th>
                    <th>Phone No</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedVen.length === 0 ? (
                    <tr><td colSpan="8" style={{ textAlign: "center", padding: "20px", color: "var(--mut)" }}>No vendors found.</td></tr>
                  ) : (
                    pagedVen.map(([r, origIdx], pageIdx) => (
                      <tr
                        key={r[0] + origIdx}
                        className={"row " + (origIdx === vi ? "sel" : "")}
                        onClick={() => setVi(origIdx)}
                      >
                        <td>{(currentVPage - 1) * PAGE_SIZE + pageIdx + 1}</td>
                        <td><b>{r[0]}</b></td>
                        <td>{r[1] || "—"}</td>
                        <td>{r[2] || "—"}</td>
                        <td>{r[3] || "—"}</td>
                        <td>{r[4] || "—"}</td>
                        <td><span className={"pill " + (r[5] === "Active" ? "p-a" : "p-ia")}>{r[5]}</span></td>
                        <td className="act">
                          <button
                            title="Edit Vendor"
                            onClick={(e) => {
                              e.stopPropagation();
                              setVi(origIdx);
                              setEditModal({ type: "vendor", mode: "edit", index: origIdx, data: [...r] });
                            }}
                          >
                            ✎
                          </button>
                          <button
                            className="d"
                            title="Delete Vendor"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Delete vendor "${r[0]}"?`)) {
                                const nextVen = ven.filter((_, k) => k !== origIdx);
                                setVen(nextVen);
                                if (vi >= nextVen.length) setVi(Math.max(0, nextVen.length - 1));
                              }
                            }}
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="pg" style={{ justifyContent: "space-between" }}>
              <b style={{ color: "var(--mut)" }}>
                {filteredVen.length === 0
                  ? "Showing 0 of 0 vendors"
                  : `Showing ${(currentVPage - 1) * PAGE_SIZE + 1} to ${Math.min(currentVPage * PAGE_SIZE, filteredVen.length)} of ${filteredVen.length} vendors`}
              </b>
              <span>
                <button
                  disabled={currentVPage <= 1}
                  onClick={() => setVPage(Math.max(1, currentVPage - 1))}
                  title="Previous Page"
                >
                  ‹
                </button>
                {Array.from({ length: vTotalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={currentVPage === i + 1 ? "on" : ""}
                    onClick={() => setVPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentVPage >= vTotalPages}
                  onClick={() => setVPage(Math.min(vTotalPages, currentVPage + 1))}
                  title="Next Page"
                >
                  ›
                </button>
              </span>
            </div>
          </div>

          <div className="card g">
            <div className="ch">👥 Vendor Details</div>
            <div className="cb">
              {v ? (
                <>
                  <div className="hd">
                    <span className="ic b">🏢</span>
                    <div>
                      <h3>{v[0]}</h3>
                      <span className={"pill " + (v[5] === "Active" ? "p-a" : "p-ia")}>{v[5]}</span>
                    </div>
                    <button
                      className="eb"
                      title="Edit Vendor Details"
                      onClick={() => setEditModal({ type: "vendor", mode: "edit", index: vi, data: [...v] })}
                    >
                      ✎ Edit
                    </button>
                  </div>
                  <Details rows={[
                    ["Contact Person", v[1] || "—"],
                    ["Phone Number", v[2] || "—"],
                    ["Email", v[3] || "—"],
                    ["Location", v[6] || v[4] || "—"],
                    ["Address", v[7] || "—"],
                    ["Products Supplied", v[8] || "—"],
                    ["Payment Terms", v[9] || "—"],
                    ["Remarks", v[10] || "—"]
                  ]} />
                </>
              ) : (
                <div style={{ color: "var(--mut)", padding: 20 }}>No vendor selected</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="kpis">
            <div className="k1"><span className="ic">📦</span><span><small>Total Items</small><b>{totalStockCount}</b></span></div>
            <div className="k2"><span className="ic b">📦</span><span><small>Total Stock Value</small><b>{inr(totalStockValue)}</b></span></div>
            <div className="k3"><span className="ic" style={{ background: "#ffe7b3", color: "#c77a00" }}>⚠</span><span><small>Low Stock Items</small><b>{lowStockCount}</b></span></div>
            <div className="k4"><span className="ic" style={{ background: "#fbc9cc", color: "#c4161c" }}>📦</span><span><small>Out of Stock Items</small><b>{outOfStockCount}</b></span></div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "2fr 1fr" }}>
            <div className="card">
              <div className="ch">
                📦 Stock Items
                <span>
                  <input
                    className="srch"
                    style={{ width: 190 }}
                    placeholder="🔍 Search items..."
                    value={sq}
                    onChange={(e) => { setSq(e.target.value); setSPage(1); }}
                  />
                  <button
                    className="ab"
                    onClick={() => setEditModal({
                      type: "stock",
                      mode: "add",
                      index: -1,
                      data: ["", "Beverages", "BEV" + pad(stk.length + 1, 3), 10, 100, "FreshFoods Pvt Ltd", 10, "Chennai - Main Store", "Just now"]
                    })}
                  >
                    + Add Item
                  </button>
                </span>
              </div>
              <div className="tw tall">
                <table className="wide">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item Name</th>
                      <th>Category</th>
                      <th>SKU</th>
                      <th>Current Stock</th>
                      <th>Unit Price (₹)</th>
                      <th>Total Value (₹)</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedStk.length === 0 ? (
                      <tr><td colSpan="9" style={{ textAlign: "center", padding: "20px", color: "var(--mut)" }}>No items found.</td></tr>
                    ) : (
                      pagedStk.map(([r, origIdx], pageIdx) => {
                        const t = stockStatus(r);
                        const curStock = Number(r[3]) || 0;
                        const unitPrice = Number(r[4]) || 0;
                        return (
                          <tr
                            key={r[2] + origIdx}
                            className={"row " + (origIdx === si ? "sel" : "")}
                            onClick={() => setSi(origIdx)}
                          >
                            <td>{(currentSPage - 1) * PAGE_SIZE + pageIdx + 1}</td>
                            <td><b>{r[0]}</b></td>
                            <td>{r[1]}</td>
                            <td>{r[2]}</td>
                            <td style={{ textAlign: "center", fontWeight: 700, color: curStock <= 0 ? "#c4161c" : curStock <= 12 ? "#c77a00" : "inherit" }}>
                              {curStock}
                            </td>
                            <td>{unitPrice.toFixed(2)}</td>
                            <td>{(curStock * unitPrice).toFixed(2)}</td>
                            <td><span className={"pill " + t[1]}>{t[0]}</span></td>
                            <td className="act">
                              <button
                                title="Edit Item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSi(origIdx);
                                  setEditModal({ type: "stock", mode: "edit", index: origIdx, data: [...r] });
                                }}
                              >
                                ✎
                              </button>
                              <button
                                className="d"
                                title="Delete Item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (window.confirm(`Delete item "${r[0]}"?`)) {
                                    const nextStk = stk.filter((_, k) => k !== origIdx);
                                    setStk(nextStk);
                                    if (si >= nextStk.length) setSi(Math.max(0, nextStk.length - 1));
                                  }
                                }}
                              >
                                🗑
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="pg" style={{ justifyContent: "space-between" }}>
                <b style={{ color: "var(--mut)" }}>
                  {filteredStk.length === 0
                    ? "Showing 0 of 0 items"
                    : `Showing ${(currentSPage - 1) * PAGE_SIZE + 1} to ${Math.min(currentSPage * PAGE_SIZE, filteredStk.length)} of ${filteredStk.length} items`}
                </b>
                <span>
                  <button
                    disabled={currentSPage <= 1}
                    onClick={() => setSPage(Math.max(1, currentSPage - 1))}
                    title="Previous Page"
                  >
                    ‹
                  </button>
                  {Array.from({ length: sTotalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={currentSPage === i + 1 ? "on" : ""}
                      onClick={() => setSPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentSPage >= sTotalPages}
                    onClick={() => setSPage(Math.min(sTotalPages, currentSPage + 1))}
                    title="Next Page"
                  >
                    ›
                  </button>
                </span>
              </div>
            </div>

            <div className="card g">
              <div className="ch">📦 Stock Details</div>
              <div className="cb">
                {s ? (
                  <>
                    <div className="hd">
                      <span className="ic" style={{ width: 56, height: 56, fontSize: 28, background: "#efe3d3" }}>☕</span>
                      <div>
                        <h3>{s[0]}</h3>
                        <span className={"pill " + st[1]}>{st[0]}</span>
                      </div>
                      <button
                        className="eb"
                        title="Edit Stock Details"
                        onClick={() => setEditModal({ type: "stock", mode: "edit", index: si, data: [...s] })}
                      >
                        ✎ Edit
                      </button>
                    </div>
                    <Details rows={[
                      ["SKU", s[2]],
                      ["Category", s[1]],
                      ["Current Stock", (s[3] ?? 0) + " Units"],
                      ["Unit Price", "₹" + Number(s[4] || 0).toFixed(2)],
                      ["Total Value", "₹" + ((Number(s[3]) || 0) * (Number(s[4]) || 0)).toLocaleString("en-IN", { minimumFractionDigits: 2 })],
                      ["Supplier", s[5] || "FreshFoods Pvt Ltd"],
                      ["Reorder Level", (s[6] ?? 10) + " Units"],
                      ["Location", s[7] || "Chennai - Main Store"],
                      ["Last Updated", s[8] || "Just now"]
                    ]} />
                  </>
                ) : (
                  <div style={{ color: "var(--mut)", padding: 20 }}>No item selected</div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {editModal && (
        <EditModal
          modal={editModal}
          onClose={() => setEditModal(null)}
          onSave={handleSaveModal}
        />
      )}
    </>
  );
}

/* ---------- Tables Component (Table Income & Rupees Showcase) ---------- */
function Tables({ go, tables, setTables, kitchenOrders = [], setKitchenOrders }) {
  const [filterType, setFilterType] = useState("all"); // 'all' | 'active' | 'settled'
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // Helper calculation for each table
  const getTableStats = (t) => {
    const activeOrder = t.order || [];
    const activeRupees = activeOrder.reduce((sum, it) => sum + (Number(it[1]) || 1) * (Number(it[2]) || 0), 0);
    const settledRupees = Number(t.settledIncome) || 0;
    const totalRupees = activeRupees + settledRupees;
    const itemsCount = activeOrder.reduce((sum, it) => sum + (Number(it[1]) || 0), 0);
    return {
      activeRupees,
      settledRupees,
      totalRupees,
      itemsCount,
      activeOrder
    };
  };

  // Grand totals across all tables
  const totalIncome = tables.reduce((acc, t) => acc + getTableStats(t).totalRupees, 0);
  const totalActiveIncome = tables.reduce((acc, t) => acc + getTableStats(t).activeRupees, 0);
  const totalSettledIncome = tables.reduce((acc, t) => acc + getTableStats(t).settledRupees, 0);
  const avgIncomePerTable = tables.length ? (totalIncome / tables.length) : 0;

  // Find top earning table
  const sortedTables = [...tables].sort((a, b) => getTableStats(b).totalRupees - getTableStats(a).totalRupees);
  const topTable = sortedTables[0] || tables[0];

  // Settle bill action (transfers active running order to table's settled income)
  const handleSettleTable = (tableId) => {
    const table = tables.find((t) => t.id === tableId);
    if (!table) return;
    const stats = getTableStats(table);
    if (stats.activeRupees === 0) return;

    setTables(tables.map((t) => {
      if (t.id === tableId) {
        return {
          ...t,
          status: "Available",
          settledIncome: (Number(t.settledIncome) || 0) + stats.activeRupees,
          order: [],
          guests: 0,
          seatedAt: "—"
        };
      }
      return t;
    }));

    // Mark kitchen tickets for this table as served
    if (setKitchenOrders) {
      setKitchenOrders((prev) => prev.map((o) => (o.tableId === tableId ? { ...o, status: "served" } : o)));
    }

    showToast(`Settled ₹${stats.activeRupees.toFixed(2)} from ${table.name}! Added to table total income.`);
  };

  // Quick action: Settle all active tables at once
  const handleSettleAll = () => {
    if (totalActiveIncome === 0) {
      showToast("All tables are already settled! No active bills.");
      return;
    }
    setTables(tables.map((t) => {
      const active = (t.order || []).reduce((sum, it) => sum + (Number(it[1]) || 1) * (Number(it[2]) || 0), 0);
      return {
        ...t,
        status: "Available",
        settledIncome: (Number(t.settledIncome) || 0) + active,
        order: [],
        guests: 0,
        seatedAt: "—"
      };
    }));
    if (setKitchenOrders) {
      setKitchenOrders((prev) => prev.map((o) => ({ ...o, status: "served" })));
    }
    showToast(`All active bills (₹${totalActiveIncome.toFixed(2)}) settled and added to table income!`);
  };

  // Quick action: Add a sample item to test live rupees increase
  const handleAddSampleOrder = (tableId) => {
    setTables(tables.map((t) => {
      if (t.id === tableId) {
        const curOrder = [...(t.order || [])];
        curOrder.push(["Cold Coffee", 1, 180, "Staff"]);
        return {
          ...t,
          status: "Occupied",
          order: curOrder
        };
      }
      return t;
    }));
    showToast(`Added +₹180 (Cold Coffee) to ${tableId}! Total income updated.`);
  };

  // Filtered list
  const displayTables = tables.filter((t) => {
    const stats = getTableStats(t);
    if (filterType === "active") return stats.activeRupees > 0;
    if (filterType === "settled") return stats.activeRupees === 0 && stats.settledRupees > 0;
    return true;
  });

  return (
    <div className="table-income-container">
      {toast && (
        <div className="table-income-toast">
          <span>✅</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Hero: Total Income from Tables */}
      <div className="table-income-hero">
        <div className="hero-income-main">
          <div className="hero-income-badge">
            <span className="badge-pulse-dot"></span>
            <span>💰 CAFE FLOOR REVENUE OVERVIEW</span>
          </div>
          <span className="hero-income-label">TOTAL INCOME FROM TABLES</span>
          <h1 className="hero-income-amount">
            ₹{totalIncome.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </h1>
          <p className="hero-income-sub">
            Total revenue generated across all <b>{tables.length} dining tables</b> (live running bills + settled receipts).
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="hero-actions-column">
          {totalActiveIncome > 0 && (
            <button
              type="button"
              className="hero-settle-btn"
              onClick={handleSettleAll}
              title="Settle all currently active bills and add directly to settled income"
            >
              <span>🧾</span>
              <span>Settle All Active Bills (₹{totalActiveIncome.toFixed(2)})</span>
            </button>
          )}
          <button
            type="button"
            className="hero-review-link-btn"
            onClick={() => go("/review")}
          >
            <span>📈 View Full Sales Analytics ➔</span>
          </button>
        </div>
      </div>

      {/* 4 Income KPI Summary Cards */}
      <div className="income-kpi-grid">
        <div className="income-kpi-card settled-card">
          <div className="kpi-icon-wrap" style={{ background: "#dcfce7", color: "#15803d" }}>
            <span>✅</span>
          </div>
          <div className="kpi-text-wrap">
            <span className="kpi-title">Settled Table Income</span>
            <b className="kpi-val" style={{ color: "#15803d" }}>
              ₹{totalSettledIncome.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </b>
            <small className="kpi-desc">Paid & cleared bills</small>
          </div>
        </div>

        <div className="income-kpi-card active-card">
          <div className="kpi-icon-wrap" style={{ background: "#dbeafe", color: "#1d4ed8" }}>
            <span>⏳</span>
          </div>
          <div className="kpi-text-wrap">
            <span className="kpi-title">Active Running Orders</span>
            <b className="kpi-val" style={{ color: "#1d4ed8" }}>
              ₹{totalActiveIncome.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </b>
            <small className="kpi-desc">Currently dining on tables</small>
          </div>
        </div>

        <div className="income-kpi-card avg-card">
          <div className="kpi-icon-wrap" style={{ background: "#fef3c7", color: "#b45309" }}>
            <span>📊</span>
          </div>
          <div className="kpi-text-wrap">
            <span className="kpi-title">Average per Table</span>
            <b className="kpi-val" style={{ color: "#b45309" }}>
              ₹{avgIncomePerTable.toFixed(2)}
            </b>
            <small className="kpi-desc">Across all {tables.length} tables</small>
          </div>
        </div>

        <div className="income-kpi-card top-card">
          <div className="kpi-icon-wrap" style={{ background: "#f3e8ff", color: "#7e22ce" }}>
            <span>🏆</span>
          </div>
          <div className="kpi-text-wrap">
            <span className="kpi-title">Top Earning Table</span>
            <b className="kpi-val" style={{ color: "#7e22ce" }}>
              {topTable?.name} (₹{getTableStats(topTable).totalRupees.toLocaleString("en-IN")})
            </b>
            <small className="kpi-desc">Highest revenue contribution</small>
          </div>
        </div>
      </div>

      {/* Table-by-Table Income Ranking & Visual Bar Chart */}
      <div className="table-income-chart-card">
        <div className="chart-card-header">
          <div>
            <h3 style={{ margin: 0, fontSize: 17, color: "var(--ink)", fontWeight: 800 }}>
              📊 Rupees Earned by Each Table
            </h3>
            <small style={{ color: "var(--mut)", fontSize: 13 }}>
              Comparative breakdown of revenue collected from Table 1 to Table {tables.length}
            </small>
          </div>
          <div className="table-filter-tabs">
            <button
              type="button"
              className={filterType === "all" ? "on" : ""}
              onClick={() => setFilterType("all")}
            >
              All Tables ({tables.length})
            </button>
            <button
              type="button"
              className={filterType === "active" ? "on" : ""}
              onClick={() => setFilterType("active")}
            >
              With Active Order ({tables.filter((t) => getTableStats(t).activeRupees > 0).length})
            </button>
            <button
              type="button"
              className={filterType === "settled" ? "on" : ""}
              onClick={() => setFilterType("settled")}
            >
              Fully Settled ({tables.filter((t) => getTableStats(t).activeRupees === 0 && getTableStats(t).settledRupees > 0).length})
            </button>
          </div>
        </div>

        {/* Visual Progress Bars for Each Table */}
        <div className="table-bars-list">
          {sortedTables.map((t) => {
            const stats = getTableStats(t);
            const percentage = totalIncome > 0 ? ((stats.totalRupees / totalIncome) * 100).toFixed(1) : "0.0";
            const maxTableRupees = getTableStats(topTable).totalRupees || 1;
            const barWidth = Math.max(8, (stats.totalRupees / maxTableRupees) * 100);

            return (
              <div key={t.id} className="table-bar-row">
                <div className="bar-table-label">
                  <b>{t.name}</b>
                  {stats.activeRupees > 0 && <span className="active-dot-chip">● Live Order</span>}
                </div>
                <div className="bar-track-wrap">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${barWidth}%`,
                      background: stats.activeRupees > 0
                        ? "linear-gradient(90deg, #10b981 0%, #3b82f6 100%)"
                        : "linear-gradient(90deg, #059669 0%, #10b981 100%)"
                    }}
                  ></div>
                </div>
                <div className="bar-rupees-value">
                  <b>₹{stats.totalRupees.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</b>
                  <small>({percentage}%)</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid of Individual Table Rupees Cards */}
      <div className="table-cards-heading">
        <h3 style={{ margin: "16px 0 10px", fontSize: 18, color: "var(--ink)", fontWeight: 800 }}>
          🪑 Individual Table Income Cards
        </h3>
      </div>

      <div className="table-income-cards-grid">
        {displayTables.map((t) => {
          const stats = getTableStats(t);
          const percentage = totalIncome > 0 ? ((stats.totalRupees / totalIncome) * 100).toFixed(1) : "0.0";
          const hasActive = stats.activeRupees > 0;

          return (
            <div key={t.id} className={`table-money-card ${hasActive ? "has-active" : ""}`}>
              <div className="card-top-row">
                <div className="table-title-area">
                  <span className="table-icon-pill">🪑</span>
                  <div>
                    <h4 className="table-card-name">{t.name}</h4>
                    <span className="table-seat-count">{t.seats} Seater Dining Table</span>
                  </div>
                </div>
                <div className={`table-status-pill ${hasActive ? "occupied" : "settled"}`}>
                  {hasActive ? "🔵 Active Order" : "🟢 Free / Settled"}
                </div>
              </div>

              {/* Big Rupees Highlight */}
              <div className="table-card-rupees-box">
                <span className="rupees-box-label">TOTAL INCOME FROM {t.name.toUpperCase()}</span>
                <div className="rupees-box-amount">
                  ₹{stats.totalRupees.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
                <div className="rupees-box-share">
                  <span>Share of total floor revenue: <b>{percentage}%</b></span>
                </div>
              </div>

              {/* Breakdown: Active vs Settled */}
              <div className="table-card-breakdown">
                <div className="breakdown-item">
                  <span>Settled / Paid:</span>
                  <b>₹{stats.settledRupees.toFixed(2)}</b>
                </div>
                <div className="breakdown-item">
                  <span>Active Live Bill:</span>
                  <b style={{ color: hasActive ? "#1d4ed8" : "inherit" }}>
                    ₹{stats.activeRupees.toFixed(2)}
                  </b>
                </div>
              </div>

              {/* Active Order Items List (if running) */}
              {hasActive && stats.activeOrder.length > 0 && (
                <div className="table-card-active-items">
                  <span className="active-items-label">Current Running Items:</span>
                  <div className="active-items-tags">
                    {stats.activeOrder.map((it, idx) => (
                      <span key={idx} className="active-item-tag">
                        {it[1]}x {it[0]} (₹{(it[1] * it[2]).toFixed(0)})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Actions: Settle bill or Add test order */}
              <div className="table-card-actions">
                {hasActive ? (
                  <button
                    type="button"
                    className="btn-card-settle"
                    onClick={() => handleSettleTable(t.id)}
                    title={`Settle running bill of ₹${stats.activeRupees.toFixed(2)} and add to ${t.name} total income`}
                  >
                    <span>🧾 Settle Bill (₹{stats.activeRupees.toFixed(2)}) ➔</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-card-add-test"
                    onClick={() => handleAddSampleOrder(t.id)}
                    title="Add sample order (+₹180) to test live rupees calculation"
                  >
                    <span>+ Add Quick Order (+₹180)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Data Table of Table Income */}
      <div className="table-summary-sheet-card">
        <div className="sheet-card-header">
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>
            📋 Complete Table Revenue Ledger
          </h3>
          <small style={{ color: "var(--mut)", fontSize: 13 }}>
            Full financial breakdown per table
          </small>
        </div>

        <div className="table-responsive-wrapper">
          <table className="income-ledger-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Table Name</th>
                <th>Capacity</th>
                <th>Current Status</th>
                <th style={{ textAlign: "right" }}>Active Running (₹)</th>
                <th style={{ textAlign: "right" }}>Settled Paid (₹)</th>
                <th style={{ textAlign: "right" }}>Total Rupees (₹)</th>
                <th style={{ textAlign: "right" }}>Revenue Share</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((t, index) => {
                const stats = getTableStats(t);
                const percentage = totalIncome > 0 ? ((stats.totalRupees / totalIncome) * 100).toFixed(1) : "0.0";
                const hasActive = stats.activeRupees > 0;

                return (
                  <tr key={t.id} className={hasActive ? "row-active-bill" : ""}>
                    <td><b>{index + 1}</b></td>
                    <td>
                      <span style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                        <span>🪑</span>
                        <span>{t.name}</span>
                      </span>
                    </td>
                    <td>{t.seats} Guests</td>
                    <td>
                      <span className={`ledger-status-pill ${hasActive ? "occ" : "free"}`}>
                        {hasActive ? "🔵 Active Order" : "🟢 Free / Settled"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right", color: hasActive ? "#1d4ed8" : "#64748b", fontWeight: hasActive ? 700 : 500 }}>
                      ₹{stats.activeRupees.toFixed(2)}
                    </td>
                    <td style={{ textAlign: "right", color: "#059669", fontWeight: 600 }}>
                      ₹{stats.settledRupees.toFixed(2)}
                    </td>
                    <td style={{ textAlign: "right", color: "#0f172a", fontWeight: 800, fontSize: 14 }}>
                      ₹{stats.totalRupees.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ textAlign: "right", fontWeight: 600 }}>
                      {percentage}%
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {hasActive ? (
                        <button
                          type="button"
                          className="ledger-settle-btn"
                          onClick={() => handleSettleTable(t.id)}
                          title="Settle bill"
                        >
                          Settle ₹{stats.activeRupees.toFixed(0)}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="ledger-add-btn"
                          onClick={() => handleAddSampleOrder(t.id)}
                          title="Add test item"
                        >
                          + Order
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="ledger-total-row">
                <td colSpan="4">
                  <b>GRAND TOTAL (ALL {tables.length} TABLES)</b>
                </td>
                <td style={{ textAlign: "right", fontWeight: 800, color: "#1d4ed8" }}>
                  ₹{totalActiveIncome.toFixed(2)}
                </td>
                <td style={{ textAlign: "right", fontWeight: 800, color: "#059669" }}>
                  ₹{totalSettledIncome.toFixed(2)}
                </td>
                <td style={{ textAlign: "right", fontWeight: 900, fontSize: 17, color: "#0f172a" }}>
                  ₹{totalIncome.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
                <td style={{ textAlign: "right", fontWeight: 800 }}>
                  100%
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- App (routes) ---------- */
export default function App() {
  const [path, go] = useRoute();
  const [tables, setTables] = useState(TABLES0);
  const [kitchenOrders, setKitchenOrders] = useState(INITIAL_KITCHEN_ORDERS);
  const [liveNotification, setLiveNotification] = useState(null);

  // Authenticated user state: { role: 'admin' | 'supplier' | 'kitchen', name: '...', username: '...' }
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("cafe_auth_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem("cafe_auth_user", JSON.stringify(user));
    } catch (e) {}

    if (user.landingRoute) {
      go(user.landingRoute);
    } else if (user.role === "kitchen") {
      go("/kitchen");
    } else if (user.role === "supplier") {
      go("/glossary");
    } else {
      go("/");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("cafe_auth_user");
    } catch (e) {}
    go("/login");
  };

  const triggerKitchenOrder = (newTicket, items) => {
    playKitchenDing();
    setKitchenOrders((prev) => [newTicket, ...prev]);
    setLiveNotification({
      id: Date.now(),
      ticketId: newTicket.id,
      tableName: newTicket.tableName,
      itemCount: newTicket.items ? newTicket.items.reduce((acc, it) => acc + (it.qty || 1), 0) : 1,
      tableId: newTicket.tableId
    });
    setTimeout(() => {
      setLiveNotification((cur) => (cur?.ticketId === newTicket.id ? null : cur));
    }, 6000);
  };

  const [, root, sub] = path.split("/");

  // Determine back button navigation
  const back = (!currentUser || root === "login") ? null :
    root ? () => go(
      root === "review" && sub ? "/review" :
      root === "order" ? "/tables" :
      root === "kitchen" ? (currentUser.role === "kitchen" ? "/login" : "/tables") :
      root === "glossary" && currentUser.role === "supplier" ? "/login" :
      "/"
    ) : null;

  // Determine page to render
  let page = null;

  // 1. Customer table order view (QR scan) doesn't require cafe staff login
  if (root === "order") {
    page = (
      <CustomerOrderView
        tableId={sub}
        go={go}
        tables={tables}
        setTables={setTables}
        kitchenOrders={kitchenOrders}
        onSendKitchenOrder={triggerKitchenOrder}
      />
    );
  }
  // 2. If not logged in or on /login route, show Multi-Role Login (Admin, Supplier, Kitchen)
  else if (!currentUser || root === "login") {
    page = <LoginView onLogin={handleLogin} />;
  }
  // 3. Authenticated routes
  else {
    if (root === "review") {
      page = <Review go={go} sub={sub} />;
    } else if (root === "glossary") {
      page = <Glossary go={go} sub={sub} currentUser={currentUser} />;
    } else if (root === "tables") {
      page = (
        <Tables
          go={go}
          sub={sub}
          tables={tables}
          setTables={setTables}
          kitchenOrders={kitchenOrders}
          setKitchenOrders={setKitchenOrders}
          onSendKitchenOrder={triggerKitchenOrder}
        />
      );
    } else if (root === "kitchen") {
      page = (
        <KitchenDisplay
          go={go}
          orders={kitchenOrders}
          setOrders={setKitchenOrders}
          tables={tables}
          setTables={setTables}
        />
      );
    } else {
      // Default route "/" (Home)
      if (currentUser.role === "kitchen") {
        page = (
          <KitchenDisplay
            go={go}
            orders={kitchenOrders}
            setOrders={setKitchenOrders}
            tables={tables}
            setTables={setTables}
          />
        );
      } else if (currentUser.role === "supplier") {
        page = <Glossary go={go} sub={sub} currentUser={currentUser} />;
      } else {
        // Admin: Home page with REVIEW, GLOSSARY, TABLES (kitchen removed)
        page = <Home go={go} currentUser={currentUser} />;
      }
    }
  }

  return (
    <Window back={back} currentUser={currentUser} onLogout={handleLogout}>
      {liveNotification && currentUser && (currentUser.role === "kitchen" || currentUser.role === "admin") && (
        <div className="kitchen-live-banner" onClick={() => go("/kitchen")} title="Click to view in Kitchen Display">
          <div className="banner-left">
            <span className="bell-anim">🔔</span>
            <div>
              <b>NEW ORDER SENT TO KITCHEN!</b>
              <span>{liveNotification.tableName} · Ticket #{liveNotification.ticketId} ({liveNotification.itemCount} items)</span>
            </div>
          </div>
          <button type="button" className="banner-cta">Open Kitchen KDS ➔</button>
        </div>
      )}
      {page}
    </Window>
  );
}

const CSS = `
.sd-wood{--blue:#1a73e8;--dk:#0b3a78;--green:#2e9e4a;--cream:#f8f3e8;--ink:#1f2a3a;--mut:#6b7a90;font-family:Roboto,"Segoe UI",Arial,sans-serif;color:var(--ink);min-height:100vh;padding:28px 16px;background:repeating-linear-gradient(95deg,#efc590 0 6px,#e8b87a 6px 9px,#f2cc9b 9px 18px,#e6b274 18px 20px)}
.sd-wood *{box-sizing:border-box}
.win{max-width:1180px;margin:0 auto;background:var(--cream);border-radius:10px;box-shadow:0 14px 30px rgba(80,45,10,.45);overflow:hidden}
.bar{height:34px;background:linear-gradient(#d3dfea,#bccbdb);display:flex;justify-content:space-between;align-items:center;gap:4px;padding:0 6px}
.wc{display:flex;gap:4px}
.bk{border:0;background:#e4ecf4;color:#0b3a78;font:700 13px Roboto,Arial,sans-serif;padding:4px 12px;border-radius:4px;cursor:pointer;box-shadow:0 1px 2px #0003}
.bar span{width:34px;height:22px;border-radius:4px;background:#e4ecf4;display:grid;place-items:center;font-size:13px;color:#2c4a6e;box-shadow:0 1px 2px #0003}
.bar span.x{background:#ef8c8c;color:#d00;font-weight:700}
.in{margin:12px;border:1px solid #e3dccb;border-radius:8px;padding:18px;min-height:600px}
.home{display:flex;gap:30px;justify-content:center;align-items:center;min-height:560px;flex-wrap:wrap}
.big,.nb{border:0;color:#fff;font-weight:800;cursor:pointer;background:linear-gradient(#58a4f8,#0b6fe3);box-shadow:inset 0 0 0 3px #ffffff55,0 5px 0 #0a4aa5,0 10px 14px #0004;display:flex;align-items:center;gap:16px;font-family:inherit}
.big{font-size:32px;padding:30px 36px;border-radius:16px;min-width:270px;justify-content:center}
.big i{font-style:normal;font-size:42px}
.nb{font-size:20px;padding:10px 26px;border-radius:10px;box-shadow:inset 0 0 0 2px #ffffff55,0 3px 0 #0a4aa5,0 5px 8px #0003}
.nb.on{outline:3px solid var(--green);outline-offset:4px}
.nb.home-btn{margin-left:auto;background:linear-gradient(#8fa6c0,#5d7899);box-shadow:0 3px 0 #3f5876}
.top{display:flex;gap:28px;padding-bottom:6px}
.conn{height:26px;border-left:3px solid var(--green);border-bottom:3px solid var(--green);width:110px;margin:0 0 0 70px;border-radius:0 0 0 8px}
h2.t{text-align:center;color:var(--dk);font-size:30px;margin:-22px 0 12px;font-weight:800}
.sub{display:flex;gap:18px;justify-content:center;margin:4px 0 14px;flex-wrap:wrap}
.sub button{font:700 18px Roboto,Arial,sans-serif;border:1px solid #b9d6f3;background:#dcecfb;color:var(--dk);padding:12px 36px;border-radius:10px;cursor:pointer}
.sub button.on{background:linear-gradient(#58b86c,#2e9e4a);color:#fff;border-color:#2e9e4a;box-shadow:0 3px 0 #1f7a37}
.grid{display:grid;gap:14px}.g2{grid-template-columns:1.25fr 1fr}.g5{grid-template-columns:1fr 1.25fr}
.card{border-radius:10px;overflow:hidden;box-shadow:0 2px 6px #0002;background:#eaf3fc;border:1px solid #9ec5ef}
.card.g{border-color:#5fb072;background:#eaf6ec}
.ch{background:linear-gradient(#4a9af3,#1e78e3);color:#fff;font-weight:700;font-size:19px;padding:9px 14px;display:flex;align-items:center;gap:10px;justify-content:space-between}
.card.g>.ch{background:linear-gradient(#6bbd7c,#3b9b52)}
.cb{padding:12px}
.kp{display:flex;gap:16px;background:#fff;border-radius:10px;padding:12px 16px;margin-bottom:8px;flex-wrap:wrap}
.kp>div{display:flex;gap:12px;align-items:center;flex:1;min-width:150px}
.ic{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font-size:22px;background:#d6eedb;color:#1b8a3a;font-weight:700;flex:none}
.ic.b{background:#d9eaff}
.kp small{display:block;color:var(--mut);font-size:13px;font-weight:600}
.kp b{font-size:24px;color:#0d8a2f}.kp .i b{color:var(--ink)}
.chart{display:flex;align-items:flex-end;gap:7px;height:130px;margin:4px 0 0 34px;border-left:1px solid #9ab;border-bottom:1px solid #9ab;position:relative}
.chart i{flex:1;background:linear-gradient(#4b9bf6,#1d6fe0);border-radius:3px 3px 0 0;position:relative}
.chart i::after{content:attr(data-h);position:absolute;top:100%;left:50%;transform:translateX(-50%);font:normal 10px/1.8 Arial,sans-serif;color:#456;white-space:nowrap}
.chart u{position:absolute;left:-34px;font:10px Arial,sans-serif;text-decoration:none;color:#456}
.hl{font-weight:700;margin:6px 0 2px}
.inc{display:flex;gap:14px;align-items:center;background:#fff;border:1px solid #a9d8b5;border-left:5px solid var(--green);border-radius:10px;padding:12px 16px;margin-top:4px}
.inc small{display:block;color:var(--mut);font-size:13px;font-weight:600}
.inc b{font-size:26px;color:#0d8a2f;display:block}
.inc em{font-style:normal;font-size:12px;color:var(--mut)}
.cal{background:#fff;border-radius:6px;padding:8px}
.cn{display:flex;justify-content:space-between;align-items:center;font-weight:700;padding:2px 20px 6px}
.cn button{border:0;background:none;font-size:20px;cursor:pointer}
.cg{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-size:14px}
.cg b{font-size:12px;padding:4px;background:#e3edf8;border:1px solid #fff}
.cg span{padding:6px 0;border:1px solid #eef2f6;cursor:pointer;font-weight:600}
.cg span.o{color:#b5bcc6;cursor:default;font-weight:400}
.cg span.sel{background:var(--blue);color:#fff;border-radius:5px}
.tw{background:#fff;overflow:auto;max-height:265px;border-radius:4px}
.tw.tall{max-height:none}
table{width:100%;border-collapse:collapse;font-size:13px}
th{background:#d5e3f1;text-align:left;padding:5px 10px;position:sticky;top:0;font-weight:700}
td{padding:6px 10px;border-bottom:1px solid #e5eaf0}
td.a,th.a{text-align:right;font-weight:700}td.a{color:#0d8a2f}
.srch{background:#fff;border-radius:5px;border:1px solid #c5d6ea;padding:5px 10px;font:13px Arial,sans-serif;width:230px}
.pg{display:flex;gap:6px;justify-content:flex-end;padding:10px;align-items:center;font-size:13px}
.pg button{min-width:28px;height:28px;border:1px solid #cbd5e1;background:#fff;border-radius:5px;cursor:pointer;font-weight:600}
.pg button:not(:disabled):hover{background:#e8f1fc;border-color:var(--blue)}
.pg button:disabled{opacity:0.4;cursor:not-allowed}
.pg button.on{background:var(--blue);color:#fff;border-color:var(--blue)}
.sel-t{font-weight:700;font-size:17px;margin-bottom:8px}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:12px}
.kpis>div{border-radius:10px;padding:12px 16px;display:flex;gap:14px;align-items:center;border:1px solid}
.kpis small{font-weight:700;display:block}.kpis b{font-size:24px}
.k1{background:#e6f5ea;border-color:#a9d8b5;color:#0d6b3a}.k2{background:#e6f0fc;border-color:#a9c8ee;color:#0d2a5c}.k3{background:#fff4de;border-color:#f0d196;color:#b36a00}.k4{background:#fde9ea;border-color:#f0a9ad;color:#c4161c}
.pill{display:inline-block;padding:2px 12px;border-radius:12px;font-size:12px;font-weight:600}
.p-a,.p-in{background:#d9f2df;color:#1b7a3a}.p-ia,.p-out{background:#fbd9dc;color:#c4161c}.p-low{background:#fdebc4;color:#a96a00}
.act button{border:0;width:28px;height:28px;border-radius:5px;cursor:pointer;margin-right:4px;background:#dcebff;font-size:14px;transition:0.15s}
.act button:hover{background:#bcd8fd}
.act button.d{background:#fde0e0;color:#c4161c}
.act button.d:hover{background:#f9bebe}
tr.row{cursor:pointer}tr.row.sel{background:#e3f0ff}
.dt{display:grid;grid-template-columns:140px 1fr;font-size:14px}
.dt span{padding:6px 4px;border-bottom:1px dotted #bcd}.dt span:nth-child(odd){color:var(--mut);font-weight:600}
.hd{display:flex;gap:14px;align-items:center;margin-bottom:10px}
.hd .ic{border-radius:8px}.hd h3{margin:0;font-size:19px}
.eb{margin-left:auto;background:var(--blue);color:#fff;border:0;border-radius:6px;padding:7px 14px;cursor:pointer;font-weight:600;transition:0.15s}
.eb:hover{background:var(--dk)}
.ab{background:var(--blue);color:#fff;border:0;border-radius:6px;padding:6px 12px;font-weight:600;cursor:pointer;margin-left:8px;transition:0.15s}
.ab:hover{background:var(--dk)}
.ch .ch-r{display:flex;align-items:center;gap:8px}

/* Modal styles */
.modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.65);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px}
.modal-box{background:var(--cream);border-radius:10px;width:100%;max-width:580px;box-shadow:0 20px 40px rgba(0,0,0,0.45);border:1px solid #c9beaa;overflow:hidden;animation:modalPop 0.18s ease-out}
@keyframes modalPop{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
.modal-header{background:linear-gradient(#4a9af3,#1e78e3);color:#fff;padding:12px 18px;font-weight:700;font-size:17px;display:flex;justify-content:space-between;align-items:center}
.modal-header .close-btn{background:rgba(255,255,255,0.25);border:none;color:#fff;font-size:15px;width:28px;height:28px;border-radius:6px;cursor:pointer;display:grid;place-items:center;font-weight:800}
.modal-header .close-btn:hover{background:#f43f5e}
.modal-body{padding:18px 20px;max-height:75vh;overflow-y:auto;display:grid;grid-template-columns:1fr 1fr;gap:12px}
.modal-body .full-span{grid-column:1 / -1}
.modal-field{display:flex;flex-direction:column;gap:5px}
.modal-field label{font-size:11px;font-weight:700;color:var(--dk);text-transform:uppercase;letter-spacing:0.5px}
.modal-field input,.modal-field select,.modal-field textarea{padding:8px 10px;border-radius:6px;border:1px solid #b8cde4;font-size:13px;font-family:inherit;background:#fff;color:var(--ink);outline:none;transition:border-color 0.15s,box-shadow 0.15s}
.modal-field input:focus,.modal-field select:focus,.modal-field textarea:focus{border-color:var(--blue);box-shadow:0 0 0 2px rgba(26,115,232,0.2)}
.modal-footer{padding:12px 20px;background:#eef4fb;border-top:1px solid #d8e4f1;display:flex;justify-content:flex-end;gap:10px}
.modal-footer button{padding:8px 18px;border-radius:6px;font-weight:700;font-size:13px;cursor:pointer}
.modal-footer .btn-cancel{background:#fff;border:1px solid #cbd5e1;color:var(--mut)}
.modal-footer .btn-cancel:hover{background:#f1f5f9}
.modal-footer .btn-save{background:linear-gradient(#22c55e,#16a34a);border:1px solid #15803d;color:#fff;box-shadow:0 2px 4px rgba(22,163,74,0.3)}
.modal-footer .btn-save:hover{background:linear-gradient(#16a34a,#15803d)}

/* Table Floor Styles */
.tbl-filters{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px}
.tbl-filters button{font:600 12px Roboto,Arial,sans-serif;padding:6px 14px;border-radius:18px;border:1px solid #c0d5ed;background:#fff;cursor:pointer;color:var(--ink);transition:0.15s}
.tbl-filters button:hover{background:#e8f2fe;border-color:var(--blue)}
.tbl-filters button.on{background:var(--blue);color:#fff;border-color:var(--blue);box-shadow:0 2px 4px rgba(26,115,232,0.3)}
.tbl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;max-height:540px;overflow-y:auto;padding:2px}
.tbl-card{background:#fff;border:1px solid #d0dfef;border-radius:10px;padding:12px;cursor:pointer;position:relative;transition:all 0.15s ease;display:flex;flex-direction:column;gap:8px}
.tbl-card:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(15,23,42,0.12);border-color:#93c5fd}
.tbl-card.sel{border:2px solid var(--blue);background:#f3f8fe;box-shadow:0 0 0 3px rgba(26,115,232,0.2)}
.tbl-top{display:flex;justify-content:space-between;align-items:center}
.tbl-top h4{margin:0;font-size:16px;color:var(--ink);display:flex;align-items:center;gap:6px}
.tbl-meta{display:flex;gap:8px;align-items:center;font-size:12px;color:var(--mut);flex-wrap:wrap}
.tbl-status-p{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700}
.tbl-status-p.avail{background:#dcfce7;color:#15803d}
.tbl-status-p.occ{background:#dbeafe;color:#1d4ed8}
.tbl-status-p.res{background:#f3e8ff;color:#7e22ce}
.tbl-order-chip{background:#fef3c7;color:#92400e;border-radius:6px;padding:4px 8px;font-size:12px;font-weight:700;display:flex;justify-content:space-between;align-items:center}
.tbl-actions{display:flex;gap:5px;margin-top:auto;padding-top:6px;border-top:1px dashed #e2e8f0;flex-wrap:wrap}
.tbl-actions button{flex:1;padding:5px 6px;font-size:11px;font-weight:600;border-radius:5px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;transition:0.15s}
.tbl-actions button:hover{background:#f1f5f9}
.tbl-actions button.btn-settle{background:#dcfce7;border-color:#86efac;color:#15803d}
.tbl-actions button.btn-settle:hover{background:#bbf7d0}
.tbl-actions button.btn-seat{background:#dbeafe;border-color:#93c5fd;color:#1d4ed8}
.tbl-actions button.btn-seat:hover{background:#bfdbfe}
.order-row{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid #f1f5f9;font-size:13px}
.order-row:last-child{border-bottom:none}
.order-del{background:none;border:none;color:#ef4444;cursor:pointer;font-size:14px;padding:2px 6px;border-radius:4px}
.order-del:hover{background:#fee2e2}
.bill-summary{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;margin:10px 0}
.bill-line{display:flex;justify-content:space-between;font-size:13px;padding:3px 0;color:var(--mut)}
.bill-line.total{font-size:16px;font-weight:800;color:#0d8a2f;border-top:1px solid #cbd5e1;padding-top:6px;margin-top:6px}
.toast-msg{background:#15803d;color:#fff;padding:8px 14px;border-radius:6px;font-size:13px;font-weight:600;margin-bottom:10px;display:flex;align-items:center;gap:8px;animation:modalPop 0.2s}

/* QR Code Tent Stand Styling */
.qr-tent-stand{background:#fff;border:3px solid #0f172a;border-radius:16px;padding:24px 20px;text-align:center;box-shadow:0 12px 28px rgba(0,0,0,0.18);width:100%;max-width:320px;margin:0 auto;position:relative}
.tent-header h3{margin:4px 0 2px;font-size:16px;letter-spacing:1px;color:#0f172a;font-weight:900}
.tent-header p{margin:0;font-size:11px;color:var(--mut);text-transform:uppercase;letter-spacing:0.8px}
.tent-icon{font-size:32px;display:inline-block;margin-bottom:4px}
.tent-table-pill{display:inline-block;background:#0f172a;color:#fff;font-weight:800;font-size:16px;padding:5px 20px;border-radius:20px;margin:12px 0 10px;letter-spacing:0.5px}
.tent-qr-wrapper{display:flex;justify-content:center;margin:8px 0}
.tent-instructions{font-size:11px;color:#334155;margin:8px 0 12px}
.tent-instructions b{display:block;font-size:13px;color:#0f172a;margin-bottom:2px}
.tent-wifi-box{background:#f1f5f9;border:1px dashed #94a3b8;border-radius:8px;padding:6px 10px;font-size:11px;color:#475569;display:flex;flex-direction:column;gap:2px}
.qr-badge-pulse{background:#fdf4ff;color:#9333ea;border:1px solid #d8b4fe;border-radius:10px;font-size:10px;font-weight:700;padding:2px 6px;display:inline-flex;align-items:center;animation:pulseBadge 1.8s infinite}
@keyframes pulseBadge{0%,100%{opacity:1}50%{opacity:0.6}}

/* Customer Mobile Ordering Screen (#/order) */
.mobile-view-container{display:flex;justify-content:center;padding:10px 0}
.mobile-shell{width:100%;max-width:440px;background:#f8fafc;border:2px solid #cbd5e1;border-radius:28px;box-shadow:0 20px 45px rgba(0,0,0,0.3);overflow:hidden;min-height:640px;display:flex;flex-direction:column;position:relative}
.mobile-notch{height:20px;background:#0f172a;display:flex;justify-content:center;align-items:center;gap:8px}
.notch-speaker{width:46px;height:4px;background:#334155;border-radius:4px}
.notch-cam{width:6px;height:6px;background:#334155;border-radius:50%}
.mobile-top-bar{background:linear-gradient(#1e293b,#0f172a);padding:14px 16px;display:flex;justify-content:space-between;align-items:center}
.mobile-table-tag{display:block;font-size:11px;color:#94a3b8;margin-top:2px}
.mobile-exit-btn{background:rgba(255,255,255,0.15);border:none;color:#fff;width:28px;height:28px;border-radius:6px;cursor:pointer;font-size:14px;font-weight:700}
.mobile-exit-btn:hover{background:#f43f5e}
.mobile-promo-banner{background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:#fff;margin:12px;padding:12px 14px;border-radius:12px;display:flex;justify-content:space-between;align-items:center}
.mobile-promo-banner b{font-size:14px;display:block;margin-bottom:2px}
.mobile-promo-banner p{margin:0;font-size:11px;color:#dbeafe;line-height:1.3}
.mobile-cat-pills{display:flex;gap:6px;overflow-x:auto;padding:4px 12px 10px;scrollbar-width:none}
.mobile-cat-pills button{white-space:nowrap;font-size:12px;font-weight:600;padding:6px 14px;border-radius:20px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;color:#334155;transition:0.15s}
.mobile-cat-pills button.on{background:#0f172a;color:#fff;border-color:#0f172a}
.mobile-menu-scroll{flex:1;overflow-y:auto;padding-bottom:70px}
.mobile-items-list{padding:0 12px;display:flex;flex-direction:column;gap:10px}
.mobile-item-card{background:#fff;border-radius:12px;border:1px solid #e2e8f0;padding:12px;display:flex;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
.item-icon-col{width:48px;height:48px;border-radius:10px;background:#f1f5f9;display:grid;place-items:center;font-size:24px;flex:none}
.item-details-col{flex:1}
.item-title-row{display:flex;justify-content:space-between;align-items:center}
.item-title-row h4{margin:0;font-size:14px;color:#0f172a}
.item-badge{font-size:10px;font-weight:700;color:#2563eb;background:#eff6ff;padding:2px 6px;border-radius:4px}
.item-desc{margin:4px 0 8px;font-size:11px;color:#64748b;line-height:1.3}
.item-bottom-row{display:flex;justify-content:space-between;align-items:center}
.item-price{font-weight:800;font-size:14px;color:#0f172a}
.add-btn{background:var(--blue);color:#fff;border:none;border-radius:6px;padding:5px 12px;font-size:12px;font-weight:700;cursor:pointer;transition:0.15s}
.add-btn:hover{background:#1d4ed8}
.qty-stepper{display:inline-flex;align-items:center;gap:6px;background:#f1f5f9;border-radius:6px;padding:2px 4px}
.qty-stepper button{border:none;background:#fff;width:22px;height:22px;border-radius:4px;font-weight:800;font-size:13px;cursor:pointer;box-shadow:0 1px 2px rgba(0,0,0,0.1)}
.qty-stepper span{font-size:13px;font-weight:800;padding:0 4px}
.mobile-floating-cart{position:sticky;bottom:0;background:linear-gradient(#0f172a,#1e293b);padding:12px 16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;box-shadow:0 -4px 16px rgba(0,0,0,0.2);animation:modalPop 0.2s}
.cart-badge-icon{background:#2563eb;color:#fff;font-weight:800;font-size:13px;padding:4px 10px;border-radius:20px}
.cart-cta-btn{background:linear-gradient(#22c55e,#16a34a);border:none;color:#fff;font-weight:800;font-size:13px;padding:8px 16px;border-radius:8px;cursor:pointer}
.cart-sheet-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(2px);display:flex;align-items:flex-end;z-index:90}
.cart-sheet{background:#fff;width:100%;border-radius:20px 20px 0 0;padding:18px 16px;max-height:85%;overflow-y:auto;box-shadow:0 -10px 25px rgba(0,0,0,0.25);animation:sheetUp 0.2s ease-out}
@keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
.cart-sheet-header{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e2e8f0;padding-bottom:10px}
.sheet-close{background:#f1f5f9;border:none;width:28px;height:28px;border-radius:50%;font-weight:800;cursor:pointer}
.cart-sheet-body{padding-top:12px}
.cart-sheet-item{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f1f5f9}

/* Order Success Screen */
.mobile-success-card{padding:24px 18px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1}
.success-anim-icon{font-size:46px;margin-bottom:6px}
.kitchen-status-pill{margin:10px 0;padding:8px 12px;border-radius:8px;font-size:12px;width:100%;text-align:center;line-height:1.4}
.kitchen-status-pill.new{background:#fef3c7;border:1px solid #fde68a;color:#92400e}
.kitchen-status-pill.preparing{background:#dbeafe;border:1px solid #bfdbfe;color:#1e40af}
.kitchen-status-pill.ready{background:#dcfce7;border:1px solid #bbf7d0;color:#166534}
.kitchen-status-pill.served{background:#f1f5f9;border:1px solid #cbd5e1;color:#475569}

.order-live-tracker{display:flex;align-items:center;justify-content:center;width:100%;margin:16px 0}
.tracker-step{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:10px;font-weight:700;color:#94a3b8}
.tracker-step.done{color:#16a34a}
.tracker-step.active{color:#2563eb}
.tracker-step.active.pulsing .step-dot{animation:pulseBadge 1.2s infinite;background:#dbeafe;border-color:#2563eb;color:#2563eb}
.step-dot{width:26px;height:26px;border-radius:50%;background:#f1f5f9;border:2px solid #cbd5e1;display:grid;place-items:center;font-size:11px}
.tracker-step.done .step-dot{background:#dcfce7;border-color:#16a34a;color:#16a34a}
.tracker-step.active .step-dot{background:#dbeafe;border-color:#2563eb;color:#2563eb}
.tracker-line{flex:1;height:2px;background:#cbd5e1;margin:0 4px;margin-bottom:14px}
.tracker-line.done{background:#16a34a}
.success-items-list{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;width:100%;text-align:left}

/* Global Floating Live Notification Banner for Kitchen Orders */
.kitchen-live-banner{position:fixed;top:18px;right:18px;background:linear-gradient(135deg,#0f172a,#1e293b);color:#fff;padding:12px 18px;border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,0.4),0 0 0 2px #f59e0b;display:flex;align-items:center;justify-content:space-between;gap:18px;z-index:99999;cursor:pointer;animation:slideBanner 0.3s ease-out}
@keyframes slideBanner{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
.kitchen-live-banner .banner-left{display:flex;align-items:center;gap:12px}
.kitchen-live-banner .bell-anim{font-size:26px;animation:bellRing 1.2s infinite ease-in-out}
@keyframes bellRing{0%,100%{transform:rotate(0)}15%{transform:rotate(15deg)}30%{transform:rotate(-15deg)}45%{transform:rotate(10deg)}60%{transform:rotate(-10deg)}75%{transform:rotate(0)}}
.kitchen-live-banner b{display:block;font-size:13px;letter-spacing:0.5px;color:#fde047}
.kitchen-live-banner span{font-size:12px;color:#cbd5e1}
.kitchen-live-banner .banner-cta{background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;border:0;border-radius:6px;padding:6px 12px;font-size:12px;font-weight:800;cursor:pointer}

/* Home KDS Button & Badge */
.kitchen-kds-btn{background:linear-gradient(135deg,#ea580c,#c2410c)!important;box-shadow:inset 0 0 0 3px #ffffff44,0 5px 0 #9a3412,0 10px 14px #0004!important}
.kds-home-badge{position:absolute;top:-10px;right:-10px;background:#ef4444;color:#fff;font-size:11px;font-weight:900;padding:4px 10px;border-radius:20px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);animation:pulseBadge 1.5s infinite}
.kds-mini-chip{background:#ef4444;color:#fff;font-size:10px;font-weight:800;padding:1px 6px;border-radius:10px;margin-left:4px}

/* Table Floor Kitchen Status Pills */
.kitchen-tbl-pill{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:800}
.kitchen-tbl-pill.ready{background:#dcfce7;color:#15803d;border:1px solid #86efac;animation:pulseBadge 1.5s infinite}
.kitchen-tbl-pill.prep{background:#dbeafe;color:#1e40af;border:1px solid #93c5fd}
.kitchen-tbl-pill.new{background:#fef3c7;color:#92400e;border:1px solid #fde68a}

/* Table Paste Sticker Card */
.table-sticker-preview{background:#fff;border-radius:12px;padding:12px;width:100%;max-width:320px}
.sticker-cut-border{border:2px dashed #94a3b8;border-radius:12px;padding:14px;background:#fff;text-align:center}
.sticker-badge{font-size:9px;font-weight:800;background:#fef3c7;color:#b45309;padding:2px 6px;border-radius:4px;border:1px solid #fde68a}
.sticker-table-title{font-size:18px;font-weight:900;color:#0f172a;margin:4px 0}
.sticker-instructions{font-size:11px;color:#334155;margin:6px 0}
.sticker-instructions b{display:block;font-size:12px;color:#0f172a;margin-bottom:2px}
.sticker-instructions p{margin:0;font-size:11px;line-height:1.3;color:#64748b}
.sticker-footer-info{display:flex;justify-content:space-between;font-size:10px;font-weight:700;color:#64748b;margin-top:8px;border-top:1px dotted #cbd5e1;padding-top:6px}

/* Kitchen Display System (KDS) Screen */
.kds-screen{background:#0b1120;color:#f8fafc;min-height:560px;border-radius:8px;padding:14px;display:flex;flex-direction:column;gap:12px}
.kds-header{display:flex;justify-content:space-between;align-items:center;background:#1e293b;padding:12px 18px;border-radius:10px;border:1px solid #334155;flex-wrap:wrap;gap:12px}
.kds-logo-row{display:flex;align-items:center;gap:12px}
.kds-chef-hat{font-size:32px;background:#334155;width:48px;height:48px;border-radius:10px;display:grid;place-items:center}
.kds-main-title{margin:0;font-size:18px;font-weight:900;letter-spacing:1px;color:#f8fafc}
.kds-subtitle{font-size:12px;color:#94a3b8;display:block}
.kds-stat-pills{display:flex;gap:10px}
.kds-pill{background:#0f172a;border:1px solid #334155;padding:6px 14px;border-radius:8px;display:flex;flex-direction:column;align-items:center;min-width:65px}
.kds-pill b{font-size:17px;line-height:1.1}
.kds-pill small{font-size:10px;color:#94a3b8;text-transform:uppercase}
.kds-pill.new b{color:#f59e0b}
.kds-pill.new.pulse{border-color:#f59e0b;animation:pulseBadge 1.4s infinite}
.kds-pill.prep b{color:#3b82f6}
.kds-pill.ready b{color:#22c55e}
.kds-controls-col{display:flex;flex-direction:column;align-items:flex-end;gap:6px}
.kds-live-clock{font-family:monospace;font-size:15px;font-weight:700;color:#e2e8f0;background:#0f172a;padding:4px 10px;border-radius:6px;border:1px solid #334155}
.kds-actions-row{display:flex;gap:6px}
.kds-btn-tool{background:#334155;color:#e2e8f0;border:1px solid #475569;padding:6px 12px;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;transition:0.15s}
.kds-btn-tool:hover{background:#475569}
.kds-btn-tool.active{background:#047857;border-color:#10b981;color:#fff}
.kds-btn-tool.primary{background:#ea580c;border-color:#f97316;color:#fff}

.kds-filter-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.kds-tabs{display:flex;gap:6px;overflow-x:auto}
.kds-tab-btn{background:#1e293b;border:1px solid #334155;color:#94a3b8;font-size:12px;font-weight:700;padding:7px 14px;border-radius:6px;cursor:pointer;transition:0.15s;white-space:nowrap}
.kds-tab-btn:hover{color:#f8fafc;border-color:#64748b}
.kds-tab-btn.on{background:#2563eb;color:#fff;border-color:#3b82f6}
.kds-search-box{display:flex;align-items:center;background:#1e293b;border:1px solid #334155;border-radius:6px;padding:4px 10px}
.kds-search-box input{background:transparent;border:none;color:#fff;font-size:12px;outline:none;width:180px}
.kds-search-box button{background:none;border:none;color:#94a3b8;cursor:pointer;font-size:12px}

.kds-tickets-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;padding:4px 0}
.kds-empty-msg{grid-column:1 / -1;text-align:center;padding:50px 20px;color:#94a3b8}
.kds-empty-msg h3{margin:8px 0;color:#f8fafc}

/* KOT Ticket Card (Kitchen Order Ticket) */
.kot-ticket-card{background:#1e293b;border:2px solid #334155;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.3);display:flex;flex-direction:column;position:relative}
.kot-ticket-card.new{border-color:#f59e0b}
.kot-ticket-card.new-pulse{animation:pulseBorder 1.8s infinite}
@keyframes pulseBorder{0%,100%{box-shadow:0 0 0 0 rgba(245,158,11,0.4)}50%{box-shadow:0 0 0 6px rgba(245,158,11,0.2)}}
.kot-ticket-card.preparing{border-color:#3b82f6}
.kot-ticket-card.ready{border-color:#22c55e}
.kot-ticket-card.served{border-color:#475569;opacity:0.75}

.kot-header{padding:10px 12px;background:#0f172a;border-bottom:1px solid #334155}
.kot-header-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}
.kot-table-badge{font-size:15px;font-weight:900;color:#f8fafc}
.kot-status-badge{font-size:10px;font-weight:800;padding:2px 8px;border-radius:12px;letter-spacing:0.5px}
.kot-status-badge.new{background:#fef3c7;color:#92400e}
.kot-status-badge.preparing{background:#dbeafe;color:#1e40af}
.kot-status-badge.ready{background:#dcfce7;color:#15803d}
.kot-status-badge.served{background:#f1f5f9;color:#475569}

.kot-meta-row{display:flex;justify-content:space-between;font-size:11px;color:#94a3b8}
.kot-id{font-weight:700;color:#cbd5e1}
.kot-source{background:#334155;color:#e2e8f0;padding:1px 6px;border-radius:4px;font-size:10px}
.kot-timer{font-weight:800}

.kot-chef-note{background:#451a03;border-left:4px solid #f59e0b;padding:8px 10px;margin:8px 10px 0;border-radius:4px;display:flex;gap:8px;align-items:flex-start}
.kot-chef-note .note-icon{font-size:16px}
.kot-chef-note b{font-size:11px;color:#fde68a;display:block}
.kot-chef-note p{margin:2px 0 0;font-size:12px;color:#fed7aa;font-style:italic}

.kot-items-list{padding:10px 12px;flex:1;display:flex;flex-direction:column;gap:6px}
.kot-item-row{display:flex;align-items:center;gap:8px;padding:6px 8px;background:#0f172a;border-radius:6px;cursor:pointer;border:1px solid #334155;transition:0.15s}
.kot-item-row:hover{background:#1a2333}
.kot-item-row.done{opacity:0.45;text-decoration:line-through}
.kot-item-qty{font-weight:900;font-size:14px;color:#38bdf8;min-width:24px}
.kot-item-icon{font-size:16px}
.kot-item-name{font-size:13px;font-weight:700;color:#f1f5f9}

.kot-footer-actions{display:flex;gap:6px;padding:10px 12px;background:#0f172a;border-top:1px solid #334155}
.kot-btn{flex:1;border:none;border-radius:6px;padding:8px 10px;font-weight:800;font-size:12px;cursor:pointer;transition:0.15s}
.kot-btn.start{background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff}
.kot-btn.ready{background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff}
.kot-btn.serve{background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff}
.kot-btn.reopen{background:#475569;color:#fff}
.kot-btn.print{flex:0 0 34px;background:#334155;color:#fff;font-size:13px}
.kot-btn.void{flex:0 0 34px;background:#451a1a;color:#f87171;font-size:13px}
.kot-btn.void:hover{background:#7f1d1d;color:#fff}

@media(max-width:860px){
.g2,.g5{grid-template-columns:1fr}
.grid[style]{grid-template-columns:1fr!important}
.kpis{grid-template-columns:1fr 1fr}
.big{font-size:26px;min-width:240px}
.tw table{min-width:520px}.tw table.wide{min-width:760px}
.kds-header{flex-direction:column;align-items:stretch}
.kds-controls-col{align-items:flex-start}
}
@media(max-width:560px){
.sd-wood{padding:8px 6px}
.win{border-radius:8px}
.in{margin:6px;padding:10px;min-height:calc(100vh - 90px)}
.home{min-height:calc(100vh - 150px);gap:16px}
.big{width:100%;min-width:0;font-size:22px;padding:22px 16px;gap:12px}
.big i{font-size:34px}
.ch{font-size:16px;padding:8px 10px;flex-wrap:wrap}
.ch .srch,.ch>span{width:100%;flex:1 1 100%}
.ch>span{display:flex;gap:8px}
.ch>span .srch{flex:1;width:auto!important;min-width:0}
.ab{margin-left:0;white-space:nowrap}
.srch{width:100%}
.cb{padding:8px}
.kp{padding:10px;gap:10px}.kp>div{min-width:100%}
.kp b{font-size:20px}.ic{width:40px;height:40px;font-size:18px}
.inc{padding:10px}.inc b{font-size:21px}
.chart{gap:3px;margin-left:28px;height:110px}
.chart i::after{font-size:8px}
.chart i:nth-child(even)::after{visibility:hidden}
.chart u{left:-28px}
.cn{padding:2px 6px 6px}
.cg{font-size:13px}.cg span{padding:8px 0}
.kpis{grid-template-columns:1fr}
.kpis b{font-size:20px}
.pg{justify-content:center!important;flex-wrap:wrap}
.dt{grid-template-columns:100px 1fr;font-size:13px}
.hd{flex-wrap:wrap}.hd h3{font-size:17px}
.bk{padding:6px 12px}.bar span{width:30px}
td,th{padding:6px 8px}
.modal-body{grid-template-columns:1fr}
.kitchen-live-banner{left:10px;right:10px;top:10px}
}

/* --- Multi-Role Login Portal --- */
.login-wrapper {
  max-width: 1040px;
  margin: 0 auto;
  padding: 10px 4px;
}
.login-brand-header {
  text-align: center;
  margin-bottom: 22px;
}
.brand-logo-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  padding: 6px 16px;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 12px;
}
.brand-icon { font-size: 20px; }
.brand-name { font-weight: 800; font-size: 14px; letter-spacing: 1.5px; color: #0b3a78; }
.brand-sub { background: #e0f2fe; color: #0369a1; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 999px; }
.login-main-title {
  margin: 0 0 6px;
  font-size: 28px;
  font-weight: 800;
  color: #1e293b;
}
.login-sub-title {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

.login-roles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.login-role-card {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}
.login-role-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  border-color: #cbd5e1;
}
.login-role-card.selected {
  border-color: #2563eb;
  background: #f8fafc;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.18), 0 8px 20px rgba(0,0,0,0.08);
}
.role-card-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.role-avatar {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 22px;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);
}
.role-header-text {
  flex: 1;
  min-width: 0;
}
.role-badge {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.role-name {
  margin: 2px 0 0;
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
}
.role-tagline {
  font-size: 12px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 6px;
}
.role-desc {
  font-size: 12px;
  color: #64748b;
  line-height: 1.45;
  margin: 0 0 12px;
  flex-grow: 1;
}
.role-features {
  border-top: 1px dashed #e2e8f0;
  padding-top: 10px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.role-feat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: #334155;
  font-weight: 500;
}
.feat-check {
  color: #10b981;
  font-weight: 800;
  font-size: 12px;
}
.role-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: auto;
}
.btn-select-role {
  width: 100%;
  border: 0;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-instant-login {
  width: 100%;
  border: 1.5px solid;
  background: #fff;
  padding: 7px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-instant-login:hover {
  background: #f8fafc;
  transform: translateY(-1px);
}

.login-form-panel {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.form-panel-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-left: 12px;
  margin-bottom: 18px;
}
.form-header-badge {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: 20px;
  color: #fff;
}
.form-row-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 12px;
}
.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #334155;
  margin-bottom: 6px;
}
.login-input {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  background: #f8fafc;
  box-sizing: border-box;
}
.login-input:focus {
  border-color: #2563eb;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
}
.quick-credentials-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 16px;
}
.cred-pill {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #334155;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11.5px;
  cursor: pointer;
}
.cred-pill:hover {
  background: #e2e8f0;
}
.form-submit-row {
  display: flex;
  gap: 12px;
  align-items: center;
}
.btn-main-login {
  border: 0;
  color: #fff;
  font-weight: 800;
  font-size: 14px;
  padding: 10px 22px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  transition: all 0.15s ease;
}
.btn-main-login:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.18);
}
.btn-instant-alt {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  color: #1e293b;
  font-weight: 700;
  font-size: 13px;
  padding: 9px 16px;
  border-radius: 8px;
  cursor: pointer;
}
.btn-instant-alt:hover {
  background: #e2e8f0;
}
.login-error-alert {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 14px;
}

/* --- Admin Home Container (Kitchen removed) --- */
.admin-home-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.admin-home-hero {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #fff;
  border-radius: 12px;
  padding: 22px 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6px 16px rgba(15,23,42,0.15);
  border: 1px solid #334155;
}
.admin-role-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.12);
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}
.admin-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
}
.admin-hero-title {
  margin: 0 0 6px;
  font-size: 24px;
  font-weight: 800;
}
.admin-hero-desc {
  margin: 0;
  font-size: 13px;
  color: #94a3b8;
  max-width: 620px;
  line-height: 1.5;
}
.admin-stat-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 10px 16px;
  border-radius: 10px;
}
.admin-stat-chip .chip-icon { font-size: 24px; }
.admin-stat-chip b { display: block; font-size: 14px; color: #fff; }
.admin-stat-chip small { font-size: 11px; color: #94a3b8; }

.admin-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.admin-dash-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 22px 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}
.admin-dash-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0,0,0,0.09);
  border-color: #cbd5e1;
}
.dash-card-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 26px;
  color: #fff;
  margin-bottom: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.dash-card-tag {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.8px;
  color: #64748b;
  margin-bottom: 4px;
}
.dash-card-title {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
}
.dash-card-desc {
  margin: 0 0 16px;
  font-size: 12.5px;
  color: #64748b;
  line-height: 1.5;
  flex-grow: 1;
}
.dash-card-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  margin-top: auto;
}
.dash-card-btn .arrow {
  transition: transform 0.15s ease;
}
.admin-dash-card:hover .dash-card-btn .arrow {
  transform: translateX(4px);
}

/* --- Top Bar User Profile Badge & Logout --- */
.cafe-window-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #0b3a78;
}
.user-top-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  padding: 3px 6px 3px 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.user-role-badge {
  font-size: 11.5px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
}
.user-role-badge.admin { background: #dbeafe; color: #1e40af; }
.user-role-badge.supplier { background: #d1fae5; color: #065f46; }
.user-role-badge.kitchen { background: #ffedd5; color: #9a3412; }
.user-display-name {
  font-size: 12px;
  font-weight: 600;
  color: #334155;
}
.user-logout-btn {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.user-logout-btn:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

/* --- Supplier Portal Banner --- */
.supplier-portal-banner {
  background: linear-gradient(135deg, #065f46, #047857);
  color: #fff;
  border-radius: 10px;
  padding: 14px 18px;
  margin-bottom: 14px;
  box-shadow: 0 4px 12px rgba(6,95,70,0.18);
}
.supplier-banner-content {
  display: flex;
  align-items: center;
  gap: 14px;
}
.supplier-banner-icon {
  font-size: 30px;
}
.supplier-banner-content h3 {
  margin: 0 0 3px;
  font-size: 17px;
  font-weight: 800;
}
.supplier-banner-content p {
  margin: 0;
  font-size: 12.5px;
  color: #d1fae5;
}

@media (max-width: 860px) {
  .login-roles-grid, .admin-cards-grid {
    grid-template-columns: 1fr;
  }
  .form-row-inputs {
    grid-template-columns: 1fr;
  }
  .admin-home-hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

/* --- Table Income Showcase Styles --- */
.table-income-container {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.table-income-toast {
  position: fixed;
  top: 16px;
  right: 20px;
  z-index: 9999;
  background: #1e293b;
  color: #fff;
  padding: 10px 18px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  border: 1px solid #475569;
}
.table-income-hero {
  background: linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%);
  color: #ffffff;
  border-radius: 14px;
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 25px rgba(6,78,59,0.25);
  border: 1px solid #10b981;
}
.hero-income-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.14);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.6px;
  margin-bottom: 8px;
}
.badge-pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
}
.hero-income-label {
  display: block;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 1.2px;
  color: #a7f3d0;
  margin-bottom: 4px;
}
.hero-income-amount {
  margin: 0 0 6px;
  font-size: 40px;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.hero-income-sub {
  margin: 0;
  font-size: 13px;
  color: #d1fae5;
  max-width: 580px;
  line-height: 1.5;
}
.hero-actions-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}
.hero-settle-btn {
  background: #ffffff;
  color: #065f46;
  border: 0;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.15s ease;
}
.hero-settle-btn:hover {
  transform: translateY(-2px);
  background: #f0fdf4;
}
.hero-review-link-btn {
  background: rgba(255,255,255,0.15);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.25);
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.hero-review-link-btn:hover {
  background: rgba(255,255,255,0.25);
}

.income-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.income-kpi-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
}
.kpi-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 20px;
  flex-shrink: 0;
}
.kpi-text-wrap {
  display: flex;
  flex-direction: column;
}
.kpi-title {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 2px;
}
.kpi-val {
  font-size: 20px;
  font-weight: 900;
  line-height: 1.2;
}
.kpi-desc {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
}

.table-income-chart-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.chart-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 10px;
}
.table-filter-tabs {
  display: flex;
  gap: 6px;
}
.table-filter-tabs button {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}
.table-filter-tabs button.on {
  background: #059669;
  color: #ffffff;
  border-color: #059669;
}

.table-bars-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.table-bar-row {
  display: flex;
  align-items: center;
  gap: 14px;
}
.bar-table-label {
  width: 120px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #1e293b;
}
.active-dot-chip {
  font-size: 10px;
  background: #dbeafe;
  color: #1d4ed8;
  padding: 1px 5px;
  border-radius: 4px;
  font-weight: 700;
}
.bar-track-wrap {
  flex: 1;
  height: 18px;
  background: #f1f5f9;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}
.bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s ease;
}
.bar-rupees-value {
  width: 130px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  font-size: 13.5px;
  color: #0f172a;
}
.bar-rupees-value small {
  color: #64748b;
  font-size: 11.5px;
}

.table-income-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.table-money-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}
.table-money-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
  border-color: #cbd5e1;
}
.table-money-card.has-active {
  border-color: #93c5fd;
  box-shadow: 0 0 0 2px rgba(59,130,246,0.15), 0 4px 12px rgba(0,0,0,0.05);
}
.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.table-title-area {
  display: flex;
  align-items: center;
  gap: 10px;
}
.table-icon-pill {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #f1f5f9;
  display: grid;
  place-items: center;
  font-size: 18px;
}
.table-card-name {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
}
.table-seat-count {
  font-size: 11px;
  color: #64748b;
  font-weight: 600;
}
.table-status-pill {
  font-size: 10.5px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 999px;
}
.table-status-pill.occupied {
  background: #dbeafe;
  color: #1e40af;
}
.table-status-pill.settled {
  background: #d1fae5;
  color: #065f46;
}

.table-card-rupees-box {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 12px;
  text-align: center;
}
.rupees-box-label {
  display: block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.8px;
  color: #166534;
  margin-bottom: 2px;
}
.rupees-box-amount {
  font-size: 26px;
  font-weight: 900;
  color: #15803d;
  letter-spacing: -0.5px;
}
.rupees-box-share {
  font-size: 11px;
  color: #166534;
  margin-top: 2px;
}

.table-card-breakdown {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: #f8fafc;
  padding: 8px 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 12px;
}
.breakdown-item {
  display: flex;
  justify-content: space-between;
  color: #475569;
}
.breakdown-item b {
  color: #1e293b;
}

.table-card-active-items {
  margin-bottom: 12px;
  font-size: 11px;
}
.active-items-label {
  display: block;
  font-weight: 700;
  color: #475569;
  margin-bottom: 4px;
}
.active-items-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.active-item-tag {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10.5px;
  font-weight: 600;
}

.table-card-actions {
  margin-top: auto;
}
.btn-card-settle {
  width: 100%;
  background: #1d4ed8;
  color: #fff;
  border: 0;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-card-settle:hover {
  background: #1e40af;
}
.btn-card-add-test {
  width: 100%;
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
  padding: 7px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-card-add-test:hover {
  background: #e2e8f0;
}

.table-summary-sheet-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.sheet-card-header {
  margin-bottom: 14px;
}
.table-responsive-wrapper {
  overflow-x: auto;
}
.income-ledger-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.income-ledger-table th {
  background: #f1f5f9;
  color: #334155;
  padding: 10px 12px;
  font-weight: 700;
  border-bottom: 2px solid #cbd5e1;
}
.income-ledger-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #f1f5f9;
}
.income-ledger-table tr.row-active-bill {
  background: #f8fbff;
}
.ledger-status-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
}
.ledger-status-pill.occ { background: #dbeafe; color: #1e40af; }
.ledger-status-pill.free { background: #d1fae5; color: #065f46; }
.ledger-settle-btn {
  background: #1d4ed8;
  color: #fff;
  border: 0;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}
.ledger-settle-btn:hover { background: #1e40af; }
.ledger-add-btn {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
}
.ledger-add-btn:hover { background: #e2e8f0; }
.ledger-total-row td {
  background: #f8fafc;
  border-top: 2px solid #cbd5e1;
  padding: 14px 12px;
}

@media (max-width: 1024px) {
  .income-kpi-grid, .table-income-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .income-kpi-grid, .table-income-cards-grid {
    grid-template-columns: 1fr;
  }
  .table-income-hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
  .hero-actions-column {
    align-items: flex-start;
    width: 100%;
  }
  .hero-settle-btn {
    width: 100%;
    justify-content: center;
  }
}

@media print {
  body * { visibility: hidden; }
  .qr-tent-stand, .qr-tent-stand *,
  .table-sticker-preview, .table-sticker-preview *,
  .all-stickers-sheet, .all-stickers-sheet *,
  .kot-receipt, .kot-receipt * { visibility: visible; }
  .qr-tent-stand, .table-sticker-preview { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border: 3px solid #000; box-shadow: none; }
  .all-stickers-sheet { position: absolute; left: 0; top: 0; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
  .kot-receipt { position: absolute; left: 50%; top: 10%; transform: translateX(-50%); width: 280px; }
}
`;
