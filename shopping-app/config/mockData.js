const PRODUCTS = [
  {
    product_id: 1,
    name: "Fashion Dress",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?...",
    categoryId: "clothing",
    shortDescription: "Elegant summer dress with premium breathable fabric",
    fullDescription:
      "This elegant summer dress combines style and comfort perfectly. Made from premium breathable fabric, it features a flattering silhouette that suits various body types. Perfect for casual outings, garden parties, or beach walks.",
    specifications: [
      "Material: 95% Cotton, 5% Elastane",
      "Machine washable",
      "Available in sizes S-XL",
      "Wrinkle-resistant fabric",
    ],
    stock: 50,
    rating: 4.5,
    sales: 1234,
    isActive: true,
  },
  {
    product_id: 2,
    name: "Wireless Earbuds",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1717295248230-93ea71f48f92?...",
    categoryId: "electronics",
    shortDescription: "Premium wireless earbuds with noise cancellation",
    fullDescription:
      "Experience premium audio quality with our wireless earbuds. Featuring advanced noise cancellation technology and crystal-clear sound reproduction. The ergonomic design ensures a comfortable fit for extended wear.",
    specifications: [
      "Bluetooth 5.3",
      "Battery life: 6 hours (earbuds) + 18 hours (case)",
      "IPX5 water resistant",
      "Touch controls",
      "Active noise cancellation",
    ],
    stock: 35,
    rating: 4.8,
    sales: 856,
    isActive: true,
  },
  {
    product_id: 3,
    name: "Decorative Vase",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?...",
    categoryId: "home",
    shortDescription: "Modern minimalist ceramic vase for elegant home decor",
    fullDescription:
      "Add a touch of elegance to your home with this modern minimalist vase. Crafted from high-quality ceramic with a smooth glazed finish. The unique shape and neutral color palette make it versatile enough to complement any interior design style.",
    specifications: [
      "Material: Premium ceramic",
      "Height: 25cm",
      "Waterproof interior",
      "Handcrafted design",
      "Easy to clean",
    ],
    stock: 28,
    rating: 4.3,
    sales: 432,
    isActive: true,
  },
  {
    product_id: 4,
    name: "Sports Shoes",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1602211844066-d3bb556e983b?...",
    categoryId: "sports",
    shortDescription:
      "Professional sports shoes with advanced cushioning technology",
    fullDescription:
      "Engineered for peak performance, these professional sports shoes feature advanced cushioning technology and superior grip. The breathable mesh upper keeps your feet cool during intense workouts.",
    specifications: [
      "Breathable mesh upper",
      "EVA foam cushioning",
      "Anti-slip rubber outsole",
      "Lightweight design",
      "Available in multiple colors",
    ],
    stock: 60,
    rating: 4.7,
    sales: 2156,
    isActive: true,
  },
  {
    product_id: 5,
    name: "Premium Books",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1580699228119-7be487b3137f?...",
    categoryId: "books",
    shortDescription:
      "Timeless bestselling collection in premium hardcover format",
    fullDescription:
      "A timeless collection in premium hardcover format. These bestselling books feature beautiful cover designs and high-quality paper that enhances the reading experience. Perfect for collectors and book lovers.",
    specifications: [
      "Hardcover binding",
      "Premium quality paper",
      "Collector's edition",
      "Includes author commentary",
      "Dust jacket included",
    ],
    stock: 45,
    rating: 4.6,
    sales: 678,
    isActive: true,
  },
  {
    product_id: 6,
    name: "Skincare Set",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1602260395251-0fe691861b56?...",
    categoryId: "beauty",
    shortDescription: "Comprehensive skincare set with natural ingredients",
    fullDescription:
      "Transform your skincare routine with this comprehensive set. Formulated with natural ingredients including hyaluronic acid, vitamin C, and botanical extracts. Each product is dermatologist-tested and suitable for all skin types.",
    specifications: [
      "100% natural ingredients",
      "Dermatologist tested",
      "Paraben-free",
      "Cruelty-free",
      "Suitable for all skin types",
    ],
    stock: 40,
    rating: 4.9,
    sales: 945,
    isActive: true,
  },
];

const BANNERS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?...",
    title: "Summer Collection",
    subtitle: "Up to 50% Off",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581495701295-13b43b0f4ae8?...",
    title: "Special Offers",
    subtitle: "Limited Time Only",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?...",
    title: "New Arrivals",
    subtitle: "Shop Now",
  },
];

const PRODUCT_CATEGORIES = [
  {
    category_id: "clothing",
    name: "Clothing",
    icon: "/icons/clothing.png",
    description: "Apparel and fashion items",
  },
  {
    category_id: "electronics",
    name: "Electronics",
    icon: "/icons/electronics.png",
    description: "Electronic devices and gadgets",
  },
  {
    category_id: "home",
    name: "Home",
    icon: "/icons/home.png",
    description: "Home and living products",
  },
  {
    category_id: "sports",
    name: "Sports",
    icon: "/icons/sport.png",
    description: "Sports and fitness equipment",
  },
  {
    category_id: "books",
    name: "Books",
    icon: "/icons/book.png",
    description: "Books and reading materials",
  },
  {
    category_id: "beauty",
    name: "Beauty",
    icon: "/icons/cosmetics.png",
    description: "Beauty and skincare products",
  },
];

const FAQ_CATEGORIES = [
  {
    category_id: "general",
    name: "General",
    description: "General questions and information about our store",
  },
  {
    category_id: "shipping",
    name: "Shipping & Delivery",
    description: "Questions about shipping, delivery, and tracking orders",
  },
  {
    category_id: "returns",
    name: "Returns & Refunds",
    description: "Information about returns, exchanges, and refund policies",
  },
  {
    category_id: "payment",
    name: "Payment & Billing",
    description: "Questions about payment methods and billing inquiries",
  },
  {
    category_id: "account",
    name: "Account & Profile",
    description: "Help with account management and profile settings",
  },
  {
    category_id: "products",
    name: "Products",
    description: "Questions about specific products and availability",
  },
  {
    category_id: "technical",
    name: "Technical Support",
    description: "Technical issues and troubleshooting assistance",
  },
  {
    category_id: "security",
    name: "Security & Privacy",
    description: "Information about data security and privacy protection",
  },
];

const REVIEWS = [
  {
    review_id: 1,
    product_id: 1,
    user_id: "user_001",
    rating: 5,
    comment:
      "Absolutely love this dress! The fabric is so soft and the fit is perfect. Received so many compliments!",
  },
  {
    review_id: 2,
    product_id: 1,
    user_id: "user_002",
    rating: 4,
    comment:
      "Great quality dress. Very comfortable and true to size. Only wish it came in more colors.",
  },
  {
    review_id: 3,
    product_id: 2,
    user_id: "user_003",
    rating: 5,
    comment:
      "Best earbuds I've ever owned! The sound quality is amazing and battery lasts all day.",
  },
  {
    review_id: 4,
    product_id: 2,
    user_id: "user_004",
    rating: 5,
    comment:
      "Noise cancellation works great. Perfect for my daily commute and gym sessions.",
  },
  {
    review_id: 5,
    product_id: 2,
    user_id: "user_005",
    rating: 4,
    comment:
      "Very good earbuds overall. Sometimes the touch controls are a bit sensitive but that's my only complaint.",
  },
  {
    review_id: 6,
    product_id: 3,
    user_id: "user_006",
    rating: 5,
    comment:
      "Beautiful vase! Looks even better in person. Perfect addition to my living room.",
  },
  {
    review_id: 7,
    product_id: 4,
    user_id: "user_007",
    rating: 5,
    comment:
      "Super comfortable! I run 5k every morning and these shoes provide excellent support.",
  },
  {
    review_id: 8,
    product_id: 4,
    user_id: "user_007",
    rating: 5,
    comment:
      "Great shoes for the price. Very lightweight and the grip is fantastic.",
  },
  {
    review_id: 9,
    product_id: 5,
    user_id: "user_002",
    rating: 5,
    comment:
      "Beautiful collector's edition. The hardcover and paper quality are outstanding.",
  },
  {
    review_id: 10,
    product_id: 6,
    user_id: "user_003",
    rating: 5,
    comment:
      "My skin has never looked better! This set is worth every penny. All natural and gentle.",
  },
  {
    review_id: 11,
    product_id: 6,
    user_id: "user_005",
    rating: 4,
    comment:
      "Great products! Noticed improvement in my skin within 2 weeks. The serum is my favorite.",
  },
];

const CARTS = [
  {
    cart_id: "cart_001",
    user_id: "user_001",
    items: [
      {
        product_id: 1,
        quantity: 1,
        price: 299.99,
        subtotal: 299.99,
      },
      {
        product_id: 4,
        quantity: 2,
        price: 499.99,
        subtotal: 999.98,
      },
    ],
    total: 1299.97,
    status: "active",
  },
  {
    cart_id: "cart_002",
    user_id: "user_002",
    items: [
      {
        product_id: 2,
        quantity: 1,
        price: 599.99,
        subtotal: 599.99,
      },
      {
        product_id: 5,
        quantity: 2,
        price: 89.99,
        subtotal: 179.98,
      },
    ],
    total: 779.97,
    status: "active",
  },
  {
    cart_id: "cart_003",
    user_id: "user_003",
    items: [
      {
        product_id: 6,
        quantity: 1,
        price: 399.99,
        subtotal: 399.99,
      },
      {
        product_id: 3,
        quantity: 1,
        price: 159.99,
        subtotal: 159.99,
      },
    ],
    total: 559.98,
    status: "active",
  },
  {
    cart_id: "cart_004",
    user_id: "user_004",
    items: [
      {
        product_id: 1,
        quantity: 3,
        price: 299.99,
        subtotal: 899.97,
      },
    ],
    total: 899.97,
    status: "active",
  },
  {
    cart_id: "cart_005",
    user_id: "user_005",
    items: [],
    total: 0,
    status: "active",
  },
  {
    cart_id: "cart_006",
    user_id: "user_006",
    items: [
      {
        product_id: 5,
        quantity: 1,
        price: 89.99,
        subtotal: 89.99,
      },
      {
        product_id: 3,
        quantity: 2,
        price: 159.99,
        subtotal: 319.98,
      },
    ],
    total: 409.97,
    status: "active",
  },
];

const USERS = [
  {
    user_id: "user_001",
    name: "Kexin",
    email: "kexin@example.com",
    password: "1",
    dob: new Date("2008-03-15"),
    phone: "5551234567",
    cart_id: "cart_001",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_002",
    name: "Viet",
    email: "viet@example.com",
    password: "1",
    dob: new Date("2007-07-22"),
    phone: "5552345678",
    cart_id: "cart_002",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_003",
    name: "Yujiang",
    email: "yujiangn@example.com",
    password: "1",
    dob: new Date("2006-11-08"),
    phone: "5553456789",
    cart_id: "cart_003",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_004",
    name: "Yori",
    email: "yori@example.com",
    password: "1",
    dob: new Date("2008-05-30"),
    phone: "5554567890",
    cart_id: "cart_004",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_005",
    name: "Thac",
    email: "thac@example.com",
    password: "1",
    dob: new Date("2007-09-12"),
    phone: "5555678901",
    cart_id: "cart_005",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_006",
    name: "Test User",
    email: "user@example.com",
    password: "1",
    dob: new Date("2009-01-25"),
    phone: "5556789012",
    cart_id: "cart_006",
    role: "user",
    status: "active",
  },
  {
    user_id: "user_007",
    name: "Admin",
    email: "admin@example.com",
    password: "1",
    dob: new Date("2006-06-18"),
    phone: "5557890123",
    cart_id: null,
    role: "admin",
    status: "active",
  },
];

const ROLES = [
  { role_id: "user", name: "user" },
  { role_id: "admin", name: "admin" },
];

const FAQS = [
  {
    faq_id: 1001,
    question: "What is GoPick?",
    answer:
      "GoPick is an e-commerce platform that allows users to browse, search, and purchase products across multiple categories in one place.",
    category: "general",
  },
  {
    faq_id: 1002,
    question: "Do I need an account to place an order?",
    answer:
      "You can browse products without an account, but creating an account is required to place orders, track deliveries, and manage returns.",
    category: "account",
  },
  {
    faq_id: 1003,
    question: "How do I create an account?",
    answer:
      "Click on the Sign Up button, fill in your personal details, and submit the registration form. You will receive a confirmation email once your account is created.",
    category: "account",
  },
  {
    faq_id: 1004,
    question: "How can I search for products?",
    answer:
      "Use the search bar at the top of the Products page. You can also filter products by category, price range, or rating.",
    category: "products",
  },
  {
    faq_id: 1005,
    question: "How do I add products to my cart?",
    answer:
      "Open a product detail page and click the Add to Cart button. The product will appear in your cart instantly.",
    category: "products",
  },
  {
    faq_id: 1006,
    question: "Can I update the quantity of items in my cart?",
    answer:
      "Yes, you can increase or decrease item quantities directly on the cart page before checkout.",
    category: "products",
  },
  {
    faq_id: 1007,
    question: "What payment methods are supported?",
    answer:
      "We support Visa, Mastercard, UnionPay, Alipay, WeChat Pay, and selected bank transfers.",
    category: "payment",
  },
  {
    faq_id: 1008,
    question: "Is my payment information secure?",
    answer:
      "Yes. All payment transactions are encrypted and processed through secure payment gateways. We do not store your card details.",
    category: "security",
  },
  {
    faq_id: 1009,
    question: "How long does shipping take?",
    answer:
      "Standard shipping usually takes 2–7 business days depending on your location.",
    category: "shipping",
  },
  {
    faq_id: 1010,
    question: "Can I track my order?",
    answer:
      "Yes. Once your order is shipped, you can track it through the My Orders section.",
    category: "shipping",
  },
  {
    faq_id: 1011,
    question: "Do you ship internationally?",
    answer: "International shipping is available to selected countries.",
    category: "shipping",
  },
  {
    faq_id: 1012,
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for unused items in their original packaging.",
    category: "returns",
  },
  {
    faq_id: 1013,
    question: "How do I request a return or refund?",
    answer:
      "Log into your account, go to My Orders, and follow the return instructions.",
    category: "returns",
  },
  {
    faq_id: 1014,
    question: "What should I do if I receive a damaged product?",
    answer: "Please contact customer support within 24 hours of delivery.",
    category: "returns",
  },
  {
    faq_id: 1015,
    question: "I forgot my password. What should I do?",
    answer: "Click the Forgot Password link on the login page.",
    category: "account",
  },
  {
    faq_id: 1016,
    question: "How can I contact customer support?",
    answer:
      "You can contact our support team via the support section on the website.",
    category: "general",
  },
  {
    faq_id: 1017,
    question: "Why is the website loading slowly?",
    answer: "Slow loading may be caused by network issues or high traffic.",
    category: "technical",
  },
  {
    faq_id: 1018,
    question: "Which browsers are supported?",
    answer:
      "GoPick works best on modern browsers such as Chrome, Edge, Firefox, and Safari.",
    category: "technical",
  },
  {
    faq_id: 1019,
    question: "How is my personal data protected?",
    answer: "We follow strict data protection policies.",
    category: "security",
  },
  {
    faq_id: 1020,
    question: "Can I delete my account?",
    answer:
      "Yes. Please contact customer support if you wish to delete your account.",
    category: "account",
  },
];

const COUNTERS = [
  {
    seq: 8,
  },
];

module.exports = {
  PRODUCTS,
  BANNERS,
  PRODUCT_CATEGORIES,
  FAQ_CATEGORIES,
  FAQS,
  REVIEWS,
  USERS,
  ROLES,
  CARTS,
  COUNTERS,
};
