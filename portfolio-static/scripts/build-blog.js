const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const siteUrl = "https://hamzamohammed.com";

const rootDir = path.join(__dirname, "..");
const postsDir = path.join(rootDir, "posts");
const blogDir = path.join(rootDir, "blog");

if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function estimateReadTimeFromHtml(html) {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function createHead({ title, description, canonicalUrl, type = "website" }) {
  return `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="author" content="Hamza Mohammed" />
  <link rel="canonical" href="${canonicalUrl}" />

  <meta property="og:type" content="${type}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${siteUrl}/assets/HamzaM.webp" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${canonicalUrl}" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${siteUrl}/assets/HamzaM.webp" />

  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    html {
      scroll-behavior: smooth;
    }

    body {
      background: linear-gradient(
        to bottom,
        #020617 0%,
        #0f172a 35%,
        #111827 100%
      );
      color: #f8fafc;
    }

    .section-shell {
      background: rgba(31, 41, 55, 0.55);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .glass-card {
      background: rgba(17, 24, 39, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .gradient-border {
      position: relative;
      overflow: hidden;
    }

    .gradient-border::before {
      content: "";
      position: absolute;
      inset: 0;
      padding: 1px;
      border-radius: inherit;
      background: linear-gradient(
        135deg,
        rgba(96, 165, 250, 0.4),
        rgba(168, 85, 247, 0.3)
      );
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    .blog-content h2 {
      font-size: 1.75rem;
      line-height: 1.2;
      font-weight: 700;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      color: #ffffff;
    }

    .blog-content h3 {
      font-size: 1.35rem;
      line-height: 1.3;
      font-weight: 700;
      margin-top: 2rem;
      margin-bottom: 0.75rem;
      color: #ffffff;
    }

    .blog-content p {
      margin-bottom: 1.25rem;
      line-height: 1.8;
      color: #d1d5db;
      font-size: 1.05rem;
    }

    .blog-content ul,
    .blog-content ol {
      margin: 1.25rem 0;
      padding-left: 1.5rem;
      color: #d1d5db;
    }

    .blog-content li {
      margin-bottom: 0.65rem;
      line-height: 1.75;
    }

    .blog-content ul {
      list-style-type: disc;
    }

    .blog-content ol {
      list-style-type: decimal;
    }

    .blog-content a {
      color: #818cf8;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .blog-content blockquote {
      border-left: 4px solid #6366f1;
      padding-left: 1rem;
      margin: 2rem 0;
      color: #e5e7eb;
      font-style: italic;
    }

    .blog-content code {
      background: rgba(15, 23, 42, 0.9);
      padding: 0.15rem 0.35rem;
      border-radius: 0.35rem;
      color: #c7d2fe;
      font-size: 0.95rem;
    }

    .blog-content pre {
      background: rgba(15, 23, 42, 0.95);
      padding: 1rem;
      border-radius: 0.75rem;
      overflow-x: auto;
      margin: 1.5rem 0;
      border: 1px solid rgba(255,255,255,0.08);
    }

    .blog-content pre code {
      background: transparent;
      padding: 0;
    }
  </style>`;
}

function createNav() {
  return `
  <nav class="fixed top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-950/90 to-gray-950/50 backdrop-blur z-50 border-b border-white/5">
    <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
      <a href="/" class="text-xl font-bold">HamzaM</a>

      <ul class="hidden md:flex items-center gap-6 text-gray-300">
        <li><a href="/#projects" class="hover:text-white">Work</a></li>
        <li><a href="/#services" class="hover:text-white">Services</a></li>
        <li><a href="/#about" class="hover:text-white">About</a></li>
        <li><a href="/blog/" class="hover:text-white">Blog</a></li>
        <li>
          <a href="/#contact" class="bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition">
            Free Store Audit
          </a>
        </li>
      </ul>

      <button
        id="menu-toggle"
        class="md:hidden text-gray-300 hover:text-white focus:outline-none"
        aria-label="Open menu"
        aria-expanded="false"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <div
      id="nav-menu"
      class="hidden md:hidden bg-gray-950/95 backdrop-blur border-t border-gray-800"
    >
      <ul class="flex flex-col px-6 py-6 space-y-4 text-gray-300">
        <li><a href="/#projects" class="block hover:text-white">Work</a></li>
        <li><a href="/#services" class="block hover:text-white">Services</a></li>
        <li><a href="/blog/" class="block hover:text-white">Blog</a></li>
        <li><a href="/#about" class="block hover:text-white">About</a></li>
        <li>
          <a
            href="/#contact"
            class="inline-block bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
          >
            Free Store Audit
          </a>
        </li>
      </ul>
    </div>
  </nav>`;
}

function createFooter() {
  return `
  <footer class="bg-gray-950/40 py-10 text-center text-gray-400 border-t border-white/5">
    © 2026 Hamza Mohammed — Ecommerce Developer for Small Brands
  </footer>

  <script>
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => {
        const isOpen = !navMenu.classList.contains("hidden");

        navMenu.classList.toggle("hidden");
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
      });
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  </script>`;
}

function createPostHtml(post) {
  const title = escapeHtml(post.title);
  const description = escapeHtml(post.description);
  const category = escapeHtml(post.category || "Ecommerce Guide");
  const canonicalUrl = `${siteUrl}/blog/${post.slug}.html`;
  const readTime = estimateReadTimeFromHtml(post.contentHtml);

  return `<!doctype html>
<html lang="en">
<head>
  ${createHead({
    title: `${title} | Hamza Mohammed`,
    description,
    canonicalUrl,
    type: "article",
  })}

  <script type="application/ld+json">
    ${JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        author: {
          "@type": "Person",
          name: "Hamza Mohammed",
          url: siteUrl,
        },
        publisher: {
          "@type": "Person",
          name: "Hamza Mohammed",
        },
        mainEntityOfPage: canonicalUrl,
        image: `${siteUrl}/assets/HamzaM.webp`,
      },
      null,
      2,
    )}
  </script>
</head>

<body>
  ${createNav()}

  <main class="pt-28 md:pt-32 px-6 pb-20">
    <article class="max-w-4xl mx-auto">
      <nav class="text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2 flex-wrap">
          <li><a href="/" class="hover:text-white">Home</a></li>
          <li>/</li>
          <li><a href="/blog/" class="hover:text-white">Articles</a></li>
          <li>/</li>
          <li><span class="text-white">${title}</span></li>
        </ol>
      </nav>

      <header class="mb-10">
        <span class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/15 text-indigo-200 border border-indigo-400/20 rounded-full text-sm mb-6">
          ${category}
        </span>

        <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6">
          ${title}
        </h1>

        <p class="text-xl text-gray-300 leading-relaxed max-w-3xl mb-6">
          ${description}
        </p>

        <div class="flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <span>By Hamza Mohammed</span>
          <span>•</span>
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          <span>•</span>
          <span>${readTime} min read</span>
        </div>
      </header>

      <div class="grid lg:grid-cols-12 gap-8 items-start">
        <aside class="hidden lg:block lg:col-span-3 sticky top-28">
          <div class="glass-card rounded-2xl p-5">
            <p class="text-sm font-semibold text-white mb-3">Need ecommerce help?</p>
            <p class="text-sm text-gray-400 leading-relaxed mb-4">
              I help small brands improve Shopify, checkout flow, speed and conversion.
            </p>
            <a href="/#contact" class="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 font-semibold">
              Request audit
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>
        </aside>

        <div class="lg:col-span-9">
          <div class="section-shell gradient-border rounded-2xl p-6 md:p-10">
            <div class="blog-content">
              ${post.contentHtml}
            </div>
          </div>

          <div class="mt-10 glass-card rounded-2xl p-6 md:p-8">
            <h2 class="text-2xl font-bold mb-3">Want a practical review of your ecommerce store?</h2>
            <p class="text-gray-400 leading-relaxed mb-6">
              I’ll look at your product pages, mobile UX, checkout flow and obvious conversion leaks — then send back clear next steps.
            </p>
            <a href="/#contact" class="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-5 py-3 rounded-lg font-bold transition">
              Request a Free Store Audit
              <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </a>
          </div>

          <div class="mt-8">
            <a href="/blog/" class="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-semibold">
              ← Back to all articles
            </a>
          </div>
        </div>
      </div>
    </article>
  </main>

  ${createFooter()}
</body>
</html>`;
}

function createIndexHtml(posts) {
  const canonicalUrl = `${siteUrl}/blog/`;
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  const featuredHtml = featuredPost
    ? `
    <article class="section-shell gradient-border rounded-3xl p-6 md:p-8 mb-10">
      <div class="grid lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7">
          <div class="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-200 border border-indigo-400/20">
              Featured Guide
            </span>
            <time datetime="${featuredPost.date}">${formatDate(featuredPost.date)}</time>
            <span>•</span>
            <span>${estimateReadTimeFromHtml(featuredPost.contentHtml)} min read</span>
          </div>

          <h2 class="text-3xl md:text-4xl font-bold leading-tight mb-4">
            <a href="/blog/${featuredPost.slug}.html" class="hover:text-indigo-300 transition">
              ${escapeHtml(featuredPost.title)}
            </a>
          </h2>

          <p class="text-gray-300 text-lg leading-relaxed mb-6">
            ${escapeHtml(featuredPost.description)}
          </p>

          <a href="/blog/${featuredPost.slug}.html" class="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-5 py-3 rounded-lg font-bold transition">
            Read featured article
            <i data-lucide="arrow-right" class="w-5 h-5"></i>
          </a>
        </div>

        <div class="lg:col-span-5">
          <div class="glass-card rounded-2xl p-6">
            <p class="text-sm uppercase tracking-wide text-indigo-300 mb-3">
              Built for store owners
            </p>
            <ul class="space-y-3 text-gray-300">
              <li class="flex gap-3">
                <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"></i>
                <span>Practical ecommerce fixes, not theory</span>
              </li>
              <li class="flex gap-3">
                <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"></i>
                <span>Shopify, checkout, speed and CRO advice</span>
              </li>
              <li class="flex gap-3">
                <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"></i>
                <span>Written from real build and optimisation work</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>`
    : "";

  const postsHtml = otherPosts
    .map((post) => {
      const readTime = estimateReadTimeFromHtml(post.contentHtml);
      const category = escapeHtml(post.category || "Ecommerce Guide");

      return `
      <article class="glass-card rounded-2xl p-6 hover:border-indigo-400/40 transition group">
        <div class="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-4">
          <span class="text-indigo-300">${category}</span>
          <span>•</span>
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          <span>•</span>
          <span>${readTime} min read</span>
        </div>

        <h2 class="text-2xl font-bold mb-3 leading-tight">
          <a href="/blog/${post.slug}.html" class="group-hover:text-indigo-300 transition">
            ${escapeHtml(post.title)}
          </a>
        </h2>

        <p class="text-gray-400 leading-relaxed mb-6">
          ${escapeHtml(post.description)}
        </p>

        <a href="/blog/${post.slug}.html" class="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-semibold">
          Read article
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
      </article>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
  ${createHead({
    title: "Ecommerce Development Articles | Hamza Mohammed",
    description:
      "Practical ecommerce development articles covering Shopify, Stripe, checkout UX, conversion rate optimisation and store speed.",
    canonicalUrl,
    type: "website",
  })}

  <script type="application/ld+json">
    ${JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Ecommerce Development Articles",
        url: canonicalUrl,
        description:
          "Practical ecommerce development articles covering Shopify, Stripe, checkout UX, conversion rate optimisation and store speed.",
        author: {
          "@type": "Person",
          name: "Hamza Mohammed",
          url: siteUrl,
        },
      },
      null,
      2,
    )}
  </script>
</head>

<body>
  ${createNav()}

  <main class="pt-28 md:pt-32 px-6 pb-20">
    <section class="max-w-6xl mx-auto">
      <nav class="text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2 flex-wrap">
          <li><a href="/" class="hover:text-white">Home</a></li>
          <li>/</li>
          <li><span class="text-white">Blog</span></li>
        </ol>
      </nav>

      <div class="mb-12">
        <span class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/15 text-indigo-200 border border-indigo-400/20 rounded-full text-sm mb-6">
          Ecommerce Resources
        </span>

        <div class="grid lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-8">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ecommerce Development Articles
              <span class="text-indigo-400">(${posts.length})</span>
            </h1>

            <p class="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
              Practical guides on Shopify, Stripe, checkout UX, store speed and conversion optimisation for small ecommerce brands.
            </p>
          </div>

          <div class="lg:col-span-4">
            <div class="glass-card rounded-2xl p-5">
              <p class="text-gray-400 text-sm mb-2">Need help with your store?</p>
              <a href="/#contact" class="inline-flex items-center gap-2 text-white font-bold hover:text-indigo-300 transition">
                Request a free ecommerce audit
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      ${featuredHtml}

      <div class="flex items-center justify-between gap-4 mb-6">
        <h2 class="text-2xl md:text-3xl font-bold">Latest articles</h2>
        <a href="/#services" class="hidden sm:inline-flex text-indigo-300 hover:text-indigo-200 font-semibold">
          View services
        </a>
      </div>

      <section class="grid md:grid-cols-2 gap-6">
        ${postsHtml || `<p class="text-gray-400">No more articles published yet.</p>`}
      </section>
    </section>
  </main>

  ${createFooter()}
</body>
</html>`;
}

function buildBlog() {
  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));

  const posts = files
    .map((file) => {
      const filePath = path.join(postsDir, file);
      const rawFile = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(rawFile);

      if (!data.title || !data.description || !data.date || !data.slug) {
        throw new Error(`Missing title, description, date or slug in ${file}`);
      }

      return {
        title: data.title,
        description: data.description,
        date: data.date,
        updated: data.updated || data.date,
        slug: data.slug,
        category: data.category || "Ecommerce Guide",
        contentHtml: marked(content),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  posts.forEach((post) => {
    fs.writeFileSync(
      path.join(blogDir, `${post.slug}.html`),
      createPostHtml(post),
    );
  });

  fs.writeFileSync(path.join(blogDir, "index.html"), createIndexHtml(posts));

  console.log(`Built ${posts.length} blog post(s).`);
}

buildBlog();
