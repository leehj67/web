import React, { useMemo, useState } from "react";

export default function SejongGoodsShop() {
  const allProducts = useMemo(
    () => [
      {
        id: "seri-keyring",
        name: "세리 아크릴 키링",
        price: 8000,
        badge: "NEW",
        imageUrl: "/images/키링.png",
        color: "투명",
        category: "세리",
      },
      {
        id: "seri-plush",
        name: "세리 봉제 인형 (L)",
        price: 32000,
        badge: "BEST",
        imageUrl: "/images/세리다쿠.png",
        color: "살구",
        category: "세리",
      },
      {
        id: "seri-tshirt",
        name: "세리 티셔츠 (한글 로고)",
        price: 25000,
        imageUrl: "/images/세리셔츠.png",
        color: "아이보리",
        category: "세리",
      },
      {
        id: "spirits-stickers",
        name: "정령 스티커팩 (3종)",
        price: 7000,
        badge: "HOT",
        imageUrl: "/images/자석.png",
        color: "혼합",
        category: "정령",
      },
      {
        id: "spirits-notebook",
        name: "정령 노트 세트",
        price: 12000,
        imageUrl: "/images/노트.png",
        color: "혼합",
        category: "정령",
      },
      {
        id: "villain-oni-figure",
        name: "도깨비 피규어",
        price: 18000,
        imageUrl: "/images/피규어.png",
        color: "보라",
        category: "악당",
      },
      {
        id: "villain-wolf-figure",
        name: "늑대 피규어",
        price: 18000,
        imageUrl: "/images/피규어.png",
        color: "브라운",
        category: "악당",
      },
      {
        id: "villain-keyring",
        name: "악당 랜덤 키링 (1종)",
        price: 9000,
        imageUrl: "/images/악당킬이.png",
        color: "혼합",
        category: "악당",
      },
    ],
    []
  );

  const categories = ["전체", "세리", "정령", "악당"];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState({});

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchCategory = category === "전체" || p.category === category;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [allProducts, category, query]);

  const total = useMemo(() => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const product = allProducts.find((p) => p.id === id);
      if (!product) return sum;
      return sum + product.price * qty;
    }, 0);
  }, [cart, allProducts]);

  const addToCart = (id) =>
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));

  const decFromCart = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return next;
      next[id] = Math.max(0, next[id] - 1);
      if (next[id] === 0) delete next[id];
      return next;
    });

  const clearCart = () => setCart({});

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-amber-50/80 border-b border-amber-200">
        <div className="mx-auto w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐭</span>
            <div className="font-bold text-lg">세리 & 악당들 굿즈</div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  category === c
                    ? "bg-amber-600 text-white shadow"
                    : "hover:bg-amber-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색: 스티커, 피규어…"
                className="w-44 md:w-64 rounded-full border border-amber-300 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <span className="absolute right-3 top-2.5 text-amber-700">⌕</span>
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-full bg-amber-600 text-white px-3 py-2 text-sm shadow hover:bg-amber-700"
            >
              장바구니
              {Object.keys(cart).length > 0 && (
                <span className="ml-2 rounded-full bg-white/90 text-amber-700 px-2 py-0.5 text-xs">
                  {Object.values(cart).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-100 to-amber-50 border-b border-amber-200">
        <div className="mx-auto w-full px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              세종 감성 캐릭터 굿즈,{" "}
              <span className="text-amber-700">세리</span>와{" "}
              <span className="text-amber-700">악당들</span>
            </h1>
            <p className="text-stone-600">
              한글·전통 모티프를 담은 귀여운 굿즈 컬렉션. 아이들과 어른 모두를 위한 선물!
            </p>
            <div className="flex gap-3">
              <a
                href="#catalog"
                className="px-5 py-2 rounded-xl bg-amber-700 text-white shadow hover:bg-amber-800"
              >
                지금 구경하기
              </a>
              <a
                href="#about"
                className="px-5 py-2 rounded-xl border border-amber-300 bg-white/70 hover:bg-white"
              >
                브랜드 소개
              </a>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl border border-amber-200 bg-white/70 shadow-inner overflow-hidden grid place-items-center p-0">
            <img
              src="/images/banner.png"
              alt="세리 굿즈 배너"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="mx-auto w-full px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">상품 카탈로그</h2>
          <div className="md:hidden flex gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  category === c
                    ? "bg-amber-600 text-white shadow"
                    : "hover:bg-amber-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group rounded-2xl border border-amber-200 bg-white/80 p-3 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {p.badge && (
                  <span className="absolute left-2 top-2 rounded-full bg-amber-600 text-white text-xs px-2 py-1 shadow">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="mt-3 flex-1">
                <h3 className="font-semibold leading-tight line-clamp-2">
                  {p.name}
                </h3>
                <p className="text-sm text-stone-500 mt-1">색상: {p.color}</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="font-bold">{p.price.toLocaleString()}원</div>
                <button
                  onClick={() => addToCart(p.id)}
                  className="rounded-lg bg-amber-700 text-white text-sm px-3 py-2 hover:bg-amber-800"
                >
                  담기
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto w-full px-4 pb-16">
        <div className="rounded-2xl border border-amber-200 bg-white/70 p-6 md:p-8">
          <h3 className="text-lg font-bold mb-2">브랜드 소개</h3>
          <p className="text-stone-700 leading-relaxed">
            세종 테마의 교육·컬처 세계관에서 태어난 캐릭터 <b>세리</b>와{" "}
            유쾌한 라이벌 <b>악당들</b>의 굿즈 라인입니다. 디자인은 유아/저학년 친화적
            단순 도형, 선명한 색, 반복 패턴을 기반으로 제작되어 향후 애니메이션 데이터
            학습에 적합한 일관성을 유지합니다.
          </p>
        </div>
      </section>

      {/* Cart Drawer */}
      <aside
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 z-50 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h4 className="font-bold text-lg">장바구니</h4>
          <button
            onClick={() => setCartOpen(false)}
            className="rounded-full px-3 py-1.5 text-sm hover:bg-stone-100"
          >
            닫기 ✕
          </button>
        </div>
        <div className="p-5 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
          {Object.keys(cart).length === 0 && (
            <p className="text-stone-500">담긴 상품이 없습니다.</p>
          )}
          {Object.entries(cart).map(([id, qty]) => {
            const p = allProducts.find((x) => x.id === id);
            return (
              <div key={id} className="flex gap-3 items-center border-b pb-4">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-16 w-16 rounded-lg object-cover border"
                />
                <div className="flex-1">
                  <div className="font-semibold line-clamp-1">{p.name}</div>
                  <div className="text-sm text-stone-500">
                    {p.price.toLocaleString()}원
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2">
                    <button
                      onClick={() => decFromCart(id)}
                      className="px-2 py-1 rounded bg-stone-100"
                    >
                      -
                    </button>
                    <span className="min-w-6 text-center">{qty}</span>
                    <button
                      onClick={() => addToCart(id)}
                      className="px-2 py-1 rounded bg-stone-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="font-semibold">
                  {(p.price * qty).toLocaleString()}원
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-stone-600">합계</span>
            <span className="font-extrabold text-lg">
              {total.toLocaleString()}원
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={clearCart}
              className="flex-1 rounded-xl border px-4 py-2 hover:bg-stone-50"
            >
              비우기
            </button>
            <button className="flex-1 rounded-xl bg-amber-700 text-white px-4 py-2 shadow hover:bg-amber-800">
              결제하기
            </button>
          </div>
        </div>
      </aside>

      {/* Footer */}
      <footer className="border-t border-amber-200 bg-amber-50/60">
        <div className="mx-auto w-full px-4 py-8 grid md:grid-cols-3 gap-6 text-sm text-stone-600">
          <div>
            <div className="font-bold text-stone-800">세리 & 악당들</div>
            <p className="mt-1">
              © {new Date().getFullYear()} SERI STUDIO. All rights reserved.
            </p>
          </div>
          <div>
            <div className="font-semibold text-stone-800">고객지원</div>
            <ul className="mt-1 space-y-1">
              <li>문의: hello@seri.studio</li>
              <li>교환/반품 안내</li>
              <li>개인정보 처리방침</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-stone-800">팔로우</div>
            <div className="mt-1 flex gap-3 text-lg">
              <span>🐦</span>
              <span>📷</span>
              <span>▶️</span>
            </div>
          </div>
        </div>
      </footer>

      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setCartOpen(false)}
        />
      )}
    </div>
  );
}
